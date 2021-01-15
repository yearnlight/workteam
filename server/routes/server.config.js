const query = require("../pool"),
    util = require("../util"),
    router = require("koa-router")(),
    Uuid = require("node-uuid"),
    moment = require("moment"),
    fs = require("fs"),
    path = require("path"),
    tar = require("tar");

// log4
const logger = require('../utils/log4jsLogger');

router.prefix('/server-config')

let whiteFields = [
    "name",
    "code",
    "project",
    "desc",
    "icon",
    "searchConfig",
    "tableConfig",
    "tableBusiness",
    "tableTestData",
    "detailConfig",
    "detailTestData"
];

// 创建服务
router.post("/create", async ctx => {
    let msg = "";
    let params = ctx.request.body;
    let uuid = Uuid.v1();
    let createtime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let inputParams = [
        [
            uuid,
            params.code,
            params.name,
            params.desc,
            params.icon,
            params.searchConfig,
            params.tableConfig,
            params.tableBusiness,
            params.tableTestData,
            params.detailConfig,
            params.detailTestData,
            createtime,
            ctx.request.header.userName,
            params.project,
            0
        ]
    ];
    let insertStr =
        "insert into server_config(uuid,`code`,`name`,`desc`,`icon`,searchConfig,tableConfig,tableBusiness,tableTestData,detailConfig,detailTestData,createtime,creator,project,isDel) values ?";
    res = await query(insertStr, [inputParams]);
    msg = `创建服务【${params.name}】成功`;
    util.setEvent(ctx, "success", msg);
    ctx.response.body = { status: 200, msg: msg, data: null };
});

// 服务更新
router.post("/update", async ctx => {
    let msg = "";
    let params = ctx.request.body;

    let updateParams = [];
    let values = [];
    for (let key in params) {
        if (whiteFields.includes(key)) {
            updateParams.push(`\`${key}\` = ?`);
            if (Array.isArray(params[key])) {
                params[key] = params[key].join(",");
            }
            values.push(params[key]);
        }
    }
    
    let updateStr = `update server_config SET ${updateParams.join(",")} where uuid = ?`;
    let isSuccess = await query(updateStr, values.concat(params.uuid));
    if (isSuccess) {
        util.setEvent(ctx, "success", `服务【${params.name}】更新成功`);
        ctx.response.body = { status: 200, msg: msg, data: null };
    }

});

// 查询服务列表
router.get("/list", async ctx => {
    let res = [];
    let selectPrefix = `select * from server_config where isDel = 0`;
    let selectStr = `${selectPrefix} order by createtime desc`;
    res = await query(`${selectStr}`);
    ctx.response.body = {
        status: 200,
        msg: "",
        data: { total: res.length, records: res }
    };
});

// 查询服务详情
router.post("/detail", async ctx => {
    let { uuid } = ctx.request.body;
    let selectStr = `select * from server_config where isDel = 0 and uuid = ?`;
    let res = await query(`${selectStr}`, [uuid]);
    ctx.response.body = {
        status: 200,
        msg: "",
        data: res[0]
    };
});

/**
     *
     * @param {*} url
     */
function deleteFolderRecursive(url) {
    var files = [];
    /**
     * 判断给定的路径是否存在
     */
    if (fs.existsSync(url)) {
        /**
         * 返回文件和子目录的数组
         */
        files = fs.readdirSync(url);
        files.forEach(function (file, index) {

            var curPath = path.join(url, file);
            /**
             * fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
             */
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);

            } else {
                fs.unlinkSync(curPath);
            }
        });
        /**
         * 清除文件夹
         */
        fs.rmdirSync(url);
    } else {
        console.log("给定的路径不存在，请给出正确的路径");
    }
}

// 删除服务
router.post("/delete", async ctx => {
    let msg = ""
    let { uuid } = ctx.request.body;
    let selectStr = "select * from server_config where isDel = 0 and `uuid` = ?";
    let serverConfigs = await query(selectStr, [uuid]);
    // 查看业务服务是不是存在
    if (serverConfigs && serverConfigs.length) {
        let config = serverConfigs[0];

        let deleteStr = `update server_config SET isDel = 1 where uuid = ?`;
        res = await query(deleteStr, [uuid]);

        // 删除业务文件包
        let targetDirPath = path.join(__dirname, `../template/target/${config.code}`);
        let targetTarPath = path.join(__dirname, `../template/target/${config.code}.tar.gz`);
        // 删除生成的文件夹
        deleteFolderRecursive(targetDirPath);
        // 删除生成的压缩包
        fs.unlinkSync(targetTarPath);

        msg = "删除业务服务成功";
        util.setEvent(ctx, "success", msg);
        ctx.response.body = { status: 200, msg: msg, data: null };
    }
    else {
        ctx.response.body = { status: 404, msg: "该服务模板不存在", data: null };
    }

});

function tarDir(targetDirPath, ctx, tarName) {
    if (fs.existsSync(`${targetDirPath}.tar.gz`)) {
        // 存在时删除压缩文件
        fs.unlink(`${targetDirPath}.tar.gz`, (err) => {
            if (err) {
                throw err;
            }
            tarDirOperate(targetDirPath, ctx, tarName)
        })
    }
    else {
        tarDirOperate(targetDirPath, ctx, tarName)
    }

}

function tarDirOperate(targetDirPath, ctx, tarName) {
    const pack = new tar.Pack({ gzip: true });
    //遍历文件夹，并以指定基准输出
    readDirSync(targetDirPath);
    function readDirSync(path) {
        const files = fs.readdirSync(path);
        files.forEach((fileName, index) => {
            let info = fs.statSync(path + "/" + fileName);
            if (info.isDirectory()) {
                readDirSync(path + "/" + fileName);
            } else {
                pack.add(path + "/" + fileName);
            }
        });
    }
    pack.end();
    const writeStream = fs.createWriteStream(`${targetDirPath}.tar.gz`);
    pack.pipe(writeStream);
}

// 定制化业务导入模板
function writeFile(filePath, content) {
    let currentContent = content;
    return new Promise((resolve) => {
        // writeFile async
        if (!fs.existsSync(filePath)) {
            fs.writeFile(filePath, currentContent, (err) => {
                if (err) throw err;
                resolve(filePath)
                console.log('The ' + filePath + ' has been created!');
            });
        } else {
            // 存在时删除，并重新写入
            fs.unlink(filePath, (err) => {
                if (err) {
                    throw err;
                }
                console.log('The ' + filePath + ' has been deleted!');

                fs.writeFile(filePath, currentContent, (err) => {
                    if (err) throw err;
                    resolve(filePath)
                    console.log('The ' + filePath + ' has been created!');
                });
            })
        }
    })
}

// 生成代码
router.post("/generate", async ctx => {
    let msg = ""
    let { uuid } = ctx.request.body;
    let selectStr = "select * from server_config where isDel = 0 and `uuid` = ?";
    let serverConfigs = await query(selectStr, [uuid]);
    let config = serverConfigs[0];

    // index模板路径
    let indexTempPath = path.join(__dirname, "../template/index.vue");
    // detail模板路径
    let detailTempPath = path.join(__dirname, "../template/detail.vue");
    // router路由模板
    let routerJsPath = path.join(__dirname, "../template/router.js");

    // 获取index模板文件内容
    let indexTemp = fs.readFileSync(path.join(indexTempPath), 'utf8');
    // 获取detail模板文件内容
    let detailTemp = fs.readFileSync(path.join(detailTempPath), 'utf8');
    // 获取router路由文件内容
    let routerJsTemp = fs.readFileSync(path.join(routerJsPath), 'utf8');
    // 表格配置,转换成Json格式
    let tableConfig = JSON.parse(config.tableConfig);
    let tableTestData = JSON.parse(config.tableTestData);
    // 详情配置，转换成Json格式
    let detailConfig = JSON.parse(config.detailConfig);
    let detailTestData = JSON.parse(config.detailTestData);
    // 查询条件配置
    let searchConfig = JSON.parse(config.searchConfig);

    // 内容替换
    let content = indexTemp.replace(/mxComponentName/g, config.code)
        .replace(/mxComponentLabel/g, config.name)
        .replace(/mxComponentColumns/g, JSON.stringify(tableConfig.tableColumns))
        .replace(/mxComponentTableConfig/g, JSON.stringify(tableConfig.tableConfig))
        .replace(/mxComponentSearchConfig/g, JSON.stringify(searchConfig))
        .replace(/mxComponentTableTestData/g, JSON.stringify(tableTestData));

    // 详情内容替换
    let detailContent = detailTemp.replace(/mxComponentName/g, config.code)
        .replace(/mxComponentDetailLabel/g, config.name)
        .replace(/mxComponentDetailColumns/g, JSON.stringify(detailConfig))
        .replace(/mxComponentDetailTestData/g, JSON.stringify(detailTestData));

    // 详情内容替换
    let routerContent = routerJsTemp.replace(/mxComponentName/g, config.code)
        .replace(/mxComponentLabel/g, config.name);

    let targetDirPath = path.join(__dirname, `../template/target/${config.code}`);
    let targetFilePath = path.join(__dirname, `../template/target/${config.code}`, 'index.vue');
    let targetDetailFilePath = path.join(__dirname, `../template/target/${config.code}`, 'detail.vue');
    let targetRouterFilePath = path.join(__dirname, `../template/target/${config.code}`, 'router.js');

    // mkdirSync
    if (!fs.existsSync(targetDirPath)) {
        fs.mkdirSync(targetDirPath);
        console.log('The ' + targetDirPath + ' folder has been created!');
    }

    // 写入index.vue、detail.vue、router.js
    Promise.all([writeFile(targetFilePath, content), writeFile(targetDetailFilePath, detailContent), writeFile(targetRouterFilePath, routerContent)]).then(() => {
        // 写入完index.vue、detail.vue生成压缩文件
        tarDir(targetDirPath, ctx, config.code)
    })


    // 输出压缩文件路径
    ctx.response.body = { status: 200, msg: "输出压缩文件路径", data: `/template/target/${config.code}.tar.gz` };

})






module.exports = router;