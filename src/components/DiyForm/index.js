function createDiyFormData(tar) {
  let raw = {
    'fields': [
    ],
    'formRef': 'elForm',
    'formModel': 'formData',
    'size': 'small',
    'labelPosition': 'right',
    'labelWidth': 100,
    'formRules': 'rules',
    'gutter': 15,
    'disabled': false,
    'span': 12,
    'formBtns': true
  }
  if (tar) {
    raw = Object.assign(raw, tar)
  }
  return raw
}

export default {
  data() {
    return {
    }
  },
  computed: {
    token() {
      return ''
    }
  },
  methods: {
    _getSplitData(val) {
      if (val) {
        return val.split(',')
      }
      return []
    },
    // 附件上传时的下载
    _downLoadFile(item) {
      let url = item.url
      if (item.response && item.response.data) {
        url = item.response.data.url
      }
      this.$http.get('ucenterGh/file/download', {
        filePath: url
      }, { responseType: 'arraybuffer' }).then((res) => {
        this.$downloadFile(res, item.name || item.fileName)
      })
    },
    _setFieldItem(data, applyForm, type, modulesEdit, formId) {
      if (type === 'edit' && data.tag === 'el-upload') {
        data.action = this.$http.makeUrl('ucenterGh/file/upload')
        data.headers = { token: this.token }
        data['on-preview'] = this._downLoadFile
      }
      data.defaultValue = applyForm[data.formId] || ''
      // 权限
      if (modulesEdit[formId] === 0) {
        data.hidden = true
      }
      if (modulesEdit[formId] === 1) {
        // 为1得是只读
        data.disabled = true
      }
    },
    // 生成自定义表布局数据结构
    _formatLayout(layoutData, applyData, type) {
      const applyForm = {}
      // 模块权限
      const modulesEdit = {}
      let approvalModuleInstanceList = []
      // 如果是编辑之前的数据
      if (applyData) {
        // 填充数据
        approvalModuleInstanceList = applyData.approvalModuleInstanceList || applyData.approvalModuleInstanceEntitieList || []
        approvalModuleInstanceList.sort((a, b) => {
          return a.moduleOrder - b.moduleOrder
        })
        approvalModuleInstanceList.forEach((fd) => {
          applyForm[parseInt(fd.moduleKey)] = fd.moduleVal
          if (fd.tag === 'el-upload') {
            if (fd.fileJson) {
              applyForm[parseInt(fd.moduleKey)] = JSON.parse(fd.fileJson)
            }
            // 数组的数据
          } else if (fd.tag === 'fc-date-duration' || (fd.tag === 'el-select' && fd.multiple === 0)) {
            applyForm[parseInt(fd.moduleKey)] = this._getSplitData(fd.moduleVal)
          }
        })
        // 生成权限
        const positionInfo = applyData.positionInfo || {}
        const modulesList = JSON.parse(positionInfo.ifModulesEdit || '[]')
        modulesList.forEach((m) => {
          modulesEdit[m.formId] = m.formOperate
        })
        layoutData.approvalBusinessEntity = applyData.approvalBusinessEntity
      }
      // 生成表单的数据
      const approvalFormEntityList = layoutData.approvalFormEntityList || []
      const fields = []
      console.log(applyForm)
      approvalFormEntityList.forEach((v) => {
        if (v.moduleContext) {
          const module = JSON.parse(v.moduleContext)
          this._setFieldItem(module, applyForm, type, modulesEdit, module.formId)
          if (module.children && module.children.length > 0) {
            // 会有自定义组件的情况
            module.children.forEach((c) => {
              this._setFieldItem(c, applyForm, type, modulesEdit, module.formId)
            })
          }
          fields.push(module)
          // 组装多银行账户
          if (module.listComponent) {
            for (let count = 1; count < 100; count++) {
              const formId = module.formId + 100000 + (100 * count) + 1
              if (applyForm[formId] !== undefined) {
                const newAccount = JSON.parse(JSON.stringify(module))
                this._createNewAccount(newAccount, count)
                this._setFieldItem(newAccount, applyForm, type, modulesEdit, module.formId)
                if (newAccount.children && newAccount.children.length > 0) {
                  // 会有自定义组件的情况
                  newAccount.children.forEach((c) => {
                    this._setFieldItem(c, applyForm, type, modulesEdit, module.formId)
                  })
                }
                newAccount.rawFormId = module.formId
                fields.push(newAccount)
              } else {
                return
              }
            }
          }
        }
      })
      layoutData.fields = fields
      return createDiyFormData(layoutData)
    },
    _createNewAccount(row, count) {
      row.formId = row.formId + 100000 + (100 * count)
      row.renderKey = row.formId + new Date().getTime()
      row.vModel = `field${row.formId}`
      if (row.componentName) {
        row.componentName = `row${row.formId}`
      }
      if (row.children && row.children.length > 0) {
        row.children.forEach((v) => {
          this._createNewAccount(v, count)
        })
      }
    },
    _setApprovalFormModuleAddFormItem(resData, v, index) {
      let moduleVal = resData[v.vModel]
      let multiple = 1
      let fileJson = ''
      // 数据格式化
      if (v.tag === 'el-upload') {
        const list = resData[v.vModel] || []
        const newList = []
        list.forEach((file) => {
          let fileItem = file
          // 兼容原来的数据和新家的数据
          if (file.response && file.response.data) {
            fileItem = file.response.data
          }
          newList.push({
            url: fileItem.url,
            fileDwg: fileItem.fileDwg,
            fileSize: fileItem.fileSize,
            name: fileItem.name
          })
        })
        moduleVal = ''
        fileJson = JSON.stringify(newList)
        // 减少数据
        delete v.action
        delete v.headers
        delete v.defaultValue
      } else if (typeof moduleVal === 'object') {
        moduleVal = resData[v.vModel].join(',')
        // 多选框
        if (v.tag === 'el-select') {
          multiple = 0
        }
      }
      return {
        'moduleContext': JSON.stringify(v),
        'moduleKey': v.formId,
        'moduleOrder': index,
        'moduleVal': moduleVal,
        multiple,
        'tag': v.tag,
        'fileJson': fileJson,
        'orgCode': this.$commonQueryParam.orgCode,
        'orgId': this.$commonQueryParam.orgId
      }
    },
    // 获取用于提交的数据
    _getApprovalFormModuleAddFormList(formLayout, resData) {
      const fields = formLayout.fields || []
      const approvalFormModuleAddFormList = []
      fields.forEach((v, index) => {
        // 自定义字段保存
        if (v.children && v.children.length > 0) {
          // 会有自定义组件的情况
          v.children.forEach((c, cIndex) => {
            approvalFormModuleAddFormList.push(
              this._setApprovalFormModuleAddFormItem(resData, c, index * 100 + cIndex)
            )
          })
        } else {
          // 普通情况
          approvalFormModuleAddFormList.push(
            this._setApprovalFormModuleAddFormItem(resData, v, index)
          )
        }
      })
      let money = 0
      approvalFormModuleAddFormList.forEach((v) => {
        if (v.tag === 'fc-amount') {
          money += parseFloat(v.moduleVal || 0) || 0
        }
      })
      return {
        money,
        approvalFormModuleAddFormList
      }
    },
    _createModelForm(fields) {
      const model = {}
      fields.forEach((v) => {
        if (v.layout === 'rowFormItem') {
          if (v.children && v.children.length) {
            v.children.forEach((c) => {
              model[c.vModel] = c.defaultValue
            })
          }
        } else {
          model[v.vModel] = v.defaultValue
        }
      })
      return model
    }
  }
}
