(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[112],{9361:function(e,t){"use strict";t.Z=function(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}},6877:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[id]",function(){return i(7886)}])},7518:function(e,t,i){"use strict";i.d(t,{Z:function(){return a}});var n=i(5893),o=i(9008),r=i.n(o);function a(e){return console.log("start","production"),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r(),{children:[(0,n.jsx)("title",{children:"Smooth"}),(0,n.jsx)("meta",{name:"description",content:"Smooth report"}),(0,n.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,n.jsxs)("main",{className:"flex flex-col h-full items-center gap-4",children:[(0,n.jsx)("div",{className:"w-full py-4 dark:bg-inherit",style:{boxShadow:"0px 1px 3px rgba(0, 0, 0, 0.15)"},children:(0,n.jsx)("header",{className:"text-1xl uppercase text-center font-bold tracking-[0.5em]",children:"JLL"})}),(0,n.jsx)("div",{className:"w-full h-full px-4",children:(0,n.jsx)("div",{className:e.className,children:e.children})})]})]})}},8045:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(9361).Z,o=i(4941).Z,r=i(3929).Z;Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,i,l=e.src,c=e.sizes,m=e.unoptimized,p=void 0!==m&&m,w=e.priority,k=void 0!==w&&w,_=e.loading,E=e.lazyRoot,N=e.lazyBoundary,I=e.className,L=e.quality,R=e.width,C=e.height,O=e.style,q=e.objectFit,P=e.objectPosition,B=e.onLoadingComplete,W=e.placeholder,Z=void 0===W?"empty":W,D=e.blurDataURL,M=s(e,["src","sizes","unoptimized","priority","loading","lazyRoot","lazyBoundary","className","quality","width","height","style","objectFit","objectPosition","onLoadingComplete","placeholder","blurDataURL"]),F=d.useContext(h.ImageConfigContext),U=d.useMemo(function(){var e=v||F||f.imageConfigDefault,t=r(e.deviceSizes).concat(r(e.imageSizes)).sort(function(e,t){return e-t}),i=e.deviceSizes.sort(function(e,t){return e-t});return a({},e,{allSizes:t,deviceSizes:i})},[F]),T=c?"responsive":"intrinsic";"layout"in M&&(M.layout&&(T=M.layout),delete M.layout);var V=z;if("loader"in M){if(M.loader){var G=M.loader;V=function(e){e.config;var t=s(e,["config"]);return G(t)}}delete M.loader}var H="";if(function(e){var t;return"object"==typeof e&&(x(e)||void 0!==e.src)}(l)){var J=x(l)?l.default:l;if(!J.src)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ".concat(JSON.stringify(J)));if(D=D||J.blurDataURL,H=J.src,(!T||"fill"!==T)&&(C=C||J.height,R=R||J.width,!J.height||!J.width))throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ".concat(JSON.stringify(J)))}l="string"==typeof l?l:H;var X=!k&&("lazy"===_||void 0===_);(l.startsWith("data:")||l.startsWith("blob:"))&&(p=!0,X=!1),b.has(l)&&(X=!1),U.unoptimized&&(p=!0);var Q=o(d.useState(!1),2),K=Q[0],Y=Q[1],$=o(g.useIntersection({rootRef:void 0===E?null:E,rootMargin:N||"200px",disabled:!X}),3),ee=$[0],et=$[1],ei=$[2],en=!X||et,eo={boxSizing:"border-box",display:"block",overflow:"hidden",width:"initial",height:"initial",background:"none",opacity:1,border:0,margin:0,padding:0},er={boxSizing:"border-box",display:"block",width:"initial",height:"initial",background:"none",opacity:1,border:0,margin:0,padding:0},ea=!1,el=j(R),ec=j(C),es=j(L),ed=Object.assign({},O,{position:"absolute",top:0,left:0,bottom:0,right:0,boxSizing:"border-box",padding:0,border:"none",margin:"auto",display:"block",width:0,height:0,minWidth:"100%",maxWidth:"100%",minHeight:"100%",maxHeight:"100%",objectFit:q,objectPosition:P}),eu="blur"!==Z||K?{}:{backgroundSize:q||"cover",backgroundPosition:P||"0% 0%",filter:"blur(20px)",backgroundImage:'url("'.concat(D,'")')};if("fill"===T)eo.display="block",eo.position="absolute",eo.top=0,eo.left=0,eo.bottom=0,eo.right=0;else if(void 0!==el&&void 0!==ec){var ef=ec/el,eg=isNaN(ef)?"100%":"".concat(100*ef,"%");"responsive"===T?(eo.display="block",eo.position="relative",ea=!0,er.paddingTop=eg):"intrinsic"===T?(eo.display="inline-block",eo.position="relative",eo.maxWidth="100%",ea=!0,er.maxWidth="100%",t="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27".concat(el,"%27%20height=%27").concat(ec,"%27/%3e")):"fixed"===T&&(eo.display="inline-block",eo.position="relative",eo.width=el,eo.height=ec)}var eh={src:y,srcSet:void 0,sizes:void 0};en&&(eh=S({config:U,src:l,unoptimized:p,layout:T,width:el,quality:es,sizes:c,loader:V}));var em=l,ep="imagesizes";ep="imageSizes";var ev=(n(i={},"imageSrcSet",eh.srcSet),n(i,ep,eh.sizes),n(i,"crossOrigin",M.crossOrigin),i),eb=d.default.useLayoutEffect,ey=d.useRef(B),ew=d.useRef(l);d.useEffect(function(){ey.current=B},[B]),eb(function(){ew.current!==l&&(ei(),ew.current=l)},[ei,l]);var ex=a({isLazy:X,imgAttributes:eh,heightInt:ec,widthInt:el,qualityInt:es,layout:T,className:I,imgStyle:ed,blurStyle:eu,loading:_,config:U,unoptimized:p,placeholder:Z,loader:V,srcString:em,onLoadingCompleteRef:ey,setBlurComplete:Y,setIntersection:ee,isVisible:en,noscriptSizes:c},M);return d.default.createElement(d.default.Fragment,null,d.default.createElement("span",{style:eo},ea?d.default.createElement("span",{style:er},t?d.default.createElement("img",{style:{display:"block",maxWidth:"100%",width:"initial",height:"initial",background:"none",opacity:1,border:0,margin:0,padding:0},alt:"","aria-hidden":!0,src:t}):null):null,d.default.createElement(A,Object.assign({},ex))),k?d.default.createElement(u.default,null,d.default.createElement("link",Object.assign({key:"__nimg-"+eh.src+eh.srcSet+eh.sizes,rel:"preload",as:"image",href:eh.srcSet?void 0:eh.src},ev))):null)};var a=i(6495).Z,l=i(2648).Z,c=i(1598).Z,s=i(7273).Z,d=c(i(7294)),u=l(i(5443)),f=i(9309),g=i(7190),h=i(9977);i(3794);var m=i(2392);function p(e){return"/"===e[0]?e.slice(1):e}var v={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0},b=new Set,y="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",w=new Map([["default",function(e){var t=e.config,i=e.src,n=e.width,o=e.quality;return i.endsWith(".svg")&&!t.dangerouslyAllowSVG?i:"".concat(m.normalizePathTrailingSlash(t.path),"?url=").concat(encodeURIComponent(i),"&w=").concat(n,"&q=").concat(o||75)}],["imgix",function(e){var t=e.config,i=e.src,n=e.width,o=e.quality,r=new URL("".concat(t.path).concat(p(i))),a=r.searchParams;return a.set("auto",a.getAll("auto").join(",")||"format"),a.set("fit",a.get("fit")||"max"),a.set("w",a.get("w")||n.toString()),o&&a.set("q",o.toString()),r.href}],["cloudinary",function(e){var t,i=e.config,n=e.src,o=e.width,r=["f_auto","c_limit","w_"+o,"q_"+(e.quality||"auto")].join(",")+"/";return"".concat(i.path).concat(r).concat(p(n))}],["akamai",function(e){var t=e.config,i=e.src,n=e.width;return"".concat(t.path).concat(p(i),"?imwidth=").concat(n)}],["custom",function(e){var t=e.src;throw Error('Image with src "'.concat(t,'" is missing "loader" prop.')+"\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader")}],]);function x(e){return void 0!==e.default}function S(e){var t=e.config,i=e.src,n=e.unoptimized,o=e.layout,a=e.width,l=e.quality,c=e.sizes,s=e.loader;if(n)return{src:i,srcSet:void 0,sizes:void 0};var d=function(e,t,i,n){var o=e.deviceSizes,a=e.allSizes;if(n&&("fill"===i||"responsive"===i)){for(var l=/(^|\s)(1?\d?\d)vw/g,c=[];s=l.exec(n);s)c.push(parseInt(s[2]));if(c.length){var s,d,u=.01*(d=Math).min.apply(d,r(c));return{widths:a.filter(function(e){return e>=o[0]*u}),kind:"w"}}return{widths:a,kind:"w"}}return"number"!=typeof t||"fill"===i||"responsive"===i?{widths:o,kind:"w"}:{widths:r(new Set([t,2*t].map(function(e){return a.find(function(t){return t>=e})||a[a.length-1]}))),kind:"x"}}(t,a,o,c),u=d.widths,f=d.kind,g=u.length-1;return{sizes:c||"w"!==f?c:"100vw",srcSet:u.map(function(e,n){return"".concat(s({config:t,src:i,quality:l,width:e})," ").concat("w"===f?e:n+1).concat(f)}).join(", "),src:s({config:t,src:i,quality:l,width:u[g]})}}function j(e){return"number"==typeof e?e:"string"==typeof e?parseInt(e,10):void 0}function z(e){var t,i=(null==(t=e.config)?void 0:t.loader)||"default",n=w.get(i);if(n)return n(e);throw Error('Unknown "loader" found in "next.config.js". Expected: '.concat(f.VALID_LOADERS.join(", "),". Received: ").concat(i))}function k(e,t,i,n,o,r){e&&e.src!==y&&e["data-loaded-src"]!==t&&(e["data-loaded-src"]=t,("decode"in e?e.decode():Promise.resolve()).catch(function(){}).then(function(){if(e.parentNode&&(b.add(t),"blur"===n&&r(!0),null==o?void 0:o.current)){var i=e.naturalWidth,a=e.naturalHeight;o.current({naturalWidth:i,naturalHeight:a})}}))}var A=function(e){var t=e.imgAttributes,i=(e.heightInt,e.widthInt),n=e.qualityInt,o=e.layout,r=e.className,l=e.imgStyle,c=e.blurStyle,u=e.isLazy,f=e.placeholder,g=e.loading,h=e.srcString,m=e.config,p=e.unoptimized,v=e.loader,b=e.onLoadingCompleteRef,y=e.setBlurComplete,w=e.setIntersection,x=e.onLoad,j=e.onError,z=(e.isVisible,e.noscriptSizes),A=s(e,["imgAttributes","heightInt","widthInt","qualityInt","layout","className","imgStyle","blurStyle","isLazy","placeholder","loading","srcString","config","unoptimized","loader","onLoadingCompleteRef","setBlurComplete","setIntersection","onLoad","onError","isVisible","noscriptSizes"]);return g=u?"lazy":g,d.default.createElement(d.default.Fragment,null,d.default.createElement("img",Object.assign({},A,t,{decoding:"async","data-nimg":o,className:r,style:a({},l,c),ref:d.useCallback(function(e){w(e),(null==e?void 0:e.complete)&&k(e,h,o,f,b,y)},[w,h,o,f,b,y,]),onLoad:function(e){k(e.currentTarget,h,o,f,b,y),x&&x(e)},onError:function(e){"blur"===f&&y(!0),j&&j(e)}})),(u||"blur"===f)&&d.default.createElement("noscript",null,d.default.createElement("img",Object.assign({},A,S({config:m,src:h,unoptimized:p,layout:o,width:i,quality:n,sizes:z,loader:v}),{decoding:"async","data-nimg":o,style:l,className:r,loading:g}))))};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7886:function(e,t,i){"use strict";function n(e,t,i,n,o,r,a){try{var l=e[r](a),c=l.value}catch(s){i(s);return}l.done?t(c):Promise.resolve(c).then(n,o)}i.r(t),i.d(t,{__N_SSG:function(){return u},default:function(){return f}});var o=i(655),r=i(5893),a=i(1664),l=i.n(a),c=i(7518),s=i(5675),d=i.n(s),u=!0;function f(e){var t=e.asset,i=function(e){e.preventDefault(),console.log("submit",e)},a=function(e){console.log("image taken");var t,i,r,a=new FileReader,l=null===(t=null==document?void 0:document.getElementById("photo"))||void 0===t?void 0:t.files;a.onload=(i=function(e){var t,i;return(0,o.__generator)(this,function(n){return null===(t=null==document?void 0:document.getElementById("preview"))||void 0===t||t.setAttribute("src",null==e?void 0:null===(i=e.target)||void 0===i?void 0:i.result),[2]})},r=function(){var e=this,t=arguments;return new Promise(function(o,r){var a=i.apply(e,t);function l(e){n(a,o,r,l,c,"next",e)}function c(e){n(a,o,r,l,c,"throw",e)}l(void 0)})},function(e){return r.apply(this,arguments)}),a.readAsDataURL(l[0])},s=function(){var e;null===(e=document.getElementById("photo"))||void 0===e||e.click()};return(0,r.jsxs)(c.Z,{children:[(0,r.jsx)("p",{children:"Asset "}),(0,r.jsx)("h1",{className:"p-3 text-xl font-bold",children:t.name}),(0,r.jsxs)("form",{className:"flex flex-col items-center gap-6",onSubmit:i,children:[(0,r.jsxs)("div",{className:"",children:[(0,r.jsx)("label",{htmlFor:"description",children:"Whats wrong"}),(0,r.jsx)("input",{name:"description",className:"border border-black block",placeholder:""})]}),(0,r.jsx)("input",{className:"py-4 hidden",type:"file",name:"photo",id:"photo",capture:"user",accept:"image/*",onChange:a}),(0,r.jsx)("button",{className:"w-32 dark:border-white border-black border rounded-lg py-2 px-3",onClick:s,children:"Take a photo"}),(0,r.jsx)(d(),{id:"preview",src:"",width:"200",height:"200",alt:"preview"}),(0,r.jsxs)("div",{children:[(0,r.jsx)("button",{type:"submit",className:"px-3 py-2 m-4 text-1xl inline border border-black tracking-widest font-bold rounded-lg",children:"SUBMIT"}),(0,r.jsx)(l(),{href:"/",children:(0,r.jsx)("a",{className:"p-2 border border-black rounded-lg",children:"Go back "})})]})]})]})}},5675:function(e,t,i){e.exports=i(8045)}},function(e){e.O(0,[996,774,888,179],function(){return e(e.s=6877)}),_N_E=e.O()}]);