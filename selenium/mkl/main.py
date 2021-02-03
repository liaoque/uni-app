# coding = utf-8

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import  time 
import urllib.request
import json
import index.base as IndexController

driver = webdriver.Chrome()
# driver.execute_script('location.href')
indexController = IndexController.Index(driver)
indexController.initApi()
indexController.uiCheckout()







# resu = urllib.request.urlopen('http://api.wm18.com/page/showUpdate?access_token=36047f243b691caf83ba9723e936ea1b&itemID=&u=&platform=pc&encryption_time=18&encryption_word=a51aa27b6fe959a86690c593e9bf6233', data=None, timeout=10)
# json_data = resu.read().decode()
# data = json.loads(json_data)


# print(data['status'])


# driver = webdriver.Chrome()

# u = '333119'
# driver.get("http://wshop.wm18.com/testLogin?pass=Aa111111&u=" + u)
# driver.get("https://vip.iqiyi.com/jihuoma.html?platform=b6c13e26323c537d&fc=b1250a65169226de" )
# time.sleep(5)
# driver.find_element_by_css_selector("#testLoginUserId div").click()
# time.sleep(5)


# for item in driver.find_elements_by_css_selector("a"):
#     print(item.get_attribute("href"))





