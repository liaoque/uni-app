# coding = utf-8
import urllib.request
import json
import unittest
import time
from common.uri import UrlBase
from selenium.webdriver.common.action_chains import ActionChains



class Index(unittest.TestCase, UrlBase):
    data = None
    driver = None
    router = None

    # 当前页面的url
    curUrl = "http://wshop.wm18.com"
    
    def __init__(self, driver, router):
        unittest.TestCase.__init__(self)
        self.driver = driver
        self.router = router
        pass
    
    def initApi(self):
        try:
            resu = urllib.request.urlopen('http://api.wm18.com/page/showUpdate?access_token=36047f243b691caf83ba9723e936ea1b&itemID=&u=&platform=pc&encryption_time=18&encryption_word=a51aa27b6fe959a86690c593e9bf6233', data=None, timeout=10)
            json_data = resu.read().decode()
            self.data = json.loads(json_data)
            self.assertEqual(self.data['status'], 'ok', json_data)
            self.data = self.data['data']
        except ValueError:
            print(ValueError)
            return False
        return True

    def uiCheckout(self):
        # 模块(
        #   banner:图片广告，collageRoll:滚动拼团，goods：商品，goodsList：商品列表，paranText：富文本，
        #   cube：魔方，notice：公告，coupon：优惠券，floatPic：弹出图片，countDown：倒计时，search：搜索，
        #   h1Div：标题，button：按钮，video：视频，rob：疯抢，robRoll：滚动疯抢
        # )
        self.assertTrue(len(self.data['list']) > 0, "微页面 list 数组数据为空")
        self.driver.get(self.curUrl)
        time.sleep(2)
        for item in self.data['list']:
            method = 'ui' + item['tp'].capitalize()
            mtd = getattr(self, method)
            mtd(item)
            pass

    # 搜索框检测
    def uiSearch(self, item):
        # 找搜索框
        adSearch = self.driver.find_element_by_css_selector(".adSearch")
        self.assertTrue(adSearch, "搜索框不存在")

        # 打开搜索
        ActionChains(self.driver).move_to_element(adSearch).perform()
        adSearch.click()

        # 查看热搜
        searchIconGif = self.driver.find_elements_by_css_selector("#search .content ul li")
        self.assertTrue(searchIconGif, "热搜榜不显示")

        # 关闭搜索
        iconquxiao = self.driver.find_element_by_css_selector("#search .search-text + button")
        self.assertTrue(iconquxiao, "关闭按钮不显示")
        iconquxiao.click()

        # 查找图标
        if item['url'] != '' and item['url'] != '#':
            searchIconGif = self.driver.find_element_by_css_selector(".adSearch .searchIconGif")
            self.assertTrue(searchIconGif, "搜索框右侧图片不存在")
            self.checkEqualClick(searchIconGif, item['url'])

        # 铃铛
        bell = self.driver.find_element_by_css_selector(".adSearch .searchRightXiaoxi")
        self.assertTrue(bell, "铃铛按钮不显示")
        url = self.curUrl
        self.checkNotEqualClick(bell, url)
        pass

    def checkNotEqualClick(self, target, url):
        target.click()
        currentUrl = self.driver.current_url
        self.assertNotEqual(currentUrl, url,  "%s == %s"%(currentUrl, url))
        time.sleep(5)
        self.driver.back()
        pass

    def checkEqualClick(self, target, url):
        target.click()
        currentUrl = self.driver.current_url
        self.assertEqual(currentUrl, url,  "%s != %s"%(currentUrl, url))
        time.sleep(5)
        self.driver.back()
        pass

    def uiBanner(self, item):
        for banner in item['lists']:
            print(".thisBanner img[href=%s]"%(banner['img']))
            bannerElement = self.driver.find_element_by_css_selector(".thisBanner img[src='%s']"%(banner['img']))
            self.assertTrue(bannerElement, "banner 不显示")
            if banner['url'] != '' and banner['url'] != '#':
                self.checkNotEqualClick(bannerElement, self.curUrl)
                pass
        print("uiBanner")
        pass

    def uiCoupon(self, item):
        print("uiCoupon")
        pass



