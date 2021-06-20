<template>
  <div :class="[getClass(status)]" class="approval-tag">
    <span>{{ getName(status) }}</span>
  </div>
</template>

<script>
export default {
  name: 'ApprovalTag',
  props: {
    status: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    getClass(status) {
      const statusMap = {
        '0': 'Aqua',
        '1': 'grey',
        '2': 'yellow',
        '3': 'green',
        '4': 'red',
        '5': 'red',
        '6': 'red'
      }
      return statusMap[status] || ''
    },
    getName(status) {
      const statusMap = {
        '0': '未送审',
        '1': '未审批',
        '2': '审批中',
        '3': '审批通过',
        '4': '审批不通过',
        '5': '审批退回',
        '6': '审批退回(未送审)'
      }
      return statusMap[status] || ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/style/_var.scss";
  @import "~@/style/theme/theme-color.scss";
  .approval-tag {
    position: absolute;
    top: -6px;
    left: -80px;
    text-align: center;
    font-size: 14px;
    width: 120px;
    height: 28px;
    line-height: 26px;
    border: 1px solid #00B853;
    color: #00B853;
    opacity: 0.65;
    transform: rotate(15deg);
    &.Aqua {
      border: 1px solid #7FFFD4;
      color: #7FFFD4;
    }
    &.grey {
      border: 1px solid #484848;
      color: #484848;
    }
    &.green {
      border: 1px solid #00B853;
      color: #00B853;
    }
    &.yellow {
      border: 1px solid #FFC600;
      color: #FFC600;
    }
    &.red {
      border: 1px solid #F55545;
      color: #F55545;
    }
  }
</style>
