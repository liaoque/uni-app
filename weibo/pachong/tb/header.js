module.exports = (token, tokenEnc,  cookie2) => {
    let header = {
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
        'accept_language': "zh-CN,zh;q=0.9",
        'Sec_Fetch_Site': "cross-site",
        'Sec_Fetch_Mode': "cors",
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': 1,
        "Connection": 'keep-alive',
        'ACCEPT_ENCODING': "gzip, deflate, br",
        'ACCEPT': '*/*',
        // 'Referer': 'https://buy.m.tmall.com/order/confirmOrderWap.htm?enc=%3F&itemId=602464099449&exParams=%7B%22etm%22%3A%22%22%7D&skuId=4216062521187&quantity=1&buyNow=true&_input_charset=utf-8&x-itemid=602464099449&spm=a222m.7628550',
        // cookie:   "thw=cn; enc=WM2GB6lDHic7yKraplkopqJJiEwO5S0z%2BH8Gx7N5Xank3RZzfwA9T1tEpqq9Bxu56ly9u0CXC8Z8z9FJM6QemQ%3D%3D; hng=CN%7Czh-CN%7CCNY%7C156; _samesite_flag_=true; WAPFDFDTGFG=%2B4cMKKP%2B8PI%2BuCalAAKN2%2F%2B%2FzxA%3D; _w_app_lg=0; ockeqeudmj=hbJOt5g%3D; cookie2=1fa9321fb5656ad94715e83ff4b38923; t=86bcf8f18a8db504f8d6da2ca2d07c68; _tb_token_=36e4e1d35796e; _m_h5_tk=a456bbd96ee3cd24dc756b21f3b38bdd_1605428012419; _m_h5_tk_enc=bef714e818d8349399d3fe4fb8cfaf86; xlly_s=1; cna=UTSKF0MYwRQCAdOh/Sw2+Wdu; v=0; sgcookie=E100d01QW7r2weN5XRRBTYIDMAD%2Btj31m3B6g7dOSql2REJnN8zmzKEonyzH44t1SokmvA9tQAcpRxRtL5nmv8r8vA%3D%3D; unb=73207155; uc3=lg2=WqG3DMC9VAQiUQ%3D%3D&id2=VAKPf0wsGC4%3D&vt3=F8dCufwviTx9ftz2Geo%3D&nk2=ojkb2p8YgQ%3D%3D; csg=9548299c; lgc=%5Cu4E86%5Cu7F3A123; cookie17=VAKPf0wsGC4%3D; dnk=%5Cu4E86%5Cu7F3A123; skt=6fcb45aa4e84b289; existShop=MTYwNTQxODAwNg%3D%3D; uc4=nk4=0%40oDtJj6EJ5mpEChXXQZWY%2BCjl&id4=0%40VhvD%2Bxdkn4n5zNnF4SfuKmey8g%3D%3D; publishItemObj=Ng%3D%3D; tracknick=%5Cu4E86%5Cu7F3A123; _cc_=VT5L2FSpdA%3D%3D; _l_g_=Ug%3D%3D; sg=353; _nk_=%5Cu4E86%5Cu7F3A123; cookie1=URtD0mivXiaxyVunz9TatJdDozh9HQE5IHSh0QXBang%3D; mt=ci=49_1; uc1=cookie21=UtASsssmfaCOMId4NoCaRQ%3D%3D&existShop=false&cookie15=U%2BGCWk%2F75gdr5Q%3D%3D&pas=0&cookie16=URm48syIJ1yk0MX2J7mAAEhTuw%3D%3D&cookie14=Uoe0aDg4rWCk4w%3D%3D; l=eBQpfWa4Opb7GPH1BO5Cnurza779yIRbzsPzaNbMiInca1JGTF129NQVkXI97dtjgtfXaety8QwNQRner2aLSAkDBeYIgnspBxv9-; tfstk=c8VdBOYp0NLpSjbsmJBMNtWwoMQGaFQxq1owwZ1VDhueIQYWyscgiSBwNhutWxbO.; isg=BNHRDJe9alCQRIZhp1Tp8jOC4NtrPkWwYgkE8LNmzRi3WvGs-45VgH-7-Ci80t3o"
        cookie: [
            'cna=sPB7FlbDkX0CAbfTwEfzUmA5',
            'lid=%E4%BA%86%E7%BC%BA123',
            'enc=jNn8COdDEF1nnANXWB0AO8M3mW%2FKpg2JSHWqgMpO7Sns1SH3MKkhGvwZhfLL%2BzkwgI1YgKGVt1GLZSl%2F%2BC4CpQ%3D%3D',
            'hng=CN%7Czh-CN%7CCNY%7C156',
            'dnk=%5Cu4E86%5Cu7F3A123',
            'tracknick=%5Cu4E86%5Cu7F3A123',
            'lgc=%5Cu4E86%5Cu7F3A123',
            'login=true',
            'cookie2=' + cookie2,
            't=17b0a927a2151b8298415144163d405f',
            'xlly_s=1', '_tb_token_=e1ee18814bf6d',
            'uc1=cookie14=Uoe0bkmIp5jKzA%3D%3D&cookie15=UIHiLt3xD8xYTw%3D%3D&existShop=false&cookie21=URm48syIZJfmZ9wa5HtcEA%3D%3D',
            'uc3=lg2=UtASsssmOIJ0bQ%3D%3D&nk2=ojkb2p8YgQ%3D%3D&vt3=F8dCufHEema9YivIlpg%3D&id2=VAKPf0wsGC4%3D',
            '_l_g_=Ug%3D%3D',
            'uc4=nk4=0%40oDtJj6EJ5mpEChXRenqGABlH&id4=0%40VhvD%2Bxdkn4n5zNnF58n2nqee%2FA%3D%3D',
            'unb=73207155',
            'cookie1=URtD0mivXiaxyVunz9TatJdDozh9HQE5IHSh0QXBang%3D',
            'cookie17=VAKPf0wsGC4%3D',
            '_nk_=%5Cu4E86%5Cu7F3A123',
            'sgcookie=E100goeN2rd3d1YKS%2B0HtpCSijiDrEyIeUdjH7wwzEI%2FIoA2xpOmqs%2Fi54SsOfZzR6qOSLydwdkVCCRF0FMGOhTO9Q%3D%3D',
            'sg=353', 'csg=a183b4c8',
            '_m_h5_tk=' + token + '_1605449030759',
            // '_m_h5_tk_enc=7579b120c8437602d9dd72118a029d96',
            '_m_h5_tk_enc=' + tokenEnc,
            'l=eBaTA2wmQOvw9gINBOfZnurza779sIRfguPzaNbMiOCP_zfp5TvcWZ5g4xT9CnGRHsI9R3RZPRigBxLpPyd2P-366VdaCaHq3wC..',
            'isg=BOPj1EqGuEFMAHX9aGZnI3eAcieN2HcaBpONRhVAPcK5VAF2najoatKCSiLadM8S',
            // 'isg=BOvrvtOnMIKzlmxzydpjYGWkegnVAP-C9K8uAl1oxSqB_A9e5dG10GdOUDqSR1d6',
            'tfstk=cxz5BpscgLvWWI8e971qaHdEcQ0FZOtZMKkaNudzL-YCcYP5iqTZCEF62hi-oj1..'
            // 'tfstk=cTfVBQvSECjS-cRpiIOZhwLL-RdAZVSlcrTvnOzskBNoZEvcimo9rClVGsDT6Kf..'

       ]
    };

    return header;
}
