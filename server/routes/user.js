const query = require("../pool"),
    util = require("../util"),
    router = require("koa-router")(),
    Uuid = require("node-uuid"),
    moment = require("moment")

router.prefix('/user')


// 查询用户列表
router.get("/list", async ctx => {
    let res = [];
    let selectStr = `select * from user`;
    res = await query(selectStr);
    ctx.response.body = { status: 200, msg: "", data: res };
});

// 查询用户详情
router.post("/info", async ctx => {
    let { id } = ctx.request.body;
    let res = [];
    let selectStr = `select * from user where id = ?`;
    res = await query(selectStr, [id]);
    ctx.response.body = { status: 200, msg: "", data: res[0] };
});

// 删除用户
router.post("/delete", async ctx => {
    let params = ctx.request.body;
    let deleteStr = "delete from user where `id` = ?";
    res = await query(deleteStr, [params.id]);
    let msg = `删除用户成功`
    util.setEvent(ctx, "success", msg);
    ctx.response.body = { status: 200, msg: msg, data: null };
});

// 更新用户信息
router.post("/update", async ctx => {
    let msg = "";
    let params = ctx.request.body;
    if (params.oldPass) {
        let selectStr = `select * from user where id = ?`;
        let userInfo = await query(selectStr, [params.id]);
        if (userInfo && userInfo[0]) {
            if (userInfo[0].pass != params.oldPass) {
                msg = "旧密码不正确"
                util.setEvent(ctx, "error", msg);
                ctx.response.body = { status: 400, msg: msg, data: null };
            } else {
                let updateParams = [];
                let values = [];
                let whitefields = [
                    "name",
                    "key",
                    "department",
                    "group",
                    "team",
                    "remark",
                    "pass"
                ];
                for (let key in params) {
                    if (whitefields.includes(key)) {
                        updateParams.push(`\`${key}\` = ?`);
                        values.push(params[key]);
                    }
                }
                values.concat(params.id);
                let updateStr = `update user SET ${updateParams.join(
                    ","
                )} where id = ?`;
                res = await query(updateStr, values.concat(params.id));
                msg = `修改密码成功`
                util.setEvent(ctx, "success", msg);
                ctx.response.body = { status: 200, msg: msg, data: null };
            }
        }
    } else {
        let updateParams = [];
        let values = [];
        let whitefields = [
            "name",
            "key",
            "department",
            "group",
            "team",
            "remark",
            "pass"
        ];
        for (let key in params) {
            if (whitefields.includes(key)) {
                updateParams.push(`\`${key}\` = ?`);
                values.push(params[key]);
            }
        }
        values.concat(params.id);
        let updateStr = `update user SET ${updateParams.join(",")} where id = ?`;
        res = await query(updateStr, values.concat(params.id));
        msg = `更新用户【${params.name}】成功`
        util.setEvent(ctx, "success", msg);
        ctx.response.body = { status: 200, msg: msg, data: null };
    }
});

// 添加用户
router.post("/add", async ctx => {
    let msg = "";
    let params = ctx.request.body;
    let uuid = Uuid.v1();
    let createtime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let inputParams = [
        [
            uuid,
            params.name,
            params.key,
            params.department,
            params.group,
            params.team,
            params.remark,
            createtime,
            params.pass,
            params.role
        ]
    ];
    let insertStr =
        "insert into user(id,name,`key`,department,`group`,`team`,remark,createtime,pass,role) values ?";
    res = await query(insertStr, [inputParams], function (err, result) {
        if (err) {
            msg = "添加用户失败"
            util.setEvent(ctx, "error", msg);
            console.log("[INSERT ERROR] - ", err.message);
            return;
        }
        console.log("--------------------------INSERT----------------------------");
        console.log("INSERT ID:", result);
        console.log(
            "-----------------------------------------------------------------\n\n"
        );
    });
    msg = `添加用户【${params.name}】成功`
    util.setEvent(ctx, "success", msg);
    ctx.response.body = { status: 200, msg: msg, data: null };
});



module.exports = router;