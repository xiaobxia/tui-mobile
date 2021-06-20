<template>
  <div class="page-login">
    <div class="t-b" style="text-align: right">
      <!--暂时不支持游客模式-->
      <!--<van-button type="info" size="small" @click="toHome">跳过</van-button>-->
    </div>
    <div class="a-l-t">
      <img src="../../assets/N3C.png" alt="">
      <div class="tt">小微权力监督运行平台</div>
    </div>
    <div v-if="type === 'account'">
      <div class="l-f">
        <div>
          <input v-model="account" type="text" placeholder="请输入账号" autocomplete="off">
        </div>
        <div>
          <input v-model="password" type="password" placeholder="请输入密码" autocomplete="off">
        </div>
      </div>
      <van-button :loading="loginLoading" type="primary" block class="l-b" @click="loginHandler">登录</van-button>
      <!--<div class="l-o" @click="changeType('phone')">手机登录</div>-->
    </div>
    <div v-if="type === 'phone'">
      <div class="l-f type-p">
        <div>
          <input v-model="account" type="text" placeholder="请输入手机号">
        </div>
      </div>
      <van-button type="primary" block class="l-b" @click="getPhoneCode">获取验证码</van-button>
      <div class="l-o" @click="changeType('account')">密码登录</div>
    </div>
    <!--暂时隐藏-->
    <!--<div class="l-s-f">-->
    <!--<div>-->
    <!--<img src="../../assets/shenfenzheng.png" alt="">-->
    <!--</div>-->
    <!--<div>-->
    <!--<span>身份证登录</span>-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
import storageUtil from '@/util/storageUtil.js'
import appCommonUtil from '@/util/appCommonUtil'
import { Toast } from 'vant'
export default {
  name: 'Login',
  data() {
    return {
      account: '',
      password: '',
      checked: false,
      type: 'account',
      loginLoading: false
    }
  },
  computed: {},
  created() {
    this.initPage()
  },
  methods: {
    changeType(type) {
      this.type = type
    },
    initPage() {
    },
    setPageConfig() {
      storageUtil.setData('pageConfig', 'pz', true)
      storageUtil.setData('pageConfig', 'kmye', true)
      storageUtil.setData('pageConfig', 'hbzj', true)
      storageUtil.setData('pageConfig', 'srqk', true)
      storageUtil.setData('pageConfig', 'zcqk', true)
      storageUtil.setData('pageConfig', 'szmx', true)
    },
    loginHandler() {
      this.loginLoading = true
      this.$store.dispatch('appLogin', {
        'password': this.password,
        'username': this.account
      }).then(() => {
        return this.$store.dispatch('getUserInfo').then((userInfo) => {
          // 查询用户第一级别组织
          return this.$http.get(`villageapp/orgNew/findFirstOrg/${userInfo.phid}`).then((orgRes) => {
            const orgList = orgRes.data || []
            this.$store.commit('SET_FIRST_ORG_LIST', orgList)
            if (orgList.length) {
              // 设置当前组织
              this.$store.dispatch('setOrgInfo', orgList[0])
              // 清空路由缓存
              this.$store.dispatch('clearKeepaliveName')
              // 初始化显示
              this.setPageConfig()
              this.loginLoading = false
              this.$router.push({
                path: '/index/approval/pre',
                query: this.otherQuery
              }).catch(err => {
                console.log('err', err)
              })
            } else {
              Toast.fail('用户无关联组织！')
              appCommonUtil.removeLoginAuth()
              return false
            }
          })
        })
      }).then(() => {
        this.loginLoading = false
      }).catch((err) => {
        console.log('err', err)
        this.loginLoading = false
      })
    },
    toHome() {
      this.$router.push('/index')
    },
    getPhoneCode() {
      this.$router.push('/phoneCode')
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
