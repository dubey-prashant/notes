(this["webpackJsonpnotes-frontend"]=this["webpackJsonpnotes-frontend"]||[]).push([[0],{44:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var c=n(0),s=n.n(c),a=n(8),o=n.n(a),r=(n(44),n(15)),i=n(16),j=n(4),l=n(2),b=function(){return Object(l.jsx)("header",{children:Object(l.jsx)("h1",{children:"n o t e s"})})},h=function(){var e=(new Date).getFullYear();return Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{className:"foot-fixed-extra"}),Object(l.jsx)("footer",{children:Object(l.jsxs)("p",{children:[" \u24d2 dubeyTech ",e,". "]})})]})},d=n(32),u=n.n(d),O=function(e){var t=e.note,n=e.handleDelete,s=Object(c.useState)(!1),a=Object(j.a)(s,2),o=a[0],r=a[1],i=t.title,b=t.content,h=b.substring(0,100);return Object(l.jsxs)("div",{className:"Note",children:[Object(l.jsx)("h1",{children:i}),b.length<=100&&Object(l.jsx)("p",{children:b}),b.length>100&&Object(l.jsxs)("p",{children:[o?b:h,Object(l.jsxs)("span",{onClick:function(){return r(!o)},className:"view-more",children:[". . .",o?"view less":"view more"]})]}),Object(l.jsx)("button",{onClick:function(){return n(t._id)},children:Object(l.jsx)(u.a,{})})]})},f=n(9),x=n(34),m=n.n(x),p=n(68),v=n(69),g=function(e){var t=e.handleCreate,n=Object(c.useState)({title:"",content:""}),s=Object(j.a)(n,2),a=s[0],o=s[1],r=Object(c.useState)(!1),b=Object(j.a)(r,2),h=b[0],d=b[1],u=function(e){var t=e.target,n=t.name,c=t.value;o((function(e){return Object(i.a)(Object(i.a)({},e),{},Object(f.a)({},n,c))}))};return Object(l.jsx)("div",{className:"CreateNote",children:Object(l.jsxs)("form",{className:"create-note",children:[h&&Object(l.jsx)("input",{name:"title",onChange:u,value:a.title,placeholder:"Title"}),Object(l.jsx)("textarea",{name:"content",onClick:function(){return d(!0)},onChange:u,value:a.content,placeholder:"Take a note...",rows:h?3:1}),Object(l.jsx)(v.a,{in:h,children:Object(l.jsx)(p.a,{onClick:function(e){e.preventDefault(),t({title:a.title,content:a.content}),d(!1),o({title:"",content:""})},children:Object(l.jsx)(m.a,{})})})]})})},N=n(35),w=n.n(N),C=function(){var e=Object(c.useState)(!0),t=Object(j.a)(e,2),n=t[0],s=t[1],a=Object(c.useState)([]),o=Object(j.a)(a,2),d=o[0],u=o[1],f=Object(c.useState)(),x=Object(j.a)(f,2),m=x[0],p=x[1],v="/api/notes",N={reactauthclientid:"dubeytechNotesApp",reactauthclientpass:"dubeytechNotesApp@9004814353"};return Object(c.useEffect)((function(){C()}),[]),Object(l.jsxs)("div",{className:"App",children:[Object(l.jsx)(b,{}),n&&Object(l.jsx)("div",{className:"loaderDiv",children:Object(l.jsx)(w.a,{className:"loader",type:"spokes",color:"#f5ba13"})}),m&&Object(l.jsx)("div",{className:"error",children:m}),!n&&Object(l.jsx)("div",{className:"content",children:!m&&Object(l.jsxs)("div",{children:[Object(l.jsx)(g,{handleCreate:function(e){fetch(v,{method:"POST",headers:Object(i.a)({"Content-Type":"application/json"},N),body:JSON.stringify(Object(i.a)({},e))}).then((function(e){if(e.json().message)throw new Error(e.json().message);C()})).catch((function(e){console.log(e.message),C()}))}}),Object(l.jsx)("div",{className:"note-container",children:d&&d.map((function(e){return Object(l.jsx)(O,{note:e,handleDelete:k},e._id)}))})]})}),Object(l.jsx)(h,{})]});function C(){setInterval((function(){fetch(v,{headers:Object(i.a)({},N)}).then((function(e){if(e.ok)return e.json();throw new Error("Unable to reach server!")})).then((function(e){if(e.message)throw new Error(e.message);s(!1),u(Object(r.a)(e))})).catch((function(e){s(!1),p(e.message),console.log(e)}))}),2e3)}function k(e){s(!0),fetch("".concat(v,"/").concat(e),{method:"DELETE",headers:Object(i.a)({},N)}).then((function(e){if(e.json().message)throw new Error(e.json().message);C()})).catch((function(e){console.log(e.message),C()}))}};o.a.render(Object(l.jsx)(s.a.StrictMode,{children:Object(l.jsx)(C,{})}),document.getElementById("root"))}},[[52,1,2]]]);
//# sourceMappingURL=main.1768323b.chunk.js.map