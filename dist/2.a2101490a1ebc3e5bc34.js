webpackJsonp([2],{IFrb:function(t,e,n){"use strict";var s=n("t4fs"),a=n("sqb0"),r=n.n(a),o=function(t){return r.a.set("token",t)},i=function(){return r.a.remove("token")};e.a={setLoginToken:function(t){o(t)},setLoginInfo:function(t){s.a.setData("UserInfo",t)},removeLoginAuth:function(){i(),s.a.clearAll()}}},RA2w:function(t,e){t.exports="data:image/png;base64,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"},bPFA:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n("YG7N");var s=n("dLXw"),a=n("IFrb"),r=n("bSIt"),o={name:"IndexMy",data:function(){return{}},computed:(Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t})({},Object(r.b)(["userInfo","orgInfo"])),created:function(){console.log("IndexMy-render")},methods:{toPath:function(t){this.$router.push({name:t})},logout:function(){this.$http.post("villageapp/dingtalk/logout").then(function(){s.a.loading({message:"退出登录中...",forbidClick:!0,loadingType:"spinner"}),a.a.removeLoginAuth(),setTimeout(function(){window.location.reload()},600)})}}},i=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tu"},[e("img",{attrs:{src:n("RA2w"),alt:""}})])}],c=n("W5g0");var l=function(t){n("cU7S")},u=Object(c.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-my"},[n("van-nav-bar",{attrs:{title:"我的"}}),t._v(" "),n("div",{staticClass:"banner"},[t._m(0),t._v(" "),n("div",{staticClass:"banner1"},[n("div",{staticClass:"zi1 ellipsis-text"},[n("span",[t._v(t._s(t.userInfo.userName))])]),t._v(" "),n("div",{staticClass:"zi2 ellipsis-text"},[n("span",[t._v(t._s(t.orgInfo.name))])])])]),t._v(" "),n("van-cell",{attrs:{"is-link":""}},[t._v("关于我们")]),t._v(" "),n("div",{staticClass:"l-w"},[n("van-button",{staticClass:"l-o",attrs:{type:"primary",block:""},on:{click:t.logout}},[t._v("退出登录")])],1)],1)},i,!1,l,"data-v-76880d63",null);e.default=u.exports},cU7S:function(t,e){}});