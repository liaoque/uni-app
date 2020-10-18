// const https = require('https');
const https = require('https');
const vm = require('vm');
const querystring = require('querystring');
// https://wq.jd.com/deal/masset/userasset?reg=1&action=1&giftcardtype=1&isnew=1&skunum=41293494680_1&sceneval=2&setdefcoupon=0&r=0.08947073927112115&callback=userassetCbA&traceid=1028560044054495594

const jdOrder = require('./tb/order')
const getJdHeader = require('./tb/header')


let ptkey = 'AAJfixpBADDO4WH56HLis8ExzUNCPdNuaNB_qxGqeKM8v0qsj-STzdB-ZSv-lJGIccn-8pxTR6s';
let goodid = 602464099449;
let totalPrice = 203900;
let skuId = 4216062521187;
let token = '8ae78e34194a66e01699029efd7db1e7';

let header = getJdHeader(ptkey);


let result = jdOrder.requestActionOrder(goodid, skuId, token, header);
	// result.then(function(result) {
	// 	console.log("requestActionOrder", result)
		
	// 	return false;
	// }, function(error) {
	// 	console.log("err" + error.toString())
	// })


