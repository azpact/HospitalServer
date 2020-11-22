let mongoose = require('mongoose');
let Utils = require('../../utils/utils.js');

let UserRandomSchema = new mongoose.Schema(
{
	user_id: Number,
	random_code: String,
    authority: Number,
	is_login: {
		type: Boolean,
		default: false
	}
},
{
  collection: 'userRandom', // 設定指定的 collection
  versionKey: false // 不再加上 _v，預設會加上
})

UserRandomSchema.statics.isLogin = async function(randomCode, type){
    let findRandomCode = await this.findOne({random_code: randomCode})
    let result = ""
     let updateOneIsLogin = null

    if(!findRandomCode){
        return {code: -1}
    }
    if(findRandomCode && type){
        updateOneIsLogin = await this.updateOne(
            { random_code: randomCode}, 
            { is_login: true}
        )
        return {code: 1}
    } else{
        updateOneIsLogin = await this.updateOne(
            { random_code: randomCode}, 
            { is_login: false}
        )
        return {code: 2}
    }
    // 當沒有找到使用者 {code: -1}
    // 當使用者登入成功 {code: 1}
    // 當使用者登出成功 {code: 2}
}
UserRandomSchema.statics.allRandomCode = async function(){
    return this.find()
}

UserRandomSchema.statics.randomCodeFn = async function(){
	// 基礎設定
	let min = 1
	let max = 9999
	// 亂數產生
	let theRandom = Math.floor(Math.random()*(max-min+1)+min);
	// 亂數英文
	let text = ""
	let theMax = 3
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for(let i = 0; i < theMax ; i++){
    	text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text + theRandom 
}

UserRandomSchema.statics.randomCode = async function(userId){
    let findOne = await this.find()
    let randomCodeFn = await this.randomCodeFn()
    let findRandomCode = await this.findOne({random_code: randomCodeFn})
    if(findRandomCode){
    	result = {code: -1}
    }else{
    	result = {code: 1, result: randomCodeFn}
    }
    return result
    // 當重複 User 內的 random_code {code: -1}
    // 當不重複 User 內的 random_code {code: 1, result: data}
}

module.exports = Utils.mongoDB.model('UserRandom', UserRandomSchema)