(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{26:function(e,t,i){"use strict";i.r(t),i.d(t,"HomeView",(function(){return s}));var n=i(0);class s extends n.a{constructor(){super(),this.setTemplate('<div class="view home">\n    <link rel="stylesheet" href="home/home.css">\n    <div class="toolbar p-4">\n        <button class="btn btn-danger" id="tree">画一棵树</button>\n        <button class="btn btn-warning" id="player">唱片机</button>\n        <button class="btn btn-success" id="cube">立方体</button>\n        <button class="btn btn-dark" id="form">表单</button>\n        <button class="btn btn-primary" id="sound">声音</button>\n    </div>\n    <route-view id="homeRouteView"></route-view>\n</div>')}initView(){const e=this.getDom("homeRouteView");e.addViewModules([{name:"TreeView",import:Promise.all([i.e(0),i.e(3)]).then(i.bind(null,23))},{name:"PlayerView",import:Promise.all([i.e(0),i.e(4)]).then(i.bind(null,28))},{name:"WebGLView",import:Promise.all([i.e(6),i.e(9)]).then(i.bind(null,27))},{name:"FormView",import:Promise.all([i.e(5),i.e(7)]).then(i.bind(null,25))},{name:"AudioView",import:Promise.all([i.e(0),i.e(2)]).then(i.bind(null,24))}]),this.setClick("tree",()=>{e.setAttribute("view","TreeView")}),this.setClick("player",()=>{e.setAttribute("view","PlayerView")}),this.setClick("cube",()=>{e.setAttribute("view","WebGLView")}),this.setClick("form",()=>{e.setAttribute("view","FormView")}),this.setClick("sound",()=>{e.setAttribute("view","AudioView")})}}}}]);