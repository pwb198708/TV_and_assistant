//引入并注册自己的Bmob SDK
var Bmob = require('utils/bmob.js')
Bmob.initialize("280976924147689c99c29b91aa511d47", "我的Bmob秘钥（保密）")
App({
  onLaunch: function () {

    //授权获取用户微信信
    wx.getUserInfo({   
      success: res => {
        this.globalData.userInfo = res.userInfo
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  },
  
  //设置全局参数
  globalData: {
    Area: '1',
    Id: '00000000000',
    Date: '2017-08-08',
    List: [],
    userInfo: []
  }
});
