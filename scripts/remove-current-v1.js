// Remove Current V 1.0
// by Aleksander Knöbl

(function () {

  document.querySelectorAll('[data-remove-current]').forEach(link => {
    if (link.href == document.location.href) {
      link.remove();
    }
  });

})();