{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import App from './App'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import router from './router'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import filter from './util/filters'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import 'normalize.css'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

// 全局引入Mint-Ui
import {Toast, Actionsheet, Indicator} from 'mint-ui'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import 'mint-ui/lib/style.min.css'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
Vue.prototype.Toast = Toast{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
Vue.prototype.Indicator = Indicator{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
Vue.use(Actionsheet){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

//  全局定义eventBus
const EventBus = new Vue(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
Object.defineProperties(Vue.prototype, {
  $eventBus: {
    get: () => {
    return EventBus
  }
}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

// 全局注册过滤器
Object.keys(filter).forEach(filterName => {
  Vue.filter(`${filterName}`, filter[filterName])
})

Vue.config.productionTip = false{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
{{#if_eq build "runtime"}}
render: h => h(App){{#if_eq lintConfig "airbnb"}},{{/if_eq}}
{{/if_eq}}
{{#if_eq build "standalone"}}
template: '<App/>',
  components: { App }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
