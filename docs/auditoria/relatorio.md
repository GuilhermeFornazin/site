# Relatório da auditoria do site (15/10/2026)

## 1. Resumo executivo

O site estava em bom estado: HTML válido, nenhuma referência quebrada, nenhuma rolagem horizontal de 320 a 2560 px, contraste AA em todas as combinações de cor, e Vimeo carregando só depois do clique.

Foram corrigidos 16 achados, de 22 alterações (lista completa em `alteracoes.md`). Os mais importantes:
- no celular, o botão de fechar da janela do cliente rolava junto com o conteúdo e saía da tela;
- a página de trás rolava com uma janela aberta;
- a coluna de texto ficava estreita demais em celulares;
- a fonte Open Sans era baixada mais pesada do que o necessário (81 KB para 47 KB).

O maior problema que ficou é o peso do vídeo do hero (34,6 MB no computador e 11 MB no celular, num loop de 80 segundos). Recomprimir depende de aprovação (`pendencias-do-dono.md`, item 1).

Notas de 0 a 10 (estimativas da auditoria):

| Área | Antes | Depois |
|---|---|---|
| Código | 8 | 8,5 |
| Performance | 6 | 6,5 (o vídeo limita) |
| Acessibilidade | 7,5 | 8,5 |
| Responsividade no celular | 7 | 8,5 |
| Design visual | 8 | 8 |
| Clareza do texto | 8 | 8 |

O que já estava bem: CSP enxuta e coerente com o uso, links externos com `rel="noopener"`, imagens em WebP com `srcset`, "reduzir movimento" respeitado no CSS e no JS, e títulos em ordem.

## 2. Achados corrigidos

| ID | Categoria | Severidade | Onde | Tela | O que estava errado | O que foi feito | Verificação |
|---|---|---|---|---|---|---|---|
| C-001 | usabilidade | ALTO | css/site.css:423, :451 | celular e tablet (até 900 px) | O botão de fechar da janela do cliente rolava junto com o texto e sumia (285 px acima da tela na janela da Glaucia Afonso) | Caixa com `position: static`; animação de abertura sem retenção no fim | Navegador em 375 px: o botão fica a 57 px do topo antes e depois de rolar |
| C-002 | usabilidade | ALTO | css/site.css:361, :423 | todas | A página de trás rolava com a janela aberta | `body:has(dialog[open])` sem rolagem; `overscroll-behavior: contain` na caixa | Navegador: overflow `hidden` com a janela aberta e restaurado ao fechar |
| C-003 | responsividade | ALTO | css/site.css:11, :254 | até 480 px | Coluna de texto estreita: 287 px em 375 px e 232 px em 320 px; cartões das etapas com cerca de 168 px de texto em 320 px | Margem lateral de 24 px e respiro de 24 px nas etapas | Navegador: 327 px de texto (375 px de tela), 272 px (320 px) e 224 px nas etapas (320 px) |
| C-004 | responsividade | MÉDIO | css/site.css:138 | até 480 px | "reais." sozinho na terceira linha do hero | Fonte proporcional à tela (28 a 40 px) e 48 px de respiro embaixo | Navegador: duas linhas em 375 e em 320 px |
| C-005 | performance | MÉDIO | index.html:31; privacidade.html:16 | todas | Open Sans com eixo de largura e itálico, sem uso | Só o eixo de peso, de 400 a 700 | Arquivo latino de 81 KB para 47 KB |
| C-006 | performance | MÉDIO | index.html:13 | todas | A capa do vídeo, primeira imagem grande, não tinha prioridade | `preload` com `fetchpriority="high"` | HTML válido |
| C-007 | performance | MÉDIO | js/hero.js:11 a 18 | todas | O vídeo começava a baixar junto com o resto da página | O vídeo só começa depois do evento `load` | Navegador: vídeo tocando depois da carga |
| C-008 | performance | BAIXO | index.html:175 | todas | A primeira foto do Sobre (fora da tela) era baixada na abertura | `loading="lazy"` | Lista de requisições |
| C-009 | acessibilidade | MÉDIO | css/site.css:269 a 271 | todas | Pontos do carrossel com 24 por 24 px | 44 por 44 px | Navegador |
| C-010 | acessibilidade | MÉDIO | css/site.css:313 a 316 | telas de toque | Links do rodapé com 26 px de altura | 46 px em telas de toque; desktop sem mudança | Navegador (modo celular e desktop) |
| C-011 | responsividade | BAIXO | css/site.css:358 | celular | Janela com 90vh pode passar da área visível com a barra do navegador | `90dvh`, com 90vh de reserva | Estilo calculado; precisa de aparelho real |
| C-012 | acessibilidade | BAIXO | css/site.css:221 | 561 a 640 px | Tipo do serviço com 11 px | 12 px | Leitura |
| C-013 | código | BAIXO | privacidade.html:11 | todas | Página sem favicon | `GF.svg` | HTML válido |
| C-014 | código | BAIXO | css/site.css | todas | CSS sem uso: `.rodape-item`, `.rodape-sub`, regra repetida de `.etapas`, fonte do botão de menu | Removido | Busca no projeto |
| C-015 | código | BAIXO | index.html:166, :196; css/site.css; js/header.js:4; js/grade.js:146 | todas | Comentários desatualizados | Atualizados | Leitura |
| C-016 | texto | BAIXO | data/site.js:115, :139; privacidade.html:53 | todas | Frase solta (Glaucia Afonso), "Duffee", "(quando houver)" | Corrigidos | Navegador e leitura |

## 3. Achados pendentes

| ID | Categoria | Severidade | Onde | O que é | Motivo da pendência |
|---|---|---|---|---|---|
| P-001 | performance | ALTO | assets/hero/ | Vídeo do hero: 80 s; 34,6 MB no computador (cerca de 3,5 Mbps) e 11 MB no celular (cerca de 1,1 Mbps) | Recomprimir ou encurtar depende do dono (pendência 1) |
| P-002 | performance | MÉDIO | index.html:72 | A capa de 1920 px (151 KB) também vai para o celular | Exige uma imagem nova (pendência 2) |
| P-003 | performance | MÉDIO | Adobe Fonts | `font-display` padrão da Adobe; kit com pesos e família sem uso; Nexa 300 e 650 inexistentes no kit | Ação no painel da Adobe (pendência 3) |
| P-004 | acessibilidade | BAIXO | js/carrossel.js | Troca automática sem botão de pausa | Decisão do dono (pendência 5) |
| P-005 | texto | BAIXO | index.html:137 | Etapa 1 com duas ideias misturadas no fim | Texto do dono (pendência 6) |
| P-006 | conteúdo | MÉDIO | privacidade.html | Rascunho sem e-mail, data, revisão jurídica e link no site | Decisão do dono e revisão jurídica (pendência 7) |
| P-007 | SEO | MÉDIO | index.html:15 a 19; robots.txt | Sem `og:image`, `canonical` nem `sitemap.xml` | Depende do domínio final |
| P-008 | usabilidade | BAIXO | js/grade.js | Se o Vimeo estiver fora do ar, o quadro mostra o erro do próprio Vimeo, sem aviso do site | Melhoria opcional; o próprio player já avisa |
| P-009 | acessibilidade | BAIXO | index.html:79 | O cabeçalho fica dentro da seção do hero e, por isso, não conta como "banner" para leitores de tela | Mudar a estrutura mexe no layout do hero; baixo impacto |
| P-010 | geral | BAIXO | todas | Lighthouse, aparelhos reais (iPhone e Android), transições ao rolar e "reduzir movimento" emulado | Não disponíveis no ambiente de teste |

## 4. Seção celular

1. C-001, ALTO, corrigido: o botão de fechar da janela do cliente agora fica fixo.
2. C-002, ALTO, corrigido: a página de trás não rola com a janela aberta.
3. C-003, ALTO, corrigido: margens de 24 px e cartões com mais largura de texto.
4. P-001, ALTO, pendente: 11 MB de vídeo no celular.
5. C-004, MÉDIO, corrigido: frase do hero em duas linhas.
6. C-009, MÉDIO, corrigido: pontos do carrossel com 44 px.
7. C-010, MÉDIO, corrigido: links do rodapé com 46 px.
8. P-002, MÉDIO, pendente: capa grande no celular.
9. C-011, BAIXO, corrigido: altura da janela com `dvh` (falta conferir em aparelho).
10. C-012, BAIXO, corrigido: tipo do serviço com 12 px.

Conferido sem problema: menu de três riscos (abre, fecha com Esc, clique fora e clique em link; 333 px de altura aberto); um trabalho por vez abaixo de 560 px (blocos de 375 por 375 px); rodapé com Mais e Redes sociais lado a lado e Contatos embaixo; janela do cliente com texto e vídeo alinhados na margem de 24 px; nenhuma rolagem horizontal em 320, 375, 768, 1024, 1440 e 2560 px.

## 5. Remoções e arquivos

Removido:
- `.rodape-item` e `.rodape-sub` (css/site.css). A busca em index.html, privacidade.html e js/ não encontra as classes.
- Regra `.etapas { grid-template-columns: 1fr; }` em até 560 px. Repetia a regra de 900 px.
- `font` e `letter-spacing` do `.topo-menu`. O botão não tem texto.

Não removido (com motivo):
- `assets/logo/circular.svg`: sem uso, mas é arquivo da marca (pendência 8).
- `assets/clientes/dufe-coffee.svg`: citado na lista `clientes` de data/site.js, sem uso na página. É arquivo de cliente.
- `assets/_originais/` (12 arquivos, 53,8 MB): protegido; já fica fora do ar pelo `.vercelignore`.
- Player simples (`dialog#video`), galeria e foto ampliada: funções planejadas, previstas em data/site.js.
- Linhas de pastas inexistentes no `.vercelignore` ("Fotos Glaucia Afonso", "Fotos So se for Flash"): não fazem mal e protegem as fotos se a pasta voltar.

## 6. Peso da primeira carga

Computador em 1440 px, tamanhos dos arquivos sem compressão do servidor. A fonte Nexa vem da Adobe e não pôde ser medida (o navegador não mostra o tamanho de arquivos de outro domínio).

| Arquivo | Antes | Depois | Crítico para a primeira tela? |
|---|---|---|---|
| index.html | 17,3 KB | 17,4 KB | sim |
| css/tokens.css e css/site.css | 29,4 KB | 30,1 KB | sim |
| JavaScript (7 arquivos) | 23,0 KB | 23,3 KB | parcial |
| Open Sans (arquivo latino) | 81 KB | 47 KB | sim |
| Nexa 400 e 700 (Adobe) | não medido | não medido | sim |
| hero-poster.webp | 151 KB | 151 KB (agora com prioridade) | sim |
| foto-camera-800.webp (Sobre) | 29 KB | 0 (só ao rolar) | não |
| Logotipo SVG | 2,5 KB | 2,5 KB | sim |
| **Total sem vídeo e sem Nexa** | **cerca de 333 KB** | **cerca de 271 KB** | |
| Vídeo do hero (baixado aos poucos) | até 34,6 MB no computador e 11 MB no celular | igual, mas só começa depois da carga | não |

Capas dos trabalhos (800 px, de 44 a 88 KB cada) carregam ao chegar perto da tela. Nenhuma imagem de 800 px passa de 200 KB. As maiores de 1600 px são a capa da Glaucia Afonso (281 KB), a foto do Sobre `foto-heic` (246 KB), a capa da Caminhada pela Paz (228 KB) e a foto do Sobre `foto-microfone` (207 KB).

## 7. Textos

Alterados: ver a tabela "Textos alterados" em `alteracoes.md` (três mudanças).

Sugestões que não foram aplicadas, porque mexem no texto do dono ou dos clientes:

| Local | Texto atual | Sugestão | Motivo |
|---|---|---|---|
| Como eu produzo, etapa 1 | "Quero saber o que você vende, para quem e o que precisa que as pessoas entendam depois de assistir ao vídeo e como funciona a sua empresa." | "Quero saber o que você vende, para quem, como funciona a sua empresa e o que as pessoas precisam entender depois de assistir ao vídeo." | Duas ideias misturadas no fim |
| Sobre mim | "produzir conteúdo que funciona e conversa com o seu público com uma estética agradável, com ritmo leve e uma boa história." | "produzir conteúdo que funcione e converse com o seu público, com estética agradável, ritmo leve e uma boa história." | Repetição de "com" |
| G.A. Motors | "A gente acredita que a confiança começa aí" | Manter (texto do cliente) | Primeira pessoa do plural; o resto do site fala em "eu" |
| MVB | "mostrar que tem muitas pessoas buscando" | "mostrar que há muitas pessoas buscando" | Linguagem informal (texto do cliente) |
| Descrição do site (meta) | "... vídeos para eventos e fotografia ..." | Confirmar se fotografia é um serviço oferecido | A página mostra só trabalhos em vídeo |

Pontuação conferida: hero com ponto final; títulos de cards, botões e rótulos sem ponto; parágrafos com ponto. Consistente.

## 8. Próximos passos recomendados

1. Recomprimir ou encurtar o vídeo do hero (P-001). É o maior ganho de peso.
2. Criar a capa menor do vídeo para celular (P-002).
3. No painel da Adobe, ativar `font-display: swap` e limpar o kit (P-003).
4. Testar em um iPhone e em um Android: janela do cliente, menu, carrossel e vídeo do hero.
5. Rodar o Lighthouse depois da publicação de teste.
6. Fechar a política de privacidade e colocar o link no rodapé (P-006).
7. Definir o domínio e preencher `canonical`, `og:url`, `og:image` (1200 por 630 px) e `sitemap.xml` (P-007).
8. Decidir as sugestões de texto da seção 7.

## 9. Verificações executadas

| Verificação | Resultado |
|---|---|
| a) Validação HTML (index.html e privacidade.html) | Aprovado, antes e depois (0 erros) |
| b) Sintaxe JS (`node --check` em js/ e data/site.js) | Aprovado, antes e depois |
| c) Referências quebradas (script próprio, fora do projeto) | Aprovado: nenhuma; um arquivo sem uso (`circular.svg`) |
| d) Servidor local (`npx serve`) | Aprovado: a página responde 200 |
| e) Larguras 320, 375, 768, 1024, 1440 e 2560 px | Aprovado: nenhuma rolagem horizontal; primeira tela conferida em 375 e 1440 px |
| f) Janelas em 375 px | Aprovado depois da correção C-001 (fechar com o botão e com Esc) |
| g) Menu no celular | Aprovado |
| h) Teclado | Parcial: foco visível global (`:focus-visible`) e Esc conferidos no código e no navegador; não foi feito um percurso completo com Tab |
| i) Reduzir movimento | Conferido no código (CSS e JS); não foi emulado no navegador de teste |
| j) Contraste | Aprovado. Todas as combinações passam AA; a menor é o texto do botão marrom, 4,61:1 |
| k) Rede | Aprovado: nenhuma requisição ao Vimeo antes do clique |

Não verificado: Lighthouse, aparelhos reais, transições disparadas ao rolar, emulação de "reduzir movimento" e tamanho dos arquivos da Adobe.
