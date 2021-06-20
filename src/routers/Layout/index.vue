<template>
  <div class="app-layout">
    <keep-alive :include="keepaliveNames">
      <router-view v-if="init" :key="key"/>
    </keep-alive>
    <div v-if="!init" class="loading-c">
      <van-loading vertical>加载中...</van-loading>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

// 抽离出这一层，主要是为了方便做一些，公共参数等等。。。
export default {
  name: 'AppLayout',
  data() {
    return {
      init: true
    }
  },
  computed: {
    key() {
      return this.$route.meta.activePath || this.$route.fullPath
    },
    ...mapGetters([
      'keepaliveNames'
    ])
  },
  watch: {
  },
  created() {
    console.log('app-layout-render')
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/style/_var.scss";
</style>
