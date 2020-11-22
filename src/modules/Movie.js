let mongoose = require('mongoose');
let connection = require('../utils/mongoDB.js')

let MovieSchema = new mongoose.Schema({
	name: String,
	author: String,
	star: Number,
	year: Number,
},{
  collection: 'movies', // 設定指定的 collection
  versionKey: false // 不再加上 _v，預設會加上
})

module.exports = connection.model('Movie', MovieSchema)