<template>
  <div class="page-about-us">
    <mt-header title="关于我们" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <div class="ab-wrap">
        <div class="img-wrap">
          <img src="../../assets/app-icon.png" alt="">
        </div>
        <h3>贷款就上上好口 您的贷款专家</h3>
        <div class="content">上好口是一家做贷款的移动端匹配平台APP，纯线上贷款搜索引擎为借款人提供专业的贷款搜索比价服务，帮助借款人足不出户，最低成本的完成贷款。</div>
      </div>
      <div class="business-wrap">
        <div class="business-item">
          <span>商务合作邮箱：</span>
        </div>
      </div>
      <div class="copyright">copyright©2019上好口 All Rights Reserved</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
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
