/* =====================================================================
   DADOS DO SITE — edite aqui, sem mexer no HTML.

   projetos  Ordem da lista = ordem na grade (2 por linha, em pares que formam os segmentos).
     nome             Nome do projeto: aparece grande na janela e no bloco da grade.
     nomeJanela       Opcional. Nome da janela com quebra de linha (use "\n").
     manchete         Tipo do serviço (ex.: "Rede social", "Cobertura de evento"), logo abaixo do nome.
     capa             Caminho da imagem da miniatura, sem extensão (ex.: "assets/capas/mvb"). Devem existir
                      mvb-800.webp e mvb-1600.webp.
     capaLarguras     [largura do arquivo -800, largura real do arquivo -1600], usadas no srcset.
     capaPosicao      Ponto de foco do recorte quadrado (ex.: "center", "50% 20%").
     capaProvisoria   true = mostra a etiqueta "capa provisória". Remova ao trocar pela capa real.
     descricaoCliente Texto da janela, embaixo do serviço. Use "\n\n" para separar parágrafos.
     galeria          Lista de fotos mostradas uma por vez, à direita dos vídeos (troca a cada 3 s).
                      Opcional.
     videos           Lista de vídeos mostrados lado a lado na janela:
                        titulo     Nome do vídeo (usado só como título acessível do player).
                        vimeoId    Só os números do link do Vimeo (vimeo.com/123456789 -> "123456789").
                        proporcao  [largura, altura] do vídeo. Opcional: usa a do projeto se faltar.
     proporcao        [largura, altura] padrão dos vídeos do projeto. [9, 16] = vertical, [16, 9] = horizontal.
     vimeoId          Projetos sem "videos": um vídeo só, aberto no player simples.
     descricao        Texto curto do player simples. Opcional.

   clientes  Logos de clientes: { nome, src }, em assets/clientes/. Sem uso na página no momento.
             Só use logos de clientes que autorizaram o uso.

   rastreio  IDs das ferramentas de medição. Vazio = desligado (sem aviso de cookies e sem nada carregado).
     googleAnalytics  ID do Google Analytics 4, no formato "G-XXXXXXXXXX" (Admin > Fluxos de dados).
     metaPixel        ID do Pixel da Meta, só números (Gerenciador de Eventos > Fontes de dados).
             As duas carregam quando o visitante entra, com um aviso de cookies que permite recusar (ver js/consentimento.js).

   O WhatsApp e as redes sociais ficam direto no index.html (procure por 5516997595027).
   ===================================================================== */

window.SITE = {
  projetos: [
    // Segmento 1: rede social
    {
      nome: "Dufe Coffee",
      manchete: "Rede social",
      capa: "assets/capas/dufe-coffee",
      capaLarguras: [800, 1125],
      capaPosicao: "center",
      capaProvisoria: false,
      vimeoId: "",
      vimeoHash: "",
      proporcao: [9, 16],
      descricao: "",
      descricaoCliente: "A Dufe Coffee é uma pequena cafeteria com muita personalidade, e a ideia dos três vídeos é simples: mostrar os novos lançamentos, o Expresso Kinder Ovo, o recheio de frango e o cappuccino zero açúcar, de um jeito leve e com storytelling, para que cada produto vire parte de uma história e não só mais um item do cardápio.",
      videos: [
        { titulo: "Expresso Kinder", vimeoId: "1236041509" },
        { titulo: "Opções de frango", vimeoId: "1236041511" },
        { titulo: "Cappuccino zero açúcar", vimeoId: "1236041510" }
      ]
    },
    {
      nome: "G.A. Motors",
      manchete: "Rede social",
      capa: "assets/capas/ga-motors",
      capaLarguras: [800, 1080],
      capaPosicao: "center",
      capaProvisoria: false,
      vimeoId: "",
      vimeoHash: "",
      proporcao: [9, 16],
      descricao: "",
      descricaoCliente: "A G.A. Motors é uma loja de carros seminovos, e a proposta dos vídeos é simples: mostrar o carro por completo, sem esconder nada. Frente, traseira, interior, rodas, pneus, faróis, bancos e multimídia em detalhe. Para que quem está buscando um carro veja exatamente o que está comprando. A gente acredita que a confiança começa aí, mostrando o produto da maneira que ele é!",
      videos: [
        { titulo: "Ford Ranger laranja", vimeoId: "1236041872" },
        { titulo: "Gol", vimeoId: "1236041873" },
        { titulo: "BYD Song Pro", vimeoId: "1236052260" }
      ]
    },
    // Segmento 2: eventos
    {
      nome: "Só se for Flash",
      manchete: "Cobertura de evento",
      capa: "assets/capas/so-se-for-flash",
      capaLarguras: [800, 1333],
      capaPosicao: "center",
      capaProvisoria: false,
      vimeoId: "",
      vimeoHash: "",
      proporcao: [9, 16],
      descricao: "",
      descricaoCliente: "A Só se for Flash é uma festa de flashback mensal em Ribeirão Preto. A proposta dos vídeos é simples: trabalhar com o que a festa tem de mais forte, que é a nostalgia. Quem vai sempre sai feliz por relembrar o passado e curtir o som dos anos 70, 80, 90 e 2000. A festa fala por si só, e o vídeo só precisa mostrar isso.",
      videos: [
        { titulo: "Só se for Flash", vimeoId: "1236057870" }
      ]
    },
    {
      nome: "MVB",
      manchete: "Cobertura de evento",
      capa: "assets/capas/mvb",
      capaLarguras: [800, 1125],
      capaPosicao: "center",
      capaProvisoria: false,
      vimeoId: "",
      vimeoHash: "",
      proporcao: [9, 16],
      descricao: "",
      descricaoCliente: "A MVB é uma empresa de cursos de máquinas pesadas, e a proposta da cobertura é simples: mostrar que tem muitas pessoas buscando uma mudança de vida, e também alguns detalhes sobre a vida e o salário de quem trabalha na área. A mensagem é direta: se a MVB chegar na sua cidade, não perca a oportunidade.",
      videos: [
        { titulo: "MVB Ribeirão Preto - 4k", vimeoId: "1236042182" }
      ]
    },
    // Segmento 3: o que sobrou
    {
      nome: "Glaucia Afonso",
      nomeJanela: "Glaucia\nAfonso",
      manchete: "Vídeo imobiliário",
      capa: "assets/capas/glaucia-afonso",
      capaLarguras: [800, 1600],
      capaPosicao: "center",
      capaProvisoria: false,
      vimeoId: "",
      vimeoHash: "",
      proporcao: [9, 16],
      descricao: "",
      descricaoCliente: "Quando a gente vai mostrar uma casa, o ponto mais importante é deixar claro o layout e como os espaços se organizam. Nessa casa no Alphaville, o objetivo do vídeo foi percorrer cada cômodo e cada canto, da sala aos quartos, passando pela piscina e pela cozinha, para que quem assiste entenda a casa por dentro antes mesmo de visitá-la.\n\nA intenção é dar ao cliente uma visão completa e sem pressa, ao mostrar a distribuição dos ambientes, a relação entre sala, cozinha e área externa e o caminho até cada quarto.",
      videos: [
        { titulo: "Casa Neoclássica - Glaucia", vimeoId: "1236041446" }
      ]
    },
    {
      nome: "Caminhada pela Paz",
      manchete: "Evento beneficente",
      capa: "assets/capas/caminho-da-paz",
      capaLarguras: [800, 1600],
      capaPosicao: "center",
      capaProvisoria: false,
      vimeoId: "",
      vimeoHash: "",
      proporcao: [16, 9],
      descricao: "",
      descricaoCliente: "A Caminhada pela Paz foi um evento beneficente com um objetivo claro: promover prosperidade e mostrar que ainda temos esperança para o mundo. A proposta do vídeo não foi fazer cortes rápidos e barulhentos, e sim construir uma peça que comunique tranquilidade. Cada corte tem tempo para respirar, deixando o público sentir o clima do evento antes de seguir adiante.",
      videos: [
        { titulo: "Caminhada pela Paz - horizontal", vimeoId: "1236042220" }
      ]
    }
  ],

  clientes: [
    { nome: "Dufe Coffee", src: "assets/clientes/dufe-coffee.svg" }
  ],

  rastreio: {
    googleAnalytics: "G-XSW18GKNHJ",
    metaPixel: "1372920927982119"
  }
};
