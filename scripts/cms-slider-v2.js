// CMS Slider V 2.3
// by Aleksander Knöbl

(function(){
  
  document.querySelectorAll('[data-slider="wrapper"]').forEach(wrapper => {
    const items = wrapper.querySelectorAll('.w-dyn-item');
    const mask = wrapper.querySelector('.w-slider-mask');
    const slide0 = mask.querySelector('.w-slide');
    if (items.length == 0) {
      const emptyState = wrapper.querySelector('.w-dyn-empty');
      wrapper.appendChild(emptyState);
      mask.parentElement.remove();
    } else {
      items.forEach(item => {
        const slide = slide0.cloneNode(true);
        mask.appendChild(slide);
        slide.appendChild(item.children[0]);
      });
      slide0.remove();
      // hide arrows and nav when there are no hidden slides
      if (mask.scrollWidth <= mask.clientWidth) {
        wrapper.querySelector('.w-slider-arrow-left').style.display = 'none';
        wrapper.querySelector('.w-slider-arrow-right').style.display = 'none';
        wrapper.querySelector('.w-slider-nav').style.display = 'none';
      };
    }
    wrapper.querySelector('.w-dyn-list').remove();
  });

})();