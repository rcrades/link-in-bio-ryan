(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();/**
 * @license lucide v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=(t,i,r=[])=>{const o=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(i).forEach(e=>{o.setAttribute(e,String(i[e]))}),r.length&&r.forEach(e=>{const n=p(...e);o.appendChild(n)}),o};var y=([t,i,r])=>p(t,i,r);/**
 * @license lucide v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=t=>Array.from(t.attributes).reduce((i,r)=>(i[r.name]=r.value,i),{}),k=t=>typeof t=="string"?t:!t||!t.class?"":t.class&&typeof t.class=="string"?t.class.split(" "):t.class&&Array.isArray(t.class)?t.class:"",v=t=>t.flatMap(k).map(r=>r.trim()).filter(Boolean).filter((r,o,e)=>e.indexOf(r)===o).join(" "),A=t=>t.replace(/(\w)(\w*)(_|-|\s*)/g,(i,r,o)=>r.toUpperCase()+o.toLowerCase()),h=(t,{nameAttr:i,icons:r,attrs:o})=>{var u;const e=t.getAttribute(i);if(e==null)return;const n=A(e),a=r[n];if(!a)return console.warn(`${t.outerHTML} icon name was not found in the provided icons object.`);const s=b(t),[f,m,g]=a,l={...m,"data-lucide":e,...o,...s},d=v(["lucide",`lucide-${e}`,s,o]);d&&Object.assign(l,{class:d});const w=y([f,l,g]);return(u=t.parentNode)==null?void 0:u.replaceChild(w,t)};/**
 * @license lucide v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=["svg",c,[["path",{d:"M7 7h10v10"}],["path",{d:"M7 17 17 7"}]]];/**
 * @license lucide v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=["svg",c,[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}],["rect",{width:"4",height:"12",x:"2",y:"9"}],["circle",{cx:"4",cy:"4",r:"2"}]]];/**
 * @license lucide v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=["svg",c,[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"}]]];/**
 * @license lucide v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=({icons:t={},nameAttr:i="data-lucide",attrs:r={}}={})=>{if(!Object.values(t).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof document>"u")throw new Error("`createIcons()` only works in a browser environment.");const o=document.querySelectorAll(`[${i}]`);if(Array.from(o).forEach(e=>h(e,{nameAttr:i,icons:t,attrs:r})),i==="data-lucide"){const e=document.querySelectorAll("[icon-name]");e.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(e).forEach(n=>h(n,{nameAttr:"icon-name",icons:t,attrs:r})))}};N({icons:{"arrow-up-right":C,linkedin:E,twitter:L}});document.querySelector("#app").innerHTML=`
  <div>
    <div class="profile">
      <img src="https://placehold.co/200x200/0047CC/FFFFFF/png?text=YP" alt="Your Profile" />
      <h1>Ryan Rademann</h1>
      <p>Technology Consultant at Wipfli</p>
    </div>
    <div class="links-container">
      <a href="your-linkedin-url" class="link-card" target="_blank">
        <h2>LinkedIn</h2>
        <i data-lucide="linkedin" class="link-icon" aria-hidden="true"></i>
        <p>Follow me on LinkedIn.</p>
      </a>
      <a href="your-twitter-url" class="link-card" target="_blank">
        <h2>Twitter</h2>
        <i data-lucide="twitter" class="link-icon" aria-hidden="true"></i>
        <p>I retweet on more technical software and I topics.</p>
      </a>
      <a href="your-wipfli-url" class="link-card" target="_blank">
        <h2>Wipfli Bio</h2>
        <i data-lucide="arrow-up-right" class="link-icon" aria-hidden="true"></i>
        <p>Wipfli is a tech, succession, and transition powerhouse.</p>
      </a>
      <a href="your-calendar-url" class="link-card" target="_blank">
        <h2>Schedule a Meeting</h2>
        <i data-lucide="arrow-up-right" class="link-icon" aria-hidden="true"></i>
        <p>Book a teams, zoom, or phone call.</p>
      </a>
      <a href="your-podcast-url" class="link-card" target="_blank">
        <h2>Latest Podcast</h2>
        <i data-lucide="arrow-up-right" class="link-icon" aria-hidden="true"></i>
        <p>Constructive Podcast on YouTube - 2025 February.</p>
      </a>
      <a href="your-article-url" class="link-card" target="_blank">
        <h2>Latest Article</h2>
        <i data-lucide="arrow-up-right" class="link-icon" aria-hidden="true"></i>
        <p>AI Agents on For Construction Pros.</p>
      </a>
    </div>
  </div>
`;
