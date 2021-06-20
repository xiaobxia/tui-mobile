<template>
  <van-popup v-model="showPicker" position="bottom">
    <div v-if="showPicker">
      <div v-if="step === 1">
        <van-datetime-picker
          v-model="startDate"
          :min-date="startBookDate"
          :max-date="maxDate"
          :formatter="formatter"
          :item-height="itemHeight"
          type="year-month"
          title="选择开始年月"
          confirm-button-text="下一步"
          @cancel="onCancel"
          @confirm="next"
        />
      </div>
      <div v-if="step === 2">
        <van-datetime-picker
          v-model="endDate"
          :min-date="startDate"
          :max-date="endMax"
          :formatter="formatter"
          :item-height="itemHeight"
          type="year-month"
          title="选择结束年月"
          @cancel="onCancel"
          @confirm="onConfirm"
        />
      </div>
    </div>
  </van-popup>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  name: 'YearMonthRangeSelect',
  props: {
    format: {
      type: String,
      default: 'YYYY-MM'
    },
    // 是否只能选择同年
    sameYear: {
      type: Boolean,
      default: false
    },
    minDate: {
      type: Date,
      default: () => {
        return new Date(2020, 0, 1)
      }
    }
  },
  data() {
    return {
      showPicker: false,
      startDate: '',
      endDate: '',
      step: 1,
      startBookDate: '',
      itemHeight: (72 / 75) * window.adaptive.fontSize
    }
  },
  computed: {
    maxDate() {
      return new Date(this.minDate.getFullYear() + 1, 11, 1)
    },
    // 结束的最大选择日期
    endMax() {
      if (this.sameYear && this.startDate) {
        return new Date(this.startDate.getFullYear(), 11, 1)
      } else {
        return this.maxDate
      }
    },
    ...mapGetters([
      'bookInfo'
    ])
  },
  created() {
    // console.log(this.bookInfo, 'this.bookInfothis.bookInfothis.bookInfothis.bookInfo')
    // this.startBookDate = new Date(+(this.bookInfo.enableDate.split('-')[0]),
    //   +(this.bookInfo.enableDate.split('-')[1]),
    //   +(this.bookInfo.enableDate.split('-')[2]))
    // console.log(this.startBookDate, 'this.startBookDate')
  },
  // 关闭
  deactivated() {
    this.showPicker = false
  },
  methods: {
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${parseInt(val)}月`
      }
      return val
    },
    open(dateList) {
      console.log(dateList, 'dateList')
      this.step = 1
      this.startDate = new Date(dateList[0])
      this.startBookDate = new Date(+(this.bookInfo.enableDate.split('-')[0]),
        +(this.bookInfo.enableDate.split('-')[1]) - 1,
        +(this.bookInfo.enableDate.split('-')[2]))
      console.log(this.bookInfo, 'this.bookInfo')
      console.log(this.startBookDate, 'this.startBookDate')
      this.endDate = ''
      this.showPicker = true
    },
    next() {
      this.step = 2
    },
    close() {
      this.showPicker = false
    },
    onCancel() {
      this.showPicker = false
    },
    onConfirm(value) {
      this.$nextTick(() => {
        // 重新赋值，vant有bug
        this.endDate = value
        this.$emit('ok', [
          moment(this.startDate).format(this.format),
          moment(this.endDate).format(this.format)
        ])
        this.showPicker = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .van-nav-bar__left {
    height: 44px;
    font-size: 18px;
  }
</style>
