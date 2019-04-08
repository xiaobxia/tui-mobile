<template>
  <div class="tab-view tab-view-index">
    <mt-header title="贷款超市" :fixed="true">
    </mt-header>
    <div class="main-body content">
      <product-card :list="list"></product-card>
    </div>
  </div>
</template>

<script>
import storageUtil from '@/util/storageUtil.js'
import ProductCard from '@/components/ProductCard.vue'
export default {
  name: 'Loan',
  data () {
    return {
      list: []
    }
  },
  components: {ProductCard},
  created () {
    this.initPage()
  },
  methods: {
    initPage () {
      const query = this.$router.history.current.query
      const deviceInfo = storageUtil.getDeviceInfo()
      const userInfo = storageUtil.getUserInfo()
      // 添加浏览记录
      this.$http.post('log/addViewLog', {
        ...deviceInfo,
        page: 'loan',
        source_channel_id: query.cc || 'sys',
        mobile: userInfo.mobile
      })
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
