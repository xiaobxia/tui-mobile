<template>
  <div v-if="dialogVisible">
    <van-form>
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
                <form-item-view :detail="child" :model-form="modelForm"/>
              </div>
            </van-cell-group>
          </div>
        </div>
        <div v-else>
          <form-item-view :detail="formItemLayout" :model-form="modelForm"/>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
import layoutMixins from './index'
import FormItemView from './formItemView'

export default {
  name: 'DiyFormEdit',
  components: {
    FormItemView
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
  created() {
  },
  // 关闭
  deactivated() {
  },
  methods: {
    getFormLayout() {
      return {
        ...this.formLayout
      }
    },
    open(moduleFormId, applyId, config) {
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
          id: moduleFormId
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
              return this.$http.get('approval-village/AppBusinessController/findProcessNodeByNodeCode', {
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
      return Promise.all(opList).then((res) => {
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
    // 保存
    okHandler() {
      this.$refs.jsxPreview.submitForm().then((resData) => {
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
      this.$refs.jsxPreview.submitForm().then((resData) => {
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
      let url = 'approval/AppBusinessController/add'
      if (this.applyId) {
        url = 'approval/AppBusinessController/edit'
      }
      const postData = {
        'orgCode': this.$commonQueryParam.orgCode,
        'orgId': this.$commonQueryParam.orgId,
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
      return this.$http.post(url, postData)
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
