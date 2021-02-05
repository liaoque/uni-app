# coding = utf-8
import urllib.request
import json

class Index:
    data = None
    def __init__(self):
        
        pass
    
    def initApi(self):
        try:
            resu = urllib.request.urlopen('http://api.wm18.com/page/showUpdate?access_token=36047f243b691caf83ba9723e936ea1b&itemID=&u=&platform=pc&encryption_time=18&encryption_word=a51aa27b6fe959a86690c593e9bf6233', data=None, timeout=10)
            json_data = resu.read().decode()
            self.data = json.loads(json_data)
            if self.data['status'] != 'ok':
                raise ValueError(json_data)
            self.data = self.data.data
        except:
            return False
        return True

    def uiCheckout(self):
        for item in self.data.list:
            print(item)
            pass
