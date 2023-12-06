// Flip card V 2.1
// by Aleksander Knöbl

(function(){

  class Wrapper {
    constructor(htmlElement) {
      this.element = htmlElement;
      this.showFront = this.showFront.bind(this);
      this.showBack = this.showBack.bind(this);
      this.element.addEventListener('click', this.showBack);
    }
    showFront() {
      this.element.style.transform = 'perspective(1000px) rotateY(0deg)';
      this.element.removeEventListener('click', this.showFront);
      this.element.addEventListener('click', this.showBack);
    }
    showBack() {
      this.element.style.transform = 'perspective(1000px) rotateY(180deg)';
      this.element.removeEventListener('click', this.showBack);
      this.element.addEventListener('click', this.showFront);
    }
  }

  // run
  document.querySelectorAll('[data-flip-card="wrapper"]').forEach(elem => new Wrapper(elem));

})();