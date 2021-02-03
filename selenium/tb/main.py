# coding = utf-8

import  time 
import os
from selenium.webdriver.common.action_chains import ActionChains
import remote.dateTime as dateTime
import common.actionMail as actionMail

class Tb:
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
        m = actionMail.SendMail(u"taobao登录",content=content,file=filePath,image=filePath)
        m.send_mail()
        pass

    def login(self):
        self.driver.maximize_window()
        self.driver.implicitly_wait(30)
        qrcode = self.driver.find_element_by_css_selector(".icon-qrcode")
        ActionChains(self.driver).move_to_element(qrcode).perform()
        time.sleep(1)
        qrcode.click()
        time.sleep(3)
        filePath = os.getcwd() + "/public/erm/tb.png"
        pictureUrl = self.driver.get_screenshot_as_file(filePath)
        if pictureUrl:
            self.sendMailLogin(filePath)
            pass
        pass

    def openCart(self):
        self.driver.get("https://www.taobao.com/")
        self.driver.implicitly_wait(30)
        self.driver.delete_all_cookies()
        for itemCookie in self.listCookie:
            # print({'name': itemCookie[0], 'value' : itemCookie[1], 'domain': '.taobao.com'})
            self.driver.add_cookie({'name': itemCookie[0], 'value' : itemCookie[1], 'domain': '.taobao.com'})
            pass
        pass
        self.driver.find_element_by_css_selector("#mc-menu-hd").click()
        time.sleep(5)
        if self.driver.current_url.count("/member/login.jhtml") == 1:
            self.login()

        while self.driver.current_url.count("/member/login.jhtml") == 0:
            print(self.driver.current_url)
            print(self.driver.current_url.count("/member/login.jhtml"))
            time.sleep(5)
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


    def confimOrder(self, item):
        cartItem = self.driver.find_element_by_css_selector(item)
        ActionChains(self.driver).move_to_element(cartItem).perform()
        cartItem.click()
        self.driver.implicitly_wait(30)
        cartItem = self.driver.find_element_by_css_selector('#submitOrderPC_1 .go-btn')
        ActionChains(self.driver).move_to_element(cartItem).perform()
        cartItem.click()
        pass

    def confimOrderSleep(self, item, opportunity):
        opportunityTime = time.mktime(time.strptime(opportunity,"%Y-%m-%d %H:%M:%S"))
        beiJingTime= dateTime.getBeijinTime()
        time.sleep(opportunityTime - beiJingTime)
        cartItem = self.driver.find_element_by_css_selector(item)
        ActionChains(self.driver).move_to_element(cartItem).perform()
        cartItem.click()
        self.driver.implicitly_wait(30)
        cartItem = self.driver.find_element_by_css_selector('#submitOrderPC_1 .go-btn')
        ActionChains(self.driver).move_to_element(cartItem).perform()
        cartItem.click()
        pass