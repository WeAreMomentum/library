// Accordion V 2.2
// by Aleksander Knöbl

(function () {

  function toggleAccordion(groupWrapper, wrapper) {
    if (!groupWrapper.options.openAll) {
      wrapper.otherWrapper.forEach(elem => {
        elem.trigger.classList.remove('active');
        elem.content.style.maxHeight = '0px';
      });
    }
    wrapper.trigger.classList.toggle('active');
    if (wrapper.content.style.maxHeight == '0px') {
      wrapper.content.style.maxHeight = wrapper.content.scrollHeight + 'px';
    } else {
      wrapper.content.style.maxHeight = '0px';
    }
  }
  
  document.querySelectorAll('[data-accordion="group-wrapper"]').forEach(groupWrapper => {
    groupWrapper.allWrapper = [...groupWrapper.querySelectorAll('[data-accordion="wrapper"]')];
    groupWrapper.options = {
      openAll: (groupWrapper.dataset.accordionOpenAll || 'true') === 'true',
      initFirst: (groupWrapper.dataset.accordionInitFirst || 'true') === 'true'
    }
    groupWrapper.allWrapper.forEach(wrapper => {
      wrapper.trigger = wrapper.querySelector('[data-accordion="trigger"]');
      wrapper.content = wrapper.querySelector('[data-accordion="content"]');
      wrapper.otherWrapper = groupWrapper.allWrapper.filter(elem => elem !== wrapper);
      wrapper.trigger.classList.remove('active');
      wrapper.trigger.addEventListener('click', function() {
        toggleAccordion(groupWrapper, wrapper);
      });
      wrapper.content.style.maxHeight = '0px';
    });
    if (groupWrapper.options.initFirst) { groupWrapper.allWrapper[0].trigger.click(); }
  });

})();