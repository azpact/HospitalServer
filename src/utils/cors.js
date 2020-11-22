module.exports = {
	cors:(ctx)=>{
		// 這樣就只能允許 "http://localhost:8080" 這個域名的請求
		ctx.set({'Access-Control-Allow-Origin':'http://localhost:8080'});
		// 設置所允許的 HTTP 請求方法
		ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
		// 字段是必須的它也是一個逗號分格的字符串，表明服務器支援的所有頭信息字段
		// 服務器收到請求以後，檢查 Origin、Access-Control-Request-Method和Access-Control
		ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
		// Content-Type 表示具體請求的媒體類別信息
		ctx.set("Content-Type", "application/json;charset=utf-8");
		// 這個字段可選。表示是否允許發送 Cookie。默認情況下,Cookie 不包含在 CORS 請求中
		// 當設置成允許請求攜帶 Cookie 時，需要保證 "Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
		ctx.set("Access-Control-Allow-Credentials", true);
		// 這個字段可選。用來指定本次域檢請求的有效期，單位為秒。
		// 當請求方法是 PUT 或 DELETE 等特殊方法或者 Content-Type 字段的類型是 application/json 時，服務器會提前發送一次請求進行驗證
		// 以下的設置只有本次驗證的有效時間，即在該時間對內服務器可以不用進行驗證
		ctx.set("Access-Control-Max-Age", 300);
	}
}