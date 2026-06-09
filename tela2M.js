let angulo = 0;
let contador = 0;
let ladoBom;
let ladoMau;

// CONFIGURAÇÃO DO BOTÃO VOLTAR
let btnVoltar = {
  x: 20,
  y: 20,
  w: 110,
  h: 40,
  texto: "← Voltar"
};

function preload() {
  ladoBom = loadImage("img/carabem.jpg");
  ladoMau = loadImage("img/caramal.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(20, 10);
  
  let xInicial = width / 2;
  let yInicial = height / 2;
  
  let raio = 500;
  
  let xFinal = xInicial + cos(angulo) * raio;
  let yFinal = yInicial + sin(angulo) * raio;
  
  stroke(random(200), 0, 0);
  strokeWeight(2);
  
  line(xInicial, yInicial, xFinal, yFinal);
  
  angulo += 0.05;
  contador++;

  // Mostra a imagem do lado bom
  if (contador % 100 < 50) {
    image(ladoBom, width / 2, height / 2, 300, 300);
  }
  // Mostra a imagem do lado mau
  else {
    image(ladoMau, width / 2, height / 2, 300, 300);
  }

  // DESENHAR O BOTÃO DE VOLTAR
  desenharBotaoVoltar();

  // DESENHAR O AVISO NA TELA
  desenharAviso();
}

function desenharBotaoVoltar() {
  push();
  rectMode(CORNER);
  
  // Efeito de hover no botão voltar
  if (mouseX >= btnVoltar.x && mouseX <= btnVoltar.x + btnVoltar.w &&
      mouseY >= btnVoltar.y && mouseY <= btnVoltar.y + btnVoltar.h) {
    fill(130, 0, 180);
    cursor(HAND);
  } else {
    fill(50, 0, 80, 200);
    cursor(ARROW);
  }
  
  stroke(50, 255, 50);
  strokeWeight(2);
  rect(btnVoltar.x, btnVoltar.y, btnVoltar.w, btnVoltar.h, 8);
  
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(btnVoltar.texto, btnVoltar.x + btnVoltar.w / 2, btnVoltar.y + btnVoltar.h / 2);
  pop();
}

function desenharAviso() {
  push();
  textAlign(CENTER, CENTER);
  textSize(18);
  
  // Sombra neon vermelha/sombria para combinar com o vilão
  fill(255, 0, 50, 200);
  text("Clique no Duas-Caras para voltar ao Menu Inicial", width / 2 + 2, height - 50 + 2);
  
  // Texto principal em branco na frente
  fill(255);
  text("Clique no Duas-Caras para voltar ao Menu Inicial", width / 2, height - 50);
  pop();
}

function mousePressed() {
  // 1. Verifica se o clique foi no botão Voltar (vai para a tela anterior)
  if (mouseX >= btnVoltar.x && mouseX <= btnVoltar.x + btnVoltar.w &&
      mouseY >= btnVoltar.y && mouseY <= btnVoltar.y + btnVoltar.h) {
    window.location.href = "tela1M.html";
    return;
  }

  // 2. Verifica se o clique foi na área da imagem do Duas-Caras (Centro da tela, tamanho 300x300)
  let centroX = width / 2;
  let centroY = height / 2;
  
  if (mouseX >= centroX - 150 && mouseX <= centroX + 150 &&
      mouseY >= centroY - 150 && mouseY <= centroY + 150) {
    window.location.href = "index.html"; // Vai para o menu inicial
  }
}