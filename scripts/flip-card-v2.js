// Flip card V 2.0
// by Aleksander Knöbl

(function(){

  class Wrapper {
    constructor(htmlElement) {
      this.element = htmlElement;
      this.frontSide = this.element.querySelector('[data-flip-card="front"]');
      this.backSide = this.element.querySelector('[data-flip-card="back"]');
      this.element.addEventListener('click', showBack);
    }
    showFront() {
      this.element.style.transform = 'perspective(1000px) rotateY(0deg)';
      this.element.removeEventListener('click', showFront);
      this.element.addEventListener('click', showBack);
    }
    showBack() {
      this.element.style.transform = 'perspective(1000px) rotateY(180deg)';
      this.element.removeEventListener('click', showBack);
      this.element.addEventListener('click', showFront);
    }
  }

  // run
  document.querySelectorAll('[data-flip-card="wrapper"]').forEach(elem => new Wrapper(elem));

})();