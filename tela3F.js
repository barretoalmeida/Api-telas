let carta, arlequina, tada, fundo;

let clicou = false;
let tamanhoArlequina = 0;
let tamanhoCarta = 0;
let tamanhoIdeal = 0; 

let confetes = [];

// CONFIGURAÇÃO DO BOTÃO VOLTAR
let btnVoltar = {
  x: 20,
  y: 20,
  w: 110,
  h: 40,
  texto: "← Voltar"
};

function preload() {
  carta = loadImage('img/carta.png');
  arlequina = loadImage('img/arlequina.png');
  fundo = loadImage('img/fundo.png');
  
  // soundFormats adicionado para evitar travamento em "Loading..."
  soundFormats('mp3');
  tada = loadSound('musi/tada.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  
  imageMode(CORNER);
  image(fundo, 0, 0, width, height);

  // Muda para CENTER apenas para desenhar os elements do meio e os confetes
  imageMode(CENTER);

  let centroX = width / 2;
  let centroY = height / 2;

  let tamanhoBase = min(width, height) * 0.6;
  tamanhoCarta = tamanhoBase;
  tamanhoIdeal = tamanhoBase; 

  // Se clicou, atualiza e desenha os confetes saindo do centro
  if (clicou) {
    desenharConfetes();
  }

  // Controle das imagens
  if (!clicou) {
    image(carta, centroX, centroY, tamanhoCarta, tamanhoCarta);
  } else {
    image(arlequina, centroX, centroY, tamanhoArlequina, tamanhoArlequina);
    
    if (tamanhoArlequina < tamanhoIdeal) {
      tamanhoArlequina += tamanhoIdeal * 0.04; 
    } else {
      tamanhoArlequina = tamanhoIdeal; 
    }
  }

  // SE OS CONFETES JÁ SAÍRAM E A ARLEQUINA CRESCEU, MOSTRA O AVISO
  if (clicou && tamanhoArlequina >= tamanhoIdeal) {
    desenharAvisoArlequina();
  }

  // DESENHAR O BOTÃO DE VOLTAR
  desenharBotaoVoltar();
}

function mouseClicked() {
  // Ignora o clique da carta se o usuário clicou em cima do botão de voltar
  if (mouseX >= btnVoltar.x && mouseX <= btnVoltar.x + btnVoltar.w &&
      mouseY >= btnVoltar.y && mouseY <= btnVoltar.y + btnVoltar.h) {
    return;
  }

  let centroX = width / 2;
  let centroY = height / 2;
  let raioCarta = tamanhoCarta / 2;

  if (!clicou && dist(mouseX, mouseY, centroX, centroY) < raioCarta) {
    clicou = true;
    tada.play(); 
    
    // Cria 150 confetes
    for (let i = 0; i < 150; i++) {
      confetes.push({
        x: centroX,                 
        y: centroY,                 
        angulo: random(TWO_PI),     
        velocidade: random(5, 12),  
        tamanhoLinha: random(15, 35), 
        cor: color(random(255), random(255), random(255)) 
      });
    }
  }
}

function desenharConfetes() {
  for (let i = 0; i < confetes.length; i++) {
    let c = confetes[i];
    
    let proximoX = c.x + cos(c.angulo) * c.velocidade;
    let proximoY = c.y + sin(c.angulo) * c.velocidade;
    
    stroke(c.cor);
    strokeWeight(5); 
    
    let caudaX = c.x - cos(c.angulo) * c.tamanhoLinha;
    let caudaY = c.y - sin(c.angulo) * c.tamanhoLinha;
    
    line(c.x, c.y, caudaX, caudaY);
    
    c.x = proximoX;
    c.y = proximoY;
  }
  noStroke(); 
}

// FUNÇÃO PARA DESENHAR O BOTÃO VOLTAR
function desenharBotaoVoltar() {
  push();
  rectMode(CORNER);
  
  // Detecta se o mouse está em cima do botão (Efeito Hover)
  if (mouseX >= btnVoltar.x && mouseX <= btnVoltar.x + btnVoltar.w &&
      mouseY >= btnVoltar.y && mouseY <= btnVoltar.y + btnVoltar.h) {
    fill(200, 20, 50); // Vermelho vivo ao passar o mouse
    cursor(HAND);
  } else {
    fill(40, 10, 15, 220); // Vermelho escuro/Preto padrão de fundo
    cursor(ARROW);
  }
  
  stroke(255, 0, 50); // Borda neon vermelha Arlequina
  strokeWeight(2);
  rect(btnVoltar.x, btnVoltar.y, btnVoltar.w, btnVoltar.h, 8);
  
  // Texto do botão
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(btnVoltar.texto, btnVoltar.x + btnVoltar.w / 2, btnVoltar.y + btnVoltar.h / 2);
  pop();
}

// FUNÇÃO PARA DESENHAR O AVISO PISCANTE
function desenharAvisoArlequina() {
  push();
  textAlign(CENTER, CENTER);
  textSize(22);
  
  // Faz o texto piscar usando o frameCount
  let opacidade = map(sin(frameCount * 0.1), -1, 1, 100, 255);
  
  // Sombra de contorno (Rosa Choque da Arlequina)
  fill(255, 0, 128, opacidade);
  text("Clique na Arlequina para voltar ao Menu Inicial", width / 2 + 2, height - 60 + 2);
  
  // Texto principal na frente (Branco)
  fill(255, 255, 255, opacidade);
  text("Clique na Arlequina para voltar ao Menu Inicial", width / 2, height - 60);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  // 1. VERIFICA SE CLICOU NO BOTÃO VOLTAR (Vai para tela1F)
  if (mouseX >= btnVoltar.x && mouseX <= btnVoltar.x + btnVoltar.w &&
      mouseY >= btnVoltar.y && mouseY <= btnVoltar.y + btnVoltar.h) {
    window.location.href = "tela1F.html";
    return; // Encerra o clique para não ativar a Arlequina por trás
  }

  // 2. SÓ RETORNA AO MENU INICIAL SE A ANIMAÇÃO TERMINAR E CLICAR NA ARLEQUINA
  if (clicou && tamanhoArlequina >= tamanhoIdeal) {
    let centroX = width / 2;
    let centroY = height / 2;
    let raioArlequina = tamanhoIdeal / 2;
    
    if (dist(mouseX, mouseY, centroX, centroY) < raioArlequina) {
      window.location.href = "index.html";
    }
  }
}