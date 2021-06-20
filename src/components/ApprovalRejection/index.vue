<template>
  <van-popup v-model="show" :style="{ height: '100%', width: '100%' }" position="left">
    <van-nav-bar title="审批退回" left-arrow @click-left="close" />
    <div class="a-p">
      <van-field
        v-model="approvalCommentsExplain"
        :placeholder="processDetail.approvalOnTips || '请输入意见'"
        autosize
        rows="1"
        label-width="3em"
        style="box-shadow: 0 -4px 4px 4px #efefef;"
        type="textarea"
      />
      <div class="top">
        <div class="bigTitle">选择退回节点</div>
        <van-steps
          :active="rejectApply.length"
          direction="vertical"
          inactive-icon="checked"
          active-icon="circle"
        >
          <van-radio-group v-model="reject">
            <van-step v-for="(value, index) in rejectApply" :key="index" class="steps">
              <van-radio :name="value.phid" :icon-size="iconSize" >{{ value.nodeName }}</van-radio>
            </van-step>
          </van-radio-group>
        </van-steps>
      </div>
      <div class="top">
        <div>附件</div>
      </div>
      <div class="up-b">
        <van-uploader v-model="fileList" :after-read="afterRead" multiple />
      </div>
      <div class="bottom-btn">
        <van-button :loading="loading" type="primary" loading-text="图片上传中..." block @click="rejectionSubmission()">退回</van-button>
      </div>
    </div>
  </van-popup>
</template>

<script>
import LockTag from '@/components/LockTag'
import { Toast } from 'vant'

function createForm(tar) {
  let raw = {
    'operateMessage': '',
    'userId': '',
    'rejectNodeId': '',
    'operateType': '3',
    'files': []
  }
  if (tar) {
    raw = Object.assign(raw, tar)
  }
  return raw
}
export default {
  name: 'ApprovalRejection',
  components: {
    LockTag
  },
  data() {
    return {
      form: createForm(),
      rejectApply: [],
      fileList: [],
      fileInfo: [],
      approvalCommentsExplain: '',
      reject: '',
      phId: '',
      iconSize: `${window.adaptive.fontSize * 0.5}px`,
      show: false,
      loading: false,
      detail: {},
      lineWidth: 6,
      lineColor: '#000000',
      bgColor: '',
      resultImg: '',
      isCrop: false,
      processDetail: {}
    }
  },
  created() {},
  // 关闭
  deactivated() {
    this.show = false
  },
  methods: {
    open(detail) {
      this.approvalCommentsExplain = ''
      this.form = createForm()
      this.fileList = []
      this.detail = detail
      this.queryProcess()
      this.getRejectNode()
      this.show = true
    },
    queryProcess() {
      this.loading = true
      return this.$http.get('approval-village/AppBusinessController/findProcessById', {
        id: this.$route.query.processId
      }).then((res) => {
        this.loading = false
        this.processDetail = res.data || {}
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
    },
    close() {
      this.show = false
      this.$emit('close')
    },
    // 此处选中附件图片时调用上传附件接口
    afterRead(file) {
      this.uploadFile(file.file)
    },
    backHandler() {
      this.$router.history.go(-1)
    },
    // 获取退回节点
    getRejectNode() {
      return this.$http.get('approval-village/AppBusinessController/findApprovalBusinessNodeList', {
        businessId: this.$route.query.phid
      }).then(({ data }) => {
        this.rejectApply = data
      })
    },
    // 调用后端给的上传接口然后接收后端给的数据返回给下一个退回接口
    uploadFile(file) {
      this.loading = true
      const formData = new FormData()
      // 向 formData 对象中添加文件
      formData.append('file', file)
      formData.append('type', 8)
      return this.$http
        .postFormData(`ucenter/file/upload`, formData)
        .then((res) => {
          if (res.data) {
            const data = res.data
            if (!data.fileDwg || !data.fileSize || !data.url || !data.name) {
              Toast.fail.error('上传失败!')
              return
            }
            // 此处用于给对象赋值为上传附件的一个或者多个数组对象
            this.form.files.push({
              name: data.name,
              url: data.url,
              fileDwg: data.fileDwg,
              fileSize: data.fileSize
            })
          }
          this.loading = false
        }).catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    // 退回按钮对应接口方法
    rejectionSubmission() {
      if (this.processDetail.approvalOpinionRules.indexOf('3') !== -1) {
        if (!this.approvalCommentsExplain) {
          Toast.fail('请输入审批意见！')
          return false
        }
      }
      this.submit()
    },
    success() {
      this.show = false
      this.$emit('ok')
    },
    handleReset() { // 清除
      this.$refs.esign.reset()
    },
    submit() { // 获取base64
      const data = {
        ...this.form
      }
      data.userId = this.$commonQueryParam.phUserId
      data.approvalUserId = this.$commonQueryParam.phUserId
      data.approvalUserName = this.$commonQueryParam.phCreator
      data.formInstanceId = this.$route.query.formInstanceId
      data.processId = this.$route.query.processId
      data.businessId = this.$route.query.phid
      data.operateMessage = this.approvalCommentsExplain
      data.rejectNodeId = this.reject
      const approvalBusinessFileList = []
      data.files.forEach((f) => {
        approvalBusinessFileList.push(f)
      })
      this.loading = true
      this.$http.postFormData('approval-village/AppBusinessController/processAudit', {
        ...data,
        orgId: this.$commonQueryParam.orgId,
        approvalBusinessFileList
      }).then(() => {
        this.loading = false
        this.success()
      }).catch(() => {
        this.loading = false
      })
    },
    toPath(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/style/_var.scss";
@import "~@/style/theme/theme-color.scss";
.a-p {
  position: relative;
  padding-top: 10px;
  padding-bottom: 10px;
  /*height: calc(100vh - 130px);*/
  /*margin-bottom: 80px;*/
}
.a-p .conSign {
  width: 100% !important;
  overflow: hidden;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../assets/sign.png);
}
.a-p .conSign canvas{
  width: 100% !important;
  /*height: 150px !important;*/
  border-bottom: none !important;
}
.top {
  position: relative;
  font-size: 14px;
  padding-left: 10px;
  .bigTitle {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #484848;
  }
  .steps {
    display: flex;
    justify-content: space-between;
    .van-step__title {
      color: #484848;
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    .name {
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #484848;
    }
    .title {
      font-size: 11px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #484848;
    }
  }

  &:before {
    content: "";
    display: inline-block;
    position: absolute;
    left: 0;
    top: 3px;
    width: 4px;
    height: 14px;
    background: $theme-color;
    border-radius: 3px;
  }
  margin: 10px 15px;
}
.bottom-btn {
  width: 100%;
  padding: 0 15px;
/*  position: absolute;
  bottom: -70px;*/
}
.up-b {
  padding: 0 15px;
}
.time {
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  padding-right:50px ;

  // div {
  //   display: flex;
  //   align-items: center;
  //   flex-direction: column;
  //   justify-content: space-around;
  // }
}
</style>
