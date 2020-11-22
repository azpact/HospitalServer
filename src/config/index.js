module.exports = {
	'backEndURL':{
		scheme: 'http',
		host:'localhost',
		port:3200,
		join: ()=>{
			`${this.scheme}://${this.host}:${this.port}`
		},
	},
	'mongodbURL': 'mongodb://localhost:27017/Hostpital'
}