webpackJsonp([3],{G51f:function(t,e,n){t.exports=n.p+"N3C.d272984.png"},IFrb:function(t,e,n){"use strict";var a=n("t4fs"),o=n("sqb0"),i=n.n(o),s=function(t){return i.a.set("token",t)},c=function(){return i.a.remove("token")};e.a={setLoginToken:function(t){s(t)},setLoginInfo:function(t){a.a.setData("UserInfo",t)},removeLoginAuth:function(){c(),a.a.clearAll()}}},Zc0x:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n("YG7N");var a=n("dLXw"),o=n("t4fs"),i=n("IFrb"),s={name:"Login",data:function(){return{account:"",password:"",checked:!1,type:"account",loginLoading:!1}},computed:{},created:function(){this.initPage()},methods:{changeType:function(t){this.type=t},initPage:function(){},setPageConfig:function(){o.a.setData("pageConfig","pz",!0),o.a.setData("pageConfig","kmye",!0),o.a.setData("pageConfig","hbzj",!0),o.a.setData("pageConfig","srqk",!0),o.a.setData("pageConfig","zcqk",!0),o.a.setData("pageConfig","szmx",!0)},loginHandler:function(){var t=this;this.loginLoading=!0,this.$store.dispatch("appLogin",{password:this.password,username:this.account}).then(function(){return t.$store.dispatch("getUserInfo").then(function(e){return t.$http.get("villageapp/orgNew/findFirstOrg/"+e.phid).then(function(e){var n=e.data||[];if(t.$store.commit("SET_FIRST_ORG_LIST",n),!n.length)return a.a.fail("用户无关联组织！"),i.a.removeLoginAuth(),!1;t.$store.dispatch("setOrgInfo",n[0]),t.$store.dispatch("clearKeepaliveName"),t.setPageConfig(),t.loginLoading=!1,t.$router.push({path:"/index/approval/pre",query:t.otherQuery}).catch(function(t){console.log("err",t)})})})}).then(function(){t.loginLoading=!1}).catch(function(e){console.log("err",e),t.loginLoading=!1})},toHome:function(){this.$router.push("/index")},getPhoneCode:function(){this.$router.push("/phoneCode")}}},c=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"a-l-t"},[e("img",{attrs:{src:n("G51f"),alt:""}}),this._v(" "),e("div",{staticClass:"tt"},[this._v("小微权力监督运行平台")])])}],r=n("W5g0");var u=function(t){n("tRVi")},l=Object(r.a)(s,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-login"},[n("div",{staticClass:"t-b",staticStyle:{"text-align":"right"}}),t._v(" "),t._m(0),t._v(" "),"account"===t.type?n("div",[n("div",{staticClass:"l-f"},[n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.account,expression:"account"}],attrs:{type:"text",placeholder:"请输入账号",autocomplete:"off"},domProps:{value:t.account},on:{input:function(e){e.target.composing||(t.account=e.target.value)}}})]),t._v(" "),n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",placeholder:"请输入密码",autocomplete:"off"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})])]),t._v(" "),n("van-button",{staticClass:"l-b",attrs:{loading:t.loginLoading,type:"primary",block:""},on:{click:t.loginHandler}},[t._v("登录")])],1):t._e(),t._v(" "),"phone"===t.type?n("div",[n("div",{staticClass:"l-f type-p"},[n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.account,expression:"account"}],attrs:{type:"text",placeholder:"请输入手机号"},domProps:{value:t.account},on:{input:function(e){e.target.composing||(t.account=e.target.value)}}})])]),t._v(" "),n("van-button",{staticClass:"l-b",attrs:{type:"primary",block:""},on:{click:t.getPhoneCode}},[t._v("获取验证码")]),t._v(" "),n("div",{staticClass:"l-o",on:{click:function(e){return t.changeType("account")}}},[t._v("密码登录")])],1):t._e()])},c,!1,u,"data-v-68f7046d",null);e.default=l.exports},tRVi:function(t,e){}});