<template>
  <div class="com-approval-steps-col">
    <van-steps :active="activeS" direction="vertical" inactive-icon="checked" active-icon="circle">
      <van-step v-for="(item, index) in stepList" :key="index" active-icon inactive-icon>
        <div class="time" style="display:flex;justify-content: space-between">
          <span class="sub-Bigtext">
            <div v-if="index === 0">{{ item.phCreator }}  发起审批</div>
            <div v-else>
              <div v-if="item.approvalUsersName">{{ getShowUserName(item) }}  {{ getDT(item) }}</div>
              <div v-else>{{ getShowUserName(item) }}  {{ getDT(item) }}</div>
            </div>
          </span>
          <span class="sub-text">
            <div class="color-black">{{ item.phUpdateDt }}</div>
          </span>
        </div>
        <div class="content">
          <div v-if="index !== 0">
            <div v-if="item.operateLogEntityList && item.operateLogEntityList.length">
              <div v-for="(user, subIndex) in item.operateLogEntityList" :key="subIndex">
                <div class="v-item">
                  <span class="v-label b-tag">
                    <div class="b-t theme-bg"/>
                    审批人：
                  </span>
                  <span class="v-text">{{ user.approvalUserName }}</span>
                </div>
                <div class="v-item">
                  <span class="v-label">审批意见：</span>
                  <span class="v-text">{{ user.operateMessage }}</span>
                </div>
                <div class="v-item">
                  <span class="v-label">审批时间：</span>
                  <span class="v-text">{{ user.phInsertDt }}</span>
                </div>
              </div>
            </div>
            <div>
              <span
                v-if="item.fileList && item.fileList.length"
                class="look sub-look theme-text"
                @click="viewFileHis(item.fileList)"
              >附件({{ item.fileList.length }})</span>
            </div>
          </div>
        </div>
      </van-step>
      <van-step v-if="stepIsFinish" key="ot" active-icon inactive-icon>
        <div class="time" style="display:flex;justify-content: space-between">
          <span class="sub-Bigtext">
            <div>流程结束</div>
          </span>
        </div>
      </van-step>
    </van-steps>
    <file-view ref="fileView"/>
  </div>
</template>

<script>
import FileView from '@/components/FileView'
const STATUS = {
  0: {
    label: '待他人审批',
    value: 0
  },
  1: {
    label: '待我审批',
    value: 1
  },
  2: {
    label: '取消审批',
    value: 2
  },
  3: {
    label: '审批通过',
    value: 3
  },
  4: {
    label: '审批未通过',
    value: 4
  },
  5: {
    label: '审批退回',
    value: 5
  },
  6: {
    label: '审批退回(未送审)',
    value: 6
  }
}
export default {
  components: {
    FileView
  },
  props: {
    detail: {
      type: Object,
      default: () => {
        return {
          approvalNodeOperateLogEntityList: [],
          isFinish: 0
        }
      }
    },
    businessId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      active: 1,
      STATUS,
      stepList: [],
      stepIsFinish: false,
      formTemp: {}
    }
  },
  computed: {
    activeS() {
      const l = this.stepList.length
      if (this.stepIsFinish) {
        return l + 1
      }
      return l
    }
  },
  watch: {
    detail() {
      this.initData()
    }
  },
  created() {
    if (this.businessId) {
      this.$http.get('approval-village/AppBusinessController/findBusinessNodeMessage', {
        businessId: this.businessId
      }).then((res) => {
        const data = res.data || {}
        this.initData(data)
      })
    } else {
      this.initData()
    }
  },
  methods: {
    initData(detail) {
      detail = detail || this.detail
      const approvalNodeOperateLogEntityList = detail.approvalNodeOperateLogEntityList || []
      const newList = []
      approvalNodeOperateLogEntityList.forEach((v) => {
        v.operateType = v.operateType || 0
        if (v.operateType === 0 && v.approvalUsersName === this.$commonQueryParam.phCreator) {
          v.operateType = 1
        }
        newList.push(v)
      })
      this.stepList = newList
      this.stepIsFinish = detail.isFinish === 1
    },
    handleClickItem(file) {
      this.$http.get('ucenter/file/download', { filePath: file.fileUrl }, { responseType: 'arraybuffer' }).then(data => {
        this.$downloadFile(data, file.fileName)
      }).catch(err => {
        console.log('err', err)
      })
    },
    getDT(row) {
      if (row.approvalUsersName) {
        // 有人审批了那就显示审批状态
        return STATUS[row.operateType].label
      } else {
        // 没人审批就显示会签或签
        if (row.signType === 1) {
          return '或签'
        } else if (row.signType === 2) {
          return '会签'
        } else {
          return '选签'
        }
      }
    },
    getShowUserName(row) {
      const approvalPostHisEntity = row.approvalPostHisEntity || {}
      if (row.approvalUsersName) {
        // 有人审批了那就显示审批人
        let text = ''
        if (row.signType === 1) {
          // 或签
          text = row.approvalUsersName
        } else {
          // 会签
          text = this.getPositionUserNames(row).join(',')
        }
        if (!text) {
          text = approvalPostHisEntity.postName
        }
        return text
      } else {
        return approvalPostHisEntity.postName
        // 没人审批就显示岗位
      }
    },
    getPositionUserNames(row) {
      const userList = row.userList || []
      return userList.map((v) => {
        return v.userName
      })
    },
    // 查看附件方法
    viewFileHis(fileList) {
      const list = []
      fileList.forEach((item) => {
        list.push({
          name: item.name,
          url: item.url
        })
      })
      this.$refs.fileView.open(list)
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
  .com-approval-steps-col {
    position: relative;
    display: block;
  }
  .v-line {
    position: absolute;
    top: 0;
    left: 20px;
    height: 100%;
    width: 2px;
    background-color: #ddd;
  }
  .s-img-w {
    display: inline-block;
    vertical-align: top;
    width: 40px;
    .s-img {
      background-color: #fff;
      height: 40px;
      width: 40px;
    }
  }
  .p-w {
    position: relative;
    z-index: 100;
    white-space:nowrap;
  }
  .p-item {
    position: relative;
    display: block;
    margin-bottom: 24px;
    &:last-child {
      margin-bottom: 0;
      &:after {
        z-index: -100;
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 40px;
        background-color: #fff;
      }
    }
    &:first-child {
      &:before {
        z-index: -100;
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        height: 40px;
        width: 100%;
        background-color: #fff;
      }
    }
  }
  .d-t-w {
    display: inline-block;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
    margin-left: 12px;
    .d-e {
      color: #909399;
      font-size: 13px;
    }
    .d-t-t {
      line-height: 40px;
    }
    .d-h {
      line-height: 20px;
      color: #909399;
      font-size: 13px;
    }
  }
  .v-item {
    margin-bottom: 6px;
    &:last-child {
      margin-bottom: 0;
    }
    .v-label, .v-text {
      display: inline-block;
      vertical-align: top;
    }
    .v-label {
      width: 80px;
    }
  }
  .content {
    padding: 10px;
    font-size: 13px;
  }
  .v-label {
    margin-left: 10px;
  }
  .b-tag {
    position: relative;
    margin-left: 10px;
    .b-t{
      content: '';
      display: block;
      height: 14px;
      width: 4px;
      border-radius: 4px;
      position: absolute;
      left: -10px;
      top: 1px;
    }
  }
</style>
