// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import router from './router/index'
import App from './App'
import './style/main.scss'
import VCharts from 'v-charts'
import '../static/web-fonts-with-css/css/fontawesome-all.css'
import environmentUtil from './util/environmentUtil'
import Http from '@/util/httpUtil.js'
import store from './store'
import storageUtil from '@/util/storageUtil.js'

environmentUtil.setAdaptive()

Vue.use(MintUI)
Vue.use(VCharts)

Vue.config.productionTip = false

Vue.prototype.$http = Http

Vue.prototype.$addViewLog = function (path, query) {
  environmentUtil.createDeviceInfo()
  const deviceInfo = storageUtil.getDeviceInfo()
  const userInfo = storageUtil.getUserInfo()
  let app = 'false'
  if (query.app && query.app === 'true') {
    app = 'true'
  }
  Http.post('log/addViewLog', {
    ...deviceInfo,
    page: path,
    source_channel_id: query.cc || 'sys',
    mobile: userInfo.mobile,
    has_app: app
  })
}

const pathMap = {
  '/mine': '我的',
  '/home': '首页',
  '/loan': '贷款大全',
  '/page/tuiguang': '推广注册页',
  '/page/aboutUs': '关于我们',
  '/page/newProduct': '新品专区',
  '/page/quickProduct': '极速下款',
  '/page/hotProduct': '热门申请',
  '/page/bigProduct': '大额低息',
  '/page/downLoad': '下载页'
}

Vue.prototype.$addBaiDu = function (path, cc) {
  const pathName = pathMap[path]
  let channelName = '自然渠道'
  if (cc) {
    if (cc === localStorage.getItem(cc)) {
      channelName = localStorage.getItem(cc)
    } else {
      return Http.get('customer/getChannel', {
        channel_id: cc
      }).then((res) => {
        channelName = res.data.channel_name
        localStorage.setItem(cc, channelName)
        if (window._hmt) {
          window._hmt.push(['_trackPageview', `/${channelName}/${pathName}`])
          window._hmt.push(['_trackPageview', `/${channelName}/所有页面`])
          window._hmt.push(['_trackPageview', `/所有渠道/${pathName}`])
        }
      })
    }
  }
  if (window._hmt) {
    window._hmt.push(['_trackPageview', `/${channelName}/${pathName}`])
    window._hmt.push(['_trackPageview', `/${channelName}/所有页面`])
    window._hmt.push(['_trackPageview', `/所有渠道/${pathName}`])
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
