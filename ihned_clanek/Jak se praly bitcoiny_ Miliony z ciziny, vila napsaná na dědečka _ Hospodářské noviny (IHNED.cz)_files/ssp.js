/*! Raven.js 3.19.1 (aa94a44) | github.com/getsentry/raven-js */
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.SEZNAM_SSP_RAVEN=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){function d(a){this.name="RavenConfigError",this.message=a}d.prototype=new Error,d.prototype.constructor=d,b.exports=d},{}],2:[function(a,b,c){var d=function(a,b,c){var d=a[b],e=a;if(b in a){var f="warn"===b?"warning":b;a[b]=function(){var a=[].slice.call(arguments),g=""+a.join(" "),h={level:f,logger:"console",extra:{arguments:a}};"assert"===b?a[0]===!1&&(g="Assertion failed: "+(a.slice(1).join(" ")||"console.assert"),h.extra.arguments=a.slice(1),c&&c(g,h)):c&&c(g,h),d&&Function.prototype.apply.call(d,e,a)}}};b.exports={wrapMethod:d}},{}],3:[function(a,b,c){(function(c){function d(){return+new Date}function e(a,b){return o(b)?function(c){return b(c,a)}:b}function f(){this.a=!("object"!=typeof JSON||!JSON.stringify),this.b=!n(I),this.c=!n(J),this.d=null,this.e=null,this.f=null,this.g=null,this.h=null,this.i=null,this.j={},this.k={logger:"javascript",ignoreErrors:[],ignoreUrls:[],whitelistUrls:[],includePaths:[],collectWindowErrors:!0,maxMessageLength:0,maxUrlLength:250,stackTraceLimit:50,autoBreadcrumbs:!0,instrument:!0,sampleRate:1},this.l=0,this.m=!1,this.n=Error.stackTraceLimit,this.o=H.console||{},this.p={},this.q=[],this.r=d(),this.s=[],this.t=[],this.u=null,this.v=H.location,this.w=this.v&&this.v.href,this.x();for(var a in this.o)this.p[a]=this.o[a]}var g=a(6),h=a(7),i=a(1),j=a(5),k=j.isError,l=j.isObject,l=j.isObject,m=j.isErrorEvent,n=j.isUndefined,o=j.isFunction,p=j.isString,q=j.isEmptyObject,r=j.each,s=j.objectMerge,t=j.truncate,u=j.objectFrozen,v=j.hasKey,w=j.joinRegExp,x=j.urlencode,y=j.uuid4,z=j.htmlTreeAsString,A=j.isSameException,B=j.isSameStacktrace,C=j.parseUrl,D=j.fill,E=a(2).wrapMethod,F="source protocol user pass host port path".split(" "),G=/^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/,H="undefined"!=typeof window?window:"undefined"!=typeof c?c:"undefined"!=typeof self?self:{},I=H.document,J=H.navigator;f.prototype={VERSION:"3.19.1",debug:!1,TraceKit:g,config:function(a,b){var c=this;if(c.g)return this.y("error","Error: Raven has already been configured"),c;if(!a)return c;var d=c.k;b&&r(b,function(a,b){"tags"===a||"extra"===a||"user"===a?c.j[a]=b:d[a]=b}),c.setDSN(a),d.ignoreErrors.push(/^Script error\.?$/),d.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/),d.ignoreErrors=w(d.ignoreErrors),d.ignoreUrls=!!d.ignoreUrls.length&&w(d.ignoreUrls),d.whitelistUrls=!!d.whitelistUrls.length&&w(d.whitelistUrls),d.includePaths=w(d.includePaths),d.maxBreadcrumbs=Math.max(0,Math.min(d.maxBreadcrumbs||100,100));var e={xhr:!0,console:!0,dom:!0,location:!0},f=d.autoBreadcrumbs;"[object Object]"==={}.toString.call(f)?f=s(e,f):f!==!1&&(f=e),d.autoBreadcrumbs=f;var h={tryCatch:!0},i=d.instrument;return"[object Object]"==={}.toString.call(i)?i=s(h,i):i!==!1&&(i=h),d.instrument=i,g.collectWindowErrors=!!d.collectWindowErrors,c},install:function(){var a=this;return a.isSetup()&&!a.m&&(g.report.subscribe(function(){a.z.apply(a,arguments)}),a.k.instrument&&a.k.instrument.tryCatch&&a.A(),a.k.autoBreadcrumbs&&a.B(),a.C(),a.m=!0),Error.stackTraceLimit=a.k.stackTraceLimit,this},setDSN:function(a){var b=this,c=b.D(a),d=c.path.lastIndexOf("/"),e=c.path.substr(1,d);b.E=a,b.h=c.user,b.F=c.pass&&c.pass.substr(1),b.i=c.path.substr(d+1),b.g=b.G(c),b.H=b.g+"/"+e+"api/"+b.i+"/store/",this.x()},context:function(a,b,c){return o(a)&&(c=b||[],b=a,a=void 0),this.wrap(a,b).apply(this,c)},wrap:function(a,b,c){function d(){var d=[],f=arguments.length,g=!a||a&&a.deep!==!1;for(c&&o(c)&&c.apply(this,arguments);f--;)d[f]=g?e.wrap(a,arguments[f]):arguments[f];try{return b.apply(this,d)}catch(h){throw e.I(),e.captureException(h,a),h}}var e=this;if(n(b)&&!o(a))return a;if(o(a)&&(b=a,a=void 0),!o(b))return b;try{if(b.J)return b;if(b.K)return b.K}catch(f){return b}for(var g in b)v(b,g)&&(d[g]=b[g]);return d.prototype=b.prototype,b.K=d,d.J=!0,d.L=b,d},uninstall:function(){return g.report.uninstall(),this.M(),Error.stackTraceLimit=this.n,this.m=!1,this},captureException:function(a,b){var c=!k(a),d=!m(a),e=m(a)&&!a.error;if(c&&d||e)return this.captureMessage(a,s({trimHeadFrames:1,stacktrace:!0},b));m(a)&&(a=a.error),this.d=a;try{var f=g.computeStackTrace(a);this.N(f,b)}catch(h){if(a!==h)throw h}return this},captureMessage:function(a,b){if(!this.k.ignoreErrors.test||!this.k.ignoreErrors.test(a)){b=b||{};var c,d=s({message:a+""},b);try{throw new Error(a)}catch(e){c=e}c.name=null;var f=g.computeStackTrace(c),h=f.stack[1],i=h&&h.url||"";if((!this.k.ignoreUrls.test||!this.k.ignoreUrls.test(i))&&(!this.k.whitelistUrls.test||this.k.whitelistUrls.test(i))){if(this.k.stacktrace||b&&b.stacktrace){b=s({fingerprint:a,trimHeadFrames:(b.trimHeadFrames||0)+1},b);var j=this.O(f,b);d.stacktrace={frames:j.reverse()}}return this.P(d),this}}},captureBreadcrumb:function(a){var b=s({timestamp:d()/1e3},a);if(o(this.k.breadcrumbCallback)){var c=this.k.breadcrumbCallback(b);if(l(c)&&!q(c))b=c;else if(c===!1)return this}return this.t.push(b),this.t.length>this.k.maxBreadcrumbs&&this.t.shift(),this},addPlugin:function(a){var b=[].slice.call(arguments,1);return this.q.push([a,b]),this.m&&this.C(),this},setUserContext:function(a){return this.j.user=a,this},setExtraContext:function(a){return this.Q("extra",a),this},setTagsContext:function(a){return this.Q("tags",a),this},clearContext:function(){return this.j={},this},getContext:function(){return JSON.parse(h(this.j))},setEnvironment:function(a){return this.k.environment=a,this},setRelease:function(a){return this.k.release=a,this},setDataCallback:function(a){var b=this.k.dataCallback;return this.k.dataCallback=e(b,a),this},setBreadcrumbCallback:function(a){var b=this.k.breadcrumbCallback;return this.k.breadcrumbCallback=e(b,a),this},setShouldSendCallback:function(a){var b=this.k.shouldSendCallback;return this.k.shouldSendCallback=e(b,a),this},setTransport:function(a){return this.k.transport=a,this},lastException:function(){return this.d},lastEventId:function(){return this.f},isSetup:function(){return!!this.a&&(!!this.g||(this.ravenNotConfiguredError||(this.ravenNotConfiguredError=!0,this.y("error","Error: Raven has not been configured.")),!1))},afterLoad:function(){var a=H.RavenConfig;a&&this.config(a.dsn,a.config).install()},showReportDialog:function(a){if(I){a=a||{};var b=a.eventId||this.lastEventId();if(!b)throw new i("Missing eventId");var c=a.dsn||this.E;if(!c)throw new i("Missing DSN");var d=encodeURIComponent,e="";e+="?eventId="+d(b),e+="&dsn="+d(c);var f=a.user||this.j.user;f&&(f.name&&(e+="&name="+d(f.name)),f.email&&(e+="&email="+d(f.email)));var g=this.G(this.D(c)),h=I.createElement("script");h.async=!0,h.src=g+"/api/embed/error-page/"+e,(I.head||I.body).appendChild(h)}},I:function(){var a=this;this.l+=1,setTimeout(function(){a.l-=1})},R:function(a,b){var c,d;if(this.b){b=b||{},a="raven"+a.substr(0,1).toUpperCase()+a.substr(1),I.createEvent?(c=I.createEvent("HTMLEvents"),c.initEvent(a,!0,!0)):(c=I.createEventObject(),c.eventType=a);for(d in b)v(b,d)&&(c[d]=b[d]);if(I.createEvent)I.dispatchEvent(c);else try{I.fireEvent("on"+c.eventType.toLowerCase(),c)}catch(e){}}},S:function(a){var b=this;return function(c){if(b.T=null,b.u!==c){b.u=c;var d;try{d=z(c.target)}catch(e){d="<unknown>"}b.captureBreadcrumb({category:"ui."+a,message:d})}}},U:function(){var a=this,b=1e3;return function(c){var d;try{d=c.target}catch(e){return}var f=d&&d.tagName;if(f&&("INPUT"===f||"TEXTAREA"===f||d.isContentEditable)){var g=a.T;g||a.S("input")(c),clearTimeout(g),a.T=setTimeout(function(){a.T=null},b)}}},V:function(a,b){var c=C(this.v.href),d=C(b),e=C(a);this.w=b,c.protocol===d.protocol&&c.host===d.host&&(b=d.relative),c.protocol===e.protocol&&c.host===e.host&&(a=e.relative),this.captureBreadcrumb({category:"navigation",data:{to:b,from:a}})},A:function(){function a(a){return function(b,d){for(var e=new Array(arguments.length),f=0;f<e.length;++f)e[f]=arguments[f];var g=e[0];return o(g)&&(e[0]=c.wrap(g)),a.apply?a.apply(this,e):a(e[0],e[1])}}function b(a){var b=H[a]&&H[a].prototype;b&&b.hasOwnProperty&&b.hasOwnProperty("addEventListener")&&(D(b,"addEventListener",function(b){return function(d,f,g,h){try{f&&f.handleEvent&&(f.handleEvent=c.wrap(f.handleEvent))}catch(i){}var j,k,l;return e&&e.dom&&("EventTarget"===a||"Node"===a)&&(k=c.S("click"),l=c.U(),j=function(a){if(a){var b;try{b=a.type}catch(c){return}return"click"===b?k(a):"keypress"===b?l(a):void 0}}),b.call(this,d,c.wrap(f,void 0,j),g,h)}},d),D(b,"removeEventListener",function(a){return function(b,c,d,e){try{c=c&&(c.K?c.K:c)}catch(f){}return a.call(this,b,c,d,e)}},d))}var c=this,d=c.s,e=this.k.autoBreadcrumbs;D(H,"setTimeout",a,d),D(H,"setInterval",a,d),H.requestAnimationFrame&&D(H,"requestAnimationFrame",function(a){return function(b){return a(c.wrap(b))}},d);for(var f=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],g=0;g<f.length;g++)b(f[g])},B:function(){function a(a,c){a in c&&o(c[a])&&D(c,a,function(a){return b.wrap(a)})}var b=this,c=this.k.autoBreadcrumbs,d=b.s;if(c.xhr&&"XMLHttpRequest"in H){var e=XMLHttpRequest.prototype;D(e,"open",function(a){return function(c,d){return p(d)&&d.indexOf(b.h)===-1&&(this.W={method:c,url:d,status_code:null}),a.apply(this,arguments)}},d),D(e,"send",function(c){return function(d){function e(){if(f.W&&4===f.readyState){try{f.W.status_code=f.status}catch(a){}b.captureBreadcrumb({type:"http",category:"xhr",data:f.W})}}for(var f=this,g=["onload","onerror","onprogress"],h=0;h<g.length;h++)a(g[h],f);return"onreadystatechange"in f&&o(f.onreadystatechange)?D(f,"onreadystatechange",function(a){return b.wrap(a,void 0,e)}):f.onreadystatechange=e,c.apply(this,arguments)}},d)}c.xhr&&"fetch"in H&&D(H,"fetch",function(a){return function(c,d){for(var e=new Array(arguments.length),f=0;f<e.length;++f)e[f]=arguments[f];var g,h=e[0],i="GET";"string"==typeof h?g=h:"Request"in H&&h instanceof H.Request?(g=h.url,h.method&&(i=h.method)):g=""+h,e[1]&&e[1].method&&(i=e[1].method);var j={method:i,url:g,status_code:null};return b.captureBreadcrumb({type:"http",category:"fetch",data:j}),a.apply(this,e).then(function(a){return j.status_code=a.status,a})}},d),c.dom&&this.b&&(I.addEventListener?(I.addEventListener("click",b.S("click"),!1),I.addEventListener("keypress",b.U(),!1)):(I.attachEvent("onclick",b.S("click")),I.attachEvent("onkeypress",b.U())));var f=H.chrome,g=f&&f.app&&f.app.runtime,h=!g&&H.history&&history.pushState&&history.replaceState;if(c.location&&h){var i=H.onpopstate;H.onpopstate=function(){var a=b.v.href;if(b.V(b.w,a),i)return i.apply(this,arguments)};var j=function(a){return function(){var c=arguments.length>2?arguments[2]:void 0;return c&&b.V(b.w,c+""),a.apply(this,arguments)}};D(history,"pushState",j,d),D(history,"replaceState",j,d)}if(c.console&&"console"in H&&console.log){var k=function(a,c){b.captureBreadcrumb({message:a,level:c.level,category:"console"})};r(["debug","info","warn","error","log"],function(a,b){E(console,b,k)})}},M:function(){for(var a;this.s.length;){a=this.s.shift();var b=a[0],c=a[1],d=a[2];b[c]=d}},C:function(){var a=this;r(this.q,function(b,c){var d=c[0],e=c[1];d.apply(a,[a].concat(e))})},D:function(a){var b=G.exec(a),c={},d=7;try{for(;d--;)c[F[d]]=b[d]||""}catch(e){throw new i("Invalid DSN: "+a)}if(c.pass&&!this.k.allowSecretKey)throw new i("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");return c},G:function(a){var b="//"+a.host+(a.port?":"+a.port:"");return a.protocol&&(b=a.protocol+":"+b),b},z:function(){this.l||this.N.apply(this,arguments)},N:function(a,b){var c=this.O(a,b);this.R("handle",{stackInfo:a,options:b}),this.X(a.name,a.message,a.url,a.lineno,c,b)},O:function(a,b){var c=this,d=[];if(a.stack&&a.stack.length&&(r(a.stack,function(b,e){var f=c.Y(e,a.url);f&&d.push(f)}),b&&b.trimHeadFrames))for(var e=0;e<b.trimHeadFrames&&e<d.length;e++)d[e].in_app=!1;return d=d.slice(0,this.k.stackTraceLimit)},Y:function(a,b){var c={filename:a.url,lineno:a.line,colno:a.column,"function":a.func||"?"};return a.url||(c.filename=b),c.in_app=!(this.k.includePaths.test&&!this.k.includePaths.test(c.filename)||/(Raven|TraceKit)\./.test(c["function"])||/raven\.(min\.)?js$/.test(c.filename)),c},X:function(a,b,c,d,e,f){var g=(a?a+": ":"")+(b||"");if(!this.k.ignoreErrors.test||!this.k.ignoreErrors.test(b)&&!this.k.ignoreErrors.test(g)){var h;if(e&&e.length?(c=e[0].filename||c,e.reverse(),h={frames:e}):c&&(h={frames:[{filename:c,lineno:d,in_app:!0}]}),(!this.k.ignoreUrls.test||!this.k.ignoreUrls.test(c))&&(!this.k.whitelistUrls.test||this.k.whitelistUrls.test(c))){var i=s({exception:{values:[{type:a,value:b,stacktrace:h}]},culprit:c},f);this.P(i)}}},Z:function(a){var b=this.k.maxMessageLength;if(a.message&&(a.message=t(a.message,b)),a.exception){var c=a.exception.values[0];c.value=t(c.value,b)}var d=a.request;return d&&(d.url&&(d.url=t(d.url,this.k.maxUrlLength)),d.Referer&&(d.Referer=t(d.Referer,this.k.maxUrlLength))),a.breadcrumbs&&a.breadcrumbs.values&&this.$(a.breadcrumbs),a},$:function(a){for(var b,c,d,e=["to","from","url"],f=0;f<a.values.length;++f)if(c=a.values[f],c.hasOwnProperty("data")&&l(c.data)&&!u(c.data)){d=s({},c.data);for(var g=0;g<e.length;++g)b=e[g],d.hasOwnProperty(b)&&d[b]&&(d[b]=t(d[b],this.k.maxUrlLength));a.values[f].data=d}},_:function(){if(this.c||this.b){var a={};return this.c&&J.userAgent&&(a.headers={"User-Agent":navigator.userAgent}),this.b&&(I.location&&I.location.href&&(a.url=I.location.href),I.referrer&&(a.headers||(a.headers={}),a.headers.Referer=I.referrer)),a}},x:function(){this.aa=0,this.ba=null},ca:function(){return this.aa&&d()-this.ba<this.aa},da:function(a){var b=this.e;return!(!b||a.message!==b.message||a.culprit!==b.culprit)&&(a.stacktrace||b.stacktrace?B(a.stacktrace,b.stacktrace):!a.exception&&!b.exception||A(a.exception,b.exception))},ea:function(a){if(!this.ca()){var b=a.status;if(400===b||401===b||429===b){var c;try{c=a.getResponseHeader("Retry-After"),c=1e3*parseInt(c,10)}catch(e){}this.aa=c?c:2*this.aa||1e3,this.ba=d()}}},P:function(a){var b=this.k,c={project:this.i,logger:b.logger,platform:"javascript"},e=this._();if(e&&(c.request=e),a.trimHeadFrames&&delete a.trimHeadFrames,a=s(c,a),a.tags=s(s({},this.j.tags),a.tags),a.extra=s(s({},this.j.extra),a.extra),a.extra["session:duration"]=d()-this.r,this.t&&this.t.length>0&&(a.breadcrumbs={values:[].slice.call(this.t,0)}),q(a.tags)&&delete a.tags,this.j.user&&(a.user=this.j.user),b.environment&&(a.environment=b.environment),b.release&&(a.release=b.release),b.serverName&&(a.server_name=b.serverName),o(b.dataCallback)&&(a=b.dataCallback(a)||a),a&&!q(a)&&(!o(b.shouldSendCallback)||b.shouldSendCallback(a)))return this.ca()?void this.y("warn","Raven dropped error due to backoff: ",a):void("number"==typeof b.sampleRate?Math.random()<b.sampleRate&&this.fa(a):this.fa(a))},ga:function(){return y()},fa:function(a,b){var c=this,d=this.k;if(this.isSetup()){if(a=this.Z(a),!this.k.allowDuplicates&&this.da(a))return void this.y("warn","Raven dropped repeat event: ",a);this.f=a.event_id||(a.event_id=this.ga()),this.e=a,this.y("debug","Raven about to send:",a);var e={sentry_version:"7",sentry_client:"raven-js/"+this.VERSION,sentry_key:this.h};this.F&&(e.sentry_secret=this.F);var f=a.exception&&a.exception.values[0];this.captureBreadcrumb({category:"sentry",message:f?(f.type?f.type+": ":"")+f.value:a.message,event_id:a.event_id,level:a.level||"error"});var g=this.H;(d.transport||this.ha).call(this,{url:g,auth:e,data:a,options:d,onSuccess:function(){c.x(),c.R("success",{data:a,src:g}),b&&b()},onError:function(d){c.y("error","Raven transport failed to send: ",d),d.request&&c.ea(d.request),c.R("failure",{data:a,src:g}),d=d||new Error("Raven send failed (no additional details provided)"),b&&b(d)}})}},ha:function(a){var b=H.XMLHttpRequest&&new H.XMLHttpRequest;if(b){var c="withCredentials"in b||"undefined"!=typeof XDomainRequest;if(c){var d=a.url;"withCredentials"in b?b.onreadystatechange=function(){if(4===b.readyState)if(200===b.status)a.onSuccess&&a.onSuccess();else if(a.onError){var c=new Error("Sentry error code: "+b.status);c.request=b,a.onError(c)}}:(b=new XDomainRequest,d=d.replace(/^https?:/,""),a.onSuccess&&(b.onload=a.onSuccess),a.onError&&(b.onerror=function(){var c=new Error("Sentry error code: XDomainRequest");c.request=b,a.onError(c)})),b.open("POST",d+"?"+x(a.auth)),b.send(h(a.data))}}},y:function(a){this.p[a]&&this.debug&&Function.prototype.apply.call(this.p[a],this.o,[].slice.call(arguments,1))},Q:function(a,b){n(b)?delete this.j[a]:this.j[a]=s(this.j[a]||{},b)}},f.prototype.setUser=f.prototype.setUserContext,f.prototype.setReleaseContext=f.prototype.setRelease,b.exports=f}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{1:1,2:2,5:5,6:6,7:7}],4:[function(a,b,c){(function(c){var d=a(3),e="undefined"!=typeof window?window:"undefined"!=typeof c?c:"undefined"!=typeof self?self:{},f=e.Raven,g=new d;g.noConflict=function(){return e.Raven=f,g},g.afterLoad(),b.exports=g}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{3:3}],5:[function(a,b,c){(function(a){function c(a){return"object"==typeof a&&null!==a}function d(a){switch({}.toString.call(a)){case"[object Error]":return!0;case"[object Exception]":return!0;case"[object DOMException]":return!0;default:return a instanceof Error}}function e(a){return j()&&"[object ErrorEvent]"==={}.toString.call(a)}function f(a){return void 0===a}function g(a){return"function"==typeof a}function h(a){return"[object String]"===Object.prototype.toString.call(a)}function i(a){for(var b in a)return!1;return!0}function j(){try{return new ErrorEvent(""),!0}catch(a){return!1}}function k(a){function b(b,c){var d=a(b)||b;return c?c(d)||d:d}return b}function l(a,b){var c,d;if(f(a.length))for(c in a)p(a,c)&&b.call(null,c,a[c]);else if(d=a.length)for(c=0;c<d;c++)b.call(null,c,a[c])}function m(a,b){return b?(l(b,function(b,c){a[b]=c}),a):a}function n(a){return!!Object.isFrozen&&Object.isFrozen(a)}function o(a,b){return!b||a.length<=b?a:a.substr(0,b)+"…"}function p(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function q(a){for(var b,c=[],d=0,e=a.length;d<e;d++)b=a[d],h(b)?c.push(b.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")):b&&b.source&&c.push(b.source);return new RegExp(c.join("|"),"i")}function r(a){var b=[];return l(a,function(a,c){b.push(encodeURIComponent(a)+"="+encodeURIComponent(c))}),b.join("&")}function s(a){var b=a.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!b)return{};var c=b[6]||"",d=b[8]||"";return{protocol:b[2],host:b[4],path:b[5],relative:b[5]+c+d}}function t(){var a=A.crypto||A.msCrypto;if(!f(a)&&a.getRandomValues){var b=new Uint16Array(8);a.getRandomValues(b),b[3]=4095&b[3]|16384,b[4]=16383&b[4]|32768;var c=function(a){for(var b=a.toString(16);b.length<4;)b="0"+b;return b};return c(b[0])+c(b[1])+c(b[2])+c(b[3])+c(b[4])+c(b[5])+c(b[6])+c(b[7])}return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0,c="x"===a?b:3&b|8;return c.toString(16)})}function u(a){for(var b,c=5,d=80,e=[],f=0,g=0,h=" > ",i=h.length;a&&f++<c&&(b=v(a),!("html"===b||f>1&&g+e.length*i+b.length>=d));)e.push(b),g+=b.length,a=a.parentNode;return e.reverse().join(h)}function v(a){var b,c,d,e,f,g=[];if(!a||!a.tagName)return"";if(g.push(a.tagName.toLowerCase()),a.id&&g.push("#"+a.id),b=a.className,b&&h(b))for(c=b.split(/\s+/),f=0;f<c.length;f++)g.push("."+c[f]);var i=["type","name","title","alt"];for(f=0;f<i.length;f++)d=i[f],e=a.getAttribute(d),e&&g.push("["+d+'="'+e+'"]');return g.join("")}function w(a,b){return!!(!!a^!!b)}function x(a,b){return!w(a,b)&&(a=a.values[0],b=b.values[0],a.type===b.type&&a.value===b.value&&y(a.stacktrace,b.stacktrace))}function y(a,b){if(w(a,b))return!1;var c=a.frames,d=b.frames;if(c.length!==d.length)return!1;for(var e,f,g=0;g<c.length;g++)if(e=c[g],f=d[g],e.filename!==f.filename||e.lineno!==f.lineno||e.colno!==f.colno||e["function"]!==f["function"])return!1;return!0}function z(a,b,c,d){var e=a[b];a[b]=c(e),d&&d.push([a,b,e])}var A="undefined"!=typeof window?window:"undefined"!=typeof a?a:"undefined"!=typeof self?self:{};b.exports={isObject:c,isError:d,isErrorEvent:e,isUndefined:f,isFunction:g,isString:h,isEmptyObject:i,supportsErrorEvent:j,wrappedCallback:k,each:l,objectMerge:m,truncate:o,objectFrozen:n,hasKey:p,joinRegExp:q,urlencode:r,uuid4:t,htmlTreeAsString:u,htmlElementAsString:v,isSameException:x,isSameStacktrace:y,parseUrl:s,fill:z}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],6:[function(a,b,c){(function(c){function d(){return"undefined"==typeof document||null==document.location?"":document.location.href}var e=a(5),f={collectWindowErrors:!0,debug:!1},g="undefined"!=typeof window?window:"undefined"!=typeof c?c:"undefined"!=typeof self?self:{},h=[].slice,i="?",j=/^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;f.report=function(){function a(a){m(),s.push(a)}function b(a){for(var b=s.length-1;b>=0;--b)s[b]===a&&s.splice(b,1)}function c(){n(),s=[]}function k(a,b){var c=null;if(!b||f.collectWindowErrors){for(var d in s)if(s.hasOwnProperty(d))try{s[d].apply(null,[a].concat(h.call(arguments,2)))}catch(e){c=e}if(c)throw c}}function l(a,b,c,g,h){var l=null;if(v)f.computeStackTrace.augmentStackTraceWithInitialElement(v,b,c,a),o();else if(h&&e.isError(h))l=f.computeStackTrace(h),k(l,!0);else{var m,n={url:b,line:c,column:g},p=void 0,r=a;if("[object String]"==={}.toString.call(a)){var m=a.match(j);m&&(p=m[1],r=m[2])}n.func=i,l={name:p,message:r,url:d(),stack:[n]},k(l,!0)}return!!q&&q.apply(this,arguments)}function m(){r||(q=g.onerror,g.onerror=l,r=!0)}function n(){r&&(g.onerror=q,r=!1,q=void 0)}function o(){var a=v,b=t;t=null,v=null,u=null,k.apply(null,[a,!1].concat(b))}function p(a,b){var c=h.call(arguments,1);if(v){if(u===a)return;o()}var d=f.computeStackTrace(a);if(v=d,u=a,t=c,setTimeout(function(){u===a&&o()},d.incomplete?2e3:0),b!==!1)throw a}var q,r,s=[],t=null,u=null,v=null;return p.subscribe=a,p.unsubscribe=b,p.uninstall=c,p}(),f.computeStackTrace=function(){function a(a){if("undefined"!=typeof a.stack&&a.stack){for(var b,c,e,f=/^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,g=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,h=/^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,j=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,k=/\((\S*)(?::(\d+))(?::(\d+))\)/,l=a.stack.split("\n"),m=[],n=(/^(.*) is undefined$/.exec(a.message),0),o=l.length;n<o;++n){if(c=f.exec(l[n])){var p=c[2]&&0===c[2].indexOf("native"),q=c[2]&&0===c[2].indexOf("eval");q&&(b=k.exec(c[2]))&&(c[2]=b[1],c[3]=b[2],c[4]=b[3]),e={url:p?null:c[2],func:c[1]||i,args:p?[c[2]]:[],line:c[3]?+c[3]:null,column:c[4]?+c[4]:null}}else if(c=h.exec(l[n]))e={url:c[2],func:c[1]||i,args:[],line:+c[3],column:c[4]?+c[4]:null};else{if(!(c=g.exec(l[n])))continue;var q=c[3]&&c[3].indexOf(" > eval")>-1;q&&(b=j.exec(c[3]))?(c[3]=b[1],c[4]=b[2],c[5]=null):0!==n||c[5]||"undefined"==typeof a.columnNumber||(m[0].column=a.columnNumber+1),e={url:c[3],func:c[1]||i,args:c[2]?c[2].split(","):[],line:c[4]?+c[4]:null,column:c[5]?+c[5]:null}}!e.func&&e.line&&(e.func=i),m.push(e)}return m.length?{name:a.name,message:a.message,url:d(),stack:m}:null}}function b(a,b,c,d){var e={url:b,line:c};if(e.url&&e.line){if(a.incomplete=!1,e.func||(e.func=i),a.stack.length>0&&a.stack[0].url===e.url){if(a.stack[0].line===e.line)return!1;if(!a.stack[0].line&&a.stack[0].func===e.func)return a.stack[0].line=e.line,!1}return a.stack.unshift(e),a.partial=!0,!0}return a.incomplete=!0,!1}function c(a,g){for(var h,j,k=/function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,l=[],m={},n=!1,o=c.caller;o&&!n;o=o.caller)if(o!==e&&o!==f.report){if(j={url:null,func:i,line:null,column:null},o.name?j.func=o.name:(h=k.exec(o.toString()))&&(j.func=h[1]),"undefined"==typeof j.func)try{j.func=h.input.substring(0,h.input.indexOf("{"))}catch(p){}m[""+o]?n=!0:m[""+o]=!0,l.push(j)}g&&l.splice(0,g);var q={name:a.name,message:a.message,url:d(),stack:l};return b(q,a.sourceURL||a.fileName,a.line||a.lineNumber,a.message||a.description),q}function e(b,e){var g=null;e=null==e?0:+e;try{if(g=a(b))return g}catch(h){if(f.debug)throw h}try{if(g=c(b,e+1))return g}catch(h){if(f.debug)throw h}return{name:b.name,message:b.message,url:d()}}return e.augmentStackTraceWithInitialElement=b,e.computeStackTraceFromStackProp=a,e}(),b.exports=f}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{5:5}],7:[function(a,b,c){function d(a,b){for(var c=0;c<a.length;++c)if(a[c]===b)return c;return-1}function e(a,b,c,d){return JSON.stringify(a,g(b,d),c)}function f(a){var b={stack:a.stack,message:a.message,name:a.name};for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b}function g(a,b){var c=[],e=[];return null==b&&(b=function(a,b){return c[0]===b?"[Circular ~]":"[Circular ~."+e.slice(0,d(c,b)).join(".")+"]"}),function(g,h){if(c.length>0){var i=d(c,this);~i?c.splice(i+1):c.push(this),~i?e.splice(i,1/0,g):e.push(g),~d(c,h)&&(h=b.call(this,g,h))}else c.push(h);return null==a?h instanceof Error?f(h):h:a.call(this,g,h)}}c=b.exports=e,c.getSerialize=g},{}]},{},[4])(4)});
/**
 * Limitations:
 *   - external scripts written using document.write are async, not immediately available
 *   - code written using document.write is buffered in a highly speculative way
 *   - thou shalt not call document.write while there is an external script load pending
 */
;(function() {

	var emptyTags = "area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,source,path,animate"+
	"animateColor,circle,ellipse,glyph,hatchpath,image,line,mpath,path,polygon,polyline,rect,solidcolor"+
	"stop,tref,use,view,";
emptyTags = emptyTags.split(",");
var selfCloseTags = "colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,path,animate"+
	"animateColor,circle,ellipse,glyph,hatchpath,image,line,mpath,path,polygon,polyline,rect,solidcolor"+
    "stop,tref,use,view,".split(",");

/**
 * List of sequentially loaded (pending) scripts. Only one at a time may be loaded/executed,
 * because when it executes, we need to have its <script> node accessible (Scripts.current).
 */
var Scripts = {
	current: null,
	queue: {
		local: [], /* requested during processing the current <script> block */
		global: [] /* requested earlier */
	},

	enqueue: function(scripts) {
		this.queue.local = this.queue.local.concat(scripts);

		/* wait until the document parsing is over */
		setTimeout(function() { Scripts.processQueue(); }, 0);
	},

	/**
	 * Try to load next {external,inline} script sequentially.
	 */
	processQueue: function() {
		if (this.current) { return; }

		while (this.queue.local.length) { this.queue.global.unshift(this.queue.local.pop()); }
		if (!this.queue.global.length) { return; }

		var script = this.queue.global.shift();
		var parent = document.getElementById(script.id);

		switch (script.type) {
			case "external":
				var node = document.createElement("script");
				this.current = node;

				var onload = function() {
					node.onload = node.onerror = node.onreadystatechange = null;
					Scripts.current = null;
					Scripts.processQueue();
				}

				if ("onload" in node) {
					node.onload = onload;
					node.onerror = onload;
				} else {
					node.onreadystatechange = function() {
						if (node.readyState == "loaded") { onload(); }
					}
				}

				node.src = script.src;
				parent.parentNode && parent.parentNode.replaceChild(node, parent);
			break;

			case "inline":
				Scripts.current = parent;
				(1,eval)(script.code); /* eval in global scope */
				Scripts.current = null;
				parent.parentNode && parent.parentNode.removeChild(parent);
				Scripts.processQueue();
			break;
		}
	}
}

/** Temporary ID counter */
var idCount = 0;

/** Prefix for temporary element IDs */
var idPrefix = "dw-tmp-";

/**
 * Write HTML parts to the parent node
 */
var writeToHTML = function(node, html) {
	/* use DocumentFragment; insertAdjacentHTML only in FF >= 8 */
	var frag = document.createDocumentFragment();
	var div = document.createElement("div");
	div.innerHTML = html;
	while (div.firstChild) { frag.appendChild(div.firstChild); }

	/* For <script> nodes, we insert before them. For other nodes, we append to them. */
	if (node.nodeName.toLowerCase() == "script" || node.id.indexOf(idPrefix) == 0) {
		node.parentNode.insertBefore(frag, node);
	} else {
		node.appendChild(frag);
	}
}

/**
 * Write all pending data to the parent node
 */
var writeTo = function(node, data) {
	var scripts = [];
	var srcRE = /src=['"]?([^\s'"]+)/i;
	var srcRemoveRE = /src=['"]?([^\s'"]+['"]?)/i;

	var html = data.replace(/<script(.*?)>([\s\S]*?)<\/script>/ig, function(match, tag, code) {
		var id = idPrefix + (idCount++);

		var src = tag.match(srcRE);
		if (src) {
			scripts.push({type:"external", id:id, src:src[1]});
		} else {
			scripts.push({type:"inline", id:id, code:code});
		}

		var script = ("<script" + tag + "></script>").replace(srcRemoveRE, "");
		return "<span id='"+id+"'></span>" + script;
	});

	writeToHTML(node, html);
	Scripts.enqueue(scripts);
}

/** We have to buffer arguments to document.write and check them for validity/writability */
var CodeBuffer = {
	code: "",
	node: null,

	append: function(node, code) {
		/* reset whatever was remaining in the code buffer */
		if (this.node != node) {
			this.code = "";
			this.node = node;
		}

		this.code += code;

		if (this.isWritable()) {
			var code = this.code;
			this.code = "";
			writeTo(this.node, code);
		}
	},

	/**
	 * Is this code considered safe to be parsed?
	 */
	isWritable: function() {
		// remove scripts as they can provide false positives
		var code = this.code.replace(/<script[\s\S]*?<\/script>/gi, "");
		var openTags = code.match(/<[a-z0-9-]+[\s>]/ig) || [];
		var closeTags = code.match(/<\/[a-z0-9-]+/ig) || [];
		var openTagsReal = [];
		var closeTagsReal = [];

		var openCount = 0;
		for (var i=0;i<openTags.length;i++) {
			var name = openTags[i].substring(1).toLowerCase();
			/* Ignore empty tags (they have no close counterpart). Ignore self-close tags as well, we have no idea whether they are closed. */
			var n = name.substring(0,name.length-1);
			if (emptyTags.indexOf(n) > -1 || selfCloseTags.indexOf(n) > -1) { continue; }
			openCount++;
			openTagsReal.push(n);
		}

		var closeCount = 0;
		for (var i=0;i<closeTags.length;i++) {
			var name = closeTags[i].substring(2).toLowerCase();
			/* Empty tags cannot appear here. Ignore self-close tags, they do not signify anything. */
			if (selfCloseTags.indexOf(name) > -1) { continue; }
			closeCount++;
			closeTagsReal.push(name);
		}

		// API for exporting opened and closed tags for testing purposes
		if ("DCWRT_DEBUG" in window) {
				if (typeof window.CustomEvent === "function" && typeof window.dispatchEvent === "function") {
						var output = {status: true, tagsOpen: openTagsReal, tagsClose: closeTagsReal, countOpen: openCount, countClose: closeCount};
						if (openCount != closeCount) { output.status = false; }
						/* Create custom event for debugging */
						var evt = new CustomEvent('documentWriteIsWritable', { detail: output });
						window.dispatchEvent(evt);
				}
		}

		if (openCount != closeCount) { return false; }

		return true;
	}
}

/**
 * Our very own document.write
 */
var write = function() {
	/*
	 * Find a proper "parent" node for the current document.write call.
	 * We can get here from three different document.write callsites:
	 *   1) plain <script> node in the original document:
	 *      -> take the last open <script> node
	 *   2) inline <script> code from another document.write:
	 *      -> this is a queued call; Scripts.current is its <script> FIXME
	 *   3) external <script> code from another document.write:
	 *      -> this is a queued call; Scripts.current is its <script>
	 */
	var scripts = document.getElementsByTagName("script");
	var node = (Scripts.current || scripts[scripts.length-1] || document.body);

	var code = "";
	for (var i=0;i<arguments.length;i++) { code += arguments[i]; }
	CodeBuffer.append(node, code);
}

window.replaceDocumentWrite = function () {
	document.write = write;
	document.writeln = write;
	document.writeTo = writeTo;
}

})();

/******************************************************************************/
(function (global) {
	var sf = {};
	sf.host = {};

	// interni konf
	var _conf = {};
	_conf.server = "https://ssp.imedia.cz";
	_conf.updateInterval = 1000;
	_conf.registeredServers = [_conf.server];


	var timeoutID = null;
	// posluchac z iframe
	sf._listen = function(e) {
		if (_conf.registeredServers.indexOf(e.origin) != -1) {
		//if (e.origin == _conf.server ) {
			try {
				var d = JSON.parse(e.data);
				var id = d.sfName;
				switch (d.method) {
					case "expand":
						sf.SF.frames[id]._expand(d);
					break;
					case "collapse":
						sf.SF.frames[id]._collapse(d);
					break;
					case "cookie":
						sf.SF.frames[id]._cookie(d);
					break;
				}
			} catch (E) {}
		}
	}

	// posluchac na scroll udalost
	sf._resize = function(e) {
		if (timeoutID == null) {
			timeoutID = setTimeout(function () {
				timeoutID = null;
				for (var instanceSF in sf.SF.frames) {
					var i = sf.SF.frames[instanceSF];
					var d = {method:"geom", "geom_info": i.getGeom()};
					i.sendData(d);
				}
			}, _conf.updateInterval);
		}
	}

	window.addEventListener("message", sf._listen);
	window.addEventListener("scroll", sf._resize);
	window.addEventListener("resize", sf._resize);

	// konstruktor pro jednu danou pozici
	sf.SF = function(iframe, ad, data, server) {
		// nastaveni serveru - kvuli test a dev prostredi
		this.server = server ? server : _conf.server;
		if (server) {
			_conf.registeredServers.push(server);
		}
		
		//console.info("### [SF] > master:  created");
		this.name = "sf" + sf.SF.count++;

		iframe.id = this.name;
		//sf.SF.frames[this.name] = this;
		sf.SF.frames[iframe.id] = this; // jako klic pouzijeme window iframu, v odpovedi z iframu je pak e.source

		this.iframe = iframe;
		//debugger;
		var getElm = function(elm, className) {
			var count = 0; 
			while(count < 10) {
				count++;
				if (elm.classList.contains(className)) {
					return elm;
				} else {
					elm = elm.parentNode;
				}
			}
		}
		this.cont = getElm(iframe, 'adFull');
		this.contOriginalWidth = this.cont.offsetWidth;
		this.contOriginalHeight = this.cont.offsetHeight;
		this.contResizing = getElm(iframe, 'sssp-resizeCont');
		this.contResizing.style.position = "absolute"; // default je prekryvani
		this.ad = ad;
		this.data = data;

		var d = {
			method: "init",
			geom_info: this.getGeom()
		};
		this.sendData(d);
	}
	sf.SF.count = 0; // celkovy pocet instanci sf
	sf.SF.frames = {}; // pole instacni sf

	sf.SF.prototype.sendData = function(data)	{
		data["sfName"] = this.name; // tohle posleme vzdy kvuli identifikaci;
		if (this.iframe.contentWindow && this.iframe.contentWindow.postMessage) {
			this.iframe.contentWindow.postMessage(JSON.stringify(data), this.server);
		}
	}

	// nacte hodnoty o okne  a iframu
	sf.SF.prototype.getGeom = function() {
		var ifrPos = this.iframe.getBoundingClientRect();
		var iv = this._getInView();
		var o = {
			// okno
			win: {
				t: window.screenY,
				b: window.innerHeight-window.screenY,
				l: window.screenX-window.screenX,
				r: window.innerWidth-window.screenY,
				w: window.innerWidth,
				h: window.innerHeight
			},
			// iframe
			self: {
				t: ifrPos.top,
				b: ifrPos.bottom,
				l: ifrPos.left,
				r: ifrPos.right,
				w: ifrPos.width,
				h: ifrPos.height,
				z: window.getComputedStyle(this.iframe, null).getPropertyValue("z-index"),
				xiv: iv.x,
				yiv:iv.y

			},
			exp: {
				t:1000, // zde budou nuly nastavi stranka
				b:1000, // kvuli nativnim inzarum
				l:1000,
				r:1000,
				xs:0,
				ys:0
			}
		};
		return (o);
	}

	sf.SF.prototype._getInView = function() {
		//debugger;
		try {
			var rect = this.cont.getBoundingClientRect();
			if ("width" in rect && !rect.width) {
				return {x:0,y:0};
			}
		} catch (e) {
			return {x:0,y:0}; 
		}

		var w = rect.right - rect.left;
		var h = rect.bottom - rect.top;
		var W = document.documentElement.clientWidth;
		var H = document.documentElement.clientHeight;

		var x = Math.max(0, Math.min(rect.right, W) - Math.max(rect.left, 0));
		var y = Math.max(0, Math.min(rect.bottom, H) - Math.max(rect.top, 0));
		var p = (w * h) > 0 ? (x * y) / (w * h): 0;
		var px = x/w;
		var py = y/h;
		//console.log("procent in view", p, this.cont, rect);

		return {x:px,y:py};
	}

	sf.SF.prototype._collapse = function(d) {
		//console.info("### [SF] > master:  collapsing");

		this.contResizing.style.position = "static";
		this.contResizing.style.width = "100%";
		this.contResizing.style.height = "100%";
		this.cont.style.width = this.contOriginalWidth + "px";;
		this.cont.style.height = this.contOriginalHeight + "px";
		//this.contResizing.style.top =
		//this.contResizing.style.left =
		//this.contResizing.style.bottom =
		this.contResizing.style.right = "0px";

		this.sendData({method:"collapse", status: {ok: true, msg:"done"}})
	}

	sf.SF.prototype._expand = function(d) {
		//console.info("### [SF] > master:  expanding");
		var resizeDimensions = d.resizeDimensions;
		// neni povoleno zvetsovani
		if (!conf.support["exp-push"] && !conf.support["exp-ovr"]) {
			this.sendData({method:"expand", status: {error:1, msg:"not allowed"}})
				return;
		}

		for (var o in resizeDimensions) {
			// ext chce roztahovat stranku ne overlay
			if (o == "push" && resizeDimensions[o] && conf.support["exp-push"]) {
					// nastav roztahovani
					this.contResizing.style.position = "static";
			}
			if (o == "push" && !resizeDimensions[o] && conf.support["exp-ovr"]) {
					// nastav prekryvani
					this.contResizing.style.position = "absolute";
			}

			var value = resizeDimensions[o];

			switch (o) {
				case "t":this._setValues(value, "top", "height", "offsetHeight", resizeDimensions);break;
				case "b":this._setValues(value, "bottom", "height", "offsetHeight", resizeDimensions);break;
				case "r":this._setValues(value, "right", "width", "offsetWidth", resizeDimensions);break;
				case "l":this._setValues(value, "left", "width", "offsetWidth", resizeDimensions);break;
			}
		}

		this.sendData({method:"expand", status: {ok: true, msg:"done"}})
	}

	sf.SF.prototype._setValues = function (value, param1, param2, param3, resizeDimensions) {
		this.contResizing.style[param1] = "-" + value + "px";
		var push = resizeDimensions.push ? resizeDimensions.push : 0; // pokud nezada jedeme exp-ovr
		var p = parseInt(this.contResizing[param3]);
		this.contResizing.style[param2] = p + value + "px";
		// pokud jde o push musime zvetsit i hlavniho rodice
		//if (this.contResizing.style.position == "static") {
		if (push == 1) {
			this.cont.style[param2] = p + value + "px";
		}
		//}
	}

	sf.SF.prototype._cookie = function (d) {
		//console.info("### [SF] > master:  cookie");
		//console.info("### [SF] > master frameName:" + this.name);
		var cookieName = d.cookieName;
		var cookieData = d.cookieData || null;
		var cook = "";

		if (cookieData) {
			if (!cookieData.info) { // data k ulozeni do cookie jsou povinna
				return;
			}
			cook = encodeURIComponent(cookieName) + "=" + encodeURIComponent(cookieData.info);
			// zadal i expire
			if (cookieData.expires) {
				var dE = new Date(cookieData.expires);
				var expires = "; expires=" + dE.toUTCString();
				cook += expires;
			}
			document.cookie = cook;
			this.sendData({method:"cookie",status:{ok:true,msg:"done", cmd:"write-cookie"}});
		} else {
			var c =  decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(cookieName).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
			// FIXME zakazat cteni nasich cookie potrebuju list
			this.sendData({method:"cookie",status:{ok:true,msg:"done", cmd:"read-cookie"}, cookie:c});
		}
	}

	// *************************************************************************

	// je registrovan posluchac
	var is_registered = false;

	var initWidth = 0;
	var initHeight = 0;
	var geom_info = null;

	var conf = {};
	// podporovane prostredky
	// musi se predat z hosta pri vytvoreni iframu
	conf.support = {
		"exp-ovr": true,
		"exp-push": true,
		"read-cookie": false,
		"write-cookie": false
	}

	global.$sf = sf;
	global.SF = sf.SF;
})(window)
/**
 * @file SSP reklamní výdejový script
 *
 * @version 0.1
 * @author Zdenek Vlach <zdenek.vlach@firma.seznam.cz>
 * @copyright 2018
 *
 */

/*eslint strict: [0, "global"]*/
'use strict';

/*
	pozor při změneně parametru pozice či v confu nutno upravit validation.js
*/
/**
 * polyfill for CustomEvent in IE9,...
 */
(function() {
	if (typeof window.CustomEvent === 'function') { return false; }

	function CustomEvent(event, params) {
		params = params || {bubbles: false, cancelable: false, detail: undefined};
		var evt = document.createEvent('CustomEvent');

		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	}

	CustomEvent.prototype = window.Event.prototype;
	window.CustomEvent = CustomEvent;
})();

/**
 * @module sssp
 * @desc Zapouzdření celé funkcionality a následné vyexportování do window.ssp
 * */
(function(global) {
	/**
	 * Vytáhne GET parametry z URL
	 * @return Object
	 */
	function getUrlParams() {
		var queryString = window.location.search.substring(1);
		var paramQueries = queryString.split('&');
		var params = {};

		if (paramQueries.length > 0 && paramQueries[0] != '') {
			for (var i = 0; i < paramQueries.length; i++) {
				var paramPair = paramQueries[i].split('=');

				params[paramPair[0]] = paramPair[1];
			}
		}
		return params;
	}

	var Raven = window.SEZNAM_SSP_RAVEN; // Use our own Raven instance

	var debugExtensionId = 'ljpnolgcojkhoemjaccecimbmiejkpmm'; // ID Chrome extension
	// debug
	var dbgConf = 0;
	var domain = '.cz';
	// detekce prostredi vyvoj provoz a zjisteni umisteni ssp.js ve strance
	var scripts = document.getElementsByTagName('script');
	var myScriptSRC = scripts[scripts.length - 1].src;
	var develZones = [/.dev.dszn.cz/, /.test.dszn.cz/, /.dev/, /.test/];
	var urlParams = getUrlParams();

	for (var i = 0; i < develZones.length; i++) {
		var test = myScriptSRC.match(develZones[i]);

		if (test) {
			dbgConf = 1;
			domain = test[0];
		}
	}

	if (urlParams.sspdebugmode !== undefined) {
		var urlDebug = urlParams.sspdebugmode;
		var debugLevel = isNaN(Number(urlDebug)) ? null : Number(urlDebug);

		if (debugLevel !== null) {
			dbgConf = debugLevel;
		}
	}


	/**
	 * Debugovací fce pro konzoli
	 * v ostrém provozu se nastaví na null a nebude se logovat
	 * @memberof module:sssp
	 */
	var dbg = function() {
		var arg = Array.prototype.slice.call(arguments);
		var msg = arg.splice(1);
		var consoleStyles = 'display: inline-block; color: #fff; background: #a90101; padding: 1px 4px; border-radius: 3px;';
		var consoleOutput = function() {
			return console[arg[0]]('%cSSP', consoleStyles, (msg.length == 1 ? msg.toString() : msg));
		};

		switch (dbgConf) {
		case 1: // all
			consoleOutput();
			break;
		case 2: // errors and infos
			if (arg[0] == 'error' || arg[0] == 'info') {
				consoleOutput();
			}
			break;
		case 3: // errors only
			if (arg[0] == 'error') {
				consoleOutput();
			}
			break;
		}
	};

	if (global.sssp) {
		dbg('info', '### sssp already exists - exiting');
		return;
	}

	dbg('info', '### creating sssp object');
	/** @namespace */
	var sssp = {};

	sssp.zoneToId = []; // FIXME zustává?
	sssp.returnedAds = [];
	sssp.positions = [];
	sssp.viewHandlerEnabled = false;
	sssp._loaded = false;
	sssp._functionStack = []; // pole fci ktere byly volany pred nactenim dotu
	sssp.media = null;

	var finished3rdparty = false;
	/**
	 * Sync 3rd party systémů a změření pageview
	 * @memberof module:sssp
	 */
	var sync3rdparty = function() {
		if (finished3rdparty) { return; }
		finished3rdparty = true;
		dbg('info', '### sync external codes ###');
		var cnt = sssp.conf.tmpContainer || document.body || document.head;
		var syncScript = document.createElement('script');

		syncScript.src = sssp.conf.protocol + sssp.conf.server + sssp.conf.syncPath + 'sync_codes.js';
		cnt.appendChild(syncScript);
	};

	/**
	 * Vraci url aktualni stranky, kvuli bezpecnostnim hlavickam nemusime dostat http refereru plnou cestu
	 * @returns {String} url aktualne otevrene stranky
	 * @memberof module:sssp
	 */
	sssp._getLocation = function() {
		try {
			return top.document.location.href || '';
		} catch (e) {
			return document.location.href || '';
		}
	};

	dbg('info', '### creating sssp default config');
	sssp.conf = {
		webid: 0,
		pvId: '',
		params: ['zoneId', 'width', 'height', 'minWidth', 'minHeight', 'options', 'externalId'],
		optionsParams: ['section', 'collocation', 'passons', 'flags', 'spotId'],
		// povolene parametry k odesilani
		// old stuff: section, collocation, passons, flags

		protocol: 'https://',
		server: 'ssp.imedia.cz',
		path: '/xhr',
		version: 'v1',  // verze vydeje
		iframeUrl: '/static/html/reklama.html',
		syncPath: '/static/js/',
		method: 'POST',
		tmpContainer: null, // bacha spousti se hned FIXME viz 3rdparty kontent
		sentryEnable: true,
		documentWriteOverride: true,


		site: sssp._getLocation(),
		allowedSources: {
			'hp_feed': 'hp_feed', // protoze nekteri uz to maj zadany ve strance takto
			'sekce-z-internetu': 'hp_feed',
			'denni-tisk': 'novinky',
			'novinky': 'novinky',
			'media': 'media',
			'z-boxiku': 'hp_box',
			'hp_box': 'hp_box',
			'search': 'search',
			'software': 'software'
		},
		source: '',
		adblock: false,

		cookieDomain: '',
		cookieExpiration: 30
	};

	/**
	 * Vyrobi a vraci kod packy umistene vpravo dole
	 * @param {String} type typ DSP (SKLIK, APNEXUS,..)
	 * @returns {String} kod html packy
	 * @memberof module:sssp
	 */
	sssp._createTemplate = function(type) {
		dbg('info', '### creating template ###');
		dbg('info', type);
		var TEMPLATES = {
			SKLIK:	'<img src="' + sssp.conf.protocol + sssp.conf.server + '/static/img/paw-1.svg" style=\"height:20px\">',
			APPNEXUS: '<img src="' + sssp.conf.protocol + sssp.conf.server + '/static/img/paw-3.svg" style=\"height:20px\">',
			PUBMATIC: '<img src="' + sssp.conf.protocol + sssp.conf.server + '/static/img/paw-4.svg" style=\"height:20px\">',
			ADVERT: '<img src="' + sssp.conf.protocol + sssp.conf.server + '/static/img/paw-2.svg" style=\"height:20px\">'
		};

		if (!TEMPLATES[type]) {
			type = 'ADVERT';
		}
		var code = '<div style="position:absolute; bottom:0; right:0; height:20px;" class="packa">' +
		'<a href="https://o.seznam.cz/ochrana-udaju/personalizovana-reklama/" ' +
		' onmouseover="this.firstChild.style.display=\'none\';this.lastChild.style.display=\'inline\';"' +
		' onmouseout="this.firstChild.style.display=\'inline\';this.lastChild.style.display=\'none\';"' +
		'>' + TEMPLATES[type] + '<img src="' + sssp.conf.protocol + sssp.conf.server + '/static/img/advert.png" alt="" style=\"display:none;height:20px\"></a>' +
		'</div>';

		if (type == 'SKLIK') { code = ''; } // sklik nechceme zapnout
		return code;
	};

	/**
	 * Zapocita pageview pro sklik
	 * vola se automaticky pri DOM onload a SPA pak mohou volat tuto metodu
	 * @returns {String} fnv1aHashString aktualne otevrene stranky
	 * @memberof module:sssp
	 */
	sssp._createPageView = function() {
		var date = new Date();

		date = date.toUTCString();
		var url = document.location.href;
		var r = Math.random().toString();

		return sssp._fnv1aHashString(date + url + r);
	};

	/**
	 * Spocita a vraci hash zadaneho retezce
	 * @param {String} string url stranky a datum
	 * @memberof module:sssp
	 */
	sssp._fnv1aHashString = function(string) {
		// 32-bit FNV offset basis and prime.
		var fnvPrime = 16777619;
		var hash = 2166136261;

		for (var i = 0, c = string.length; i < c; i++) {
			var code = string.charCodeAt(i) & 0xFF;

			// Add it to the hash.
			hash = hash ^ code;
			// Bitwise OR with zero to ensure a 32bit integer.
			hash = (hash * fnvPrime) | 0;
		}
		return Math.abs(hash).toString();
	};

	/**
	 * Funkce na konfiguraci vydeje nyni uz nelze nastavovat primo promene, to kvuli Sentry a sync3rdparty
	 * @param {Object} cfg konfigurace pro ssp
	 * @memberof module:sssp
	 */
	sssp.config = function(cfg) {
		if (!sssp._loaded) {
			sssp._functionStack.push({name: 'config', params: [cfg]});
			return;
		}
		dbg('info', '### updating sssp config ###');
		for (var o in cfg) {
			if (o == 'source' && this.media != null) {
				cfg[o] = this.media;
			}
			sssp.conf[o] = cfg[o];
		}
		sync3rdparty(); // volani sync kodu apnexus, pubmatic, ...
	};

	/**
	 * Nastavuje id pro stranku, vola se pri vlozeni ssp scriptu do stranky a nebo v SPA aplikacich rucne, kdyz je potreba
	 * @memberof module:sssp
	 */
	sssp.setPageViewId = function() {
		if (!sssp._loaded) {
			sssp._functionStack.push({name: 'setPageViewId', params: []});
			return;
		}
		dbg('info', '### setting pageViewId for page ###');
		sssp.conf.pvId = sssp._createPageView();
		dbg('info', '#### pageViewId:' + sssp.conf.pvId);
		if (window.DOT) {
			sssp.myDOT.hit('adload', {'d': {'adId': sssp.conf.pvId}});
		}
	};

	/**
	 * Nastavuje id pro stranku, vola se pri vlozeni ssp scriptu do stranky a nebo v SPA aplikacich rucne, kdyz je potreba
	 * @memberof module:sssp
	 */
	sssp.getPageViewId = function() {
		return sssp.conf.pvId;
	};

	/**
	 * Ziska reklamu pro vsechny divy ve strance
	 * @memberof module:sssp
	 */
	sssp.getAdsByTags = function() {
		if (!sssp._loaded) {
			sssp._functionStack.push({name: 'getAdsByTags', params: []});
			return;
		}

		var divs = document.querySelectorAll('div[data-szn-ssp-ad]');

		var data = [];

		for (var i = 0; i < divs.length; i++) {
			var o = JSON.parse(divs[i].getAttribute('data-szn-ssp-ad'));

			o.id = divs[i];
			data.push(o);
		}

		sssp.getAds(data);
	};

	/**
	 * Ziska reklamu pro zadane zony
	 * @param {Object|Array} data konfigurace zon na strance
	 * @param {Object} opt  dodatecna konfigurace (AMPHTML, ...)
	 * @memberof module:sssp
	 */
	sssp.getAds = function(data, opt) {
		if (!sssp._loaded) {
			sssp._functionStack.push({name: 'getAds', params: [data, opt]});
			return;
		}
		// povolime mereni visibility
		if (!sssp.viewHandlerEnabled) {
			document.addEventListener('DOMContentLoaded', sssp._viewCHeckHandler);
			window.addEventListener('resize', sssp._viewCHeckHandler);
			window.addEventListener('scroll', sssp._viewCHeckHandler);
			sssp.viewHandlerEnabled = true;
		}

		sync3rdparty(); // volani sync kodu apnexus, pubmatic, ...

		dbg('info', '### starting Sentry ###');
		// nacteni Sentry a inicializace
		var SentryURL = 'https://a34ed19506984caf996b13167b5113de@sentry.sklik.cz/62';
		var SentryDEVURL = 'https://339b7c1d7af84b78a6cad62f2c7861ae@sentry.sklik.cz/43';
		var surl = (domain == '.cz' ? SentryURL : SentryDEVURL);

		if (this.conf.sentryEnable) {
			Raven.config(surl, {
				//new stuff
				captureUnhandledRejections: false,
				maxBreadcrumbs: 10,
				sampleRate: 0.8,
				//end
				environment: sssp.conf.server,
				autoBreadcrumbs: true,
				whitelistUrls: [/ssp\.imedia\.cz/, /ssp\.imedia\.test\.dszn\.cz/, /ssp\.imedia\.dev\.dszn\.cz/, /iimedia\.sbeta\.cz/]
			}).install();
		} else {
			Raven = {};
			Raven.captureException = function() {};
		}
		dbg('info', '### starting get ads ###');
		dbg('log', 'with parameters', data, opt);
		if (typeof data !== 'object') {
			dbg('error', 'no valid parameters: types', data);
			return;
		} else {
			if (Array.isArray(data) && !data.length) {
				dbg('error', 'no valid parameters: array lenght 0', data);
				return;
			}
		}

		// pokud je zadan objekt vyrobime pole, at dale pracujeme jen z polem
		if (!Array.isArray(data)) {
			var d = [];

			d.push(data);
			data = d;
			dbg('log', 'data object transformed to array', data);
		}

		// logujeme do reportera
		sssp._logAds(data);

		// vyrobime obecna data posilana s requestem na reklamu
		var prefix = this._buildPrefix();
		var host = sssp.conf.protocol + this.conf.server + '/' + sssp.conf.version + this.conf.path;
		var completeData = prefix;

		completeData.zones = [];
		// zkontroluju data o pozicich
		for (var i = 0; i < data.length; i++) {
			var item = this._checkItem(data[i], opt);

			if (item == null) {
				data.splice(i, 1);
				i--;
			} else {
				completeData.zones.push(item);
			}
		}

		dbg('log', 'merged prefix and data object', completeData);

		/* nejprve vyrobit instanci XHR */
		if (window.XMLHttpRequest) {
			var _xhr = new XMLHttpRequest();

			this._xdomain = false;
		} else {
			dbg('error', 'No XHR available');
			throw Raven.captureException(new Error('No XHR available'));
		}

		_xhr.onload = function(e) { sssp._onLoad(e, data, opt); };
		_xhr.onerror = function() {
			dbg('error', 'No XHR available');
		};

		/* Pred odeslanim requestu zkontroluj, zda jej nemame presmerovat */
		sssp._hostOverride(function(hostOverride) {
			host = typeof hostOverride !== 'undefined' ? hostOverride : host;
			_xhr.open(sssp.conf.method, host);
			_xhr.withCredentials = true;
			if (!sssp._xdomain) {
				_xhr.setRequestHeader('Content-type', 'application/json'); // FIXME nemuzu kvuli ie8
			}
			_xhr.send(JSON.stringify(completeData));
			dbg('log', 'sending data to adserver', completeData);
		});
	};

	/**
	 * Zjisti, zda si uzivatel preje presmerovat requesty na reklamy.
	 * https://chrome.google.com/webstore/detail/ssp-debugging-utility/ljpnolgcojkhoemjaccecimbmiejkpmm
	 * @param {function} sendRequest callback na odeslani pozadavku
	 */
	sssp._hostOverride = function(sendRequest) {
		function getServerUrl(host) {
			return 'https://' + host + '/' + sssp.conf.version + sssp.conf.path;
		}

		function isChrome() {
			return (
				typeof chrome !== 'undefined' &&
				typeof chrome.runtime !== 'undefined'
			);
		}

		function isRedirect(response) {
			return (
				response != undefined &&
				response.status != undefined &&
				response.status.redirect === true
			);
		}

		if (urlParams.sspredirect !== undefined) {
			/* V URL parametrech je uveden redirect server */
			var url = getServerUrl(urlParams.sspredirect);

			sendRequest(url);
		} else if (isChrome()) {
			/* Jsme-li v Chrome, zeptame se extensiony na debug server */
			var message = {message: 'status'};

			chrome.runtime.sendMessage(debugExtensionId, message, function(response) {
				if (isRedirect(response)) {
					/* Extension je nainstalovana a mame zapnute presmerovani */
					var hostOverride = getServerUrl(response.status.server);

					sendRequest(hostOverride);
				} else {
					/* Extension neni nainstalovana/aktivni, reklamu volame normalne */
					sendRequest();
				}
			});
		} else {
			/* Nejsme v Chrome */
			sendRequest();
		}
	};

	/**
		* Zapise reklamu do stranky podle prichozich parametru
		* @param {Object} ad - objekt ziskane reklamy
		* @param {Object} data - objekt popisujici jednotlive zony
		* @memberof module:sssp
	 */
	sssp.writeAd = function(ad, data) {
		dbg('info', '### starting write ads###');
		dbg('log', 'with parameters', ad, data);

		// nic nevydavame neni reklama
		if (ad.type == 'empty') {
			dbg('log', 'no ad type:', ad.type);
			sssp.served(ad.tracking.served);
			return;
		}

		// hack pro nativni sklik inzeraty
		if (ad.width == 111 && ad.height == 111) {
			//ad.width="100%";
			//ad.height="100%";
			ad.responsive = true;
		 }

		if (ad.type == 'iframe_url') { this._writeIframe(ad, data); }
		if (ad.type == 'code' || ad.type == 'iframe') {
			if (!ad.iframe) {
				this._writeCodeToPage(ad, data);
			} else {
				this._writeHTMLtoIframe(ad, data);
			}
		}
		// pokud sem propadne nejaky typ co potrebuje callback je to spatne
		if (['code_url', 'vast', 'vast_url', 'json', 'json_url'].indexOf(ad.type) != -1) {
			Raven.captureException(new Error('Invalid ad type to process (' + ad.type + ')'));
		}
	};

	/**
	 * Vyrabi inner element (obal)
	 * @param {Object} data data o pozici
	 * @param {Node} container prvek kam se pripoji div
	 * @returns {Node} cnt flex element
	 * @memberof module:sssp
	 */
	sssp._createInner = function(ad, data, container) {
		dbg('info', '### starting create inner box element ###');
		var cnt = document.createElement('div');

		cnt.className = 'sssp-resizeCont';
		container.appendChild(cnt);
		if (!ad.responsive) {
			cnt.setAttribute('style', 'width:' + ad.width + 'px; height:' + ad.height + 'px');
		} else {
			cnt.setAttribute('style', 'width:100%; height:100%;');
		}
		/* eslint-disable */
		cnt.offsetHeight;
		/* eslint-enable */
		return cnt;
	};

	/**
	 * Podle rozmeru, ktery presahuje velikost containeru, provede resize reklamy
	 * @param {Object} ad - reklama z ssp
	 * @param {Object} data - definice pozice
	 * @param {Node} container - prvek ve strance (hlavni element)
	 * @param {Node} f - prvek ve strance (nas s inner)
	 * @memberof module:sssp
	 */
	sssp._resize = function(ad, data, container, f) {
		dbg('info', '### resizing ###');
		if ((container.offsetWidth < ad.width) || (container.offsetHeight < ad.height)) {
			var wRatio = container.offsetWidth / ad.width;
			var hRatio = container.offsetHeight / ad.height;
			var r = Math.min(wRatio, hRatio);

			if (!wRatio) {r = hRatio;}
			if (!hRatio) {r = wRatio;}
			f.style.transformOrigin = 'top left';
			f.style.transform = 'scale(' + r + ')';
			container.style.height = (Math.round(container.offsetHeight * r) + 'px'); // pokud resizujeme ... upravime i vysku containeru
		}
	};

	sssp._setSize = function(ad, data, container) {
		if (!container.offsetHeight) {
			// nastavime vysku pokud je
			container.style.height = ad.height + 'px';
		}

		if (!ad.responsive && (container.offsetWidth || container.offsetWidth != ad.width)) {
			if (ad.width < document.documentElement.scrollWidth) {
				container.style.width = ad.width + 'px';
				container.style.maxWidth = '100%';
			}
		}

		// nejlepsi reseni pro branding pres pole elements
		if (data.bestElement && !container.offsetWidth) {
			container.style.width = ad.width + 'px';
		}
	};

	/**
	 * Vybere element podle rozmeru (nejblizsi nejmensi k aktualnimu banneru)
	 * @param {Object} ad - reklama z sssp
	 * @param {Object} data - definice pozice
	 * @returns {Object} iframe:iframe, f:f - iframe do ktereho se vypisuje reklama a inner element
	 * @memberof module:sssp
	 */
	sssp._prepareHTML = function(ad, data) {
		var bestElement = this._returnBestElement(data, ad);

		// pokud v polid elements byl vhodny kandidat na container
		// prepiseme element v data. id snad to bude OK

		if (bestElement != null) {
			data.id = bestElement.id;
			data.bestElement = true;
		}
		var container = (typeof data.id === 'string' ? document.getElementById(data.id) : data.id);

		if (!container) {
			Raven.captureException(new Error('No container for ad (' + data.zoneId + ')'));
			return null;
		}

		sssp._setSize(ad, data, container);
		// top element now has adFull class
		container.className += ' adFull';

		var positioningContainer = document.createElement('div');

		positioningContainer.classList.add('sssp-posCont');
		positioningContainer.setAttribute('style', 'width:100%; height:100%; position:relative;');
		container.appendChild(positioningContainer);

		var tmpl = this._createTemplate(ad.dsp);
		var tmplCont = document.createElement('div');

		tmplCont.innerHTML = tmpl;

		// build containing div
		var f = this._createInner(ad, data, positioningContainer);

		var iframe = this._createIframe(ad);

		if (!ad.responsive) { this._resize(ad, data, container, f); }

		f.appendChild(tmplCont);
		/*eslint-disable */
		return {'iframe': iframe, 'f': f};
		/*eslint-enable */
	};

	/**
	 * Zapise reklamu typu url do iframe, preferovany zpusob vypisu
	 * @param {Object} ad - reklama z sssp
	 * @param {Object} data - definice pozice
	 * @memberof module:sssp
	 */
	sssp._writeIframe = function(ad, data) {
		dbg('info', '### starting write ad to iframe ###');
		dbg('log', 'with parameters', ad, data);

		var elms = sssp._prepareHTML(ad, data);

		if (elms == null) {
			return; // doslo k chybe pri hledani containeru
		}
		var iframe = elms.iframe;
		var f = elms.f;

		iframe.onload = function() {
			// SafeFrame init - sklik nema v sobe SF external
			dbg('info', '## SafeFrame for ' + data.zoneId + ' initialized');

			iframe.onload = null;

			var urlParts = iframe.src.match(/(http[s]?)\:\/\/(.+\.[\w]{0,4})/);

			/*eslint-disable */
			new $sf.SF(iframe, ad, data, urlParts[1] + "://" + urlParts[2]); //sssp.conf.server
			/*eslint-enable */

			sssp.served(ad.tracking.served);
			sssp._viewCHeckHandler();

			// fireEvent pro adb
			var event = new CustomEvent('xiframe', {
				detail: {
					id: iframe.id
				}
			});

			window.dispatchEvent(event);
		};

		// fireEvent pro adb
		iframe.onerror = function() {
			var event = new CustomEvent('xiframe', {
				detail: {
					'id': iframe.id
				}
			});

			window.dispatchEvent(event);
		};

		iframe.src = ad.data;
		f.appendChild(iframe);

		dbg('log', 'iframe created', iframe);
	};

	/**
	  * Zapise reklamu typu code primo do stranky, zatim pres inner html (nevykonavame scripty)
	  * @param {Object} ad - reklama z sssp
	  * @param {Object} data - definice pozice
	  * @memberof module:sssp
	 */
	sssp._writeHTMLtoIframe = function(ad, data) {
		dbg('info', '### starting write ad code to Irame ###');
		dbg('log', 'with parameters', ad, data);

		var elms = sssp._prepareHTML(ad, data);
		var iframe = elms.iframe;
		var f = elms.f;

		// posleme banner do iframu
		iframe.onload = function() {
			dbg('log', 'banner sent to iframe', JSON.stringify(ad));
			iframe.onload = null;
			var a = ad;

			a.ssspID = ad.zoneId; // identifikator iframu

			// SafeFrame init
			/*eslint-disable */
			new $sf.SF(iframe, ad, data, sssp.conf.protocol + sssp.conf.server);
			/*eslint-enable */

			dbg('info', '## SafeFrame for ' + data.zoneId + ' initialized');
			if (iframe.contentWindow && iframe.contentWindow.postMessage) {
				iframe.contentWindow.postMessage(JSON.stringify(a), sssp.conf.protocol + sssp.conf.server);
			}
			// zapocitame impresse
			sssp.served(ad.tracking.served);
			sssp._viewCHeckHandler();

			// fireEvent pro adb
			var event = new CustomEvent('xiframe', {
				detail: {
					id: iframe.id
				}
			});

			window.dispatchEvent(event);
		};

		// fireEvent pro adb
		iframe.onerror = function() {
			var event = new CustomEvent('xiframe', {
				detail: {
					id: iframe.id
				}
			});

			window.dispatchEvent(event);
		};

		iframe.src = sssp.conf.protocol + sssp.conf.server + sssp.conf.iframeUrl;
		f.appendChild(iframe);
	};

	/**
	 * Callback vypisu url kde se nachazi JSON nebo HTML data banneru
	 * @param {Object} ad reklama z ssp
	 * @param {Object} data popis pozice
	 * @memberof module:sssp
	 */
	sssp._URLDataToCallback = function(ad, data) {
		/* nejprve vyrobit instanci XHR */
		if (window.XMLHttpRequest) {
			var _xhr = new XMLHttpRequest();

			this._xdomain = false;
		} else {
			return;
		}

		/* kvuli vice volani getAds si musim pamatovat aktualni data o pozicich */
		(function(ad, data, self) {
			var url = ad.data; // url na SKLIK API

			var errHandler = function(e, ad, data) {
				var d = e.target.responseText;

				if (d == '') {
					ad.type = 'error';
					if (data.callback) {
						data.callback(ad, data);
						return true;
					} else {
						sssp.writeAd(ad, data);
						return true;
					}
				} else {
					return false;
				}
			};

			_xhr.onload = function(e) {
				// pokud uzivatel zadal id, znamena to ze budeme stazeny kod vypisovat do stranky primo my
				// plati pro vast_url
				// pokud je typ json_url - nesmi byt zadan soucasne callback a id
				// v ostatnich pripadech ano, a vyuzijeme to k mereni visibility

				var fail = errHandler(e, ad, data); // zkontrolujeme odpoved

				if (fail) {
					return; //nechceme pokracovat
				}

				ad.data = e.target.responseText; // ziskana data z URL pridame do ad objektu

				if (ad.type == 'json_url') {
					ad.type = 'json';
					data.callback(ad, data);
				} else {
					ad.type = 'code';
					if (data.callback) {
						data.callback(ad, data);
					} else {
						sssp.writeAd(ad, data);
					}
				}
			};

			_xhr.onerror = function(e) {
				errHandler(e, ad, data); // zkontrolujeme odpoved
			};

			_xhr.open('GET', url);
			_xhr.withCredentials = true;
			if (!self._xdomain) {
				_xhr.setRequestHeader('Content-type', 'application/json'); // FIXME nemuzu kvuli ie8
			}
			_xhr.send();
			dbg('log', 'sending requset to SKLIK JSON API', url);
		})(ad, data, this);
	};

	/**
	 * Zapise reklamu typu code primo do stranky, zatim pres inner html (nevykonavame scripty)
	 * @param ad {Object} - reklama z sssp
	 * @param data {Object} - definice pozice
	 * @memberof module:sssp
	**/
	sssp._writeCodeToPage = function(ad, data) {
		dbg('info', '### starting direct ad writitng ###');
		dbg('log', 'with parameters', ad, data);
		// musime zapnout nas doc.write
		if (this.conf.documentWriteOverride && !document.writeTo) {
			replaceDocumentWrite();
		}

		var bestElement = this._returnBestElement(data, ad);

		// pokud v polid elements byl vhodny kandidat na container
		// prepiseme element v data. id snad to bude OK

		if (bestElement != null) {
			data.id = bestElement.id;
			data.bestElement = true;
		}
		var container = (typeof data.id === 'string' ? document.getElementById(data.id) : data.id);

		if (!container) {
			Raven.captureException(new Error('No container for ad (' + data.zoneId + ')'));
			return;
		}

		sssp._setSize(ad, data, container);
		// top element now has adFull class
		container.className += ' adFull';

		var positioningContainer = document.createElement('div');

		positioningContainer.classList.add('sssp-posCont');
		positioningContainer.setAttribute('style', 'width:100%; height:100%; position:relative;');
		container.appendChild(positioningContainer);

		var tmpl = this._createTemplate(ad.dsp);
		var tmplCont = document.createElement('div');

		tmplCont.innerHTML = tmpl;

		// build containing div
		var f = this._createInner(ad, data, positioningContainer);

		//f.innerHTML = ad.data;
		if (document.writeTo) {
			document.writeTo(f, ad.data);
		} else {
			dbg('error', 'Source not allowed: ' + this.conf.source);
			Raven.captureException(new Error('Source not allowed:' + this.conf.source));
			return;
		}

		if (!ad.responsive) { this._resize(ad, data, container, f); }

		f.appendChild(tmplCont);

		// zapocitame impresse
		sssp.served(ad.tracking.served);
	};

	/**
	 * Vybere z pole elements odpovídající Node; musí mít stejnou nebo nejbližší větší velikost
	 * @param ad {Object} - reklama z sssp
	 * @param data {Object} - definice pozice
	 * @memberof module:sssp
	**/
	sssp._returnBestElement = function(data, ad) {
		var bestElement = null;

		// zajistit vypis do spravneho elementu
		if (data.elements) {
			// kontrola rozmeru
			var minArea = Infinity;

			for (var i = 0; i < data.elements.length; i++) {
				var dim = data.elements[i];

				if ((dim.width || ad.width) < ad.width || (dim.height || ad.height) < ad.height) {
					continue;
				}

				var area = (dim.width || ad.width) * (dim.height || ad.height);

				if (area < minArea) {
					bestElement = dim;
					minArea = area;
				}
			}
		}
		return bestElement;
	};

	/**
	 * Vyrobi element iframu a nastavi mu rozmery podle banneru nebo 100%
	 * @param ad {Object} - reklama z ad serveru
	 * @return iframe {Node} - iframe element
	 * @memberof module:sssp
	 */
	sssp._createIframe = function(ad) {
		var iframe = document.createElement('iframe');

		iframe.frameBorder = 0;
		iframe.scrolling = 'no';
		iframe.width = (!ad.responsive ? ad.width : '100%');// + "px";
		iframe.height = (!ad.responsive ? ad.height : '100%');// + "px";
		iframe.id = 'x' + Math.floor((Math.random() * 100000));
		return iframe;
	};

	/**
	  * Posluchac udalosti onload, vytahne responseText
	  * @param e {Object} - udalost
	  * @param positions {Object} - definice pozic
	  * @param opt {Object} - volitelny konfiguracni objekt
	  * @memberof module:sssp
	 */
	sssp._onLoad = function(e, positions, opt) {
		dbg('info', '### ads downloaded ###');

		var data = e.target.responseText;

		dbg('log', 'response text data', data);

		/* Chrome debug extension */
		if (typeof chrome !== 'undefined' && chrome.runtime) {
			chrome.runtime.sendMessage(debugExtensionId, {adResponse: data});
		}

		this._done(data, positions, opt);
	};

	 /**
	  * Zpracuje reklamu po nacteni
	  * @param data {Object} - reklama z sssp
	  *	@param positions {Object} - definice pozic
	  *	@param opt {Object} - volitelny konfiguracni objekt
	  * @memberof module:sssp
	 */
	sssp._done = function(data, positions, opt) {
		dbg('info', '### starting _done ###');
		try {
			var d = JSON.parse(data);
		} catch (e) {
			dbg('error', 'could not parse ads data', e);
			return;
		}
		dbg('log', 'parsed data form adserver', d);

		/// muze se stat ze, nedorazi ads, pokud jsou vyplnene zoneId spatne
		if (!d.ads) {
			return;
		}

		var ads = d.ads;

		sssp.returnedAds.push(sssp._setMapping(positions, ads));

		// fixme spojit data a ads do jednoho obektu a dat do positions
		for (var i = 0; i < ads.length; i++) {
			this.positions.push({
				data: positions[i],
				ad: ads[i]
			});
		}

		// volani z AMPHTML
		if (opt && opt.AMPcallback) {
			/* eslint-disable */
			opt.AMPcallback(ads);
			/* eslint-enable */
			return;
		}

		for (var i = 0; i < ads.length; i++) {
			var ad = ads[i];
			var d = positions[i];

			if (ad.type == 'error') {
				var msg = 'Position type error: ' + (ad.dbginfo.error ? ad.dbginfo.error : '');

				dbg('error', msg);
				Raven.captureException(new Error(msg));
				continue;
			}

			// zpetna kompat. s impress a miss
			if (ad.tracking.impress && ad.tracking.miss) {
				ad.tracking.served = ad.tracking.impress.concat(ad.tracking.miss);
			} else if (ad.tracking.impress) {
				ad.tracking.served = ad.tracking.impress;
			} else if (ad.tracking.miss) {
				ad.tracking.served = ad.tracking.miss;
			}

			/* eslint-disable */
			var event = new CustomEvent('sspadsloaded', {
				detail: {
					'ad': ad,
					data: d
				}
			});
			/* eslint-enable */

			window.dispatchEvent(event);

			if (d.callback) {
				dbg('info', '## call external callback for position ' + d.zoneId);
				switch (ad.type) {
				case 'vast':
					dbg('log', 'call VAST custom callback with:', d.callback, d);
					d.callback(ad.data, d);
					break;
				case 'code_url':
					dbg('log', 'call CODE_URL custom callback with:', d.callback, d);
					this._URLDataToCallback(ad, d);
					break;
				case 'json_url':
					dbg('log', 'call JSON_URL custom callback with:', d.callback, d);
					this._URLDataToCallback(ad, d);
					break;
				default: // vast_url, json
					d.callback(ad, d);
				}
			} else {
				if (ad.type == 'code_url') { // url_code je specificky, muze a nemusi mit vlastni callback
					this._URLDataToCallback(ad, d);
				} else {
					dbg('info', '## call writeAd for position ' + d.zoneId);
					this.writeAd(ad, d);
				}
			}
		}
	};

	/**
	 *
	 * @param {Object} data - popis pozic
	 * @param {Array} ads - reklamy z sssp
	 * @returns {Object} newData - popis pozic i s vydanymi spoty
	 */
	sssp._setMapping = function(data, ads) {
		var newData = [];

		for (var i = 0; i < data.length; i++) {
			var ad = ads[i];

			// mame reklamu
			var sp = ad.dbginfo;

			if (sp && sp.spotId) {
				newData.push(sp.spotId);
			}
		}
		return newData;
	};

	/**
	 * Vyrobime prefixove parametry pro url na ziskani reklam
	 *	@param returns {Object} obj objekt s parametry do url
	 * @memberof module:sssp
	 */
	sssp._buildPrefix = function() {
		dbg('info', '### build prefix ###');
		var obj = {
			'bhash': sssp._browserHash.computeHash(),
			'pvId': sssp.conf.pvId
		};

		if (this.conf.source && this.conf.source != '') {
			if (!(this.conf.source in this.conf.allowedSources)) { //this.conf.allowedSources.indexOf(this.conf.source) == -1
				dbg('error', 'Source not allowed: ' + this.conf.source);
				Raven.captureException(new Error('Source not allowed:' + this.conf.source));
			} else {
				obj.source = this.conf.source;
			}
		}

		if (this.conf.site != '') {
			obj.site = this.conf.site;
		}

		if (this.conf.adblock != '') {
			obj.adblock = this.conf.adblock;
		}
		dbg('log', '_buildPrefix: ', obj);
		return obj;
	};

	/**
	 * Zkontrolovani jedne pozice
	 * @param position {Object} - definice pozice
	 * @param opt {Object} - volitelny konfiguracni objekt
	 * @memberof module:sssp
	 */
	sssp._checkItem = function(position, opt) { // posiiton == data
		dbg('info', '### check item ###');
		this.zoneToId[position.zoneId] = position.id;
		/* zapamatovat pro pripadny adform-related re-request */ /* FIXME potreebujem to? */

		if (position.passons) {
			dbg('log', 'passons detected');
			position.passon = position.passons; /* zpetne kompatibilni hack */
		}

		// FIXME zkonrolovat s AMPEM
		if (!(opt && opt.AMPcallback)) {
			if (!position.callback) {
				var elm = (typeof position.id === 'string' ? document.getElementById(position.id) : position.id);

				if (!elm) {
					Raven.captureException(new Error('No callback or invalid ID passed to IM (' + position.zoneId + ')'));
					console.log('%c !!! No callback or invalid ID passed to IM ( zoneId:' + position.zoneId + ')',
						'font-size:20px; font-weight:bold; background:#ec0000; color: #fff');
					return null;
				}
			}
		}

		var elm = (typeof position.id === 'string' ? document.getElementById(position.id) : position.id);

		// neni element je callback, musi byt zadane rozmery v confu
		if (elm) {
			// kontrola zadanych rozmeru nesmi byt 0 ani undefined, alespon jeden musi byt definovan
			position.width = position.width || (elm.offsetWidth > 0 ? elm.offsetWidth : null);
			position.height = position.height || (elm.offsetHeight > 0 ? elm.offsetHeight : null);
			// vymazeme pokud neni zadano nebo ma element nulove rozmery
			if (position.width == null) {
				delete position.width;
			}
			if (position.height == null) {
				delete position.height;
			}
		}

		if (!position.width && !position.height) {
			Raven.captureException(new Error('No valid size of container or no size configuration passed to IM (' + position.width + ', ' + position.height + ')'));
			return null;
		}

		dbg('log', 'callback and container checkek .. OK');

		// zkontrolujeme data ze stranky zda jsou OK
		var o = {};

		for (var i = 0; i < this.conf.params.length; i++) {
			var param = this.conf.params[i];

			if (!(param in position)) {
				continue;
			}

			var value = position[param];
			var key = param;

			if (typeof value === 'object') { /* passon a options polozky dodana jako object */
				o[key] = {};
				for (var p in value) {
					if (this.conf.optionsParams.indexOf(p) != '-1') {
						o[key][p] = value[p];
					}
				}
			} else { // jednoducha hodnota
				o[key] = value;
			}
		}
		if (o.externalId) {
			o.zoneId = null;
			delete o.zoneId;
		}

		dbg('log', o.zoneId + ' position object prepared: ', o);
		return o;
	};

	/**
	 * Zapocitava served (miss, impress, visible) hity
	 * @param served (Array) - pole impres URL
	 * @memberof module:sssp
	 */
	sssp.served = function(served) {
		dbg('info', '### served hits ###');
		served.forEach(function(item) {
			dbg('log', 'served URL: ' + item);
			var i = new Image(1, 1);

			i.onerror = function() {
				dbg('error', 'Failed count served URL: ' + item);
				Raven.captureException(new Error('Failed count served URL: ' + item));
			};
			i.src = item;
		});
	};

	/**
	 * Z apocitava visibility hity
	 * @param visible (Array) - pole impres URL
	 * @memberof module:sssp
	 */
	sssp._visible = function(visible) {
		dbg('info', '### visible hits ###');
		visible.forEach(function(item) {
			dbg('log', 'visible URL: ' + item);
			var i = new Image(1, 1);

			i.onerror = function() {
				dbg('error', 'Failed count visible URL: ' + item);
				Raven.captureException(new Error('Failed count visible URL: ' + item));
			};
			i.src = item;
		});
	};

	/**
	 * Zalogovat pouzita zoneIds
	 * @param data (Object) - popis pozic ve strance
	 * @memberof module:sssp
	 */
	sssp._logAds = function(data) {
		dbg('info', '### log ADS to Reporter ###');
		var zoneIds = {};

		for (var i = 0; i < data.length; i++) {
			zoneIds[data[i].zoneId] = true;
		}
		var arr = [];

		for (var id in zoneIds) {
			if (id in {}) {
				continue;
			}
			/* HACK pro nejake obsolete interprety, ktere enumeruji i DontEnum vlastnosti */
			arr.push(id);
		}
		dbg('log', 'logging zones to Reporter', arr);
		if (window.DOT) {
			sssp.myDOT.hit('ad', {d: {zones: arr.join(',')}});
		}
	};

	/**
	 * Zavola a provede mereni visibility
	 * @param e (Object) - Event object
	 */
	sssp._callVisMeaseure = function() {
		dbg('info', '### in view measure ###');
		if (sssp.positions.length == 0) { return; }

		for (var i = 0; i < sssp.positions.length; i++) {
			var o = sssp.positions[i];

			/* eslint-disable*/
			(function(o) {
				if (o.ad.visibilityDisable) { return; } // nebudeme pocitat pokud uz jsme visibility zapocitali pro danou pozici
				// visibilityDisable se nastavuje v mericim timeoutu nize
				var pos = o.data;

				if (pos.id) {
					var e = (typeof pos.id == "string" ? document.getElementById(pos.id) : pos.id);

					try {
						var rect = e.getBoundingClientRect();

						if ("width" in rect && !rect.width) {
							return;
						}
					} catch (e) {
						return;
					}

					var w = rect.right - rect.left;
					var h = rect.bottom - rect.top;
					var W = document.documentElement.clientWidth;
					var H = document.documentElement.clientHeight;

					var x = Math.max(0, Math.min(rect.right, W) - Math.max(rect.left, 0));
					var y = Math.max(0, Math.min(rect.bottom, H) - Math.max(rect.top, 0));
					var p = (w * h) > 0 ? (x * y) / (w * h) : 0;

					// je to videt alespon z 50%
					if (p > 0.5) {
						if (!pos.timer) {
							pos.timer = setTimeout(function() {
								sssp._visible(o.ad.tracking.visible);
								dbg("info", "### counted ###");
								o.ad.visibilityDisable = true; // smazeme pole visibility ... pocitam visibilitu jen jednou
								delete pos.timer;
							}, 1000);
						}
					} else { // nejde videt uzivatel odskroloval pryc behem vteriny
						if (pos.timer) {
							clearTimeout(pos.timer);
							delete pos.timer;
						}
					}
				}
			})(o);
			/* eslint-enable*/
		}
	};

	sssp._visTimer = Date.now();
	/**
	* @param {Object} e udalost resize scroll nebo DOMContentLoaded
	* @memberof module:sssp
	*/
	sssp._viewCHeckHandler = function(e) {
		if (Date.now() - sssp._visTimer > 500) {
			dbg('info', '### in view check call ###', sssp._visTimer);
			sssp._visTimer = Date.now();
			sssp._callVisMeaseure(e);
		}
	};

	/** @module _browserHash
	 * @desc Zapouzdreni pocitani hashe prohliceze
     */
	sssp._browserHash = {
		/**
		 * Spocita hash browseru
		 * @returns {String} hash browseru
		 * @memberof module:_browserHash
		 */

		/* eslint-disable*/
		computeHash: function() { /* spocitat hash browseru */
			var data = [];
			for (var p in screen) {
				data.push(screen[p]);
			}
			var plugins = this._getPlugins();
			for (var i = 0; i < plugins.length; i++) {
				data.push(plugins[i]);
			}

			var str = data.join("").toLowerCase();
			var hash = [0, 0, 0, 0];
			var index = 0;
			var max = 0xffff;

			for (var i = 0; i < str.length; i++) {
				hash[index] = (hash[index] + str.charCodeAt(i)) % max;
				index = (index + 1) % hash.length;
			}
			return hash.join("");
		},

		/**
		 * Zjisti pluginy v danem browseru
		 * @returns {Array} data aktivni pluginy
		 * @memberof module:_browserHash
		 */
		_getPlugins: function() { /* soupis pluginu */
			var data = [];
			if (navigator.plugins && navigator.plugins.length) {
				for (var i = 0; i < navigator.plugins.length; i++) {
					var plug = navigator.plugins[i];
					var name = (plug.name.match(/[0-9]/) ? plug.name : plug.description);
					data.push(name);
				}
			} else if (window.ActiveXObject) {
				var DEF = {
					"AcroPDF.PDF": function() {
						return this.GetVersions();
					},
					"PDF.PdfCtrl": function() {
						return this.GetVersions();
					},
					"ShockwaveFlash.ShockwaveFlash": function() {
						return this.GetVariable("$version");
					},
					"QuickTime.QuickTime": function() {
						return this.QuickTimeVersion;
					},
					"rmocx.RealPlayer G2 Control": function() {
						return this.GetVersionInfo();
					},
					"rmocx.RealPlayer G2 Control.1": function() {
						return this.GetVersionInfo();
					},
					"RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)": function() {
						return this.GetVersionInfo();
					},
					"RealVideo.Rep.CalVideo(tm) ActiveX Control (32-bit)": function() {
						return this.GetVersionInfo();
					},
					"RealPlayer": function() {
						return this.GetVersionInfo();
					},
					/* "MediaPlayer.MediaPlayer": function() { return this.ClientId; }, */
					/* "VideoLAN.VLCPlugin": function() { return this.VersionInfo; }, */
					"WMPlayer.OCX": function() {
						return this.versionInfo;
					}/*,
					"AgControl.AgControl": function() {
						return (this.IsVersionSupported("3.0") && "3") || (this.IsVersionSupported("2.0") && "2") || (this.IsVersionSupported("1.0") && "1");
					}*/
				};
				var o, name;
				for (var p in DEF) {
					try {
						o = new ActiveXObject(p);
						name = p;
					} catch (e) {
						continue;
					}
					try {
						name += " " + DEF[p].call(o);
					} catch (e) {
					}
					data.push(name);
				}
			}
			return data;
		}
		/* eslint-enable*/
	};

	sssp.displaySeznamAdvertFlag = false;
	/**
	 * Kontrola platnosti session cookie pri pristupu z HP feedu
	 * @memberof module:sssp
	 * @param {String} UTM param string
	 */
	sssp._setSessionCookie = function(media) {
		var date = new Date();

		date.setTime(date.getTime() + (parseInt(sssp.conf.cookieExpiration, 10) * 60 * 1000));
		var dateString = date.toGMTString();
		var cookieDomain = sssp.conf.cookieDomain ? sssp.conf.cookieDomain : document.location.hostname;

		var cookieString = 'sssp=' + media + ' ;expires=' + dateString + '; path=/' + '; domain=' + cookieDomain;

		document.cookie = cookieString;
	};

	/**
	 * Odstrani session cookie pro HP feed
	 * @memberof module:sssp
	 */
	sssp._removeSessionCookie = function() {
		var date = new Date(1970, 0, 1);
		var dateString = date.toGMTString();
		var media = ''; // FIX ME precist z cookie
		var cookieDomain = sssp.conf.cookieDomain ? sssp.conf.cookieDomain : document.location.hostname;
		var cookieString = 'sssp=' + media + ' ;expires=' + dateString + '; path=/' + '; domain=' + cookieDomain;

		document.cookie = cookieString;
	};

	/**
	 * Zjistuje existenci session cookie
	 * @memberof module:sssp
	*/
	sssp._existCookie = function() {
		return document.cookie.indexOf('sssp=') != -1;
	};

	/**
	 * Precte session cookie a vrati hodnotu
	 * @memberof module:sssp
	 * @returns {String} hodnota session cookie
	*/
	sssp._returnCookie = function() {
		var value = '; ' + document.cookie;
		var parts = value.split('; sssp=');

		if (parts.length == 2) {
			return parts.pop().split(';').shift();
		} else {
			return null;
		}
	};

	sssp.displaySeznamAds = function() {
		var run = false;
		var UTM = document.location.search.indexOf('') != -1;

		if (UTM) {
			if (sssp.conf.preparePositionsCallback) {
				sssp.conf.preparePositionsCallback();
			}
			sssp._setSessionCookie(media);
			run = true;
		} else {
			if (sssp.displaySeznamAdvertFlag) {
				return true; // pokud jsem SPA a nereloadnul jsem stranku
			} else {
				var re = /^[a-z][a-z0-9+\-.]*:\/\/([a-z0-9\-._~%!$&'()*+,;=]+@)?([a-z0-9\-._~%]+|\[[a-z0-9\-._~%!$&'()*+,;=:]+\])/i;
				var rHostname = re.exec(document.referrer);

				// muze existovat session cookie ale ja jsem prisel z jine domeny nez z domeny sluzby === nevydava se szn reklama
				// pokud domena  sedi a je cookie pak reklamu szn vydavam
				if (sssp._existCookie() && rHostname != null && rHostname[2] == document.location.hostname) {
					if (sssp.conf.preparePositionsCallback) {
						sssp.conf.preparePositionsCallback();
					}
					sssp._setSessionCookie();
					run = true;
				} else {
					sssp._removeSessionCookie();
				}
			}
		}
		// toto je flag pro SPA aplikace, ktere nedelaji reload
		sssp.displaySeznamAdvertFlag = run;
		return run;
	};

	/**
	 * Detekce source z UTM parametru a pripadne cookie
	 * @memberof module:sssp
	*/
	sssp._sessionDetection = function() {
		dbg('info', '### _sessionDetection - kontrola source ###');
		var url = document.location.href;

		sssp.session = false;
		if (url.indexOf('utm_source=www.seznam.cz') != -1) {
			sssp.media = url.match(/medium\=([^&]+)(\&?)/);
			if (sssp.media != null) {
				sssp.media = sssp.media[1];
			}
			if (sssp.media in sssp.conf.allowedSources) {
				sssp.media = sssp.conf.allowedSources[sssp.media]; // nahrazeni media spravnou hodnotou z confu, puvodni nepotrebuejem
				dbg('info', '#### detectet media form UTM: ' + sssp.media);

				sssp.session = true;
				//sssp.config({'source': sssp.media});
				sssp.conf.source = sssp.media;
				sssp._setSessionCookie(sssp.media);
			} else {
				sssp.media = null;
			}
		} else {
			var re = /^[a-z][a-z0-9+\-.]*:\/\/([a-z0-9\-._~%!$&'()*+,;=]+@)?([a-z0-9\-._~%]+|\[[a-z0-9\-._~%!$&'()*+,;=:]+\])/i;
			var rHostname = re.exec(document.referrer);

			// muze existovat session cookie ale ja jsem prisel z jine domeny nez z domeny sluzby === nevydava se szn reklama
			// pokud domena  sedi a je cookie pak reklamu szn vydavam
			if (sssp._existCookie() && rHostname != null && rHostname[2] == document.location.hostname) {
				sssp.media = sssp._returnCookie();
				dbg('info', '#### detectet media form cookie: ' + sssp.media);
				sssp.config({'source': sssp.media});
				sssp._setSessionCookie(sssp.media);
			} else {
				sssp._removeSessionCookie();
				dbg('info', '#### no session deteted');
			}
		}
	};
	sssp._sessionDetection();

	/**
	 * Funkce detekujici session
	 * @returns {Boolean} detekce session
	 * @memberof module:sssp
	*/
	sssp.displaySeznamAds = function() {
		dbg('info', '### call displaySeznamAds zhort ###');
		if (sssp._existCookie()) {
			if (sssp.conf.preparePositionsCallback) {
				sssp.conf.preparePositionsCallback();
			}
			return true;
		} else {
			return false;
		}
	};

	/**
	 * Spusti inicializaci ssp az po naceteni DOT
	 * @memberof module:sssp
	 */
	sssp._init = function() {
		dbg('info', '### initializating ssp after loading DOT ###');

		if (window.sznRecass && window.sznRecass.getPageViewId() != null) {
			sssp.conf.pvId = window.sznRecass.getPageViewId();
		} else {
			sssp.setPageViewId();
		}

		// async zpracovani
		while (window.ssspQ && window.ssspQ.length != 0) { window.ssspQ.shift()(); }

		var f = null;

		// call
		while (sssp._functionStack.length) {
			// zavolame v globalnim kontextu
			var f = sssp._functionStack.shift();

			eval(0, sssp[f.name].apply(sssp, f.params));
		}
	};

	dbg('info', '### exporting sssp ###');
	global.sssp = sssp;

	var DOTtimmer = null;

	function loadDot() {
		dbg('info', '### DOT loaded ###');
		window.clearTimeout(DOTtimmer);
		sssp._loaded = true; // vse je nacteno
		sssp.myDOT = DOT.getNewInstance();
		sssp.myDOT.cfg({'service': 'sklikp', 'load': false, 'mousedown': false});
		sssp._init();
	}

	// load DOT script, if is not present
	if (!window.DOT) {
		var dotScript = document.createElement('script');

		dotScript.async = false;
		dotScript.src = '//h.imedia.cz/js/dot-small.js';

		DOTtimmer = window.setTimeout(function() {
			dbg('info', '### DOT timeouted trying ...  ###');
			dotScript.removeEventListener('load', loadDot);
			sssp._loaded = true; // vse je nacteno
			if (window.DOT) {
				// nejakym jinym zpusobem se mohl dostat dot do stranky .. vyuzijeme to
				sssp.myDOT = DOT.getNewInstance();
				sssp.myDOT.cfg({'service': 'sklikp', 'load': false, 'mousedown': false});
			}
			sssp._init();
		}, 10000);

		dotScript.addEventListener('load', loadDot);
		document.querySelector('head').appendChild(dotScript);
	} else {
		//loadDot();
		sssp.myDOT = DOT; // dot uz je ve strance ... a chceme pouzit puvodni service
		sssp._loaded = true; // vse je nacteno
		sssp._init();
	}
})(window);
