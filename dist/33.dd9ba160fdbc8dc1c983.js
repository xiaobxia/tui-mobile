webpackJsonp([33],{o0Z2:function(e,o){},wCgz:function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var a=Object.assign||function(e){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e};var i={name:"My",data:function(){return{applicationCode:"",oldApplicationCode:"",secondApplicationCode:"",searchForm:(o={applicationCode:"",oldApplicationCode:"",secondApplicationCode:""},e&&(o=Object.assign(o,e)),o)};var e,o},computed:{},created:function(){},methods:{updateApplicationCode:function(){var e=this;this.searchForm.applicationCode=this.applicationCode,this.searchForm.oldApplicationCode=this.oldApplicationCode,this.searchForm.secondApplicationCode=this.secondApplicationCode,this.$http.postFormData("villageapp/applicationCode/updateApplicationCode",a({},this.searchForm)).then(function(o){console.log(o.code,"res.code000"),200===o.code?(e.$router.go("-1"),e.$toast.success(o.message)):e.$toast.fail(o.message)})},onClickLeft:function(){this.$router.go(-1)},onSubmit:function(e){console.log("submit",e)},reset:function(){this.$router.push({name:"mine-resetting"})}}},n=t("W5g0");var c=function(e){t("o0Z2")},l=Object(n.a)(i,function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",{staticClass:"banner"},[t("van-nav-bar",{attrs:{title:"审批码设置","left-arrow":""},on:{"click-left":e.onClickLeft}}),e._v(" "),t("div",{staticClass:"center"},[t("van-form",{on:{submit:e.onSubmit}},[t("van-field",{attrs:{rules:[{required:!0,message:"请填写新审批码"}],name:"原审批码",label:"原审批码",placeholder:"请输入原审批码"},model:{value:e.oldApplicationCode,callback:function(o){e.oldApplicationCode=o},expression:"oldApplicationCode"}}),e._v(" "),t("van-field",{attrs:{rules:[{required:!0,message:"请填写新审批码"}],name:"新审批码",label:"新审批码",placeholder:"请输入新审批码"},model:{value:e.applicationCode,callback:function(o){e.applicationCode=o},expression:"applicationCode"}}),e._v(" "),t("van-field",{attrs:{rules:[{required:!0,message:"请重复输入"}],name:"重复输入",label:"重复输入",placeholder:"请再次输入新审批码"},model:{value:e.secondApplicationCode,callback:function(o){e.secondApplicationCode=o},expression:"secondApplicationCode"}})],1),e._v(" "),t("div",{staticClass:"tip"},[e._v("* 至少6位字母或数字")]),e._v(" "),t("div",{staticClass:"l-w"},[t("van-button",{staticClass:"l-o",attrs:{type:"primary",block:""},on:{click:e.updateApplicationCode}},[e._v("完成")])],1),e._v(" "),t("p",{staticClass:"reset",on:{click:function(o){return e.reset()}}},[e._v("审批码重置")])],1)],1)},[],!1,c,"data-v-5a2716f4",null);o.default=l.exports}});