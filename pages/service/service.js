//获取全局并将utils中需要的js引入本页面
var app = getApp()
var Bmob = require('../../utils/bmob.js')

var Click = Bmob.Object.extend("Click")
var query = new Bmob.Query(Click)

Page({
  //数据初始化
  data: {
    num: []
  },

  //下拉刷新三动作
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() 
    wx.hideNavigationBarLoading() 
    wx.stopPullDownRefresh() 
  },
  
  //点击"接入优化"触发的事件
  click1: function () {
    wx.navigateTo({                   //跳转页面
      url: '../wifi/wifi'
    })
    query.get("d7t0AAAL", {           //Bmob数据库Click表中click1数值加1
      success: res => {               
        var t = res.attributes.click1
        res.set('click1', t + 1)
        res.save()
      }
    })
  },

  //点击"宽带提速"触发的事件
  click2: function () {
    wx.showModal({
      content: '由于小程序外网跳转限制，链接已复制到您的剪切板内，请在浏览器中直接粘贴地址打开！',
      showCancel: false
    })
    wx.setClipboardData({
      data: 'http://ah.10086.cn/m/pages/pad/operate/revbroadband/revBroadbandIndex.html'
    })
    query.get("d7t0AAAL", {           //Bmob数据库Click表中click2数值加1
      success: res => {
        var t = res.attributes.click2
        res.set('click2', t + 1)
        res.save()
      }
    })
  },

  //点击"内容优化"触发的事件
  click3: function () {
    wx.navigateTo({                   //跳转页面
      url: '../content/content'
    })
    query.get("d7t0AAAL", {           //Bmob数据库Click表中click3数值加1
      success: res => {
        var t = res.attributes.click3
        res.set('click3', t + 1)
        res.save()
      }
    })
  },

  //点击"电话投诉"触发的事件
  click4: function () {               //手机拨号
    wx.makePhoneCall({
      phoneNumber: '15805621234'
    })
    query.get("d7t0AAAL", {           //Bmob数据库Click表中click4数值加1
      success: res => {
        var t = res.attributes.click4
        res.set('click4', t + 1)
        res.save()
      }
    })
  },
  
  //页面渲染生命周期函数
  onShow: function () {
    var Click = Bmob.Object.extend("Click")
    var query = new Bmob.Query(Click)
    var that = this
    query.get("d7t0AAAL", {           //将Bmob数据库Click表存储的点击数据在该周期更新
      success: res => {
        that.setData({
          num: res.attributes
        })
      }
    })
  },
  
  //设置该页面可以转发
  onShareAppMessage: function (res) {
  }
});