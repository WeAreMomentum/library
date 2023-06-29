// No Scroll V 0.2
// by Aleksander Knöbl

(function(){

  document.querySelectorAll('[data-no-scroll]').forEach(trigger => {
    const options = {
      bpDown: trigger.dataset.noScrollBreakpointDown,
      bpUp: trigger.dataset.noScrollBreakpointUp,
    };
    function initiate(e) {
      if (e.matches) {
        // add trigger
        if (trigger.dataset.noScroll == 'toggle') {
          trigger.addEventListener('click', function() {
            document.documentElement.classList.toggle('no-scroll');
          });
        } else if (trigger.dataset.noScroll == 'on') {
          trigger.addEventListener('click', function() {
            document.documentElement.classList.add('no-scroll');
          });
        } else if (trigger.dataset.noScroll == 'off') {
          trigger.addEventListener('click', function() {
            document.documentElement.classList.remove('no-scroll');
          });
        }
      } else {
        // remove trigger
        if (trigger.dataset.noScroll == 'toggle') {
          trigger.removeEventListener('click', function() {
            document.documentElement.classList.toggle('no-scroll');
          });
        } else if (trigger.dataset.noScroll == 'on') {
          trigger.removeEventListener('click', function() {
            document.documentElement.classList.add('no-scroll');
          });
        } else if (trigger.dataset.noScroll == 'off') {
          trigger.removeEventListener('click', function() {
            document.documentElement.classList.remove('no-scroll');
          });
        }
      }
    }
    let mediaQueryList = window.matchMedia('');
    if (options.bpDown && options.bpUp) {
      mediaQueryList = window.matchMedia('(max-width:' + options.bpDown +'px) and (min-width:' + options.bpUp + 'px)');
    } else if (options.bpDown) {
      mediaQueryList = window.matchMedia('(max-width:' + options.bpDown + 'px)');
    } else if (options.bpUp) {
      mediaQueryList = window.matchMedia('(min-width:' + options.bpUp + 'px)');
    }
    mediaQueryList.addListener(initiate);
    initiate(mediaQueryList);
  });

})();