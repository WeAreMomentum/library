// Tabs V 1.0
// by Aleksander Knöbl

(function(){

  class Group {
    constructor(htmlElement) {
      this.element = htmlElement;
      this.tabs = [];
      this.triggers = [...this.element.querySelectorAll('[data-tabs="trigger"]')];
      this.contents = [...this.element.querySelectorAll('[data-tabs="content"]')];
      this.element.querySelectorAll('[data-tabs-slug]').forEach(elem => {
        if (!this.tabs.find(tab => tab.slug == elem.dataset.tabsSlug)) this.tabs.push(new Tab(elem.dataset.tabsSlug, this));
      });
      let index = 0;
      const params = new URLSearchParams(window.location.search)
      const tabName = params.get('tab');
      if (tabName) index = this.tabs.findIndex(tab => tab.slug == tabName);
      this.element.querySelector('[data-filter]') ? setTimeout(() => this.tabs[index].open(), 1000) : this.tabs[index].open();
    }
  }

  class Tab {
    constructor(slug, group) {
      this.slug = slug;
      this.group = group;
      this.trigger = this.group.triggers.find(elem => elem.dataset.tabsSlug == this.slug || elem.querySelector('[data-tabs-slug="' + this.slug + '"]') !== null);
      this.content = this.group.contents.find(elem => elem.dataset.tabsSlug == this.slug || elem.querySelector('[data-tabs-slug="' + this.slug + '"]') !== null);
      this.open = this.open.bind(this);
      this.trigger.addEventListener('click', this.open);
    }
    close() {
      this.trigger.classList.remove('active');
      this.content.style.display = 'none';
    }
    open() {
      this.group.tabs.forEach(tab => tab.close());
      this.trigger.classList.add('active');
      this.content.style.display = 'block';
    }
  }

  // run
  document.querySelectorAll('[data-tabs="group"]').forEach(elem => new Group(elem));

})();