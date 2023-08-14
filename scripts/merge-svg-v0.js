// Merge svg V 0.1
// by Aleksander Knöbl

(function(){

  document.querySelectorAll('[data-merge-svg="wrapper"]').forEach(wrapper => {
    const container = wrapper.querySelector('[data-merge-svg="container"]');
    wrapper.querySelectorAll('[data-merge-svg="item"]').forEach(item => {
      const embed = item.closest('.w-embed');
      container.appendChild(item);
      embed.remove();
    });
  });
  
})();