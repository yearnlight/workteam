const query = require("../pool"),
    util = require("../util"),
    router = require("koa-router")(),
    Uuid = require("node-uuid"),
    moment = require("moment")

const { NULL } = require("node-sass");
// log4
const logger = require('../utils/log4jsLogger');

router.prefix('/bigscreen')

// 查询概览大屏列表
router.post("/list", async ctx => {
    let res = [];
    let params = ctx.request.body
    let values = [];
    let selectPrefix = `select * from visual where isDel = 0`;
    let selectSuffix = "";
    // 分页
    if (params.page && params.limit) {
        selectSuffix = ` limit ${(params.page - 1) * params.limit}, ${params.limit}`;
    }
    let selectStr = `${selectPrefix} order by createtime desc`;
    logger.info(`query visual page:${selectStr}${selectSuffix},params:${values}`);
    res = await query(`${selectStr}${selectSuffix}`, values);
    let totalRes = await query(selectStr, values);
    ctx.response.body = {
        status: 200,
        msg: "",
        data: { total: totalRes.length, records: res }
    };
});

// 添加概览大屏项
router.post("/create", async ctx => {
    let params = ctx.request.body;
    let id = Uuid.v1();
    let createtime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let inputParams = [
        [
            id,
            params.title,
            params.type || 'overview',
            params.project,
            params.remark,
            createtime,
            null,
            params.creator || ctx.request.header.userName,
            null,
            0
        ]
    ];
    let insertStr = 'insert into visual(id,`title`,`type`,`project`,`remark`,createtime,updatetime,creator,updator,isDel) values ?';
    let res = await query(insertStr, [inputParams]);
    if (res) {
        let msg = `创建大屏概览项目【${params.title}】成功`;
        util.setEvent(ctx, "success", msg);
        ctx.response.body = { status: 200, msg: msg, data: null };
    }
});

// 更新概览大屏项
router.post("/update", async ctx => {
    let msg = "";
    let updatetime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let params = ctx.request.body;
    params = { ...params, 'updatetime': updatetime, 'updator': params.updator || ctx.request.header.userName, }
    let whiteFields = ["title", "type", "project", "remark", "updatetime", "updator"];
    let { sqlParams, sqlValues } = util.setUpdateParams(params, whiteFields);
    let updateStr = `update visual SET ${sqlParams.join(",")} where id = ?`;
    let res = await query(updateStr, sqlValues.concat(params.id));
    if (res) {
        msg = "更新概览大屏项"
        util.setEvent(ctx, "success", msg);
        ctx.response.body = { status: 200, msg: msg, data: null };
    }
});

//大屏概览配置
router.post("/config", async ctx => {

})

//应用概览大屏项
router.post("/delete", async ctx => {
    let params = ctx.request.body;
    let deleteStr = `update visual SET isDel = 1 where id = ?`;
    res = await query(deleteStr, [params.id]);
    let msg = `删除大屏概览项目成功`;
    util.setEvent(ctx, "success", msg);
    ctx.response.body = { status: 200, msg: msg, data: null };
});

// 事件统计
router.get("/event", async ctx => {
    // 成功事件
    let successRes = await query(`select * from event where level = 'success'`)
    // 错误事件
    let errorRes = await query(`select * from event where level = 'error'`)
    // 警告事件
    let warningRes = await query(`select * from event where level = 'warning'`)

    ctx.response.body = {
        status: 200,
        msg: "",
        data: { xData: ["成功", "失败", "警告"], yData: [successRes.length, errorRes.length, warningRes.length] }
    };
})

// 业务统计
router.post("/server-config", async ctx => {
    // 服务事件
    let res = await query(`select * from server_config where isDel = 0`)
    let groupRes = util.groupByField(res, "project");
    let targetRes = { xData: [], yData: [] }
    groupRes.forEach(item => {
        targetRes.xData.push(item.type)
        targetRes.yData.push(item.data.length)
    })
    ctx.response.body = {
        status: 200,
        msg: "",
        data: targetRes
    };
})

// 任务统计
router.post("/task", async ctx => {
    let targetRes = { xData: [], yData: [] }
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

    targetRes.xData = ["待分配", "待办", "搁置", "需求分析中", "设计中", "编码中", "测试中", "完成"]
    targetRes.yData = [
        waitAssignList.length,
        backlogList.length,
        shelveList.length,
        demandingList.length,
        designingList.length,
        codingList.length,
        testingList.length,
        endList.length
    ]
    ctx.response.body = { status: 200, msg: "", data: targetRes };
});


module.exports = router;