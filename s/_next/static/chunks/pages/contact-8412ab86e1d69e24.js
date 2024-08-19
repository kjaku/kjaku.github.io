(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[335],{3454:function(e,t,n){"use strict";var r,i;e.exports=(null==(r=n.g.process)?void 0:r.env)&&"object"==typeof(null==(i=n.g.process)?void 0:i.env)?n.g.process:n(7663)},1382:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/contact",function(){return n(5210)}])},2072:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(5893);function i(e){var t=function(){e.onClick()};return(0,r.jsx)("button",{onClick:t,type:"submit",className:e.className+" w-11/12 sm:w-80 h-20 p-3 px-8 text-2xl font-semibold transition-all duration-500",style:{boxShadow:"0px 1.5px 3px rgba(0, 0, 0, 0.25)",borderRadius:"36px"},children:e.children})}},3172:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(5893),i=n(9008),o=n.n(i),s={src:"/s/_next/static/media/logo-smooth.6804a5b0.svg",height:39,width:114},c=n(5675),l=n.n(c);function a(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(o(),{children:[(0,r.jsx)("title",{children:"Smooth"}),(0,r.jsx)("meta",{name:"description",content:"Smooth report"}),(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,r.jsxs)("main",{className:"flex flex-col h-full items-center gap-4",children:[(0,r.jsx)("div",{className:"w-full h-12 dark:bg-inherit",style:{boxShadow:"0px 1px 3px rgba(0, 0, 0, 0.15)"},children:(0,r.jsx)("header",{className:"mt-2 text-center ",children:(0,r.jsx)(l(),{src:s,alt:"logo"})})}),(0,r.jsx)("div",{className:"w-full h-full px-4",children:(0,r.jsx)("div",{className:e.className,children:e.children})})]})]})}},4634:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(1799),i=n(5893);function o(e){return(0,i.jsx)("input",(0,r.Z)({className:"p-5 m-2 w-11/12 sm:w-80 h-16",style:{boxShadow:"0px 1.5px 3px rgba(0, 0, 0, 0.25)",borderRadius:"36px",border:"1px solid #E7E7E7"}},e))}},5210:function(e,t,n){"use strict";n.r(t);var r=n(7568),i=n(1799),o=n(655),s=n(5893),c=n(1163),l=n(7294),a=n(2072),u=n(3172),f=n(4634),h=n(3210),p=n(3454),d=function(e){(0,c.useRouter)();var t,n=(0,l.useContext)(h.Z),d=n.stateData,x=n.setStateData,m=d.asset,v=(t=(0,r.Z)(function(e){var t,n,r;return(0,o.__generator)(this,function(o){switch(o.label){case 0:return e.preventDefault(),t=e.target.email.value,n=e.target.info.value,r=e.target.phone.value,x((0,i.Z)({},d,t?{email:t}:{},n?{info:n}:{},r?{phone:r}:{})),[4,function(){return g.apply(this,arguments)}()];case 1:return o.sent(),[2]}})}),function(e){return t.apply(this,arguments)});function g(){return(g=(0,r.Z)(function(){var e,t,n,r,i;return(0,o.__generator)(this,function(n){switch(n.label){case 0:return t="https://smooth-reporting.vercel.app/s/api",[4,fetch(((null==p?void 0:null===(e=p.env)||void 0===e?void 0:"production")==="development"?"/api":t)+"/getToken/")];case 1:return[4,n.sent().json()];case 2:return[2,n.sent().accessToken]}})})).apply(this,arguments)}return(0,s.jsxs)(u.Z,{className:"h-full flex flex-col text-center flex-grow ",children:[m&&(0,s.jsxs)("div",{className:"self-start flex flex-col items-start",children:[(0,s.jsx)("h2",{className:"font-semibold text-[#252525]",children:m.building}),(0,s.jsx)("h3",{className:"text-sm text-[#606060]",children:m.space})]}),(0,s.jsxs)("form",{onSubmit:v,className:"flex-1 flex flex-col justify-center items-center text-center ",children:[(0,s.jsxs)("div",{className:"flex-1 flex flex-col items-center w-full",children:[(0,s.jsx)("h1",{className:"text-2xl font-semibold py-8",children:"Can we contact you?"}),(0,s.jsx)(f.Z,{name:"email",type:"email",placeholder:"Type your email"}),(0,s.jsx)(f.Z,{name:"phone",placeholder:"Type your phone"}),(0,s.jsx)(f.Z,{name:"info",placeholder:"Type any other contact info"})]}),(0,s.jsxs)("div",{className:" flex flex-col gap-2 place-items-end items-center mb-8 w-full",children:[(0,s.jsx)(a.Z,{onClick:function(){},className:"text-neutral-500 text-sm h-12 border-neutral-200",children:"Skip"}),(0,s.jsx)(a.Z,{onClick:function(){},className:"pink-gradient-bg text-white h-16 text-lg",children:"Send!"})]})]})]})};t.default=d},7663:function(e){!function(){var t={229:function(e){var t,n,r,i=e.exports={};function o(){throw Error("setTimeout has not been defined")}function s(){throw Error("clearTimeout has not been defined")}function c(e){if(t===setTimeout)return setTimeout(e,0);if((t===o||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(r){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:o}catch(e){t=o}try{n="function"==typeof clearTimeout?clearTimeout:s}catch(r){n=s}}();var l=[],a=!1,u=-1;function f(){a&&r&&(a=!1,r.length?l=r.concat(l):u=-1,l.length&&h())}function h(){if(!a){var e=c(f);a=!0;for(var t=l.length;t;){for(r=l,l=[];++u<t;)r&&r[u].run();u=-1,t=l.length}r=null,a=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===s||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(r){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function d(){}i.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];l.push(new p(e,t)),1!==l.length||a||c(h)},p.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=d,i.addListener=d,i.once=d,i.off=d,i.removeListener=d,i.removeAllListeners=d,i.emit=d,i.prependListener=d,i.prependOnceListener=d,i.listeners=function(e){return[]},i.binding=function(e){throw Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw Error("process.chdir is not supported")},i.umask=function(){return 0}}},n={};function r(e){var i=n[e];if(void 0!==i)return i.exports;var o=n[e]={exports:{}},s=!0;try{t[e](o,o.exports,r),s=!1}finally{s&&delete n[e]}return o.exports}r.ab="//";var i=r(229);e.exports=i}()},1163:function(e,t,n){e.exports=n(387)},7568:function(e,t,n){"use strict";function r(e,t,n,r,i,o,s){try{var c=e[o](s),l=c.value}catch(a){n(a);return}c.done?t(l):Promise.resolve(l).then(r,i)}function i(e){return function(){var t=this,n=arguments;return new Promise(function(i,o){var s=e.apply(t,n);function c(e){r(s,i,o,c,l,"next",e)}function l(e){r(s,i,o,c,l,"throw",e)}c(void 0)})}}n.d(t,{Z:function(){return i}})}},function(e){e.O(0,[959,774,888,179],function(){return e(e.s=1382)}),_N_E=e.O()}]);