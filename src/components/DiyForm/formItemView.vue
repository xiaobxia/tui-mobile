<template>
  <div v-if="!detail.hidden">
    <template v-if="detail.tag === 'el-input'">
      <van-cell :title="detail.label">{{ detail.defaultValue }}</van-cell>
    </template>
    <template v-if="detail.tag === 'h3'">
      <div class="col-title">
        <div class="col-title-content">{{ detail.childText }}</div>
      </div>
    </template>
    <template v-if="detail.tag === 'el-divider'">
      <van-divider />
    </template>
    <template v-if="detail.tag === 'a'">
      <van-cell :title="detail.label">
        <a :href="detail.href" class="theme-text">{{ detail.jump ? detail.childText : detail.href }}</a>
      </van-cell>
    </template>
    <template v-if="detail.tag === 'fc-amount'">
      <van-cell :title="detail.label">{{ $formatMoney(detail.defaultValue) }}</van-cell>
      <div class="explain-text">大写：{{ getAmountChinese(modelForm[detail.vModel]) }}</div>
    </template>
    <!--时间区间-->
    <template v-if="detail.tag === 'fc-date-duration'">
      <van-cell :title="detail.label">{{ detail.defaultValue && detail.defaultValue.join(' - ') }}</van-cell>
    </template>
    <!--下拉框-->
    <template v-if="detail.tag === 'el-select'">
      <van-cell :title="detail.label">{{ formatSelectValue(detail.defaultValue) }}</van-cell>
    </template>
    <!--附件-->
    <!--下拉框-->
    <template v-if="detail.tag === 'el-upload'">
      <van-cell :title="detail.label" is-link @click="viewFile(detail.defaultValue)">
        <!--<div>-->
        <!--<div v-if="detail.defaultValue && detail.defaultValue.length > 0">-->
        <!--<div v-for="(item, index) in detail.defaultValue" :key="index" class="file-item-bg" >-->
        <!--<div @click="downLoadFile(item)">{{ item.name }}</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
      </van-cell>
      <file-view ref="fileView"/>
    </template>
  </div>
</template>

<script>
import FileView from '@/components/FileView'
export default {
  name: 'FormItemView',
  components: {
    FileView
  },
  props: {
    detail: {
      type: Object,
      default: () => {
        return {}
      }
    },
    modelForm: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      value: '',
      show: false,
      accountList: []
    }
  },
  watch: {
    detail() {
      this.initDetail()
    }
  },
  created() {
    this.initDetail()
  },
  // 关闭
  deactivated() {
    this.show = false
  },
  methods: {
    open(accountList) {
      this.accountList = accountList
      this.show = true
    },
    backHandler() {
      this.$router.history.go(-1)
    },
    formatAccountNo(number) {
      number = '' + number
      const start = number.substr(0, 4)
      const end = number.substr(-4, 4)
      return `${start}****${end}`
    },
    close() {
      this.show = false
      this.$emit('close')
    },
    initDetail() {
    },
    getAmountChinese(val) {
      const amount = +val
      if (Number.isNaN(amount) || amount < 0) return ''
      const NUMBER = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
      const N_UNIT1 = ['', '拾', '佰', '仟']
      const N_UNIT2 = ['', '万', '亿']
      const D_UNIT = ['角', '分', '厘', '毫']
      const [integer, decimal] = amount.toString().split('.')
      if (integer && integer.length > 12) return '金额过大无法计算'
      let res = ''
      // 整数部分
      if (integer) {
        for (let i = 0, len = integer.length; i < len; i++) {
          const num = integer.charAt(i)
          const pos = len - i - 1 // 排除个位后 所处的索引位置
          if (num === '0') { // 当前位 等于 0 且下一位也等于 0 则可跳过计算
            if (i === len - 1) {
              if (integer.length === 1) res += '零' // 0.35 这种情况不可跳过计算
              break
            }
            if (integer.charAt(i + 1) === '0') continue
          }
          res += NUMBER[num]
          if (parseInt(num)) res += N_UNIT1[(pos) % 4]
          if (pos % 4 === 0) res += N_UNIT2[Math.floor(pos / 4)]
        }
      }
      res += '圆'
      // 小数部分
      if (parseInt(decimal)) {
        for (let i = 0; i < 4; i++) {
          const num = decimal.charAt(i)
          if (parseInt(num)) res += NUMBER[num] + D_UNIT[i]
        }
      } else {
        res += '整'
      }
      return res
    },
    formatSelectValue(value) {
      if (typeof value === 'object') {
        return value.join(' ， ')
      } else {
        return value
      }
    },
    downLoadFile(item) {
      this.$http.get('ucenter/file/download', {
        filePath: item.url
      }, { responseType: 'arraybuffer' }).then((res) => {
        this.$downloadFile(res, item.name || item.fileName)
      })
    },
    toApprovalSteps() {
      this.$router.push({
        name: 'ApprovalSteps',
        query: {
          name: '审批详情'
        }
      })
    },
    // 查看附件方法
    viewFile(fileList) {
      fileList = fileList || []
      const list = []
      fileList.forEach((item) => {
        list.push({
          name: item.name,
          url: item.url
        })
      })
      // this.$emit('viewFile', list)
      this.$refs.fileView.open(list)
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
  padding: 12px 16px;
}
.sub-text {
  display: block;
  color: $lighter-text-color;
  font-size: 12px;
  margin-bottom: 8px;
  .tu {
    width: 42px;
    height: 42px;
    background: #3296fa;
  }
}
.detail-card {
  position: relative;
  height: 32px;
  line-height: 32px;
  background: rgba(241, 242, 243, 1);
  border-radius: 4px;
  font-size: 13px;
  padding: 0 12px;
  margin-bottom: 8px;
  &.large {
    height: 64px;
    .item {
      position: relative;
      padding: 0 12px;
      line-height: 32px;
    }
  }
  .left {
    text-align: left;
  }
  .right {
    text-align: right;
  }
  .tag-icon {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 22px;
    height: 22px;
    border-radius: 100%;
    line-height: 22px;
    text-align: center;
    font-size: 12px;
    color: #fff;
    &.blue {
      background-color: #3296fa;
    }
    &.red {
      background-color: #ef3f3f;
    }
  }
}
  .explain-text {
    padding: 10px 16px;
    background-color: #fff;
  }
</style>
