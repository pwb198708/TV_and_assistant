//获取全局并将utils中需要的js引入本页面
var app = getApp()
var util = require('../../utils/util.js')
var Bmob = require('../../utils/bmob.js')

Page({
  //数据初始化
  data: {
    userInfo: [],
    count1: 0,
    count2: 0
  },

  //下拉刷新三动作
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    wx.hideNavigationBarLoading() 
    wx.stopPullDownRefresh() 
  },

  //页面加载生命周期函数
  onLoad: function () {
    var Login = Bmob.Object.extend("Login")
    var login = new Login()
    this.setData({                        //该生命周期中更新微信用户信息
      userInfo: app.globalData.userInfo
    })
    login.save({
      name: app.globalData.userInfo.nickName
    }, {
        success: function (result) {
        },
        error: function (result, error) {
        }
      })
  },

  //页面渲染生命周期函数
  onShow: function () {
    var WiFi = Bmob.Object.extend("WiFi")
    var wifi = new Bmob.Query(WiFi)
    var Content = Bmob.Object.extend("Content")
    var content = new Bmob.Query(Content)
    var that = this
    wifi.equalTo("name", app.globalData.userInfo.nickName)
    wifi.equalTo("state", "false")
    wifi.count({                      //查询该微信用户的接入优化工单数，更新为count1
      success: function (count) {
        that.setData({
          count1: count
        })
      },
    })
    content.equalTo("name", app.globalData.userInfo.nickName)
    content.equalTo("state", "false")
    content.count({
      success: function (count) {     //查询该微信用户的内容优化工单数，更新为count2
        that.setData({
          count2: count
        })
      },
    })

  },

  //点击"接入优化"事件函数
  WiFi: function () {
    if (this.data.count1 == 0) {
      wx.showModal({
        content: '没有您的预约，请在服务中预约后查看！',
        showCancel: false
      })
    } else {
      wx.navigateTo({
        url: '../my_wifi/my_wifi'
      })
    }
  },

  //点击"内容优化"事件函数
  Content: function () {
    if (this.data.count2 == 0) {
      wx.showModal({
        content: '没有您的预约，请在服务中预约后查看！',
        showCancel: false
      })
    } else {
      wx.navigateTo({
        url: '../my_content/my_content'
      })
    }
  }
});