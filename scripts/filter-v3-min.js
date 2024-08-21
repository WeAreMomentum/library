!function(){class t{constructor(t){if(this.element=t,this.filters={},this.items=[],this.itemsFiltered=[],this.itemsLimited=[],this.itemsHidden=[],this.sortBy,this.triggers=[],this.increaseLimit=this.increaseLimit.bind(this),this.setFilter=this.setFilter.bind(this),this.setSort=this.setSort.bind(this),this.reset=this.reset.bind(this),this.init={filters:{},sortBy:""},this.init.sortBy=JSON.parse(this.element.dataset.filterSort?this.element.dataset.filterSort.replaceAll("'",'"'):'{"order":"initial"}'),this.element.querySelectorAll('[data-filter="trigger"]').forEach(t=>{this.triggers.push(new o(t,this))}),this.triggers.forEach(t=>t.getOtherTriggers()),this.element.querySelectorAll('[data-filter="item"]').forEach(t=>{this.items.push(new m(t,this))}),this.items[0]){for(let e in this.items[0].tags)this.init.filters[e]=this.init.filters[e]||"";this.list=this.items[0].element.parentElement,this.listWrapper=this.list.parentElement,this.listWrapper.style.transition="height 300ms ease-in-out",this.emptyState=this.element.querySelector('[data-filter="empty-state"]'),this.reset()}else this.element.querySelector(".w-dyn-list").remove()}#a(e){this.itemsLimited.forEach(t=>{this.list.appendChild(t.element),t.show()}),this.itemsHidden.forEach(t=>this.list.appendChild(t.element)),0==this.list.scrollHeight?this.listWrapper.style.height="0px":this.listWrapper.style.height=this.list.scrollHeight-30*window.innerHeight/100+"px",setTimeout(()=>{if(this.listWrapper.style.height="auto",e){let t=function t(e=document){return[...e.querySelectorAll('[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]),details:not([disabled]), summary:not(:disabled), [tabindex]:not([tabindex="-1"]):not([disabled])')]}(this.list.children[e-1]);t.length>0&&t[0].focus()}})}#b(i,s=!1){0==this.itemsFiltered.length?this.emptyState.classList.remove("filter-hidden"):this.emptyState.classList.add("filter-hidden"),this.itemsLimited=this.itemsFiltered,this.moreButton&&(this.itemsFiltered.length>this.limitBy?(this.itemsLimited=this.itemsFiltered.slice(0,this.limitBy),this.moreButton.element.classList.remove("filter-hidden")):this.moreButton.element.classList.add("filter-hidden")),this.itemsHidden=this.items.filter(t=>!this.itemsLimited.includes(t)),this.listWrapper.style.height=this.list.scrollHeight+"px",s?this.#a(i):(this.items.forEach(t=>t.hide()),setTimeout(()=>this.#a(i),300))}#c(r,h){return r.value<h.value?-1:r.value>h.value?1:0}#d(l=null){let a;if("initial"==this.sortBy.order)a=this.items;else if("random"==this.sortBy.order)a=this.items.sort((t,e)=>Math.random()-.5);else if(this.sortBy.tag){let n=this.items.map((t,e)=>({i:e,value:t.tags[this.sortBy.tag][0].toLowerCase()}));switch(this.sortBy.order){case"+":n.sort(this.#c);break;case"-":n.sort((t,e)=>-1*this.#c(t,e))}a=n.map(t=>this.items[t.i])}else a=this.items;this.itemsFiltered=a.filter(t=>{for(let e in this.filters)if(void 0===t.tags[e]||0==t.tags[e].filter(t=>t.toLowerCase().includes(this.filters[e].toLowerCase())).length)return!1;return!0}),this.#b(l)}increaseLimit(){let t=this.limitBy+1;this.limitBy+=this.more,this.#b(t,!0)}setFilter(t){t.otherTriggers.forEach(t=>{t.element.classList.remove("active")}),"click"==t.event&&t.element.classList.toggle("active"),this.filters[t.tag]==t.tagValue&&"click"==t.event?this.filters[t.tag]="":this.filters[t.tag]=t.tagValue,this.#d(1)}setSort(t){"click"==t.event&&(t.otherTriggers.forEach(t=>{t.element.classList.remove("active")}),t.element.classList.add("active")),this.sortBy=t.tagValue,this.#d(1)}reset(){this.filters={...this.init.filters},this.sortBy=this.init.sortBy,this.more&&(this.limitBy=this.init.limitBy),this.triggers.forEach(t=>t.reset()),this.#d()}}class o{constructor(t,e){switch(this.element=t,this.group=e,this.otherTriggers=[],this.getOtherTriggers=this.getOtherTriggers.bind(this),this.setFilterClick=this.setFilterClick.bind(this),this.setFilterChange=this.setFilterChange.bind(this),this.setSort=this.setSort.bind(this),this.event="SELECT"==this.element.tagName||"INPUT"==this.element.tagName?"change":"click",this.function=this.element.dataset.filterFunction,"click"==this.event&&this.element.value?this.reset=this.resetDeactive.bind(this):"SELECT"==this.element.tagName?this.reset=this.resetSelect.bind(this):"reset"==this.function?this.reset=function(){}:"filter"==this.function&&""==this.element.value&&"INPUT"!=this.element.tagName?this.reset=this.resetActive.bind(this):this.reset=this.resetValue.bind(this),this.function){case"reset":this.element.addEventListener("click",this.group.reset);break;case"more":this.group.moreButton=this,this.group.more=Number(this.group.element.dataset.filterMore),this.group.limitBy,this.group.init.limitBy=Number(this.group.element.dataset.filterLimit),this.element.addEventListener("click",this.group.increaseLimit);break;case"filter":this.tag=this.element.dataset.filterTag,this.tagValue=this.element.value,this.element.hasAttribute("data-filter-init")&&(this.group.init.filters[this.tag]=this.tagValue),"click"==this.event?this.element.addEventListener("click",this.setFilterClick):this.element.addEventListener(this.event,this.setFilterChange);break;case"sort":this.tagValue=JSON.parse(this.element.value),this.element.addEventListener(this.event,this.setSort)}}getOtherTriggers(){this.otherTriggers=this.group.triggers.filter(t=>t!=this&&("filter"==this.function?"filter"==t.function&&t.tag==this.tag:"sort"==this.function&&"sort"==t.function))}resetDeactive(){this.element.classList.remove("active")}resetActive(){this.element.classList.add("active")}resetSelect(){this.element.selectedIndex=0}resetValue(){this.element.value=""}setFilterClick(){this.group.setFilter(this)}setFilterChange(){this.tagValue=this.element.value,this.group.setFilter(this)}setSort(){this.tagValue=JSON.parse(this.element.value),this.group.setSort(this)}}class m{constructor(t,e){this.element=t,this.group=e,this.tags={},this.hide=this.hide.bind(this),this.show=this.show.bind(this),this.element.querySelectorAll('[data-filter="tag"]').forEach(t=>{(this.tags[t.dataset.filterTag]??(this.tags[t.dataset.filterTag]=[])).push(t.textContent)}),this.element.classList.add("filter-hidden")}hide(){this.element.style="transform: translateY(30vh); opacity: 0;",setTimeout(()=>this.element.classList.add("filter-hidden"),300)}show(){this.element.classList.remove("filter-hidden"),setTimeout(()=>{this.element.style="transform: translateY(0vh); opacity: 1;",setTimeout(()=>this.element.removeAttribute("style"),300)},10)}}document.head.insertAdjacentHTML("beforeend",'<style>[data-filter="item"]{transition: transform 300ms ease-in-out, opacity 300ms ease-in-out;}</style>'),document.querySelectorAll('[data-filter="group"]').forEach(e=>new t(e))}();