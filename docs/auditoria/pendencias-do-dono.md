# Decisões que só o dono pode tomar

1. **Peso do vídeo do hero.** O loop tem 80 segundos. A versão de computador (`hero-fullhd.mp4`) tem 34,6 MB (cerca de 3,5 Mbps) e a de celular (`hero-hd.mp4`), 11 MB (cerca de 1,1 Mbps). Ele é baixado aos poucos enquanto toca, então quem fica na página consome muito dado.
   - Opção A: encurtar o loop para 20 a 30 segundos e gerar de novo a versão de computador a cerca de 2 Mbps (estimativa: 5 a 8 MB).
   - Opção B: manter como está.
   - Recomendação: A. É o maior peso do site.

2. **Capa do vídeo no celular.** A capa (`hero-poster.webp`, 1920 por 1080 px, 151 KB) é a mesma no computador e no celular.
   - Opção A: criar uma versão de cerca de 960 px (estimativa: 40 a 60 KB) e trocar a capa pela largura da tela.
   - Opção B: manter uma capa só.
   - Recomendação: A.

3. **Adobe Fonts (Nexa).** O kit só tem Nexa nos pesos 400 e 700. O CSS pede 300 na frase de Intenção (aparece 400) e 650 nos títulos (aparece 700). O kit também traz a família "nexa-text" e itálicos sem uso. A Adobe usa por padrão um modo de exibição que esconde o texto até a fonte carregar.
   - Opção A: no painel da Adobe, ativar `font-display: swap`, tirar "nexa-text" e os itálicos, e incluir Nexa Light se a frase de Intenção deve ser mais fina.
   - Opção B: só ativar `font-display: swap` e trocar no CSS o 300 por 400 (fica igual ao que aparece hoje).
   - Recomendação: A, se a intenção era ter a frase mais fina; senão, B.

4. **Margens e frase do hero no celular: decidido.** Até 480 px, a margem lateral caiu de 44 para 24 px e a frase do hero ficou um pouco menor (33 px em 375 px), para caber em duas linhas. Aprovado pelo dono em 15/10/2026; fica como está.

5. **Carrossel do Sobre sem botão de pausa.** Ele troca sozinho a cada 5 segundos. Para no cursor e no foco, e não se move com "reduzir movimento". A regra de acessibilidade WCAG 2.2.2 pede um jeito de pausar movimento automático com mais de 5 segundos.
   - Opção A: manter (decisão atual).
   - Opção B: deixar a troca só pelas setas e pontos, sem troca automática.
   - Recomendação: A está aceitável pelo pouco movimento; B é a opção mais acessível.

6. **Texto da etapa "Entendo o seu negócio".** O texto atual mistura duas ideias no fim ("depois de assistir ao vídeo e como funciona a sua empresa").
   - Opção A: "Quero saber o que você vende, para quem, como funciona a sua empresa e o que as pessoas precisam entender depois de assistir ao vídeo."
   - Opção B: manter como está.
   - Recomendação: A.

7. **Política de privacidade.** Ainda é um rascunho: falta o e-mail de contato (dois lugares), a data, a revisão jurídica e um link no rodapé. Hoje nenhuma página leva até ela.
   - Opção A: preencher com o e-mail do rodapé, revisar com um profissional e colocar o link "Privacidade" no rodapé antes de publicar.
   - Opção B: não publicar a página por enquanto.
   - Recomendação: A.

9. **Logo de cliente sem uso (`assets/clientes/dufe-coffee.svg`).** A lista `clientes` de `data/site.js` foi removida na limpeza de código (ela não era lida por nenhum script). O arquivo continua guardado, porque é logo de cliente.
   - Opção A: apagar o arquivo (confirme que o cliente não precisa mais dele).
   - Opção B: manter guardado.
   - Recomendação: B, até o cliente confirmar.

8. **Arquivo `assets/logo/circular.svg`.** Era o favicon antigo e não é usado em nenhum arquivo do site.
   - Opção A: apagar.
   - Opção B: guardar em `assets/_originais/`, que fica fora do ar.
   - Recomendação: B. É um arquivo da marca e pode servir depois.
