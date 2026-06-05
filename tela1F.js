let imgRua;
let imgTelhado;
let imgEmPe;
let imgAgachada;
let musicaFundo;


let cenarioAtual = 0; 


let mulherGatoX = 30;
let mulherGatoY; 

let chuvaX = [];
let chuvaY = [];
let chuvaVelocidade = [];

//  IMAGENS
function preload() {
  imgRua = loadImage('img/rua.jpg'); 
  imgTelhado = loadImage('img/telhado.jpg');
  imgEmPe = loadImage('img/mulherGatoEmPe.png');       
  imgAgachada = loadImage('img/mulherGatoAgachada.png'); 
  
  musicaFundo = loadSound('musi/surpri.mp3');
}


function setup() {
  createCanvas(windowWidth, windowHeight); 
  
  //  altura da Mulher-Gato 
  mulherGatoY = height * 0.7; 

  
  for (let i = 0; i < 200; i++) {
    chuvaX[i] = random(0, width);   
    chuvaY[i] = random(-height, height);  
    chuvaVelocidade[i] = random(5, 12);
  }
}


function draw() {
  background(10); 
  imageMode(CENTER);


  if (cenarioAtual === 0) {
    if (imgRua) {
      image(imgRua, width / 2, height / 2, width, height);
    }
    
   
    if (mulherGatoX < width / 2) {
      mulherGatoX += 2; 
    } else {
      
      if (musicaFundo && !musicaFundo.isPlaying()) {
        userStartAudio(); 
        musicaFundo.loop();
        musicaFundo.setVolume(0.4);
      }
    }

    // Desenho em pé 
    if (imgEmPe) {
      image(imgEmPe, mulherGatoX, mulherGatoY, 200, 250); 
    }

  } else if (cenarioAtual === 1) {
    if (imgTelhado) {
      image(imgTelhado, width / 2, height / 2, width, height);
    }
    
    // Desenho agachada 
    if (imgAgachada) {
      image(imgAgachada, mulherGatoX, mulherGatoY, 200, 180); 
    }
  }

 
  desenharChuva();
}

// CHUVA 
function desenharChuva() {
  stroke(140, 180, 230, 150); 
  strokeWeight(1.5);          
  
  for (let i = 0; i < 200; i++) {
    line(chuvaX[i], chuvaY[i], chuvaX[i], chuvaY[i] + 18);
    
    chuvaY[i] += chuvaVelocidade[i]; 
    
    if (chuvaY[i] > height) {
      chuvaY[i] = random(-50, -10);
      chuvaX[i] = random(0, width); 
    }
  }
}


function mousePressed() {

  let clicouMulherGato =
      mouseX > mulherGatoX - 100 &&
      mouseX < mulherGatoX + 100 &&
      mouseY > mulherGatoY - 125 &&
      mouseY < mulherGatoY + 125;

  // RUA
  if (cenarioAtual === 0) {

    if (clicouMulherGato) {

      cenarioAtual = 1;
      mulherGatoX = width / 3;
      mulherGatoY = height * 0.58;

    } else {

      window.location.href = "tela2F.html";

    }
    // TELHADO
  }else if (cenarioAtual === 1) {

    if (clicouMulherGato) {

      // Volta para a rua
      cenarioAtual = 0;
      mulherGatoX = 30;   
      mulherGatoY = height * 0.77;

    } else {

      window.location.href = "tela3F.html";

    }

  }
}