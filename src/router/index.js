import Vue from 'vue'
import Router from 'vue-router'
import indexRouter from './modules/index'

const lazyLoading = (path) => () => import(`@/routers/${path}.vue`)

Vue.use(Router)

// 都有的路由
export const constantRouterMap = [
  {
    name: 'NoPermission',
    path: '/401',
    component: lazyLoading('NoPermission/index'),
    meta: {
      auth: false,
      noCache: true
    }
  },
  {
    name: 'Register',
    path: '/reg',
    component: lazyLoading('Register/index'),
    meta: {
      auth: false,
      noCache: true
    }
  },
  indexRouter,
  {
    path: '',
    redirect: 'reg'
  },
  {
    name: '404',
    path: '*',
    component: lazyLoading('NotMatch/index'),
    meta: {
      auth: false
    }
  }
]

export const asyncRouterMap = [
]

export default new Router({
  // hash, history
  // mode: 'hash',
  // linkActiveClass: 'is-active',
  // 这个功能只在 HTML5 history 模式下可用
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
