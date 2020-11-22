let mongoose = require('mongoose');
const Mod = require('../../routers/routers.js');
let Utils = require('../../utils/utils.js');

let UserFriendSchema = new mongoose.Schema(
{
	random_code: String,
    friend_random_code: String,
    is_show: {
        type: Boolean,
        default: true
    }
},
{
  collection: 'userFriend', // 設定指定的 collection
  versionKey: false // 不再加上 _v，預設會加上
})

UserFriendSchema.statics.freinds = async function(type, randomCode, friendRandomCode, isShow, BId){
    // 找到所有符合 randomCode 的資料
    // 新增 type = "POST"

    // 在 userRandomCode 資料庫中找尋是否存在
    let findUserRandomCode = await Mod.MUserRandom.find({random_code: randomCode})
    let findUserFriendRandomCode = await Mod.MUserRandom.find({random_code: friendRandomCode})
    // 在 userFriend 資料庫中找尋是否在
    let findRandomCode = await this.find({random_code: randomCode})
    let checkFreindRandomCode = false
    // 使用者是否已經加入此好友
    for(let item of findRandomCode){
        if(item.friend_random_code === friendRandomCode){
            checkFreindRandomCode = true
        }
    }
    // GET
    if(type === "GET"){
        if(findUserRandomCode.length == 0){
            return {code: -1}
        } else if(findRandomCode.length == 0){
            return {code: 1}
        } else{
            return {code: 2, result: findRandomCode}
        }
        // 當 random_code 不存在 {code: -1}
        // 當 使用者沒有任何朋友 {code: 1}
        // 當 成功取得朋友資料 {code: 2: result: data}
    }
    // POST
    if(type === "POST"){
        if(findUserRandomCode.length == 0){
            return {code: -1}
        }else if(findUserFriendRandomCode == 0){
            return {code: -2}
        }else if(checkFreindRandomCode){
            return {code: 1}
        }else{
            let TheDoc = this({
                random_code: randomCode,
                friend_random_code: friendRandomCode
            })
            TheDoc.save()
            return {code: 2}
        }
        // 當 randomCode 不存在 {code: -1}
        // 當 friendRandomCode 不存在 {code: -2}
        // 當 使用者已經加入此朋友 {code: 1}
        // 當 使用者成功加入此朋友 {code: 2, result: data}
    }
    // PUT
    if(type === "PUT"){
        // 根據 _id 修改 is_show 狀態
        let findById = await this.findByIdAndUpdate({_id: BId}, {is_show: isShow})

        if(findUserRandomCode.length == 0){
            return {code: -1}
        }else if(findById === null){
            return {code: -2}
        }else{
            return {code: 1}
        }
        // 當 random_code 不存在 {code: -1}
        // 當 _id 不存在 {code: -2}
        // 當 資料更新完成 {code: 1}
    }
    // DELETE
    if(type === "DELETE"){
        // 根據 _id 刪除 Doc
        let findById = await this.remove({ _id: BId})
        if(findUserRandomCode.length == 0){
            return {code: -1}
        }else if(findById.n == 0){
            return {code: -2}
        }else {
            return {code: 1}
        }
        // 當 random_code 不存在 {code: -1}
        // 當 _id 不存在 {code: -2}
        // 當 刪除朋友成功 {code: 1}
    }
}


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

module.exports = Utils.mongoDB.model('UserFriend', UserFriendSchema)