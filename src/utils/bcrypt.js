const bcrypt = require('bcrypt');
const saltRounds = 10; // 加密長度，整數型態，數值越高越安全。
module.exports = {
	encrypt:(myPassword)=>{ // 進行加密
		return bcrypt.hashSync(myPassword, saltRounds); // 此段為加密
	},
	confirm:(leftPassword, rightPassword)=>{ // 驗證密碼
		return bcrypt.compareSync(leftPassword, rightPassword)
	}
};