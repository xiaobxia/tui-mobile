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
      <mt-cell-swipe :to="'/page/myFund'" is-link>
        <div slot="title">
          <h3><i class="fas fa-question-circle"></i>常见问题</h3>
        </div>
      </mt-cell-swipe>
      <mt-cell-swipe :to="'/page/myFund'" is-link>
        <div slot="title">
          <h3><i class="fas fa-users"></i>关于我们</h3>
        </div>
      </mt-cell-swipe>
    </div>
    <template v-if="!ifUser">
      <div class="btn-wrap">
        <mt-button type="primary" @click="toLoginHandler" class="main-btn">去一键登录</mt-button>
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
      mobile: user.isLogin === true ? '1111' : '未登录'
    }
  },
  methods: {
    initPage () {
    },
    toLoginHandler () {
      this.$router.push('/page/login')
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
