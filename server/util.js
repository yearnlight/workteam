const query = require("./pool");

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
  }
};
