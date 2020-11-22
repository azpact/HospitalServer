// const CryptoJS = require("crypto-js");
// const { PythonShell } = require('python-shell')

// 引入 modules
// const CallModule = require('../modules/Call.js')

module.exports = {
	call: async(ctx)=>{
		ctx.set({
			'Access-Control-Allow-Origin':'*'
		});
		const { method } = ctx
		if(method === 'GET'){
			ctx.body = { name: 'Ben', age: '18' }
		} else if(method === 'POST'){
			console.log(JSON.parse(ctx.request.body))
			ctx.body = {name:"ben"}
			// let { username, email, password, age }  = JSON.parse(ctx.request.body)

			// const pswd = "loveCode"; 
			// let c = CryptoJS.AES.decrypt(`${password}`, pswd).toString(CryptoJS.enc.Utf8)
			// console.log(c)
			
			// ctx.body = { 
			// 	success: true, 
			// 	username: `${username}`,
			// 	email: `${email}`,
			// 	password: CryptoJS.AES.decrypt(`${password}`, pswd).toString(CryptoJS.enc.Utf8),
			// 	age: `${age}`
			// }
			
		}
	},/*
	salt:async(ctx)=>{
		const { method } = ctx
		if(method === 'GET'){
			ctx.body = { name: 'Ben', age: '18' }
		} else if(method === 'POST'){
			let { username, email, password, age }  = ctx.request.body
			console.log(ctx.request.body)
			ctx.body = { 
				success: true, 
				username: `${username}`,
				email: `${email}`,
				password: `${password}`,
				age: `${age}`
			}
		}
	},
	array: async(ctx)=>{
		let options = {
			args:
			[
			ctx.query.name,
			ctx.query.from
			]
		}
		ctx.body = await CallModule.array(options)
	},
	get: async(ctx)=>{
		ctx.body = { name: 'Ben', age: '18' }
	},
	post: async(ctx)=>{
		// const {name} = ctx.query
		// const result = `{"name":"${name}"}`
		// console.log(result)
		ctx.type = 'josn'
		// ctx.response.body = result
	},
	login: async(ctx)=>{

		ctx.set("Access-Control-Allow-Origin", "*");
		let data = ctx.request.body
		console.log(data)
		// if (!ctx.session.usr) {
		// 	console.log(`11 ${data}`)
		// 	ctx.session = data;
		// 	ctx.body = {success:true,msg:'you are first login'};
		// } else {
		// 	console.log(`hello, ${ctx.session.usr}`)
		// 	ctx.body = {success:true,message:`hello ${ctx.session.usr}`};
		// }
		ctx.body = {use:'sas'}

		// let c = ctx.session.userinfo = {username: '123', userID: '00625'}
		// console.log(c)
		// const { method } = ctx
		// if(method === 'GET'){
		// 	console.log(ctx.session.userinfo);
		// 	ctx.body = { type: 'login'}
		// } else if(method === 'POST'){
		// 	const { email, password } = ctx.request.body
		// 	const dbEamil = 1;
		// 	const dbPassword = 2;

		// 	if(!email){
		// 		ctx.body = {msg:"信箱為空"}
		// 	} else if(!password){
		// 		ctx.body = {msg:"密碼為空"}
		// 	} else if(email != dbEamil){
		// 		ctx.body = {msg:"信箱不正確"}
		// 	} else if(password != dbPassword){
		// 		ctx.body = {msg:"密碼不正確"}
		// 	} else{

		// 		ctx.body = {code: '1', message: '登陸成功'}
		// 		 ctx.session.userInfo = {username: '123', userID: '00625'}
		// 		console.log(ctx.session.userInfo)
		// 	} 
		// 	// let { username } = ctx.request.body
		// 	// 保存登陸狀態，會在瀏覽器中生成一個以 koa:sess 為 name 的 cookie
		// 	// 
		// 	// ctx.body = {code: 1, message: '登陸成功'}
		// }
	},
	python: async(ctx)=>{
		return new Promise(((resolve, reject)=>{
			let options = {
				args:[
				ctx.query.name,
				ctx.query.from
				]
			}

			PythonShell.run('src/data/process.py',options, (err,result)=>{
				if(err){
					return reject(err);
				}else{
					resolve(result);
				}
				ctx.type = 'json'
				ctx.body = result[0]
			})
		}))
	},*/
	
}

