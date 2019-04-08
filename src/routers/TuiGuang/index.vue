<template>
  <div class="page-tui-guang">
    <img src="../../assets/bg.png" class="bg" alt="">
    <div class="main-body">
      <div class="register-wrap">
        <mt-field placeholder="请输入您的手机号"  v-model="mobile"></mt-field>
        <mt-field placeholder="请输入您的验证码" class="code-wrap"  v-model="verification_code">
          <mt-button>发送验证码</mt-button>
        </mt-field>
        <mt-button class="register-btn">立即注册</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import environmentUtil from '@/util/environmentUtil.js'
import storageUtil from '@/util/storageUtil.js'

export default {
  name: 'TuiGuang',
  data () {
    return {
      mobile: '',
      verification_code: ''
    }
  },
  created () {
    environmentUtil.createDeviceInfo()
    this.initPage()
  },
  methods: {
    initPage () {
      const query = this.$router.history.current.query
      const deviceInfo = storageUtil.getDeviceInfo()
      const userInfo = storageUtil.getUserInfo()
      // 添加浏览记录
      this.$http.post('log/addViewLog', {
        ...deviceInfo,
        page: 'register',
        source_channel_id: query.cc || 'sys',
        mobile: userInfo.mobile
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
