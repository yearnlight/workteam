const query = require("../pool"),
    util = require("../util"),
    router = require("koa-router")(),
    Uuid = require("node-uuid"),
    moment = require("moment")

// log4
const logger = require('../utils/log4jsLogger');

router.prefix('/bigscreen')

// 事件统计
router.get("/event", async ctx => {
    // 成功事件
    let successRes = await query(`select * from event where level = 'success'`)
    // 错误事件
    let errorRes = await query(`select * from event where level = 'error'`)
    // 警告事件
    let warningRes = await query(`select * from event where level = 'warning'`)

    ctx.response.body = {
        status: 200,
        msg: "",
        data: { xData: ["成功", "失败", "警告"], yData: [successRes.length, errorRes.length, warningRes.length] }
    };
})

// 业务统计
router.post("/server-config", async ctx => {
    // 服务事件
    let res = await query(`select * from server_config where isDel = 0`)
    let groupRes = util.groupByField(res, "project");
    let targetRes = { xData: [], yData: [] }
    groupRes.forEach(item => {
        targetRes.xData.push(item.type)
        targetRes.yData.push(item.data.length)
    })
    ctx.response.body = {
        status: 200,
        msg: "",
        data: targetRes
    };
})

// 任务统计
router.post("/task", async ctx => {
    let targetRes = { xData: [], yData: [] }
    let selectStr = `select * from worktask where isDel = 0`;
    res = await query(selectStr);
    // 统计
    let waitAssignList = res.filter(item => item.status == "waitAssign");
    let shelveList = res.filter(item => item.status == "shelve");
    let backlogList = res.filter(item => item.status == "backlog");
    let demandingList = res.filter(item => item.status == "demanding");
    let designingList = res.filter(item => item.status == "designing");
    let codingList = res.filter(item => item.status == "coding");
    let testingList = res.filter(item => item.status == "testing");
    let endList = res.filter(item => item.status == "end");

    targetRes.xData = ["待分配", "待办", "搁置", "需求分析中", "设计中", "编码中", "测试中", "完成"]
    targetRes.yData = [
        waitAssignList.length, 
        backlogList.length, 
        shelveList.length, 
        demandingList.length, 
        designingList.length, 
        codingList.length, 
        testingList.length, 
        endList.length
    ]
    ctx.response.body = { status: 200, msg: "", data: targetRes };
});


module.exports = router;