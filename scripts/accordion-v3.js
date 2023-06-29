// Accordion V 3.2
// by Aleksander Knöbl

(function () {

  class Group {
    constructor(htmlElement) {
      this.element = htmlElement;
      this.accordions = [];
      this.closeAllTriggers = [];
      this.options = {
        openAll: ((this.element.dataset.accordionInitAll || 'false') === 'true') || (this.element.dataset.accordionOpenAll || 'false') === 'true',
        initFirst: (this.element.dataset.accordionInitFirst || 'false') === 'true',
        initAll: (this.element.dataset.accordionInitAll || 'false') === 'true'
      }
      this.element.querySelectorAll('[data-accordion="accordion"]').forEach(elem => {
        this.accordions.push(new Accordion(elem, this));
      });
      this.element.querySelectorAll('[data-accordion="close-all"]').forEach(elem => {
        this.closeAllTriggers.push(new CloseAllTrigger(elem, this));
      });
      if (this.options.initAll) this.accordions.forEach(elem => elem.toggle())
      else if (this.options.initFirst) this.accordions[0].toggle();
    }
  }

  class Accordion {
    constructor(htmlElement, group) {
      this.element = htmlElement;
      this.group = group;
      this.trigger = this.element.querySelector('[data-accordion="trigger"]');
      this.content = this.element.querySelector('[data-accordion="content"]');
      this.toggle = this.toggle.bind(this);
      this.trigger.addEventListener('click', this.toggle);
      this.close();
    }
    close() {
      this.element.classList.remove('active');
      this.content.style.maxHeight = '0px';
    }
    toggle() {
      if (!this.group.options.openAll) {
        this.group.accordions.filter(elem => elem != this).forEach(elem => elem.close());
      }
      this.element.classList.toggle('active');
      this.content.style.maxHeight == '0px' ? this.content.style.maxHeight = this.content.scrollHeight + 'px'
        : this.content.style.maxHeight = '0px';
    }
  }

  class CloseAllTrigger {
    constructor(htmlElement, group) {
      this.element = htmlElement;
      this.group = group;
      this.closeAll = this.closeAll.bind(this);
      this.element.addEventListener('click', this.closeAll);
    }
    closeAll() {
      this.group.accordions.forEach(accordion => accordion.close());
    }
  }

  // run
  document.querySelectorAll('[data-accordion="group"]').forEach(elem => new Group(elem));

})();