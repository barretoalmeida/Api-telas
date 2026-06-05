let hera, floresta, folha, forest;
let folhaCaindo = [];
let slider;

// Variáveis da Hera
let xHera, yPosicao, larguraHera, alturaHera;

function preload() {
  floresta = loadImage('img/floresta.png');
  hera = loadImage('img/hera.png');
  folha = loadImage('img/folha.png');
  forest = loadSound('musi/forest.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  folha.resize(30, 30);

  soundFormats('mp3');
  forest.play();

  slider = createSlider(0, 140, 40);
  slider.position(20, height - 30);
  slider.style('width', '120px');

  for (let i = 0; i < 20; i++) {
    folhaCaindo[i] = [];
    folhaCaindo[i][0] = random(width);
    folhaCaindo[i][1] = random(height * 0.3);
    folhaCaindo[i][2] = random(0.5, 2);
  }
}

function draw() {
  background(10, 30, 20);

  // Folhas caindo
  tint(30, 70, 40);

  for (let i = 0; i < 20; i++) {
    folhaCaindo[i][1] += folhaCaindo[i][2];

    image(folha, folhaCaindo[i][0], folhaCaindo[i][1]);

    if (folhaCaindo[i][1] > height) {
      folhaCaindo[i][1] = -150;
      folhaCaindo[i][0] = random(width);
    }
  }

  // Floresta
  tint(50, 100, 70);
  image(floresta, 0, 0, width, height);

  // Hera
  noTint();

  let proporcao = hera.height / hera.width;

  larguraHera = min(width * 0.35, 300);
  alturaHera = larguraHera * proporcao;

  xHera = (width - larguraHera) / 2;
  yPosicao = height - alturaHera + 40;

  image(hera, xHera, yPosicao, larguraHera, alturaHera);

  // Linha verde
  stroke(100, 255, 100);
  strokeWeight(2);

  for (let distancia = 0; distancia < width; distancia += 2) {

    let pontoX = xHera + distancia;

    let efeitoOnda = slider.value() * sin(distancia / 20);

    let pontoY =
      yPosicao -
      (distancia * 0.5) +
      efeitoOnda;

    point(pontoX, pontoY);
  }
}

function mousePressed() {

  let clicouHera =
    mouseX >= xHera &&
    mouseX <= xHera + larguraHera &&
    mouseY >= yPosicao &&
    mouseY <= yPosicao + alturaHera;

  if (clicouHera) {
    window.location.href = "index.html";
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  slider.position(20, height - 30);
}