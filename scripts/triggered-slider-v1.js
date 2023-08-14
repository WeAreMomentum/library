// Triggered Slider V 1.2
// by Aleksander Knöbl

(function(){

  // required: wrapper, nav
  document.querySelectorAll('[data-triggered-slider="wrapper"]').forEach(wrapper => {
    const sliderDots = wrapper.querySelector('[data-triggered-slider="nav"]').children;
    const previous = wrapper.querySelector('[data-triggered-slider="previous"]');
    const next = wrapper.querySelector('[data-triggered-slider="next"]');
    const triggerNav = wrapper.querySelectorAll('[data-triggered-slider="trigger-nav"]');
    const triggerPrevious = wrapper.querySelectorAll('[data-triggered-slider="trigger-previous"]');
    const triggerNext = wrapper.querySelectorAll('[data-triggered-slider="trigger-next"]');
    const triggerFirst = wrapper.querySelectorAll('[data-triggered-slider="trigger-first"]');
    const triggerLast = wrapper.querySelectorAll('[data-triggered-slider="trigger-last"]');
    const delay = parseInt(wrapper.dataset.triggeredSliderDelay) || 0;

    function resetTrigger() {
      triggerNav.forEach(elem => {
        elem.classList.remove('active');
      });
    }
    function getActiveSlide() {
      const dots = Array.from(sliderDots);
      const activeDot = dots.filter(elem => elem.classList.contains('w-active'))[0];
      return dots.indexOf(activeDot);
    }
    function activateTrigger(n) {
      if (triggerNav.length) {
        resetTrigger();
        triggerNav[n].classList.add('active');
      }
    }
    function goToSlide(n) {
      activateTrigger(n);
      sliderDots[n].click();
    }

    triggerPrevious.forEach((elem) => {
      elem.addEventListener('click', function() {
        activateTrigger(getActiveSlide);
        setTimeout(function() {previous.click()}, delay);
      });
    });
    triggerNext.forEach((elem) => {
      elem.addEventListener('click', function() {
        activateTrigger(getActiveSlide);
        setTimeout(function() {next.click()}, delay);
      });
    });
    triggerFirst.forEach((elem) => {
      elem.addEventListener('click', function() {
        goToSlide(0);
      });
    });
    triggerLast.forEach((elem) => {
      elem.addEventListener('click', function() {
        goToSlide(sliderDots.length - 1);
      });
    });
    if (triggerNav.length) {
      triggerNav.forEach((elem, index) => {
        elem.addEventListener('click', function() {
          setTimeout(function() {goToSlide(index)}, delay);
        });
      });
      resetTrigger();
      triggerNav[0].classList.add('active');
    }
  });

})();