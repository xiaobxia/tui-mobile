<template>
  <div class="page-about-us">
    <mt-header title="下载客户端" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <div class="copyright">copyright©2019上好口 All Rights Reserved</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DownLoad',
  data () {
    return {
    }
  },
  methods: {
    backHandler () {
      this.$router.history.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
