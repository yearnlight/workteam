const path = require('path');
const log4js = require('log4js');

// 配置log4js
log4js.configure({
    appenders: {
        // 控制台输出
        console: { type: 'console' },
        // 全部日志文件(最大保存10MB)
        allFile: { type: 'file', filename: path.join(__dirname, '../logs/server.log'),keepFileExt: true, maxLogSize: 10485760, backups: 3},
        // 错误日志文件
        errorFile: { type: 'file', filename: path.join(__dirname, '../logs/server-error.log')}
    },
    categories: {
        // 默认日志，输出debug 及以上级别的日志
        default: { appenders: [ 'allFile', 'console' ], level: 'debug' },
        // 错误日志，输出error 及以上级别的日志
        error: { appenders: [ 'errorFile' ], level: 'error' },
    }
});

// 获取默认日志
const defaultLogger = log4js.getLogger();
// 获取错误级别日志
const errorLogger = log4js.getLogger('error');

// 日志代理，同时调用默认日志和错误日志
const loggerProxy = {};
const levels = log4js.levels.levels;
levels.forEach(level => {
    const curLevel = level.levelStr.toLowerCase();
    loggerProxy[curLevel] = (...params) => {
        defaultLogger[curLevel](...params);
        errorLogger[curLevel](...params);
    }
});

/**
 * 创建日志代理方法(已经console打日志的地方自动替换成logger)
 * @param logLevel 日志级别
 * @param logger 日志对象
 * @return {function}
 */
function createLogProxy (logLevel, loggerProxy) {
    return (...param) => {
        loggerProxy[logLevel](...param);
    };
  }
  console.log = createLogProxy('debug', loggerProxy);
  console.info = createLogProxy('info', loggerProxy);
  console.warn = createLogProxy('warn', loggerProxy);
  console.error = createLogProxy('error', loggerProxy);

module.exports = loggerProxy;