// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'
import './assets/js/utils' //工具包
import noData from './components/NoData.vue'
import paging from './components/Paging.vue'
import './assets/css/element-variables.scss'
import {Pagination, Input, Select, Option, Message, Notification, MessageBox} from 'element-ui'
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Pagination)
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
Vue.prototype.$confirm = MessageBox.confirm
// 分页全局组件
Vue.component('paging', paging)
// 暂无数据组件
Vue.component('no-data', noData)

Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
export default app
