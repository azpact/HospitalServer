let mongoose = require('mongoose');
let Utils = require('../../utils/utils.js');

let UserItemSchema = new mongoose.Schema(
{
	random_code: String,
    group_id: Number,
    item_code: String,
    item_number: Number
},
{
  collection: 'userItem', // 設定指定的 collection
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

module.exports = Utils.mongoDB.model('UserItem', UserItemSchema)