// const https = require('https');
const https = require('https');
const vm = require('vm');
const querystring = require('querystring');
// https://wq.jd.com/deal/masset/userasset?reg=1&action=1&giftcardtype=1&isnew=1&skunum=41293494680_1&sceneval=2&setdefcoupon=0&r=0.08947073927112115&callback=userassetCbA&traceid=1028560044054495594


let ptkey = 'AAJfixpBADDO4WH56HLis8ExzUNCPdNuaNB_qxGqeKM8v0qsj-STzdB-ZSv-lJGIccn-8pxTR6s';
let goodid = '65771425956';

let header = {
	'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108',
	'ACCEPT_LANGUAGE': "zh-CN,zh;q=0.9",
	'Sec_Fetch_Site': "cross-site",
	'Sec_Fetch_Mode': "cors",
	"Connection": 'keep-alive',
	'ACCEPT_ENCODING': "gzip, deflate, br",
	'ACCEPT': '*/*',
	'Referer': 'https://p.m.jd.com/norder/order.action?wareId=41293494680&wareNum=1&enterOrder=true',
	cookie: [
		'__jdu=11697516', 'shshshfpa=34e6f256-f31e-adb5-6953-e6eb756d017c-1587287561',
		'shshshfpb=vZat7PRxaVwXYuzT%20AjbtNQ%3D%3D',
		'3AB9D23F7A4B3C9B=AYOKB2KBJSNM72A7W6B7RB2K463PCEI4DHGXWXRTFBB6UM3VRAMRXUFIV272RMETKS3U5QGONEOPTI6ALTZPNT76WQ',
		'mba_muid=11697516', 'pt_key=' + ptkey,
		'pt_pin=%E4%BA%86%E7%BC%BA123', 'pwdt_id=%E4%BA%86%E7%BC%BA123', 'sid=b65c6ffd03463e047b53f463d64da32w',
		'__jda=209449046.11697516.1577627067.1602864266.1602939904.12',
		'__jdv=209449046%7Ckong%7Ct_1000833461_%7Cjingfen%7C4726e13d48c744f4a302390c164c3a3b%7C1602939904140',
		'__jdc=209449046', 'CCC_SE=', 'RT="z=1&dm=jd.com&si=jzq23841ude&ss=kgdp15jp&sl=2&tt=1s1&ld=1qa&ul=47y&hd=4dt"',
		'wxa_level=1', 'cid=9', 'retina=1', 'jxsid=16029399096402305336', 'webp=1', 'visitkey=34926170557776653',
		'PPRD_P=EA.17051.5.1-UUID.11697516-LOGID.1602939910644.1356109844', 'sc_width=360',
		'shshshfp=712f19b12fe30139d764a7741fd359f1', 'sk_history=41293494680%2C',
		'wq_addr=752426099%7C12_988_4346_48057%7C%u6C5F%u82CF_%u82CF%u5DDE%u5E02_%u592A%u4ED3%u5E02_%u6C99%u6EAA%u9547%7C%u6C5F%u82CF%u82CF%u5DDE%u5E02%u592A%u4ED3%u5E02%u6C99%u6EAA%u9547%u65B0%u5317%u4E1C%u8DEF%u54CE%u5440%u5440%u697C%u4E0A3%u697C%7C121076401%2C31569901',
		'addrId_1=752426099',
		'mitemAddrName=%u6C5F%u82CF%u82CF%u5DDE%u5E02%u592A%u4ED3%u5E02%u6C99%u6EAA%u9547%u65B0%u5317%u4E1C%u8DEF%u54CE%u5440%u5440%u697C%u4E0A3%u697C',
		'mitemAddrId=12_988_4346_48057', 'jxsid_s_u=https%3A//p.m.jd.com/norder/order.action',
		'cd_eid=AYOKB2KBJSNM72A7W6B7RB2K463PCEI4DHGXWXRTFBB6UM3VRAMRXUFIV272RMETKS3U5QGONEOPTI6ALTZPNT76WQ',
		'shshshsID=17b107e6716d4da6fe6c1412e981b3cd_5_1602940095650', 'cartLastOpTime=1602940148',
		'wq_logid=1602940148_1804289383',
		'wqmnx1=MDEyNjM1M3BwZC9lZGM/STI0d3VlTz04MjU2b2EgdW5kO0cgZDJBV3QuSyxla2gvLi5NZWEzMUZmYWFCNFFFUylGKUg%3D',
		'__jdb=209449046.7.11697516|12.1602939904', 'mba_sid=1602939904143597384266824325.7',
		'unpl=V2_ZzNtbUdRQBIhCEQBfhAOA2IGRVgSVUIWdwBHBnseWVdlUxAOclRCFnQURlVnGVoUZAMZXEZcQhBFCEZkexhdBG4BEFhFV3MldgtHUHgcWAdlMxFdclZzFXUPTlJ/GVs1VwMaWnJSQxZ9CkNcfh5VBFfbisCUxfgScg92VUsYbAVvAxFaQ1JCEHw4Bzp9Gl8HZk4SXUVfRRF1D3ZVSxo=',
		'__wga=1602940148704.1602939910624.1602939910624.1602939910624.6.1', 'jxsid_s_t=1602940148767',


	]
};


let url = '/norder/order.action?wareId=' + goodid + '&wareNum=1&enterOrder=true';
let hostname = 'p.m.jd.com'
let options = {
	hostname: hostname,
	port: 443,
	path: url,
	method: 'GET',
	headers: header
};


httpRequest(options, function(d) {
	d = d.replace(/\s+/g, " ")
	d = d.match(/window.dealData =((?!\/\/).)+/ig)
	var script = new vm.Script("window={};" + d)
	let res = script.runInThisContext();
	// console.log(res)
	let traceId = res.traceId;

	// if (res.order.orderprice.totalPrice < 203900) {
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

		// ?paytype=0&paychannel=1&action=1&reg=1&type=0&token2=83DA8B51418E6CA1F1D3653E6B3E0FDE&dpid=&skulist=41293494680
		// &scan_orig=&gpolicy=&platprice=0&ship=2|67|72230|||||||||||||||0,-1939875778,874425415497097217,874425415555817472,101612_874425417280684032,101613_874425417326821376||
		// &pick=&savepayship=0&valuableskus=41293494680,1,243900,15254&commlist=41293494680,,1,41293494680,1,0,0
		// &sceneval=2&setdefcoupon=0&r=0.842662061562917&callback=confirmCbA&traceid=1028646793803930194
		params = querystring.stringify(params);
		path = "/deal/msubmit/confirm?" + params
		// console.log(path);return ;
		options.hostname = 'wq.jd.com';
		options.path = path;
		httpRequest(options, function(d) {
			console.log(d)
			var script = new vm.Script("function confirmCbA(e) {return (e)};" + d)
			let res = script.runInThisContext();
			console.log(res)
		});
	// }


});





// httpRequest(options, function(d) {
// 	d = d.replace(/\s+/g, " ")
// 	d = d.match(/window.dealData =((?!\/\/).)+/ig)
// 	var script = new vm.Script("window={};" + d)
// 	let res = script.runInThisContext();
// 	// console.log(res)
// 	let traceId = res.traceId;
// 	let params = {
// 		reg:1,
// 		action:1,
// 		giftcardtype:1,
// 		isnew:1,
// 		sceneval:2,
// 		setdefcoupon:0,
// 		callback:'userassetCbA',
// 		traceid:traceId,
// 		r: '0.9528282188067401',
// 		skunum: goodid + "_1",
// 	}

// 	params = querystring.stringify(params);
// 	url = '/deal/masset/userasset?' + params;
// 	options.hostname = 'wq.jd.com';
// 	options.path = url;
// 	httpRequest(options, function(d) {
// 		console.log(d)
// 		return ;
// 		var script = new vm.Script("function userassetCbA(e) {return (e)};" + d)
// 		let res = script.runInThisContext();
// 		console.log(res)
// 		if (res.order.orderprice.totalPrice < 203900) {
// 			let params = {
// 				paytype:0,
// 				paychannel:1,
// 				reg:1,
// 				type:0,
// 				action:1,
// 				token2:1,
// 				dpid:'',
// 				scan_orig:'',
// 				gpolicy:'',
// 				pick:'',
// 				ship:'2|67|'+ res.order.orderprice.venderFreight[0].venderId  + '|||||||||||||||0,-1939875778,874425415497097217,874425415555817472,101612_874425417280684032,101613_874425417326821376||',
// 				platprice:'0',
// 				skulist:goodid,
// 				isnew:1,
// 				sceneval:2,
// 				savepayship:0,
// 				setdefcoupon:0,
// 				callback:'confirmCbA',
// 				traceid:traceId,
// 				r: '0.9528282188067401',
// 				valuableskus: goodid + ",1," + res.order.orderprice.totalPrice  + ',' + '15254',
// 				commlist: goodid + ",,1," + goodid+ ',1,0,0',
// 			}

// 			// ?paytype=0&paychannel=1&action=1&reg=1&type=0&token2=83DA8B51418E6CA1F1D3653E6B3E0FDE&dpid=&skulist=41293494680
// 			// &scan_orig=&gpolicy=&platprice=0&ship=2|67|72230|||||||||||||||0,-1939875778,874425415497097217,874425415555817472,101612_874425417280684032,101613_874425417326821376||
// 			// &pick=&savepayship=0&valuableskus=41293494680,1,243900,15254&commlist=41293494680,,1,41293494680,1,0,0
// 			// &sceneval=2&setdefcoupon=0&r=0.842662061562917&callback=confirmCbA&traceid=1028646793803930194

// 			path =
// 				"/deal/msubmit/confirm?=0&paychannel=1&action=1&reg=1&type=0&token2=83DA8B51418E6CA1F1D3653E6B3E0FDE&dpid=&skulist=41293494680&scan_orig=&gpolicy=&platprice=0&ship=2|67|72230|||||||||||||||0,-1939875778,874425415497097217,874425415555817472,101612_874425417280684032,101613_874425417326821376||&pick=&savepayship=0&valuableskus=41293494680,1,243900,15254&commlist=41293494680,,1,41293494680,1,0,0&sceneval=2&setdefcoupon=0&r=0.842662061562917&callback=confirmCbA&traceid=1028646793803930194"
// 			// path = "/deal/msubmit/confirm?paytype=0&paychannel=1&action=1&reg=1&type=0&token2=5915BE07C71DCB2E32D1EAE87CF10214&dpid=&skulist=66632032884&scan_orig=&gpolicy=&platprice=0&ship=2|67|10250057|||||||||||||||0,-1939875778,874431167165280262,874431167240777728,101612_874431169411096576,101613_874431169457233920||&pick=&savepayship=0&valuableskus=66632032884,1,129900,14202&commlist=66632032884,,1,66632032884,1,0,0&sceneval=2&setdefcoupon=0&r=0.2513420558211257&callback=confirmCbA&traceid=1028626083471653357"
// 			// options.hostname = 'wq.jd.com';
// 			options.path = url;
// 			httpRequest(options, function(d) {
// 				var script = new vm.Script("function confirmCbA(e) {return (e)};" + d)
// 				let res = script.runInThisContext();
// 				console.log(res)
// 			});
// 		}
// 	});

// });

function httpRequest(options, callback) {
	let rawData = '';
	const req = https.request(options, (res) => {
		console.log('状态码:', res.statusCode);
		console.log('请求头:', res.headers);

		res.on('data', (d) => {
			rawData += d;
		});
		res.on('end', () => {
			callback(rawData);
		});
	});
	req.on('error', (e) => {
		console.error(e);
	});
	req.end();

}
