// Stop Video V 1.0
// by Aleksander Knöbl

(function () {

  function stopVideo() {
    const videos = document.querySelectorAll('[data-stop-video="video"]');
    videos.forEach(video => {
      const src = video.innerHTML;
      video.innerHTML = '';
      video.innerHTML = src;
    });
  }

  document.querySelectorAll('[data-stop-video="trigger"]').forEach(trigger => {
    trigger.addEventListener('click', stopVideo);
  });

})();