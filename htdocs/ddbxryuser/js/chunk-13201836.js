(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13201836"],{"02de":function(t,i,e){"use strict";function n(t){var i=window.getComputedStyle(t),e="none"===i.display,n=null===t.offsetParent&&"fixed"!==i.position;return e||n}e.d(i,"a",function(){return n})},"2bb1":function(t,i,e){"use strict";var n=e("1988"),s=e("d282"),a=e("9884"),o=Object(s["a"])("swipe-item"),c=o[0],r=o[1];i["a"]=c({mixins:[Object(a["a"])("vanSwipe")],data:function(){return{offset:0,mounted:!1}},mounted:function(){var t=this;this.$nextTick(function(){t.mounted=!0})},computed:{style:function(){var t={},i=this.parent,e=i.size,n=i.vertical;return t[n?"height":"width"]=e+"px",this.offset&&(t.transform="translate"+(n?"Y":"X")+"("+this.offset+"px)"),t},shouldRender:function(){var t=this.index,i=this.parent,e=this.mounted;if(!i.lazyRender)return!0;if(!e)return!1;var n=i.activeIndicator,s=i.count-1,a=0===n?s:n-1,o=n===s?0:n+1;return t===n||t===a||t===o}},render:function(){var t=arguments[0];return t("div",{class:r(),style:this.style,on:Object(n["a"])({},this.$listeners)},[this.shouldRender&&this.slots()])}})},"39cc":function(t,i,e){"use strict";e.r(i);var n,s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"desc"},[e("van-swipe",{staticClass:"my-swipe",attrs:{autoplay:3e3,"indicator-color":"white"}},t._l(t.swipeImg,function(t){return e("van-swipe-item",{key:t.pOrder},[e("img",{attrs:{src:t.pPicUrl,alt:""}})])}),1),e("div",{staticClass:"prod"},[e("p",{staticClass:"name"},[t._v(t._s(t.pName))]),e("p",{staticClass:"price"},[t._v("￥ "+t._s(t.pPrice2))])]),e("div",{staticClass:"tip"},[t._v("商品详情")]),e("div",{staticClass:"img-wrap"},t._l(t.descImg,function(t){return e("img",{key:t.pOrder,attrs:{src:t.pPicUrl,alt:""}})}),0),e("div",{staticClass:"btn",on:{click:t.toPay}},[t._v("购 买")])],1)},a=[],o=e("bd86"),c=(e("c3a6"),e("ad06")),r=(e("4b0a"),e("2bb1")),h=(e("7f7f"),e("7844"),e("5596")),u={components:(n={},Object(o["a"])(n,h["a"].name,h["a"]),Object(o["a"])(n,r["a"].name,r["a"]),Object(o["a"])(n,c["a"].name,c["a"]),n),data:function(){return{swipeImg:[],descImg:[],pName:"",pPrice2:0,pCode:""}},methods:{getDesc:function(t){var i=this;this.$api.mall.homeDesc({pCode:t}).then(function(t){1===t.resultCode&&(i.swipeImg=t.data.filter(function(t){return 1===t.pType}),i.descImg=t.data.filter(function(t){return 0===t.pType}))})},toPay:function(){}},mounted:function(){this.pName=this.$route.query.pName,this.pPrice2=this.$route.query.pPrice2,this.pCode=this.$route.query.pCode,this.getDesc(this.$route.query.pCode)}},f=u,l=(e("baf5"),e("2877")),d=Object(l["a"])(f,s,a,!1,null,"4b91372c",null);i["default"]=d.exports},4598:function(t,i,e){"use strict";(function(t){e.d(i,"c",function(){return h}),e.d(i,"b",function(){return u}),e.d(i,"a",function(){return f});var n=e("a142"),s=Date.now();function a(t){var i=Date.now(),e=Math.max(0,16-(i-s)),n=setTimeout(t,e);return s=i+e,n}var o=n["f"]?t:window,c=o.requestAnimationFrame||a,r=o.cancelAnimationFrame||o.clearTimeout;function h(t){return c.call(o,t)}function u(t){h(function(){h(t)})}function f(t){r.call(o,t)}}).call(this,e("c8ba"))},"482d":function(t,i,e){"use strict";function n(t,i,e){return Math.min(Math.max(t,i),e)}function s(t,i,e){var n=t.indexOf(i);return n>-1?t.slice(0,n+1)+t.slice(n).replace(e,""):t}function a(t,i){t=i?s(t,".",/\./g):t.split(".")[0],t=s(t,"-",/-/g);var e=i?/[^-0-9.]/g:/[^-0-9]/g;return t.replace(e,"")}e.d(i,"b",function(){return n}),e.d(i,"a",function(){return a})},"4b0a":function(t,i,e){"use strict";e("68ef"),e("786d")},5596:function(t,i,e){"use strict";var n=e("d282"),s=e("02de"),a=e("1325"),o=e("4598"),c=e("482d"),r=e("3875"),h=e("9884"),u=e("5fbe"),f=Object(n["a"])("swipe"),l=f[0],d=f[1];i["a"]=l({mixins:[r["a"],Object(h["b"])("vanSwipe"),Object(u["a"])(function(t,i){t(window,"resize",this.resize,!0),t(window,"visibilitychange",this.onVisibilityChange),i?this.initialize():this.clear()})],props:{width:[Number,String],height:[Number,String],autoplay:[Number,String],vertical:Boolean,lazyRender:Boolean,indicatorColor:String,loop:{type:Boolean,default:!0},duration:{type:[Number,String],default:500},touchable:{type:Boolean,default:!0},initialSwipe:{type:[Number,String],default:0},showIndicators:{type:Boolean,default:!0},stopPropagation:{type:Boolean,default:!0}},data:function(){return{rect:null,offset:0,active:0,deltaX:0,deltaY:0,swiping:!1,computedWidth:0,computedHeight:0}},watch:{children:function(){this.initialize()},initialSwipe:function(){this.initialize()},autoplay:function(t){t>0?this.autoPlay():this.clear()}},computed:{count:function(){return this.children.length},maxCount:function(){return Math.ceil(Math.abs(this.minOffset)/this.size)},delta:function(){return this.vertical?this.deltaY:this.deltaX},size:function(){return this[this.vertical?"computedHeight":"computedWidth"]},trackSize:function(){return this.count*this.size},activeIndicator:function(){return(this.active+this.count)%this.count},isCorrectDirection:function(){var t=this.vertical?"vertical":"horizontal";return this.direction===t},trackStyle:function(){var t,i=this.vertical?"height":"width",e=this.vertical?"width":"height";return t={},t[i]=this.trackSize+"px",t[e]=this[e]?this[e]+"px":"",t.transitionDuration=(this.swiping?0:this.duration)+"ms",t.transform="translate"+(this.vertical?"Y":"X")+"("+this.offset+"px)",t},indicatorStyle:function(){return{backgroundColor:this.indicatorColor}},minOffset:function(){return(this.vertical?this.rect.height:this.rect.width)-this.size*this.count}},mounted:function(){this.bindTouchEvent(this.$refs.track)},methods:{initialize:function(t){if(void 0===t&&(t=+this.initialSwipe),this.$el&&!Object(s["a"])(this.$el)){clearTimeout(this.timer);var i=this.$el.getBoundingClientRect();this.rect=i,this.swiping=!0,this.active=t,this.computedWidth=Math.round(+this.width||i.width),this.computedHeight=Math.round(+this.height||i.height),this.offset=this.getTargetOffset(t),this.children.forEach(function(t){t.offset=0}),this.autoPlay()}},resize:function(){this.initialize(this.activeIndicator)},onVisibilityChange:function(){document.hidden?this.clear():this.autoPlay()},onTouchStart:function(t){this.touchable&&(this.clear(),this.touchStartTime=Date.now(),this.touchStart(t),this.correctPosition())},onTouchMove:function(t){this.touchable&&this.swiping&&(this.touchMove(t),this.isCorrectDirection&&(Object(a["c"])(t,this.stopPropagation),this.move({offset:this.delta})))},onTouchEnd:function(){if(this.touchable&&this.swiping){var t=this.size,i=this.delta,e=Date.now()-this.touchStartTime,n=i/e,s=Math.abs(n)>.25||Math.abs(i)>t/2;if(s&&this.isCorrectDirection){var a=this.vertical?this.offsetY:this.offsetX,o=0;o=this.loop?a>0?i>0?-1:1:0:-Math[i>0?"ceil":"floor"](i/t),this.move({pace:o,emitChange:!0})}else i&&this.move({pace:0});this.swiping=!1,this.autoPlay()}},getTargetActive:function(t){var i=this.active,e=this.count,n=this.maxCount;return t?this.loop?Object(c["b"])(i+t,-1,e):Object(c["b"])(i+t,0,n):i},getTargetOffset:function(t,i){void 0===i&&(i=0);var e=t*this.size;this.loop||(e=Math.min(e,-this.minOffset));var n=Math.round(i-e);return this.loop||(n=Object(c["b"])(n,this.minOffset,0)),n},move:function(t){var i=t.pace,e=void 0===i?0:i,n=t.offset,s=void 0===n?0:n,a=t.emitChange,o=this.loop,c=this.count,r=this.active,h=this.children,u=this.trackSize,f=this.minOffset;if(!(c<=1)){var l=this.getTargetActive(e),d=this.getTargetOffset(l,s);if(o){if(h[0]&&d!==f){var p=d<f;h[0].offset=p?u:0}if(h[c-1]&&0!==d){var v=d>0;h[c-1].offset=v?-u:0}}this.active=l,this.offset=d,a&&l!==r&&this.$emit("change",this.activeIndicator)}},prev:function(){var t=this;this.correctPosition(),this.resetTouchStatus(),Object(o["b"])(function(){t.swiping=!1,t.move({pace:-1,emitChange:!0})})},next:function(){var t=this;this.correctPosition(),this.resetTouchStatus(),Object(o["b"])(function(){t.swiping=!1,t.move({pace:1,emitChange:!0})})},swipeTo:function(t,i){var e=this;void 0===i&&(i={}),this.correctPosition(),this.resetTouchStatus(),Object(o["b"])(function(){var n;n=e.loop&&t===e.count?0===e.active?0:t:t%e.count,i.immediate?Object(o["b"])(function(){e.swiping=!1}):e.swiping=!1,e.move({pace:n-e.active,emitChange:!0})})},correctPosition:function(){this.swiping=!0,this.active<=-1&&this.move({pace:this.count}),this.active>=this.count&&this.move({pace:-this.count})},clear:function(){clearTimeout(this.timer)},autoPlay:function(){var t=this,i=this.autoplay;i>0&&this.count>1&&(this.clear(),this.timer=setTimeout(function(){t.next(),t.autoPlay()},i))},genIndicator:function(){var t=this,i=this.$createElement,e=this.count,n=this.activeIndicator,s=this.slots("indicator");return s||(this.showIndicators&&e>1?i("div",{class:d("indicators",{vertical:this.vertical})},[Array.apply(void 0,Array(e)).map(function(e,s){return i("i",{class:d("indicator",{active:s===n}),style:s===n?t.indicatorStyle:null})})]):void 0)}},render:function(){var t=arguments[0];return t("div",{class:d()},[t("div",{ref:"track",style:this.trackStyle,class:d("track",{vertical:this.vertical})},[this.slots()]),this.genIndicator()])}})},"62b3":function(t,i,e){},7844:function(t,i,e){"use strict";e("68ef"),e("8270")},"786d":function(t,i,e){},8270:function(t,i,e){},baf5:function(t,i,e){"use strict";var n=e("62b3"),s=e.n(n);s.a},c3a6:function(t,i,e){"use strict";e("68ef"),e("9d70"),e("3743")}}]);