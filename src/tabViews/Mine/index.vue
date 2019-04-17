<template>
  <div class="tab-view tab-view-mine has-bar grey-body">
    <div class="info-wrap">
      <img class="b-g" src="../../assets/mine-bg.jpg" alt="">
      <div class="mask"></div>
      <div class="user-img-wrap">
        <i class="fas fa-user-circle"></i>
      </div>
      <h3 class="user-name">{{mobile}}</h3>
    </div>
    <div class="my-info-wrap simple">
      <mt-cell-swipe :to="'/page/aboutUs'" is-link>
        <div slot="title">
          <h3><i class="fas fa-users"></i>关于我们</h3>
        </div>
      </mt-cell-swipe>
      <mt-cell-swipe v-if="!app" :to="'/page/downLoad'" is-link>
        <div slot="title">
          <h3><i class="fas fa-arrow-alt-circle-down"></i>下载客户端</h3>
        </div>
      </mt-cell-swipe>
    </div>
    <template v-if="!ifUser">
      <div class="btn-wrap">
        <mt-button type="primary" @click="toLoginHandler" class="main-btn">去登录</mt-button>
      </div>
    </template>
    <template v-else>
      <div class="btn-wrap">
        <mt-button type="primary" @click="logoutHandler" class="main-btn">退出登录</mt-button>
      </div>
    </template>
  </div>
</template>

<script>
import storageUtil from '@/util/storageUtil.js'

export default {
  name: 'Mine',
  data () {
    const user = storageUtil.getUserInfo()
    return {
      ifUser: user.isLogin === true,
      user: user,
      mobile: user.isLogin === true ? user.mobile : '未登录',
      app: false
    }
  },
  created () {
    const query = this.$router.history.current.query
    if (query.app && query.app === 'true') {
      this.app = true
    }
    this.initPage()
  },
  methods: {
    initPage () {
      const query = this.$router.history.current.query
      const cc = query.cc
      this.$addBaiDu('/mine', cc)
      this.$addViewLog('/mine', query)
    },
    toLoginHandler () {
      this.$router.push({
        path: '/page/login',
        query: {
          ...this.$router.history.current.query
        }
      })
    },
    logoutHandler () {
      this.$http.get('auth/logout', {token: window._token, platform: 'mobile'}).then((data) => {
        if (data.success) {
          localStorage.removeItem('token')
          storageUtil.initUserInfo({
            isLogin: false
          })
          this.$store.dispatch('setTabSelect', 'index')
        } else {
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
