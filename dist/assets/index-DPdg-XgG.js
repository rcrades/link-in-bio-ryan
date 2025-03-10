(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();/**
 * @license lucide v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=(e,n,i=[])=>{const a=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(n).forEach(t=>{a.setAttribute(t,String(n[t]))}),i.length&&i.forEach(t=>{const o=p(...t);a.appendChild(o)}),a};var L=([e,n,i])=>p(e,n,i);/**
 * @license lucide v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=e=>Array.from(e.attributes).reduce((n,i)=>(n[i.name]=i.value,n),{}),N=e=>typeof e=="string"?e:!e||!e.class?"":e.class&&typeof e.class=="string"?e.class.split(" "):e.class&&Array.isArray(e.class)?e.class:"",z=e=>e.flatMap(N).map(i=>i.trim()).filter(Boolean).filter((i,a,t)=>t.indexOf(i)===a).join(" "),O=e=>e.replace(/(\w)(\w*)(_|-|\s*)/g,(n,i,a)=>i.toUpperCase()+a.toLowerCase()),h=(e,{nameAttr:n,icons:i,attrs:a})=>{var u;const t=e.getAttribute(n);if(t==null)return;const o=O(t),c=i[o];if(!c)return console.warn(`${e.outerHTML} icon name was not found in the provided icons object.`);const s=I(e),[A,_,E]=c,l={..._,"data-lucide":t,...a,...s},d=z(["lucide",`lucide-${t}`,s,a]);d&&Object.assign(l,{class:d});const C=L([A,l,E]);return(u=e.parentNode)==null?void 0:u.replaceChild(C,e)};/**
 * @license lucide v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=["svg",r,[["path",{d:"M7 7h10v10"}],["path",{d:"M7 17 17 7"}]]];/**
 * @license lucide v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=["svg",r,[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"}],["path",{d:"M10 6h4"}],["path",{d:"M10 10h4"}],["path",{d:"M10 14h4"}],["path",{d:"M10 18h4"}]]];/**
 * @license lucide v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=["svg",r,[["path",{d:"M8 2v4"}],["path",{d:"M16 2v4"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}],["path",{d:"M3 10h18"}]]];/**
 * @license lucide v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=["svg",r,[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}],["rect",{width:"4",height:"12",x:"2",y:"9"}],["circle",{cx:"4",cy:"4",r:"2"}]]];/**
 * @license lucide v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=["svg",r,[["path",{d:"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"}],["path",{d:"M18 14h-8"}],["path",{d:"M15 18h-5"}],["path",{d:"M10 6h8v4h-8V6Z"}]]];/**
 * @license lucide v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=["svg",r,[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"}]]];/**
 * @license lucide v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=["svg",r,[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"}]]];/**
 * @license lucide v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=["svg",r,[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"}],["path",{d:"m10 15 5-3-5-3z"}]]];/**
 * @license lucide v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=({icons:e={},nameAttr:n="data-lucide",attrs:i={}}={})=>{if(!Object.values(e).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof document>"u")throw new Error("`createIcons()` only works in a browser environment.");const a=document.querySelectorAll(`[${n}]`);if(Array.from(a).forEach(t=>h(t,{nameAttr:n,icons:e,attrs:i})),n==="data-lucide"){const t=document.querySelectorAll("[icon-name]");t.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(t).forEach(o=>h(o,{nameAttr:"icon-name",icons:e,attrs:i})))}};console.log("Imported Lucide components:",{ArrowUpRight:m,Linkedin:w,Twitter:b,Building2:f,Calendar:g,Youtube:k,Newspaper:y,Rocket:v});try{console.log("Attempting to initialize icons..."),M({icons:{"arrow-up-right":m,linkedin:w,twitter:b,building:f,calendar:g,youtube:k,newspaper:y,rocket:v}}),console.log("Icons initialized successfully")}catch(e){console.error("Error initializing icons:",e)}const S=`
  <div>
    <div class="profile">
      <img src="/profile.jpg" alt="Ryan Rademann" />
      <h1>Ryan Rademann</h1>
      <p>Technology Consultant at Wipfli</p>
    </div>
    <div class="links-container">
      <a href="https://www.linkedin.com/in/ryanrademann/?utm_source=linkinbio&utm_medium=social&utm_campaign=profile" class="link-card" target="_blank">
        <h2>LinkedIn</h2>
        <i data-lucide="linkedin" class="link-icon" aria-hidden="true"></i>
        <p>Follow me on LinkedIn.</p>
      </a>
      <a href="https://x.com/RyanRademann?utm_source=linkinbio&utm_medium=social&utm_campaign=profile" class="link-card" target="_blank">
        <h2>Twitter</h2>
        <i data-lucide="twitter" class="link-icon" aria-hidden="true"></i>
        <p>I retweet on more technical software and I topics.</p>
      </a>
      <a href="your-wipfli-url" class="link-card" target="_blank">
        <h2>Wipfli Bio</h2>
        <i data-lucide="building" class="link-icon" aria-hidden="true"></i>
        <p>Wipfli is a tech, succession, and transition powerhouse.</p>
      </a>
      <a href="your-calendar-url" class="link-card" target="_blank">
        <h2>Schedule a Meeting</h2>
        <i data-lucide="calendar" class="link-icon" aria-hidden="true"></i>
        <p>Book a teams, zoom, or phone call.</p>
      </a>
      <a href="your-podcast-url" class="link-card" target="_blank">
        <h2>Latest Podcast</h2>
        <i data-lucide="youtube" class="link-icon" aria-hidden="true"></i>
        <p>Constructive Podcast on YouTube - 2025 February.</p>
      </a>
      <a href="your-article-url" class="link-card" target="_blank">
        <h2>Latest Article</h2>
        <i data-lucide="newspaper" class="link-icon" aria-hidden="true"></i>
        <p>AI Agents on For Construction Pros.</p>
      </a>
      <a href="https://fieldsity.com?utm_source=linkinbio&utm_medium=social&utm_campaign=profile" class="link-card" target="_blank">
        <h2>Stealth Mode Side Project</h2>
        <i data-lucide="rocket" class="link-icon" aria-hidden="true"></i>
        <p>We are building in public a SMB field ops play.</p>
      </a>
    </div>
  </div>
`;document.querySelector("#app").innerHTML=S;console.log("Content added to DOM");try{console.log("Re-initializing icons after content load..."),M(),console.log("Icons re-initialized successfully")}catch(e){console.error("Error re-initializing icons:",e)}
