<template>
  <div class="page-login">
    <div class="l-f type-p">
      <div>
        <input v-model="phone" type="text" placeholder="请输入手机号">
      </div>
    </div>
    <van-button :loading="loginLoading" type="primary" block class="l-b" @click="loginHandler">登录</van-button>
  </div>
</template>

<script>
import psidUtil from '@/util/psidUtil'
import { Toast } from 'vant'
export default {
  name: 'Register',
  data() {
    return {
      phone: '',
      password: '',
      checked: false,
      loginLoading: false,
      channelCode: ''
    }
  },
  computed: {},
  created() {
    const query = this.$route.query
    this.channelCode = query.code || 'neizhi'
    this.initPage()
  },
  methods: {
    initPage() {
      this.$http.get('tuiServer/h5/channelClick', {
        psid: psidUtil.getId(),
        channel_code: this.channelCode,
        ...this.$getOsInfo()
      })
    },
    setPageConfig() {
    },
    loginHandler() {
      const re = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (!re.test(this.phone)) {
        Toast.fail('请输入正确手机号！')
        return false
      }
      this.loginLoading = true
      this.$http.get('tuiServer/h5/channelPhone', {
        psid: psidUtil.getId(),
        phone: this.phone,
        channel_code: this.channelCode,
        ...this.$getOsInfo()
      }).then(() => {
        this.$router.replace({
          path: '/index/home',
          query: {
            phone: this.phone,
            channel_code: this.channelCode
          }
        })
      })
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
