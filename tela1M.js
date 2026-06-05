let charadaImg, interrogacaoImg, musica;
let angulo = 0;

// Estado do jogo: 'charada' ou 'fim'
let estadoAtual = 'charada'; 

// Controle das 5 charadas
let indiceAtual = 0;
let mostrandoResposta = false;

// Banco de dados de charadas e respostas
const listaCharadas = [
  { pergunta: "O que é que quanto mais se tira, maior fica?", resposta: "O buraco!" },
  { pergunta: "Tenho cidades, mas não casas. Tenho montanhas, mas não árvores. O que sou?", resposta: "Um mapa!" },
  { pergunta: "O que pode correr, mas nunca anda? Tem leito, mas nunca dorme?", resposta: "O rio!" },
  { pergunta: "O que é que nasce grande e morre pequeno?", resposta: "O lápis!" },
  { pergunta: "Sou cheio de furos, mas ainda retenho água. O que sou?", resposta: "Uma esponja!" }
];

function preload() {
  charadaImg = loadImage('img/charada.png');
  interrogacaoImg = loadImage('img/interrogacao.png');
  musica = loadSound('musi/musica.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  soundFormats('mp3');
  musica.play();
}

function draw() {
  background(157, 0, 255, 30);

  if (estadoAtual === 'charada') {
    desenharTelaCharadas();
  } else if (estadoAtual === 'fim') {
    desenharTelaFim();
  }
}

// --- TELA DE CHARADAS ---
function desenharTelaCharadas() {
  // Movimento da interrogação no centro
  let x = 100 * cos(angulo / 2) + width / 2;
  let y = 100 * sin(angulo / 3) + height / 2;
  image(interrogacaoImg, x, y, width * 0.2, height * 0.4);
  
  // Desenha o Charada proporcional no centro
  let proporcao = charadaImg.height / charadaImg.width;
  let larguraCharada = width * 0.25; // 
  let alturaCharada = larguraCharada * proporcao;
  image(charadaImg, width / 2, height / 2, larguraCharada, alturaCharada);
  
  angulo += -0.05;

  // Medidas das caixas de texto laterais
  let larguraCaixa = width * 0.3;
  let alturaCaixa = height * 0.5;
  
  rectMode(CENTER);

  // --- LADO ESQUERDO: PERGUNTA ---
  let centroX_Esquerdo = width * 0.18;
  
  // Fundo branco com cantos arredondados
  fill(255, 255, 255, 50);
  noStroke();
  rect(centroX_Esquerdo, height / 2, larguraCaixa, alturaCaixa, 15);
  
  // Textos da Pergunta (Limitados dentro do tamanho da caixa para quebrar linha automaticamente)
  fill(0);
  textSize(width * 0.018 + 8);
  text("Charada " + (indiceAtual + 1) + "/5", centroX_Esquerdo, height / 2 - alturaCaixa * 0.3);
  
  textSize(width * 0.015 + 6);
  text(listaCharadas[indiceAtual].pergunta, centroX_Esquerdo, height / 2, larguraCaixa - 20, alturaCaixa * 0.5);

  // --- LADO DIREITO: RESPOSTA ---
  let centroX_Direito = width * 0.82;
  
  // Fundo branco da resposta
  fill(255, 255, 255, 50);
  rect(centroX_Direito, height / 2, larguraCaixa, alturaCaixa, 15);

  // Exibição da resposta ou dica de clique
  if (mostrandoResposta) {
    fill(180, 0, 0); 
    textSize(width * 0.018 + 6);
    text("Resposta:", centroX_Direito, height / 2 - 30);
    
    fill(0);
    textSize(width * 0.016 + 4);
    text(listaCharadas[indiceAtual].resposta, centroX_Direito, height / 2 + 10, larguraCaixa - 20, 80);
    
    textSize(width * 0.01 + 5);
    fill(100);
    text("(Clique no Charada novamente para avançar)", centroX_Direito, height / 2 + alturaCaixa * 0.35, larguraCaixa - 20, 50);
  } else {
    textSize(width * 0.012 + 5);
    fill(50);
    text("(Clique no Charada\npara ver a resposta)", centroX_Direito, height / 2, larguraCaixa - 20, 100);
  }

  // Restaura o modo padrão para não atrapalhar outros elementos
  rectMode(CORNER);

  // Botão Voltar (topo esquerdo)
  desenharBotaoVoltar();
}

// --- TELA FINAL (PARABÉNS) ---
function desenharTelaFim() {
  rectMode(CENTER);
  fill(255, 255, 255, 240);
  noStroke();
  rect(width / 2, height * 0.4, width * 0.6, height * 0.2, 15);
  rectMode(CORNER);

  fill(0);
  textSize(width * 0.025 + 10);
  text("Parabéns! Você passou,\npode ir para o próximo vilão...", width / 2, height * 0.4);

  // Botão Canto Inferior Esquerdo
  fill(50, 150, 250);
  rect(20, height - 70, 150, 50, 10);
  fill(255);
  textSize(16);
  text("Próximo Vilão A", 95, height - 45);

  // Botão Canto Inferior Direito
  fill(250, 100, 100);
  rect(width - 170, height - 70, 150, 50, 10);
  fill(255);
  text("Próximo Vilão B", width - 95, height - 45);
  
  // Botão voltar geral
  desenharBotaoVoltar();
}

// --- COMPONENTE BOTÃO VOLTAR ---
function desenharBotaoVoltar() {
  fill(150);
  rect(20, 20, 100, 40, 5);
  fill(255);
  textSize(16);
  text("Voltar", 70, 40);
}

// --- LÓGICA DE CLIQUES ---
function mousePressed() {
  if (mouseX > 20 && mouseX < 120 && mouseY > 20 && mouseY < 60) {
    acionarBotaoVoltar();
    return; 
  }

  if (estadoAtual === 'charada') {
    let larguraCharada = width * 0.25;
    let proporcao = charadaImg.height / charadaImg.width;
    let alturaCharada = larguraCharada * proporcao;
    
    let esquerdo = width / 2 - larguraCharada / 2;
    let direito = width / 2 + larguraCharada / 2;
    let topo = height / 2 - alturaCharada / 2;
    let base = height / 2 + alturaCharada / 2;

    if (mouseX > esquerdo && mouseX < direito && mouseY > topo && mouseY < base) {
      if (!mostrandoResposta) {
        mostrandoResposta = true;
      } else {
        mostrandoResposta = false;
        if (indiceAtual < 4) {
          indiceAtual++;
        } else {
          estadoAtual = 'fim'; 
        }
      }
    }
  } 
  
  else if (estadoAtual === 'fim') {
    if (mouseX > 20 && mouseX < 170 && mouseY > height - 70 && mouseY < height - 20) {
      console.log("Clicou no Vilão A (ação será adicionada depois)");
      window.location.href = "tela2M.html";
    }
    if (mouseX > width - 170 && mouseX < width - 20 && mouseY > height - 70 && mouseY < height - 20) {
      console.log("Clicou no Vilão B (ação será adicionada depois)");
      window.location.href = "tela3M.html";
    }
  }
}

function acionarBotaoVoltar() {
  indiceAtual = 0;
  mostrandoResposta = false;
  estadoAtual = 'charada';
  window.location.href = "index.html";
  console.log("Voltando para a tela anterior... (adicione seu estadoAtual = 'menu' aqui depois)");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}