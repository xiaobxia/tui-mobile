// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/index'
import App from './App'
import './style/main.scss'
import Vant from 'vant'
import vueEsign from 'vue-esign'
import moment from 'moment'
import '../static/web-fonts-with-css/css/fontawesome-all.css'
import environmentUtil from './util/environmentUtil'
import Http from '@/util/httpUtil.js'
import store from './store'
import './permission'
import numberUtil from '@/util/numberUtil.js'
import stringUtil from '@/util/stringUtil.js'
import fileUtil from '@/util/fileUtil.js'
import typeValue from '@/common/typeValue.js'
import Base64 from '@/lib/base64'
Vue.use(Vant)

Vue.use(vueEsign)
Vue.config.productionTip = false

Vue.prototype.$http = Http

Vue.prototype.$getMenuAuth = function(key) {
  const menuListFlat = store.getters.menuListFlat
  for (let i = 0; i < menuListFlat.length; i++) {
    if (menuListFlat[i].auth === key) {
      return menuListFlat[i].phid
    }
  }
  return ''
}

Vue.prototype.$getMenuName = function(id) {
  const menuListFlat = store.getters.menuListFlat
  for (let i = 0; i < menuListFlat.length; i++) {
    if (menuListFlat[i].phid === id) {
      return menuListFlat[i].menuName
    }
  }
  return ''
}

Vue.prototype.$formatToDay = function(day) {
  if (!day) {
    return ''
  }
  return moment(day).format('YYYY-MM-DD')
}

Vue.prototype.$deepClone = function(data) {
  return JSON.parse(JSON.stringify(data))
}
// base64解码
Vue.prototype.$decodeURL = function(str) {
  const base64 = new Base64()
  return base64.decode(str)
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
registerUtil(stringUtil)
registerUtil(typeValue)
registerUtil(fileUtil)

environmentUtil.setAdaptive()

window.ENV_CONFIG = process.env.ENV_CONFIG
console.log(window.ENV_CONFIG)

// 钉钉环境埋点
if (process.env.ENV_CONFIG === 'dingding') {
  /* eslint-disable */
  // try {
  //   const config = {
  //     bid: 'zjnjapp_zzdpro',
  //     signkey: '1234567890abcdef',
  //     gateway: 'https://wpk-gate.zjzwfw.gov.cn'
  //   }
  //   const wpk = new window.wpkReporter(config)
  //   wpk.installAll()
  //   window._wpk = wpk
  // } catch (err) {
  //   console.error('WpkReporter init fail', err)
  // }
  //
  // (function(w, d, s, q, i) {
  //   w[q] = w[q] || []
  //   var f = d.getElementsByTagName(s)[0], j = d.createElement(s)
  //   j.async = true
  //   j.id = 'beacon-aplus'
  //   j.src = 'https://alidt.alicdn.com/alilog/mlog/aplus_cloud.js'
  //   f.parentNode.insertBefore(j, f)
  // })(window, document, 'script', 'aplus_queue')
  //
  // window.aplus_queue.push({
  //   action: 'aplus.setMetaInfo',
  //   arguments: ['aplus-rhost-v', 'alog.zjzwfw.gov.cn']
  // })
  // window.aplus_queue.push({
  //   action: 'aplus.setMetaInfo',
  //   arguments: ['aplus-rhost-g', 'alog.zjzwfw.gov.cn']
  // })
  //
  // var u = navigator.userAgent
  // var isAndroid = u.indexOf('Android') > -1
  // var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  //
  // window.aplus_queue.push({
  //   action: 'aplus.setMetaInfo',
  //   arguments: ['appId', isAndroid ? '28302650' : isIOS ? '28328447' : '47130293']
  // })
  /* eslint-disable */
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
