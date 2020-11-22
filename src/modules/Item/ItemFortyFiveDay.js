let mongoose = require('mongoose');
let Utils = require('../../utils/utils.js');

let ItemFortyFiveDaySchema = new mongoose.Schema(
{
	item_code: String,
    yaer: String,
    month: String,
    day: String,
    kd_pk: String,
    gd: String,
    ge_change: String,
    ds_trend: String,
    five_bias_type: String,
    kd_type: String
},
{
  collection: 'itemFortyFiveDay', // 設定指定的 collection
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

module.exports = Utils.mongoDB.model('ItemFortyFiveDay', ItemFortyFiveDaySchema)