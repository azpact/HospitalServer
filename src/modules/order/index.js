let mongoose = require('mongoose');
let Utils = require('../../utils/utils.js');

let IndexSchame = new mongoose.Schema({
	item: String,
	stock: String
},{
  collection: 'index', // 設定指定的 collection
  versionKey: false // 不再加上 _v，預設會加上
})

// IndexSchame.index({ stock: -1})

module.exports = Utils.mongoDB.model('Index', IndexSchame)