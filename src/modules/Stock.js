let mongoose = require('mongoose');
let connection = require('../utils/mongoDB.js');

let StockSchema = new mongoose.Schema({
  stock_code: String,
  buy_date: String,
  net_value: String
}, {
  collection: 'stocks',
  versionKey: false
})

module.exports = connection.model('Stock', StockSchema)