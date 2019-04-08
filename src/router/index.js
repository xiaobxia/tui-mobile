/**
 * Created by xiaobxia on 2018/4/9.
 */
import Vue from 'vue'
import Router from 'vue-router'
const lazyLoading = (path, index = true) => () => System.import(`@/routers/${path}${index ? '/index' : ''}.vue`)

Vue.use(Router)

const routers = [
  {
    name: 'Index',
    path: '/',
    component: null
  },
  {
    name: 'HelloWorld',
    path: '/page/helloWorld',
    component: lazyLoading('HelloWorld'),
    meta: {
      auth: false
    }
  },
  {
    name: 'TuiGuang',
    path: '/page/tuiGuang',
    component: lazyLoading('TuiGuang'),
    meta: {
      auth: false
    }
  },
  {
    name: 'AboutUs',
    path: '/page/aboutUs',
    component: lazyLoading('AboutUs'),
    meta: {
      auth: false
    }
  },
  {
    name: 'Login',
    path: '/page/login',
    component: lazyLoading('Login')
  },
  {
    name: 'NoPermission',
    path: '/noPermission',
    component: lazyLoading('NoPermission')
  },
  {
    name: '404',
    path: '*',
    component: lazyLoading('NotMatch')
  }
]

console.log(`路由数量：${routers.length}`)

export default new Router({
  // hash, history
  mode: 'hash',
  linkActiveClass: 'is-active',
  // 这个功能只在 HTML5 history 模式下可用
  scrollBehavior: () => ({y: 0}),
  routes: routers
})
