//获取全局并将utils中需要的js引入本页面
var app = getApp()
var util = require('../../utils/util.js')
var Bmob = require('../../utils/bmob.js')

Page({
  //数据初始化
  data: {
    countryCodes: ["合肥", "铜陵", "蚌埠", "阜阳", "滁州", "池州", "黄山", "淮南", "淮北", "宣城", "宿州", "亳州", "芜湖", "马鞍山", "六安", "安庆"],
    countryCodeIndex: 1,
  },

  //下拉刷新三动作
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() 
    wx.hideNavigationBarLoading() 
    wx.stopPullDownRefresh() 
  },

  //页面加载生命周期函数
  onLoad: function () {  
    var time = util.formatTime2(new Date());
    this.setData({
      time: time
    });
  },

  //点击"提交"的事件函数
  formSubmit: function (e) {
    var Content = Bmob.Object.extend("Content")
    var content = new Content()
    var time = util.formatTime2(new Date());

    if (e.detail.value.ds != 1) {                // 选择的地址非铜陵时弹出弹框
      wx.showToast({
        title: '现仅支持铜陵',
        icon: 'loading',
        duration: 1500
      })
    } else if (e.detail.value.zh == "" || e.detail.value.dz == "" || e.detail.value.zy == "") {
      wx.showModal({                             //必填项为空时弹出弹框
        content: '必填项不能为空，请填写完整!',
        showCancel: false
      });
    } else {
      content.save({                             //表单数据新增到Bmob自定义的Content数据库中
        sj: time,
        name: app.globalData.userInfo.nickName,
        zh: e.detail.value.zh,
        dz: e.detail.value.dz,
        zylx: e.detail.value.zylx,
        gzlx: e.detail.value.gzlx,
        zy: e.detail.value.zy,
        state: "false"
      }, {
          success: function (result) {           //提交成功弹出提示，提示显示1.5秒
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 1500,
            })
            setTimeout(function () {             //2秒后自动返回上一级页面
              wx.navigateBack({})
            }, 2000
            )
          },
          error: function (result, error) {      //提交出错时弹出弹框
            wx.showToast({
              title: '提交失败',
              icon: 'loading',
              duration: 2000
            })
          }
        });
    }
  },

  //点击"返回"时事件函数
  comeBack: function () {
    wx.navigateBack({})
  },

  //页面显示的地市信息更新为初始化时的值
  bindCountryCodeChange: function (e) {
    this.setData({
      countryCodeIndex: e.detail.value
    })
  }
})