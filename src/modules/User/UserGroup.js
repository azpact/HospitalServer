let mongoose = require('mongoose');
let Mod = require('../../routers/routers.js');
let Utils = require('../../utils/utils.js');

let UserGroupSchema = new mongoose.Schema(
{
	random_code: String,
    group_id: String, // random_code + 0~1
    group_name: String
},
{
  collection: 'userGroup', // 設定指定的 collection
  versionKey: false // 不再加上 _v，預設會加上
})


// 新增使用者群組
// 序號 隨機碼
UserGroupSchema.statics.groups = async function(type, randomCode, groupName, groupID, BId){
    // 取得 type = GET
    // 新增 type = POST
    // 新增 type = First
    // 修改 type = PUT

    // 在 userGroup 資料庫中找尋是否存在
    let findUserGroup = await Mod.MUserGroup.find({random_code: randomCode})
    // 取得當前 group_id 的最大數
    let friendGroupId = []
    for(let item of findUserGroup){
        friendGroupId.push(Number(item.group_id))
    }
    let maxGroupId = Math.max(...friendGroupId)
    let minGroupId = Math.min(...friendGroupId)
    // 在 userGroup 資料庫中 _id 是否存在
    let friendGroupBId = await Mod.MUserGroup.find({ _id: BId})
    // 確認  groupName 是否為空值
    let checkGroupName = Utils.inputNullValue(groupName)


    // 第一次新增
    // First
    if(type === "First"){
        let obj = {
            random_code: randomCode,
            group_id: 0,
            group_name: groupName
        }
        let objTwo = {
            random_code: randomCode,
            group_id: 1,
            group_name: groupName
        }
        let TheDoc = this(obj)
        let TheDocTwo = this(objTwo)
        TheDoc.save()
        TheDocTwo.save()
    }
    // GET
    if(type === "GET"){
        if(findUserGroup.length == 0){
            return {code: -1}
        } else if(maxGroupId == 5){
            return {code: 1, result: findUserGroup}
        }
        // 當 random_code 不存在 { code: -1 }
        // 當 random_code 不存在 { code: -1 }
    }
    // POST
    // 確認 random_code 的身份
    let finOne = await Mod.MUserRandom.find({ random_code: randomCode})
    // 確認 random_code 的身份
    let authrity = null
    if(!finOne){
        authrity = finOne[0].authority
    }

    if( type === "POST"){
        if(findUserGroup.length == 0){
            return {code: -1}
        } else if(finOne.length == 0){
            return {code: -2}
        } else if(authrity == 1 && maxGroupId < 3){
            // 當 authority 為 1，最多可以增加到 3 個群組
            let groupID = maxGroupId + 1
            let obj = {
                random_code: randomCode,
                group_id: groupID,
                group_name: groupName
            }
            let TheDoc = this(obj)
            TheDoc.save()
            return {code: 1}
        } else if(authrity == 2 && maxGroupId < 5){
            // 當 authority 為 2，最多可以增加到 5 個群組
             let groupID = maxGroupId + 1
            let obj = {
                random_code: randomCode,
                group_id: groupID,
                group_name: groupName
            }
            let TheDoc = this(obj)
            TheDoc.save()
            return {code: 1}
        } else if(authrity == 1 && maxGroupId == 3 || authrity == 2 && maxGroupId == 5 ){
            // 當 已達權限建立最大上限群組
            return {code: -3}
        } else{
            return {code: 2}
        }
        // 當 userGroup 內 randomCode 不存在 { code: -1 }
        // 當 userRandom 內 randomCode 不存在 { code: -2 }
        // 當 已達權限建立最大上限群組 { code: -3 }
        // 當 新增群組成功 { code: 1 }
        // 當 MC 身份增加群組 { code: 2 }
    }

    // PUT
    if(type === "PUT"){
        // 根據 _id 修改 group_name 狀態
        let findById = await this.findByIdAndUpdate({_id: BId}, {group_name: groupName})

        if(findUserGroup.length == 0){
           return {code: -1}
        } else if(friendGroupBId.length == 0){
            return {code: -2}
        } else if(checkGroupName){
            return {code: -3}
        } else {
            let findUpdate = await this.find({ _id: BId})
            return {code:1, result: findUpdate}
        }
        // 當 random_code 不存在 { code: -1 }
        // 當 BId 不存在 {code: -2}
        // 當 group_name 為空 {code: -3}
        // 當 成功修改群組名稱 {code: 1}
    }
}

module.exports = Utils.mongoDB.model('UserGroup', UserGroupSchema)