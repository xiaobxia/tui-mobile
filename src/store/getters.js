const getters = {
  userInfo: state => state.user.userInfo,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  ifAddRouters: state => state.permission.ifAdd,
  // app
  appTopTitle: state => state.app.appTopTitle,
  appBottomTitle: state => state.app.appBottomTitle,
  menuList: state => state.app.menuList,
  menuListFlat: state => state.app.menuListFlat,
  menuListLast: state => state.app.menuListLast,
  orgInfo: state => state.app.orgInfo,
  firstOrgList: state => state.app.firstOrgList,
  ifGetUserOrg: state => state.app.ifGetUserOrg,
  userOrgTree: state => state.app.userOrgTree,
  keepaliveNames: state => state.app.keepaliveNames,
  userBookList: state => state.app.userBookList,
  bookInfo: state => state.app.bookInfo,
  // approval
  preSearchForm: state => state.approval.preSearchForm,
  hasSearchForm: state => state.approval.hasSearchForm,
  mineSearchForm: state => state.approval.mineSearchForm,
  // 获取审批中的列表页的数据个数
  preTotal: state => state.approval.preTotal,
  hasTotal: state => state.approval.hasTotal,
  mineTotal: state => state.approval.mineTotal

}

export default getters
