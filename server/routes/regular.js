const query = require("../pool"),
    util = require("../util"),
    router = require("koa-router")(),
    Uuid = require("node-uuid"),
    moment = require("moment")

router.prefix('/regular')

// 正则
router.post("/list", async ctx => {
    let res = [];
    let selectStr = `select * from regular where isDel = 0`;
    res = await query(selectStr);
    ctx.response.body = { status: 200, msg: "", data: res };
});

router.post("/create", async ctx => {
    let params = ctx.request.body;
    let isExistItem = await query(
        `select uuid from regular where name = ? or expression = ?`,
        [params.name, params.expression]
    );
    if (isExistItem && isExistItem.length) {
        ctx.response.body = {
            status: 0,
            msg: "正则表达式匹配目的或者表达式重复,请用名称搜索使用",
            data: null
        };
        return;
    }
    let uuid = Uuid.v1();
    let createtime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let label = params.labels.join(",");
    let insertStr = `insert into regular values(?,?,?,?,?,?,?,?,?)`;
    res = await query(insertStr, [
        uuid,
        params.name,
        params.expression,
        params.test,
        params.type,
        label,
        createtime,
        params.creater || ctx.request.header.userName,
        0
    ]);
    let msg = `创建正则表达式【${params.name}】成功`;
    util.setEvent(ctx, "success", msg);
    ctx.response.body = { status: 200, msg: "创建正则表达式成功", data: null };
});

module.exports = router;