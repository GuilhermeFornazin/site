/* Cabeçalho:
   - ao rolar: visível enquanto o hero aparece; oculta ao descer depois dele; reaparece ao subir
     (movimentos menores que LIMIAR px são ignorados, para não piscar);
   - em telas estreitas: o menu recolhe num botão de três riscos que abre e fecha o painel de links. */
(function () {
  var topo = document.querySelector('.topo');
  var hero = document.getElementById('inicio');
  if (!topo || !hero) return;

  var LIMIAR = 6;
  var ultimoY = window.scrollY;
  var botao = document.getElementById('topoMenu');

  function menuAberto() { return topo.classList.contains('topo-menu-aberto'); }

  function atualizar() {
    var y = window.scrollY;
    var noHero = y < hero.offsetHeight;
    var delta = y - ultimoY;

    // Com o foco do teclado dentro do cabeçalho, ou com o menu aberto, ele fica visível.
    if (noHero || y <= 0 || topo.contains(document.activeElement) || menuAberto()) {
      topo.classList.remove('topo-oculto');
      ultimoY = y;
      return;
    }
    if (Math.abs(delta) < LIMIAR) return;

    if (delta > 0) topo.classList.add('topo-oculto');
    else topo.classList.remove('topo-oculto');
    ultimoY = y;
  }

  // A rotina é leve (só troca uma classe), então roda direto no evento de rolagem.
  window.addEventListener('scroll', atualizar, { passive: true });

  // Ao navegar com teclado para dentro do cabeçalho, ele reaparece para o foco ficar visível.
  topo.addEventListener('focusin', function () { topo.classList.remove('topo-oculto'); });

  // ----- Menu recolhível (telas estreitas) -----
  if (!botao) return;

  function definirMenu(aberto) {
    topo.classList.toggle('topo-menu-aberto', aberto);
    botao.setAttribute('aria-expanded', aberto ? 'true' : 'false');
  }

  botao.addEventListener('click', function () { definirMenu(!menuAberto()); });

  // Fecha ao clicar em um link do painel, ao clicar fora, com Esc e ao voltar para uma tela larga.
  topo.querySelectorAll('.topo-nav a, .topo-contato').forEach(function (link) {
    link.addEventListener('click', function () { definirMenu(false); });
  });
  document.addEventListener('click', function (e) {
    if (menuAberto() && !topo.contains(e.target)) definirMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuAberto()) {
      definirMenu(false);
      botao.focus();
    }
  });
  window.matchMedia('(min-width: 1101px)').addEventListener('change', function (e) {
    if (e.matches) definirMenu(false);
  });
})();
