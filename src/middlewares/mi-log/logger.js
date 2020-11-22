const log4js = require('log4js');

// 引入日誌輸出信息的封裝文件
const access = require("./access.js");
const methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"]
 
const baseInfo = {
  appLogLevel: 'debug',
  dir: 'logs',
  env: 'dev',
  projectName: 'webProject',
  serverIp: '0.0.0.0'
}
 
module.exports = (options) => {
  const contextLogger = {}
  const appenders = {}
  
  // 繼承自 baseInfo 密任參數
  const opts = Object.assign({}, baseInfo, options || {})
  // 需要的變量解構，方便使用
  const { env, appLogLevel, dir, serverIp, projectName } = opts
  const commonInfo = { projectName, serverIp }
	
  appenders.cheese = {
    type: 'dateFile',
    filename: `${dir}/task`,
    pattern: '-yyyy-MM-dd.log',
    alwaysIncludePattern: true
  }
  
  if (env === "dev" || env === "local" || env === "development") {
    appenders.out = {
      type: "console"
    }
  }
  let config = {
    appenders,
    categories: {
      default: {
        appenders: Object.keys(appenders),
        level: appLogLevel
      }
    }
  }
 
  const logger = log4js.getLogger('cheese');
 
  return async (ctx, next) => {
    const start = Date.now()
 
    log4js.configure(config)
    methods.forEach((method, i) => {
      contextLogger[method] = (message) => {
      	// 將入參數換為函數返回的字符串
        logger[method](access(ctx, message, commonInfo))
      }
    })
    ctx.log = contextLogger;
 
    await next()
    const responseTime = Date.now() - start;
    logger.info(access(ctx, {
      responseTime: `響應時間為: ${responseTime/1000}s`
    }, commonInfo))
  }
}
