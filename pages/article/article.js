//获取全局并将utils中需要的js引入本页面
var app = getApp()
var Bmob = require('../../utils/bmob.js')

Page({
  //数据初始化
  data: {
    getArea: null,
    getId: null,
    getDate: null,
    getList: [],
    Level: null,
    Count: null,
    Type: null,
    Cause: null
  },

  //下拉刷新三动作
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    wx.hideNavigationBarLoading() 
    wx.stopPullDownRefresh() 
  },

  //页面渲染生命周期函数
  onShow: function () {
    this.setData({                      //全局中的参数传递至本页面
      getArea: app.globalData.Area,
      getId: app.globalData.Id,
      getDate: app.globalData.Date,
      getList: app.globalData.List.attributes
    })
    var Alarm = Bmob.Object.extend("Alarm")
    var alarm = new Bmob.Query(Alarm)
    var that = this
    alarm.equalTo("id", app.globalData.Id)
    alarm.equalTo("date", app.globalData.Date)
    alarm.find({                        //查询该账号的告警信息并在该生命周期更新
      success: function (res) {
        if (res[0] == null) {
          that.setData({
            Level: '无',
            Type: '无',
            Cause: '无'
          })
        } else {
          that.setData({
            Level: res[0].attributes.level,
            Type: res[0].attributes.type,
            Cause: res[0].attributes.cause
          })
        }
      }
    })
    alarm.count({
      success: function (res) {
        that.setData({
          Count: res
        })
      }
    })
  }
});
