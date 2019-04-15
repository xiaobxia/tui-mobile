<template>
  <div class="page-new-product">
    <mt-header title="新品专区" :fixed="true">
      <mt-button slot="left" @click="backHandler">
        <i class="fas fa-chevron-left"></i>
      </mt-button>
    </mt-header>
    <div class="main-body">
      <div class="ad-wrap">
        <i class="fas fa-bullhorn"></i>
        <span>据统计，申请<span class="yellow-text">5个以上</span>产品，贷款成功率超过95%</span>
      </div>
      <product-card-simple type="new" :list="list"></product-card-simple>
    </div>
  </div>
</template>
<script>
import ProductCardSimple from '@/components/ProductCardSimple.vue'
export default {
  name: 'NewProduct',
  data () {
    return {
      list: []
    }
  },
  components: {ProductCardSimple},
  created () {
    this.initPage()
  },
  methods: {
    backHandler () {
      this.$router.history.go(-1)
    },
    initPage () {
      // const query = this.$router.history.current.query
      // const deviceInfo = storageUtil.getDeviceInfo()
      // const userInfo = storageUtil.getUserInfo()
      // // 添加浏览记录
      // this.$http.post('log/addViewLog', {
      //   ...deviceInfo,
      //   page: 'loan',
      //   source_channel_id: query.cc || 'sys',
      //   mobile: userInfo.mobile
      // })
      this.$http.get('customer/getProductsNew').then((res) => {
        this.list = res.data.list
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
