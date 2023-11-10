// CMS Select V 1.2
// by Aleksander Knöbl

(function(){
  
  document.querySelectorAll('[data-select="wrapper"]').forEach(wrapper => {
    const select = wrapper.querySelector('select');
    wrapper.querySelectorAll('[data-select="value"]').forEach(value => {
      // append option to select
      const option = document.createElement("option");
      option.value = value.hasAttribute('data-select-value') ? value.dataset.selectValue : value.textContent;
      option.textContent = value.textContent;
      select.appendChild(option);
    });
    wrapper.querySelector('.w-dyn-list').remove();
  });

})();