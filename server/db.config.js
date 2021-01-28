//导入配置文件
const base_conf = require("./conf");
//数据库配置
const conf = {
    "host": "81.68.200.164",
    "user": base_conf.dbUser,
    "password": base_conf.dbPassword,
    "database": "task",
    "port": "3306"
}

module.exports = conf;