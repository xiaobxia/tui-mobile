<template>
  <div class="lock-tag">
    <div class="top"/>
    <div class="bottom"/>
    <div class="line"/>
  </div>
</template>

<script>
export default {
  name: 'LockTag',
  data() {
    return {
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
  .lock-tag {
    position: absolute;
    width: 10px;
    height: 36px;
    .top, .bottom {
      position: absolute;
      left: 0;
      height: 10px;
      width: 10px;
      border-radius: 100%;
      background-color: $original-light-2;
    }
    .top {
      top: 0;
    }
    .bottom {
      bottom: 0;
    }
    .line {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      height: 30px;
      width: 6px;
      border: 1px solid #fff;
      background-color: $original-light-7;
      border-radius: 6px;
    }
  }
</style>
