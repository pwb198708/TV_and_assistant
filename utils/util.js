function formatTime(date) {          //函数获取当前年月日，并以"年-月-日"格式显示
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('-') 
}

function formatTime2(date) {         //函数获取当前年月日及时分秒，并以"年-月-日 时:分:秒"格式显示
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {       //数字字符格式转化函数
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {               //formatTime和formatTime2函数封装进模块
  formatTime: formatTime,
  formatTime2: formatTime2
}
