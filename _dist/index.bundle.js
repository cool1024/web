!function(e){function t(t){for(var r,n,o=t[0],s=t[1],a=0,d=[];a<o.length;a++)n=o[a],Object.prototype.hasOwnProperty.call(i,n)&&i[n]&&d.push(i[n][0]),i[n]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(c&&c(t);d.length;)d.shift()()}var r={},i={1:0};function n(t){if(r[t])return r[t].exports;var i=r[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.e=function(e){var t=[],r=i[e];if(0!==r)if(r)t.push(r[2]);else{var o=new Promise((function(t,n){r=i[e]=[t,n]}));t.push(r[2]=o);var s,a=document.createElement("script");a.charset="utf-8",a.timeout=120,n.nc&&a.setAttribute("nonce",n.nc),a.src=function(e){return n.p+""+({}[e]||e)+".bundle.js"}(e);var c=new Error;s=function(t){a.onerror=a.onload=null,clearTimeout(d);var r=i[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;c.message="Loading chunk "+e+" failed.\n("+n+": "+o+")",c.name="ChunkLoadError",c.type=n,c.request=o,r[1](c)}i[e]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:a})}),12e4);a.onerror=a.onload=s,document.head.appendChild(a)}return Promise.all(t)},n.m=e,n.c=r,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n.oe=function(e){throw console.error(e),e};var o=window.webpackJsonp=window.webpackJsonp||[],s=o.push.bind(o);o.push=t,o=o.slice();for(var a=0;a<o.length;a++)t(o[a]);var c=s;n(n.s=1)}([function(e,t,r){"use strict";r.d(t,"b",(function(){return i})),r.d(t,"a",(function(){return n}));class i{static createManager(){return new i}showView(e,t){this.activeView&&this.activeView.destroy(),this.historyViews||(this.historyViews=[]),this.activeView=n.createView(e,t),this.historyViews.push(this.activeView),this.activeView.manager=this}backView(){this.activeView.destroy();const e=this.historyViews.pop();e&&e.resume()}}class n{static createView(e,t){const r=new e;return r.renderView(t),r.initView(),r.doHandler(),r}constructor(){this.handlers=[]}setTemplate(e){this.templateStr=e}renderView(e){e.innerHTML=this.templateStr,this.nativeDom=e.children[0],this.nativeDoms=[];for(let t=0;t<e.children.length;t++)this.nativeDoms.push(e.children[t]);this.parentNode=e}initView(){}destroy(){this.nativeDoms.forEach(e=>this.parentNode.removeChild(e))}resume(){this.nativeDoms.forEach(e=>this.parentNode.appendChild(e))}bindHandler(e){this.handlers.push(e)}doHandler(){this.handlers.forEach(e=>e())}getDom(e){return document.getElementById(e)}setClick(e,t){this.getDom(e).addEventListener("click",t,!1)}addStyleClass(e,...t){this.getDom(e).classList.add(t)}removeStyleClass(e,...t){this.getDom(e).classList.remove(t)}setStyleAttr(e,t,r){this.getDom(e).style[t]=r}appendDom(e){this.parentNode.appendChild(e),this.nativeDoms.push(e)}showView(e){this.manager.showView(e,this.parentNode)}showViewIn(e,t){i.createManager().showView(e,t)}}},function(e,t,r){"use strict";r.r(t);var i=r(0);class n extends HTMLElement{static get observedAttributes(){return["view"]}constructor(){super(),this.manager=i.b.createManager(),this.viewModules={}}addViewModule(e,t){this.viewModules[e]=t}addViewModules(e){e.forEach(e=>{this.addViewModule(e.name,e.import)})}connectedCallback(){console.log("Added to page.")}disconnectedCallback(){console.log("Removed from page.")}attributeChangedCallback(e,t,r){console.log(e),"view"===e&&this.viewModules[r].then(e=>{this.manager.showView(e[r],this)})}}customElements.define("route-view",n);const o=document.createElement("route-view");document.body.appendChild(o),o.addViewModules([{name:"HomeView",import:r.e(8).then(r.bind(null,26))}]),o.setAttribute("view","HomeView")}]);