// 返回列表是滚动到上次位置
export default {
  data() {
    return {
      scroll: 0
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // console.log(vm.scroll)
      const scrollView = vm.$refs.scrollView
      // 记录滚动高度
      scrollView.scrollTop = vm.scroll
    })
  },
  beforeRouteLeave(to, from, next) {
    const scrollView = this.$refs.scrollView
    // console.log(scrollView.scrollTop)
    // data中记得定义变量scroll
    this.scroll = scrollView.scrollTop
    next()
  },
  methods: {
    // 重置
    resetScrollView() {
      this.$refs.scrollView.scrollTop = 0
      this.scroll = 0
    }
  }
}
