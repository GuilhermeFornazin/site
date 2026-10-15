/* Aviso de cookies e ferramentas de medição (Google Analytics 4 e Pixel da Meta).
   - Os IDs ficam em data/site.js (rastreio). Sem nenhum ID preenchido, o aviso não aparece e nada é carregado.
   - As ferramentas carregam assim que o visitante entra; o aviso informa e oferece "Recusar".
     Quem recusa não carrega mais nada (e, se já tinha carregado, os cookies são apagados).
   - A escolha fica guardada no navegador; o link "Cookies" do rodapé reabre o aviso para mudar a escolha.
   - Cliques no WhatsApp e no e-mail viram eventos de contato ("generate_lead" no Google, "Contact" na Meta). */
// Janela-resumo da política (index.html): fecha pelo botão X e clicando fora. Esc já é do próprio dialog.
(function () {
  var resumo = document.getElementById('resumoPrivacidade');
  if (!resumo) return;
  document.getElementById('resumoFechar').addEventListener('click', function () { resumo.close(); });
  resumo.addEventListener('click', function (e) { if (e.target === resumo) resumo.close(); });
})();

(function () {
  var cfg = (window.SITE && window.SITE.rastreio) || {};
  var google = (cfg.googleAnalytics || '').trim();
  var pixel = (cfg.metaPixel || '').trim();
  if (!google && !pixel) return;

  var CHAVE = 'consentimento-cookies';
  var carregado = false;
  var aviso = null;

  function ler() { try { return localStorage.getItem(CHAVE); } catch (e) { return null; } }
  function gravar(valor) { try { localStorage.setItem(CHAVE, valor); } catch (e) { /* sem armazenamento: vale só nesta visita */ } }

  function adicionarScript(src) {
    var s = document.createElement('script');
    s.async = true;
    s.src = src;
    document.head.appendChild(s);
  }

  function carregar() {
    if (carregado) return;
    carregado = true;

    if (google) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', google);
      adicionarScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(google));
    }

    if (pixel) {
      // Mesmo funcionamento do código oficial da Meta, mas sem script embutido no HTML.
      var fbq = window.fbq = function () {
        if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
        else fbq.queue.push(arguments);
      };
      if (!window._fbq) window._fbq = fbq;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = '2.0';
      fbq.queue = [];
      adicionarScript('https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', pixel);
      fbq('track', 'PageView');
    }
  }

  // Ao recusar depois de ter aceitado: apaga os cookies das ferramentas e recarrega a página sem elas.
  function apagarCookies() {
    var dominios = ['', location.hostname, '.' + location.hostname.replace(/^www\./, '')];
    document.cookie.split(';').forEach(function (c) {
      var nome = c.split('=')[0].trim();
      if (!/^(_ga|_gid|_gat|_fbp|_fbc)/.test(nome)) return;
      dominios.forEach(function (d) {
        document.cookie = nome + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  function decidir(escolha) {
    var tinhaAceitado = carregado;
    gravar(escolha);
    aviso.hidden = true;
    if (escolha === 'aceito') carregar();
    else if (tinhaAceitado) { apagarCookies(); location.reload(); }
  }

  function montarAviso() {
    var nomes = [google && 'Google Analytics', pixel && 'Pixel da Meta'].filter(Boolean).join(' e ');
    aviso = document.createElement('section');
    aviso.className = 'cookies';
    aviso.setAttribute('aria-label', 'Aviso de cookies');
    aviso.hidden = true;

    var texto = document.createElement('p');
    texto.className = 'cookies-texto';
    texto.textContent = 'Este site usa cookies para medir as visitas e melhorar os anúncios (' + nomes + '). Ao continuar, você permite o uso, mas pode recusar. ';
    // Abre a janela-resumo (dialog#resumoPrivacidade em index.html); a política completa está no link dentro dela.
    var link = document.createElement('button');
    link.type = 'button';
    link.className = 'cookies-link';
    link.textContent = 'Política de privacidade';
    link.addEventListener('click', function () {
      var resumo = document.getElementById('resumoPrivacidade');
      if (resumo) resumo.showModal();
    });
    texto.appendChild(link);

    var botoes = document.createElement('div');
    botoes.className = 'cookies-botoes';
    [['recusado', 'Recusar'], ['aceito', 'Ok']].forEach(function (b) {
      var botao = document.createElement('button');
      botao.type = 'button';
      botao.className = 'cookies-botao';
      botao.dataset.escolha = b[0];
      botao.textContent = b[1];
      botao.addEventListener('click', function () { decidir(b[0]); });
      botoes.appendChild(botao);
    });

    aviso.appendChild(texto);
    aviso.appendChild(botoes);
    document.body.appendChild(aviso);
  }

  montarAviso();
  var escolha = ler();
  if (escolha !== 'recusado') carregar();   // sem escolha ainda: já carrega e mostra o aviso
  if (!escolha) aviso.hidden = false;

  // Link "Cookies" do rodapé: reabre o aviso para mudar a escolha.
  var reabrir = document.getElementById('abrirCookies');
  if (reabrir) {
    reabrir.hidden = false;
    reabrir.addEventListener('click', function () {
      aviso.hidden = false;
      aviso.querySelector('.cookies-botao').focus();
    });
  }

  // Cliques de contato viram eventos (só quando as ferramentas estão ativas).
  document.addEventListener('click', function (e) {
    if (!carregado) return;
    var link = e.target.closest && e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    var canal = /wa\.me\//.test(href) ? 'WhatsApp' : /^mailto:/.test(href) ? 'E-mail' : '';
    if (!canal) return;
    if (window.gtag) window.gtag('event', 'generate_lead', { method: canal });
    if (window.fbq) window.fbq('track', 'Contact', { content_name: canal });
  });
})();
