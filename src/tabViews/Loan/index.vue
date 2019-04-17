<template>
  <div class="tab-view tab-view-loan">
    <mt-header title="贷款大全" :fixed="true">
    </mt-header>
    <div class="main-body">
      <div class="ad-wrap">
        <i class="fas fa-bullhorn"></i>
        <span>据统计，申请<span class="yellow-text">5个以上</span>产品，贷款成功率超过95%</span>
      </div>
      <product-card-simple :list="list"></product-card-simple>
    </div>
  </div>
</template>

<script>
import ProductCardSimple from '@/components/ProductCardSimple.vue'
export default {
  name: 'Loan',
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
    initPage () {
      const query = this.$router.history.current.query
      this.$addBaiDu('/loan', query.cc)
      this.$addViewLog('/loan', query)
      this.$http.get('customer/getUserProducts').then((res) => {
        this.list = res.data.list
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
