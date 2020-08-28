const query = require("./pool"),
  Koa = require("koa"),
  router = require("koa-router")(),
  bodyParser = require("koa-bodyparser"),
  koaBody = require("koa-body"),
  Multiparty = require("multiparty"),
  Uuid = require("node-uuid"),
  moment = require("moment");

let http = require("http");

const app = new Koa();

router.get("/task/user/list", async ctx => {
  let res = [];
  let selectStr = `select * from user`;
  res = await query(selectStr);
  ctx.response.body = { status: 200, msg: "", data: res };
});

router.post("/task/user/delete", async ctx => {
  let params = ctx.request.body;
  let deleteStr = "delete from user where `id` = ?";
  res = await query(deleteStr, [params.id]);
  ctx.response.body = { status: 200, msg: "删除用户成功", data: null };
});

router.post("/task/user/add", async ctx => {
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
      createtime
    ]
  ];
  let insertStr =
    "insert into user(id,name,`key`,department,`group`,`team`,remark,createtime) values ?";
  res = await query(insertStr, [inputParams], function(err, result) {
    if (err) {
      console.log("[INSERT ERROR] - ", err.message);
      return;
    }
    console.log("--------------------------INSERT----------------------------");
    console.log("INSERT ID:", result);
    console.log(
      "-----------------------------------------------------------------\n\n"
    );
  });
  ctx.response.body = { status: 200, msg: "添加用户成功", data: null };
});

let dealInParams = arr => {
  let res = [];
  arr.forEach(p => {
    res.push("?");
  });
  return res.join(",");
};

router.post("/task/list", async ctx => {
  let res = [];
  let params = ctx.request.body;
  let selectParams = [];
  let values = [];
  for (let key in params) {
    if (fields.includes(key)) {
      // 数组 in,非数组 =
      if (Array.isArray(params[key])) {
        selectParams.push(`${key} in (${dealInParams(params[key])})`);
        values = values.concat(params[key]);
      } else {
        selectParams.push(`${key} = ?`);
        values.push(params[key]);
      }
    }
  }
  let selectStr = `select * from worktask where isDel = 0`;
  if (selectParams && selectParams.length) {
    selectStr = `select * from worktask where isDel = 0 and ${selectParams.join(
      " and "
    )}`;
  }
  res = await query(selectStr, values);
  // 添加超时时间
  res.forEach(item => {
    let curTime = new Date();
    let overtime = curTime - new Date(item.endTime);
    if (overtime > 0) {
      // 运行态任务
      if (
        item.status != "shelve" &&
        item.status != "waitAssign" &&
        item.status != "end"
      ) {
        item.overtime = overtime;
      }
    }
  });
  ctx.response.body = { status: 200, msg: "", data: res };
});

router.post("/task/info", async ctx => {
  let res = {};
  let params = ctx.request.body;
  let selectStr = "select * from worktask where isDel = 0 and `id` = ?";
  res = await query(selectStr, [params.id]);
  // 添加超时时间
  res.forEach(item => {
    let curTime = new Date();
    let overtime = curTime - new Date(item.endTime);
    if (overtime > 0) {
      // 运行态任务
      if (
        item.status != "shelve" &&
        item.status != "waitAssign" &&
        item.status != "end"
      ) {
        item.overtime = overtime;
      }
    }
  });
  ctx.response.body = { status: 200, msg: "", data: res[0] };
});

let fields = [
  "name",
  "owner",
  "status",
  "startTime",
  "endTime",
  "priority",
  "estimatedTime",
  "estimatedInfo",
  "creator",
  "finished",
  "createtime"
];
router.post("/task/update", async ctx => {
  let params = ctx.request.body;

  let updateParams = [];
  let values = [];
  for (let key in params) {
    if (fields.includes(key)) {
      updateParams.push(`${key} = ?`);
      if (Array.isArray(params[key])) {
        params[key] = params[key].join(",");
      }
      values.push(params[key]);
    }
  }
  values.concat(params.id);
  let updateStr = `update worktask SET ${updateParams.join(",")} where id = ?`;
  res = await query(updateStr, values.concat(params.id));
  ctx.response.body = { status: 200, msg: "更新任务成功", data: null };
});

router.post("/task/delete", async ctx => {
  let params = ctx.request.body;
  let deleteStr = `update worktask SET isDel = 1 where id = ?`;
  res = await query(deleteStr, [params.id]);
  ctx.response.body = { status: 200, msg: "删除任务成功", data: null };
});

//分配任务
router.post("/task/allocate", async ctx => {
  let res = [];
  let params = ctx.request.body;
  let owners = params.owner.join(",");
  let str = `update worktask SET owner = ? where id = ?`;
  res = await query(str, [owners, params.id]);
  ctx.response.body = { status: 200, msg: "分配任务成功", data: null };
});

router.post("/task/create", async ctx => {
  let params = ctx.request.body;
  let uuid = Uuid.v1();
  let createtime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  let label = params.labels && params.labels.join(",");
  let owners = params.owner && params.owner.join(",");
  let inputParams = [
    [
      uuid,
      params.name,
      owners,
      params.status,
      params.startTime,
      params.endTime,
      params.priority,
      params.estimatedTime,
      params.estimatedInfo,
      params.creator,
      params.finished,
      createtime,
      0
    ]
  ];
  let insertStr = `insert into worktask(id,name,owner,status,startTime,endTime,priority,estimatedTime,estimatedInfo,creator,finished,createtime,isDel) values ?`;
  res = await query(insertStr, [inputParams], function(err, result) {
    if (err) {
      console.log("[INSERT ERROR] - ", err.message);
      return;
    }
    console.log("--------------------------INSERT----------------------------");
    console.log("INSERT ID:", result);
    console.log(
      "-----------------------------------------------------------------\n\n"
    );
  });
  ctx.response.body = { status: 200, msg: "创建任务成功", data: null };
});

// app.use(bodyParser());
app.use(
  koaBody({
    multipart: true, // 支持文件上传
    formidable: {
      maxFieldsSize: 2 * 1024 * 1024, // 最大文件为2兆
      multipart: true // 是否支持 multipart-formdate 的表单
    }
  })
);

app.use(router.routes());

app.use(router.allowedMethods());

http.createServer(app.callback()).listen(4001);

console.log("Task server success to run.");
