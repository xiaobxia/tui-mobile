<template>
  <div class="banner">
    <van-nav-bar title="新审批码设置" left-arrow @click-left="onClickLeft" />
    <div class="center">
      <van-form @submit="onSubmit">
        <van-field
          v-model="applicationCode"
          :rules="[{ required: true, message: '请填写新审批码' }]"
          name="新审批码"
          label="新审批码"
          placeholder="请输入新审批码"
        />
        <van-field
          v-model="secondApplicationCode"
          :rules="[{ required: true, message: '请重复输入' }]"
          name="重复输入"
          label="重复输入"
          placeholder="请再次输入新审批码"
        />
      </van-form>
      <div class="tip">* 审批码至少6位字母或数字</div>

      <button type="info" class="btn" @click="resetApplicationCode()">完成</button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
function createSearchForm(tar) {
  let raw = {
    applicationCode: '',
    secondApplicationCode: ''
  }
  if (tar) {
    raw = Object.assign(raw, tar)
  }
  return raw
}
export default {
  name: 'NewApplication',
  data() {
    return {
      applicationCode: '',
      secondApplicationCode: '',
      searchForm: createSearchForm()
    }
  },
  computed: {},
  created() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onSubmit(values) {
    },
    // 重置审批码
    resetApplicationCode() {
      this.searchForm.applicationCode = this.applicationCode
      this.searchForm.secondApplicationCode = this.secondApplicationCode
      this.$http
        .postFormData('villageapp/applicationCode/resetApplicationCode', {
          ...this.searchForm
        })
        .then((res) => {
          Toast.success('重置成功！')
          this.$router.push({
            name: 'mine-approvalSettings'
          })
          console.log('提交数据成功')
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
    .tip {
      display: flex;
      justify-content: flex-start;
      margin-left: 16px;
      // padding: 0.26667rem 0.42667rem;
      //   justify-content: center;
      align-items: center;
    }
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
      margin-left: auto;
      margin-right: auto;
      margin-top: 124px;
    }
  }
}
</style>
