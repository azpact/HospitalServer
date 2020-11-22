const WsServerModule = require('../modules/WsServer.js')

module.exports = {
	find: async( ctx ) => {
		async function waitAndFindAll(){
			// 將代碼返回一個等待一秒的 promise
			await new Promise(r=>setInterval(r,1000))
			return WsServerModule.find({}).then((doc)=>doc)
		}
		async function result(){
			try{
				return await waitAndFindAll()
			}catch(e){
				return '錯誤'
			}
		}
		ctx.body =  await result()
	},
}