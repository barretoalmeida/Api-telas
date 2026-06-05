let imgEstrada;    
let imgCaminhao;   
let imgCoringa;    
let risadaCoringa;  

// Posição do jipe
let camX;
let camY;

// Tamanho do jipe pequeno na ponte
let larguraCam = 15;  
let alturaCam = 15; 
let larguraCoringa = 5;
let alturaCoringa = 6;

//  aceleração
let aceleracao = 0.05; 

// Balanço dos balões
let anguloBalao = 0;

// Os "HA HA HA"
let hahas = [];
let totalHahas = 15;

// Gás do Riso bolinha verde
let gasX = [], gasY = [], gasCor = [];

// Dinheiro
let granaX = [];
let granaY = [];
let granaVelocidade = [];
let totalGrana = 30; 

function preload() {
  imgEstrada = loadImage('img/estrada.jpg'); 
  imgCaminhao = loadImage('img/caminhao_swap.png'); 
  imgCoringa = loadImage('img/coringa_porta.png');  
  risadaCoringa = loadSound('musi/risada.mp3'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  camX = width / 2;
  camY = height * 0.50; 

  // Inicia o Gás do Riso
  for (let i = 0; i < 60; i++) {
    gasX[i] = random(width); 
    gasY[i] = random(height);
    gasCor[i] = random([color(50, 255, 50, 60), color(150, 0, 200, 60)]);
  }

  // Inicia a Chuva do Dinheiro
  for (let i = 0; i < totalGrana; i++) {
    granaX[i] = random(0, width);
    granaY[i] = random(-height, 0); 
    granaVelocidade[i] = random(2, 5); 
  }

  // Inicia os HAHAHAs
  for (let i = 0; i < totalHahas; i++) {
    hahas[i] = {
      x: random(width),
      y: random(height),
      tamanho: random(20, 50),
      opacidade: random(50, 255)
    };
  }
}

function draw() {
  background(20);
  imageMode(CENTER);

  // Imagem da ponte 
  if (imgEstrada) {
    image(imgEstrada, width / 2, height / 2, width, height);
  }

  // Risada continua 
  if (risadaCoringa && !risadaCoringa.isPlaying() && larguraCam >= 15 && larguraCam <= 25) {
    risadaCoringa.loop(); 
  }

  
  // Jipe mais lento
  camY = camY + aceleracao;             
  
  // O tamanho do crescimento
  larguraCam = larguraCam + 3.5;   
  alturaCam = alturaCam + 3.5;        

  // tamanho do Coringa no jipe
  larguraCoringa = larguraCoringa + 0.58; 
  alturaCoringa = alturaCoringa + 0.63;  

  // A velocidade aumenta 
  aceleracao = aceleracao + 0.02;
  // ==============================================

  // Reseta só depois que sair completamente da tela por baixo
  if (camY > height + (alturaCam / 2)) {
    if (risadaCoringa) {
      risadaCoringa.stop(); 
      risadaCoringa.loop(); 
    }

    camY = height * 0.50; 
    larguraCam = 15;
    alturaCam = 15;
    larguraCoringa = 5;
    alturaCoringa = 6;
    aceleracao = 0.05; 
  }

  // Imagens
  
  // Coringa atrás do volante
  if (imgCoringa) {
    let coringaX = camX + (larguraCam * 0.12); 
    let coringaY = camY - (alturaCam * 0.30); 
    image(imgCoringa, coringaX, coringaY, larguraCoringa, alturaCoringa);
  }

  // Jipe
  if (imgCaminhao) {
    image(imgCaminhao, camX, camY, larguraCam, alturaCam);
  }

  // Balão
  desenharCachoDeBaloes();

  // Os Efeitos especiais
  desenharDinheiro();
  desenharHahas();
  desenharGasDoRiso();
}

function mousePressed() {
  userStartAudio();
  if (risadaCoringa && !risadaCoringa.isPlaying()) {
    risadaCoringa.loop();
  }
}

function desenharCachoDeBaloes() {
  anguloBalao += 0.03;

  // Limpa a lista de balões a cada frame
  baloes = [];

  let desviosX = [0, -larguraCam * 0.15, larguraCam * 0.15, -larguraCam * 0.08, larguraCam * 0.08];
  let desviosY = [0, -alturaCam * 0.10, -alturaCam * 0.15, -alturaCam * 0.25, -alturaCam * 0.30];

  let cores = [
    color(130, 0, 180),
    color(50, 200, 50),
    color(100, 0, 150),
    color(30, 150, 30),
    color(150, 0, 200)
  ];

  let diametroBalao = larguraCam * 0.40;

  stroke(180);
  strokeWeight(max(1, larguraCam * 0.008));
  noFill();

  // Balões da esquerda
  let amarraEsqX = camX - (larguraCam * 0.35);
  let amarraEsqY = camY + (alturaCam * 0.10);
  let balancoEsqX = sin(anguloBalao) * (larguraCam * 0.12);

  for (let i = 0; i < 5; i++) {
    let bX = amarraEsqX + balancoEsqX + desviosX[i];
    let bY = amarraEsqY - (alturaCam * 0.75) + desviosY[i];

    line(amarraEsqX, amarraEsqY, bX, bY);
  }

  // Balões da direita
  let amarraDirX = camX + (larguraCam * 0.35);
  let amarraDirY = camY + (alturaCam * 0.10);
  let balancoDirX = sin(anguloBalao + PI) * (larguraCam * 0.12);

  for (let i = 0; i < 5; i++) {
    let bX = amarraDirX + balancoDirX + desviosX[i];
    let bY = amarraDirY - (alturaCam * 0.75) + desviosY[i];

    line(amarraDirX, amarraDirY, bX, bY);
  }

  noStroke();

  // Desenha os balões da esquerda
  for (let i = 0; i < 5; i++) {
    let bX = amarraEsqX + balancoEsqX + desviosX[i];
    let bY = amarraEsqY - (alturaCam * 0.75) + desviosY[i];

    // Salva posição para detectar clique
    baloes.push({
      x: bX,
      y: bY,
      raio: diametroBalao / 2
    });

    fill(cores[i]);
    ellipse(bX, bY, diametroBalao, diametroBalao);

    fill(255, 255, 255, 100);
    ellipse(
      bX - diametroBalao * 0.2,
      bY - diametroBalao * 0.2,
      diametroBalao * 0.2,
      diametroBalao * 0.2
    );
  }

  // Desenha os balões da direita
  for (let i = 0; i < 5; i++) {
    let bX = amarraDirX + balancoDirX + desviosX[i];
    let bY = amarraDirY - (alturaCam * 0.75) + desviosY[i];

    // Salva posição para detectar clique
    baloes.push({
      x: bX,
      y: bY,
      raio: diametroBalao / 2
    });

    fill(cores[i]);
    ellipse(bX, bY, diametroBalao, diametroBalao);

    fill(255, 255, 255, 100);
    ellipse(
      bX - diametroBalao * 0.2,
      bY - diametroBalao * 0.2,
      diametroBalao * 0.2,
      diametroBalao * 0.2
    );
  }
}

function desenharDinheiro() {
  strokeWeight(1);
  
  let corBolinha = color(100, 200, 150); 
  let corBolinhaAr = color(150, 255, 180, 180); 
  
  for (let i = 0; i < totalGrana; i++) {
    fill(46, 139, 87);
    stroke(20, 80, 40);
    
    rect(granaX[i] - 12.5, granaY[i] - 6, 25, 12); 
    
    fill(corBolinha);
    noStroke();
    ellipse(granaX[i], granaY[i], 6, 6); 
    
    fill(corBolinhaAr);
    ellipse(granaX[i] + 6, granaY[i] - 12, 4, 4); 
    
    granaY[i] = granaY[i] + granaVelocidade[i];
    
    if (granaY[i] > height) {
      granaY[i] = random(-50, -10);
      granaX[i] = random(0, width);
    }
  }
}

function drawNeonText(txt, x, y, tamanho, opacidade) {
  textSize(tamanho);
  fill(255, 0, 50, opacidade);
  text(txt, x, y);
}

function desenharHahas() {
  textAlign(CENTER);
  for (let i = 0; i < totalHahas; i++) {
    drawNeonText("HA HA HA", hahas[i].x, hahas[i].y, hahas[i].tamanho, hahas[i].opacidade);
    hahas[i].opacidade -= 5;
    if (hahas[i].opacidade < 0) {
      hahas[i].x = random(width);
      hahas[i].y = random(height);
      hahas[i].opacidade = 255;
    }
  }
}

function desenharGasDoRiso() {
  noStroke();
  for (let i = 0; i < 60; i++) {
    fill(gasCor[i]);
    ellipse(gasX[i], gasY[i], 25);
    gasY[i] += 1;
    if (gasY[i] > height) gasY[i] = -20;
  }
}

function mousePressed() {

  userStartAudio();

  if (risadaCoringa && !risadaCoringa.isPlaying()) {
    risadaCoringa.loop();
  }

  for (let balao of baloes) {

    if (dist(mouseX, mouseY, balao.x, balao.y) < balao.raio) {

      console.log("Cliquei no balão!");

      window.location.href = "index.html";

      return;
    }
  }
}