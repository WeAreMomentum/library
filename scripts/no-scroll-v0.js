// No Scroll V 0.3
// by Aleksander Knöbl

(function () {

  class NoScrollTrigger {
    constructor(htmlElement) {
      this.element = htmlElement;
      const noScroll = this.element.dataset.noScroll;
      this.classMethod = noScroll == 'on' ? 'add'
        : noScroll == 'off' ? 'remove'
          : 'toggle';
      const bpDown = this.element.dataset.noScrollBreakpointDown || null;
      const bpUp = this.element.dataset.noScrollBreakpointUp || null;
      const media = (bpDown ? '(max-width:' + bpDown + 'px)' : '') + (bpDown && bpUp ? ' and ' : '') + (bpUp ? '(min-width:' + bpUp + 'px)' : '');
      this.mediaQueryList = window.matchMedia(media);

      this.setNoScroll = this.setNoScroll.bind(this);
      this.initiate = this.initiate.bind(this);
      this.initiate(this.mediaQueryList);
      this.mediaQueryList.addEventListener("change", this.initiate);
    }
    setNoScroll() {
      document.documentElement.classList[this.classMethod]('no-scroll');
    }
    initiate(mql) {
      if (mql.matches) {
        this.element.addEventListener('click', this.setNoScroll);
      } else {
        this.element.removeEventListener('click', this.setNoScroll);
      }
    }
  }

  document.querySelectorAll('[data-no-scroll]').forEach(elem => new NoScrollTrigger(elem));

})();