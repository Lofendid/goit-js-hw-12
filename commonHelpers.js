import{i as y,a as p,S as L}from"./assets/vendor-bad0427b.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const v=new URL("/goit-js-hw-12/assets/arrow-icons-a5dab455.svg#icon-left",self.location).href,w=new URL("/goit-js-hw-12/assets/arrow-icons-a5dab455.svg#icon-right",self.location).href,b=new URL("/goit-js-hw-12/assets/error-icon-40fa32d5.svg",self.location).href,R=new URL("/goit-js-hw-12/assets/warning-icon-12913e67.svg",self.location).href,g="user-query",u=document.querySelector(".gallery"),S=document.querySelector(".search-photos"),c=document.querySelector(".loader-wrapper"),r=document.querySelector(".more-btn");let l=1,h=40;const d=(t,s="ERROR",a=b,n="rgba(239, 64, 64, 1)")=>{y.show({title:s,backgroundColor:n,theme:"dark",message:t,position:"topRight",timeout:5e3,iconUrl:a})},U=t=>Math.ceil(t.totalHits/h),k=async t=>(await p.get("https://pixabay.com/api/",{params:{key:"41527103-e0775164a767d3baf6162359a",q:encodeURIComponent(t).replace(/%20/g,"+"),image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:h,page:l}})).data,q=t=>{const s=t.hits;if(t.totalHits===0)return c.classList.add("visually-hidden"),r.classList.add("visually-hidden"),d("Sorry, there are no images matching your search query. Please, try again!");{const a=s.map(({webformatURL:e,largeImageURL:o,tags:i})=>`
                    <li class="gallery-item">
                        <a class="gallery-link" href="${o}">
                            <img
                                loading="lazy"
                                class="gallery-image"
                                src="${e}"
                                alt="${i}"
                            />
                        </a>
                    </li>
                    `).join("");u.insertAdjacentHTML("beforeend",a),new L(".gallery a",{navText:[`<svg width="24" height="24"><use href="${v}"></svg>`,`<svg width="24" height="24"><use href="${w}"></svg>`],captionsData:"alt",captionDelay:!1}).refresh(),c.classList.add("visually-hidden")}},f=async t=>{try{const s=await k(t),a=U(s);q(s),l===a?(r.classList.add("visually-hidden"),d("The end of collection has been reached","INFO",R,"rgba(167, 166, 145, 1)")):l<a&&r.classList.remove("visually-hidden")}catch(s){d("Something went wrong. Please, try again. Status: ",s.status)}},m=async()=>{l+=1,f(sessionStorage.getItem(g)),r.classList.contains("visually-hidden")&&r.removeEventListener("click",m)},I=async t=>{t.preventDefault(),l=1,u.innerHTML="",c.classList.remove("visually-hidden"),r.classList.add("visually-hidden");const a=new FormData(t.currentTarget).get("search").trim().toLowerCase();if(!a||a.length<3)return c.classList.add("visually-hidden"),d("Please, enter something (at least 3 characters long)");sessionStorage.setItem(g,a),f(a),t.target.reset(),r.addEventListener("click",m)};S.addEventListener("submit",I);
//# sourceMappingURL=commonHelpers.js.map
