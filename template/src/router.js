/**
 * Created by 7coder on 2017/11/24.
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

function view (path) {
  return () => import(`./views/${path}.vue`)
}

const router = new Router({
  routes: [
    {path: '/', component: view('Login')},
    {path: '/index', component: view('Index'),
      children:[
        {path: '/', name: 'Home', component: view('Home')}
      ]
    },
    {path: '*', redirect: {path: '/index'}}]
})

export default router
