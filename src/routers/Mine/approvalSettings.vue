<template>
  <div class="page-my">
    <van-nav-bar title="审批设置" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-switch-cell v-model="checked" title="启用审批校验" @change="initApplicationCodeSetting()" />
    </van-cell-group>
    <div v-show="show">
      <!--<div class="section">若两者同时开启，优先使用指纹校验</div>-->
      <van-cell-group>
        <van-cell is-link @click="resetCode">审批码设置</van-cell>
        <!-- 暂时不显示，后期指纹校验还要做 -->
        <!-- <van-switch-cell v-model="checked2" title="指纹校验" /> -->
      </van-cell-group>
    </div>
  </div>
</template>

<script>
function createSearchForm(tar) {
  let raw = {
    enableApplicationCode: '',
    enableFinger: ''
  }
  if (tar) {
    raw = Object.assign(raw, tar)
  }
  return raw
}
export default {
  name: 'My',
  data() {
    return {
      searchForm: createSearchForm(),
      checked: false,
      show: false
    }
  },
  computed: {},
  watch: {
    checked: {
      handler: function() {
        this.show = this.checked
      }
    }
  },
  created() {
    this.searchForm.enableFinger = 0
    if (this.checked === false) {
      this.searchForm.enableApplicationCode = 0
    } else {
      this.searchForm.enableApplicationCode = 1
    }
    this.getApplicationCodeSetting()
  },
  methods: {
    changeStatus() {
      if (this.checked === 'true') {
        this.$router.push({ name: 'mine-newApplication1' })
      }
    },
    onClickLeft() {
      // 直接返回首页
      this.$router.replace('/index/my')
    },
    resetCode() {
      this.$router.push({ name: 'mine-newApplication2' })
    },
    // 审批码设置初始化对应接口
    initApplicationCodeSetting() {
      this.searchForm.enableFinger = 0
      if (this.checked === false) {
        this.searchForm.enableApplicationCode = 0
      } else {
        this.searchForm.enableApplicationCode = 1
      }
      this.$http
        .postFormData(
          'villageapp/applicationCode/setting/initApplicationCodeSetting',
          {
            ...this.searchForm
          }
        )
        .then((res) => {
          console.log(res.code, 'res.code')
          if (res.code === 100) {
            this.$router.push({ name: 'mine-newApplication1' })
          }
        })
    },
    // 获取审批码设置状态
    getApplicationCodeSetting() {
      this.$http.get('villageapp/applicationCode/setting/getApplicationCodeSetting').then((res) => {
        if (res.code === 100) {
          this.$router.push({ name: 'mine-newApplication1' })
        } else if (res.code === 200) {
          if (res.data != null) {
            if (res.data.enableApplicationCode === '1') {
              this.checked = true
            }
          }
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
.page-my {
  background: rgba(241, 242, 243, 1);

  .section {
    margin-left: 16px;
    width: 224px;
    height: 42px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(72, 72, 72, 1);
    background: rgba(241, 242, 243, 1);
    line-height: 42px;
  }
}
</style>
