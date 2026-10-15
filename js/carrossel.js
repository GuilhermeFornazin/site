/* Carrossel da seção Sobre: uma foto por vez, troca automática, setas nas laterais e pontos.
   Pausa enquanto o cursor ou o foco estão sobre ele; com "reduzir movimento", não troca sozinho. */
(function () {
  var carrossel = document.getElementById('sobreCarrossel');
  if (!carrossel) return;

  var slides = Array.prototype.slice.call(carrossel.querySelectorAll('.sobre-slide'));
  var pontos = Array.prototype.slice.call(carrossel.querySelectorAll('.sobre-ponto'));
  var anterior = document.getElementById('sobreAnterior');
  var proxima = document.getElementById('sobreProxima');
  var atual = 0;
  var intervalo = 5000;
  var timer = null;
  var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function mostrar(i) {
    atual = (i + slides.length) % slides.length;
    slides.forEach(function (s, n) {
      s.classList.toggle('ativo', n === atual);
      s.setAttribute('aria-hidden', n === atual ? 'false' : 'true');
    });
    pontos.forEach(function (p, n) { p.setAttribute('aria-current', n === atual ? 'true' : 'false'); });
  }

  function iniciar() {
    if (reduzir || timer) return;
    timer = setInterval(function () { mostrar(atual + 1); }, intervalo);
  }

  function parar() {
    clearInterval(timer);
    timer = null;
  }

  // Ao escolher uma foto (seta ou ponto), a troca automática recomeça a partir dela.
  function irPara(i) {
    mostrar(i);
    parar();
    iniciar();
  }

  anterior.addEventListener('click', function () { irPara(atual - 1); });
  proxima.addEventListener('click', function () { irPara(atual + 1); });
  pontos.forEach(function (p, n) {
    p.addEventListener('click', function () { irPara(n); });
  });

  carrossel.addEventListener('mouseenter', parar);
  carrossel.addEventListener('mouseleave', iniciar);
  carrossel.addEventListener('focusin', parar);
  carrossel.addEventListener('focusout', iniciar);

  iniciar();
})();
