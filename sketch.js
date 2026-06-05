let tamanho;
let velocidade;

let imagens = [];
let atual = 0;

function preload() {
  imagens[0] = loadImage("img/logoV.png");
  imagens[1] = loadImage("img/loogoVe.png");
  imagens[2] = loadImage("img/vilaoLo.png");
  intro = loadSound('musi/intro.mp3')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  soundFormats('mp3');
  intro.play();
  

  tamanho = 10;
  velocidade = 5;

  imageMode(CENTER);
}



function draw() {
  background(0, 20);

  // imagem centralizada
  image(
    imagens[atual],width / 2,height / 2,tamanho,tamanho);

  tamanho += velocidade;

  // quando fica grande
//   if (tamanho >= width) {
//     velocidade = -velocidade;
//   }


    if (tamanho >= min(width, height)) {
      velocidade = -velocidade;
    }
  // quando fica pequena
  if (tamanho <= 10) {
    velocidade = -velocidade;

    atual++;

    if (atual >= imagens.length) {
      atual = 0;
    }
  }
}

function mousePressed() {

  let esquerda = width / 2 - tamanho / 2;
  let direita = width / 2 + tamanho / 2;
  let topo = height / 2 - tamanho / 2;
  let baixo = height / 2 + tamanho / 2;

  if (
    mouseX >= esquerda &&
    mouseX <= direita &&
    mouseY >= topo &&
    mouseY <= baixo
  ) {

    if (atual == 0) {
      window.location.href = "tela1M.html";
    }

    else if (atual == 1) {
      window.location.href = "index.html";
    }

    else if (atual == 2) {
      window.location.href = "tela1F.html";
    }

  }
}

