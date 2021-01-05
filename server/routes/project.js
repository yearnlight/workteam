const query = require("../pool"),
    util = require("../util"),
    router = require("koa-router")(),
    Uuid = require("node-uuid"),
    moment = require("moment")

// log4
const logger = require('../utils/log4jsLogger');

router.prefix('/project')


// 创建项目
router.post("/create", async ctx => {
    let msg = ""
    let params = ctx.request.body;
    let uuid = Uuid.v1();
    let createtime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let inputParams = [
      [
        uuid,
        params.name,
        params.desc,
        params.type,
        params.color || "#909399",
        params.url,
        params.hero,
        params.star,
        ctx.request.header.userName,
        createtime,
        0
      ]
    ];
    let insertStr =
      "insert into project(id,`name`,`desc`,type,color,url,hero,star,creator,createtime,isDel) values ?";
    res = await query(insertStr, [inputParams]);
    msg = `创建项目【${params.name}】成功`;
    util.setEvent(ctx, "success", msg);
    ctx.response.body = { status: 200, msg: msg, data: null };
  });
  
  // 项目列表
  router.post("/list", async ctx => {
    let queryStr = `select * from project where isDel = 0`;
    let res = await query(queryStr);
    ctx.response.body = { status: 200, msg: null, data: res };
  });
  
  // 项目删除
  router.post("/delete", async ctx => {
    let msg = "";
    let params = ctx.request.body;
    // 查询机器信息
    let selectStr = `select * from project where isDel = 0 and id = '${params.id}'`;
    let project = await query(selectStr);
    if (project && project.length) {
      let deleteStr = `delete from project where isDel = 0 and id = '${params.id}'`;
      let delRes = await query(deleteStr);
      if (delRes) {
        msg = `删除项目【${project[0].name}】成功`;
        logger.info(msg);
        util.setEvent(ctx, "success", msg);
      }
    }
    else {
      msg = `项目【${project[0].name}】未找到`;
    }
    ctx.response.body = { status: 200, msg: msg, data: res };
  });



module.exports = router;