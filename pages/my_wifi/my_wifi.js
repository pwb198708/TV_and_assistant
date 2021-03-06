//获取全局并将utils中需要的js引入本页面
var app = getApp()
var util = require('../../utils/util.js')
var Bmob = require('../../utils/bmob.js')

var WiFi = Bmob.Object.extend("WiFi")
var wifi = new Bmob.Query(WiFi)

Page({
  //数据初始化
  data: {
    userInfo: [],
    arrays: []
  },

  //下拉刷新三动作
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },

  //页面渲染生命周期函数
  onShow: function () {
    var that = this
    wifi.equalTo("name", app.globalData.userInfo.nickName)
    wifi.equalTo("state", "false")
    wifi.find({                            //查询Bmob数据库WiFi表中符合微信名和状态的数据并在该周期更新
      success: function (res) {
        that.setData({
          arrays: res
        })
      }
    })
  },

  //点击"催促处理"的事件函数
  quick: function () {
    wx.showToast({
      title: '已催单',
      icon: 'success',
      duration: 1500
    })
  },

  //点击"确定完成"的事件函数
  formSubmit: function (e) {
    var order = e.detail.value.objectId
    var that = this
    wx.showModal({
      content: '确定已完成对您电视有线接入改造？',
      showCancel: true,
      success: function (res) {      
        if (res.confirm) {
          wifi.get(order, {                      //更新Bmob数据库WiFi表中该条数据状态
            success: res => {
              res.set('state', 'true')
              res.save()
            }
          })
          wifi.equalTo("name", app.globalData.userInfo.nickName)
          wifi.equalTo("state", "false")
          wifi.find({
            success: function (res) {
              that.setData({
                arrays: res
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})  