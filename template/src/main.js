// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import noData from './components/NoData.vue'
import paging from './components/Paging.vue'
import breadNav from './components/BreadNav.vue'
import 'normalize.css'
import './assets/js/utils' //工具包
import './assets/css/element-variables.scss'
import Navigation from 'vue-navigation'
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
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
// 展开折叠组件
Vue.component(CollapseTransition.name, CollapseTransition)
// 面包屑导航
Vue.component('breadNav', breadNav)
// 保存返回状态插件
Vue.use(Navigation,{router})

Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
export default app
