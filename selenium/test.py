# coding = utf-8

from selenium import webdriver

from selenium.webdriver.chrome.options import Options

chrome_options = Options()

chrome_options.add_argument('--no-sandbox') #让Chrome在root权限运行

chrome_options.add_argument('--disable-dev-shm-usage') #不打开图形界面

chrome_options.add_argument('--headless') #浏览器不提供可视化页面

chrome_options.add_argument('blink-settings=imagesEnabled=false') #不加载图片, 提升速度

chrome_options.add_argument('--disable-gpu') #谷歌文档提到需要加上这个属性来规避bug

#driver = webdriver.Chrome(chrome_options=chrome_options, executable_path='C:\Program Files (x86)\Google\Chrome\Application') 

#Chrome驱动的位置，此学习记录中安装到了Chrome程序根目录，该路径为绝对路径

driver = webdriver.Chrome()



driver.get('http://wshop.wm18.com')

#pause(300000)
#– 根据指定时间暂停Selenium脚本执行
#– 常用在调试脚本或等待服务器段响应时 
# implicitly_wait
# time.sleep() 
# driver.implicitly_wait(30)，它的用法应该比time.sleep() 更智能，后者只能选择一个固定的时间的等待，前者可以在一个时间范围内智能的等待

# execute_script(script, *args)
# 调用js方法
# http://www.selenium.org.cn/1498.html


# 处理下拉框
# http://www.selenium.org.cn/1484.html

#   控制滚动条到底部
# http://www.selenium.org.cn/1478.html


#  键盘按键用法
#  键盘组合键用法
#  send_keys() 输入中文运行报错问题
# http://www.selenium.org.cn/1461.html


#goBack()
#模拟点击浏览器的后退按钮
#close()
#模拟点击浏览器关闭按钮 

#http://www.selenium.org.cn/1526.html
#页面选择

# http://www.selenium.org.cn/1442.html
#  cookie处理

# webdriver原理
# http://www.selenium.org.cn/1436.html

# http://www.selenium.org.cn/1421.html
# 鼠标事件

# http://www.selenium.org.cn/1376.html
# ajax

print(driver.title)

#driver.quit()