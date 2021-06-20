<template>
  <div class="banner">
    <van-nav-bar title="审批码重置校验" left-arrow @click-left="onClickLeft" />
    <div class="center">
      <div class="tip">输入短信验证码</div>
      <div class="tip1">验证码已发送至 13936329374</div>
      <!-- <van-password-input
      :value="value"
      info="48s后重新发送"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
      />-->
      <van-password-input
        :value="value"
        :length="6"
        :gutter="15"
        :focused="showKeyboard"
        info="48s后重新发送"
        @focus="showKeyboard = true"
      />

      <van-button type="info" class="btn" @click="next()">下一步</van-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'My',
  data() {
    return {
      value: '123',
      showKeyboard: true
    }
  },
  computed: {},
  created() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6)
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1)
    },
    next() {
      this.$router.push({
        name: 'mine-resetVerification'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
.banner {
  width: 100%;
  height: 100%;
  margin-right: 20px;
  .center {
    margin: 0 auto;
    .btn {
      height: 44px;
      background: rgba(50, 150, 250, 1);
      border-radius: 4px;
      color: rgba(255, 255, 255, 1);
      width: 90%;
      margin-left: 20px;
      margin-top: 26px;
    }
    .tip {
      width: 154px;
      height: 30px;
      font-size: 22px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(72, 72, 72, 1);
      line-height: 30px;
      margin-top: 40px;
      margin-left: 20px;
    }
    .tip1 {
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(39, 39, 39, 1);
      line-height: 20px;
      margin-top: 10px;
      margin-left: 20px;
    }
    .van-password-input {
      margin: 0;
      margin-top: 70px;
      margin-left: 20px;
      margin-right: 20px;
    }
    .van-password-input__error-info,
    .van-password-input__info {
      margin-top: 0.42667rem;
      font-size: 0.37333rem;
      text-align: center;
      margin-left: -6.58667rem;
    }
  }

  //   .van-password-input__security li {
  //     border: 0;
  //     width: 40px;
  //     height: 1px;
  //   }

  //   .van-password-input__security i {
  //     display: none;
  //   }
  //   .van-password-input__info {
  //     color: #969799;
  //     margin-left: -7.53333rem;
  //   }
}
</style>
