# coding = utf-8
from common.uri import UrlBase
import index.base as IndexController


class Index():
    UrlBase = None
    driver = None

    def __init__(self, driver):
        self.UrlBase = UrlBase
        self.driver = driver
        pass

    def route(self, url):
        if self.UrlBase.hasUrl(url):
            self.driver.back()
            pass
        self.UrlBase.appendUrl(url)
        if url == 'http://wshop.wm18.com':
            indexController = IndexController.Index(driver, self)
            indexController.initApi()
            indexController.uiCheckout()
            pass
        elif url == '':
            pass
        pass
    pass
