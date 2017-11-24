/**
 * Created by 7coder on 2017/11/24.
 */
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import Router from 'vue-router'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

Vue.use(Router){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

function view{{#unless_eq lintConfig "airbnb"}} {{/unless_eq}}(path) {
  return resolve => require([`./views/${path}.vue`], resolve){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
}

const router = new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: view('Home'){{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}, {
  path: '*',
    redirect: {
    name: 'Home'
  }
}]
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default router
