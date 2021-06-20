import Vue from 'vue'
import Router from 'vue-router'
import mineRouter from './modules/mine'
import villageRouter from './modules/village'
import indexRouter from './modules/index'
import approvalRouter from './modules/approval'

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
  // 钉钉的鉴权页
  {
    name: 'DingDingAuth',
    path: '/dingDingAuth',
    component: lazyLoading('DingDingAuth/index'),
    meta: {
      auth: false,
      noCache: true
    }
  },
  // 钉钉的鉴权错误
  {
    name: 'DingDingError',
    path: '/dingdingError',
    component: lazyLoading('ErrorPage/dingdingError'),
    meta: {
      auth: false,
      noCache: true
    }
  },
  {
    name: 'Login',
    path: '/login',
    component: lazyLoading('Login/index'),
    meta: {
      auth: false,
      noCache: true
    }
  },
  {
    name: 'PhoneCode',
    path: '/phoneCode',
    component: lazyLoading('Login/PhoneCode'),
    meta: {
      auth: false,
      noCache: true
    }
  },
  indexRouter,
  villageRouter,
  approvalRouter,
  mineRouter,
  // 首页中的凭证查看模块的页面
  {
    name: 'CertList',
    path: '/certList',
    component: lazyLoading('Cert/CertList/index'),
    meta: {
      auth: true
    }
  },
  // 科目余额表
  {
    name: 'AccountBalance',
    path: '/accountBalance',
    component: lazyLoading('Cert/AccountBalance/index'),
    meta: {
      auth: true
    }
  },
  // 首页中的收入\支出情况页面
  {
    name: 'IncomeExpendInfo',
    path: '/incomeExpendInfo',
    component: lazyLoading('Cert/IncomeExpendInfo/index'),
    meta: {
      auth: true
    }
  },
  // 首页中的货币资金收支明细表
  {
    name: 'ExpenditureDetails',
    path: '/expenditureDetails',
    component: lazyLoading('Cert/expenditureDetails/index'),
    meta: {
      auth: true
    }
  },
  // 首页中的货币资金收支明细表
  {
    name: 'IncomeExpendDetail',
    path: '/incomeExpendDetail',
    component: lazyLoading('Cert/incomeExpendDetail/index'),
    meta: {
      auth: true
    }
  },
  // 首页中的凭证详情
  {
    name: 'CertDetail',
    path: '/certDetail',
    component: lazyLoading('Cert/CertDetail/index'),
    meta: {
      auth: true
    }
  },
  {
    path: '',
    redirect: 'index/approval/pre'
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
