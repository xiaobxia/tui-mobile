<template>
  <div class="page-tui-guang">
    <img src="../../assets/bg.png" class="bg" alt="">
    <img src="../../assets/app-icon.png" alt="" class="app-icon">
    <div class="main-body no-header">
      <div class="register-wrap">
        <mt-field placeholder="请输入您的手机号"  v-model="mobile"></mt-field>
        <mt-field placeholder="请输入您的验证码" class="code-wrap"  v-model="verification_code">
          <mt-button v-if="!ifCount" :disabled="sendDisabled" @click="sendMsg">发送验证码</mt-button>
          <mt-button v-else :disabled="true">{{countNumber}}秒</mt-button>
        </mt-field>
        <mt-button class="register-btn" :disabled="registerDisabled" @click="loginIn">立即注册 / 登录</mt-button>
      </div>
      <div class="img-detail-wrap">
        <div class="img-detail-item">
          <img src="../../assets/img-detail-1.png" alt="">
          <div class="text">超高额度</div>
          <div class="text">极速放款</div>
        </div>
        <div class="img-detail-item">
          <img src="../../assets/img-detail-2.png" alt="">
          <div class="text">门槛极低</div>
          <div class="text">免征信</div>
        </div>
        <div class="img-detail-item">
          <img src="../../assets/img-detail-3.png" alt="">
          <div class="text">信息安全</div>
          <div class="text">借款无忧</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storageUtil from '@/util/storageUtil.js'
import { Toast, MessageBox } from 'mint-ui'

export default {
  name: 'TuiGuang',
  data () {
    return {
      mobile: '',
      verification_code: '',
      ifCount: false,
      countNumber: 29,
      codeToken: '',
      countTimer: null
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    registerDisabled () {
      return !this.mobile || !this.verification_code
    },
    sendDisabled () {
      return !this.mobile
    }
  },
  beforeDestroy () {
    clearInterval(this.countTimer)
  },
  methods: {
    getCodeToken () {
      this.$http.get('auth/getVerificationCodeToken').then((res) => {
        this.codeToken = res.data.token
      })
    },
    initPage () {
      const query = this.$router.history.current.query
      this.getCodeToken()
      this.$addBaiDu('/page/tuiguang', query.cc)
      // 添加浏览记录
      this.$addViewLog('/page/tuiguang', query)
    },
    loginIn () {
      const query = this.$router.history.current.query
      const phoneReg = /^1\d{10}$/
      if (phoneReg.test(this.mobile)) {
        const codeReg = /^\d{4}$/
        if (codeReg.test(this.verification_code)) {
          this.$http.post('auth/activeByVerificationCode', {
            mobile: this.mobile,
            code: this.verification_code,
            source_channel_id: query.cc || 'sys'
          }).then((res) => {
            if (res.success === false) {
              Toast({
                message: '验证码不正确',
                className: 'error',
                duration: 1000
              })
            } else {
              if (query.h5 && query.h5 === 'true') {
                window._token = res.data.token
                localStorage.setItem('token', res.data.token)
                storageUtil.initUserInfo({
                  ...res.data,
                  isLogin: true
                })
                this.$router.push({
                  path: '/',
                  query: {
                    ...this.$router.history.current.query,
                    cc: res.data.channel_id
                  }
                })
              } else {
                MessageBox({
                  title: '提示',
                  message: `你好，注册成功！请去下载app`,
                  showCancelButton: true,
                  confirmButtonText: '去下载'
                }).then(action => {
                  localStorage.removeItem('password')
                  if (action === 'confirm') {
                    this.$http.get('customer/setDownload', {
                      mobile: res.data.mobile
                    })
                    this.$router.push({
                      path: '/page/appDownload',
                      query: {
                        ...this.$router.history.current.query,
                        cc: res.data.channel_id
                      }
                    })
                  }
                })
              }
              // 推广的链接不能直接跳转h5而是应该下载app
            }
          })
        } else {
          Toast({
            message: '验证码格式不正确',
            className: 'error',
            duration: 1000
          })
        }
      } else {
        Toast({
          message: '手机号格式不正确',
          className: 'error',
          duration: 1000
        })
      }
    },
    sendMsg () {
      const query = this.$router.history.current.query
      const phoneReg = /^1\d{10}$/
      if (phoneReg.test(this.mobile)) {
        this.$http.get('auth/sendVerificationCode', {
          mobile: this.mobile,
          token: this.codeToken,
          source_channel_id: query.cc || 'sys'
        }).then((res) => {
          this.getCodeToken()
          if (res.success === false) {
            Toast({
              message: '发生错误，请稍后重试',
              className: 'error',
              duration: 1000
            })
          } else {
            Toast({
              message: '发送成功',
              className: 'success',
              duration: 1000
            })
            this.ifCount = true
            this.countTimer = setInterval(() => {
              this.countNumber = this.countNumber - 1
              if (this.countNumber === 0) {
                this.ifCount = false
                this.countNumber = 29
                clearInterval(this.countTimer)
              }
            }, 1000)
          }
        })
      } else {
        Toast({
          message: '手机号格式不正确',
          className: 'error',
          duration: 1000
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
