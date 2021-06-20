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
          @click="toDetail(item)"
        >
          <div slot="label">
            <div class="label-b">
              <span>款项用途：{{ item.useOfFunds }}</span>
            </div>
            <div class="label-b">
              <span>组织：{{ item.orgName }}</span>
            </div>
          </div>
          <div class="f-v">
            <div class="label-b">
              <span class="m-t">￥{{ $formatMoney(item.applicationsAmount) }}</span>
            </div>
            <div class="label-b" style="min-width: 340px;height:40px;">
              <span>{{ item.submitTime }}</span>
            </div>
            <approval-tag v-if="item.phDelflag !== '1'" :status="''+item.formStatus"/>
            <approval-tag v-if="item.phDelflag === '1'" :status="'6'"/>
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import ApprovalTag from '@/components/ApprovalTag'
import scrollCacheMixins from '@/mixins/scrollCache'
import { mapGetters } from 'vuex'

export default {
  name: 'IndexApprovalMine',
  components: {
    ApprovalTag
  },
  mixins: [
    scrollCacheMixins
  ],
  data() {
    return {
      current: 0,
      list: [],
      loading: false,
      finished: false,
      show: false,
      orgName: '',
      phCurorgid: ''
    }
  },
  computed: {
    ...mapGetters([
      'mineSearchForm'
    ])
  },
  watch: {
    mineSearchForm() {
      this.reQueryList()
    }
  },
  created() {
    console.log('approval-mine-render')
  },
  mounted() {
    console.log(this.list)
  },
  methods: {
    backHandler() {
      this.$router.history.go(-1)
    },
    reQueryList() {
      this.list = []
      this.finished = false
      return this.queryList(1)
    },
    queryList(current) {
      this.loading = true
      this.current = current || this.current + 1
      this.$http.get('approval-village/AppBusinessController/findAllPageByCondition', {
        ...this.mineSearchForm,
        userId: this.$commonQueryParam.phUserId,
        orgCode: this.$commonQueryParam.orgCode,
        orgId: this.$commonQueryParam.orgId,
        isDraft: 1,
        queryType: 1,
        pageIndex: this.current,
        pageSize: 20
      }).then((res) => {
        const data = res.data || {}
        const total = data.total || 0
        this.$store.commit('SET_mineTotal', total || '')
        this.list = this.list.concat(data.records || [])
        this.loading = false
        if (this.list.length >= total) {
          this.finished = true
        }
        this.list.forEach(v => {
          // 支付状态payStatus:0未支付、1支付中、2支付成功、3支付失败、4部分支付失败,5待复核/授权
          if (v.payStatus === 0) {
            v.paymentStatusName = '未支付'
          } else if (v.payStatus === 1) {
            v.paymentStatusName = '支付中'
          } else if (v.payStatus === 2) {
            v.paymentStatusName = '支付成功'
          } else if (v.payStatus === 3) {
            v.paymentStatusName = '支付失败'
          } else if (v.payStatus === 4) {
            v.paymentStatusName = '部分支付失败'
          } else if (v.payStatus === 5) {
            v.paymentStatusName = '待复核/授权'
          } else {
            v.paymentStatusName = ''
          }
        })
      }).catch((err) => {
        console.log(err)
        this.loading = false
        this.finished = true
      })
    },
    // 跳转到对应详情页 我的任务没有三个按钮，此处对于下面路由页面
    toDetail(item) {
      this.$router.push({
        name: `ApprovalDetailHas`,
        query: {
          formId: item.formId,
          formInstanceId: item.phid,
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
    .m-t {
      color: #484848;
    }
    /deep/ {
      .van-cell__title {
        font-size: 13px;
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
</style>
