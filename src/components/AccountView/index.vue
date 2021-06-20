<template>
  <van-popup
    v-model="show"
    :style="{ height: '100%', width: '100%' }"
    position="left"
  >
    <van-nav-bar title="收款人" left-arrow @click-left="close"/>
    <div class="cert-content">
      <div v-for="(value, index) in accountList" :key="index" class="app-card-block bottom">
        <div >
          <p>收款账户&nbsp;&nbsp;&nbsp;&nbsp; {{ value.accountOfPayee }}</p>
          <p>收款账号&nbsp;&nbsp;&nbsp;&nbsp;{{ value.accountNoOfPayee }}</p>
          <p>收款银行&nbsp;&nbsp;&nbsp;&nbsp;{{ value.nameOfPayeeBank }}</p>
          <p>收款金额&nbsp;&nbsp;&nbsp;&nbsp;{{ $formatMoney(value.amountCollected) }}</p>
          <!-- 下面这个是大写金额 -->
          <p>金额大写&nbsp;&nbsp;&nbsp;&nbsp;{{ $digitUppercase(value.amountCollected) }}</p>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>

export default {
  name: 'AccountView',
  components: {
  },
  data() {
    return {
      show: false,
      accountList: []
    }
  },
  created() {
  },
  // 关闭
  deactivated() {
    this.show = false
  },
  methods: {
    open(accountList) {
      this.accountList = accountList
      this.show = true
    },
    backHandler() {
      this.$router.history.go(-1)
    },
    close() {
      this.show = false
      this.$emit('close')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/style/_var.scss";
@import "~@/style/theme/theme-color.scss";
.cert-content {
  height: calc(100vh - 46px);
  overflow-x: hidden;
  overflow-y: auto;
  background-color: $grey-body-color;
  padding: 12px 16px;
}
.sub-text {
  display: block;
  color: $lighter-text-color;
  font-size: 12px;
  margin-bottom: 8px;
  .tu {
    width: 42px;
    height: 42px;
    background: #3296fa;
  }
}
.detail-card {
  position: relative;
  height: 32px;
  line-height: 32px;
  background: rgba(241, 242, 243, 1);
  border-radius: 4px;
  font-size: 13px;
  padding: 0 12px;
  margin-bottom: 8px;
  &.large {
    height: 64px;
    .item {
      position: relative;
      padding: 0 12px;
      line-height: 32px;
    }
  }
  .left {
    text-align: left;
  }
  .right {
    text-align: right;
  }
  .tag-icon {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 22px;
    height: 22px;
    border-radius: 100%;
    line-height: 22px;
    text-align: center;
    font-size: 12px;
    color: #fff;
    &.blue {
      background-color: #3296fa;
    }
    &.red {
      background-color: #ef3f3f;
    }
  }
}
</style>
