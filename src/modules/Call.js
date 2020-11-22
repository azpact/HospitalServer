const { PythonShell } = require('python-shell')

module.exports = {
	array: async(options)=>{
		let newPromise =  new Promise(((resolve,reject)=>{
			PythonShell.run('./process.py',options, (err,result)=>{
				if(err){
					return reject(err);
				}else{
					resolve(result);
				}
			})
		}))
		let thenPromise = newPromise.then(value=>{
			return value[0]
		})
		return thenPromise
	}
}