let mongoose = require('mongoose');
let connection = require('../utils/mongoDB.js');

let WsServerSchema = new mongoose.Schema({
  purpose: { type: String }, // 主機名
  hostname: { type: String }, // IP 名
  device_id: { type: Number }, // ID 
  logindate: { type: Date }
}, {
  collection: 'devices',
  versionKey: false
})

module.exports = connection.model('WsServer', WsServerSchema)