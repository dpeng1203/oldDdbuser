(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d66d9bc"],{"128d":function(e,t,n){e.exports=n.p+"ddbxryuser/img/login_logo.png"},3846:function(e,t,n){n("9e1e")&&"g"!=/./g.flags&&n("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:n("0bfb")})},"49f4":function(e,t,n){},"51d3":function(e,t,n){"use strict";var o=n("bbe1"),a=n.n(o);a.a},"6b54":function(e,t,n){"use strict";n("3846");var o=n("cb7c"),a=n("0bfb"),i=n("9e1e"),s="toString",r=/./[s],c=function(e){n("2aba")(RegExp.prototype,s,e,!0)};n("79e5")(function(){return"/a/b"!=r.call({source:"a",flags:"b"})})?c(function(){var e=o(this);return"/".concat(e.source,"/","flags"in e?e.flags:!i&&e instanceof RegExp?a.call(e):void 0)}):r.name!=s&&c(function(){return r.call(this)})},"78df":function(e,t,n){"use strict";var o=n("49f4"),a=n.n(o);a.a},"8a58":function(e,t,n){"use strict";n("68ef"),n("09fe"),n("4d75")},bbe1:function(e,t,n){},c3a6:function(e,t,n){"use strict";n("68ef"),n("09fe")},dc3f:function(e,t,n){"use strict";n.r(t);var o,a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"login"},[o("img",{attrs:{src:n("128d"),alt:""}}),o("div",{staticClass:"box"},[o("div",{staticClass:"tab"},[o("span",{class:{active:1==e.active},on:{click:function(t){e.active=1}}},[e._v("登录")]),o("span",{class:{active:2==e.active},on:{click:function(t){e.active=2}}},[e._v("注册")])]),1==e.active?o("div",{staticClass:"login-cont"},[o("div",{staticClass:"item"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],attrs:{type:"number",pattern:"[0-9]*",placeholder:"请输入手机号"},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}})]),o("div",{staticClass:"item"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password",placeholder:"请输入密码"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),o("p",{on:{click:function(t){return e.$router.push("/resetPw")}}},[o("span",[e._v("忘记密码")])]),o("div",{staticClass:"btn",on:{click:e.login}},[e._v("立即登陆")])]):e._e(),2==e.active?o("div",{staticClass:"login-cont"},[o("sign",{on:{memLogin:e.signed}})],1):e._e()])])},i=[],s=n("ed08"),r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"sign"},[o("div",{staticClass:"login-cont"},[o("div",{staticClass:"input"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],attrs:{type:"text",placeholder:"用户名：4-14字符"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}}),o("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password",placeholder:"登录密码：6-20字符"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),o("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],attrs:{type:"number",pattern:"[0-9]*",placeholder:"手机号"},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}}),o("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],attrs:{type:"number",pattern:"[0-9]*",placeholder:"输入验证码"},domProps:{value:e.code},on:{input:function(t){t.target.composing||(e.code=t.target.value)}}}),o("span",{directives:[{name:"show",rawName:"v-show",value:!e.timeObj.canGet,expression:"!timeObj.canGet"}]},[e._v(e._s(e.timeObj.waitTime+"s后重新获取"))]),o("span",{directives:[{name:"show",rawName:"v-show",value:e.timeObj.canGet,expression:"timeObj.canGet"}],staticClass:"code",on:{click:e.getCode}},[e._v("获取验证码")]),o("input",{directives:[{name:"model",rawName:"v-model",value:e.memPayPwd,expression:"memPayPwd"}],attrs:{type:"password",pattern:"[0-9]*",placeholder:"支付密码：6位数字"},domProps:{value:e.memPayPwd},on:{input:function(t){t.target.composing||(e.memPayPwd=t.target.value)}}})]),o("div",{staticClass:"btn",on:{click:e.toSign}},[e._v("立即注册")])]),o("van-popup",{style:{width:"80%"},attrs:{round:"","close-on-click-overlay":!1},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}}),e.show?o("div",{staticClass:"p-icon"},[o("img",{staticClass:"gzh",attrs:{src:n("fb9c"),alt:""}}),o("div",{staticClass:"icon-close",on:{click:function(t){e.show=!1}}},[o("van-icon",{attrs:{name:"clear",size:".9rem",color:"#fff"}})],1)]):e._e()],1)},c=[],l=(n("e7e5"),n("d399")),u=n("bd86"),d=(n("8a58"),n("e41f")),m=(n("7f7f"),n("c3a6"),n("ad06")),p={name:"sign",components:(o={},Object(u["a"])(o,m["a"].name,m["a"]),Object(u["a"])(o,d["a"].name,d["a"]),o),props:{},data:function(){return{show:!1,name:"",password:"",phone:"",code:"",memPayPwd:"",timeCountObj:{canGet:!0,timer:null,waitTime:60}}},computed:{timeObj:function(){return this.timeCountObj.canGet?this.timeCountObj:Object(s["f"])(this.timeCountObj)}},methods:{getCode:function(){var e=this;if(Object(s["c"])(this.phone)){var t={mobile:this.phone,type:"register"};this.$api.login.code(t).then(function(t){1===t.resultCode&&(Object(l["a"])("发送成功！"),Object(s["f"])(e.timeObj))})}},toSign:function(){var e=this;if(Object(s["e"])(this.name)&&Object(s["b"])(this.password)&&Object(s["c"])(this.phone)&&Object(s["d"])(this.memPayPwd))if(localStorage.recCode){var t={memName:this.name,memMobile:this.phone,verifyCode:this.code,memPwd:this.password,pMemCode:localStorage.recCode,memPayPwd:this.memPayPwd};this.$api.login.signQr(t).then(function(t){1===t.resultCode&&(Object(l["a"])("注册成功！"),e.$emit("memLogin",1))})}else{var n={memName:this.name,memMobile:this.phone,verifyCode:this.code,memPwd:this.password,memPayPwd:this.memPayPwd};this.$api.login.sign(n).then(function(t){1===t.resultCode&&(Object(l["a"])("注册成功！"),e.$emit("memLogin",1))})}}}},v=p,h=(n("51d3"),n("2877")),f=Object(h["a"])(v,r,c,!1,null,"2631dc5d",null),g=f.exports,b={name:"login",components:{sign:g},data:function(){return{active:1,phone:"",password:"",recCode:""}},methods:{login:function(){var e=this;if(Object(s["c"])(this.phone)&&Object(s["b"])(this.password)){var t={mobile:this.phone,pwd:this.password};this.$api.login.login(t).then(function(t){1===t.resultCode&&(localStorage.memToken=t.data.token,localStorage.phone=e.phone,localStorage.memName=t.data.member.memName,localStorage.memId=t.data.member.memCode,e.$router.push("/home"))})}},signed:function(){this.active=1}},mounted:function(){console.log(this.$route.query.memCode),localStorage.memToken?this.$router.push("/home"):this.$route.query.memCode&&(this.active=2,localStorage.recCode=this.$route.query.memCode)}},w=b,C=(n("78df"),Object(h["a"])(w,a,i,!1,null,"00e6eb84",null));t["default"]=C.exports},e41f:function(e,t,n){"use strict";var o=n("d282"),a=n("a142"),i=n("6605"),s=n("ad06"),r=Object(o["a"])("popup"),c=r[0],l=r[1];t["a"]=c({mixins:[i["a"]],props:{round:Boolean,duration:Number,closeable:Boolean,transition:String,safeAreaInsetBottom:Boolean,closeIcon:{type:String,default:"cross"},closeIconPosition:{type:String,default:"top-right"},position:{type:String,default:"center"},overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!0}},beforeCreate:function(){var e=this,t=function(t){return function(n){return e.$emit(t,n)}};this.onClick=t("click"),this.onOpened=t("opened"),this.onClosed=t("closed")},render:function(){var e,t=arguments[0];if(this.shouldRender){var n=this.round,o=this.position,i=this.duration,r=this.transition||("center"===o?"van-fade":"van-popup-slide-"+o),c={};return Object(a["b"])(i)&&(c.transitionDuration=i+"s"),t("transition",{attrs:{name:r},on:{afterEnter:this.onOpened,afterLeave:this.onClosed}},[t("div",{directives:[{name:"show",value:this.value}],style:c,class:l((e={round:n},e[o]=o,e["safe-area-inset-bottom"]=this.safeAreaInsetBottom,e)),on:{click:this.onClick}},[this.slots(),this.closeable&&t(s["a"],{attrs:{name:this.closeIcon},class:l("close-icon",this.closeIconPosition),on:{click:this.close}})])])}}})},ed08:function(e,t,n){"use strict";n.d(t,"c",function(){return a}),n.d(t,"e",function(){return i}),n.d(t,"b",function(){return s}),n.d(t,"d",function(){return r}),n.d(t,"a",function(){return c}),n.d(t,"f",function(){return l});n("6b54"),n("e7e5");var o=n("d399"),a=function(e){var t=/^1[3|4|5|6|7|8|9][0-9]\d{8}$/;return!!t.test(e)||(Object(o["a"])("请输入正确的手机号"),!1)},i=function(e){var t=/^[\u4E00-\u9FA5A-Za-z0-9_]{1,16}$/;return!!t.test(e)||(Object(o["a"])("输入的必须是1-16位的任何字符!!!"),!1)},s=function(e){var t=/^[a-zA-Z0-9_-]{6,20}$/;return!!t.test(e)||(Object(o["a"])("密码必须由6-20位字母、数字、下划线组成"),!1)},r=function(e){var t=/^\d{6}$/;return!!t.test(e)||(Object(o["a"])("支付密码必须为六位数字"),!1)},c=function(e){var t=/^\d{6}$/;return!!t.test(e)||(Object(o["a"])("请输入六位数字的密码！"),!1)},l=function(e){var t=60;return e.timer||(e.waitTime=t,e.canGet=!1,e.timer=setInterval(function(){e.waitTime>0&&e.waitTime<=t?e.waitTime--:(e.canGet=!0,clearInterval(e.timer),e.timer=null)},1e3)),{timer:e.timer,canGet:e.canGet,waitTime:e.waitTime}}},fb9c:function(e,t,n){e.exports=n.p+"ddbxryuser/img/gzh.jpg"}}]);