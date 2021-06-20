<template>
  <div class="page-phone-code">
    <van-nav-bar
      title="短信验证码登录"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="page-content-wrap">
      <div class="p-t">输入短信验证码</div>
      <div class="p-c">验证码已发送至 13936329374</div>
      <div class="p-p-b">
        <van-password-input
          :value="value"
          :length="6"
          :gutter="20"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
        <div class="p-c">48s后重新发送</div>
        <van-button type="primary" block class="l-b">完成</van-button>
      </div>
    </div>
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>

export default {
  name: 'PhoneCode',
  data() {
    return {
      account: '',
      password: '',
      checked: false,
      type: 'account',
      showKeyboard: false,
      value: ''
    }
  },
  computed: {},
  created() {
    this.initPage()
  },
  methods: {
    initPage() {
    },
    loginHandler() {
    },
    onClickLeft() {
      this.$router.history.go(-1)
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6)
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
  @import '~@/style/_var.scss';
 .p-t {
   margin-top: 30px;
   color: $dark-text-color;
   font-size: 22px;
 }
  .p-c {
    margin-top: 10px;
    color: $lighter-text-color;
    font-size: 14px;
  }
  .p-p-b {
    margin-top: 70px;
  }
  .l-b {
    margin-top: 55px;
    border-radius: 36px;
  }
</style>
