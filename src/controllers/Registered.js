const Mod = require('../routers/routers.js')
const Utils = require('../utils/utils.js')

module.exports = {
	index: async( ctx ) => {
	
		let result = ""

		ctx.body = "觀察頁"
	},
	test: async (ctx)=>{
		let code = await Mod.MUserGroup.groups("First", "IXV9905", "1", "1", "1")
		ctx.body = code
	}
}