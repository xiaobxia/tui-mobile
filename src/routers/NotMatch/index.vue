<template>
  <div class="page-404">
    <van-nav-bar
      title="404"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-empty image="network" description=""/>
    <div style="text-align: center">
      <van-button type="info" size="small" class="b-b" @click="toHome">返回首页</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotMatch',
  data() {
    return {
    }
  },
  methods: {
    backHandler() {
      this.$router.history.go(-1)
    },
    onClickLeft() {
      this.$router.history.go(-1)
    },
    toHome() {
      this.$router.replace('/index')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .b-b {
    width: 100px;
  }
</style>
