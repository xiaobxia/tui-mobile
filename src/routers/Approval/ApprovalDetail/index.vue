<template>
  <div class="page-cert-detail">
    <van-nav-bar left-arrow @click-left="backHandler" >
      <template #title>
        <div v-if="$route.query.theme && $route.query.theme.length > 11" class="h-n-b">
          <van-notice-bar :text="$route.query.theme" scrollable />
        </div>
        <div v-else>{{ $route.query.theme }}</div>
      </template>
    </van-nav-bar>
    <div class="cert-content">
      <div class="c-w-b">
        <div class="diy-form-view-wrap">
          <diy-form-view ref="diyFormView"/>
        </div>
        <div class="a-s-w">
          <approval-steps-col
            :detail="processNodeData"
          />
        </div>
      </div>
      <div class="page-bottom-btn">
        <div class="btnTotal">
          <van-button type="default" class="btn1" @click="toRejection()">退回</van-button>
          <van-button type="default" class="btn2" @click="toDisagree()">不同意</van-button>
          <van-button type="primary" class="btn3" @click="toAgree()">同意</van-button>
        </div>
      </div>
    </div>
    <agree ref="agree" @ok="agreeOk" />
    <Disagree ref="disagree" @ok="disagreeOk" />
    <approvalRejection ref="back" @ok="rejectionOk" />
    <approval-result ref="approvalResult" />
    <file-view ref="fileView"/>
    <account-view ref="accountView"/>
  </div>
</template>

<script>
import LockTag from '@/components/LockTag'
import Agree from '@/components/Agree'
import FileView from '@/components/FileView'
import AccountView from '@/components/AccountView'
import Disagree from '@/components/Disagree'
import ApprovalRejection from '@/components/ApprovalRejection'
import ApprovalStepsCol from '@/components/ApprovalSteps/ApprovalStepsCol'
import ApprovalResult from '@/components/ApprovalResult'
import { mapGetters } from 'vuex'
import DiyFormView from '@/components/DiyForm/view'
function createSearchForm(tar) {
  let raw = {
    approvalComments: 2,
    approvalCommentsExplain: '',
    fileInfo: [
      {
        fileName: '',
        fileUrl: ''
      }
    ],
    phIdList: [],
    reject: 0
  }
  if (tar) {
    raw = Object.assign(raw, tar)
  }
  return raw
}
export default {
  name: 'ApprovalDetail',
  components: {
    LockTag,
    Agree,
    ApprovalResult,
    ApprovalRejection,
    Disagree,
    FileView,
    AccountView,
    DiyFormView,
    ApprovalStepsCol
  },
  data() {
    return {
      valueList: [],
      searchForm: createSearchForm(),
      documentNo: this.$route.query.documentNo,
      phId: this.$route.query.phid,
      orgId: this.$route.query.orgId,
      busType: this.$route.query.busType,
      detail: [],
      accountList: [{}],
      fileList: [],
      agreeShow: false,
      phid: '',
      orgName: '',
      processNodeData: {}
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    // this.queryDetail()
    // this.transform()
  },
  mounted() {
    this.$refs.diyFormView.open(this.$route.query.formId, this.$route.query.formInstanceId).then((resList) => {
      // 查询审批流程
      if (resList[1]) {
        const resP = this.querySteps(resList[1].data || {})
        if (resP) {
          return resP
        }
      }
    })
  },
  methods: {
    // 查询审批流程
    querySteps(applyData) {
      const approvalBusinessEntity = applyData.approvalBusinessEntity || {}
      const businessId = approvalBusinessEntity.phid || ''
      if (applyData.formStatus && businessId) {
        return this.$http.get('approval-village/AppBusinessController/findBusinessNodeMessage', {
          businessId: businessId
        }).then((res) => {
          this.processNodeData = res.data || {}
        })
      }
    },
    SET_STATUS(status, index, arrLength) {
      if (index === arrLength - 1 && status === 2) {
        return '审批通过'
      }
      return this.$APPROVAL_NODE_STATUS[status].label
    },
    formatPreApprovalStatus(value) {
      const label = this.$APPROVAL_NODE_STATUS[value.approvalStatus].label
      if (value.approvalStatus === 1) {
        if (this.userInfo.userName !== value.user.userName) {
          return '待他审批'
        }
      }
      return label
    },
    // 代办任务对应详情页获取详情的方法即展示当前页面列表各个字段信息
    queryDetail() {
      this.loading = true
      this.current = this.current + 1
      this.$http
        .get('villageapp/SpApplyRecord/getApplyDetailByCondition', {
          documentNo: this.documentNo,
          phId: this.phId,
          orgId: this.orgId
        })
        .then((res) => {
          this.phid = res.data.phId
          this.detail = res.data || {}
          console.log(this.detail, 'this.detail')
          this.accountList = res.data.accountList || []
          console.log(this.accountList, 'this.accountList')
          this.fileList = res.data.fileList || []
          // 流程节点，排序
          const valueList = res.data.historyList || []
          valueList.forEach((item) => {
            if (!item.approverOrder) {
              item.approverOrder = 0
            }
            // item.approvalAttachment = JSON.parse(item.approvalAttachment || '[]')
          })
          // valueList.sort((a, b) => {
          //   if (a.approverOrder === b.approverOrder) {
          //     return a.approverNodeOrder - b.approverNodeOrder
          //   }
          //   return a.approverOrder - b.approverOrder
          // })
          this.valueList = valueList
        })
    },
    transform() {
      this.$http.get('villageapp/org/info/' + this.detail.phCurorgid).then(({ data }) => {
        console.log(data, 'data转换')
        // this.orgName = data.name
      })
    },
    // 点击查询接口展示得到收款人信息跳转页面
    toAccount() {
      this.$refs.accountView.open(this.accountList)
    },
    // 查看附件方法
    viewFile() {
      const list = []
      this.detail.fileList.forEach((item) => {
        list.push({
          name: item.fileName,
          url: item.fileUrl
        })
      })
      this.$refs.fileView.open(list)
    },
    // 查看附件方法
    viewFileHis(fileList) {
      const list = []
      fileList.forEach((item) => {
        list.push({
          name: item.fileName,
          url: item.fileUrl
        })
      })
      this.$refs.fileView.open(list)
    },
    // 点击同意按钮对于跳转方法
    toAgree() {
      this.$refs.agree.open(this.$refs.diyFormView.getFormLayout())
    },
    //  点击退回按钮对于跳转方法
    toRejection() {
      this.$refs.back.open(this.$refs.diyFormView.getFormLayout())
    },
    //  点击不同意按钮对于跳转方法
    toDisagree() {
      this.$refs.disagree.open(this.$refs.diyFormView.getFormLayout())
    },
    backHandler() {
      this.$router.history.go(-1)
    },
    // 用refs调用子组件的同意方法
    agreeOk() {
      this.$refs.approvalResult.open({
        type: 'agree'
      })
    },
    // 用refs调用子组件的不同意方法
    disagreeOk() {
      this.$refs.approvalResult.open({
        type: 'disagree'
      })
    },
    // 用refs调用子组件的退回方法
    rejectionOk() {
      this.$refs.approvalResult.open({
        type: 'back'
      })
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
  .c-w-b {
    height: calc(100vh - 106px);
    overflow-x: hidden;
    overflow-y: auto;
  }
}
.step{
  height: 65px;
  line-height: 65px;
}
.sub-Bigtext {
  font-size: 15px;
  font-weight: bold;
  color: #484848;
}
.sub-content {
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: #484848;
  margin: 10px 0;
  .label {
    display: inline-block;
    width: 5em;
    text-align: right;
    vertical-align: top;
    color: $lighter-text-color;
  }
  .ct {
    text-align: left;
    display: inline-block;
    div {
      line-height: 18px;
    }
  }
}
.look {
  font-size: 14px;
  font-weight: 400;
  color: #3296fa;
}
.time{
  display:flex;
  justify-content: space-between
}
.content {
  font-size: 12px;
  font-weight: 400;
  color: $lighter-text-color;
  padding:0;
}
.sub-text {
  display: block;
  color: $lighter-text-color;
  font-size: 11px;
  margin-bottom: 8px;
  font-weight: 400;
  .tu {
    width: 42px;
    height: 42px;
    background: #3296fa;
  }
}
  .color-black {
    font-size: 11px;
    color: $lighter-text-color;
  }
  .u-c-b {
    border-bottom: 1px solid #E9E9E9;
  }
  .page-bottom-btn {
    position: absolute;
    z-index: 100;
    left: 0;
    bottom: 0;
    height: 60px;
    background-color: #fff;
    width: 100%;
    padding: 12px 16px;
    .btnTotal {
      font-size: 16px;
      .btn1 {
        margin-right:6px;
        width: 90px;
      }
      .btn2 {
        width: 90px;
        margin-right:6px;
        color: #f55545;
      }
      .btn3 {
        width: 140px;
      }
    }
  }
.a-s-w {
  margin-top: 10px;
}
</style>
