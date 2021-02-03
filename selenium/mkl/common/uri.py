

class UrlBase:
    urllist = []

    @staticmethod
    def openWindow(driver):
        currentUrl = driver.current_url
        if currentUrl in UrlBase.urllist:
            driver.back()
            return
        print(currentUrl)
        
        #self.assertNotEqual(currentUrl, url,  "%s == %s"%(currentUrl, url))
        #time.sleep(5)

        pass

    def appendUrl(self, url):
        self.urllist.append(url)
        pass

    def hasUrl(self, url):
        try:
            self.urllist.index(url)
        except ValueError:
            return False
        return True
    pass