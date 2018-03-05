/**
 * Created by 7coder on 2017/9/25.
 */
import Vue from 'vue'
import conf from './config'
import enums from './enums'
import router from '../../router'
import {Loading} from 'element-ui'
import Axios from 'axios'
import app from '../../main'
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
  return Axios.post(obj.url + obj.query)
    .then(resp => {
      if (obj.el) {
        loading.close()
      }
      if (resp.rspCd === '30002') {
        app.$message({
          showClose: true,
          message: '登录信息失效，请重新登陆',
          type: 'error'
        })
        sessionStorage.clear()
        router.push({path: '/login'})
        return new Promise(function () {})
      } else if (resp.rspCd === '00000') {
        let data = resp.data || resp
        return data
      } else {
        app.$message({
          showClose: true,
          message: resp.rspInf,
          type: 'error'
        })
        return new Promise(function () {})
      }
    })
    .catch(e => {
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
window.Date.prototype.Format = function (fmt) {
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
Vue.prototype.$search = function(table,val){
  if(val !== undefined || table.query.pageNo === undefined){
    table.query.pageNo = val || 0
  }
  table.query.pageNum = app.$conf.PAGES
  this.$ajax(table)
    .then(json => {
      table.list = json.list
      table.noData = table.total = json.total
    })
}

// 成功类型的通用提示
Vue.prototype.$prompt = function (str) {
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
