
const https = require('https');

var requestHttps = function(options){
	let promise = new Promise(function(resolve, reject){
		let rawData = '';
		console.log(options)
		const req = https.request(options, (res) => {
			console.log('状态码:', res.statusCode);
			console.log('请求头:', res.headers);
		
			res.on('data', (d) => {
				rawData += d;
			});
			res.on('end', () => {
				resolve(rawData.toString());
			});
		});
		req.on('error', (e) => {
			reject(e);
		});
		req.end();	
	});
	
	return promise;
}

module.exports = {
	requestHttps
}
