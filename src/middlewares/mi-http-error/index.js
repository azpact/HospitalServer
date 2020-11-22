const Path = require('path') 
const nunjucks = require('nunjucks')

module.exports = (opts = {}) =>{
    // 增加環境變量，用來傳入到視圖中，方便調試
    const env = opts.env || process.env.NODE_ENV || 'development'  

	// 400.html 404.html other.html 的存放位置
	const folder = opts.errorPageFolder
	// 指定默認樣板文件
	const templatePath = Path.resolve(__dirname,'error.html')

	let fileName = 'other'
	return async(ctx, next)=>{
		try{
			await next();
			// 如果沒有更改過 responsr 的 status，則 koa 默認的 status 是 404
			if(ctx.response.status === 404 && !ctx.response.body) ctx.throw(404);
		} catch(e){
			// 此處進行錯誤處理
			let status = parseInt(e.status)
			// const message = e.message

			// 對 status 進行處理，指定錯誤頁面文件名
			if(status >= 400){
				switch (status) {
					case 400:
					case 404:
					case 500:
					fileName = status;
					break;
					default:
					fileName = 'other'
					break;
				}
			}else{
				status = 500
				fileName = status
			}
			// 確定最終的 filePath 路徑
			const filePath = folder ? Path.join(folder, `${fileName}.html`) : templatePath
	
	// 以下所做的是使用渲染引擎對模板文件進行渲染，
	// 並將生成內容放到 Http 的 response 中。
	// 渲染對應錯誤類型的視圖，並傳入參數對象
	try{
        // 指定視圖目錄
        nunjucks.configure( folder ? folder : __dirname )
        const data = await nunjucks.render(filePath, {
          env: env, // 指定當前環境參數
          status: e.status || e.message, // 如果錯誤信息中沒有 status，就顯示為 message
          error: e.message, // 錯誤信息
          stack: e.stack // 錯誤的堆線信息
      })
        // 賦值給響應體
        ctx.status = status
        ctx.body = data
    }catch(e){
// 如果中間件存在錯誤異常，直接拋出信息，由其他中間件處理
        ctx.throw(500, `錯誤頁渲染失敗:${e.message}`)
    }
}
}
}
