<template>
  <div class="page-resetVerification1">
    <p class="zi">请输入审批码</p>
    <van-field
      v-model="password"
      :rules="[{ required: true, message: '请填写密码' }]"
      type="password"
      name="密码"
      label
      placeholder="输入审批码"
    />
    <!-- 下边框 -->
    <div class="van-hairline--bottom" style="height:1px;color:#E9E9E9;width:54%" />
    <van-button class="btn" type="info">取消</van-button>
    <van-button class="btn" type="info" @click="verifyPassword()">确定</van-button>
  </div>
</template>

<script>
function createSearchForm(tar) {
  let raw = {
    password: ''
  }
  if (tar) {
    raw = Object.assign(raw, tar)
  }
  return raw
}
export default {
  name: 'ResetVerification1',
  data() {
    return {
      password: '',
      searchForm: createSearchForm()
    }
  },
  computed: {},
  created() {},
  methods: {
    // 登录密码校验
    verifyPassword() {
      this.loading = true
      this.searchForm.password = this.password

      this.$http
        .postFormData('villageapp/applicationCode/verifyPassword', {
          ...this.searchForm
        })
        .then((res) => {
          console.log(res.code, 'res.code000')
          if (res.code === 200) {
            this.$router.push({
              name: 'ApprovalDetail'
            })
            this.$toast.success(res.message)
          } else {
            this.$toast.fail(res.message)
          }
        })
    },
    onSubmit(values) {
      console.log('submit', values)
    },
    next() {
      this.$router.push({
        name: 'mine-newApplication'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
.page-resetVerification1 {
  display: flex;
  justify-content: center;
  flex-direction: column;
  .zi {
    width: 132px;
    height: 30px;
    font-size: 22px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #272727;
    line-height: 30px;
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 45px;
  }
  .xian {
    width: 343px;
    height: 1px;
    color: #e9e9e9;
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 76px;
  }
  .btn {
    height: 44px;
    background: rgba(50, 150, 250, 1);
    border-radius: 4px;
    color: rgba(255, 255, 255, 1);
    // width: 90%;
    margin-top: 120px;
    width: 25%;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
