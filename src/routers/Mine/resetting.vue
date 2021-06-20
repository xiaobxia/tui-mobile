<template>
  <div class="page-my">
    <van-nav-bar
      title="审批码重置校验"
      left-arrow
      @click-left="onClickLeft"

    />
    <van-cell is-link @click="showPopup1">登录密码</van-cell>
    <!-- 下面两个功能后期要做，现在不做，先隐藏 -->
    <!-- <van-cell is-link @click="showPopup2">手机验证码</van-cell>
    <van-cell is-link @click="showPopup3">身份证识别</van-cell> -->
  </div>
</template>

<script>

export default {
  name: 'My',
  data() {
    return {

    }
  },
  computed: {},
  created() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    showPopup1() {
      this.$router.push({
        name: 'mine-resetVerification1'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
.banner {

}
</style>
