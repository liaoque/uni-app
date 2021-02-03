# coding = utf-8


import urllib.request
import time
import traceback


def getBeijinTime():
     try:
        headers = {'User-Agent': 'Mozilla/5.0'} #站点服务器认为自己（浏览器）兼容Moailla的一些标准
        req = urllib.request.Request('http://time1909.beijing-time.org/time.asp', headers=headers)
        response = urllib.request.urlopen(req)
        if response.status == 200:
            #解析响应的消息
            result = str(response.read(), encoding = "utf8")
            data = result.split("\r\n")

            year = data[1][len("nyear")+1 : len(data[1])-1]
            month = data[2][len("nmonth")+1 : len(data[2])-1]
            day = data[3][len("nday")+1 : len(data[3])-1]
            #wday = data[4][len("nwday")+1 : len(data[4])-1]
            hrs = data[5][len("nhrs")+1 : len(data[5])-1]
            minute = data[6][len("nmin")+1 : len(data[6])-1]
            sec = data[7][len("nsec")+1 : len(data[7])-1]
            
            opportunityTime = "%s-%s-%s %s:%s:%s" % (year, month, day, hrs, minute, sec)
            beijinTime = time.mktime(time.strptime(opportunityTime, "%Y-%m-%d %H:%M:%S"))
            return beijinTime
     except Exception as e:
         print(e)
         return None


def getBeijinDateTime():
     try:
        headers = {'User-Agent': 'Mozilla/5.0'} #站点服务器认为自己（浏览器）兼容Moailla的一些标准
        req = urllib.request.Request('http://time1909.beijing-time.org/time.asp', headers=headers)
        response = urllib.request.urlopen(req)
        if response.status == 200:
            #解析响应的消息
            result = str(response.read(), encoding = "utf8")
            data = result.split("\r\n")

            year = data[1][len("nyear")+1 : len(data[1])-1]
            month = data[2][len("nmonth")+1 : len(data[2])-1]
            day = data[3][len("nday")+1 : len(data[3])-1]
            #wday = data[4][len("nwday")+1 : len(data[4])-1]
            hrs = data[5][len("nhrs")+1 : len(data[5])-1]
            minute = data[6][len("nmin")+1 : len(data[6])-1]
            sec = data[7][len("nsec")+1 : len(data[7])-1]
            
            opportunityTime = "%s-%s-%s %s:%s:%s" % (year, month, day, hrs, minute, sec)
            beijinTime = time.strptime(opportunityTime, "%Y-%m-%d %H:%M:%S")
            return beijinTime
     except Exception as e:
         print(e)
         return None
