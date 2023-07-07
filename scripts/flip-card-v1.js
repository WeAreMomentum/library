// Flip card V 1.0
// by Aleksander Knöbl

(function(){

  document.querySelectorAll('[data-flip-card="wrapper"]').forEach(wrapper => {
    const buttonShowFront = wrapper.querySelector('[data-flip-card="show-front"]');
    const buttonShowBack = wrapper.querySelector('[data-flip-card="show-back"]');
    buttonShowFront.addEventListener('click', () => {
      wrapper.style.transform = 'perspective(1000px) rotateY(0deg)';
    });
    buttonShowBack.addEventListener('click', () => {
      wrapper.style.transform = 'perspective(1000px) rotateY(180deg)';
    });
  });

})();