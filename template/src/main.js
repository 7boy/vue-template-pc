// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'
import {Pagination, Input, Select, Option, Message, Notification, MessageBox} from 'element-ui'
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Pagination)
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
Vue.prototype.$confirm = MessageBox.confirm

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
