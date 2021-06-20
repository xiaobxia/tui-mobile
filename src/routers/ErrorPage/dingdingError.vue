<template>
  <div class="page-hello-world">
    <van-empty image="error" description="授权失败！" />
  </div>
</template>

<script>
export default {
  name: 'DingDingError',
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    backHandler() {
      this.$router.history.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .page-hello-world {
    margin-top: 20vh;
  }
</style>
