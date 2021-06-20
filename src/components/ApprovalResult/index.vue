<template>
  <van-popup
    v-model="show"
    :style="{ height: '100%', width: '100%' }"
    position="left"
  >
    <van-nav-bar title="审批完成" left-arrow @click-left="backHandler" />
    <div v-if="type === 'disagree'" class="content">
      <div class="tu" />
      <p>已不同意</p>
    </div>
    <div v-if="type === 'agree'" class="content">
      <div class="tu" />
      <p>已同意</p>
    </div>
    <div v-if="type === 'back'" class="content">
      <div class="tu" />
      <p>已退回</p>
    </div>
    <div class="btn">
      <!--<van-button type="primary" block class="b-i" @click="queryNext()">查看下一条单据</van-button>-->
      <van-button block class="b-i" @click="backHandler()">返回列表</van-button>
    </div>
  </van-popup>
</template>

<script>
import { mapGetters } from 'vuex'
import { Toast } from 'vant'

export default {
  name: 'ApprovalResult',
  components: {
  },
  data() {
    return {
      show: false,
      type: 'agree'
    }
  },
  computed: {
    ...mapGetters(['preSearchForm'])
  },
  created() {
  },
  // 关闭
  deactivated() {
    this.show = false
  },
  methods: {
    open(data) {
      this.type = data.type
      this.show = true
    },
    backHandler() {
      this.$router.history.go(-1)
    },
    toPath(path) {
      this.$router.push(path)
    },
    queryNext() {
      this.queryList()
    },
    // 审批中心获取代办任务列表数据的方法
    queryList() {
      this.$http.get('villageapp/SpApprovalRecord/pendingMyApprovalNext', {
        ...this.preSearchForm,
        // orgId: this.$commonQueryParam.orgId,
        current: 1,
        size: 1
      }).then((res) => {
        const data = res.data || {}
        const list = data.records || []
        if (list.length) {
          this.show = false
          this.$router.replace({
            name: `ApprovalDetail`,
            query: {
              phid: list[0].phid,
              orgId: list[0].phCurorgid,
              documentNo: list[0].documentNo
            }
          })
        } else {
          Toast('已无待审批单据！')
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/style/_var.scss";
@import "~@/style/theme/theme-color.scss";
.content {
  text-align: center;
  p {
    font-size: 17px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #1F1F1F;
  }
}
.btn{
  padding: 0 15px;
  .b-i {
    margin-bottom: 10px;
  }
}
</style>
