<template>
  <div class="page-my">
    <van-nav-bar title="村级事务" />
    <div class="banner">
      <div class="tu">
        <img src="../../../assets/user-n.png" alt >
      </div>
      <!--  @click="toPath('mine-accountInfo')" -->
      <div class="banner1">
        <div class="zi1 ellipsis-text"><span>{{ userInfo.userName }}</span></div>
        <div class="zi2 ellipsis-text"><span>{{ orgInfo.name }}</span></div>
      </div>
    </div>
    <!--<van-cell is-link @click="toPath('mine-management')">首页管理</van-cell>-->
    <van-cell is-link @click="toPath('mine-approvalSettings')">审批设置</van-cell>
    <div class="l-w">
      <van-button type="primary" block class="l-o" @click="logout">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import appCommonUtil from '@/util/appCommonUtil'
import { mapGetters } from 'vuex'
import { Toast } from 'vant'

export default {
  name: 'IndexMy',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'orgInfo'
    ])
  },
  created() {
    console.log('IndexMy-render')
  },
  methods: {
    toPath(name) {
      this.$router.push({ name })
    },
    logout() {
      this.$http.post('villageapp/dingtalk/logout').then(() => {
        Toast.loading({
          message: '退出登录中...',
          forbidClick: true,
          loadingType: 'spinner'
        })
        appCommonUtil.removeLoginAuth()
        setTimeout(() => {
          window.location.reload()
        }, 600)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
.banner {
  background: url(../../../assets/bj1.png);
  background-size: 100% 100%;
  background-position: center;
  height: 108px;
  display: flex;
  justify-items: center;
  align-items: center;
  .tu {
    display: flex;
    justify-items: center;
    align-items: center;
    margin-left: 22px;
    img {
      background-size: 100% 100%;
      background-position: center;
      width: 56px;
      height: 56px;
    }
  }

  .banner1 {
    margin-left: 12px;
    .zi1 {
      width: 250px;
      height: 28px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 28px;
      margin: 0;
    }
    .zi2 {
      width: 250px;
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 20px;
      margin: 0;
    }
  }
}
.page-my {
  position: relative;
  height: calc(100vh - 51px);
}
  .l-w {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 12px 16px;
  }
  .l-o {
    border-radius: 36px;
  }
</style>
