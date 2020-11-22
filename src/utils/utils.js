const sum = (a, b) => {
	if(b) {
		return a + b
	} else {
 		return a
	}
}
const { PythonShell } = require('python-shell')

// 返回信用評價 
const creditRating = function(type){
	/*
	1	一顆星
	2	二顆星
	3	三顆星
	4	四顆星
	5	五顆星
	*/
	switch (type) {
		case 1:
			return "一顆星"
			break;
		case 2:
			return "二顆星"
			break;
		case 3:
			return "三顆星"
			break;
		case 4:
			return "四顆星"
			break;
		case 5:
			return "五顆星"
			break;
		default:
			// statements_def
			break;
	}
}
// 返回對應幣別
const currency = function(type){
	/*
	1	TWD	新台幣
	2	USD	美元
	3	ZAR	南非幣
	4	CNY	人民幣
	5	HKD	港幣
	6	AUD	澳幣
	7	JPY	日幣
	8	THB	泰幣
	9	CAD	加幣
	10	CHF	瑞士法郎
	11	EUR	歐元
	12	GBP	英鎊
	13	MYR	馬來幣
	14	NZD	紐西蘭幣
	15	SEK	瑞典幣
	16	SGD	新加坡幣
	*/
	switch (type) {
		case 1:
			return "TWD"
			break;
		case 2:
			return "USD"
			break;
		case 3:
			return "ZAR"
			break;
		case 4:
			return "CNY"
			break;
		case 5:
			return "HKD"
			break;
		case 6:
			return "AUD"
			break;
		case 7:
			return "JPY"
			break;
		case 8:
			return "THB"
			break;
		case 9:
			return "CAD"
			break;
		case 10:
			return "CHF"
			break;
		case 11:
			return "EUR"
			break;
		case 12:
			return "GBP"
			break;
		case 13:
			return "MYR"
			break;
		case 14:
			return "NZD"
			break;
		case 15:
			return "SEK"
			break;
		case 16:
			return "SGD"
			break;
		default:
			break;
	}
}

// 驗證是否為空值
const inputNullValue = function(obj){
		let inputNullValue = Object.values(obj).map(item=>{
			let regu = "^[ ]+$";
			let re = new RegExp(regu)
			if(item == null || item == "" || item.length == 0 || re.test(item)){
				return false
			}else{
				return true
			}
		})
		let isHaveFalse = inputNullValue.indexOf(false) != -1
		return isHaveFalse
		// 回傳 true 代表有空值
		// 回傳 false 代表沒有空值
	}

// 加密與驗證
const bcrypt = require('./bcrypt.js')

// Json & Obj
const changeJsonObj = require('./changeJsonObj.js')

// connection
const mongoDB = require('./mongoDB.js')

module.exports = {
	sum: sum,
	json: changeJsonObj.json,  	// 資料轉 Json
	obj: changeJsonObj.obj,		// 資料轉 Obj
	encrypt: bcrypt.encrypt,	// 資料加密
	confirm: bcrypt.confirm,	// 資料驗證
	mongoDB: mongoDB,			// 資料庫連結
	inputNullValue: inputNullValue,// 確認輸入是否為空值, true 空值 / false 沒有空值
	currency: currency,			// 幣別
	PythonShell:PythonShell 	// Python 小黑框
}
