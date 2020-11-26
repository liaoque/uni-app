// getJdHeader(ptkey)
const vm = require('vm');
const httpRequest = require('../tools/httpRequest')
const querystring = require('querystring');

var crypto = require('crypto');


// // 	d = d.replace(/\s+/g, " ")
// // 	d = d.match(/window.dealData =((?!\/\/).)+/ig)
// // 	var script = new vm.Script("window={};" + d)
// // 	let res = script.runInThisContext();

let options = {
    hostname: '',
    port: 443,
    path: '',
    method: 'POST',
    headers: ''
};


var requestActionOrder = function (goodid, skuId, token, header) {
    let md5 = crypto.createHash('md5');
    let url = '/norder/order.action?wareId=' + goodid + '&wareNum=1&enterOrder=true';
    url = '/h5/mtop.trade.order.build.h5/4.0/?'
    let hostname = 'h5api.m.taobao.com'
    let u = (new Date).getTime()
    let appKey = '12574478'
    let data = {
        "enc": "?",
        "itemId": goodid,
        "exParams": "{\"etm\":\"\",\"tradeProtocolFeatures\":\"5\",\"userAgent\":\"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1\",\"buyFrom\":\"tmall_h5_detail\"}",
        "skuId": skuId,
        "quantity": 1,
        "buyNow": true,
        "_input_charset": "utf-8",
        "x-itemid": goodid + "",
        "spm": "a222m.7628550",
        "serviceId": null
    }
    let jsonStr = JSON.stringify(data)
    let signStr = token + "&" + u + "&" + appKey + "&" + jsonStr;

    params = {
        jsv: '2.5.8',
        appKey: appKey,
        t: u,
        sign: md5.update(signStr).digest('hex'),
        api: 'mtop.trade.order.build.h5',
        v: '4.0',
        type: 'originaljson',
        ttid: '#b#ip##_h5',
        isSec: 1,
        ecode: 1,
        AntiFlood: true,
        AntiCreep: true,
        H5Request: true,
        dataType: 'jsonp'
    }
    options.hostname = hostname;
    params = querystring.stringify(params);
    options.path = url + params;
    options.headers = header;

    return httpRequest.requestPostHttps(options, data).then(function (res) {
        // d = d.replace(/\s+/g, " ")
        // d = d.match(/window.dealData =((?!\/\/).)+/ig)
        // var script = new vm.Script("window={};" + d)
        // let res = script.runInThisContext();
        return res;
    }, function (e) {
        console.log("eeee", e)
    });
}


var requestActionConfirm = function (res, header) {
    let md5 = crypto.createHash('md5');
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

    return httpRequest.requestHttps(options).then(function (d) {
        var script = new vm.Script("function confirmCbA(e) {return (e)};" + d)
        let res = script.runInThisContext();
        return res;
    });

}


var requestActionCreate = function (res, token, header) {
    let md5 = crypto.createHash('md5');
    // https://h5api.m.taobao.com/h5/mtop.trade.order.create.h5/4.0/?jsv=2.6.1&appKey=12574478&t=1605427970850&sign=84bcbbd5d3b68ca7b350d6e9440fb078&v=4.0&post=1&type=originaljson&timeout=15000&dataType=json&isSec=1&ecode=1&api=mtop.trade.order.create.h5&ttid=%23t%23ip%23%23_h5_2019&H5Request=true&submitref=b0923040bf3572ecd998c26740bf338786b1745f8419324f89d4b942e0225d20
    let url = '/h5/mtop.trade.order.create.h5/4.0/?';
    let hostname = 'h5api.m.taobao.com'
    let u = (new Date).getTime()
    let appKey = '12574478'

    console.log(res)
    //
    let data = {
        // "{\"data\":\"{\\\"deliveryMethod_8c8006f2fa72aa480f77478cf961f073\\\":{\\\"ref\\\":\\\"003192e\\\",\\\"submit\\\":true,\\\"hidden\\\":{\\\"extensionMap\\\":{\\\"deliveryId\\\":\\\"8c8006f2fa72aa480f77478cf961f073\\\"}},\\\"type\\\":\\\"dinamicx$498$buyselect\\\",\\\"fields\\\":{\\\"confirm\\\":\\\"完成\\\",\\\"components\\\":[{\\\"ext\\\":\\\"{\\\\\\\"fareCent\\\\\\\":0,\\\\\\\"id\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"serviceType\\\\\\\":\\\\\\\"-4\\\\\\\",\\\\\\\"userChooseLogisticsInfo\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"childServiceType\\\\\\\\\\\\\\\":-4,\\\\\\\\\\\\\\\"cp\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"default\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"logisticsType\\\\\\\\\\\\\\\":0,\\\\\\\\\\\\\\\"serviceType\\\\\\\\\\\\\\\":-4}\\\\\\\"}\\\",\\\"id\\\":\\\"20\\\",\\\"price\\\":\\\"快递 免邮\\\",\\\"title\\\":\\\"普通配送\\\"}],\\\"price\\\":\\\"快递 免邮\\\",\\\"title\\\":\\\"配送方式\\\",\\\"asSelect\\\":{\\\"selectedIds\\\":[\\\"20\\\"]},\\\"value\\\":\\\"快递 免邮\\\",\\\"desc\\\":\\\"普通配送\\\"},\\\"events\\\":{\\\"itemClick\\\":[{\\\"type\\\":\\\"openSimplePopup\\\",\\\"fields\\\":{}}]},\\\"id\\\":\\\"8c8006f2fa72aa480f77478cf961f073\\\",\\\"tag\\\":\\\"deliveryMethod\\\"},\\\"address_1\\\":{\\\"ref\\\":\\\"f83ecc7\\\",\\\"submit\\\":true,\\\"hidden\\\":{\\\"extensionMap\\\":{\\\"useMDZT\\\":\\\"false\\\",\\\"useStation\\\":\\\"false\\\",\\\"lng\\\":\\\"120.625781\\\",\\\"selectedId\\\":\\\"8784804397\\\",\\\"linkAddressId\\\":\\\"0\\\",\\\"options\\\":\\\"[{\\\\\\\"addressDetail\\\\\\\":\\\\\\\"喜庆花园小区4栋403\\\\\\\",\\\\\\\"addressIconUrl\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"agencyReceiveDesc\\\\\\\":\\\\\\\"收货不便时,可选择暂存服务\\\\\\\",\\\\\\\"areaName\\\\\\\":\\\\\\\"相城区\\\\\\\",\\\\\\\"attributes\\\\\\\":[],\\\\\\\"baseDeliverAddressDO\\\\\\\":{\\\\\\\"address\\\\\\\":\\\\\\\"320507^^^江苏省^^^苏州市^^^相城区^^^元和街道 喜庆花园小区4栋403^^^ ^^^元和街道^^^320507001^^^31.351738^^^120.625781\\\\\\\",\\\\\\\"addressDetail\\\\\\\":\\\\\\\"喜庆花园小区4栋403\\\\\\\",\\\\\\\"addressDetailWithoutTown\\\\\\\":\\\\\\\"喜庆花园小区4栋403\\\\\\\",\\\\\\\"algorithmFrom\\\\\\\":\\\\\\\"cainiao#Mon Oct 28 21:52:38 CST 2019\\\\\\\",\\\\\\\"area\\\\\\\":\\\\\\\"相城区\\\\\\\",\\\\\\\"chinaAddress\\\\\\\":true,\\\\\\\"city\\\\\\\":\\\\\\\"苏州市\\\\\\\",\\\\\\\"confidence\\\\\\\":93,\\\\\\\"country\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"cuntaoAddress\\\\\\\":false,\\\\\\\"devisionCode\\\\\\\":\\\\\\\"320507\\\\\\\",\\\\\\\"eleAddress\\\\\\\":false,\\\\\\\"extraInfo\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"checkInf\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"cainiao#Mon Oct 28 21:52:38 CST 2019\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"priority\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"21\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"fillPOIAddress\\\\\\\":false,\\\\\\\"fullMobile\\\\\\\":\\\\\\\"86-15051792685\\\\\\\",\\\\\\\"fullName\\\\\\\":\\\\\\\"马祖强\\\\\\\",\\\\\\\"gmtCreate\\\\\\\":1540048909000,\\\\\\\"gmtModified\\\\\\\":1540048909000,\\\\\\\"guoguoAddress\\\\\\\":false,\\\\\\\"helpBuyAddress\\\\\\\":false,\\\\\\\"id\\\\\\\":8784804397,\\\\\\\"illegalCunTaoAddress\\\\\\\":false,\\\\\\\"lat\\\\\\\":\\\\\\\"31.351738\\\\\\\",\\\\\\\"lng\\\\\\\":\\\\\\\"120.625781\\\\\\\",\\\\\\\"mifengAddress\\\\\\\":false,\\\\\\\"minDivisonCode\\\\\\\":\\\\\\\"320507001\\\\\\\",\\\\\\\"mobile\\\\\\\":\\\\\\\"15051792685\\\\\\\",\\\\\\\"mobileInternationalCode\\\\\\\":\\\\\\\"86\\\\\\\",\\\\\\\"needToUpgrade\\\\\\\":false,\\\\\\\"pOIAddress\\\\\\\":false,\\\\\\\"postCode\\\\\\\":\\\\\\\"000000\\\\\\\",\\\\\\\"province\\\\\\\":\\\\\\\"江苏省\\\\\\\",\\\\\\\"qinQingAddress\\\\\\\":false,\\\\\\\"status\\\\\\\":1,\\\\\\\"tag\\\\\\\":0,\\\\\\\"town\\\\\\\":\\\\\\\"元和街道\\\\\\\",\\\\\\\"townDivisionCode\\\\\\\":\\\\\\\"320507001\\\\\\\",\\\\\\\"userId\\\\\\\":73207155,\\\\\\\"versionObject\\\\\\\":4,\\\\\\\"x\\\\\\\":\\\\\\\"31.351738\\\\\\\",\\\\\\\"y\\\\\\\":\\\\\\\"120.625781\\\\\\\"},\\\\\\\"checked\\\\\\\":false,\\\\\\\"cityName\\\\\\\":\\\\\\\"苏州市\\\\\\\",\\\\\\\"consolidationGuide\\\\\\\":false,\\\\\\\"countryName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"defaultAddress\\\\\\\":true,\\\\\\\"deliveryAddressId\\\\\\\":8784804397,\\\\\\\"disable\\\\\\\":false,\\\\\\\"divisionCode\\\\\\\":\\\\\\\"320507\\\\\\\",\\\\\\\"editable\\\\\\\":true,\\\\\\\"enableMDZT\\\\\\\":false,\\\\\\\"enableStation\\\\\\\":false,\\\\\\\"enforceUpdate4Address\\\\\\\":true,\\\\\\\"fullName\\\\\\\":\\\\\\\"马祖强\\\\\\\",\\\\\\\"hidden\\\\\\\":false,\\\\\\\"id\\\\\\\":\\\\\\\"55548262\\\\\\\",\\\\\\\"lat\\\\\\\":\\\\\\\"31.351738\\\\\\\",\\\\\\\"lgShopId\\\\\\\":0,\\\\\\\"lng\\\\\\\":\\\\\\\"120.625781\\\\\\\",\\\\\\\"mainland\\\\\\\":true,\\\\\\\"mobile\\\\\\\":\\\\\\\"15051792685\\\\\\\",\\\\\\\"name\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"needUpdate4Address\\\\\\\":false,\\\\\\\"needUpgradeAddress\\\\\\\":false,\\\\\\\"platformType\\\\\\\":\\\\\\\"H5\\\\\\\",\\\\\\\"postCode\\\\\\\":\\\\\\\"000000\\\\\\\",\\\\\\\"provinceName\\\\\\\":\\\\\\\"江苏省\\\\\\\",\\\\\\\"stationId\\\\\\\":0,\\\\\\\"status\\\\\\\":\\\\\\\"normal\\\\\\\",\\\\\\\"storeAddress\\\\\\\":true,\\\\\\\"townDivisionId\\\\\\\":320507001,\\\\\\\"townName\\\\\\\":\\\\\\\"元和街道\\\\\\\",\\\\\\\"updateAddressTip\\\\\\\":\\\\\\\"\\\\\\\"}]\\\",\\\"sites\\\":\\\"[]\\\",\\\"lat\\\":\\\"31.351738\\\"}},\\\"type\\\":\\\"dinamicx$461$buyaddress\\\",\\\"fields\\\":{\\\"mobilephone\\\":\\\"15051792685\\\",\\\"name\\\":\\\"马祖强\\\",\\\"iconUrl\\\":\\\"https://gw.alicdn.com/tfs/TB17gX2wYvpK1RjSZPiXXbmwXXa-128-128.png\\\",\\\"value\\\":\\\"江苏省苏州市相城区元和街道喜庆花园小区4栋403\\\",\\\"desc\\\":\\\"收货不便时,可选择暂存服务\\\",\\\"cornerType\\\":\\\"both\\\"},\\\"events\\\":{\\\"itemClick\\\":[{\\\"type\\\":\\\"openUrl\\\",\\\"fields\\\":{\\\"pageType\\\":\\\"H5\\\",\\\"params\\\":{\\\"fields\\\":{\\\"info\\\":{\\\"value\\\":\\\"8784804397\\\"}}},\\\"url\\\":\\\"//buy.m.tmall.com/order/addressList.htm?enableStation=true&requestStationUrl=%2F%2Fstationpicker-i56.m.taobao.com%2Finland%2FshowStationInPhone.htm&_input_charset=utf8&hidetoolbar=true&bridgeMessage=true\\\"}}]},\\\"id\\\":\\\"1\\\",\\\"tag\\\":\\\"address\\\"},\\\"anonymous_1\\\":{\\\"ref\\\":\\\"c1973e0\\\",\\\"submit\\\":true,\\\"type\\\":\\\"dinamicx$561$buyprotocolcheckbox\\\",\\\"fields\\\":{\\\"title\\\":\\\"匿名购买\\\",\\\"isChecked\\\":true},\\\"events\\\":{\\\"itemClick\\\":[{\\\"type\\\":\\\"select\\\",\\\"fields\\\":{\\\"isChecked\\\":\\\"true\\\"}}]},\\\"id\\\":\\\"1\\\",\\\"tag\\\":\\\"anonymous\\\"},\\\"promotion_0408d050b13c9224a8b7a46dbfd969e2\\\":{\\\"ref\\\":\\\"7cb7749\\\",\\\"submit\\\":true,\\\"hidden\\\":{\\\"extensionMap\\\":{\\\"promotionType\\\":\\\"item\\\",\\\"outId\\\":\\\"0408d050b13c9224a8b7a46dbfd969e2\\\",\\\"orderOutId\\\":\\\"0408d050b13c9224a8b7a46dbfd969e2\\\"}},\\\"type\\\":\\\"dinamicx$498$buyselect\\\",\\\"fields\\\":{\\\"valueCss\\\":{},\\\"confirm\\\":\\\"完成\\\",\\\"components\\\":[{\\\"id\\\":\\\"Tmall$saleTqg-3308515006_239955660500\\\",\\\"price\\\":\\\"￥410.00\\\",\\\"title\\\":\\\"省410:淘抢购\\\"}],\\\"title\\\":\\\"商品优惠\\\",\\\"asSelect\\\":{\\\"selectedIds\\\":[\\\"Tmall$saleTqg-3308515006_239955660500\\\"]},\\\"value\\\":\\\"-￥410.00\\\",\\\"desc\\\":\\\"已省410元:淘抢购\\\"},\\\"events\\\":{\\\"itemClick\\\":[{\\\"type\\\":\\\"openSimplePopup\\\",\\\"fields\\\":{}},{\\\"type\\\":\\\"userTrack\\\",\\\"fields\\\":{\\\"eventId\\\":\\\"2101\\\",\\\"arg1\\\":\\\"Page_ConfirmOrder_Button-dianpuyouhui\\\",\\\"page\\\":\\\"Page_Order\\\"}}],\\\"exposureItem\\\":[{\\\"type\\\":\\\"userTrack\\\",\\\"fields\\\":{\\\"eventId\\\":\\\"2201\\\",\\\"arg1\\\":\\\"Page_ConfirmOrder_Button-dianpuyouhui\\\",\\\"page\\\":\\\"Page_Order\\\"}}]},\\\"status\\\":\\\"hidden\\\",\\\"id\\\":\\\"0408d050b13c9224a8b7a46dbfd969e2\\\",\\\"tag\\\":\\\"promotion\\\"},\\\"memo_8c8006f2fa72aa480f77478cf961f073\\\":{\\\"ref\\\":\\\"b642b1e\\\",\\\"submit\\\":true,\\\"type\\\":\\\"dinamicx$554$buyinput\\\",\\\"fields\\\":{\\\"placeholder\\\":\\\"选填,请先和商家协商一致\\\",\\\"title\\\":\\\"订单备注\\\",\\\"value\\\":\\\"\\\"},\\\"events\\\":{\\\"itemClick\\\":[{\\\"type\\\":\\\"userTrack\\\",\\\"fields\\\":{\\\"eventId\\\":\\\"2101\\\",\\\"arg1\\\":\\\"Page_ConfirmOrder_Button-beizhu\\\",\\\"page\\\":\\\"Page_Order\\\"}}],\\\"exposureItem\\\":[{\\\"type\\\":\\\"userTrack\\\",\\\"fields\\\":{\\\"eventId\\\":\\\"2201\\\",\\\"arg1\\\":\\\"Page_ConfirmOrder_Button-beizhu\\\",\\\"page\\\":\\\"Page_Order\\\"}}],\\\"onFinish\\\":[{\\\"type\\\":\\\"input\\\",\\\"fields\\\":{\\\"value\\\":\\\"\\\"}}]},\\\"id\\\":\\\"8c8006f2fa72aa480f77478cf961f073\\\",\\\"tag\\\":\\\"memo\\\"},\\\"installmentToggle_1\\\":{\\\"ref\\\":\\\"7e843ee\\\",\\\"submit\\\":true,\\\"hidden\\\":{\\\"extensionMap\\\":{\\\"checkedLastStatus\\\":\\\"false\\\"}},\\\"type\\\":\\\"dinamicx$568$buypayforanother\\\",\\\"fields\\\":{\\\"subTitleColor\\\":\\\"#999999\\\",\\\"icon\\\":\\\"https://gw.alicdn.com/tfs/TB1h11mCntYBeNjy1XdXXXXyVXa-36-36.png\\\",\\\"title\\\":\\\"花呗分期\\\",\\\"isChecked\\\":\\\"false\\\",\\\"cornerType\\\":\\\"both\\\"},\\\"events\\\":{\\\"itemClick\\\":[{\\\"type\\\":\\\"select\\\",\\\"fields\\\":{\\\"isChecked\\\":\\\"false\\\"}},{\\\"type\\\":\\\"userTrack\\\",\\\"fields\\\":{\\\"eventId\\\":\\\"2101\\\",\\\"arg1\\\":\\\"Page_ConfirmOrder_Button-huabaifenqi\\\",\\\"page\\\":\\\"Page_Order\\\"}}],\\\"exposureItem\\\":[{\\\"type\\\":\\\"userTrack\\\",\\\"fields\\\":{\\\"eventId\\\":\\\"2201\\\",\\\"arg1\\\":\\\"Page_ConfirmOrder_Button-huabaifenqi\\\",\\\"page\\\":\\\"Page_Order\\\"}}]},\\\"id\\\":\\\"1\\\",\\\"tag\\\":\\\"installmentToggle\\\"},\\\"promotion_8c8006f2fa72aa480f77478cf961f073\\\":{\\\"ref\\\":\\\"7cb7749\\\",\\\"submit\\\":true,\\\"hidden\\\":{\\\"extensionMap\\\":{\\\"promotionType\\\":\\\"shop\\\",\\\"outId\\\":\\\"s_2776290743\\\",\\\"orderOutId\\\":\\\"8c8006f2fa72aa480f77478cf961f073\\\"}},\\\"type\\\":\\\"dinamicx$498$buyselect\\\",\\\"fields\\\":{\\\"valueCss\\\":{},\\\"confirm\\\":\\\"完成\\\",\\\"components\\\":[{\\\"id\\\":\\\"ATA1$170515172705-16913295144_239956641056\\\",\\\"price\\\":\\\"￥144.50\\\",\\\"title\\\":\\\"省144.50:淘抢购前...\\\"},{\\\"id\\\":\\\"0\\\",\\\"price\\\":\\\"\\\",\\\"title\\\":\\\"不使用优惠\\\"}],\\\"title\\\":\\\"店铺优惠\\\",\\\"asSelect\\\":{\\\"selectedIds\\\":[\\\"ATA1$170515172705-16913295144_239956641056\\\"]},\\\"value\\\":\\\"-￥144.50\\\",\\\"desc\\\":\\\"省144.50元:淘抢购前N件5折\\\"},\\\"events\\\":{\\\"itemClick\\\":[{\\\"type\\\":\\\"openSimplePopup\\\",\\\"fields\\\":{}},{\\\"type\\\":\\\"userTrack\\\",\\\"fields\\\":{\\\"eventId\\\":\\\"2101\\\",\\\"arg1\\\":\\\"Page_ConfirmOrder_Button-dianpuyouhui\\\",\\\"page\\\":\\\"Page_Order\\\"}}],\\\"exposureItem\\\":[{\\\"type\\\":\\\"userTrack\\\",\\\"fields\\\":{\\\"eventId\\\":\\\"2201\\\",\\\"arg1\\\":\\\"Page_ConfirmOrder_Button-dianpuyouhui\\\",\\\"page\\\":\\\"Page_Order\\\"}}]},\\\"id\\\":\\\"8c8006f2fa72aa480f77478cf961f073\\\",\\\"tag\\\":\\\"promotion\\\"},\\\"confirmOrder_1\\\":{\\\"ref\\\":\\\"8318d7a\\\",\\\"submit\\\":true,\\\"hidden\\\":{\\\"extensionMap\\\":{\\\"pageType\\\":\\\"GENERAL\\\",\\\"umid\\\":\\\"\\\",\\\"__ex_params__\\\":\\\"{\\\\\\\"OVERSEA_RED_ENVELOPE\\\\\\\":\\\\\\\"UMP\\\\\\\",\\\\\\\"UMP_RED_ENVELOPE\\\\\\\":\\\\\\\"UMP\\\\\\\",\\\\\\\"tradeProtocolFeatures\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"ovspayrendercnaddresskey\\\\\\\":true,\\\\\\\"ovspayrenderkey\\\\\\\":false,\\\\\\\"userAgent\\\\\\\":\\\\\\\"Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1\\\\\\\",\\\\\\\"UMP_RED_TOTALFEE\\\\\\\":\\\\\\\"28900\\\\\\\",\\\\\\\"PromotionUpgrade\\\\\\\":\\\\\\\"V3DIRECT\\\\\\\"}\\\",\\\"joinId\\\":\\\"0408d050b13c9224a8b7a46dbfd969e2\\\"}},\\\"type\\\":\\\"block$null$emptyBlock\\\",\\\"fields\\\":{},\\\"id\\\":\\\"1\\\",\\\"tag\\\":\\\"confirmOrder\\\"},\\\"service_bjx_0408d050b13c9224a8b7a46dbfd969e2\\\":{\\\"ref\\\":\\\"166250e\\\",\\\"submit\\\":true,\\\"hidden\\\":{\\\"extensionMap\\\":{\\\"serviceType\\\":\\\"2\\\",\\\"outId\\\":\\\"0408d050b13c9224a8b7a46dbfd969e2\\\"}},\\\"type\\\":\\\"dinamicx$498$buyselect\\\",\\\"fields\\\":{\\\"confirm\\\":\\\"完成\\\",\\\"componentGroups\\\":[{\\\"asSelect\\\":{\\\"optional\\\":\\\"false\\\",\\\"selectedIds\\\":[\\\"{'bizType':1,'optionId':'checkBoxOptionId','serviceId':'6255','storeId':0}\\\"]},\\\"components\\\":[{\\\"ext\\\":\\\"0.00\\\",\\\"id\\\":\\\"{'bizType':1,'optionId':'checkBoxOptionId','serviceId':'6255','storeId':0}\\\",\\\"title\\\":\\\"卖家赠送,若15天降价,保险赔付差额\\\"}]}],\\\"extraLink\\\":\\\"true\\\",\\\"title\\\":\\\"保价险\\\",\\\"desc\\\":\\\"卖家赠送,若15天降价,保险赔付差额 \\\"},\\\"events\\\":{\\\"detailClick\\\":[{\\\"type\\\":\\\"openUrl\\\",\\\"fields\\\":{\\\"pageType\\\":\\\"H5\\\",\\\"method\\\":\\\"GET\\\",\\\"params\\\":{\\\"target\\\":\\\"_self\\\"},\\\"url\\\":\\\"https://render.alipay.com/p/h5/insscene/www/insureProtocol.html?1=1&buyerId=73207155&sellerId=2776290743&itemId=608012795857&serviceId=6255\\\"}}],\\\"itemClick\\\":[{\\\"type\\\":\\\"openSimpleGroupPopup\\\",\\\"fields\\\":{}}]},\\\"id\\\":\\\"bjx_0408d050b13c9224a8b7a46dbfd969e2\\\",\\\"tag\\\":\\\"service\\\"},\\\"installmentPicker_1\\\":{\\\"ref\\\":\\\"6c1277b\\\",\\\"submit\\\":true,\\\"type\\\":\\\"dinamicx$550$buyimageselect\\\",\\\"fields\\\":{\\\"price\\\":\\\"手续费null\\\",\\\"iconUrl\\\":\\\"https://img.alicdn.com/tfs/TB1GCkFqeL2gK0jSZFmXXc7iXXa-36-36.png\\\",\\\"title\\\":\\\"花呗分期\\\",\\\"value\\\":\\\"手续费null\\\",\\\"desc\\\":\\\"nullnull\\\"},\\\"events\\\":{\\\"itemClick\\\":[{\\\"tag\\\":\\\"bizEvent\\\",\\\"type\\\":\\\"installmentPicker\\\",\\\"fields\\\":{\\\"bizType\\\":\\\"installmentPicker\\\",\\\"mappingData\\\":\\\"{\\\\\\\"combineComponent\\\\\\\":false,\\\\\\\"poundageTitle\\\\\\\":\\\\\\\"手续费\\\\\\\",\\\\\\\"pageTitle\\\\\\\":\\\\\\\"花呗分期详情\\\\\\\",\\\\\\\"systemTimes\\\\\\\":\\\\\\\"1605427961263\\\\\\\",\\\\\\\"currencySymbol\\\\\\\":\\\\\\\"￥\\\\\\\",\\\\\\\"desc\\\\\\\":\\\\\\\"修改分期\\\\\\\"}\\\"}}]},\\\"status\\\":\\\"hidden\\\",\\\"id\\\":\\\"1\\\",\\\"tag\\\":\\\"installmentPicker\\\"},\\\"itemInfo_0408d050b13c9224a8b7a46dbfd969e2\\\":{\\\"ref\\\":\\\"f36c1fb\\\",\\\"submit\\\":true,\\\"hidden\\\":{\\\"extensionMap\\\":{\\\"bizCode\\\":\\\"ali.china.tmall.fmcg\\\"}},\\\"type\\\":\\\"dinamicx$546$buyitem\\\",\\\"fields\\\":{\\\"skuLevel\\\":[],\\\"timeLimit\\\":\\\"\\\",\\\"subtitles\\\":\\\"颜色分类:百鸟朝凤5升坛;\\\",\\\"price\\\":\\\"￥289.00\\\",\\\"icon\\\":\\\"//gw.alicdn.com/imgextra/i1/2776290743/O1CN016uszQ21HMKqWNvlUR_!!2776290743.jpg\\\",\\\"count\\\":\\\"x1\\\",\\\"weight\\\":\\\"\\\",\\\"disabled\\\":\\\"false\\\",\\\"title\\\":\\\"贵州茅台古镇酱香型白酒特价53度5L坛装坤沙纯粮食高粱原浆老酒\\\"},\\\"id\\\":\\\"0408d050b13c9224a8b7a46dbfd969e2\\\",\\\"tag\\\":\\\"itemInfo\\\"},\\\"service_yfx_8c8006f2fa72aa480f77478cf961f073\\\":{\\\"ref\\\":\\\"166250e\\\",\\\"submit\\\":true,\\\"hidden\\\":{\\\"extensionMap\\\":{\\\"serviceType\\\":\\\"1\\\",\\\"outId\\\":\\\"8c8006f2fa72aa480f77478cf961f073\\\"}},\\\"type\\\":\\\"dinamicx$498$buyselect\\\",\\\"fields\\\":{\\\"confirm\\\":\\\"完成\\\",\\\"componentGroups\\\":[{\\\"asSelect\\\":{\\\"optional\\\":\\\"false\\\",\\\"selectedIds\\\":[\\\"{'bizType':1,'optionId':'checkBoxOptionId','serviceId':'1065','storeId':0}\\\"]},\\\"components\\\":[{\\\"ext\\\":\\\"0.00\\\",\\\"id\\\":\\\"{'bizType':1,'optionId':'checkBoxOptionId','serviceId':'1065','storeId':0}\\\",\\\"title\\\":\\\"卖家赠送，退换货可赔\\\"}]}],\\\"extraLink\\\":\\\"true\\\",\\\"title\\\":\\\"运费险\\\",\\\"desc\\\":\\\"卖家赠送，退换货可赔 \\\"},\\\"events\\\":{\\\"detailClick\\\":[{\\\"type\\\":\\\"openUrl\\\",\\\"fields\\\":{\\\"pageType\\\":\\\"H5\\\",\\\"method\\\":\\\"GET\\\",\\\"params\\\":{\\\"target\\\":\\\"_self\\\"},\\\"url\\\":\\\"https://render.alipay.com/p/h5/insscene/www/insureProtocol.html?1=1&buyerId=73207155&sellerId=2776290743&serviceId=1065\\\"}}],\\\"itemClick\\\":[{\\\"type\\\":\\\"openSimpleGroupPopup\\\",\\\"fields\\\":{}}]},\\\"id\\\":\\\"yfx_8c8006f2fa72aa480f77478cf961f073\\\",\\\"tag\\\":\\\"service\\\"},\\\"ncCheckCode_ncCheckCode1\\\":{\\\"ref\\\":\\\"fc57d42\\\",\\\"submit\\\":true,\\\"type\\\":\\\"native$null$ncCheckCode\\\",\\\"fields\\\":{\\\"nc\\\":\\\"1\\\",\\\"token\\\":\\\"10854cc32456fdeca5f80f58465ea8170bdb468b\\\"},\\\"id\\\":\\\"ncCheckCode1\\\",\\\"tag\\\":\\\"ncCheckCode\\\"},\\\"invoice_8c8006f2fa72aa480f77478cf961f073\\\":{\\\"ref\\\":\\\"29bfffb\\\",\\\"submit\\\":true,\\\"type\\\":\\\"dinamicx$498$buyselect\\\",\\\"fields\\\":{\\\"descCss\\\":{\\\"color\\\":\\\"#FFFFFF\\\"},\\\"title\\\":\\\"开具发票\\\",\\\"value\\\":\\\"本次不开具发票\\\"},\\\"events\\\":{\\\"itemClick\\\":[{\\\"type\\\":\\\"openUrl\\\",\\\"fields\\\":{\\\"pageType\\\":\\\"H5\\\",\\\"params\\\":{\\\"__oldComponent\\\":\\\"{\\\\\\\"tag\\\\\\\":\\\\\\\"invoice\\\\\\\",\\\\\\\"id\\\\\\\":\\\\\\\"8c8006f2fa72aa480f77478cf961f073\\\\\\\",\\\\\\\"type\\\\\\\":\\\\\\\"biz\\\\\\\",\\\\\\\"fields\\\\\\\":{\\\\\\\"method\\\\\\\":\\\\\\\"post\\\\\\\",\\\\\\\"title\\\\\\\":\\\\\\\"发票\\\\\\\",\\\\\\\"url\\\\\\\":\\\\\\\"https://invoice-ua.taobao.com/e-invoice/invoice-apply-tm.html?source=order&sellerId=2776290743&categoryIds=50008141\\\\\\\",\\\\\\\"desc\\\\\\\":\\\\\\\"本次不开具发票\\\\\\\",\\\\\\\"info\\\\\\\":{}}}\\\"},\\\"url\\\":\\\"https://invoice-ua.taobao.com/e-invoice/invoice-apply-tm.html?source=order&sellerId=2776290743&categoryIds=50008141\\\"}}]},\\\"id\\\":\\\"8c8006f2fa72aa480f77478cf961f073\\\",\\\"tag\\\":\\\"invoice\\\"},\\\"item_0408d050b13c9224a8b7a46dbfd969e2\\\":{\\\"ref\\\":\\\"360f46f\\\",\\\"submit\\\":true,\\\"hidden\\\":{\\\"extensionMap\\\":{\\\"valid\\\":\\\"true\\\",\\\"itemId\\\":\\\"608012795857\\\",\\\"bizCode\\\":\\\"ali.china.tmall.fmcg\\\",\\\"cartId\\\":\\\"2488043250770\\\",\\\"shoppingOrderId\\\":\\\"0\\\",\\\"villagerId\\\":\\\"0\\\",\\\"skuId\\\":\\\"4434804566965\\\"}},\\\"type\\\":\\\"block$null$emptyBlock\\\",\\\"fields\\\":{},\\\"id\\\":\\\"0408d050b13c9224a8b7a46dbfd969e2\\\",\\\"tag\\\":\\\"item\\\"},\\\"submitOrder_1\\\":{\\\"ref\\\":\\\"40aa9e9\\\",\\\"submit\\\":true,\\\"hidden\\\":{\\\"extensionMap\\\":{\\\"showPrice\\\":\\\"144.50\\\",\\\"submitOrderType\\\":\\\"UNITY\\\"}},\\\"type\\\":\\\"dinamicx$475$buysubmit\\\",\\\"fields\\\":{\\\"isShowFamilyPayBtn\\\":\\\"false\\\",\\\"price\\\":\\\"￥144.50\\\",\\\"priceTitle\\\":\\\"合计:\\\",\\\"count\\\":\\\"共1件，\\\",\\\"useSpecialPay\\\":\\\"false\\\",\\\"payBtn\\\":{\\\"enable\\\":true,\\\"title\\\":\\\"提交订单\\\"},\\\"descCss\\\":{},\\\"desc\\\":\\\"\\\"},\\\"events\\\":{\\\"itemClick\\\":[{\\\"type\\\":\\\"submit\\\",\\\"fields\\\":{}}]},\\\"id\\\":\\\"1\\\",\\\"tag\\\":\\\"submitOrder\\\"}}\",\"linkage\":\"{\\\"common\\\":{\\\"compress\\\":true,\\\"submitParams\\\":\\\"^^$$Z268084673c98dc92628de18735b08e402|null{$_$}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\\\",\\\"validateParams\\\":\\\"^^$$ae2df5e46ab0cc76e86bbba23b0f5cce{$_$}H4sIAAAAAAAAAIWRzU7CQBSF32XWzaQFSlt2pQU1MYT4Q+LKXKYXaJjONDNDFAmJe+PSta9B4utgfA1vJSob4+7OyZ1zznyzYTMDFd5psxwDTfasqiXrbVgtwc20qa7WNTZnIcHaEa2yHhO64iDLKUyBOwMFciFLVI5XukDJrV4ZgXx85DBpMY+pw+3TkGZtilIBJflbj9Uwx79yHOgpaE6RtVZNRrEmn1LwCh0cyc2CxHvev75p8fG34cGbKs9RoaE8jxVoBQkfb6/73eN+9/T+/EJqBWaJjvTfnieD0eAiPSfhp2w7prZSC5ANhofFbTZipKwsmtTacq7+J2UXYLDgtUFLrwFXasXrhjzPwcGEsBZfH3EghlhkCxTLjMCy3gykRY+hEmZdu0tnSjWnHnEQh60kCCK/E/kDv+sneZ53Qz8aRmHW6Q+TYRxlSbfbTtJ2kLVTtt1+ApA1Z673AQAA\\\"},\\\"signature\\\":\\\"4aeb492788e1d777044d8f43dd6ae41d\\\"}\",\"hierarchy\":\"{\\\"structure\\\":{\\\"confirmPromotionAndService_1\\\":[\\\"installmentToggle_1\\\",\\\"installmentPicker_1\\\"],\\\"serviceCOBlock_yfx_8c8006f2fa72aa480f77478cf961f073\\\":[\\\"service_yfx_8c8006f2fa72aa480f77478cf961f073\\\"],\\\"item_0408d050b13c9224a8b7a46dbfd969e2\\\":[\\\"itemInfo_0408d050b13c9224a8b7a46dbfd969e2\\\",\\\"serviceCOBlock_bjx_0408d050b13c9224a8b7a46dbfd969e2\\\",\\\"alicomItemBlock_0408d050b13c9224a8b7a46dbfd969e2\\\",\\\"promotion_0408d050b13c9224a8b7a46dbfd969e2\\\",\\\"itemIcon_0408d050b13c9224a8b7a46dbfd969e2\\\"],\\\"confirmOrder_1\\\":[\\\"topReminds_1\\\",\\\"addressBlock_1\\\",\\\"sesameBlock_1\\\",\\\"cuntaoBlock_1\\\",\\\"order_8c8006f2fa72aa480f77478cf961f073\\\",\\\"confirmPromotionAndService_1\\\",\\\"anonymous_1\\\",\\\"activityTips_55548294\\\",\\\"submitBlock_1\\\",\\\"ncCheckCode_ncCheckCode1\\\"],\\\"serviceCOBlock_bjx_0408d050b13c9224a8b7a46dbfd969e2\\\":[\\\"service_bjx_0408d050b13c9224a8b7a46dbfd969e2\\\"],\\\"order_8c8006f2fa72aa480f77478cf961f073\\\":[\\\"orderInfo_8c8006f2fa72aa480f77478cf961f073\\\",\\\"item_0408d050b13c9224a8b7a46dbfd969e2\\\",\\\"deliveryMethod_8c8006f2fa72aa480f77478cf961f073\\\",\\\"serviceCOBlock_yfx_8c8006f2fa72aa480f77478cf961f073\\\",\\\"promotion_8c8006f2fa72aa480f77478cf961f073\\\",\\\"invoice_8c8006f2fa72aa480f77478cf961f073\\\",\\\"memo_8c8006f2fa72aa480f77478cf961f073\\\",\\\"orderPay_8c8006f2fa72aa480f77478cf961f073\\\",\\\"orderRemind_8c8006f2fa72aa480f77478cf961f073\\\"],\\\"submitBlock_1\\\":[\\\"submitOrder_1\\\"],\\\"addressBlock_1\\\":[\\\"address_1\\\"]}}\",\"endpoint\":\"{\\\"mode\\\":\\\"\\\",\\\"features\\\":\\\"5\\\",\\\"osVersion\\\":\\\"H5\\\",\\\"protocolVersion\\\":\\\"3.0\\\",\\\"ultronage\\\":\\\"true\\\"}\"}",

        "params": JSON.stringify({
            // data: '{"deliveryMethod_8c8006f2fa72aa480f77478cf961f073":{"ref":"003192e","submit":true,"hidden":{"extensionMap":{"deliveryId":"8c8006f2fa72aa480f77478cf961f073"}},"type":"dinamicx$498$buyselect","fields":{"confirm":"完成","components":[{"ext":"{\\"fareCent\\":0,\\"id\\":\\"20\\",\\"serviceType\\":\\"-4\\",\\"userChooseLogisticsInfo\\":\\"{\\\\\\"childServiceType\\\\\\":-4,\\\\\\"cp\\\\\\":\\\\\\"default\\\\\\",\\\\\\"logisticsType\\\\\\":0,\\\\\\"serviceType\\\\\\":-4}\\"}","id":"20","price":"快递 免邮","title":"普通配送"}],"price":"快递 免邮","title":"配送方式","asSelect":{"selectedIds":["20"]},"value":"快递 免邮","desc":"普通配送"},"events":{"itemClick":[{"type":"openSimplePopup","fields":{}}]},"id":"8c8006f2fa72aa480f77478cf961f073","tag":"deliveryMethod"},"address_1":{"ref":"f83ecc7","submit":true,"hidden":{"extensionMap":{"useMDZT":"false","useStation":"false","lng":"120.625781","selectedId":"8784804397","linkAddressId":"0","options":"[{\\"addressDetail\\":\\"喜庆花园小区4栋403\\",\\"addressIconUrl\\":\\"\\",\\"agencyReceiveDesc\\":\\"收货不便时,可选择暂存服务\\",\\"areaName\\":\\"相城区\\",\\"attributes\\":[],\\"baseDeliverAddressDO\\":{\\"address\\":\\"320507^^^江苏省^^^苏州市^^^相城区^^^元和街道 喜庆花园小区4栋403^^^ ^^^元和街道^^^320507001^^^31.351738^^^120.625781\\",\\"addressDetail\\":\\"喜庆花园小区4栋403\\",\\"addressDetailWithoutTown\\":\\"喜庆花园小区4栋403\\",\\"algorithmFrom\\":\\"cainiao#Mon Oct 28 21:52:38 CST 2019\\",\\"area\\":\\"相城区\\",\\"chinaAddress\\":true,\\"city\\":\\"苏州市\\",\\"confidence\\":93,\\"country\\":\\"\\",\\"cuntaoAddress\\":false,\\"devisionCode\\":\\"320507\\",\\"eleAddress\\":false,\\"extraInfo\\":\\"{\\\\\\"checkInf\\\\\\":\\\\\\"cainiao#Mon Oct 28 21:52:38 CST 2019\\\\\\",\\\\\\"priority\\\\\\":\\\\\\"21\\\\\\"}\\",\\"fillPOIAddress\\":false,\\"fullMobile\\":\\"86-15051792685\\",\\"fullName\\":\\"马祖强\\",\\"gmtCreate\\":1540048909000,\\"gmtModified\\":1540048909000,\\"guoguoAddress\\":false,\\"helpBuyAddress\\":false,\\"id\\":8784804397,\\"illegalCunTaoAddress\\":false,\\"lat\\":\\"31.351738\\",\\"lng\\":\\"120.625781\\",\\"mifengAddress\\":false,\\"minDivisonCode\\":\\"320507001\\",\\"mobile\\":\\"15051792685\\",\\"mobileInternationalCode\\":\\"86\\",\\"needToUpgrade\\":false,\\"pOIAddress\\":false,\\"postCode\\":\\"000000\\",\\"province\\":\\"江苏省\\",\\"qinQingAddress\\":false,\\"status\\":1,\\"tag\\":0,\\"town\\":\\"元和街道\\",\\"townDivisionCode\\":\\"320507001\\",\\"userId\\":73207155,\\"versionObject\\":4,\\"x\\":\\"31.351738\\",\\"y\\":\\"120.625781\\"},\\"checked\\":false,\\"cityName\\":\\"苏州市\\",\\"consolidationGuide\\":false,\\"countryName\\":\\"\\",\\"defaultAddress\\":true,\\"deliveryAddressId\\":8784804397,\\"disable\\":false,\\"divisionCode\\":\\"320507\\",\\"editable\\":true,\\"enableMDZT\\":false,\\"enableStation\\":false,\\"enforceUpdate4Address\\":true,\\"fullName\\":\\"马祖强\\",\\"hidden\\":false,\\"id\\":\\"55548262\\",\\"lat\\":\\"31.351738\\",\\"lgShopId\\":0,\\"lng\\":\\"120.625781\\",\\"mainland\\":true,\\"mobile\\":\\"15051792685\\",\\"name\\":\\"\\",\\"needUpdate4Address\\":false,\\"needUpgradeAddress\\":false,\\"platformType\\":\\"H5\\",\\"postCode\\":\\"000000\\",\\"provinceName\\":\\"江苏省\\",\\"stationId\\":0,\\"status\\":\\"normal\\",\\"storeAddress\\":true,\\"townDivisionId\\":320507001,\\"townName\\":\\"元和街道\\",\\"updateAddressTip\\":\\"\\"}]","sites":"[]","lat":"31.351738"}},"type":"dinamicx$461$buyaddress","fields":{"mobilephone":"15051792685","name":"马祖强","iconUrl":"https://gw.alicdn.com/tfs/TB17gX2wYvpK1RjSZPiXXbmwXXa-128-128.png","value":"江苏省苏州市相城区元和街道喜庆花园小区4栋403","desc":"收货不便时,可选择暂存服务","cornerType":"both"},"events":{"itemClick":[{"type":"openUrl","fields":{"pageType":"H5","params":{"fields":{"info":{"value":"8784804397"}}},"url":"//buy.m.tmall.com/order/addressList.htm?enableStation=true&requestStationUrl=%2F%2Fstationpicker-i56.m.taobao.com%2Finland%2FshowStationInPhone.htm&_input_charset=utf8&hidetoolbar=true&bridgeMessage=true"}}]},"id":"1","tag":"address"},"anonymous_1":{"ref":"c1973e0","submit":true,"type":"dinamicx$561$buyprotocolcheckbox","fields":{"title":"匿名购买","isChecked":true},"events":{"itemClick":[{"type":"select","fields":{"isChecked":"true"}}]},"id":"1","tag":"anonymous"},"promotion_0408d050b13c9224a8b7a46dbfd969e2":{"ref":"7cb7749","submit":true,"hidden":{"extensionMap":{"promotionType":"item","outId":"0408d050b13c9224a8b7a46dbfd969e2","orderOutId":"0408d050b13c9224a8b7a46dbfd969e2"}},"type":"dinamicx$498$buyselect","fields":{"valueCss":{},"confirm":"完成","components":[{"id":"Tmall$saleTqg-3308515006_239955660500","price":"￥410.00","title":"省410:淘抢购"}],"title":"商品优惠","asSelect":{"selectedIds":["Tmall$saleTqg-3308515006_239955660500"]},"value":"-￥410.00","desc":"已省410元:淘抢购"},"events":{"itemClick":[{"type":"openSimplePopup","fields":{}},{"type":"userTrack","fields":{"eventId":"2101","arg1":"Page_ConfirmOrder_Button-dianpuyouhui","page":"Page_Order"}}],"exposureItem":[{"type":"userTrack","fields":{"eventId":"2201","arg1":"Page_ConfirmOrder_Button-dianpuyouhui","page":"Page_Order"}}]},"status":"hidden","id":"0408d050b13c9224a8b7a46dbfd969e2","tag":"promotion"},"memo_8c8006f2fa72aa480f77478cf961f073":{"ref":"b642b1e","submit":true,"type":"dinamicx$554$buyinput","fields":{"placeholder":"选填,请先和商家协商一致","title":"订单备注","value":""},"events":{"itemClick":[{"type":"userTrack","fields":{"eventId":"2101","arg1":"Page_ConfirmOrder_Button-beizhu","page":"Page_Order"}}],"exposureItem":[{"type":"userTrack","fields":{"eventId":"2201","arg1":"Page_ConfirmOrder_Button-beizhu","page":"Page_Order"}}],"onFinish":[{"type":"input","fields":{"value":""}}]},"id":"8c8006f2fa72aa480f77478cf961f073","tag":"memo"},"installmentToggle_1":{"ref":"7e843ee","submit":true,"hidden":{"extensionMap":{"checkedLastStatus":"false"}},"type":"dinamicx$568$buypayforanother","fields":{"subTitleColor":"#999999","icon":"https://gw.alicdn.com/tfs/TB1h11mCntYBeNjy1XdXXXXyVXa-36-36.png","title":"花呗分期","isChecked":"false","cornerType":"both"},"events":{"itemClick":[{"type":"select","fields":{"isChecked":"false"}},{"type":"userTrack","fields":{"eventId":"2101","arg1":"Page_ConfirmOrder_Button-huabaifenqi","page":"Page_Order"}}],"exposureItem":[{"type":"userTrack","fields":{"eventId":"2201","arg1":"Page_ConfirmOrder_Button-huabaifenqi","page":"Page_Order"}}]},"id":"1","tag":"installmentToggle"},"promotion_8c8006f2fa72aa480f77478cf961f073":{"ref":"7cb7749","submit":true,"hidden":{"extensionMap":{"promotionType":"shop","outId":"s_2776290743","orderOutId":"8c8006f2fa72aa480f77478cf961f073"}},"type":"dinamicx$498$buyselect","fields":{"valueCss":{},"confirm":"完成","components":[{"id":"ATA1$170515172705-16913295144_239956641056","price":"￥144.50","title":"省144.50:淘抢购前..."},{"id":"0","price":"","title":"不使用优惠"}],"title":"店铺优惠","asSelect":{"selectedIds":["ATA1$170515172705-16913295144_239956641056"]},"value":"-￥144.50","desc":"省144.50元:淘抢购前N件5折"},"events":{"itemClick":[{"type":"openSimplePopup","fields":{}},{"type":"userTrack","fields":{"eventId":"2101","arg1":"Page_ConfirmOrder_Button-dianpuyouhui","page":"Page_Order"}}],"exposureItem":[{"type":"userTrack","fields":{"eventId":"2201","arg1":"Page_ConfirmOrder_Button-dianpuyouhui","page":"Page_Order"}}]},"id":"8c8006f2fa72aa480f77478cf961f073","tag":"promotion"},"confirmOrder_1":{"ref":"8318d7a","submit":true,"hidden":{"extensionMap":{"pageType":"GENERAL","umid":"","__ex_params__":"{\\"OVERSEA_RED_ENVELOPE\\":\\"UMP\\",\\"UMP_RED_ENVELOPE\\":\\"UMP\\",\\"tradeProtocolFeatures\\":\\"5\\",\\"ovspayrendercnaddresskey\\":true,\\"ovspayrenderkey\\":false,\\"userAgent\\":\\"Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1\\",\\"UMP_RED_TOTALFEE\\":\\"28900\\",\\"PromotionUpgrade\\":\\"V3DIRECT\\"}","joinId":"0408d050b13c9224a8b7a46dbfd969e2"}},"type":"block$null$emptyBlock","fields":{},"id":"1","tag":"confirmOrder"},"service_bjx_0408d050b13c9224a8b7a46dbfd969e2":{"ref":"166250e","submit":true,"hidden":{"extensionMap":{"serviceType":"2","outId":"0408d050b13c9224a8b7a46dbfd969e2"}},"type":"dinamicx$498$buyselect","fields":{"confirm":"完成","componentGroups":[{"asSelect":{"optional":"false","selectedIds":["{\'bizType\':1,\'optionId\':\'checkBoxOptionId\',\'serviceId\':\'6255\',\'storeId\':0}"]},"components":[{"ext":"0.00","id":"{\'bizType\':1,\'optionId\':\'checkBoxOptionId\',\'serviceId\':\'6255\',\'storeId\':0}","title":"卖家赠送,若15天降价,保险赔付差额"}]}],"extraLink":"true","title":"保价险","desc":"卖家赠送,若15天降价,保险赔付差额 "},"events":{"detailClick":[{"type":"openUrl","fields":{"pageType":"H5","method":"GET","params":{"target":"_self"},"url":"https://render.alipay.com/p/h5/insscene/www/insureProtocol.html?1=1&buyerId=73207155&sellerId=2776290743&itemId=608012795857&serviceId=6255"}}],"itemClick":[{"type":"openSimpleGroupPopup","fields":{}}]},"id":"bjx_0408d050b13c9224a8b7a46dbfd969e2","tag":"service"},"installmentPicker_1":{"ref":"6c1277b","submit":true,"type":"dinamicx$550$buyimageselect","fields":{"price":"手续费null","iconUrl":"https://img.alicdn.com/tfs/TB1GCkFqeL2gK0jSZFmXXc7iXXa-36-36.png","title":"花呗分期","value":"手续费null","desc":"nullnull"},"events":{"itemClick":[{"tag":"bizEvent","type":"installmentPicker","fields":{"bizType":"installmentPicker","mappingData":"{\\"combineComponent\\":false,\\"poundageTitle\\":\\"手续费\\",\\"pageTitle\\":\\"花呗分期详情\\",\\"systemTimes\\":\\"1605427961263\\",\\"currencySymbol\\":\\"￥\\",\\"desc\\":\\"修改分期\\"}"}}]},"status":"hidden","id":"1","tag":"installmentPicker"},"itemInfo_0408d050b13c9224a8b7a46dbfd969e2":{"ref":"f36c1fb","submit":true,"hidden":{"extensionMap":{"bizCode":"ali.china.tmall.fmcg"}},"type":"dinamicx$546$buyitem","fields":{"skuLevel":[],"timeLimit":"","subtitles":"颜色分类:百鸟朝凤5升坛;","price":"￥289.00","icon":"//gw.alicdn.com/imgextra/i1/2776290743/O1CN016uszQ21HMKqWNvlUR_!!2776290743.jpg","count":"x1","weight":"","disabled":"false","title":"贵州茅台古镇酱香型白酒特价53度5L坛装坤沙纯粮食高粱原浆老酒"},"id":"0408d050b13c9224a8b7a46dbfd969e2","tag":"itemInfo"},"service_yfx_8c8006f2fa72aa480f77478cf961f073":{"ref":"166250e","submit":true,"hidden":{"extensionMap":{"serviceType":"1","outId":"8c8006f2fa72aa480f77478cf961f073"}},"type":"dinamicx$498$buyselect","fields":{"confirm":"完成","componentGroups":[{"asSelect":{"optional":"false","selectedIds":["{\'bizType\':1,\'optionId\':\'checkBoxOptionId\',\'serviceId\':\'1065\',\'storeId\':0}"]},"components":[{"ext":"0.00","id":"{\'bizType\':1,\'optionId\':\'checkBoxOptionId\',\'serviceId\':\'1065\',\'storeId\':0}","title":"卖家赠送，退换货可赔"}]}],"extraLink":"true","title":"运费险","desc":"卖家赠送，退换货可赔 "},"events":{"detailClick":[{"type":"openUrl","fields":{"pageType":"H5","method":"GET","params":{"target":"_self"},"url":"https://render.alipay.com/p/h5/insscene/www/insureProtocol.html?1=1&buyerId=73207155&sellerId=2776290743&serviceId=1065"}}],"itemClick":[{"type":"openSimpleGroupPopup","fields":{}}]},"id":"yfx_8c8006f2fa72aa480f77478cf961f073","tag":"service"},"ncCheckCode_ncCheckCode1":{"ref":"fc57d42","submit":true,"type":"native$null$ncCheckCode","fields":{"nc":"1","token":"10854cc32456fdeca5f80f58465ea8170bdb468b"},"id":"ncCheckCode1","tag":"ncCheckCode"},"invoice_8c8006f2fa72aa480f77478cf961f073":{"ref":"29bfffb","submit":true,"type":"dinamicx$498$buyselect","fields":{"descCss":{"color":"#FFFFFF"},"title":"开具发票","value":"本次不开具发票"},"events":{"itemClick":[{"type":"openUrl","fields":{"pageType":"H5","params":{"__oldComponent":"{\\"tag\\":\\"invoice\\",\\"id\\":\\"8c8006f2fa72aa480f77478cf961f073\\",\\"type\\":\\"biz\\",\\"fields\\":{\\"method\\":\\"post\\",\\"title\\":\\"发票\\",\\"url\\":\\"https://invoice-ua.taobao.com/e-invoice/invoice-apply-tm.html?source=order&sellerId=2776290743&categoryIds=50008141\\",\\"desc\\":\\"本次不开具发票\\",\\"info\\":{}}}"},"url":"https://invoice-ua.taobao.com/e-invoice/invoice-apply-tm.html?source=order&sellerId=2776290743&categoryIds=50008141"}}]},"id":"8c8006f2fa72aa480f77478cf961f073","tag":"invoice"},"item_0408d050b13c9224a8b7a46dbfd969e2":{"ref":"360f46f","submit":true,"hidden":{"extensionMap":{"valid":"true","itemId":"608012795857","bizCode":"ali.china.tmall.fmcg","cartId":"2488043250770","shoppingOrderId":"0","villagerId":"0","skuId":"4434804566965"}},"type":"block$null$emptyBlock","fields":{},"id":"0408d050b13c9224a8b7a46dbfd969e2","tag":"item"},"submitOrder_1":{"ref":"40aa9e9","submit":true,"hidden":{"extensionMap":{"showPrice":"144.50","submitOrderType":"UNITY"}},"type":"dinamicx$475$buysubmit","fields":{"isShowFamilyPayBtn":"false","price":"￥144.50","priceTitle":"合计:","count":"共1件，","useSpecialPay":"false","payBtn":{"enable":true,"title":"提交订单"},"descCss":{},"desc":""},"events":{"itemClick":[{"type":"submit","fields":{}}]},"id":"1","tag":"submitOrder"}}',
            // data: JSON.stringify({
            //     // 运费
            //     "deliveryMethod_8c8006f2fa72aa480f77478cf961f073": {
            //         "ref": "003192e",
            //         "submit": true,
            //         "hidden": {"extensionMap": {"deliveryId": "8c8006f2fa72aa480f77478cf961f073"}},
            //         "type": "dinamicx$498$buyselect",
            //         "fields": {
            //             "confirm": "完成",
            //             "components": [{
            //                 "ext": "{\"fareCent\":0,\"id\":\"20\",\"serviceType\":\"-4\",\"userChooseLogisticsInfo\":\"{\\\"childServiceType\\\":-4,\\\"cp\\\":\\\"default\\\",\\\"logisticsType\\\":0,\\\"serviceType\\\":-4}\"}",
            //                 "id": "20",
            //                 "price": "快递 免邮",
            //                 "title": "普通配送"
            //             }],
            //             "price": "快递 免邮",
            //             "title": "配送方式",
            //             "asSelect": {"selectedIds": ["20"]},
            //             "value": "快递 免邮",
            //             "desc": "普通配送"
            //         },
            //         "events": {"itemClick": [{"type": "openSimplePopup", "fields": {}}]},
            //         "id": "8c8006f2fa72aa480f77478cf961f073",
            //         "tag": "deliveryMethod"
            //     },
            //     // 地址
            //     "address_1": res.data.address_1,
            //     // 匿名购买
            //     "anonymous_1":res.data.anonymous_1,
            //     // 优惠
            //     "promotion_0408d050b13c9224a8b7a46dbfd969e2": {
            //         "ref": "7cb7749",
            //         "submit": true,
            //         "hidden": {
            //             "extensionMap": {
            //                 "promotionType": "item",
            //                 "outId": "0408d050b13c9224a8b7a46dbfd969e2",
            //                 "orderOutId": "0408d050b13c9224a8b7a46dbfd969e2"
            //             }
            //         },
            //         "type": "dinamicx$498$buyselect",
            //         "fields": {
            //             "valueCss": {},
            //             "confirm": "完成",
            //             "components": [{
            //                 "id": "Tmall$saleTqg-3308515006_239955660500",
            //                 "price": "￥410.00",
            //                 "title": "省410:淘抢购"
            //             }],
            //             "title": "商品优惠",
            //             "asSelect": {"selectedIds": ["Tmall$saleTqg-3308515006_239955660500"]},
            //             "value": "-￥410.00",
            //             "desc": "已省410元:淘抢购"
            //         },
            //         "events": {
            //             "itemClick": [{"type": "openSimplePopup", "fields": {}}, {
            //                 "type": "userTrack",
            //                 "fields": {
            //                     "eventId": "2101",
            //                     "arg1": "Page_ConfirmOrder_Button-dianpuyouhui",
            //                     "page": "Page_Order"
            //                 }
            //             }],
            //             "exposureItem": [{
            //                 "type": "userTrack",
            //                 "fields": {
            //                     "eventId": "2201",
            //                     "arg1": "Page_ConfirmOrder_Button-dianpuyouhui",
            //                     "page": "Page_Order"
            //                 }
            //             }]
            //         },
            //         "status": "hidden",
            //         "id": "0408d050b13c9224a8b7a46dbfd969e2",
            //         "tag": "promotion"
            //     },
            //     // 订单备注
            //     "memo_8c8006f2fa72aa480f77478cf961f073": {
            //         "ref": "b642b1e",
            //         "submit": true,
            //         "type": "dinamicx$554$buyinput",
            //         "fields": {"placeholder": "选填,请先和商家协商一致", "title": "订单备注", "value": ""},
            //         "events": {
            //             "itemClick": [{
            //                 "type": "userTrack",
            //                 "fields": {
            //                     "eventId": "2101",
            //                     "arg1": "Page_ConfirmOrder_Button-beizhu",
            //                     "page": "Page_Order"
            //                 }
            //             }],
            //             "exposureItem": [{
            //                 "type": "userTrack",
            //                 "fields": {
            //                     "eventId": "2201",
            //                     "arg1": "Page_ConfirmOrder_Button-beizhu",
            //                     "page": "Page_Order"
            //                 }
            //             }],
            //             "onFinish": [{"type": "input", "fields": {"value": ""}}]
            //         },
            //         "id": "8c8006f2fa72aa480f77478cf961f073",
            //         "tag": "memo"
            //     },
            //     // 花呗分期
            //     "installmentToggle_1": res.data.installmentToggle_1,
            //     // 优惠
            //     "promotion_8c8006f2fa72aa480f77478cf961f073": {
            //         "ref": "7cb7749",
            //         "submit": true,
            //         "hidden": {
            //             "extensionMap": {
            //                 "promotionType": "shop",
            //                 "outId": "s_2776290743",
            //                 "orderOutId": "8c8006f2fa72aa480f77478cf961f073"
            //             }
            //         },
            //         "type": "dinamicx$498$buyselect",
            //         "fields": {
            //             "valueCss": {},
            //             "confirm": "完成",
            //             "components": [{
            //                 "id": "ATA1$170515172705-16913295144_239956641056",
            //                 "price": "￥144.50",
            //                 "title": "省144.50:淘抢购前..."
            //             }, {"id": "0", "price": "", "title": "不使用优惠"}],
            //             "title": "店铺优惠",
            //             "asSelect": {"selectedIds": ["ATA1$170515172705-16913295144_239956641056"]},
            //             "value": "-￥144.50",
            //             "desc": "省144.50元:淘抢购前N件5折"
            //         },
            //         "events": {
            //             "itemClick": [{"type": "openSimplePopup", "fields": {}}, {
            //                 "type": "userTrack",
            //                 "fields": {
            //                     "eventId": "2101",
            //                     "arg1": "Page_ConfirmOrder_Button-dianpuyouhui",
            //                     "page": "Page_Order"
            //                 }
            //             }],
            //             "exposureItem": [{
            //                 "type": "userTrack",
            //                 "fields": {
            //                     "eventId": "2201",
            //                     "arg1": "Page_ConfirmOrder_Button-dianpuyouhui",
            //                     "page": "Page_Order"
            //                 }
            //             }]
            //         },
            //         "id": "8c8006f2fa72aa480f77478cf961f073",
            //         "tag": "promotion"
            //     },
            //     // 确认订单
            //     "confirmOrder_1":res.data.confirmOrder_1,
            //     // "保价险"
            //     "service_bjx_0408d050b13c9224a8b7a46dbfd969e2": {
            //         "ref": "166250e",
            //         "submit": true,
            //         "hidden": {"extensionMap": {"serviceType": "2", "outId": "0408d050b13c9224a8b7a46dbfd969e2"}},
            //         "type": "dinamicx$498$buyselect",
            //         "fields": {
            //             "confirm": "完成",
            //             "componentGroups": [{
            //                 "asSelect": {
            //                     "optional": "false",
            //                     "selectedIds": ["{'bizType':1,'optionId':'checkBoxOptionId','serviceId':'6255','storeId':0}"]
            //                 },
            //                 "components": [{
            //                     "ext": "0.00",
            //                     "id": "{'bizType':1,'optionId':'checkBoxOptionId','serviceId':'6255','storeId':0}",
            //                     "title": "卖家赠送,若15天降价,保险赔付差额"
            //                 }]
            //             }],
            //             "extraLink": "true",
            //             "title": "保价险",
            //             "desc": "卖家赠送,若15天降价,保险赔付差额 "
            //         },
            //         "events": {
            //             "detailClick": [{
            //                 "type": "openUrl",
            //                 "fields": {
            //                     "pageType": "H5",
            //                     "method": "GET",
            //                     "params": {"target": "_self"},
            //                     "url": "https://render.alipay.com/p/h5/insscene/www/insureProtocol.html?1=1&buyerId=73207155&sellerId=2776290743&itemId=608012795857&serviceId=6255"
            //                 }
            //             }], "itemClick": [{"type": "openSimpleGroupPopup", "fields": {}}]
            //         },
            //         "id": "bjx_0408d050b13c9224a8b7a46dbfd969e2",
            //         "tag": "service"
            //     },
            //     // 手续费
            //     "installmentPicker_1": res.data.installmentPicker_1,
            //     // 订单详情
            //     "itemInfo_0408d050b13c9224a8b7a46dbfd969e2": res.data.itemInfo_83f17a23ad5b63eeb53173a7eff428ba,
            //     //  "运费险"
            //     "service_yfx_8c8006f2fa72aa480f77478cf961f073": {
            //         "ref": "166250e",
            //         "submit": true,
            //         "hidden": {"extensionMap": {"serviceType": "1", "outId": "8c8006f2fa72aa480f77478cf961f073"}},
            //         "type": "dinamicx$498$buyselect",
            //         "fields": {
            //             "confirm": "完成",
            //             "componentGroups": [{
            //                 "asSelect": {
            //                     "optional": "false",
            //                     "selectedIds": ["{'bizType':1,'optionId':'checkBoxOptionId','serviceId':'1065','storeId':0}"]
            //                 },
            //                 "components": [{
            //                     "ext": "0.00",
            //                     "id": "{'bizType':1,'optionId':'checkBoxOptionId','serviceId':'1065','storeId':0}",
            //                     "title": "卖家赠送，退换货可赔"
            //                 }]
            //             }],
            //             "extraLink": "true",
            //             "title": "运费险",
            //             "desc": "卖家赠送，退换货可赔 "
            //         },
            //         "events": {
            //             "detailClick": [{
            //                 "type": "openUrl",
            //                 "fields": {
            //                     "pageType": "H5",
            //                     "method": "GET",
            //                     "params": {"target": "_self"},
            //                     "url": "https://render.alipay.com/p/h5/insscene/www/insureProtocol.html?1=1&buyerId=73207155&sellerId=2776290743&serviceId=1065"
            //                 }
            //             }], "itemClick": [{"type": "openSimpleGroupPopup", "fields": {}}]
            //         },
            //         "id": "yfx_8c8006f2fa72aa480f77478cf961f073",
            //         "tag": "service"
            //     },
            //     "ncCheckCode_ncCheckCode1": res.data.ncCheckCode_ncCheckCode1,
            //     // 发票
            //     "invoice_8c8006f2fa72aa480f77478cf961f073": {
            //         "ref": "29bfffb",
            //         "submit": true,
            //         "type": "dinamicx$498$buyselect",
            //         "fields": {"descCss": {"color": "#FFFFFF"}, "title": "开具发票", "value": "本次不开具发票"},
            //         "events": {
            //             "itemClick": [{
            //                 "type": "openUrl",
            //                 "fields": {
            //                     "pageType": "H5",
            //                     "params": {"__oldComponent": "{\"tag\":\"invoice\",\"id\":\"8c8006f2fa72aa480f77478cf961f073\",\"type\":\"biz\",\"fields\":{\"method\":\"post\",\"title\":\"发票\",\"url\":\"https://invoice-ua.taobao.com/e-invoice/invoice-apply-tm.html?source=order&sellerId=2776290743&categoryIds=50008141\",\"desc\":\"本次不开具发票\",\"info\":{}}}"},
            //                     "url": "https://invoice-ua.taobao.com/e-invoice/invoice-apply-tm.html?source=order&sellerId=2776290743&categoryIds=50008141"
            //                 }
            //             }]
            //         },
            //         "id": "8c8006f2fa72aa480f77478cf961f073",
            //         "tag": "invoice"
            //     },
            //     // item
            //     "item_0408d050b13c9224a8b7a46dbfd969e2": {
            //         "ref": "360f46f",
            //         "submit": true,
            //         "hidden": {
            //             "extensionMap": {
            //                 "valid": "true",
            //                 "itemId": "608012795857",
            //                 "bizCode": "ali.china.tmall.fmcg",
            //                 "cartId": "2488043250770",
            //                 "shoppingOrderId": "0",
            //                 "villagerId": "0",
            //                 "skuId": "4434804566965"
            //             }
            //         },
            //         "type": "block$null$emptyBlock",
            //         "fields": {},
            //         "id": "0408d050b13c9224a8b7a46dbfd969e2",
            //         "tag": "item"
            //     },
            //     "submitOrder_1": res.data.submitOrder_1
            // }),
            data: JSON.stringify(res.data.data),
            // endpoint: '{"mode":"","features":"5","osVersion":"H5","protocolVersion":"3.0","ultronage":"true"}',
            endpoint: JSON.stringify(res.data.endpoint),
            // hierarchy: '{"structure":{"confirmPromotionAndService_1":["installmentToggle_1","installmentPicker_1"],"serviceCOBlock_yfx_8c8006f2fa72aa480f77478cf961f073":["service_yfx_8c8006f2fa72aa480f77478cf961f073"],"item_0408d050b13c9224a8b7a46dbfd969e2":["itemInfo_0408d050b13c9224a8b7a46dbfd969e2","serviceCOBlock_bjx_0408d050b13c9224a8b7a46dbfd969e2","alicomItemBlock_0408d050b13c9224a8b7a46dbfd969e2","promotion_0408d050b13c9224a8b7a46dbfd969e2","itemIcon_0408d050b13c9224a8b7a46dbfd969e2"],"confirmOrder_1":["topReminds_1","addressBlock_1","sesameBlock_1","cuntaoBlock_1","order_8c8006f2fa72aa480f77478cf961f073","confirmPromotionAndService_1","anonymous_1","activityTips_55548294","submitBlock_1","ncCheckCode_ncCheckCode1"],"serviceCOBlock_bjx_0408d050b13c9224a8b7a46dbfd969e2":["service_bjx_0408d050b13c9224a8b7a46dbfd969e2"],"order_8c8006f2fa72aa480f77478cf961f073":["orderInfo_8c8006f2fa72aa480f77478cf961f073","item_0408d050b13c9224a8b7a46dbfd969e2","deliveryMethod_8c8006f2fa72aa480f77478cf961f073","serviceCOBlock_yfx_8c8006f2fa72aa480f77478cf961f073","promotion_8c8006f2fa72aa480f77478cf961f073","invoice_8c8006f2fa72aa480f77478cf961f073","memo_8c8006f2fa72aa480f77478cf961f073","orderPay_8c8006f2fa72aa480f77478cf961f073","orderRemind_8c8006f2fa72aa480f77478cf961f073"],"submitBlock_1":["submitOrder_1"],"addressBlock_1":["address_1"]}}',
            hierarchy: JSON.stringify({
                "structure": res.data.hierarchy.structure
            }),
            // linkage: '"{"common":{"compress":true,"submitParams":"^^$$Z268084673c98dc92628de18735b08e402|null{$_$}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","validateParams":"^^$$ae2df5e46ab0cc76e86bbba23b0f5cce{$_$}H4sIAAAAAAAAAIWRzU7CQBSF32XWzaQFSlt2pQU1MYT4Q+LKXKYXaJjONDNDFAmJe+PSta9B4utgfA1vJSob4+7OyZ1zznyzYTMDFd5psxwDTfasqiXrbVgtwc20qa7WNTZnIcHaEa2yHhO64iDLKUyBOwMFciFLVI5XukDJrV4ZgXx85DBpMY+pw+3TkGZtilIBJflbj9Uwx79yHOgpaE6RtVZNRrEmn1LwCh0cyc2CxHvev75p8fG34cGbKs9RoaE8jxVoBQkfb6/73eN+9/T+/EJqBWaJjvTfnieD0eAiPSfhp2w7prZSC5ANhofFbTZipKwsmtTacq7+J2UXYLDgtUFLrwFXasXrhjzPwcGEsBZfH3EghlhkCxTLjMCy3gykRY+hEmZdu0tnSjWnHnEQh60kCCK/E/kDv+sneZ53Qz8aRmHW6Q+TYRxlSbfbTtJ2kLVTtt1+ApA1Z673AQAA"},"signature":"4aeb492788e1d777044d8f43dd6ae41d"}"',
            linkage: JSON.stringify({
                "common": {
                    "compress": true,
                    // "submitParams": "^^$$Z268084673c98dc92628de18735b08e402|null{$_$}H4sIAAAAAAAAAM1Xy27kuBX9lYJ6Mw04st4PZ+Uul2ecdrlq7LIngzwESqJcjCVRLVJ2l402BllkE2QRDLIJAuQXshzMIMjPdKORVX4hh5Sqyu6MMw0kAbIwUL68vLw89/KcqzujaElFb3h7NSf4JY6qpjT27oymJLLgbbVYNVT9n5VEiBO4GntGxiuTlCwlKTFlS3JqZiWjtTQrntPSFLxrM2rOH0S4cIwdo+53f+bjN29zVhOcZL3ZMRpySZ86RxKeEm7iyIbX6ox8hTgsMysqyQOzcijpa/PF+ZeOOV8H7GMj5Uta0xbn7Rg5FRkM77/789tvvnr7zW/f/e4PsFakvaIS9m2en05OJqf7xzBsknUjZFvyjJQKhttlMj4xYOkEbfeFYJf1RyOFHdcMIGUtJZLVl7M2p63Z0lcdFdIcP7Se9sY+D9oeLGbC2PvZncHEfs3rVcU7/F+QUlBkUjNe61g9nj+ydfa0PWY13e6UtDrKVa5DGi/Ybe9v7RhsWAysyLKdMPYjP9wxxFWndnie60WW5wdBHPg7RkZaqcyOF8HqOr4VhggBvPoT1ZrvxmFkwTqcddZHunsD4HintxuWZ0W55Vup7Wax43gkSkPiBXla5HEQU9U8abf6vCO1ZHJl7OFWrL7e/m+ZiJ+y2zH6D4VBb5rZEv1lyoqUpVlU2aUKkekWhwOC0XbM65xJ4HVv3d/nTXreXKpevq+7sry/V1fTZaALVtF7O7B8z/Ejz7EsC7GalldcbQaoCkgmDmH5yVIcoC0Z+nooiEzHvEq5AgIp6nQ2BkMF2ppmjYqn/bbZIFmVj+oy3Bj9z9vVcOQNaekSxVd11X3XX/7V6rVlPXhu7/70m79/9ce333397tuv1Xn6PduWgj9bkrqm5UsKSI1XjNSXl7xTPgqHs75DdTP1J2AHkbJlaScpWu4OgC5akinEbZUgCrD/xPr7X39L3//l97+8f/6Pv/315x0wVHdXGDMgYzzqnyHU5LWktdggjPj9G5YUOwZ0mZipDjqqZ2V+CLIieMF66c0vts0VZWi/oHAKEjqEoH2LMPTCKCviwC6s0EUiuh+mVAjwBtKBBTzGrukGa5LnLZbXxe6rWbL6ar9fGOqbs2umUu77EF3RO/Iy1w4Kc3rML5mQLBt2/hdC1pTmYh1W6IJtEGppRnGRKZVLnvdv3KgVUrqlni70kogL1sqOlEfgg024x/VX9dPF18SjHmbfCE+WRZFAWdJWoeGEYeDEVui5qli6Asocuo4V2j7IRVyxRl9mUpMUWF9ustisnJHrR/YlbxoY5mRV4akM0KKmtYRp3RqIrAVKdXBNpZI+/ERpcqooeQBpMp0vvkQjPNRBqNieoeVrq1jGVibESgCrD/annQD1CjGYxRKvFmE1RSrKUFlIvMlBWg9PZ9NkvH+6SM7PJqdwLODzolud8Jtt/sqmeSLjdcHaSqN0pk/X3PhIVNZ2kL32GA66IQ2iQ7C7cn22LidwqHjKlMAhsf55PpPPWPPsWbL0E8eyY+wjTXNBW9XqQGRjY0PsSvJmGAz0Pc20Y2VuLpXwk4b9y86OIMqU37KyJLu+aY0+YfMl1P7Ho/H8fNT/Hs3ORrabOIk7KtkVHU1Jpkw/fT7abyD8X9D0JZO7YGnTNm1/9MnLzxbT453e91OaXfHno+HcXds1LdMdTfU1d21/YnvR6IwUpGUI4Jk20mTiEei9xj/uTyZO6M3mLgMjia5peCtPKYYfvLvzdisFg7irok8B0LacApLbt4KBeUJpC+MtdG4t/AOlATtQfj7Wmgv+VTQF12zgfxQOBPwBaxp0zaJT1BsVnV1MTs8m+8np5CCZnFxMjmfzCUKdT+eINkdqWtQGKcTChXtwdDoZL7AKn+/ftl5YzBb7x4cTFc/2PF8xfJIkv+KsTliOX7A7bmz5seXEgRv5iQIadrBQRpVLCWLs/azUd6wg8HvZDeLQjf3Qd0OX+rZV7DxeDn0/cAPQSeT0y45t+ZEb5P3uEDxv26HtOQ4lQazaN0kqmZD8OqGKWqhOTSfT0hqjSyIh+SrdBwFiPYSwW+QJOtFTyFNzRtYJyatETYWJkGSVEJkMLzXR7yFR9KHCq2FCK2GdjZdoUqUbSU1vDksCtgOZYmh+sCL5FVUPzrYi38sy18EgVuQ0I34BVcNwEviURHZopXnqBVGK7S0taNvSFruWUjZib3e3Iqw2K3M7WO9qP1SeMvQIssIT8E3HVX+hXlOgTOpr1vJaESuczg5eOqaHRcFA2oZdkNh17CL1Az8geeyBwmnkFoWXulHsKI3tKu05vrCdW7+w/MwjaWjbBKsZQAhh8K2MkMF1Mdx14dpZltMoCmNiZR7NC5TbC8PMslOP2n6h/IG0Znlk8v9EI0rv8dkkz5qSSU3SR7kenH5w3v2+l/KDc8wHmwBMnAfACp3v4UfgO0Hg5VHoFU6Wup7lWMDr8Yt09edMkxNJdb7rD5ENFeHDUA1CXUsX+FDZKPJmHO4/Ins9ZWLMO3y1nQs0+5ofJW1OuBavzZ4DJjLe1fKQwk8N8mo6V1yL3/+RVM/HwOB/K9X43DyZfYFjHuq0bDuK0v9bmcbdPkamgQWCP5JpmGpMAzjgI4VDteGQHgYYndw/AToVuc33DwAA",
                    "submitParams": res.data.linkage.common.submitParams,
                    // "validateParams": "^^$$ae2df5e46ab0cc76e86bbba23b0f5cce{$_$}H4sIAAAAAAAAAIWRzU7CQBSF32XWzaQFSlt2pQU1MYT4Q+LKXKYXaJjONDNDFAmJe+PSta9B4utgfA1vJSob4+7OyZ1zznyzYTMDFd5psxwDTfasqiXrbVgtwc20qa7WNTZnIcHaEa2yHhO64iDLKUyBOwMFciFLVI5XukDJrV4ZgXx85DBpMY+pw+3TkGZtilIBJflbj9Uwx79yHOgpaE6RtVZNRrEmn1LwCh0cyc2CxHvev75p8fG34cGbKs9RoaE8jxVoBQkfb6/73eN+9/T+/EJqBWaJjvTfnieD0eAiPSfhp2w7prZSC5ANhofFbTZipKwsmtTacq7+J2UXYLDgtUFLrwFXasXrhjzPwcGEsBZfH3EghlhkCxTLjMCy3gykRY+hEmZdu0tnSjWnHnEQh60kCCK/E/kDv+sneZ53Qz8aRmHW6Q+TYRxlSbfbTtJ2kLVTtt1+ApA1Z673AQAA"
                    "validateParams": res.data.linkage.common.validateParams,
                },
                "signature": res.data.linkage.signature
            }),
        }),

        "ua": "137#clB9hE9oUotH9vNYyBdZvhsqIDsjyuDKcLAcDAon8VG6YalkT4A6tRSw6qlGzfTxOg1rc5CtdUJ4Lw8BS8NbZ4zUVGPW6/z9Ebj0orAaXMtG1r4bOUAsf2F4uwK0nRbcpX8EpMFMNoYaDTL8lwz+PrvndO7SBQ+35wD1WBJvyLuW6mQubdzmM/8RMvosfG0sAO+/sYJjJbD4ZxfLmY3ro1mnM8j90KHuh+FFY4niN/pW7hNNo/S1dnLMl5SW/pTNRpYPIEIEZV07cLmO70ao9lF/csfCT6ZuKnXzpDdDCG+qcdt8pVIzixUTCAgD0yHjD31tgQHV8xnqh3MjQo5N5XsB0vj1Hh/69ZnuFi3oiNi3rs709UgO5IogHea0CF0AUfERw7t3VxYSguoVX/FEX7jdVdxxnl7Mt8NmT0owrZmtLVOW/mJKryZ2I7hVbPrEbgvqUmzA4KOE6ljuKldey/Ed1RLxMzb/2BSIbTOvs74aaVR3s18AngMjDUSsr03/+fJpGL+Sjfm4hJ+d57XIHDGsFjjoLtthmAS4sKjPy+87IGiiriqwJI/SKzpa+ogwXQ+SJimROiNxXq1B5XpOW12GVxmFr4vcMSz9qJRK6ugJJuRxQgPzy7OgihwTJ8pT3tu5R82ptvKAjcM6XTQ/Eylwb3gbQbpVIuAjSRXsU0fEVWkcob66RVZOy6mRSaZmQofJ+GXppkJE1Aey+tppYSUS1lQypXiwQonoBf6b5nVc1IBi+piVYSUx1lDU9dicQonJ+swjpRUc1Aey+pipYSJx1GgippimQoRY+GXppRUc1Iei+ppVYTUx1Rwqd3vtpBqXEn2S4E/IrXBMlKj0p5yIkb7vpq8bjdYh+PjbMIxP/TkAv00nx+j0e953RQxy7ZmtBGLZkn7UNzPlza1RcYIQsx45yBhk0HespIdC98TlFGZRiNasr7IxcRHe3Fz+zEisv1pPCMcBskCkQQjTGc5J6XnRvMx9GXT/5xe326GIdqxLBPXVre7R8b6gtpEuEaMJAvlY8NV4QjFIKSqJ+NYnSwEh5SgOfa/y80AwGzcTFHzzdmT4NXGhp/Y1ze+RztACyldaNdwM1sgkjT4uy20os9rQAJ3SdxrM3ugu7knFc8mG8zTkUnNLEZiim2olNH+EWMno5+5+sEBRR4TNHnWkzHEyOUkHznnqYwOxRwsQfajpsrAh9ClR5Ep5s16MGIc4n3bgDYQSK2TyUWDSQIF/xOPJ/Fk4YcD2OQ1UaOGT+dx/KxLWV13lQMMPkt17fK4xHEUztf8VIknMxghZwinjwLWCbvvFbVMqPciQNZW/wab6a3xlFgniy8XFnKcqaKFL8TNBuGRehh0Q/NLLciKmEdGn/VuvWYEvRaKSXv9EBsgOzhI8kG1bnJmxxvdxNKfdfMLNEfZLvyQfJn3Vsodcdjxc4X6DgA+U58nnH0oRjoDGWkt7VF9Usyt983Z4v+t5ihIcYc==",
        "umidToken": "T2gAYhY1KfS-8FcYOkm-3wE-TUfbfy4Y4TZqJBCw1DBaQ4q2MoLHsQo5wni_RkbQjiOtIroYaYJEqsXDDgkTENTI"
    }

    let jsonStr = JSON.stringify(data)
    let signStr = token + "&" + u + "&" + appKey + "&" + jsonStr;

    // console.log(res)
    // console.log("\n\r")
    // console.log( signStr)
    let submitref = res.data.global.secretValue;
    let params = {
        jsv: '2.6.1',
        appKey: appKey,
        t: u,
        sign: md5.update(signStr).digest('hex'),
        api: 'mtop.trade.order.create.h5',
        v: '4.0',
        post: 1,
        type: 'originaljson',
        timeout: 15000,
        dataType: 'jsonp',
        isSec: 1,
        ecode: 1,
        ttid: '#t#ip##_h5_2019',
        H5Request: true,
        submitref: submitref
    }
    params = querystring.stringify(params);
    path = url + params;
    options.hostname = hostname;
    options.path = path;

    return httpRequest.requestPostHttps(options, data).then(function (d) {
        // var script = new vm.Script("function confirmCbA(e) {return (e)};" + d)
        // let res = script.runInThisContext();
        console.log(d)
        return d;
    });

}


module.exports = {
    requestActionOrder,
    requestActionCreate,
    requestActionConfirm
}
