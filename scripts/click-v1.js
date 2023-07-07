// Click V 1.0
// by Aleksander Knöbl

(function(){

  document.querySelectorAll('[data-click]').forEach(trigger => {
    trigger.addEventListener('click', function() {
      document.querySelector(this.dataset.click).click();
    });
  });

})();