// IMG to SVG V 1.0
// by Aleksander Knöbl

(function () {

  document.querySelectorAll('[data-img-to-svg]').forEach(image => {
    fetch(image.src)
      .then(res => res.text())
      .then(data => {
        const parser = new DOMParser();
        const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');
        if (image.id) svg.id = image.id;
        if (image.className) svg.classList = image.classList;
        image.parentNode.replaceChild(svg, image);
      })
  });

})();