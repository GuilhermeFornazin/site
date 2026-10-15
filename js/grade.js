/* Grade de projetos (a partir de SITE.projetos) e player em modal. */
(function () {
  var grade = document.getElementById('grade');
  var dialogo = document.getElementById('video');
  if (!grade || !dialogo || !window.SITE) return;

  var caixa = document.getElementById('videoCaixa');
  var titulo = document.getElementById('videoTitulo');
  var player = document.getElementById('videoPlayer');
  var descricao = document.getElementById('videoDescricao');
  var fechar = document.getElementById('videoFechar');

  // ----- Grade -----
  grade.innerHTML = '';
  SITE.projetos.forEach(function (p) {
    var li = document.createElement('li');

    var botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'tile';
    botao.setAttribute('aria-label', 'Assistir: ' + (p.manchete ? p.manchete + ', ' : '') + p.nome);

    var img = document.createElement('img');
    // p.capa não tem extensão: existem os arquivos -800.webp e -1600.webp (largura real em p.capaLarguras)
    img.src = p.capa + '-800.webp';
    img.srcset = p.capa + '-800.webp ' + p.capaLarguras[0] + 'w, ' + p.capa + '-1600.webp ' + p.capaLarguras[1] + 'w';
    img.sizes = '(max-width: 560px) 100vw, 50vw';
    img.width = 800;
    img.height = 800;
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.style.objectPosition = p.capaPosicao || 'center';
    botao.appendChild(img);

    if (p.capaProvisoria) {
      var chip = document.createElement('span');
      chip.className = 'tile-chip';
      chip.textContent = 'capa provisória';
      botao.appendChild(chip);
    }

    var texto = document.createElement('span');
    texto.className = 'tile-texto';
    var nome = document.createElement('span');
    nome.className = 'tile-nome';
    nome.textContent = p.nome;
    texto.appendChild(nome);
    if (p.manchete) {
      var manchete = document.createElement('span');
      manchete.className = 'tile-manchete';
      manchete.textContent = p.manchete;
      texto.appendChild(manchete);
    }
    botao.appendChild(texto);

    botao.addEventListener('click', function () {
      if (p.videos) abrirCliente(p);
      else abrir(p);
    });
    li.appendChild(botao);
    grade.appendChild(li);
  });

  // ----- Player -----
  function abrir(p) {
    var proporcao = p.proporcao || [9, 16];
    caixa.style.setProperty('--r', proporcao[0] / proporcao[1]);
    player.style.setProperty('--r-razao', proporcao[0] + ' / ' + proporcao[1]);
    titulo.textContent = p.nome;
    player.innerHTML = '';

    if (p.vimeoId) {
      // O iframe só é criado aqui, depois do clique: nada do Vimeo carrega antes.
      var url = 'https://player.vimeo.com/video/' + encodeURIComponent(p.vimeoId) +
        '?autoplay=1&dnt=1&title=0&byline=0&portrait=0' +
        (p.vimeoHash ? '&h=' + encodeURIComponent(p.vimeoHash) : '');
      var iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.title = p.nome;
      iframe.allow = 'autoplay; fullscreen; picture-in-picture';
      iframe.allowFullscreen = true;
      player.appendChild(iframe);
    } else {
      var aviso = document.createElement('div');
      aviso.className = 'video-aviso';
      aviso.innerHTML = '<p class="subtitulo">Vídeo em breve</p><p class="legenda">Este projeto ainda não tem vídeo vinculado.</p>';
      player.appendChild(aviso);
    }

    descricao.hidden = !p.descricao;
    descricao.textContent = p.descricao || '';
    dialogo.showModal();
  }

  function aoFechar() { player.innerHTML = ''; }  // remove o iframe e interrompe o vídeo
  dialogo.addEventListener('close', aoFechar);
  function fecharAgora() { dialogo.close(); aoFechar(); }
  fechar.addEventListener('click', fecharAgora);
  dialogo.addEventListener('click', function (e) { if (e.target === dialogo) fecharAgora(); });

  // ----- Janela do cliente (vários vídeos lado a lado) -----
  var janela = document.getElementById('projeto');
  var janelaNome = document.getElementById('projetoNome');
  var janelaServico = document.getElementById('projetoServico');
  var janelaDescricao = document.getElementById('projetoDescricao');
  var janelaVideos = document.getElementById('projetoVideos');
  var janelaFechar = document.getElementById('projetoFechar');
  var janelaCaixa = janela.querySelector('.projeto-caixa');

  function abrirCliente(p) {
    janelaNome.textContent = p.nomeJanela || p.nome;  // nomeJanela pode trazer "\n" para quebrar linha
    janelaServico.textContent = p.manchete || '';
    janelaDescricao.textContent = p.descricaoCliente || '';
    janelaCaixa.classList.toggle('com-galeria', Boolean(p.galeria));
    if (p.galeria) montarGaleria(p.galeria);
    else pararGaleria();
    janelaVideos.innerHTML = '';

    var filmes = document.createElement('div');
    filmes.className = 'projeto-filmes';
    var soma = 0;
    p.videos.forEach(function (v) {
      var proporcao = v.proporcao || p.proporcao || [9, 16];
      var r = proporcao[0] / proporcao[1];
      soma += r;
      // Os iframes só são criados ao abrir a janela; o Vimeo não carrega antes disso.
      var quadro = document.createElement('div');
      quadro.className = 'projeto-video';
      quadro.style.setProperty('--r', r);
      var iframe = document.createElement('iframe');
      iframe.src = 'https://player.vimeo.com/video/' + encodeURIComponent(v.vimeoId) +
        '?dnt=1&badge=0&autopause=0&title=0&byline=0&portrait=0';
      iframe.title = v.titulo;
      iframe.allow = 'fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';
      iframe.allowFullscreen = true;
      quadro.appendChild(iframe);
      filmes.appendChild(quadro);
    });
    filmes.style.setProperty('--soma', soma);
    filmes.style.setProperty('--gaps', (p.videos.length - 1) * 24 + 'px');
    janelaVideos.appendChild(filmes);
    janela.showModal();
  }

  // ----- Galeria de fotos: uma por vez, troca sozinha a cada 3 s, com botões nas laterais -----
  var galeriaQuadro = document.getElementById('galeriaQuadro');
  var galeriaAnterior = document.getElementById('galeriaAnterior');
  var galeriaProxima = document.getElementById('galeriaProxima');
  var galeriaFotos = [];
  var galeriaImagens = [];
  var galeriaAtual = 0;
  var galeriaTimer = null;
  var reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Só pede o arquivo quando a foto vai aparecer (a atual e a próxima): as fotos não carregam todas de uma vez.
  function carregarFoto(i) {
    var total = galeriaImagens.length;
    var img = galeriaImagens[(i + total) % total];
    if (img && !img.getAttribute('src')) img.src = galeriaFotos[img.dataset.indice];
  }

  function mostrarFoto(i) {
    var total = galeriaImagens.length;
    galeriaAtual = (i + total) % total;
    galeriaImagens.forEach(function (img, k) { img.classList.toggle('ativa', k === galeriaAtual); });
    carregarFoto(galeriaAtual);
    carregarFoto(galeriaAtual + 1);
  }

  function iniciarTimer() {
    clearInterval(galeriaTimer);
    // Com "reduzir movimento" a galeria fica parada e o visitante troca pelos botões.
    if (!reduzirMovimento && galeriaImagens.length > 1) {
      galeriaTimer = setInterval(function () { mostrarFoto(galeriaAtual + 1); }, 3000);
    }
  }

  function montarGaleria(fotos) {
    pararGaleria();
    galeriaFotos = fotos;
    galeriaImagens = fotos.map(function (caminho, k) {
      var img = document.createElement('img');
      img.className = 'galeria-foto';
      img.alt = 'Foto ' + (k + 1) + ' de ' + fotos.length + ' da casa';
      img.decoding = 'async';
      img.dataset.indice = k;
      galeriaQuadro.insertBefore(img, galeriaAnterior);
      return img;
    });
    mostrarFoto(0);
    iniciarTimer();
  }

  function pararGaleria() {
    clearInterval(galeriaTimer);
    galeriaImagens.forEach(function (img) { img.remove(); });
    galeriaImagens = [];
  }

  galeriaAnterior.addEventListener('click', function () { mostrarFoto(galeriaAtual - 1); iniciarTimer(); });
  galeriaProxima.addEventListener('click', function () { mostrarFoto(galeriaAtual + 1); iniciarTimer(); });

  // ----- Foto ampliada: clicar na foto abre a versão em alta, por cima da janela -----
  var ampliada = document.getElementById('ampliada');
  var ampliadaFoto = document.getElementById('ampliadaFoto');
  var ampliadaAnterior = document.getElementById('ampliadaAnterior');
  var ampliadaProxima = document.getElementById('ampliadaProxima');
  var ampliadaFechar = document.getElementById('ampliadaFechar');

  // A versão grande fica na subpasta "grande", com o mesmo nome do arquivo da galeria.
  function mostrarAmpliada() {
    var caminho = galeriaFotos[galeriaAtual];
    ampliadaFoto.src = caminho.replace(/([^\/]+)$/, 'grande/$1');
    ampliadaFoto.alt = galeriaImagens[galeriaAtual].alt;
  }

  galeriaQuadro.addEventListener('click', function (e) {
    if (e.target.closest('.galeria-seta')) return;
    clearInterval(galeriaTimer);  // enquanto a foto está ampliada, a troca para
    mostrarAmpliada();
    ampliada.showModal();
  });
  ampliadaAnterior.addEventListener('click', function () { mostrarFoto(galeriaAtual - 1); mostrarAmpliada(); });
  ampliadaProxima.addEventListener('click', function () { mostrarFoto(galeriaAtual + 1); mostrarAmpliada(); });
  ampliadaFechar.addEventListener('click', function () { ampliada.close(); });
  ampliada.addEventListener('click', function (e) { if (e.target === ampliada) ampliada.close(); });
  ampliada.addEventListener('close', function () {
    ampliadaFoto.removeAttribute('src');
    iniciarTimer();  // volta a trocar sozinho, se a janela da casa ainda estiver aberta
  });

  function fecharJanela() { janela.close(); }
  janela.addEventListener('close', function () {
    janelaVideos.innerHTML = '';  // para os vídeos
    pararGaleria();
  });
  janelaFechar.addEventListener('click', fecharJanela);
  janela.addEventListener('click', function (e) { if (e.target === janela) fecharJanela(); });
})();
