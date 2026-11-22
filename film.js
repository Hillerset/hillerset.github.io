(function () {
  var v = document.getElementById('film');
  if (!v || !('IntersectionObserver' in window)) return;
  var userPaused = false, ours = false;
  v.addEventListener('pause', function () {
    if (!ours && !v.ended) userPaused = true;
    ours = false;
  });
  v.addEventListener('play', function () { userPaused = false; });
  new IntersectionObserver(function (entries) {
    var r = entries[0].intersectionRatio;
    if (r >= 0.6 && v.paused && !userPaused && !v.ended) {
      v.muted = v.muted || !v.dataset.unmuted;
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    } else if (r < 0.2 && !v.paused) {
      ours = true;
      v.pause();
    }
  }, { threshold: [0, 0.2, 0.6, 1] }).observe(v);
  v.addEventListener('volumechange', function () { if (!v.muted) v.dataset.unmuted = '1'; });
})();
