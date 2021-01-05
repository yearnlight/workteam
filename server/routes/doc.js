const query = require("../pool"),
    util = require("../util"),
    router = require("koa-router")(),
    Uuid = require("node-uuid"),
    moment = require("moment"),
    fs = require("fs"),
    path = require("path");

router.prefix('/doc')

// md图片上传
router.post("/files/upload", async ctx => {
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let randomCode = Uuid.v1();
    let fileNames = file.name.split(".");
    let filePath =
        path.join(__dirname, "md/") +
        `${fileNames[0]}${randomCode}.${fileNames[1]}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    ctx.response.body = {
        status: 200,
        msg: null,
        data: `/md/${fileNames[0]}${randomCode}.${fileNames[1]}`
    };
});

router.post("/files/delete", async ctx => {
    let { fileName } = ctx.request.body;
    fs.unlink(`/md/${fileName}`, function (err) {
        if (err) {
            throw err;
        }
        ctx.response.body = { status: 200, msg: "文件删除成功", data: null };
    });
});

// md上传
router.post("/save", async ctx => {
    let msg = "";
    let params = ctx.request.body;
    let uuid = Uuid.v1();
    let createtime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let inputParams = [
        [
            uuid,
            params.title,
            params.context,
            params.label,
            ctx.request.header.userName,
            createtime,
            0
        ]
    ];
    let insertStr =
        "insert into doc(id,`title`,`context`,`label`,creator,createtime,isDel) values ?";
    res = await query(insertStr, [inputParams]);
    msg = `发布文档【${params.title}】成功`;
    util.setEvent(ctx, "success", msg);
    ctx.response.body = { status: 200, msg: msg, data: null };
});

// 文档列表(标题，标签过滤)
router.post("/list", async ctx => {
    let { title, label } = ctx.request.body;
    let params = [];
    let queryStr = `select * from doc where isDel = 0`;
    if (title) {
        queryStr += ` and title LIKE ?`;
        params.push("%" + title + "%");
    }
    if (label) {
        queryStr += " and `label` = ?";
        params.push(label);
    }
    let res = await query(queryStr, params);
    ctx.response.body = { status: 200, msg: null, data: res };
});

// 文档详情
router.post("/info", async ctx => {
    let { id } = ctx.request.body;
    let selectStr = `select * from doc where isDel = 0 and id = ?`;
    let res = await query(selectStr, [id]);
    ctx.response.body = { status: 200, msg: null, data: res ? res[0] : {} };
});

// 文档删除
router.post("/delete", async ctx => {
    let msg = "";
    let params = ctx.request.body;
    let deleteStr = `update doc SET isDel = 1 where id = ?`;
    res = await query(deleteStr, [params.id]);
    msg = `删除文档成功`;
    util.setEvent(ctx, "success", msg);
    ctx.response.body = { status: 200, msg: msg, data: null };
});

// 文档阅读
router.post("/read", async ctx => {
    let params = ctx.request.body;
    let selectStr = `select * from doc where isDel = 0 and id = ?`;
    let selectList = await query(selectStr, [params.id]);
    if (selectList && selectList.length) {
        let readtime = selectList[0].readtime;
        let deleteStr = `update doc SET readtime = ? where id = ?`;
        let res = await query(deleteStr, [readtime + 1, params.id]);
        ctx.response.body = { status: 200, msg: "正在阅读", data: null };
    } else {
        ctx.response.body = { status: 404, msg: "文档不存在", data: null };
    }
});

// 文档更新
router.post("/update", async ctx => {
    let msg = ""
    let params = ctx.request.body;
    // 更新时间、更新者
    params.creator = ctx.request.header.userName;
    params.createtime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let updateParams = [];
    let values = [];
    for (let key in params) {
        updateParams.push(`${key} = ?`);
        if (Array.isArray(params[key])) {
            params[key] = params[key].join(",");
        }
        values.push(params[key]);
    }
    values.concat(params.id);
    let updateStr = `update doc SET ${updateParams.join(",")} where id = ?`;
    res = await query(updateStr, values.concat(params.id));
    msg = `更新文档【${params.title}】成功`;
    util.setEvent(ctx, "success", msg);
    ctx.response.body = { status: 200, msg: msg, data: null };
});

// 文档下载
router.post("/download", async ctx => {
    let { id } = ctx.request.body;
    let queryStr = `select * from doc where isDel = 0 and id = ?`;
    let res = await query(queryStr, [id]);
    // mdToDoc
    util.mdToDoc(res[0].context, res[0].title, ctx);
});



module.exports = router;