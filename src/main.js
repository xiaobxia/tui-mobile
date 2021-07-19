import Vue from 'vue'
import router from './router/index'
import App from './App'
import './style/main.scss'
import {
  Col,
  Row,
  Button,
  Tag,
  Divider,
  Tabbar,
  TabbarItem,
  NavBar,
  Swipe,
  SwipeItem,
  NoticeBar
} from 'vant'
import environmentUtil from './util/environmentUtil'
import psidUtil from './util/psidUtil'
import Http from '@/util/httpUtil.js'
import store from './store'
import './permission'
import numberUtil from '@/util/numberUtil.js'

Vue.use(Col)
Vue.use(Row)
Vue.use(Button)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(NavBar)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NoticeBar)

Vue.config.productionTip = false

Vue.prototype.$http = Http

Vue.prototype.$deepClone = function(data) {
  return JSON.parse(JSON.stringify(data))
}

function registerUtil(util) {
  for (const key in util) {
    if (util.hasOwnProperty(key)) {
      Vue.prototype['$' + key] = util[key]
    }
  }
}

// 数字工具
registerUtil(numberUtil)
// 环境工具
registerUtil(environmentUtil)

environmentUtil.setAdaptive()
// 设置id
psidUtil.setId()

console.log(environmentUtil.getOsInfo())

window.ENV_CONFIG = process.env.ENV_CONFIG
console.log(window.ENV_CONFIG)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
