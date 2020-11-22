const WsServerModule = require('../modules/WsServer.js')
const MovieModule = require('../modules/Movie.js')
const StockModule = require('../modules//Stock.js')

// 引入資料
const WebSocket = require('ws');
// 建立 Server
const wss = new WebSocket.Server({port:3000});


// 開啟連線
wss.on('connection',async function connection(ws){
	// function and var
	async function waitAndFindAll(module){
		// 將代碼返回一個等待一秒的 promise
		await new Promise(r=>setInterval(r,1000))
		return module.find({}).then((doc)=>doc)
	}
	async function result(){
		try{
			return await waitAndFindAll(MovieModule)
		}catch(e){
			return '錯誤'
		}
	}
	let ms = await result()

	// 發送給 Client
	ws.send('WebSocket is open now from BackEnd.')
	ws.send(JSON.stringify(ms))

	// 計時發送給 Client
	setInterval(()=>{
		ws.send(JSON.stringify(ms))
	},3000)


	// 接收 Client 
	let incomeMessage = ""
	let resultMessage = ""

	async function stockMethods(type, module, data){
		if(type == 'save'){
			let theDoc = StockModule({
				 stock_code: String,
  				 buy_date: String,
  				 net_value: String
			})
			let result = await theDoc.save().then((doc)=>doc)
			return result
		} else if(type == 'findAll'){
			let result = await StockModule.find({}).then((doc)=>doc)
			return result
		} else if(type == 'update'){
			return 'update'
		} else{
			return 'err save'
		}
	}
	async function otherResult(methods, schema, data){
		try{
			return await stockMethods(methods, schema, data)
		}catch(e){
			return '錯誤'
		}
	}

	ws.on('message', async function incoming(message){
		incomeMessage = JSON.parse(message)
		resultMessage = await otherResult(incomeMessage[0], incomeMessage[1], incomeMessage[2])
		console.log(resultMessage)
	})
	
})


module.exports = {
	find: async( ctx ) => {
		let result = await MovieSchema.find({}).then((doc)=>{
			return doc
		})
		ctx.body =  result
	},
}