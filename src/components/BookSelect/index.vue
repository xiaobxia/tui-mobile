<template>
  <div class="book-select">
    <div class="ellipsis-text" @click="showPicker = true">{{ currentBook.name }}</div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        :columns="userBookList"
        :item-height="itemHeight"
        show-toolbar
        value-key="name"
        title="选择账本"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BookSelect',
  props: {
    currentBook: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      showPicker: false,
      itemHeight: (72 / 75) * window.adaptive.fontSize
    }
  },
  computed: {
    ...mapGetters([
      'userBookList',
      'bookInfo'
    ])
  },
  created() {
  },
  // 关闭
  deactivated() {
    this.showPicker = false
  },
  methods: {
    onCancel() {
      this.showPicker = false
    },
    onConfirm(value) {
      this.showPicker = false
      if (this.currentBook.phid !== value.phid) {
        this.$store.commit('SET_BOOK_INFO', value)
        this.$emit('change', value)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/style/_var.scss";
  @import "~@/style/theme/theme-color.scss";
  .book-select {
    /deep/ {
      .van-picker-column__item {
        // height: 36px!important;
      }
    }
  }
</style>
