import Vue from 'vue'
import router from './router/index'
import App from './App'
import './style/main.scss'
import {
  Col,
  Row,
  Button,
} from 'vant'
import moment from 'moment'
import environmentUtil from './util/environmentUtil'
import Http from '@/util/httpUtil.js'
import store from './store'
import './permission'
import numberUtil from '@/util/numberUtil.js'

Vue.use(Col)
Vue.use(Row)
Vue.use(Button)

Vue.config.productionTip = false

Vue.prototype.$http = Http

Vue.prototype.$formatToDay = function(day) {
  if (!day) {
    return ''
  }
  return moment(day).format('YYYY-MM-DD')
}

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

environmentUtil.setAdaptive()

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
