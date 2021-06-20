<template>
  <div v-if="dialogVisible">
    <van-form ref="jsxPreview">
      <div v-for="formItemLayout in formLayout.fields" :key="formItemLayout.renderKey">
        <div v-if="formItemLayout.layout === 'rowFormItem'">
          <div v-if="formItemLayout.children">
            <van-cell-group>
              <template #title>
                <div class="col-title">
                  <div class="col-title-content">{{ formItemLayout.label }}</div>
                </div>
              </template>
              <div v-for="child in formItemLayout.children" :key="child.renderKey">
                <form-item :detail="child" :model-form="modelForm"/>
              </div>
            </van-cell-group>
          </div>
        </div>
        <div v-else>
          <form-item :detail="formItemLayout" :model-form="modelForm"/>

        </div>
      </div>
      <van-button round block type="info" native-type="submit" @click="submitHandler">发布</van-button>

    </van-form>
  </div>
</template>

<script>
import layoutMixins from './index'
import FormItem from './formItem'
import { mapGetters } from 'vuex'

export default {
  name: 'DiyFormEdit',
  components: {
    FormItem
  },
  mixins: [layoutMixins],
  data() {
    return {
      dialogVisible: false,
      formLayout: {
        fields: []
      },
      loading: false,
      applyId: '',
      applyData: {},
      modelForm: {},
      noDraft: false,
      config: {}
    }
  },
  computed: {
    ...mapGetters(['orgEncode', 'orgId', 'orgName'])
  },
  created() {
  },
  // 关闭
  deactivated() {
  },
  methods: {
    open(moduleFormId, applyId, config) {
      console.log(111)
      // 配置
      this.config = config || {}
      // 数据
      let noDraft = false
      this.applyId = applyId || ''
      this.formLayout = {
        fields: []
      }
      const opList = [
        // 查自定义模板的数据
        this.$http.get('approval-village/AppBusinessController/findApprovalFormById', {
          id: moduleFormId,
          orgCode: config.orgEncode
        })
      ]
      if (applyId) {
        // 查询已经填写的数据
        opList.push(
          this.$http.get('approval-village/AppBusinessController/findDetailById', {
            id: applyId
          }).then((res) => {
            const formDetail = res.data
            const approvalBusinessEntity = formDetail.approvalBusinessEntity || {}
            const code = approvalBusinessEntity.nextNodeCode || approvalBusinessEntity.currentNodeCode
            if (code) {
              // 查询表单权限
              return this.$http.get('approval/AppBusinessController/findProcessNodeByNodeCode', {
                approvalProcessId: approvalBusinessEntity.approvalProcessId,
                nodeCode: code
              }).then((pires) => {
                formDetail.positionInfo = pires.data || {}
                return res
              })
            } else {
              return res
            }
          })
        )
      }
      Promise.all(opList).then((res) => {
        // 如果是编辑之前的数据
        if (res[1]) {
          const applyData = res[1].data || {}
          // 已经保存了的，不能再存为草稿
          if (applyData.isDraft === 1) {
            noDraft = true
          }
        }
        // 格式化自定义布局
        this.formLayout = this._formatLayout(res[0] && res[0].data, res[1] && res[1].data, 'edit')
        this.modelForm = this._createModelForm(this.formLayout.fields)
        this.applyData = (res[1] && res[1].data) || {}
        this.noDraft = noDraft
        return res
      }).then((resList) => {
        const href = this.checkJump(resList[0].data)
        if (href) {
          window.open(href)
        } else {
          this.dialogVisible = true
        }
        return resList
      })
    },
    // 有跳转超链接，那就直接跳转
    checkJump(formDetail) {
      const approvalFormEntityList = formDetail.approvalFormEntityList || []
      for (let i = 0; i < approvalFormEntityList.length; i++) {
        const moduleContext = approvalFormEntityList[i].moduleContext
        const data = JSON.parse(moduleContext)
        if (data.jump && data.href) {
          return data.href
        }
      }
      return ''
    },
    submit() {
      console.log(99, this.modelForm)
    },
    submitForm() {
      return new Promise((resolve, reject) => {
        resolve(this.modelForm)
      })
    },
    // 保存
    okHandler() {
      this.submitForm().then((resData) => {
        this.sendServer(resData).then(() => {
          this.loading = false
          this.dialogVisible = false
          this.$message.success('操作成功！')
          this.$emit('ok')
        }).catch((err) => {
          console.log(err)
          this.loading = false
        })
      })
    },
    // 存为草稿
    saveDraft() {
      const data = this.$refs.jsxPreview.getFormData()
      this.sendServer(data, true).then(() => {
        this.loading = false
        this.dialogVisible = false
        this.$message.success('操作成功！')
        this.$emit('ok')
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
    },
    // 提交
    submitHandler() {
      this.submitForm().then((resData) => {
        this.sendServer(resData).then((res) => {
          // 保存成功
          this.$emit('ok')
          // phid
          const phid = res.data
          this.diyFormDialogSubmit({
            formInstanceId: phid,
            formId: this.formLayout.phid
          }).finally(() => {
            this.loading = false
            this.dialogVisible = false
          })
        }).catch((err) => {
          console.log(err)
          this.loading = false
        })
      })
    },
    // 送审部分
    // diyFormDialogSubmit(detail) {
    //   this.$refs.selectProcessDialog.selectCheck({
    //     formInstanceId: detail.formInstanceId,
    //     formId: detail.formId
    //   })
    // },
    sendServer(resData, isDraft) {
      const diyFormData = this._getApprovalFormModuleAddFormList(this.formLayout, resData)
      const approvalFormModuleAddFormList = diyFormData.approvalFormModuleAddFormList
      // 如果是快速申请
      if (this.config.type === 'quickApply') {
        this.applyId = ''
      }
      let url = 'approval-village/h5appcomplain/complaintContext'
      if (this.applyId) {
        url = 'approval/AppBusinessController/edit'
      }
      const postData = {
        'orgCode': this.orgEncode,
        'orgId': this.orgId,
        'isDraft': isDraft === true ? 0 : 1,
        formId: this.formLayout.phid,
        formName: this.formLayout.formName,
        userName: this.$commonQueryParam.phCreator,
        applyUserId: this.$commonQueryParam.phUserId,
        'phid': this.applyId,
        applyAmount: diyFormData.money,
        approvalProcessTypeId: '1',
        approvalFormModuleAddFormList
      }
      // 如果是重新申请
      if (this.config.type === 'reApply') {
        url = 'approval/AppBusinessController/reAdd'
        // const approvalBusinessEntity = this.applyData.approvalBusinessEntity || {}
        postData.oldInstanceId = this.applyId
      }
      this.loading = true
      // 保存
      return this.$http.postFormData(url, postData)
    },
    // 对应多个审批流就要选择，只有一个那就不用
    selectCheck(config) {
      this.list = []
      this.radio = ''
      this.formInstanceId = config.formInstanceId || ''
      this.approvalProcessTypeId = config.approvalProcessTypeId || ''
      return this.$http.get('approval/AppBusinessController/findAllSuitableProcess', {
        orgId: this.$commonQueryParam.orgId,
        orgCode: this.$commonQueryParam.orgCode,
        formInstanceId: this.formInstanceId,
        formId: config.formId || ''
      }).then((res) => {
        const list = res.data || []
        if (list.length) {
          if (list.length > 1) {
            this.list = list
            this.open()
          } else {
            this.radio = list[0].phid
            return this.sendProcess().then(() => {
              this.close()
            })
          }
        } else {
          this.$message({
            type: 'warning',
            message: '该单据无对应审批流！'
          })
          return false
        }
      })
    },
    sendProcess() {
      return this.$http.post('approval/AppBusinessController/addAudit', {
        'formInstanceId': this.formInstanceId,
        'processId': this.radio,
        'approvalProcessTypeId': this.approvalProcessTypeId,
        'creatId': this.$commonQueryParam.phUserId,
        'orgId': this.$commonQueryParam.orgId
      })
    },
    diyFormDialogSubmit(detail) {
      return this.$refs.selectProcessDialog.selectCheck({
        formInstanceId: detail.formInstanceId,
        formId: detail.formId,
        approvalProcessTypeId: '1'
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/style/_var.scss";
@import "~@/style/theme/theme-color.scss";
</style>
