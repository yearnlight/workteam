const compose = require('koa-compose')
const glob = require('glob')
const util = require("../util")
const query = require("../pool")
const { resolve } = require('path')
// ctx.request.body
const koaBody = require("koa-body")
// 引入路由拦截器服务
const KoaRouterInterceptor = require("koa-router-interceptor");
// log4
const logger = require('../utils/log4jsLogger');
// 白名单[正则列表、任务列表、md详情]
let whiteUrlList = ["/regular/list", "/task/list", "/doc/info", "/auth/login", "/doc/read", "/user/list"];

registerRouter = (app) => {
    let routers = [];
    app.use(koaBody({
        multipart: true, // 支持文件上传
        formidable: {
            maxFieldsSize: 2 * 1024 * 1024, // 最大文件为2兆
            multipart: true // 是否支持 multipart-formdate 的表单
        }
    }))
    glob.sync(resolve(__dirname, './', '**/*.js'))
        .filter(value => (value.indexOf('index.js') === -1))
        .map(router => {
            routers.push(KoaRouterInterceptor(require(router), async (ctx, next) => {
                let isLogin = false;
                // 登录界面直接放过
                if (whiteUrlList.includes(ctx.path) || /\.\w+$/.test(ctx.path)) {
                    return true;
                }
                let queryStr = "select * from user where `id` = ?";
                res = await query(queryStr, [ctx.request.header.userid]);
                if (res && res.length) {
                    let userInfo = res[0];
                    // 共享角色登录不限制
                    if (userInfo.role == "share") {
                        ctx.request.header.userName = userInfo.name;
                        isLogin = true;
                    }
                    // 已登录
                    if (userInfo.token == ctx.request.header.token) {
                        ctx.request.header.userName = userInfo.name;
                        isLogin = true;
                    }
                }
                if (!isLogin) {
                    logger.error(`Auth faild.`)
                    util.setEvent(ctx, "warning", "认证失败", "认证操作");
                    ctx.response.body = { status: 401, msg: "认证失败", data: null };
                }
                console.info(ctx.path, isLogin)
                // 只有这个返回true，才会走koa-router配置的逻辑分发
                return isLogin;
            }))
            routers.push(require(router).routes())
            routers.push(require(router).allowedMethods())
        })
    return compose(routers)
}

module.exports = registerRouter