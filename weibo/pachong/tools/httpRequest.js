const https = require('https');
const querystring = require('querystring');

var requestHttps = function(options) {
	let promise = new Promise(function(resolve, reject) {
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


var requestPostHttps = function(options, data) {
	var contents = querystring.stringify({
		data:JSON.stringify(data)
	});
	// let contents = 'data='+ JSON.stringify(data);
	options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	options.headers['Content-Length'] = contents.length;
	console.log(contents)
	let promise = new Promise(function(resolve, reject) {
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
		req.write(contents);
		req.end();
	});
	return promise;
}


module.exports = {
	requestHttps,
	requestPostHttps
}
