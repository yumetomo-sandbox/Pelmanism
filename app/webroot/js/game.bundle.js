!function(t){function s(s){for(var o,r,a=s[0],i=s[1],l=s[2],h=0,d=[];h<a.length;h++)r=a[h],n[r]&&d.push(n[r][0]),n[r]=0;for(o in i)Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o]);for(u&&u(s);d.length;)d.shift()();return c.push.apply(c,l||[]),e()}function e(){for(var t,s=0;s<c.length;s++){for(var e=c[s],o=!0,a=1;a<e.length;a++){var i=e[a];0!==n[i]&&(o=!1)}o&&(c.splice(s--,1),t=r(r.s=e[0]))}return t}var o={},n={2:0},c=[];function r(s){if(o[s])return o[s].exports;var e=o[s]={i:s,l:!1,exports:{}};return t[s].call(e.exports,e,e.exports,r),e.l=!0,e.exports}r.m=t,r.c=o,r.d=function(t,s,e){r.o(t,s)||Object.defineProperty(t,s,{configurable:!1,enumerable:!0,get:e})},r.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},r.n=function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(s,"a",s),s},r.o=function(t,s){return Object.prototype.hasOwnProperty.call(t,s)},r.p="";var a=window.webpackJsonp=window.webpackJsonp||[],i=a.push.bind(a);a.push=s,a=a.slice();for(var l=0;l<a.length;l++)s(a[l]);var u=i;c.push([9,0]),e()}([,,,function(t,s){const e={COLORS:[{text:"赤",color:"#eb0d0d",class:"red"},{text:"青",color:"#0879ff",class:"blue"},{text:"黄",color:"#ccdd09",class:"yellow"},{text:"緑",color:"#00c926",class:"green"},{text:"橙",color:"#ee861a",class:"orange"},{text:"紫",color:"#b514e6",class:"purple"},{text:"茶",color:"#8c6604",class:"brown"},{text:"黒",color:"#000",class:"black"}],COUNT:15};t.exports=e},function(t,s,e){"use strict";(function(t){e.d(s,"a",function(){return c});var o=e(3),n=e.n(o);class c{constructor(){this.countdown(n.a.COUNT)}countdown(s){t("#count").html(s)}}}).call(this,e(1))},,function(t,s,e){"use strict";(function(t,o){e.d(s,"a",function(){return r});var n=e(5),c=e.n(n);class r extends c.a{constructor(){super(),this.$cards=t("li"),this.$cards.on("click",s=>{const e=t(s.currentTarget);if(!e.hasClass("open")&&!e.hasClass("match")){const t=this.$cards.index(e);this.emit("selected",t)}})}open(s,e){return new Promise(n=>{const c=e[s].class,r=e[s].text,a=t("li").eq(s);o(a,{rotateY:["180deg","0deg"],tween:180},{duration:400,progress:function(t,s,e,o,n){if(n>=90){const t=90-(n-90);a.addClass(`${c} open`),a.html(r),a.css("transform","rotateY("+t+"deg)")}},complete:()=>{n()}})})}close(t){this.flip(t)}closeAllCards(){this.flip(this.$cards)}flip(t){o(t,{rotateY:["180deg","0deg"],tween:180},{duration:500,delay:400,progress:function(s,e,o,n,c){if(c>=90){(t.hasClass("open")||t.hasClass("match"))&&(t.removeClass(),t.html("?"));const s=90-(c-90);t.css("transform","rotateY("+s+"deg)")}}})}}}).call(this,e(1),e(8))},,,function(t,s,e){"use strict";e.r(s),function(t){var s=e(2),o=e.n(s),n=e(0),c=e.n(n),r=e(6),a=e(4);new class{constructor(){this.colors=[],this.cardUI=new r.a,this.countUI=new a.a,this.bind(),this.init()}bind(){this.cardUI.on("selected",t=>{this.cardUI.open(t,this.colors).then(()=>this.judge())})}init(){this.colors=c.a.COLORS.concat(c.a.COLORS),this.colors=o.a.shuffle(this.colors),this.count=c.a.COUNT,this.countUI.countdown(this.count),this.totalCard=2*c.a.COLORS.length}judge(){const s=t("li.open");if(2===s.length){this.count=this.count-1,this.countUI.countdown(this.count);const t=s.eq(0),e=s.eq(1);t.text()===e.text()?this.match(s):0===this.count?this.restart():this.cardUI.close(s)}}match(s){s.removeClass("open"),s.addClass("match"),t("li.match").length===this.totalCard&&(alert("success !"),this.restart())}restart(){this.init(),this.cardUI.closeAllCards()}}}.call(this,e(1))}]);