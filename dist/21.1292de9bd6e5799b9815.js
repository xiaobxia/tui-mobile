webpackJsonp([21],{"A/bM":function(t,a){},nUnk:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("/0a5"),n=s("qM9z"),i=s("bSIt"),o=Object.assign||function(t){for(var a=1;a<arguments.length;a++){var s=arguments[a];for(var e in s)Object.prototype.hasOwnProperty.call(s,e)&&(t[e]=s[e])}return t},r={name:"IndexApprovalHas",components:{ApprovalTag:e.a},mixins:[n.a],data:function(){return{current:0,list:[],loading:!1,finished:!1}},computed:o({},Object(i.b)(["hasSearchForm"])),watch:{hasSearchForm:function(){this.reQueryList()}},created:function(){console.log("approval-has-render")},methods:{backHandler:function(){this.$router.history.go(-1)},reQueryList:function(){return this.list=[],this.finished=!1,this.queryList(1)},queryList:function(t){var a=this;this.loading=!0,this.current=t||this.current+1,this.$http.postFormData("approval-village/AppBusinessController/findDoneApprovalList",o({},this.hasSearchForm,{orgId:this.$commonQueryParam.orgId,userId:this.$commonQueryParam.phUserId,queryType:1,pageIndex:this.current,pageSize:20})).then(function(t){var s=t.data||{},e=s.total||0;a.$store.commit("SET_hasTotal",e||""),a.list=a.list.concat(s.records||[]),a.list.forEach(function(t){0===t.payStatus?t.paymentStatusName="未支付":1===t.payStatus?t.paymentStatusName="支付中":2===t.payStatus?t.paymentStatusName="支付成功":3===t.payStatus?t.paymentStatusName="支付失败":4===t.payStatus?t.paymentStatusName="部分支付失败":5===t.payStatus?t.paymentStatusName="待复核/授权":6===t.payStatus?t.paymentStatusName="支付异常":t.paymentStatusName=""}),a.loading=!1,a.list.length>=e&&(a.finished=!0)}).catch(function(t){console.log(t),a.loading=!1,a.finished=!0})},toDetail:function(t){this.$router.push({name:"ApprovalDetailHas",query:{formId:t.formId,formInstanceId:t.formInstanceId,theme:t.theme,phid:t.phid,processId:t.processId}})},onLoad:function(){this.queryList()}}},l=s("W5g0");var c=function(t){s("A/bM")},u=Object(l.a)(r,function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"view-approval-has"},[s("div",{ref:"scrollView",staticClass:"c-l-w"},[s("van-list",{staticClass:"a-l-l",attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.onLoad},model:{value:t.loading,callback:function(a){t.loading=a},expression:"loading"}},t._l(t.list,function(a){return s("van-cell",{key:a.phid,attrs:{title:a.theme,"is-link":""},on:{click:function(s){return t.toDetail(a)}}},[s("div",{attrs:{slot:"label"},slot:"label"},[s("div",{staticClass:"label-b"},[s("span",[t._v("款项用途："+t._s(a.useOfFunds))])]),t._v(" "),s("div",{staticClass:"label-b"},[s("span",[t._v("组织："+t._s(a.orgName))])])]),t._v(" "),s("div",{staticClass:"f-v"},[s("div",{staticClass:"label-b"},[s("span",{staticClass:"m-t"},[t._v("￥"+t._s(t.$formatMoney(a.applicationsAmount)))])]),t._v(" "),s("div",{staticClass:"label-b"},[s("span",[t._v(t._s(t.$formatToDay(a.applyTime)))])]),t._v(" "),"1"!==a.phDelflag?s("approval-tag",{attrs:{status:""+a.formStatus}}):t._e(),t._v(" "),"1"===a.phDelflag?s("approval-tag",{attrs:{status:"6"}}):t._e()],1)])}),1)],1)])},[],!1,c,"data-v-cd7eb558",null);a.default=u.exports}});