const query = require("../pool"),
    util = require("../util"),
    router = require("koa-router")(),
    Uuid = require("node-uuid"),
    moment = require("moment")

router.prefix('/store')

// 添加应用服务
router.post("/create", async ctx => {
    let params = ctx.request.body;
    let uuid = Uuid.v1();
    let createtime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let inputParams = [
        [
            uuid,
            params.name,
            params.color,
            params.desc,
            createtime,
            params.creator || ctx.request.header.userName,
            params.href,
            params.label,
            0,
            0,
            params.icon
        ]
    ];
    let insertStr = 'insert into store(uuid,`name`,color,`desc`,createtime,creator,href,label,accesstime,isDel,icon) values ?';
    let res = await query(insertStr, [inputParams]);
    let msg = `创建应用服务【${params.name}】成功`;
    util.setEvent(ctx, "success", msg);
    ctx.response.body = { status: 200, msg: msg, data: null };
});
//应用服务列表
router.post("/list", async ctx => {
    let res = [];
    let selectStr = `select * from store where isDel = 0`;
    res = await query(selectStr);
    ctx.response.body = { status: 200, msg: "", data: res };
});
//应用服务删除
router.post("/delete", async ctx => {
    let params = ctx.request.body;
    let deleteStr = `update store SET isDel = 1 where uuid = ?`;
    res = await query(deleteStr, [params.uuid]);
    //event
    let msg = `删除应用服务成功`;
    util.setEvent(ctx, "success", msg);
    ctx.response.body = { status: 200, msg: msg, data: null };
});

module.exports = router;