let mongoose = require('mongoose');
let Mod = require('../../routers/routers.js');
let Utils = require('../../utils/utils.js');

let ItemBaseInfoSchema = new mongoose.Schema(
{
	item_code: String,
    item_name: String,
    item_type: String,
    handing_fee_perchentage: String,
    account_management_fee_p: String,
    manager_fee_p: String,
    management_fee_p: String,
    stock_code: String,
    fund_code: String,
    agency_company: String,
    currency: Number,
    credit_rating: Number,
    short_days: Number
},
{
  collection: 'itemBaseInfo', // 設定指定的 collection
  versionKey: false // 不再加上 _v，預設會加上
})

ItemBaseInfoSchema.statics.itemBaseInfos = async function(type, randomCode, data, BId){
    // 取得 type = GET
    // 新增 type = POST
    // 修改 type = PUT
    // 刪除 type = DELETE

    // 在 userGroup 資料庫中找尋是否存在
    let findOne = await Mod.MUserRandom.find({random_code: randomCode})

    /*
    // 在 userGroup 資料庫中 _id 是否存在
    let friendGroupBId = await Mod.MUserGroup.find({ _id: BId})
    // 確認  groupName 是否為空值
    let checkGroupName = Utils.inputNullValue(groupName)
    
    */
    // GET
    // if(type === "GET"){
    //     if(findUserGroup.length == 0){
    //         return {code: -1}
    //     } else if(maxGroupId == 5){
    //         return {code: 1, result: findUserGroup}
    //     }
    //     // 當 random_code 不存在 { code: -1 }
    //     // 當 random_code 不存在 { code: -1 }
    // }
    // POST
    // 確認 random_code 是否存在
    let finOne = await Mod.MUserRandom.find({ random_code: randomCode})
    // 確認 random_code 的身份
    let authrity = null
    if(finOne.length !==0 ){
        authrity = finOne[0].authority
    }
    if( type === "Test"){
        result = Utils.currency(2)
        return result
    }

    if( type === "POST"){
         if(finOne.length == 0){
            return {code: -1}
         } else if(authrity !==0 ){
             return {code: -2 }
         } else{
            return findOne
            // return {code: 1}
         }
        // 當 random_code 不存在 {code: -1}
        // 當 authority 不為 0 不可新增 {code: -2}
        // 當 填入資料不完整 {code: -3}
        // 成功新增資料 {code: 1}

    }
    // if( type === "POST"){
    //     if(findUserGroup.length == 0){
    //         return {code: -1}
    //     } else if(finOne.length == 0){
    //         return {code: -2}
    //     } else if(authrity == 1 && maxGroupId < 3){
    //         // 當 authority 為 1，最多可以增加到 3 個群組
    //         let groupID = maxGroupId + 1
    //         let obj = {
    //             random_code: randomCode,
    //             group_id: groupID,
    //             group_name: groupName
    //         }
    //         let TheDoc = this(obj)
    //         TheDoc.save()
    //         return {code: 1}
    //     } else if(authrity == 2 && maxGroupId < 5){
    //         // 當 authority 為 2，最多可以增加到 5 個群組
    //          let groupID = maxGroupId + 1
    //         let obj = {
    //             random_code: randomCode,
    //             group_id: groupID,
    //             group_name: groupName
    //         }
    //         let TheDoc = this(obj)
    //         TheDoc.save()
    //         return {code: 1}
    //     } else if(authrity == 1 && maxGroupId == 3 || authrity == 2 && maxGroupId == 5 ){
    //         // 當 已達權限建立最大上限群組
    //         return {code: -3}
    //     } else{
    //         return {code: 2}
    //     }
       
    // }

    // PUT
    // if(type === "PUT"){
    //     // 根據 _id 修改 group_name 狀態
    //     let findById = await this.findByIdAndUpdate({_id: BId}, {group_name: groupName})

    //     if(findUserGroup.length == 0){
    //        return {code: -1}
    //     } else if(friendGroupBId.length == 0){
    //         return {code: -2}
    //     } else if(checkGroupName){
    //         return {code: -3}
    //     } else {
    //         let findUpdate = await this.find({ _id: BId})
    //         return {code:1, result: findUpdate}
    //     }
    //     // 當 random_code 不存在 { code: -1 }
    //     // 當 BId 不存在 {code: -2}
    //     // 當 group_name 為空 {code: -3}
    //     // 當 成功修改群組名稱 {code: 1}
    // }
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

module.exports = Utils.mongoDB.model('ItemBaseInfo', ItemBaseInfoSchema)