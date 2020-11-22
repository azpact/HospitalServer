let mongoose = require('mongoose');
let Utils = require('../../utils/utils.js');

let OrderItmeSchame = new mongoose.Schema({
	order_id: String,
	title: String,
	price: Number,
	number: Number
},{
  collection: 'order_item', // 設定指定的 collection
  versionKey: false // 不再加上 _v，預設會加上
})

module.exports = Utils.mongoDB.model('OrderItem', OrderItmeSchame)