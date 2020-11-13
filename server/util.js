const query = require("./pool");
let fs = require("fs");
let Uuid = require("node-uuid");
let moment = require("moment");
let marked = require("marked");
// let officegen = require("officegen");
// let path = require("path");
// let docx = officegen("docx");
// const send = require("koa-send");

let apis = [
  { title: "登录操作", path: "/task/login" },
  { title: "用户删除", path: "/task/user/delete" },
  { title: "用户更新", path: "/task/user/update" },
  { title: "用户添加", path: "/task/user/add" },
  { title: "任务更新", path: "/task/update" },
  { title: "任务删除", path: "/task/delete" },
  { title: "任务分配", path: "/task/allocate" },
  { title: "任务创建", path: "/task/create" },
  { title: "机器添加", path: "/task/host/create" },
  { title: "机器移除", path: "/task/host/delete" },
  { title: "项目创建", path: "/task/project/create" },
  { title: "文档发布", path: "/task/md/save" },
  { title: "文档删除", path: "/task/md/delete" },
  { title: "文档更新", path: "/task/md/update" },
  { title: "文档下载", path: "/task/md/download" },
  { title: "正则表达式创建", path: "/task/regular/create" },
  { title: "应用服务发布", path: "/task/store/create" },
  { title: "应用服务移除", path: "/task/store/delete" },
  { title: "应用服务移除", path: "/task/store/delete" },
]

module.exports = {
  setTaskRecord: async inputParams => {
    inputParams.push(0);
    let insertStr =
      "insert into taskrecord(id,finished,status,updatetime,updateInfo,taskId,updater,isDel) values ?";
    res = await query(insertStr, [[inputParams]], function (err, result) {
      if (err) {
        console.log("[INSERT ERROR] - ", err.message);
        return;
      }
      console.log(
        "--------------------------INSERT----------------------------"
      );
      console.log("INSERT ID:", result);
      console.log(
        "-----------------------------------------------------------------\n\n"
      );
    });
  },
  getTaskInfo: async id => {
    let selectStr = "select * from worktask where isDel = 0 and `id` = ?";
    res = await query(selectStr, [id]);
    // 添加超时时间
    res.forEach(item => {
      let curTime = new Date();
      let overtime = curTime - new Date(item.endTime);
      // 运行态任务
      if (
        item.status != "shelve" &&
        item.status != "waitAssign" &&
        item.status != "end"
      ) {
        item.overtime = overtime;
      }
    });
    return res[0];
  },
  mdToDoc(mdStr, title, ctx) {
    let headFile = fs.readFileSync("doc.html"); // 读取将要被转换的md文件
    let mdToHtmlStr = marked(mdStr, {
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    });

    // 将md转换成html字符串替换到html模板文件中replace_area的位置
    let content = headFile.toString().replace("replace_area", mdToHtmlStr);
    let filepath = "./md/output.docx";
    fs.writeFileSync(filepath, content);
    let msg = `文档下载【${title}】成功`;
    this.setEvent(ctx, "success", msg);
    ctx.response.body = {
      status: 200,
      msg: "",
      data: { url: "/md/output.docx", title: title }
    };
  },
  setEvent: async (ctx, level, desc, title) => {
    let item = apis.filter(a => ctx.path.includes(a.path))
    if (item && item.length) {
      let uuid = Uuid.v1();
      let createtime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      let inputParams = [
        [
          uuid,
          level,
          title || item[0].title,
          desc,
          ctx.request.header.userName,
          createtime
        ]
      ];
      let insertStr =
        "insert into event(uuid,`level`,`title`,`desc`,username,createtime) values ?";
      res = await query(insertStr, [inputParams]);
    }
  }
};
