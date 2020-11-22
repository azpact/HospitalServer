let mongoose = require('mongoose');
let connection = require('../utils/mongoDB.js')

let StudentSchema = new mongoose.Schema({
	name: String,
	age: Number
},{
  collection: 'students', // 設定指定的 collection
  versionKey: false // 不再加上 _v，預設會加上
})

module.exports = connection.model('Student', StudentSchema)

