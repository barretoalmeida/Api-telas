let carta, arlequina, tada, fundo;

let clicou = false;
let tamanhoArlequina = 0;
let tamanhoCarta = 0;
let tamanhoIdeal = 0; 

let confetes = [];

function preload() {
  carta = loadImage('img/carta.png');
  arlequina = loadImage('img/arlequina.png');
  tada = loadSound('musi/tada.mp3');
  fundo = loadImage('img/fundo.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  

  imageMode(CORNER);
  image(fundo, 0, 0, width, height);

  // Muda para CENTER apenas para desenhar os elementos do meio e os confetes
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
}

function mouseClicked() {
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
        velocidade: random(3, 10),  
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {

  if (clicou && tamanhoArlequina >= tamanhoIdeal) {
    window.location.href = "index.html";
  }

}