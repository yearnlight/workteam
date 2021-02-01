const query = require("../pool"),
    util = require("../util"),
    router = require("koa-router")(),
    Uuid = require("node-uuid"),
    moment = require("moment")

// log4
const logger = require('../utils/log4jsLogger');

router.prefix('/auth')

// 用户登录
router.post("/login", async ctx => {
    let msg = "";
    let { account, pass } = ctx.request.body;
    let queryStr = "select * from user where `key` = ?";
    res = await query(queryStr, [account]);
    if (res && res.length) {
        let userInfo = res[0];
        if (userInfo.pass != pass) {
            msg = "密码错误"
            util.setEvent(ctx, "error", msg);
            logger.error(`登录密码错误===>${account, pass}`);
            ctx.response.body = { status: 400, msg: msg, data: null };
        } else {
            let token = Uuid.v1();
            // 记录登录次数
            let logintimes = userInfo.logintimes + 1;
            // 记录上次登录时间
            let lastLoginTime = userInfo.loginTime;
            // 本次登录时间
            let loginTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            // 设置token
            let updateStr = `update user SET token = ?,logintimes = ?,lastLoginTime = ?,loginTime =? where id = ?`;
            await query(updateStr, [
                token,
                logintimes,
                lastLoginTime,
                loginTime,
                userInfo.id
            ]);
            // 查询登录账号角色信息
            let roleInfo = await query("select * from role where `enName` = ?", [userInfo.role])
            msg = `账号【${account}】登录成功`
            util.setEvent(ctx, "success", msg);
            // 屏蔽密码
            userInfo.pass = "******";
            ctx.response.body = {
                status: 200,
                msg: msg,
                data: Object.assign(userInfo, { token: token, roleId: roleInfo ? roleInfo[0].id : null })
            };
        }
    } else {
        msg = `账号【${account}】不存在`
        util.setEvent(ctx, "error", msg);
        ctx.response.body = { status: 400, msg: msg, data: null };
    }
});



module.exports = router;