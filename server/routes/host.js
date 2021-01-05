const query = require("../pool"),
    util = require("../util"),
    router = require("koa-router")(),
    Uuid = require("node-uuid"),
    moment = require("moment")

// log4
const logger = require('../utils/log4jsLogger');

router.prefix('/host')


// 添加机器
router.post("/create", async ctx => {
    let msg = "";
    let params = ctx.request.body;
    let uuid = Uuid.v1();
    let createtime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let inputParams = [
      [
        uuid,
        params.ip,
        params.protocol,
        params.port,
        params.alias,
        params.username,
        params.password,
        params.desc,
        ctx.request.header.userName,
        createtime, //使用次数
        0,
        0
      ]
    ];
    let insertStr =
      "insert into host(uuid,`ip`,`protocol`,`port`,`alias`,username,`password`,`desc`,creator,createtime,usetime,isDel) values ?";
    res = await query(insertStr, [inputParams]);
    // event
    msg = `添加机器【${params.ip}】成功`;
    util.setEvent(ctx, "success", msg);
    ctx.response.body = { status: 200, msg: msg, data: null };
  });
  
  // 机器列表
  router.post("/list", async ctx => {
    let queryStr = `select * from host where isDel = 0`;
    let res = await query(queryStr);
    ctx.response.body = { status: 200, msg: null, data: res };
  });
  
  // 机器删除
  router.post("/delete", async ctx => {
    let msg = ""
    let params = ctx.request.body;
    // 查询机器信息
    let selectStr = `select * from host where isDel = 0 and uuid = '${params.uuid}'`;
    let hosts = await query(selectStr);
    logger.info(`查询机器:${hosts}`);
    if (hosts && hosts.length) {
      let deleteStr = `update host SET isDel = 1 where uuid = ?`;
      res = await query(deleteStr, [params.uuid]);
      msg = `移除机器【${hosts[0].ip}】成功`;
      logger.warn(msg);
      util.setEvent(ctx, "warning", msg);
    }
    else {
      msg = `移除机器失败，机器不存在`;
      logger.info(msg);
      util.setEvent(ctx, "error", msg);
    }
    ctx.response.body = { status: 200, msg: msg, data: null };
  });



module.exports = router;