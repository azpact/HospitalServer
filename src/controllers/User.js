const Mod = require('../routers/routers.js')
const Utils = require('../utils/utils.js')

module.exports = {
	login: async( ctx ) => {
		let obj = {
			_id: "5fb7b9a7591def1148d80594",
			email: "w53652456@gmail.com",
			password: "123as",
		}
		let User = obj
		let result = null

		// 確認使用者信箱
		let checkEmail = await Mod.MUser.login(User.email, User)
		let checkEmailCode = Object.values(checkEmail)[0]
		// 變更登入狀態
		if( checkEmailCode !== 1 ){
			result = checkEmail;
		}
		if( checkEmailCode === 1 ){
			await Mod.MUser.changeIsLogin(User.email, 2)
			result = checkEmail;
		}
		ctx.body = result
		// 當 _id 不存在時，請註冊，返回 { code: -1}  // 請正確註冊使用者
		// 當 email 不存在時，返回 { code: -2 } 		// 請正確輸入信箱
		// 當 password 不存在時，返回 { code: -3 } 	// 請正確輸入密碼
		// 當 驗證成功時，返回 { code: 1}
	},
	logout: async( ctx ) =>{
		let obj = {
			_id: "5fb7b9a7591def1148d80594",
			email: "w53652456@gmail.com",
		}
		let User = obj
		let result = null
		let checkEmail = await Mod.MUser.logout(User.email, obj)
		let checkEmailCode = Object.values(checkEmail)[0]

		if( checkEmailCode !== 1 ){
			result = checkEmail;
		}
		if( checkEmailCode === 1 ){
			await Mod.MUser.changeIsLogin(User.email, 1)
			result = checkEmail;
		}
		ctx.body = result;
		// 當 _id 不存在時，請註冊，返回 { code: -1}  // 請正確註冊使用者
		// 當 email 不存在時，返回 { code: -2 } // 請正確輸入信箱
		// 當 驗證成功時，返回 { code: 1} 
	},
	registered: async( ctx ) =>{
		let obj = {
			user: 1,
			genger: 1,
			username: "Ben",
			email: "w536524562@gmail.com",
			password: "123as",
			checkPassword: "123as",
		}
		let User = obj
		let result = null

		// 確認使用者信箱
		let checkEmail = await Mod.MUser.registered(User.email, User)
		let checkEmailCode = Object.values(checkEmail)[0]
		if( checkEmailCode !== 1 ){
			result = checkEmail;
		}
		if( checkEmailCode === 1 ){
			let TheDoc = Mod.MUser({
				user: User.user,
				genger: User.genger,
				username: User.username,
				email: User.email,
				password: User.password,
			})		
			await TheDoc.save().then((doc)=>{
				return doc
			})
			result = checkEmail;
		}
		ctx.body = result;
		// 當 email 存在時，返回 { code: -1 }
		// 當 password 不相等時，返回 { code: -2 }
		// 當 驗證成功時，返回 { code: 1 }
	},
	resetCode: async( ctx ) =>{
		let obj = {
			email: "w53652456@gmail.com",
			password: "123",
			checkPassword: "123"
		}
		let User = obj
		let result = null

		// 確認使用者信箱
		let checkEmail = await Mod.MUser.resetCode(User.email, User)
		let checkEmailCode = Object.values(checkEmail)[0]
		if( checkEmailCode !== 1 ){
			result = checkEmail;
		}
		if( checkEmailCode === 1 ){
			result= await Mod.MUser.changePassword(User.email, User)
		}
		ctx.body = result
	},
	watch: async( ctx ) => {
	
		let result = ""

		ctx.body = "觀察頁"
	},
	test: async (ctx)=>{
		let code = await Mod.MUserGroup.groups("First", "IXV9905", "1", "1", "1")
		ctx.body = code
	}
}