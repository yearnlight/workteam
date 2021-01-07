const query = require("../pool"),
    util = require("../util"),
    router = require("koa-router")(),
    Uuid = require("node-uuid"),
    moment = require("moment")

// log4
const logger = require('../utils/log4jsLogger');

router.prefix('/demand')

// 用户登录
router.post("/list", async ctx => {
    let fields = [
        "name",
        "webMaster",
        "status",
        "devPhase",
    ];
    let res = [];
    let params = ctx.request.body
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
    // 前缀Sql片段
    let selectPrefix = `select * from demand`;

    // 参数Sql片段
    let selectParamsStr = "";
    if (selectParams && selectParams.length) {
        selectParamsStr = `and  ${selectParams.join(" and ")}`;
    }
    // 分页Sql片段
    let selectSuffix = "";
    if (params.page && params.limit) {
        selectSuffix = ` limit ${(params.page - 1) * params.limit}, ${params.limit}`;
    }
    let selectStr = `${selectPrefix} where isDel = 0 ${selectParamsStr} order by createtime desc`;
    logger.info(`query demand page:${selectStr}${selectSuffix},parames:${values}`);
    res = await query(`${selectStr}${selectSuffix}`, values);
    let totalRes = await query(selectStr, values);
    ctx.response.body = {
        status: 200,
        msg: "",
        data: { total: totalRes.length, records: res }
    };
});


// 查询任务详情
router.post("/info", async ctx => {
    let res = [];
    let { id } = ctx.request.body;
    let selectStr = "select * from demand where isDel = 0 and `id` = ?";
    res = await query(selectStr, [id]);
    if (res && res.length) {
        ctx.response.body = { status: 200, msg: "", data: res[0] };
    }
});

router.post("/delete", async ctx => {
    let msg = ""
    let { id } = ctx.request.body;
    // 查询存在性
    let selectStr = "select * from demand where isDel = 0 and `id` = ?";
    let searchData = await query(selectStr, [id]);
    if (searchData && searchData.length) {
        // 存在后，伪删除
        let deleteStr = `update demand SET isDel = 1 where id = ?`;
        res = await query(deleteStr, [id]);;
        msg = `删除小需求【${searchData[0].name}】成功`;
        util.setEvent(ctx, "success", msg);
        ctx.response.body = { status: 200, msg: msg, data: null };
    }
    else {
        msg = `小需求不存在`;
        ctx.response.body = { status: 0, msg: msg, data: null };
    }
});

//处理
router.post("/deal", async ctx => {
    let msg = ""
    let { id, remark, status } = ctx.request.body;
    let dealtime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    // 查询存在性
    let selectStr = "select * from demand where isDel = 0 and `id` = ?";
    let searchData = await query(selectStr, [id]);
    if (searchData && searchData.length) {
        let cur = searchData[0];
        cur.remark = cur.remark || "[]";
        let curRemark = JSON.parse(cur.remark);
        curRemark.push({ dealtime: dealtime, oStatus: cur.status, nStatus: status, desc: remark });
        // 存在后，处理
        let delStr = `update demand SET status = ?,remark = ? where id = ?`;
        res = await query(delStr, [status, JSON.stringify(curRemark), id]);;
        msg = `处理小需求【${cur.name}】成功`;
        util.setEvent(ctx, "success", msg);
        ctx.response.body = { status: 200, msg: msg, data: null };
    }
    else {
        msg = `小需求不存在`;
        ctx.response.body = { status: 0, msg: msg, data: null };
    }
});

// 创建 + 编辑
router.post("/form", async ctx => {
    let msg = "";
    let params = ctx.request.body;
    let id = Uuid.v1();
    let createtime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    // 编辑过程
    if (params.id) {
        let fields = ["name", "location", "level", "describe", "master", "webMaster", "backMaster", "devPhase"]
        let updateParams = [];
        let values = [];
        for (let key in params) {
            if (fields.includes(key)) {
                updateParams.push(`\`${key}\` = ?`);
                if (Array.isArray(params[key])) {
                    params[key] = params[key].join(",");
                }
                values.push(params[key]);
            }
        }
        values.concat(params.id);
        let updateStr = `update demand SET ${updateParams.join(",")} where id = ?`;
        console.log(updateStr)
        let isUpdate = await query(updateStr, values.concat(params.id));
        if (isUpdate) {
            msg = `小需求【${params.name}】更新成功`;
            util.setEvent(ctx, "success", msg);
            ctx.response.body = { status: 200, msg: msg, data: null };
        }
    }
    else {
        let inputParams = [
            [
                id,
                params.name,
                params.location,
                params.devPhase,
                params.level,
                params.master,
                params.webMaster,
                params.backMaster,
                "todo",
                createtime,
                ctx.request.header.userName,
                params.describe,
                "[]",
                0
            ]
        ];
        let insertStr = 'insert into demand(id,name,location,devPhase,`level`,`master`,webMaster,backMaster,status,createtime,creator,`describe`,remark,isDel) values ?';
        let isInsert = await query(insertStr, [inputParams]);
        if (isInsert) {
            msg = `小需求【${params.name}】创建成功`;
            util.setEvent(ctx, "success", msg);
            ctx.response.body = { status: 200, msg: msg, data: null };
        }
    }
});



module.exports = router;