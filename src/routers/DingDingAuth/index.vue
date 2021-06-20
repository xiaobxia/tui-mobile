<template>
  <div class="ding-ding-auth">
    <view-loading loading-text="授权中..."/>
  </div>
</template>

<script>
import ViewLoading from '@/components/ViewLoading'
import authUtil from '@/util/authUtil'
import { Toast } from 'vant'
import storageUtil from '@/util/storageUtil.js'
import appCommonUtil from '@/util/appCommonUtil'
// 钉钉api
import dingding from 'gdt-jsapi'
export default {
  name: 'DingDingAuth',
  components: {
    ViewLoading
  },
  data() {
    return {
    }
  },
  created() {
    dingding.getAuthCode({
      // corpId: ''
    }).then((result) => {
      if (result) {
        this.loginVerify(result.code)
      }
    }).catch((err) => {
      console.log(err)
      this.$router.replace('/dingdingError')
    })
  },
  methods: {
    setPageConfig() {
      storageUtil.setData('pageConfig', 'pz', true)
      storageUtil.setData('pageConfig', 'kmye', true)
      storageUtil.setData('pageConfig', 'hbzj', true)
      storageUtil.setData('pageConfig', 'srqk', true)
      storageUtil.setData('pageConfig', 'zcqk', true)
      storageUtil.setData('pageConfig', 'szmx', true)
    },
    loginVerify(authCode) {
      this.$http.postFormData('villageapp/dingtalk/loginVerify', {
        'accessToken': '',
        'authCode': authCode
      }).then((res) => {
        if (!res.data) {
          Toast.fail('系统异常！')
          return
        }
        if (res.code === 200) {
          authUtil.setToken(res.data.token)

          if (process.env.ENV_CONFIG === 'dingding') {
            setTimeout(function() {
              // 用户信息埋点
              // 如采集用户信息是异步行为需要先执行这个BLOCK埋点
              // window.aplus_queue.push({
              //   action: 'aplus.setMetaInfo',
              //   arguments: ['_hold', 'BLOCK']
              // })
              // // 设置会员ID
              // window.aplus_queue.push({
              //   action: 'aplus.setMetaInfo',
              //   arguments: ['_user_id', res.data.accountId]
              // })
              // // 如采集用户信息是异步行为，需要先设置完用户信息后再执行这个START埋点
              // window.aplus_queue.push({
              //   action: 'aplus.setMetaInfo',
              //   arguments: ['_hold', 'START']
              // })
            }, 500)
          }

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
                this.$router.replace('/dingdingError')
                return false
              }
            })
          })
        } else {
          sessionStorage.setItem('dingdingAuth', res.data)
          this.$router.replace('/login')
        }
      }).catch((err) => {
        console.log(err)
        this.$router.replace('/dingdingError')
      })
    },
    backHandler() {
      this.$router.history.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
