let mongoose = require('mongoose');
let Utils = require('../../utils/utils.js');

let UserSchema = new mongoose.Schema(
{
	user: {
    	type: Number,
    	default: 1
  	},
	genger:{
    	type: Number,
    	default: 1
  	},
  	is_login: {
    	type: Number,
    	default: 1
  	},
  	uaername: String,
  	email: String,
  	password: String
},
{
  collection: 'user', // 設定指定的 collection
  versionKey: false // 不再加上 _v，預設會加上
})

// 鉤子
UserSchema.pre('save', function(next){
	this.password = Utils.encrypt(this.password)
	return next()
})

// 靜態
UserSchema.statics.login = async function(email, obj){
	let findId = await this.findOne({ _id: obj._id})
	let findOne = await this.findOne({email: email})
	if( findId === null ){
		return { code: -1 }
	}
	if(!findOne){
		return {code: -2}
	}
	let checkPassword = Utils.confirm(obj.password, findOne.password)
	if(!checkPassword){
    	return {code: -3}
  	}
	return {code: 1}
	// 當 _id 不存在時，請註冊，返回 { code: -1}  // 請正確註冊使用者
	// 當 email 不存在時，返回 { code: -2 } 		// 請正確輸入信箱
	// 當 password 不存在時，返回 { code: -3 } 	// 請正確輸入密碼
	// 當 驗證成功時，返回 { code: 1}
}
UserSchema.statics.logout = async function(email, obj){
	let findId = await this.findOne({ _id: obj._id})
	let findOne = await this.findOne({email: email})
	if(!findOne){
		return { code: -1}
	}
	return { code: 1}
	// 當 _id 不存在時，請註冊，返回 { code: -1}  // 請正確註冊使用者
	// 當 email 不存在時，返回 { code: -2 } // 請正確輸入信箱
	// 當 驗證成功時，返回 { code: 1} 
}
UserSchema.statics.registered = async function(email, obj){
	let findOne = await this.findOne({email: email})
	if(findOne){
		return {code: -1}
	}
	let checkPassword = obj.password === obj.checkPassword
	if(!checkPassword){
		return {code: -2}
	}
	return {code: 1}
	// 當 email 存在時，返回 { code: -1 }
	// 當 password 不相等時，返回 { code: -2 }
	// 當 驗證成功時，返回 { code: 1 }
}
UserSchema.statics.resetCode = async function(email, obj){
	let findOne = await this.findOne({email: email})
	if(!findOne){
		return {code: -1}
	}
	let checkPassword = obj.password === obj.checkPassword
	if(!checkPassword){
		return {code: -2}
	}
	return {code: 1}
	// 當 email 不存在時，返回 { code: -1 } // 請正確輸入信箱
	// 當 password 不相等時，返回 { code: -2} // 請正確輸入密碼
	// 當 驗證成功時，返回 { code: 1}
}
UserSchema.statics.changePassword = async function(email, type){
	let newPassword = Utils.encrypt(type.password)
	let request = await this.updateOne({ email: email }, { password: newPassword}).then((doc)=>{
			return doc
	})
	let result = null
	if(Object.values(request)[1] === 1){
		result = 1
	}
	if(Object.values(request)[1] === 2){
		result = 2
	}
	return result
	// 1 修改成功
	// 2 修改不成功
}
UserSchema.statics.changeIsLogin = async function(email, type){
	let findOne = await this.findOne({email: email})
	let checkIsLogin = findOne.is_login
	let result = null
	if(checkIsLogin === 1){
		await this.updateOne({ _id: findOne._id }, {is_login: type}).then((doc)=>{
			return doc
		})
		result = type
	}
	if(checkIsLogin === 2){
		await this.updateOne({ _id: findOne._id }, {is_login: type}).then((doc)=>{
			return doc
		})
		result = type
	}
	return result
	// 1 修改狀態，不登入
	// 2 修改狀態，已登入
}

UserSchema.statics.registeredGetID = async function(){
	let findOne = await this.find()
	if(findOne.length === 0){
		return 1
	}
	let id = await this.find({}).sort({_id: -1}).limit(1)
	return id[0].user_id + 1
	// 當 Doc 為 0 返回 1
	// 當 Doc 大於 1 返回最後一個 id + 1
}

module.exports = Utils.mongoDB.model('User', UserSchema)