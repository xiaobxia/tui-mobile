<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {}
  },
  computed: {
    key() {
      return this.$route.meta.activePath || this.$route.fullPath
    }
  },
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/style/_var.scss";
.loading-c {
  margin-top: 40vh;
}
</style>
