<template>
  <div class="tab-view tab-view-index">
    <mt-header title="贷款超市" :fixed="true">
    </mt-header>
    <div class="main-body content">
      <product-card></product-card>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
export default {
  name: 'Loan',
  data () {
    return {
    }
  },
  components: {ProductCard}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
