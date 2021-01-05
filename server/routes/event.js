const query = require("../pool"),
    util = require("../util"),
    router = require("koa-router")(),
    Uuid = require("node-uuid"),
    moment = require("moment")

// log4
const logger = require('../utils/log4jsLogger');

router.prefix('/event')

// 查询事件列表
router.post("/list", async ctx => {
    let res = [];
    let params = ctx.request.body
    let values = [];
    let selectPrefix = `select * from event`;
    let selectSuffix = "";
    // 分页
    if (params.page && params.limit) {
        selectSuffix = ` limit ${(params.page - 1) * params.limit}, ${params.limit}`;
    }
    let selectStr = `${selectPrefix} order by createtime desc`;
    logger.info(`query event page:${selectStr}${selectSuffix},parames:${values}`);
    res = await query(`${selectStr}${selectSuffix}`, values);
    let totalRes = await query(selectStr, values);
    ctx.response.body = {
        status: 200,
        msg: "",
        data: { total: totalRes.length, records: res }
    };
});

module.exports = router;