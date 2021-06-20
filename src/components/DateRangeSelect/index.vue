<template>
  <van-popup
    v-model="show"
    :style="{ height: '100%', width: '100%' }"
    position="left"
  >
    <div v-if="show">
      <div class="van-nav-bar__left" @click="close">
        <van-icon name="arrow-left" />
      </div>
      <van-calendar
        v-model="show"
        :default-date="defaultDate"
        :lazy-render="false"
        :show-confirm="false"
        :min-date="minDate"
        :max-date="maxDate"
        :color="color"
        :poppable="false"
        title="选择日期"
        type="range"
        @confirm="onConfirm"
      />
    </div>
  </van-popup>
</template>

<script>
import moment from 'moment'
export default {
  name: 'DateRangeSelect',
  props: {
    format: {
      type: String,
      default: 'YYYY-MM-DD'
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
      show: false,
      color: '#3296FA',
      defaultDate: []
    }
  },
  computed: {
    maxDate() {
      return new Date(this.minDate.getFullYear() + 1, 11, 31)
    }
  },
  created() {
  },
  // 关闭
  deactivated() {
    this.show = false
  },
  methods: {
    open(defaultDate) {
      this.show = true
      this.defaultDate = defaultDate || []
    },
    close() {
      this.show = false
    },
    onConfirm(date) {
      const [start, end] = date
      this.$emit('ok', [
        moment(start).format(this.format),
        moment(end).format(this.format)
      ])
      this.show = false
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
