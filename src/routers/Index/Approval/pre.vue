<template>
  <div class="view-approval-pre">
    <div ref="scrollView" class="c-l-w">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        class="a-l-l"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item.phid"
          :title="item.theme"
          is-link
          @click="getApplicationCodeSetting(item)"
        >
          <!-- 此处title需要进行拼接 -->
          <div slot="label">
            <div class="label-b">
              <span>款项用途：{{ item.useOfFunds }}</span>
            </div>
            <div class="label-b">
              <!-- <span>组织：{{ item.phCurorgid }}</span> -->
              <span>组织：{{ item.orgName }}</span>
            </div>
          </div>
          <div class="f-v">
            <div class="label-b">
              <span class="m-t">￥{{ $formatMoney(item.applicationsAmount) }}</span>
            </div>
            <div class="label-b">
              <!-- 时间处理，去掉时分秒 formatToDay-->
              <span>{{ $formatToDay(item.applyTime) }}</span>
            </div>
            <approval-tag v-if="item.phDelflag !== '1'" :status="''+item.formStatus"/>
            <approval-tag v-if="item.phDelflag === '1'" :status="'6'"/>
          </div>
        </van-cell>
      </van-list>
      <!-- 下面这个是掉接口进行验证的弹窗 -->
      <van-popup v-model="passwordShow" :style="{ height: '30%', width: '80%' }" position="center">
        <div class="f-w">
          <p class="zi">请输入审批码</p>
          <van-field
            v-model="password"
            :rules="[{ required: true, message: '请填写密码' }]"
            type="password"
            name="密码"
            label
            placeholder="输入审批码"
          />
          <div>
            <div class="b-b-w">
              <van-button type="default" size="small" class="b-b-b" @click="cancel()">取消</van-button>
              <van-button type="primary" size="small" class="b-b-b" @click="verifyPassword()">确定</van-button>
            </div>
          </div>
        </div>
      </van-popup>
      <!-- 下面这个是弹窗提示 -->
      <van-popup v-model="fingerShow" :style="{ height: '30%', width: '80%' }" position="center">
        <div class="f-w">
          <div class="zhiwen">
            <img src="../../../assets/zhiwen.png" alt >
          </div>
          <p class="zhiwen">请使用您的指纹验证</p>
          <div>
            <div class="b-b-w">
              <van-button type="default" size="small" class="b-b-b" @click="cancelValidation()">取消</van-button>
              <van-button type="primary" size="small" class="b-b-b" @click="pupUp()">审批码验证</van-button>
            </div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import ApprovalTag from '@/components/ApprovalTag'
import scrollCacheMixins from '@/mixins/scrollCache'
import { mapGetters } from 'vuex'

export default {
  name: 'IndexApprovalPre',
  components: {
    ApprovalTag
  },
  mixins: [scrollCacheMixins],
  data() {
    return {
      current: 0,
      password: '',
      list: [],
      loading: false,
      finished: false,
      passwordShow: false,
      fingerShow: false,
      currentRow: {}
    }
  },
  computed: {
    ...mapGetters(['preSearchForm'])
  },
  watch: {
    preSearchForm() {
      this.reQueryList()
    }
  },
  created() {
    console.log('approval-pre-render')
  },
  methods: {
    // 取消指纹提示弹窗
    cancelValidation() {
      this.fingerShow = false
    },
    // 取消审批码验证弹窗
    cancel() {
      this.passwordShow = false
    },
    // 控制弹出审批码验证的框
    pupUp() {
      this.passwordShow = true
    },
    // 指纹验证弹窗提示
    pupUpVerify() {
      this.fingerShow = true
    },
    // 审批码验证调用接口方法
    verifyPassword() {
      this.loading = true
      this.$http
        .postFormData('villageapp/applicationCode/verifyApplicationCode', {
          applicationCode: this.password
        })
        .then((res) => {
          console.log(res.code, 'res.code000')
          if (res.code === 200) {
            this.toDetail(this.currentRow)
            this.$toast.success(res.message)
            this.passwordShow = false
          } else {
            this.$toast.fail(res.message)
          }
          // 下面这个是捕获449异常情况
        })
        .catch((res) => {
          console.log('err', res)
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error'
          })
        })
    },
    backHandler() {
      this.$router.history.go(-1)
    },
    // 获取审批码设置状态 调用我的里面的方法
    getApplicationCodeSetting(row) {
      this.currentRow = row
      this.loading = true
      this.$http
        .get('villageapp/applicationCode/setting/getApplicationCodeSetting')
        .then((res) => {
          if (res.code === 100) {
            this.$router.push({ name: 'mine-newApplication1' })
          } else if (res.code === 200) {
            if (res.data != null) {
              if (res.data.enableApplicationCode === '1') {
                // 第一期直接使用验证码
                this.pupUp()
              } else {
                this.toDetail(row)
              }
            }
          }
          console.log('提交退回数据成功')
        })
    },
    reQueryList() {
      this.list = []
      this.finished = false
      return this.queryList(1)
    },
    // 审批中心获取代办任务列表数据的方法
    queryList(current) {
      this.loading = true
      this.current = current || this.current + 1
      this.$http
        .postFormData('approval-village/AppBusinessController/findNeedApprovalList', {
          ...this.preSearchForm,
          orgId: this.$commonQueryParam.orgId,
          userId: this.$commonQueryParam.phUserId,
          'queryType': 1,
          current: this.current,
          size: 20
        })
        .then((res) => {
          const data = res.data || {}
          const total = data.total || 0
          this.$store.commit('SET_preToal', total || '')
          this.list = this.list.concat(data.records || [])
          this.loading = false
          if (this.list.length >= total) {
            this.finished = true
          }
        }).catch((err) => {
          console.log(err)
          this.loading = false
          this.finished = true
        })
    },
    toDetail(item) {
      this.$router.push({
        name: `ApprovalDetail`,
        query: {
          formId: item.formId,
          formInstanceId: item.formInstanceId,
          theme: item.theme,
          phid: item.phid,
          processId: item.processId
        }
      })
    },
    onLoad() {
      this.queryList()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/style/_var.scss";
@import "~@/style/theme/theme-color.scss";
.c-l-w {
  margin-top: 12px;
  height: calc(100vh - 200px);
  overflow-x: hidden;
  overflow-y: auto;
  background-color: $grey-body-color;
  padding: 0;
  .zhiwen {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #484848;
    margin-top: 32px;
    background-size: 100% 100%;
  }
  .m-t {
    color: #484848;
  }
  /deep/ {
    .van-cell__title {
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .van-cell__title {
      -webkit-box-flex: 2;
      -webkit-flex: 2;
      flex: 2;
    }
    .van-cell__value {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      overflow: visible;
    }
    .van-cell__label {
      font-size: 11px;
    }
    .f-v {
      position: absolute;
      bottom: 0;
      right: -16px;
      font-size: 11px;
      line-height: 18px;
    }
  }
}
.label-b {
  position: relative;
}
.b-b-b {
  width: 130px;
}
</style>
