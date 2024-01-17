// Filter V 3.8
// by Aleksander Knöbl

(function () {

  const ms = 300; // duration for items animation in ms
  const vh = 30; // vertical transform for items animation in vh

  function getKeyboardFocusableElements(element = document) {
    return [...element.querySelectorAll(
      '[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]),' +
      'details:not([disabled]), summary:not(:disabled), [tabindex]:not([tabindex="-1"]):not([disabled])'
    )];
  }

  class Group {
    constructor(htmlElement) {
      this.element = htmlElement;
      this.filters = {};
      this.items = [];
      this.itemsFiltered = [];
      this.itemsLimited = [];
      this.itemsHidden = [];
      this.sortBy;
      this.triggers = [];
      this.increaseLimit = this.increaseLimit.bind(this);
      this.setFilter = this.setFilter.bind(this);
      this.setSort = this.setSort.bind(this);
      this.reset = this.reset.bind(this);
      this.init = {
        filters: {},
        sortBy: '',
      };
      /* doesn't work because of Webflow restrictions with attribute values */
      /* this.init.filters = this.element.dataset.filterDefault ? JSON.parse(this.element.dataset.filterDefault.replaceAll(`'`, `"`)) : {}; */
      this.init.sortBy = JSON.parse(this.element.dataset.filterSort ? this.element.dataset.filterSort.replaceAll(`'`, `"`) : '{"order":"initial"}');
      this.element.querySelectorAll('[data-filter="trigger"]').forEach(elem => {
        this.triggers.push(new Trigger(elem, this));
      });
      this.triggers.forEach(elem => elem.getOtherTriggers());
      this.element.querySelectorAll('[data-filter="item"]').forEach(elem => {
        this.items.push(new Item(elem, this));
      });
      if (this.items[0]) {
        for (const tag in this.items[0].tags) this.init.filters[tag] = this.init.filters[tag] || '';
        this.list = this.items[0].element.parentElement;
        this.listWrapper = this.list.parentElement;
        this.listWrapper.style.transition = 'height ' + ms + 'ms ease-in-out';
        this.emptyState = this.element.querySelector('[data-filter="empty-state"]');
        this.reset();
      } else {
        this.element.querySelector('.w-dyn-list').remove();
      }
    }
    // private methods
    #animateItems(nextElement) {
      this.itemsLimited.forEach(item => {
        this.list.appendChild(item.element);
        item.show();
      });
      this.itemsHidden.forEach(item => this.list.appendChild(item.element));
      this.list.scrollHeight == 0 ? this.listWrapper.style.height = '0px'
        : this.listWrapper.style.height = this.list.scrollHeight - window.innerHeight * vh / 100 + 'px';
      setTimeout(() => {
        this.listWrapper.style.height = 'auto', 10 + ms;
        if (nextElement) {
          const focusables = getKeyboardFocusableElements(this.list.children[nextElement - 1]);
          focusables[0].focus();
        }
      });
    }
    #limit(nextElement, showMore = false) {
      // empty state
      this.itemsFiltered.length == 0 ? this.emptyState.classList.remove('filter-hidden') : this.emptyState.classList.add('filter-hidden');
      // final list of elements to show
      this.itemsLimited = this.itemsFiltered;
      if (this.moreButton) {
        if (this.itemsFiltered.length > this.limitBy) {
          this.itemsLimited = this.itemsFiltered.slice(0, this.limitBy);
          this.moreButton.element.classList.remove('filter-hidden');
        } else {
          this.moreButton.element.classList.add('filter-hidden');
        }
      }
      // list of elements to hide
      this.itemsHidden = this.items.filter(item => !this.itemsLimited.includes(item));
      // animate
      this.listWrapper.style.height = this.list.scrollHeight + 'px';
      if (showMore) {
        this.#animateItems(nextElement);
      } else {
        this.items.forEach(item => item.hide());
        setTimeout(() => this.#animateItems(nextElement), ms);
      }
    }
    #sortAscending(a, b) {
      if (a.value < b.value) return -1;
      if (a.value > b.value) return 1;
      return 0; // if equal
    }
    #sortAndFilter(nextElement = null) {
      // sort
      let itemsSorted;
      if (this.sortBy.order == 'initial') {
        itemsSorted = this.items;
      } else if (this.sortBy.order == 'random') {
        itemsSorted = this.items.sort((a, b) => { return Math.random() - 0.5 });
      } else if (this.sortBy.tag) {
        let mapped = this.items.map((elem, i) => {
          return { i, value: elem.tags[this.sortBy.tag][0].toLowerCase() };
        });
        switch (this.sortBy.order) {
          case '+':
            mapped.sort(this.#sortAscending);
            break;
          case '-':
            mapped.sort((a, b) => { return this.#sortAscending(a, b) * -1 });
            break;
        }
        itemsSorted = mapped.map(elem => this.items[elem.i]);
      } else {
        itemsSorted = this.items;
      }
      // filter
      this.itemsFiltered = itemsSorted.filter(elem => {
        for (const tag in this.filters) {
          if (elem.tags[tag] === undefined) {
            return false;
          } else if (elem.tags[tag].filter(str => str.toLowerCase().includes(this.filters[tag].toLowerCase())).length == 0) {
            return false;
          }
        }
        return true;
      });
      this.#limit(nextElement);
    }
    // public methods
    increaseLimit() {
      let nextElement = this.limitBy + 1;
      this.limitBy += this.more;
      this.#limit(nextElement, true);
    }
    setFilter(trigger) {
      // set active class for buttons
      trigger.otherTriggers.forEach(elem => { elem.element.classList.remove('active') });
      if (trigger.event == 'click') trigger.element.classList.toggle('active');
      // set filter
      if (this.filters[trigger.tag] == trigger.tagValue && trigger.event == 'click') {
        this.filters[trigger.tag] = '';
      } else {
        this.filters[trigger.tag] = trigger.tagValue;
      }
      this.#sortAndFilter(1);
    }
    setSort(trigger) {
      // set active class for buttons
      if (trigger.event == 'click') {
        trigger.otherTriggers.forEach(elem => { elem.element.classList.remove('active') });
        trigger.element.classList.add('active');
      }
      // set sort
      this.sortBy = trigger.tagValue;
      this.#sortAndFilter(1);
    }
    reset() {
      this.filters = { ...this.init.filters };
      this.sortBy = this.init.sortBy;
      if (this.more) this.limitBy = this.init.limitBy;
      this.triggers.forEach(trigger => trigger.reset());
      this.#sortAndFilter();
    }
  }

  class Trigger {
    constructor(htmlElement, group) {
      this.element = htmlElement;
      this.group = group;
      this.otherTriggers = [];
      this.getOtherTriggers = this.getOtherTriggers.bind(this);
      this.setFilterClick = this.setFilterClick.bind(this);
      this.setFilterChange = this.setFilterChange.bind(this);
      this.setSort = this.setSort.bind(this);
      this.event = this.element.tagName == 'SELECT' || this.element.tagName == 'INPUT' ? 'change' : 'click';
      this.function = this.element.dataset.filterFunction;
      // this.reset
      this.event == 'click' && this.element.value ? this.reset = this.resetDeactive.bind(this)
        : this.element.tagName == 'SELECT' ? this.reset = this.resetSelect.bind(this)
          : this.function == 'reset' ? this.reset = function() {}
            : this.function == 'filter' && this.element.value == '' && this.element.tagName != 'INPUT' ? this.reset = this.resetActive.bind(this)
              : this.reset = this.resetValue.bind(this);
      switch (this.function) {
        case 'reset':
          this.element.addEventListener('click', this.group.reset);
          break;
        case 'more':
          this.group.moreButton = this;
          this.group.more = Number(this.group.element.dataset.filterMore);
          this.group.limitBy;
          this.group.init.limitBy = Number(this.group.element.dataset.filterLimit);
          this.element.addEventListener('click', this.group.increaseLimit);
          break;
        case 'filter':
          this.tag = this.element.dataset.filterTag;
          this.tagValue = this.element.value;
          if (this.element.hasAttribute('data-filter-init')) this.group.init.filters[this.tag] = this.tagValue;
          this.event == 'click' ? this.element.addEventListener('click', this.setFilterClick)
            : this.element.addEventListener(this.event, this.setFilterChange);
          break;
        case 'sort':
          this.tagValue = JSON.parse(this.element.value);
          this.element.addEventListener(this.event, this.setSort);
          break;
      }
    }
    getOtherTriggers() {
      this.otherTriggers = this.group.triggers.filter(elem => {
        if (elem == this) return false;
        if (this.function == 'filter') return elem.function == 'filter' && elem.tag == this.tag;
        if (this.function == 'sort') return elem.function == 'sort';
        return false;
      });
    }
    resetDeactive() {
      this.element.classList.remove('active');
    }
    resetActive() {
      this.element.classList.add('active');
    }
    resetSelect() {
      this.element.selectedIndex = 0;
    }
    resetValue() {
      this.element.value = '';
    }
    setFilterClick() {
      this.group.setFilter(this);
    }
    setFilterChange() {
      this.tagValue = this.element.value;
      this.group.setFilter(this);
    }
    setSort() {
      this.tagValue = JSON.parse(this.element.value);
      this.group.setSort(this);
    }
  }

  class Item {
    constructor(htmlElement, group) {
      this.element = htmlElement;
      this.group = group;
      this.tags = {}; // values are arrays of strings
      this.hide = this.hide.bind(this);
      this.show = this.show.bind(this);
      this.element.querySelectorAll('[data-filter="tag"]').forEach(elem => {
        (this.tags[elem.dataset.filterTag] ?? (this.tags[elem.dataset.filterTag] = [])).push(elem.textContent);
      });
      this.element.classList.add('filter-hidden');
    }
    hide() {
      this.element.style = 'transform: translateY(' + vh + 'vh); opacity: 0;';
      setTimeout(() => this.element.classList.add('filter-hidden'), ms);
    }
    show() {
      this.element.classList.remove('filter-hidden');
      setTimeout(() => {
        this.element.style = 'transform: translateY(0vh); opacity: 1;';
        setTimeout(() => this.element.removeAttribute('style'), ms);
      }, 10);
    }
  }

  // run
  const css = '[data-filter="item"]{transition: transform ' + ms + 'ms ease-in-out, opacity ' + ms + 'ms ease-in-out;}';
  document.head.insertAdjacentHTML("beforeend", '<style>' + css + '</style>');
  document.querySelectorAll('[data-filter="group"]').forEach(elem => new Group(elem));

})();