//获取全局并将utils中需要的js引入本页面
var app = getApp()
var util = require('../../utils/util.js')
var Bmob = require('../../utils/bmob.js')

Page({
  //页面渲染时生命周期函数
  onShow: function () {
    var time = util.formatTime2(new Date());
    var Suggestion = Bmob.Object.extend("Suggestion");
    var query = new Bmob.Query(Suggestion);
    var that = this
    query.count({                              //提取Bmob数据库Suggestion表中数据和当前日期时间在该周期更新
      success: function (count) {
        that.setData({
          time: time,
          count: count
        })
      }
    })
  },

  //下拉刷新三动作
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },

  //点击"返回"时事件函数
  comeBack: function () {
    wx.navigateBack({})
  },

  //点击"提交"的事件函数
  formSubmit: function (e) {                  
    var Suggestion = Bmob.Object.extend("Suggestion")
    var suggestion = new Suggestion()
    var time = util.formatTime2(new Date());
    if (e.detail.value.jy == "") {
      wx.showModal({
        content: '建议栏不能为空，请填写您的意见！',
        showCancel: false
      });
    } else {
      suggestion.save({                       //将填写的建议和当前时间及微信名新增到Bmob数据库Suggestion表中
        time: time,
        suggestion: e.detail.value.jy,
        name: app.globalData.userInfo.nickName
      }, {
          success: function (result) {        //提交成功弹出提示，提示显示1.5秒
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 1500,
            })
            setTimeout(function () {          //2秒后自动返回上一级页面
              wx.navigateBack({})
            }, 2000
            )
          },
          error: function (result, error) {   //提交出错时弹出弹框
            wx.showToast({
              title: '提交失败',
              icon: 'loading',
              duration: 2000
            })
          }
        });
    }
  }
})