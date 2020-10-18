// const https = require('https');
const https = require('https');
const vm = require('vm');
const querystring = require('querystring');
// https://wq.jd.com/deal/masset/userasset?reg=1&action=1&giftcardtype=1&isnew=1&skunum=41293494680_1&sceneval=2&setdefcoupon=0&r=0.08947073927112115&callback=userassetCbA&traceid=1028560044054495594

const jdOrder = require('./jd/order')
const getJdHeader = require('./jd/header')


let ptkey = 'AAJfixpBADDO4WH56HLis8ExzUNCPdNuaNB_qxGqeKM8v0qsj-STzdB-ZSv-lJGIccn-8pxTR6s';
let goodid = '65771425956';
let totalPrice = 203900;


let header = getJdHeader(ptkey);



setInterval(() => {
	let result = jdOrder.requestActionOrder(goodid, header);
	result.then(function(result) {
		console.log("requestActionOrder", result.errMsg)
		if (result.order.orderprice.totalPrice < totalPrice) {
			result = jdOrder.requestActionConfirm(result, header);
			return result;
		}
		return false;
	}, function(error) {
		console.log("err" + error.toString())
	}).then(function(result) {
		console.log("requestActionConfirm", result)
	}, function(error) {
		console.log("err" + error.toString())
	})
}, 100);
