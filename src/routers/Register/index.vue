<template>
  <div class="page-login">
    <div class="l-f type-p">
      <div>
        <input v-model="account" type="text" placeholder="请输入手机号">
      </div>
    </div>
    <van-button type="primary" block class="l-b" @click="getPhoneCode">获取验证码</van-button>
    <div class="l-o" @click="changeType('account')">密码登录</div>
  </div>
</template>

<script>
import psidUtil from '@/util/psidUtil'
// import { Toast } from 'vant'
export default {
  name: 'Register',
  data() {
    return {
      account: '',
      password: '',
      checked: false,
      loginLoading: false
    }
  },
  computed: {},
  created() {
    this.initPage()
  },
  methods: {
    initPage() {
      this.$http.get('tuiServer/h5/channelClick', {
        psid: psidUtil.getId(),
        channel_code: '',
        ...this.$getOsInfo()
      })
    },
    setPageConfig() {
    },
    loginHandler() {
      this.loginLoading = true
    },
    toHome() {
      this.$router.push('/index')
    },
    getPhoneCode() {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
  @import '~@/style/_var.scss';
  .page-login {
    position: relative;
    min-height: 100vh;
    padding: 24px;
    padding-bottom: 140px;
  }
  .a-l-t {
    margin-top: 35px;
    text-align: center;
    img {
      width: 50px;
      height: auto;
    }
    .tt {
      margin-top: 20px;
      color: #000;
      font-size: 24px;
    }
  }
  .t-b {
    min-height: 40px;
  }
  .l-b {
    margin-top: 40px;
    border-radius: 36px;
    /deep/ {
      .van-loading__spinner {
        width: 28px!important;
        height: 28px!important;
      }
    }
  }
  .l-f {
    margin-top: 30px;
    &.type-p {
      margin-top: 90px;
    }
    input {
      display: block;
      width: 100%;
      height: 60px;
      line-height: 59px;
      border: none;
      font-size:16px;
      border-bottom: 1px solid #E9E9E9;
      &::-webkit-input-placeholder{
        color:#ccc;
      }
      &::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:#ccc;
      }
      &:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color:#ccc;
      }
      &:-ms-input-placeholder{  /* Internet Explorer 10-11 */
        color:#ccc;
      }
    }
  }
  .l-s-f {
    position: absolute;
    left: 0;
    bottom: 50px;
    width: 100%;
    text-align: center;
    img {
      height: 50px;
      width: auto;
    }
    span {
      font-size: 14px;
      margin-top: 10px;
    }
  }
  .l-o {
    margin-top: 20px;
    font-size: 16px;
  }
</style>
