const mongoose = require('mongoose');
const Utils = require('../utils/utils.js')

exports.loginPlugin = function loginPlugin(schema, option){
	// 擴展
	schema.statics.login = async function(username, password, cb){
		let findOne = await this.findOne({username: username})
		if(!findOne){
			return {code: -1}
		}
		let checkpassword = Utils.confirm(password,findOne.password)
		if(!checkpassword){
			return {code: -2}
		}
		return {code: 1}
	// 當用戶不存在返回 {code: -1}
	// 當密碼不正確返回 {code: -2}
	// 當驗證為正確返回 {code: 1}
	}
}