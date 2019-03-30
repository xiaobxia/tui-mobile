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
export default {
  name: 'TuiGuang',
  data () {
    return {
      mobile: '',
      verification_code: '',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
