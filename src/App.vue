<template>
  <div id="app">
    <div class="loading-wrap" v-if="!ifChecked">
      <i class="fas fa-spinner fa-spin"></i>
      <p>加载中...</p>
    </div>
    <template v-else>
      <router-view v-if="subPath"/>
      <template v-else>
        <index v-if="tabSelect === 'index'"/>
        <loan v-if="tabSelect === 'loan'"/>
        <mine v-if="tabSelect === 'mine'"></mine>
        <mt-tabbar v-model="tabSelect" :fixed="true">
          <mt-tab-item id="index">
            <!--<img src="./assets/logo.png" alt="" slot="icon">-->
            <i class="fas fa-home" slot="icon"></i>
            <span>首页</span>
          </mt-tab-item>
          <mt-tab-item id="loan">
            <i class="far fa-credit-card" slot="icon"></i>
            <span>贷款大全</span>
          </mt-tab-item>
          <!--<mt-tab-item id="suitable">-->
            <!--<i class="fas fa-universal-access" slot="icon"></i>-->
            <!--<span>量身定制</span>-->
          <!--</mt-tab-item>-->
          <mt-tab-item id="mine">
            <i class="fas fa-user" slot="icon"></i>
            <span>我的</span>
          </mt-tab-item>
        </mt-tabbar>
      </template>
    </template>
  </div>
</template>

<script>
import environmentUtil from '@/util/environmentUtil.js'
import storageUtil from '@/util/storageUtil.js'
import Mine from '@/tabViews/Mine/index.vue'
import Index from '@/tabViews/Index/index.vue'
import Loan from '@/tabViews/Loan/index.vue'

export default {
  name: 'App',
  data () {
    return {
      subPath: false,
      ifChecked: false,
      tabSelect: 'index'
    }
  },
  watch: {
  },
  computed: {
  },
  components: {Index, Mine, Loan},
  created () {
    this.checkSubPath(this.$router.history.current.path)
    environmentUtil.createDeviceInfo()
  },
  mounted () {
    this.initPage()
    setInterval(() => {
      storageUtil.clearQueryCache()
    }, 1000 * 60 * 5)
  },
  methods: {
    initPage () {
      this.checkLogin()
      // 刷新的时候before和after都不会执行
      this.$router.beforeEach((transition, from, next) => {
        console.log('before')
        console.log(transition)
        if (this.checkAuthPath(transition)) {
          const user = storageUtil.getUserInfo()
          this.checkUser(user, transition)
        }
        this.checkSubPath(transition.path)
        next()
      })
      // after只有真正进入了页面才会执行
      this.$router.afterEach((transition) => {
        console.log('after')
        console.log(transition)
        // 百度统计
        if (window._hmt && transition.path && transition.path !== '/' && transition.path !== '/page/tuiguang') {
          this.$addBaiDu(transition.path, transition.query.cc)
        }
        // 验证路由过去是否需要登录状态
        if (this.checkAuthPath(transition)) {
          const user = storageUtil.getUserInfo()
          this.checkUser(user, transition)
        }
        this.checkSubPath(transition.path)
      })
    },
    checkLogin () {
      const token = localStorage.getItem('token') || ''
      this.$http.get('auth/checkLogin', {token}).then((data) => {
        window._token = data.data.token
        if (data.data.isLogin === false) {
          storageUtil.initUserInfo({
            isLogin: false
          })
          const user = storageUtil.getUserInfo()
          if (user.isLogin !== true && this.checkAuthPath()) {
            this.$router.push({
              path: '/page/login',
              query: {
                ...this.$router.history.current.query
              }
            })
          }
        } else {
          storageUtil.initUserInfo({
            ...data.data,
            isLogin: true
          })
          this.checkTuiGuang()
        }
        console.log('query login done')
        this.ifChecked = true
      })
    },
    checkTuiGuang () {
      const user = storageUtil.getUserInfo()
      if (user.isLogin === true) {
        console.log('in checkTuiGuang')
        // 慢一点
        setTimeout(() => {
          const current = this.$router.history.current
          console.log(current)
          if (current.path === '/page/tuiguang') {
            this.$router.push({
              path: '/',
              query: {
                ...this.$router.history.current.query
              }
            })
          }
        }, 300)
      }
    },
    checkSubPath (path) {
      console.log('in check subPath')
      this.subPath = path !== '/'
      // this.subPath = path.startsWith('/page')
    },
    checkAuthPath (current) {
      const now = current || this.$router.history.current
      // 需要鉴权的才转登录
      return now.meta && now.meta.auth === true
    },
    checkPermissionPath (current) {
      const now = current || this.$router.history.current
      // 需要鉴权的才转登录
      return now.meta && now.meta.roles
    },
    checkIn (userRoles, roleList) {
      for (let i = 0; i < userRoles.length; i++) {
        const userRole = userRoles[i]
        for (let j = 0; j < userRoles.length; j++) {
          const roleItem = roleList[j]
          if (roleItem === userRole) {
            return true
          }
        }
      }
    },
    checkPermission (userRoles, roleMap) {
      // roles :{include, exclude}
      if (roleMap) {
        let permission = true
        const include = roleMap.include
        const exclude = roleMap.exclude
        // 存在于include
        if (include) {
          permission = this.checkIn(userRoles, include)
        }
        // 存在于exclude
        if (exclude && this.checkIn(userRoles, exclude)) {
          permission = false
        }
        // exclude有决定权
        return permission
      } else {
        // 没有权限要求
        return true
      }
    },
    checkUser (user, transition) {
      if (user.isLogin !== true) {
        this.$router.push({
          path: '/page/login',
          query: {
            ...this.$router.history.current.query
          }
        })
      } else {
        const roles = this.checkPermissionPath(transition)
        if (roles) {
          if (!this.checkPermission(user.roles, roles)) {
            // 替换为404
            this.$router.replace('/noPermission')
          }
        }
      }
    }
  }
}
</script>

<style>

</style>
