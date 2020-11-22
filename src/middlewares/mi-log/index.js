const logger = require("./logger")
module.exports = (options) => {
	const loggerMiddleware = logger(options)

	return (ctx, next) => {
		return loggerMiddleware(ctx, next)
		.catch((e) => {
			if (ctx.status < 500) {
				ctx.status = 500;
			}
			ctx.log.error(e.stack);
			ctx.state.logged = true;
			ctx.throw(e);
		})
	}
}

// 中間件裡有拋出錯誤，這裡將通過 catch 函數捉捕到並處理，
// 將狀態碼小於 500 的錯誤統一按照 500 錯誤碼處理，
// 以方便後面的 http-error 中間件顯示錯誤頁碼。
// 調用 log 中間件打印推線信息並將錯誤拋出最外層的全局錯誤監聽並處理。