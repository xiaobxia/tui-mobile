<template>
  <div>
    <div @click="openPick">
      <slot/>
    </div>
    <van-popup v-model="showPicker" position="bottom" get-container="body">
      <van-picker
        v-if="showPicker"
        :columns="columns"
        :item-height="itemHeight"
        :title="title"
        :default-index="defaultIndex"
        value-key="label"
        show-toolbar
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'BetterPick',
  props: {
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    title: {
      type: String,
      default: ''
    },
    valueKey: {
      type: String,
      default: ''
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      showPicker: false,
      defaultIndex: 0,
      itemHeight: (72 / 75) * window.adaptive.fontSize
    }
  },
  created() {
  },
  // 关闭
  deactivated() {
    this.showPicker = false
  },
  methods: {
    findIndex(value) {
      for (let i = 0; i < this.columns.length; i++) {
        const item = this.columns[i]
        if (value === item.value) {
          return i
        }
      }
      return 0
    },
    // 打开筛选框
    openPick() {
      this.showPicker = true
      this.defaultIndex = this.findIndex(this.formData[this.valueKey])
    },
    // 筛选取消
    onCancel() {
      this.showPicker = false
    },
    // 筛选确认
    onConfirm(value) {
      this.formData[this.valueKey] = value.value
      this.showPicker = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/style/_var.scss";
  @import "~@/style/theme/theme-color.scss";
  .lock-tag {
    position: absolute;
    width: 10px;
    height: 36px;
    .top, .bottom {
      position: absolute;
      left: 0;
      height: 10px;
      width: 10px;
      border-radius: 100%;
      background-color: $original-light-2;
    }
    .top {
      top: 0;
    }
    .bottom {
      bottom: 0;
    }
    .line {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      height: 30px;
      width: 6px;
      border: 1px solid #fff;
      background-color: $original-light-7;
      border-radius: 6px;
    }
  }
</style>
