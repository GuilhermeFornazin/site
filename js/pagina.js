/* Comportamentos gerais: aparecer ao rolar. */
(function () {
  // Aparecer ao rolar (fade + subida de 2px). Sem suporte ou com "reduzir movimento", tudo já aparece.
  var itens = document.querySelectorAll('.revelar');
  var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduzir || !('IntersectionObserver' in window)) {
    itens.forEach(function (el) { el.classList.add('visivel'); });
  } else {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visivel'); obs.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    itens.forEach(function (el) { obs.observe(el); });
  }
})();
