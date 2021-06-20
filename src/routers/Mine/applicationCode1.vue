<template>
  <div class="banner">
    <van-nav-bar title="审批码重置校验" left-arrow @click-left="onClickLeft" />
    <div class="center">
      <div class="tip">身份证识别</div>
      <div class="tip1">请将本人身份证正面拍照上传校验</div>

      <div class="tip2">
        <img src="../../assets/shenfenzheng.png" alt >
      </div>
      <!-- <van-password-input
      :value="value"
      info="48s后重新发送"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
      />-->

      <van-button type="info" class="btn">拍照上传</van-button>
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
      margin-top: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      margin-top: 32px;
    }
    .tip {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 30px;
      font-size: 22px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(72, 72, 72, 1);
      line-height: 30px;
      margin-top: 40px;
    }
    .tip1 {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(39, 39, 39, 1);
      line-height: 20px;
      margin-top: 10px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(39, 39, 39, 1);
      line-height: 20px;
    }
    .tip2 {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 30px;
      margin-bottom: 32px;
      img {
        background-position: center;
        background-size: 100% 100%;
        width: 160px;
        height: 110px;
      }
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
      margin-left: -7.48667rem;
    }
  }
}
</style>
