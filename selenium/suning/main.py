# coding = utf-8

import time 
import remote.dateTime as dateTime
import os
import common.actionMail as actionMail
from selenium.webdriver.common.action_chains import ActionChains

class Sn:
    driver = None  
    listCookie = None  
    def __init__(self, driver, listCookie):
        self.driver = driver
        self.listCookie = listCookie
        pass

    def sendMailLogin(self, filePath):
        """
        docstring
        """
        content = '''
            <h1>邮件测试</h1>
            <p>图片展示：</p>
            <p><img src="cid:image1"></p>
            '''
        m = actionMail.SendMail(u"苏宁登录",content=content,file=filePath,image=filePath)
        m.send_mail()
        pass

    def login(self):
        self.sleep("2020-12-31 09:28:00")
        self.driver.get("https://passport.suning.com/ids/login?service=https%3A%2F%2Floginst.suning.com%2F%2Fauth%3FtargetUrl%3Dhttps%253A%252F%252Fwww.suning.com%252F&method=GET&loginTheme=b2c")
        self.driver.maximize_window()
        self.driver.implicitly_wait(30)
        filePath = os.getcwd() + "/public/erm/suning.png"
        pictureUrl = self.driver.get_screenshot_as_file(filePath)
        if pictureUrl:
            self.sendMailLogin(filePath)
            pass
        pass

    def signCart(self):
        self.sleep("2020-12-31 09:29:59")
        url = "https://product.suning.com/0000000000/11001203841.html?safp=d488778a.X8Cn.11.0&safc=prd.0.0&safpn=10009"
        self.driver.get(url)
        self.driver.implicitly_wait(30)
        item = self.driver.find_element_by_css_selector('#buyNowAddCart')
        i = 0
        while item.is_displayed():
            time.sleep(1)
            self.driver.refresh()
            self.driver.implicitly_wait(30)
            filePath = os.getcwd() + "/public/erm/suning" + i + ".png"
            self.driver.get_screenshot_as_file(filePath)
            item = self.driver.find_element_by_css_selector('#buyNowAddCart')
            i += 1
            if i > 5:
                break
            pass
        if item.is_displayed():
            item.click()
            self.confimOrder()
            return True
        return False

    def openCart(self):
        self.driver.get("https://passport.suning.com/ids/login?service=https%3A%2F%2Floginst.suning.com%2F%2Fauth%3FtargetUrl%3Dhttps%253A%252F%252Fwww.suning.com%252F&method=GET&loginTheme=b2c")
        time.sleep(15)
        self.driver.delete_all_cookies()
        for itemCookie in self.listCookie:
            # print({'name': itemCookie[0], 'value' : itemCookie[1], 'domain': '.taobao.com'})
            self.driver.add_cookie({'name': itemCookie[0], 'value' : itemCookie[1], 'domain': '.taobao.com'})
            pass
        pass
        self.driver.find_element_by_css_selector("#mc-menu-hd").click()
        # self.driver.get("https://cart.taobao.com/cart.htm?spm=a21bo.2017.1997525049.1.5af911d9LKauJS&from=mini&pm_id=1501036000a02c5c3739")
        time.sleep(5)

    def chargeCartItem(self, item):
        cartItem = self.driver.find_element_by_css_selector(item)
        if(cartItem.is_selected() == False):
            cartLabelItem = self.driver.find_element_by_css_selector(item + " + label")
            ActionChains(self.driver).move_to_element(cartLabelItem).perform()
            cartLabelItem.click()
        cartItem = self.driver.find_element_by_css_selector(item)
        print(cartItem.is_selected())

        pass


    def confimOrder(self):
        self.driver.implicitly_wait(30)
        cartItem = self.driver.find_element_by_css_selector('#step6 #submit-btn')
        ActionChains(self.driver).move_to_element(cartItem).perform()
        cartItem.click()
        pass

    def sleep(self, opportunity):
        opportunityTime = time.mktime(time.strptime(opportunity,"%Y-%m-%d %H:%M:%S"))
        beiJingTime= dateTime.getBeijinTime()
        time.sleep(opportunityTime - beiJingTime)
        pass

    def confimOrderSleep(self, opportunity):
        

        self.driver.implicitly_wait(30)
        cartItem = self.driver.find_element_by_css_selector('#step6 #submit-btn')
        ActionChains(self.driver).move_to_element(cartItem).perform()
        cartItem.click()
        pass