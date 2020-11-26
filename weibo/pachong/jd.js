// const https = require('https');
process.env.TZ = "Asia/Shanghai";
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


function go(goodid, header, totalPrice, i) {
    if(i > 10){
        return ;
    }
    let result = jdOrder.requestActionOrder(goodid, header);
    result.then(function (result) {
        console.log("requestActionOrder", result.errMsg)
        if (result.order.orderprice.totalPrice < totalPrice) {
            result = jdOrder.requestActionConfirm(result, header);
            return result;
        }
        return false;
    }, function (error) {
        console.log("err" + error.toString())
    }).then(function (result) {
        console.log("requestActionConfirm", result)
    }, function (error) {
        console.log("err" + error.toString())
    })

    setTimeout(function () {
        go(goodid, header, totalPrice, i);
    },200);
}


var t1 = Date.now();
var t2 = new Date("2020-11-15 20:10:20").getTime();
goodid = 20739895092;
skuId = 4227830352490;

setTimeout(function (){
    go(goodid, header, totalPrice, 0)
}, t2 - t1 - 1000);