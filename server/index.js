const Koa = require("koa"),
  registerRouter = require('./routes');

// 引入日志服务
const logger = require('./utils/log4jsLogger');

// 引入http服务
let http = require("http");

// new Koa实例
const app = new Koa();

// 注册路由
app.use(registerRouter(app))


// 启动服务
http.createServer(app.callback()).listen(4001);

logger.info(`Task server success to run,port:4001.`);
