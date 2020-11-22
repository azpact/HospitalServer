let mongoose = require('mongoose');
let Utils = require('../../utils/utils.js');

let UserPuchaseSaleSchema = new mongoose.Schema(
{
	random_code: String,
    item_code: String,
    purchase_time: String,
    sale_time: String,
    holding_time: String,
    purchase_net_worth: Number,
    sale_net_worth: Number,
    purchase_unit: Number,
    sale_unit: Number,
    holding_unit: Number,
    purchase_handling_fee: Number,
    sale_handling_fee: Number,
    sale_transfer_tax: Number
},
{
  collection: 'userPuchaseSale', // 設定指定的 collection
  versionKey: false // 不再加上 _v，預設會加上
})



/*
UserItemSchema.statics.randomCode = async function(userId){
    let findOne = await this.find()
    let randomCodeFn = await this.randomCodeFn()
    let findRandomCode = await this.findOne({random_code: randomCodeFn})
    let result = ""
    if(findRandomCode){
    	result = {code: -1}
    }else{
    	result = {code: 1, result: randomCodeFn}
    }
    return result
    // 當重複 User 內的 random_code {code: -1}
    // 當不重複 User 內的 random_code {code: 1, result: data}
}*/

module.exports = Utils.mongoDB.model('UserPuchaseSale', UserPuchaseSaleSchema)