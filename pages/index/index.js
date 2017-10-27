//获取全局并将utils中需要的js引入本页面
var app = getApp()
var util = require('../../utils/util.js')
var Bmob = require('../../utils/bmob.js')

Page({
  //数据初始化
  data: {
    countries: ["合肥", "铜陵", "蚌埠", "阜阳", "滁州", "池州", "黄山", "淮南", "淮北", "宣城", "宿州", "亳州", "芜湖", "马鞍山", "六安", "安庆"],
    countryIndex: 1,
    date: null,
    isAgree: true
  },

  //下拉刷新三动作
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  //页面加载生命周期函数
  onLoad: function () {
    var time = util.formatTime(new Date()); 
    this.setData({
      time: time,
      date: time
    });
  },

  //点击"查询"的事件函数
  formSubmit: function (e) {
    var Test = Bmob.Object.extend("Test")
    var query = new Bmob.Query(Test)
    query.equalTo("User_id", e.detail.value.id)
    query.find({                              //查询输入的账号在数据库中的记录
      success: function (result) {
        if (e.detail.value.agree.length == 0) {
          wx.showModal({
            content: '请阅读并同意相关条款后再查询!',
            showCancel: false
          });
        } else if (result[0] == null) {
          wx.showToast({
            title: '未查询到数据',
            icon: 'loading',
            duration: 1500
          })
        } else {                              //查询到的信息传递到全局参数中
          app.globalData.Area = e.detail.value.area
          app.globalData.Id = e.detail.value.id
          app.globalData.Date = e.detail.value.date
          app.globalData.List = result[0]
          wx.navigateTo({                     //跳转页面
            url: '../article/article'
          })
        }
      }
    })
  },

  //点击"使用协议"的事件函数
  openAlert: function () {
    wx.showModal({
      content: '目前可查询铜陵移动互联网电视用户最近一周的网络和机顶盒情况，请勿非法使用！',
      showCancel: false
    });
  },

  //选择的日期发生变化的事件函数
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  //选择的地区发生变化的事件函数
  bindCountryChange: function (e) {
    this.setData({
      countryIndex: e.detail.value
    })
  },

  //是否同意的事件函数
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },

  //设置页面可以转发
  onShareAppMessage: function (res) {  
  }
});
