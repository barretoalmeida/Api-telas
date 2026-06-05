let angulo = 0;
let contador = 0;
let img;

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
  
  line(xInicial,yInicial,xFinal,yFinal);
  
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


}

function mousePressed() {
  window.location.href = "index.html";
}