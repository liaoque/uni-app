// getJdHeader(ptkey)
const vm = require('vm');
const httpRequest = require('../tools/httpRequest')
const querystring = require('querystring');

var crypto = require('crypto');
var md5 = crypto.createHash('md5');

// // 	d = d.replace(/\s+/g, " ")
// // 	d = d.match(/window.dealData =((?!\/\/).)+/ig)
// // 	var script = new vm.Script("window={};" + d)
// // 	let res = script.runInThisContext();

let options = {
	hostname: '',
	port: 443,
	path: '',
	method: 'GET',
	headers: ''
};



var requestUser = function(token, header) {
	// let url = '/norder/order.action?wareId=' + goodid + '&wareNum=1&enterOrder=true';
	let url = '/h5/mtop.user.getusersimple/1.0/?'
	let hostname = 'h5api.m.taobao.com'
	let u = (new Date).getTime()
	let appKey = '12574478'
	let data = {}
	let jsonStr = JSON.stringify(data)
	let signStr = token + "&" + u + "&" + appKey + "&" + jsonStr;

// jsv: 2.6.1
// appKey: 12574478
// t: 1605418626760
// sign: b678d9862df10d857ef0037f576acfdb
// api: mtop.user.getUserSimple
// v: 1.0
// ecode: 1
// sessionOption: AutoLoginOnly
// jsonpIncPrefix: liblogin
// type: jsonp
// dataType: jsonp
// callback: mtopjsonpliblogin1
// data: {}
	params = {
		jsv: '2.5.8',
		appKey: appKey,
		t: u,
		sign: md5.update(signStr).digest('hex'),
		api: 'mtop.user.getUserSimple',
		v: '1.0',
		ecode: 1,
		sessionOption: 'AutoLoginOnly',
		jsonpIncPrefix: 'liblogin',
		type: 'jsonp',
		dataType: 'jsonp',
		callback: '',
		data: '{}'
	}
	options.hostname = hostname;
	params = querystring.stringify(params);
	options.path = url + params;
	// options.path = "https://h5api.m.taobao.com/h5/mtop.user.getusersimple/1.0/?jsv=2.6.1&appKey=12574478&t=1605420952271&sign=33f2015070f645477f9774d6fddc0753&api=mtop.user.getUserSimple&v=1.0&ecode=1&sessionOption=AutoLoginOnly&jsonpIncPrefix=liblogin&type=jsonp&dataType=jsonp&callback=mtopjsonpliblogin1&data=%7B%7D";
	options.headers = header;

	return httpRequest.requestHttps(options).then(function(res) {
		console.log(res)
		// d = d.replace(/\s+/g, " ")
		// d = d.match(/window.dealData =((?!\/\/).)+/ig)
		// var script = new vm.Script("window={};" + d)
		// let res = script.runInThisContext();
		return res;
	}, function(e) {
		console.log("eeee", e)
	});
}


var requestActionConfirm = function(res, header) {
	// ?paytype=0&paychannel=1&action=1&reg=1&type=0&token2=83DA8B51418E6CA1F1D3653E6B3E0FDE&dpid=&skulist=41293494680
	// &scan_orig=&gpolicy=&platprice=0&ship=2|67|72230|||||||||||||||0,-1939875778,874425415497097217,874425415555817472,101612_874425417280684032,101613_874425417326821376||
	// &pick=&savepayship=0&valuableskus=41293494680,1,243900,15254&commlist=41293494680,,1,41293494680,1,0,0
	// &sceneval=2&setdefcoupon=0&r=0.842662061562917&callback=confirmCbA&traceid=1028646793803930194



	// ?paytype=0&paychannel=1&action=1&reg=1&type=0&token2=83DA8B51418E6CA1F1D3653E6B3E0FDE&dpid=&skulist=41293494680
	// &scan_orig=&gpolicy=&platprice=0&ship=2|67|72230|||||||||||||||0,-1939875778,874425415497097217,874425415555817472,101612_874425417280684032,101613_874425417326821376||
	// &pick=&savepayship=0&valuableskus=41293494680,1,243900,15254&commlist=41293494680,,1,41293494680,1,0,0
	// &sceneval=2&setdefcoupon=0&r=0.842662061562917&callback=confirmCbA&traceid=1028646793803930194

	let goodid = res.skulist;
	let traceId = res.traceId;
	let params = {
		paytype: 0,
		paychannel: 1,
		reg: 1,
		type: 0,
		action: 1,
		token2: 1,
		dpid: '',
		scan_orig: '',
		gpolicy: '',
		pick: '',
		ship: '2|67|' + res.order.orderprice.venderFreight[0].venderId +
			'|||||||||||||||0,-1939875778,874425415497097217,874425415555817472,101612_874425417280684032,101613_874425417326821376||',
		platprice: '0',
		skulist: goodid,
		isnew: 1,
		sceneval: 2,
		savepayship: 0,
		setdefcoupon: 0,
		callback: 'confirmCbA',
		traceid: traceId,
		r: '0.9528282188067401',
		valuableskus: goodid + ",1," + res.order.orderprice.totalPrice + ',' + '15254',
		commlist: goodid + ",,1," + goodid + ',1,0,0',
	}
	params = querystring.stringify(params);
	path = "/deal/msubmit/confirm?" + params;
	options.hostname = 'wq.jd.com';
	options.path = path;

	return httpRequest.requestHttps(options).then(function(d) {
		var script = new vm.Script("function confirmCbA(e) {return (e)};" + d)
		let res = script.runInThisContext();
		return res;
	});

}


module.exports = {
	requestUser,
	requestActionConfirm
}
