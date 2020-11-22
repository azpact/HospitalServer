let mongoose = require('mongoose');
let Utils = require('../../utils/utils.js');

let OrderSchame = new mongoose.Schema({
	order_id: String,
	uid: Number,
	trade_no: String,
	total_price: Number,
	total_number: Number
},{
  collection: 'order', // 設定指定的 collection
  versionKey: false // 不再加上 _v，預設會加上
})

OrderSchame.index({ order_id: 1})


module.exports = Utils.mongoDB.model('Order', OrderSchame)