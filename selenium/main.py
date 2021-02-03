# coding = utf-8

# import goodsInfo.GoodsInfo2 as GoodsInfo2
# import goodsInfo2

from tb.main import Tb
# from suning.main import Sn as Tb
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import  time 



# localtime = time.localtime(time.time())
# print(localtime, time.time())
# a = "2020-12-30 19:55:00"
# opportunityTime = time.mktime(time.strptime(a,"%Y-%m-%d %H:%M:%S"))
# print(opportunityTime - time.time())
# time.sleep(opportunityTime - time.time())
# print("开始抢")

strCookie = u"thw=cn"
#strCookie = "t=66099f18a8c596abcf61aa6036d42cbe; thw=cn; cna=XQ5NGDxeVBACAXJW5W7+vb4E; lgc=%5Cu4E86%5Cu7F3A123; tracknick=%5Cu4E86%5Cu7F3A123; _m_h5_tk=b70c4faa7e42fcac12e46e4044d6a60b_1608986218483; _m_h5_tk_enc=ef30fc0fb9b898651138dc65c4e72e69; v=0; _tb_token_=ee85eeadd57bf; xlly_s=1; sgcookie=E100Vif4R7Bh4k5ZpslItdSeMgWH7RT3A7f1HhozM8wm2rQUPJC1H5WyO7oeaUpaCHg6q1piOxBpK3BFFtdBMxvTYg%3D%3D; csg=8149ca41; dnk=%5Cu4E86%5Cu7F3A123; existShop=MTYwODk3Nzk2NQ%3D%3D; publishItemObj=Ng%3D%3D; _cc_=VT5L2FSpdA%3D%3D; _l_g_=Ug%3D%3D; sg=353; _nk_=%5Cu4E86%5Cu7F3A123; mt=ci=48_1; uc1=cookie16=V32FPkk%2FxXMk5UvIbNtImtMfJQ%3D%3D&existShop=false&cookie14=Uoe0ZeuKvqvNtw%3D%3D&cart_m=0&cookie15=VT5L2FSpMGV7TQ%3D%3D&cookie21=URm48syIZJfmZ9wa5HtcEA%3D%3D&pas=0; isg=BMXFOJ2ZNqMvDhIz8zWqGno41AH_gnkUgiuxYscqmvwLXuXQj9bo5J68aIKoHpHM; l=eBg7RHscOCCb4l8kBOfanurza77OSIRYYuPzaNbMiOCP9U1B5qaVWZ-kSuY6C3GVhsGDR3uKcXmBBeYBq7VonxvtIosM_Ckmn; tfstk=cv8VB0afNq3VY27svZ_afD8dOcAAwA-Xfu5hmhwQL6Tk0sfDyRCoiHXPI93lm"
listCookie = [item.split("=", 1) for item in strCookie.split("; ")]



driver = webdriver.Chrome()


# tb = Tb(driver=driver, listCookie=listCookie)
# tb.login()
# tb.signCart()

import remote.dateTime as dateTime

tb = Tb(driver=driver, listCookie=listCookie)

opportunity = '2021-01-06 19:58:00'
opportunityTime = time.mktime(time.strptime(opportunity,"%Y-%m-%d %H:%M:%S"))
beiJingTime= dateTime.getBeijinTime()
time.sleep(opportunityTime - beiJingTime)

tb.openCart()
tb.chargeCartItem('#J_CheckBox_2488756052419')
# tb.chargeCartItem('#J_CheckBox_2321472316012')
tb.confimOrderSleep('#J_SmallSubmit', '2021-01-06 19:59:59')

#x = goodsInfo2()



# print(GoodsInfo2.GoodsInfo3)




