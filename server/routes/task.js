const query = require("../pool"),
    util = require("../util"),
    router = require("koa-router")(),
    Uuid = require("node-uuid"),
    moment = require("moment")

// log4
const logger = require('../utils/log4jsLogger');

router.prefix('/task')
// 参数处理
let dealInParams = arr => {
    let res = [];
    arr.forEach(p => {
        res.push("?");
    });
    return res.join(",");
};

let fields = [
    "name",
    "owner",
    "status",
    "priority",
    "startTime",
    "endTime",
    "estimatedTime",
    "estimatedInfo",
    "creator",
    "finished",
    "tag",
    "createtime"
];

// 查询任务列表
router.post("/list", async ctx => {
    let res = [];
    let params = ctx.request.body;
    let selectParams = [];
    let values = [];
    for (let key in params) {
        if (fields.includes(key)) {
            // 数组 in,非数组 =
            if (params[key]) {
                if (Array.isArray(params[key])) {
                    if (dealInParams(params[key])) {
                        selectParams.push(`${key} in (${dealInParams(params[key])})`);
                        values = values.concat(params[key]);
                    }
                } else {
                    selectParams.push(`${key} = ?`);
                    values.push(params[key]);
                }
            }
        }
    }

    let selectPrefix = `select * from worktask`;
    let selectSuffix = "";
    let timeRange = ` and startTime > '${params.startTime}' and startTime < '${params.endTime}'`;
    let selectParamsStr = "";
    // 分页
    if (params.page && params.limit) {
        selectSuffix = ` limit ${(params.page - 1) * params.limit}, ${params.limit}`;
    }
    if (selectParams && selectParams.length) {
        selectParamsStr = `and  ${selectParams.join(" and ")}`;
    }
    let selectStr = ``;
    // 查询时间范围内
    if (params.startTime) {
        selectStr = `${selectPrefix} where isDel = 0 ${selectParamsStr}${timeRange} order by endTime desc`;
    } else {
        selectStr = `${selectPrefix} where isDel = 0 ${selectParamsStr} order by endTime desc`;
    }
    logger.info(`query task page:${selectStr}${selectSuffix},parames:${values}`);
    res = await query(`${selectStr}${selectSuffix}`, values);
    let totalRes = await query(selectStr, values);

    // 添加超时时间
    res.forEach(item => {
        let curTime = new Date();
        let overtime = curTime - new Date(item.endTime);
        // 运行态任务
        if (
            item.status != "shelve" &&
            item.status != "waitAssign" &&
            item.status != "end"
        ) {
            item.overtime = overtime;
        }
    });
    ctx.response.body = {
        status: 200,
        msg: "",
        data: { total: totalRes.length, records: res }
    };
});


// 单个任务更新记录
router.post("/record", async ctx => {
    let { taskId } = ctx.request.body;
    let selectStr = `select * from taskrecord where taskId = ? and isDel = 0 order by updatetime asc`;
    res = await query(selectStr, [taskId]);
    ctx.response.body = { status: 200, msg: "", data: res };
});

// 任务统计
router.post("/statistics", async ctx => {
    let response = {
        legend: [],
        series: []
    };
    let selectStr = `select * from worktask where isDel = 0`;
    res = await query(selectStr);
    // 统计
    let waitAssignList = res.filter(item => item.status == "waitAssign");
    let shelveList = res.filter(item => item.status == "shelve");
    let backlogList = res.filter(item => item.status == "backlog");
    let demandingList = res.filter(item => item.status == "demanding");
    let designingList = res.filter(item => item.status == "designing");
    let codingList = res.filter(item => item.status == "coding");
    let testingList = res.filter(item => item.status == "testing");
    let endList = res.filter(item => item.status == "end");

    response.series.push({ name: "待分配", value: waitAssignList.length });
    response.series.push({ name: "待办", value: backlogList.length });
    response.series.push({ name: "搁置", value: shelveList.length });
    response.series.push({ name: "需求分析中", value: demandingList.length });
    response.series.push({ name: "设计中", value: designingList.length });
    response.series.push({ name: "编码中", value: codingList.length });
    response.series.push({ name: "测试中", value: testingList.length });
    response.series.push({ name: "完结", value: endList.length });
    response.legend = response.series.map(m => m.name);

    ctx.response.body = { status: 200, msg: "", data: response };
});

// 查询任务详情
router.post("/info", async ctx => {
    let res = {};
    let params = ctx.request.body;
    res = await util.getTaskInfo(params.id);
    ctx.response.body = { status: 200, msg: "", data: res };
});

// 任务更新
router.post("/update", async ctx => {
    let msg = "";
    let params = ctx.request.body;

    let updateParams = [];
    let values = [];
    for (let key in params) {
        if (fields.includes(key)) {
            updateParams.push(`${key} = ?`);
            if (Array.isArray(params[key])) {
                params[key] = params[key].join(",");
            }
            values.push(params[key]);
        }
    }
    values.concat(params.id);
    let updateStr = `update worktask SET ${updateParams.join(",")} where id = ?`;
    res = await query(updateStr, values.concat(params.id));

    let taskInfo = await util.getTaskInfo(params.id);
    // 组装任务记录信息
    let record = [
        Uuid.v1(),
        taskInfo.finished,
        taskInfo.status,
        moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        params.updateInfo || `任务[${taskInfo.name}]分配成功`,
        taskInfo.id, //任务id
        ctx.request.header.userName
    ];
    await util.setTaskRecord(record);
    msg = params.updateInfo ? `更新任务【${taskInfo.name}】成功` : `任务【${taskInfo.name}】分配成功`;
    util.setEvent(ctx, "success", msg);
    ctx.response.body = { status: 200, msg: msg, data: null };
});

router.post("/delete", async ctx => {
    let msg = ""
    let params = ctx.request.body;
    let deleteStr = `update worktask SET isDel = 1 where id = ?`;
    res = await query(deleteStr, [params.id]);
    // 删除记录
    let deleteRecordStr = `update taskrecord SET isDel = 1 where taskId = ?`;
    res = await query(deleteRecordStr, [params.id]);
    msg = "删除任务成功";
    util.setEvent(ctx, "success", msg);
    ctx.response.body = { status: 200, msg: msg, data: null };
});

//分配任务
router.post("/allocate", async ctx => {
    let msg = "";
    let res = [];
    let params = ctx.request.body;
    let owners = params.owner.join(",");
    let str = `update worktask SET owner = ? where id = ?`;
    res = await query(str, [owners, params.id]);

    let taskInfo = await util.getTaskInfo(params.id);
    // 组装任务记录信息
    let record = [
        Uuid.v1(),
        0,
        taskInfo.status,
        moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        `任务[${taskInfo.name}]分配成功`,
        taskInfo.id, //任务id
        ctx.request.header.userName
    ];
    await util.setTaskRecord(record);
    msg = `分配任务【${params.name}】成功`;
    util.setEvent(ctx, "success", msg);
    ctx.response.body = { status: 200, msg: msg, data: null };
});

// 创建任务
router.post("/create", async ctx => {
    let msg = ""
    let params = ctx.request.body;
    let uuid = Uuid.v1();
    let createtime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let owners = params.owner && params.owner.join(",");
    let inputParams = [
        [
            uuid,
            params.name,
            owners,
            params.status,
            params.startTime,
            params.endTime,
            params.priority,
            params.estimatedTime,
            params.estimatedInfo,
            params.creator,
            params.finished,
            createtime,
            0,
            params.tag
        ]
    ];
    let insertStr = `insert into worktask(id,name,owner,status,startTime,endTime,priority,estimatedTime,estimatedInfo,creator,finished,createtime,isDel,tag) values ?`;
    res = await query(insertStr, [inputParams]);
    // 组装任务记录信息
    let record = [
        Uuid.v1(),
        0,
        params.status,
        createtime,
        `任务[${params.name}]创建成功`,
        uuid,
        ctx.request.header.userName
    ];
    await util.setTaskRecord(record);
    msg = `任务【${params.name}】创建成功`;
    util.setEvent(ctx, "success", msg);
    ctx.response.body = { status: 200, msg: msg, data: null };
});



module.exports = router;