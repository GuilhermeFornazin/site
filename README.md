# Portfólio audiovisual — Guilherme Fornazin

Site estático em HTML, CSS e JavaScript puro. Sem build e sem dependências no site (a pasta `scripts/` tem uma ferramenta opcional para gerar galerias de fotos).

## Estrutura

```
index.html            página única (hero, trabalhos, intenção, como eu produzo, sobre, rodapé)
privacidade.html      política de privacidade (RASCUNHO: revisar antes de publicar)
data/site.js          lista de projetos da grade — edite aqui
css/tokens.css        cores, fontes e espaços
css/site.css          estilos do site
js/js-flag.js         marca o HTML como "com JavaScript"
js/hero.js            vídeo do hero (sem controle de pausa)
js/header.js          cabeçalho que some ao descer e menu recolhível em telas estreitas
js/grade.js           grade de projetos, janela do cliente, galeria e foto ampliada
js/carrossel.js       carrossel de fotos da seção Sobre
js/pagina.js          animação de entrada ao rolar
js/consentimento.js   aviso de cookies; carrega Google Analytics 4 e Pixel da Meta, com opção de recusar
assets/hero/          vídeo do hero (MP4 sem áudio, em duas resoluções) e imagem de capa (poster)
assets/capas/         capas dos trabalhos em WebP: <nome>-800.webp e <nome>-1600.webp
assets/sobre/         fotos da seção Sobre em WebP, nas mesmas duas larguras
assets/logo/          logotipos (SVG)
assets/clientes/      logo de cliente guardado, sem uso na página (ver pendências)
assets/_originais/    imagens e vídeos de origem, antes da conversão (fora do deploy)
scripts/              ferramenta para gerar galerias de fotos (fora do deploy)
docs/                 rascunho do texto de privacidade e relatório da auditoria em docs/auditoria/ (não vai para o ar)
robots.txt            regras para buscadores
vercel.json           cabeçalhos de segurança e cache
.vercelignore         arquivos que a Vercel não publica
```

## Rodar localmente

Precisa do Node.js. Na pasta do projeto:

```bash
npx serve .
```

Abra o endereço que aparecer (normalmente http://localhost:3000).

## Como atualizar

- **Trabalhos:** edite `data/site.js`. Para trocar a capa, coloque a imagem em `assets/capas/` já convertida para WebP em duas larguras (`<nome>-800.webp` e `<nome>-1600.webp`), aponte `capa` para `assets/capas/<nome>` (sem extensão) e ajuste `capaLarguras`.
- **Vídeo (Vimeo):** em `data/site.js`, preencha `videos` com os números do link (`vimeo.com/123456789`).
- **WhatsApp:** o número e a mensagem estão no `index.html`. Para mudar, busque por `5516997595027`.
- **Google Analytics 4 e Pixel da Meta:** preencha `rastreio` em `data/site.js` (ID do Google no formato `G-XXXXXXXXXX` e ID do Pixel, só números). Com os IDs vazios, nada aparece e nada carrega. Com eles preenchidos, as ferramentas carregam assim que o visitante entra e o site mostra um aviso de cookies com o botão "Recusar" (`js/consentimento.js`); quem recusa não carrega mais nada. O link "Cookies" do rodapé reabre o aviso. Cliques no WhatsApp e no e-mail são enviados como eventos de contato (`generate_lead` no Google e `Contact` na Meta).
- **Redes sociais:** os endereços estão no rodapé do `index.html`.
- **Galeria de fotos de um cliente** (hoje não há nenhuma ativa; o código da galeria e da foto ampliada continua no site): coloque as fotos em uma pasta dentro de `assets/` e liste-a em `scripts/gerar-galeria.mjs`. Rode `npm install` (uma vez) e `npm run galeria` dentro de `scripts/`: o script cria `assets/galeria/...` e `data/galeria-*.js`. Depois inclua `<script src="data/galeria-....js">` no `index.html`, antes de `data/site.js`, e em `data/site.js` acrescente `galeria: window.NOME_DA_VARIAVEL` ao projeto. Lembre de manter a pasta das fotos originais fora do deploy no `.vercelignore`.

## Publicar na Vercel

**Só publique depois de resolver as pendências críticas abaixo.**

1. Crie um repositório **privado** no GitHub e envie a pasta (o `.gitignore` já está pronto).
2. Na Vercel: **Add New → Project**, importe o repositório. Framework: **Other**. Sem comando de build. Diretório de saída: raiz.
3. Depois do primeiro deploy, confira no navegador (aba Rede) se os cabeçalhos de segurança do `vercel.json` aparecem e se não há bloqueios no console.
4. Depois de definir o domínio, preencha os itens marcados `[URL-DO-SITE]` no `index.html` (canonical, `og:url`, `og:image`) e no `robots.txt`, e crie o `sitemap.xml`.

## Pendências

**Críticas antes de publicar**
- Revisão jurídica da política de privacidade; preencher `[e-mail de contato]` e `[data]`; remover `noindex` e o aviso de rascunho em `privacidade.html`.

**Demais**
- Imagem de compartilhamento (`og:image`, 1200×630).
- Domínio, `canonical`, `og:url`, `sitemap.xml`.
- `VideoObject` nos dados estruturados, quando houver vídeos.
- Adobe Fonts: ativar `font-display: swap` no projeto web (ação no painel da Adobe).
