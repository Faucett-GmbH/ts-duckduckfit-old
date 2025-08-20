import"./DsnmJJEf.js";import{i as me}from"./BAdzqFen.js";import{J as X,B as le,aN as fe,G as W,y as w,aD as ue,C as B,i as L,ad as Ee,D as pe,H as Ne,F as $,I as y,O as I,aA as ge,aG as we,K as F,L as Ae,aO as P,aP as q,q as Te,aQ as j,aR as Ce,ah as ee,aK as oe,V as be,M as Q,N as de,aS as Se,aT as J,A as xe,aU as Z,aV as Ie,aC as ke,aW as Me,aJ as De,aX as Oe,af as ve,aY as Re,E as He,aZ as We,aM as Le,p as ye,a_ as Ve,b as ae,c as ze,d as Be,s as Fe,v as re,at as H,r as Pe,m as qe,a as Ge,k as Ye,l as Je}from"./o5q6BmUW.js";import{i as Ke,b as te}from"./BGJmele_.js";import{e as ne}from"./BebqoVY3.js";import{l as ie,p as M}from"./CQfXoPYU.js";let D=null;function se(s){D=s}function Ue(s,a){return a}function Xe(s,a,e){for(var l=s.items,d=[],u=a.length,i=0;i<u;i++)Me(a[i].e,d,!0);var v=u>0&&d.length===0&&e!==null;if(v){var E=e.parentNode;De(E),E.append(e),l.clear(),x(s,a[0].prev,a[u-1].next)}Oe(d,()=>{for(var o=0;o<u;o++){var h=a[o];v||(l.delete(h.k),x(s,h.prev,h.next)),Z(h.e,!v)}})}function Qe(s,a,e,l,d,u=null){var i=s,v={flags:a,items:new Map,first:null},E=(a&fe)!==0;if(E){var o=s;i=w?W(ue(o)):o.appendChild(X())}w&&B();var h=null,m=!1,A=new Map,N=Ee(()=>{var _=e();return be(_)?_:_==null?[]:oe(_)}),t,c;function r(){Ze(c,t,v,A,i,d,a,l,e),u!==null&&(t.length===0?h?Q(h):h=F(()=>u(i)):h!==null&&de(h,()=>{h=null}))}le(()=>{c??=ve,t=L(N);var _=t.length;if(m&&_===0)return;m=_===0;let g=!1;if(w){var C=pe(i)===Ne;C!==(_===0)&&(i=$(),W(i),y(!1),g=!0)}if(w){for(var b=null,p,n=0;n<_;n++){if(I.nodeType===ge&&I.data===we){i=I,g=!0,y(!1);break}var f=t[n],T=l(f,n);p=U(I,v,b,null,f,T,n,d,a,e),v.items.set(T,p),b=p}_>0&&W($())}if(w)_===0&&u&&(h=F(()=>u(i)));else if(Ae()){var O=new Set,V=Te;for(n=0;n<_;n+=1){f=t[n],T=l(f,n);var k=v.items.get(T)??A.get(T);k?(a&(P|q))!==0&&ce(k,f,n,a):(p=U(null,v,null,null,f,T,n,d,a,e,!0),A.set(T,p)),O.add(T)}for(const[S,z]of v.items)O.has(S)||V.skipped_effects.add(z.e);V.add_callback(r)}else r();g&&y(!0),L(N)}),w&&(i=I)}function Ze(s,a,e,l,d,u,i,v,E){var o=(i&Ie)!==0,h=(i&(P|q))!==0,m=a.length,A=e.items,N=e.first,t=N,c,r=null,_,g=[],C=[],b,p,n,f;if(o)for(f=0;f<m;f+=1)b=a[f],p=v(b,f),n=A.get(p),n!==void 0&&(n.a?.measure(),(_??=new Set).add(n));for(f=0;f<m;f+=1){if(b=a[f],p=v(b,f),n=A.get(p),n===void 0){var T=l.get(p);if(T!==void 0){l.delete(p),A.set(p,T);var O=r?r.next:t;x(e,r,T),x(e,T,O),K(T,O,d),r=T}else{var V=t?t.e.nodes_start:d;r=U(V,e,r,r===null?e.first:r.next,b,p,f,u,i,E)}A.set(p,r),g=[],C=[],t=r.next;continue}if(h&&ce(n,b,f,i),(n.e.f&J)!==0&&(Q(n.e),o&&(n.a?.unfix(),(_??=new Set).delete(n))),n!==t){if(c!==void 0&&c.has(n)){if(g.length<C.length){var k=C[0],S;r=k.prev;var z=g[0],G=g[g.length-1];for(S=0;S<g.length;S+=1)K(g[S],k,d);for(S=0;S<C.length;S+=1)c.delete(C[S]);x(e,z.prev,G.next),x(e,r,z),x(e,G,k),t=k,r=G,f-=1,g=[],C=[]}else c.delete(n),K(n,t,d),x(e,n.prev,n.next),x(e,n,r===null?e.first:r.next),x(e,r,n),r=n;continue}for(g=[],C=[];t!==null&&t.k!==p;)(t.e.f&J)===0&&(c??=new Set).add(t),C.push(t),t=t.next;if(t===null)continue;n=t}g.push(n),r=n,t=n.next}if(t!==null||c!==void 0){for(var R=c===void 0?[]:oe(c);t!==null;)(t.e.f&J)===0&&R.push(t),t=t.next;var Y=R.length;if(Y>0){var _e=(i&fe)!==0&&m===0?d:null;if(o){for(f=0;f<Y;f+=1)R[f].a?.measure();for(f=0;f<Y;f+=1)R[f].a?.fix()}Xe(e,R,_e)}}o&&xe(()=>{if(_!==void 0)for(n of _)n.a?.apply()}),s.first=e.first&&e.first.e,s.last=r&&r.e;for(var he of l.values())Z(he.e);l.clear()}function ce(s,a,e,l){(l&P)!==0&&j(s.v,a),(l&q)!==0?j(s.i,e):s.i=e}function U(s,a,e,l,d,u,i,v,E,o,h){var m=D,A=(E&P)!==0,N=(E&Se)===0,t=A?N?Ce(d,!1,!1):ee(d):d,c=(E&q)===0?i:ee(i),r={i:c,v:t,k:u,a:null,e:null,prev:e,next:l};D=r;try{if(s===null){var _=document.createDocumentFragment();_.append(s=X())}return r.e=F(()=>v(s,t,c,o),w),r.e.prev=e&&e.e,r.e.next=l&&l.e,e===null?h||(a.first=r):(e.next=r,e.e.next=r.e),l!==null&&(l.prev=r,l.e.prev=r.e),r}finally{D=m}}function K(s,a,e){for(var l=s.next?s.next.e.nodes_start:e,d=a?a.e.nodes_start:e,u=s.e.nodes_start;u!==null&&u!==l;){var i=ke(u);d.before(u),u=i}}function x(s,a,e){a===null?s.first=e:(a.next=e,a.e.next=e&&e.e),e!==null&&(e.prev=a,e.e.prev=a&&a.e)}function $e(s,a,e,l,d){w&&B();var u=a.$$slots?.[e],i=!1;u===!0&&(u=a.children,i=!0),u===void 0||u(s,i?()=>l:l)}function je(s,a,e,l,d,u){let i=w;w&&B();var v,E,o=null;w&&I.nodeType===Re&&(o=I,B());var h=w?I:s,m,A=D;le(()=>{const N=a()||null;var t=We;if(N!==v){var c=D;se(A),m&&(N===null?de(m,()=>{m=null,E=null}):N===E?Q(m):(Z(m),te(!1))),N&&N!==E&&(m=F(()=>{if(o=w?o:document.createElementNS(t,N),Le(o,o),l){w&&Ke(N)&&o.append(document.createComment(""));var r=w?ue(o):o.appendChild(X());w&&(r===null?y(!1):W(r)),l(o,r)}ve.nodes_end=o,h.before(o)})),v=N,v&&(E=v),te(!0),se(c)}},He),i&&(y(!0),W(h))}/**
 * @license lucide-svelte v0.540.0 - ISC
 *
 * ISC License
 * 
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The MIT License (MIT) (for portions derived from Feather)
 * 
 * Copyright (c) 2013-2023 Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const ea={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var aa=Ve("<svg><!><!></svg>");function fa(s,a){const e=ie(a,["children","$$slots","$$events","$$legacy"]),l=ie(e,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);ye(a,!1);let d=M(a,"name",8,void 0),u=M(a,"color",8,"currentColor"),i=M(a,"size",8,24),v=M(a,"strokeWidth",8,2),E=M(a,"absoluteStrokeWidth",8,!1),o=M(a,"iconNode",24,()=>[]);const h=(...t)=>t.filter((c,r,_)=>!!c&&_.indexOf(c)===r).join(" ");me();var m=aa();ne(m,(t,c)=>({...ea,...l,width:i(),height:i(),stroke:u(),"stroke-width":t,class:c}),[()=>(H(E()),H(v()),H(i()),re(()=>E()?Number(v())*24/Number(i()):v())),()=>(H(d()),H(e),re(()=>h("lucide-icon","lucide",d()?`lucide-${d()}`:"",e.class)))]);var A=Be(m);Qe(A,1,o,Ue,(t,c)=>{var r=Ye(()=>Je(L(c),2));let _=()=>L(r)[0],g=()=>L(r)[1];var C=qe(),b=Ge(C);je(b,_,!0,(p,n)=>{ne(p,()=>({...g()}))}),ae(t,C)});var N=Fe(A);$e(N,a,"default",{}),Pe(m),ae(s,m),ze()}export{fa as I,D as c,Qe as e,Ue as i,$e as s};
