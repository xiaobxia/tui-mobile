<template>
  <div class="view-loading">
    <van-loading :size="iconSize" color="#1989fa" vertical>
      <span style="color: #1989fa">{{ loadingText }}</span>
    </van-loading>
  </div>
</template>

<script>
export default {
  name: 'ViewLoading',
  props: {
    loadingText: {
      type: String,
      default: '加载中...'
    }
  },
  data() {
    return {
      iconSize: `${window.adaptive.fontSize * 0.5}px`
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/style/_var.scss";
  @import "~@/style/theme/theme-color.scss";
  .view-loading {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.6);
    z-index: 1000;
    /deep/ {
      .van-loading {
        position: absolute;
        top: 40%;
        width: 100%;
      }
    }
  }
</style>
