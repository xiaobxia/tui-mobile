const approval = {
  state: {
    preSearchForm: {},
    hasSearchForm: {},
    mineSearchForm: {},
    preTotal: '',
    hasTotal: '',
    mineTotal: ''

  },
  mutations: {
    // 设置审批中三种状态列表页对应方法
    SET_preSearchForm: (state, preSearchForm) => {
      state.preSearchForm = preSearchForm
    },
    SET_hasSearchForm: (state, hasSearchForm) => {
      state.hasSearchForm = hasSearchForm
    },
    SET_mineSearchForm: (state, mineSearchForm) => {
      state.mineSearchForm = mineSearchForm
    },
    // 获取列表页三个对于total值，并动态展示实现可以实时刷新的效果
    SET_preToal: (state, preTotal) => {
      state.preTotal = preTotal
    },
    SET_hasTotal: (state, hasTotal) => {
      state.hasTotal = hasTotal
    },
    SET_mineTotal: (state, mineTotal) => {
      state.mineTotal = mineTotal
    }

  },
  actions: {
  }
}

export default approval
