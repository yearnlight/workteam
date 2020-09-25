const query = require("./pool");
let fs = require("fs");
let marked = require("marked");
let officegen = require("officegen");
let path = require("path");
let docx = officegen("docx");
const send = require("koa-send");

module.exports = {
  setTaskRecord: async inputParams => {
    inputParams.push(0);
    let insertStr =
      "insert into taskrecord(id,finished,status,updatetime,updateInfo,taskId,updater,isDel) values ?";
    res = await query(insertStr, [[inputParams]], function(err, result) {
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
    ctx.response.body = {
      status: 200,
      msg: "",
      data: { url: "/md/output.docx", title: title }
    };
  }
};
