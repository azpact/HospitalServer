module.exports = {
	json(data){
		return JSON.stringify(data);
	},
	obj(data){
		return JSON.parse(data)
	}
}