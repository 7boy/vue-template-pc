/**
 * Created by 7coder on 2017/9/25.
 */
import Vue from 'vue'
import conf from './config'
import enums from './enums'
import router from '../../router/router'
import {Loading} from 'element-ui'
import Axios from 'axios'
// 请求公共函数
function http (url, query) {
  return new Promise(function (resolve, reject) {
    var client = new XMLHttpRequest()
    client.open('POST', url)
    client.send(JSON.stringify(query))
    client.onreadystatechange = function () {
      if (client.readyState === 4 && client.status >= 200 && client.status < 400) {
        return resolve(JSON.parse(this.response))
      } else if (client.readyState === 4) {
        return reject(new Error(this.statusText))
      }
    }
  })
}
// 全局请求函数
Vue.prototype.ajax = function (url, query, el, textStatus) {
  let loading
  let text = '拼命加载中'
  if (textStatus === 'NO') {
    text = undefined
  }
  if (el) {
    loading = Loading.service({
      target: el,
      text: text
    })
  }
  return Axios.post(url, query)
    .then(resp => {
      if (el) {
        loading.close()
      }
      if (resp.rspCd === '30002') {
        this.$message({
          showClose: true,
          message: '登录信息失效，请重新登陆',
          type: 'error'
        })
        sessionStorage.clear()
        router.push({path: '/login'})
      } else if (resp.rspCd === '00000') {
        let json = resp.data || resp
        return json
      } else {
        this.$message({
          showClose: true,
          message: resp.rspInf,
          type: 'error'
        })
      }
    }).catch(e => {
      this.$message({
        showClose: true,
        message: '网络错误',
        type: 'error'
      })
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

// element notify 封装
Vue.prototype.notify = function (vm, str) {
  vm.$notify({
    title: '成功',
    message: str + '成功',
    type: 'success'
  })
}

// 配置文件
Vue.prototype.conf = conf

// 枚举文件
Vue.prototype.enums = enums
