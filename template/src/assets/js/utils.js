import Vue from 'vue'
import conf from './config'
import enums from './enums'
import router from '../../router'
import {Loading} from 'element-ui'
import Axios from 'axios'
import app from '../../main'
var Promise = require('bluebird');
// 全局请求函数
Vue.prototype.$ajax = function (obj) {
  let loading
  if (obj.el) {
    loading = Loading.service({
      target: obj.el,
      // 如果 noText = true 则不展示加载文案
      text: obj.noText ? null : '拼命加载中'
    })
  }

  return Axios.post(app.$conf.API_PATH + obj.url , obj.query || {}).then(resp => {
      if (obj.el) {
        loading.close()
      }
      if (resp.data.rspCd === '30002') {
        app.$message({
          showClose: true,
          message: '登录信息失效，请重新登陆',
          type: 'error'
        })
        localStorage.clear()
        router.push({path: '/'})
        return new Promise(function () {})
      } else if (resp.data.rspCd === '00000') {
        let data = resp.data.data || resp.data
        return data
      } else {
        app.$message({
          showClose: true,
          message: resp.data.rspInf,
          type: 'error'
        })
        return new Promise(function () {})
      }
    })
    .catch(e => {
      if (obj.el) {
        loading.close()
      }
      app.$message({
        showClose: true,
        message: '网络错误',
        type: 'error'
      })
      return new Promise(function () {})
    })
}

// 日期转换函数
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2017-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2017-7-2 8:9:4.18
window.Date.prototype.$Format = function (fmt) {
  let o = {
    'M+': this.getMonth() + 1,                    // 月份
    'd+': this.getDate(),                         // 日
    'h+': this.getHours(),                        // 小时
    'm+': this.getMinutes(),                      // 分
    's+': this.getSeconds(),                      // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3),  // 季度
    'S': this.getMilliseconds()                   // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
    }
  }
  return fmt
}
// 表格查询通用函数
Vue.prototype.$search = function(table,val,callback){

  if(val !== undefined || table.query.pageNo === undefined){
    table.query.pageNo = val || 1
  }
  table.query.pageSize = app.$conf.PAGES
  this.$ajax(table)
    .then(json => {
      table.list = json.list
      table.noData = table.total = json.total
      if(callback){
        callback()
      }
    })
}

// 成功类型的通用提示
Vue.prototype.$remind = function (str) {
  app.$notify({
    title: '成功',
    message: str,
    type: 'success'
  })
}

// 配置文件
Vue.prototype.$conf = conf

// 枚举文件
Vue.prototype.$enums = enums

// cookie操作
Window.prototype.$Cookie = {
  //设置cookie
  setCookie(name, value, hours, path){
    var name = escape(name); //进行编码
    var value = escape(value);//进行编码
    var expires = new Date();
    expires.setTime(expires.getTime() + hours * 3600000);
    path = path == "" ? "" : ";path=" + path;
    var _expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();
    document.cookie = name + "=" + value + _expires + path;
  },
  //获取cookie
  getCookieValue(name){
    var name = escape(name); //进行编码
    //读cookie属性，这将返回文档的所有cookie
    var allcookies = document.cookie;
    //查找名为name的cookie的开始位置
    name += "=";
    var pos = allcookies.indexOf(name);
    //如果找到了具有该名字的cookie，那么提取并使用它的值
    if (pos != -1) {                       //如果pos值为-1则说明搜索"version="失败
      var start = pos + name.length;         //cookie值开始的位置
      var end = allcookies.indexOf(";", start);    //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置
      if (end == -1) end = allcookies.length;    //如果end值为-1说明cookie列表里只有一个cookie
      var value = allcookies.substring(start, end); //提取cookie的值
      value = unescape(value);  //对它解码
      return (value);
    }
    else return "";                //搜索失败，返回空字符串
  },
  //删除cookie
  deleteCookie(name, path){
    var name = escape(name);
    var expires = new Date(0);
    path = path == "" ? "" : ";path=" + path;
    document.cookie = name + "=" + ";expires=" + expires.toUTCString() + path;
  },
  // 清空cookie
  delectAllCookie(){
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--;)
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
  }
}
