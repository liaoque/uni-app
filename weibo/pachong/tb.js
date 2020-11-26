// const https = require('https');

process.env.TZ = "Asia/Shanghai";

const https = require('https');
const vm = require('vm');
const querystring = require('querystring');
// https://wq.jd.com/deal/masset/userasset?reg=1&action=1&giftcardtype=1&isnew=1&skunum=41293494680_1&sceneval=2&setdefcoupon=0&r=0.08947073927112115&callback=userassetCbA&traceid=1028560044054495594

const jdOrder = require('./tb/order')
const jdUser = require('./tb/user')
const getJdHeader = require('./tb/header')


// let ptkey = 'AAJfixpBADDO4WH56HLis8ExzUNCPdNuaNB_qxGqeKM8v0qsj-STzdB-ZSv-lJGIccn-8pxTR6s';
let goodid = 20739895092;
let totalPrice = 149900 * 2;
let skuId = 4227830352490;
// _m_h5_tk =  a456bbd96ee3cd24dc756b21f3b38bdd_1605428012419
let token = 'f3dd58ff1e2eb5711e537bda3341ef97';
//  _m_h5_tk_enc = bef714e818d8349399d3fe4fb8cfaf86
let tokenEnc = 'ec64305c97f0b3831527962626db7891';
let cookie2 = '1fa9321fb5656ad94715e83ff4b38923';
let header = getJdHeader(token, tokenEnc, cookie2);


// let result = jdUser.requestUser(token, header);

goodid = 20739895092;
skuId = 4227830352490;
// 608012795857_1_4434804566965_null_0_null_null_2488043250770_qianggou_null_null_0_null_buyerCondition
function go(goodid, skuId, i){
    console.log("开始抢---")
    if(i > 10){
        return ;
    }
    let result = jdOrder.requestActionOrder(goodid, skuId, token, header)
    result.then(function (result) {
        // console.log(result, 222)
        jdOrder.requestActionCreate(JSON.parse(result), token, header)
    })
    setTimeout(function () {
        go(goodid, skuId, i);
    },200);
}

var t1 = Date.now();
var t2 = new Date("2020-11-15 20:10:20").getTime();
goodid = 20739895092;
skuId = 4227830352490;

setTimeout(function (){
    go(goodid, skuId, 0)
}, t2 - t1 - 1000);
