# Diário de alterações da auditoria (15/10/2026)

Backup completo feito antes de qualquer mudança (sem `assets/_originais/`, que não foi tocada):
`C:\Users\guilh\AppData\Local\Temp\claude\G--Meu-Drive-Guilherme-Site-Portf-lio\5bb4c5c0-b418-4b3b-ad65-70df78c32aa5\scratchpad\backup-pre-auditoria` (47 arquivos, mesma contagem do projeto).

Linhas citadas são as do estado final dos arquivos.

| # | Arquivo e linha | O que mudou | Por quê | Como foi testado |
|---|---|---|---|---|
| 1 | css/site.css:423 | `.projeto-caixa` em até 900 px ganhou `position: static` e `overscroll-behavior: contain` | No celular, o botão de fechar estava preso à caixa que rola: ao rolar a janela da Glaucia Afonso, ele subia até 285 px acima da tela | Navegador em 375 px: botão a 57 px do topo antes e depois de rolar a caixa até o fim |
| 2 | css/site.css:451 | Animação de abertura da janela sem `both` | A animação retida no fim fazia a caixa continuar como referência de posição, anulando o item 1 | Mesmo teste do item 1 |
| 3 | css/site.css:361 | `body:has(dialog[open]) { overflow: hidden; }` | Com uma janela aberta, a página de trás rolava junto | Navegador: overflow do body fica `hidden` com a janela aberta e volta ao fechar |
| 4 | css/site.css:358 | `.projeto` com `height: 90dvh` (90vh continua como reserva) | Em navegadores de celular com barra que aparece e some, 90vh pode passar da área visível | Estilo calculado conferido; o efeito real só aparece em aparelho |
| 5 | css/site.css:11 | Margem lateral de 24 px em telas de até 480 px (antes 44 px) | Em 375 px sobravam 287 px de texto; em 320 px, 232 px | Navegador: texto do Sobre passou a 327 px (375) e 272 px (320) |
| 6 | css/site.css:254 | `.etapa` com 24 px de respiro interno em até 480 px (antes 32 px) | Cartões de Como eu produzo ficavam com coluna de texto de cerca de 168 px em 320 px | Navegador em 320 px: 224 px de texto |
| 7 | css/site.css:138 | Frase do hero em até 480 px com `clamp(28px, 10.5vw - 6px, 40px)` e 48 px de respiro embaixo | Em 375 px a palavra "reais." ficava sozinha numa terceira linha | Navegador: duas linhas em 375 px (33 px de fonte) e em 320 px (28 px) |
| 8 | css/site.css:269 a 271 | Pontos do carrossel do Sobre com 44 por 44 px de área de toque (antes 24 por 24) | Alvo de toque pequeno no celular | Navegador: 44 por 44 px |
| 9 | css/site.css:313 a 316 | Em telas de toque, links do rodapé com 10 px de respiro em cima e embaixo, sem espaço extra entre eles | Links com 26 px de altura, difíceis de tocar | Navegador no modo celular: 46 px de altura; no desktop (mouse) continuam 26 px |
| 10 | css/site.css:221 | Tipo do serviço nos blocos de trabalho: 12 px entre 561 e 640 px (antes 11 px) | Abaixo do mínimo legível | Leitura do CSS |
| 11 | index.html:31 e privacidade.html:16 | Open Sans pedida só no eixo de peso 400 a 700, sem eixo de largura e sem itálico | Nada no site usa itálico, largura variável, peso 300 ou 800 | Arquivo latino da fonte: 81 KB antes, 47 KB depois (medido baixando os dois) |
| 12 | index.html:13 | `preload` da capa do vídeo (`hero-poster.webp`) com prioridade alta | É a primeira imagem grande da tela | HTML válido; pedido aparece no início da carga |
| 13 | js/hero.js:11 a 18 | Vídeo do hero só começa depois do evento `load` | A capa e o texto aparecem primeiro, sem o vídeo disputar a conexão | Navegador: vídeo tocando depois da carga |
| 14 | index.html:175 | Primeira foto do carrossel do Sobre com `loading="lazy"` (antes `eager`) | A foto fica longe da primeira tela e era baixada logo na abertura (29 KB) | Lista de requisições |
| 15 | privacidade.html:11 | Favicon (`GF.svg`) na página de privacidade | A página não tinha ícone e o navegador pedia `/favicon.ico`, que não existe | HTML válido; referência existe |
| 16 | css/site.css (rodapé) | Removidas `.rodape-item` e `.rodape-sub` | Sem uso: a marcação delas saiu na última mudança do rodapé (busca em HTML e JS sem resultado) | Busca no projeto |
| 17 | css/site.css (etapas) | Removida a regra repetida de `.etapas` em até 560 px | Repetia a de 900 px | Leitura do CSS |
| 18 | css/site.css (menu) | Removida a declaração de fonte do botão de menu | O botão só tem o ícone, sem texto | Leitura do CSS |
| 19 | index.html:166 e 196; css/site.css (manifesto, Sobre, rodapé); js/header.js:4; js/grade.js:146 | Comentários atualizados | Citavam `assets/placeholders/`, "Siga-nos", "Contato em duas colunas", "foto quadrada", "Como eu faço", botão "Menu" e troca da galeria "a cada 1 s" (o código usa 3 s) | Leitura |
| 20 | data/site.js:115 | Glaucia Afonso: ". Ao mostrar a distribuição" virou ", ao mostrar a distribuição" | A segunda frase ficava solta, sem verbo principal | Janela aberta no navegador |
| 21 | data/site.js:139 | Lista de clientes: "Duffee Coffee" virou "Dufe Coffee" | Erro de digitação (lista sem uso na página hoje) | Leitura |
| 22 | privacidade.html:53 | "Vídeos (quando houver)" virou "Vídeos" | O site já tem vídeos; o resto do item não mudou | HTML válido |

## Textos alterados

| Local | Antes | Depois | Motivo |
|---|---|---|---|
| data/site.js, Glaucia Afonso | "A intenção é dar ao cliente uma visão completa e sem pressa. Ao mostrar a distribuição dos ambientes, ..." | "A intenção é dar ao cliente uma visão completa e sem pressa, ao mostrar a distribuição dos ambientes, ..." | Frase solta |
| data/site.js, clientes | "Duffee Coffee" | "Dufe Coffee" | Digitação |
| privacidade.html, item Vídeos | "Vídeos (quando houver):" | "Vídeos:" | O site já tem vídeos |
