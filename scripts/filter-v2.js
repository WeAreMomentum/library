// Filter V 2.0
// by Aleksander Knöbl

(function(){

  document.querySelectorAll('[data-filter="wrapper"]').forEach(wrapper => {
    const ms = 300; // duration for items animation in ms
    const vh = 30; // vertical transform for items animation in vh
    const css = '[data-filter="item"]{transition: transform ' + ms + 'ms ease-in-out, opacity ' + ms + 'ms ease-in-out;}';
    document.head.insertAdjacentHTML("beforeend", '<style>' + css + '</style>');

    function getEvent(trigger) {
      switch (trigger.tagName) {
        case 'SELECT':
        case 'INPUT':
          return 'change';
        default:
          return 'click';
      }
    }
    function animate(showMore) {
      const list = wrapper.f_list;
      const listWrapper = list.parentElement;
      const items = wrapper.f_items;
      const itemsShown = wrapper.f_itemsLimited;
      const itemsHidden = items.filter(item => !itemsShown.includes(item));

      function showElements(duration) {
        itemsShown.forEach(item => {
          list.appendChild(item);
          item.classList.remove('hidden');
          setTimeout(() => {
            item.style = 'transform: translateY(0vh); opacity: 1;';
            setTimeout(() => listWrapper.style.height = 'auto', duration);
          }, duration);
        });
        itemsHidden.forEach(item => list.appendChild(item));
        list.scrollHeight == 0 ? listWrapper.style.height = '0px' :
        listWrapper.style.height = list.scrollHeight - window.innerHeight * vh / 100 + 'px';
      }

      listWrapper.style.height = list.scrollHeight + 'px';
      if (showMore) {
        showElements(100);
      } else {
        items.forEach(item => item.style = 'transform: translateY(' + vh + 'vh); opacity: 0;');
        setTimeout(() => {
          items.forEach(item => item.classList.add('hidden'));
          showElements(ms);
        }, ms);
      }
    }
    function limit(showMore = false) {
      // empty state
      wrapper.f_itemsFiltered.length == 0 ? wrapper.f_emptyState.classList.remove('hidden') : wrapper.f_emptyState.classList.add('hidden');
      // final list of elements to show
      wrapper.f_itemsLimited = wrapper.f_itemsFiltered;
      if (wrapper.f_moreButton) {
        if (wrapper.f_itemsFiltered.length > wrapper.f_limit) {
          wrapper.f_itemsLimited = wrapper.f_itemsFiltered.slice(0, wrapper.f_limit);
          wrapper.f_moreButton.classList.remove('hidden');
        } else {
          wrapper.f_moreButton.classList.add('hidden');
        }
      }
      animate(showMore);
    }
    function filter() {
      wrapper.f_itemsFiltered = wrapper.f_items.filter(elem => {
        for (const tag in wrapper.f_filters) {
          if (elem.f_tags[tag] === undefined || !elem.f_tags[tag].toLowerCase().includes(wrapper.f_filters[tag].toLowerCase())) {
            return false;
          }
        }
        return true;
      });
      limit();
    }
    function sortAscending(a, b) {
      const tagA = a.f_tags[wrapper.f_sort.tag].toLowerCase();
      const tagB = b.f_tags[wrapper.f_sort.tag].toLowerCase();
      if (tagA < tagB) return -1;
      if (tagA > tagB) return 1;
      return 0; // if equal
    }
    function sortDescending(a, b) {
      return sortAscending(a, b) * -1;
    }
    function sortRandom(a, b) {
      if (Math.random() < 0.5) {
        return -1;
      }
    }
    function sort() {
      switch (wrapper.f_sort.order) {
        case 'random':
          wrapper.f_items.sort(sortRandom);
          break;
        case '+':
          wrapper.f_items.sort(sortAscending);
          break;
        case '-':
          wrapper.f_items.sort(sortDescending);
          break;
      }
      filter();
    }
    function setLimit() {
      wrapper.f_limit += wrapper.f_more;
      // apply
      limit(true);
    }
    function setFilter(e) {
      const tagName = e.target.dataset.filterTag;
      const value = e.target.value;
      // set active class for buttons
      if (getEvent(e.target) == 'click') {
        const otherTriggers = wrapper.f_trigger.filter(elem => {
          return elem.dataset.filterFunction == 'filter' && elem.dataset.filterTag == tagName;
        });
        otherTriggers.forEach(trigger => { trigger.classList.remove('active') });
        e.target.classList.toggle('active');
      }
      // set filter
      if (wrapper.f_filters[tagName] == value && getEvent(e.target) == 'click') {
        wrapper.f_filters[tagName] = '';
      } else {
        wrapper.f_filters[tagName] = value;
      }
      // apply
      filter();
    }
    function setSort(e) {
      // set active class for buttons
      if (getEvent(e.target) == 'click') {
        const otherTriggers = wrapper.f_trigger.filter(elem => elem.dataset.filterFunction == 'sort');
        otherTriggers.forEach(trigger => { trigger.classList.remove('active') });
        e.target.classList.add('active');
      }
      // set sort
      wrapper.f_sort = JSON.parse(e.target.value);
      // apply
      sort();
    }
    function reset() {
      wrapper.f_limit = Number(wrapper.dataset.filterLimit);
      wrapper.f_sort = JSON.parse(wrapper.dataset.filterSort.replaceAll(`'`, `"`));
      // reset filter
      for (const tag in wrapper.f_items[0].f_tags) {
        wrapper.f_filters[tag] = '';
      };
      // reset trigger
      wrapper.f_trigger.forEach(trigger => {
        if (getEvent(trigger) == 'click' && trigger.value != '') {
          trigger.classList.remove('active');
        } else if (trigger.tagName == 'SELECT') {
          trigger.selectedIndex = 0;
        } else {
          trigger.value = '';
        }
      });
      // apply
      sort();
    }

    // create properties
    wrapper.f_filters = {};
    // get items, set tags and states
    wrapper.f_items = [...wrapper.querySelectorAll('[data-filter="item"]')];
    wrapper.f_items.forEach(item => {
      item.f_tags = {};
      item.querySelectorAll('[data-filter="tag"]').forEach(tag => {
        item.f_tags[tag.dataset.filterTag] = tag.textContent;
      });
      item.classList.add('hidden');
    });
    // get list
    wrapper.f_list = wrapper.f_items[0].parentElement;
    wrapper.f_list.parentElement.style.transition = 'height ' + ms + 'ms ease-in-out';
    // get empty-state
    wrapper.f_emptyState = wrapper.querySelector('[data-filter="empty-state"]');
    // get triggers and set event listener
    wrapper.f_trigger = [...wrapper.querySelectorAll('[data-filter="trigger"]')];
    wrapper.f_trigger.forEach(trigger => {
      switch (trigger.dataset.filterFunction) {
        case 'reset':
          trigger.addEventListener('click', reset);
          break;
        case 'more':
          wrapper.f_moreButton = trigger;
          wrapper.f_limit = Number(wrapper.dataset.filterLimit);
          wrapper.f_more = Number(wrapper.dataset.filterMore);
          trigger.addEventListener('click', setLimit);
          break;
        case 'filter':
          trigger.addEventListener(getEvent(trigger), setFilter);
          break;
        case 'sort':
          trigger.addEventListener(getEvent(trigger), setSort);
          break;
      }
    });

    // initialize
    reset(wrapper);
  });

})();