const Cons = require('./routers.js')

module.exports = (app) => {
	const bodyParser = require('koa-bodyparser')
	const Router = require('koa-router');
	const router = new Router({
		prefix: '/api/v1'
	});
    
	router.get('/', ctx => {ctx.body = '首頁'})
	router.get('/login', Cons.CUser.login)
	router.get('/logout', Cons.CUser.logout)
	router.get('/registered', Cons.CUser.registered)
	router.get('/reset_code', Cons.CUser.resetCode)

	// router.get('/register', Cons.Registered.index)


	// router.get('/python', Cons.PythonTest.sum)
	
	app.use(bodyParser())  //方便提取 POST 資料
	app.use(router.routes()).use(router.allowedMethods())
}
