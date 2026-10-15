/* Hero: vídeo de fundo em loop, mudo. Sem controle de pausa. */
(function () {
  var video = document.getElementById('heroVideo');
  if (!video) return;

  // Não inicia sozinho com "reduzir movimento" ou "economia de dados" (o arquivo é pesado).
  var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var economia = navigator.connection && navigator.connection.saveData;
  if (reduzir || economia) return;

  // Começa depois que a página termina de carregar: a capa (poster) e o texto aparecem primeiro,
  // e o vídeo não disputa a conexão com eles.
  function tocar() {
    var promessa = video.play();
    if (promessa && promessa.catch) promessa.catch(function () { /* autoplay bloqueado: fica o quadro inicial */ });
  }
  if (document.readyState === 'complete') tocar();
  else window.addEventListener('load', tocar, { once: true });
})();
