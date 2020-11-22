const mongoose = require('mongoose');
const mongodbURL = require('../config/index.js').mongodbURL;
const conn = mongoose.createConnection(mongodbURL,
	{
		useUnifiedTopology: true,
		useNewUrlParser: true
	}
)
// 解決設定索引的提示問題
mongoose.set('useCreateIndex', true)  
// 連線成功
conn.on('open',()=>{
	console.log(`connection: ${mongodbURL}`)
})
// 連線失敗
conn.on('err',()=>{
	console.log(`err: ${err}`)
})

module.exports = conn;