<template>
  <van-popup
    v-model="show"
    :style="{ height: '100%', width: '100%' }"
    position="left"
  >
    <van-nav-bar title="审批同意" left-arrow @click-left="close" />
    <div class="a-p">
      <van-field
        v-model="approvalCommentsExplain"
        :placeholder="processDetail.approvalOnTips || '请输入意见'"
        label-width="3em"
        rows="6"
        style="box-shadow: 0 -4px 4px 4px #efefef;"
        type="textarea"
      />
      <div v-if="userList.length">
        <div class="top">
          <div class="bigTitle">选择下一节点审批人</div>
        </div>
        <div class="u-s-w">
          <van-checkbox-group v-model="form.postUserList">
            <div
              v-for="item in userList"
              :key="item.userId"
              class="u-s-i"
            >
              <van-checkbox :name="item.userId">{{ item.userName }}</van-checkbox>
            </div>
          </van-checkbox-group>
        </div>
      </div>
      <div class="top">
        <div>附件</div>
      </div>
      <div class="up-b">
        <van-uploader v-model="fileList" :after-read="afterRead" multiple/>
      </div>
      <div class="bottom-btn">
        <van-button :loading="loading" type="primary" loading-text="图片上传中..." block @click="agree()">同意</van-button>
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
    'operateType': '1',
    'files': [],
    'postUserList': []
  }
  if (tar) {
    raw = Object.assign(raw, tar)
  }
  return raw
}
export default {
  name: 'Completed',
  components: {
    LockTag
  },
  data() {
    return {
      form: createForm(),
      approvalCommentsExplain: '',
      fileList: [],
      show: false,
      loading: false,
      detail: {},
      lineWidth: 6,
      lineColor: '#000000',
      bgColor: '',
      resultImg: '',
      isCrop: false,
      processDetail: {},
      userList: [],
      signList: [] // 签名图片
    }
  },
  created() {
  },
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
      this.checkUser()
      this.show = true
    },
    checkUser() {
      return this.$http.postFormData(`approval-village/approvalBusiness/findNextNodePeoples`, {
        processId: this.$route.query.processId,
        formInstanceId: this.$route.query.formInstanceId
      }).then((res) => {
        const data = res.data || {}
        this.userList = data.userList || []
      })
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
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      this.uploadFile(file.file)
    },
    // 调用后端给的上传接口然后接收后端给的数据返回给下一个退回接口
    uploadFile(file) {
      this.loading = true
      const formData = new FormData()
      // 向 formData 对象中添加文件
      formData.append('file', file)
      formData.append('type', 8)
      return this.$http.postFormData(`ucenter/file/upload`, formData).then((res) => {
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
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    // 点击同意按钮调的接口
    agree() {
      if (this.processDetail.approvalOpinionRules.indexOf('1') !== -1) {
        if (!this.approvalCommentsExplain) {
          Toast.fail('请输入审批意见！')
          return false
        }
      }
      if (this.userList.length && this.form.postUserList.length < 1) {
        Toast.fail('请选择选签人！')
        return false
      }
      this.submit()
    },
    close() {
      this.show = false
      this.$emit('close')
    },
    success() {
      this.show = false
      this.$emit('ok')
    },
    handleReset() { // 清除
      this.$refs.esign.reset()
    },
    submit() {
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
      const approvalBusinessFileList = []
      data.files.forEach((f) => {
        approvalBusinessFileList.push(f)
      })
      // 选签人
      const list = []
      this.userList.forEach((v) => {
        if (this.form.postUserList.indexOf(v.userId) !== -1) {
          list.push(v)
        }
      })
      data.postUserList = list
      this.loading = true
      this.$http.postFormData('approval-village/AppBusinessController/proces11sAudit', {
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
    toPath(path) { // ../../assets/sign.png
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
  // height: 400px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../assets/sign.png);
}
.a-p .conSign canvas{
  text-align: center;
  border-bottom: none !important;
}
  .top {
    position: relative;
    font-size: 14px;
    padding-left: 10px;
    &:before {
      content: '';
      display: block;
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
/*    position: absolute;
    bottom: -70px;*/
  }
  .up-b {
    padding: 0 15px;
  }
  .u-s-w {
    margin-left: 25px;
    .u-s-i {
      margin-bottom: 10px;
    }
  }
</style>
