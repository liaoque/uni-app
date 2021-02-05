# coding = utf-8
from common.uri import UrlBase
import controller.index.base as IndexController
import controller.goods.list as GoodsListController
import controller.goods.class2 as GoodsClassController
import controller.goods.info as GoodsInfoController
import controller.collage.list as CollageListController
import controller.collage.info as CollageInfoController
import controller.introduce.index as IntroduceController
import controller.cart.index as CartController
import controller.promotions.index as PromotionsController
import controller.personal.center as PersonalCenterController
import controller.personal.wAcc as PersonalwAccCenterController
import controller.personal.wCard as PersonalwCardCenterController
import controller.personal.wQa as PersonalwQaCenterController
import controller.personal.wQaContent as PersonalwQaContentCenterController
import controller.personal.wTran as PersonalwTranCenterController
import controller.personal.wRmbOrder as PersonalwRmbOrderCenterController
import controller.personal.intMy as PersonalintMyCenterController
import controller.personal.intExc as PersonalintExcCenterController
import controller.personal.intMaili as PersonalintIntMailiCenterController
import controller.personal.wMaterial as PersonalintwMaterialCenterController
import controller.personal.intMailiList as PersonalintIntMailiListCenterController

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
        host = 'wshop.wm18.com'
        if url.index(host):
            self.driver.back()
            pass
        self.UrlBase.appendUrl(url)
        host = url[url.index(host) + len(host)]
        if url == '/':
            # 首页
            indexController = IndexController.Index(driver, self)
            pass
        elif url == '/goodsList':
            # 商品列表
            indexController = GoodsListController.Index(driver, self)
            pass
        elif url == '/goodsClass':
            # 分类
            indexController = GoodsClassController.Index(driver, self)
            pass
        elif url == '/goodsInfo':
            # 商品详情
            indexController = GoodsInfoController.Index(driver, self)
            pass
        elif url == '/collageList':
            # 拼团列表
            indexController = CollageListController.Index(driver, self)
            pass
        elif url == '/collageInfo':
            # 拼团详情
            indexController = CollageInfoController.Index(driver, self)
            pass
        elif url == '/introduce':
            # vip
            indexController = IntroduceController.Index(driver, self)
            pass
        elif url == '/cart':
            # 购物车
            indexController = CartController.Index(driver, self)
            pass
        # elif url == '/cart':
        #     CartController = CartController.Index(driver, self)
        #     CartController.initApi()
        #     CartController.uiCheckout()
        #     pass
        elif url == '/promotions':
            # 凑单
            indexController = PromotionsController.Index(driver, self)
            pass
        elif url == '/personalCenter':
            # 个人中心
            indexController = PersonalCenterController.Index(driver, self)
            pass
        elif url == '/wAcc':
            # 我的账户
            indexController = PersonalwAccCenterController.Index(driver, self)
            pass
        elif url == '/wCard':
            # 银行卡
            indexController = PersonalwCardCenterController.Index(driver, self)
            pass
        elif url == '/wQa':
            # 常见问题
            indexController = PersonalwQaCenterController.Index(driver, self)
            pass
        elif url == '/wQaContent':
            # 常见问题详细
            indexController = PersonalwQaContentCenterController.Index(driver, self)
            pass
        elif url == '/wTran':
            # 交易明细
            indexController = PersonalwTranCenterController.Index(driver, self)
            pass
        elif url == '/wRmbOrder':
            # 收入明细
            indexController = PersonalwRmbOrderCenterController.Index(driver, self)
            pass
        elif url == '/intMy':
            # 我的积分
            indexController = PersonalintMyCenterController.Index(driver, self)
            pass
        elif url == '/intExc':
            # 麦粒兑换积分
            indexController = PersonalintExcCenterController.Index(driver, self)
            pass
        elif url == '/intMaili':
            # 我的麦粒
            indexController = PersonalintIntMailiCenterController.Index(driver, self)
            pass
        elif url == '/intMailiList':
            # 麦粒明细
            indexController = PersonalintIntMailiListCenterController.Index(driver, self)
            pass
        
        elif url == '/wMaterial':
            # 推文列表和内容 发圈素材 海报
            indexController = PersonalintwMaterialCenterController.Index(driver, self)
            pass

        elif url == '/myBonus':
            # 优惠券列表
   
            pass
        elif url == '/myBonusInfo':
            # 优惠券详细
 
            pass
        

        elif url == '/order':
            # 订单列表
          
            pass
        elif url == '/wOrder':
            # 推广订单列表
          
            pass
        elif url == '/returnGoodsList':
            # 售后列表
          
            pass
        elif url == '/schedule':
            # 售后详情
          
            pass
        elif url == '/wCustomer':
            # 我的粉丝
          
            pass
        elif url == '/wQr':
            # 邀请好友
          
            pass
        elif url == '/shopCustomer':
            # 推荐奖励
          
            pass
        elif url == '/myActivity':
            # 我的拼团
          
            pass
        elif url == '/seckillList':
            # 限时秒杀
          
            pass

        elif url == '/trialApply':
            # 申请使用
          
            pass
        elif url == '/integral':
            # 积分
          
            pass
        elif url == '/interlist':
            # 积分列表
          
            pass
        elif url == '/page':
            # 微页面
          
            pass
        elif url == '/addressManagement':
            # 我的地址管理
          
            pass  
        elif url == '/address':
            # 地址
          
            pass  
        elif url == '/myEvaluate':
            # 我的评价
          
            pass  
        elif url == '/collectbrow':
            # 我的收藏 浏览记录
          
            pass  
        elif url == '/messageClass':
            # 消息中心
          
            pass  
        elif url == '/message':
            # 消息列表
          
            pass  
        elif url == '/messageDetail':
            # 消息详情
          
            pass  
        elif url == '/wClub':
            # 我的成长
          
            pass 

        indexController.initApi()
        indexController.uiCheckout()
        pass
    pass
