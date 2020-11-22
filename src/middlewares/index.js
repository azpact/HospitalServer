const koaBody = require('koa-body');
const bodyParser = require('koa-bodyparser')
const favicon = require('koa-favicon');
const logger = require('koa-logger');
const cors = require('koa2-cors');
const json = require('koa-json');
const path = require('path');
const ip = require('ip');

// 引入 middlewares
const miLog = require('./mi-log')
const miHttpError = require('./mi-http-error/index.js')

module.exports = (app) => {
	// 取得 GET 與 POST 等等資訊
	app.use(logger())
	// 使用網站圖標
	app.use(favicon(path.join(__dirname, '../','public', 'favicon.ico')));
	// 總是美化 json 數據
	app.use(json())

	// 方便提取 POST 資料
	app.use(bodyParser())
	// 可上傳文件 
	app.use(koaBody()); 

	// 關於 middlewares
	app.use(miLog({
    	env: app.env,  // koa 提供的環境變量
    	projectName: 'koa2-tutorial',
    	appLogLevel: 'debug',
    	dir: 'logs',
    	serverIp: ip.address()
	}))
	app.use(miHttpError({ // 應用請求錯誤中間件
		errorPageFolder: path.resolve(__dirname, '../errorPage')
		// 代碼中，指定了 /errorPage 為默認的模板文件目錄
	})) 
	// 允許跨域
	app.use(cors());
}