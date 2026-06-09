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

// CONFIGURAÇÃO DO BOTÃO VOLTAR
let btnVoltar = {
  x: 20,
  y: 20,
  w: 110,
  h: 40,
  texto: "← Voltar"
};

// IMAGENS E SOM
function preload() {
  imgRua = loadImage('img/rua.jpg'); 
  imgTelhado = loadImage('img/telhado.jpg');
  imgEmPe = loadImage('img/mulherGatoEmPe.png');       
  imgAgachada = loadImage('img/mulherGatoAgachada.png'); 
  
  // soundFormats adicionado para evitar travamento em "Loading..."
  soundFormats('mp3');
  musicaFundo = loadSound('musi/surpri.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight); 
  
  // altura da Mulher-Gato 
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

  // CHUVA 
  desenharChuva();

  // MENSAGENS DE INSTRUÇÃO (Aparece em ambos os cenários)
  desenharInstrucoes();

  // DESENHAR O BOTÃO DE VOLTAR PARA O MENU
  desenharBotaoVoltar();
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

// FUNÇÃO PARA EXIBIR OS TEXTOS DE INSTRUÇÃO
function desenharInstrucoes() {
  push();
  textAlign(CENTER, CENTER);
  
  // Texto 1: Clique na Mulher-Gato
  textSize(20);
  fill(0, 150, 255, 180);
  text("Clique na Mulher-Gato para alternar de lugar", width / 2 + 2, height - 70 + 2);
  fill(255);
  text("Clique na Mulher-Gato para alternar de lugar", width / 2, height - 70);

  // Texto 2: Ou clique no cenário
  textSize(16);
  fill(0, 150, 255, 140);
  text("ou clique no cenário para avançar na história", width / 2 + 1, height - 40 + 1);
  fill(200); 
  text("ou clique no cenário para avançar na história", width / 2, height - 40);
  
  pop();
}

// FUNÇÃO PARA DESENHAR O BOTÃO VOLTAR
function desenharBotaoVoltar() {
  push();
  rectMode(CORNER);
  
  // Detecta hover para mudar o visual e o ponteiro do mouse
  if (mouseX >= btnVoltar.x && mouseX <= btnVoltar.x + btnVoltar.w &&
      mouseY >= btnVoltar.y && mouseY <= btnVoltar.y + btnVoltar.h) {
    fill(0, 90, 180, 220); // Azul mais claro brilhante ao passar o mouse
    cursor(HAND);
  } else {
    fill(10, 30, 60, 200); // Azul escuro semi-transparente da noite
    cursor(ARROW);
  }
  
  stroke(0, 150, 255); // Borda azul ciano brilhante (estilo tecnologia do Batman)
  strokeWeight(2);
  rect(btnVoltar.x, btnVoltar.y, btnVoltar.w, btnVoltar.h, 8);
  
  // Texto dentro do botão
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(btnVoltar.texto, btnVoltar.x + btnVoltar.w / 2, btnVoltar.y + btnVoltar.h / 2);
  pop();
}

function mousePressed() {
  // 1. VERIFICA SE CLICOU NO BOTÃO VOLTAR (Retorna para a Home)
  if (mouseX >= btnVoltar.x && mouseX <= btnVoltar.x + btnVoltar.w &&
      mouseY >= btnVoltar.y && mouseY <= btnVoltar.y + btnVoltar.h) {
    window.location.href = "index.html";
    return; // Interrompe para não acionar o clique do cenário ao mesmo tempo
  }

  let clicouMulherGato =
      mouseX > mulherGatoX - 100 &&
      mouseX < mulherGatoX + 100 &&
      mouseY > mulherGatoY - 125 &&
      mouseY < mulherGatoY + 125;

  // LÓGICA DA RUA (CENÁRIO 0)
  if (cenarioAtual === 0) {
    if (clicouMulherGato) {
      cenarioAtual = 1;
      mulherGatoX = width / 3;
      mulherGatoY = height * 0.58;
    } else {
      window.location.href = "tela2F.html";
    }
    
  // LÓGICA DO TELHADO (CENÁRIO 1)
  } else if (cenarioAtual === 1) {
    if (clicouMulherGato) {
      cenarioAtual = 0;
      mulherGatoX = 30;   
      mulherGatoY = height * 0.77;
    } else {
      window.location.href = "tela3F.html";
    }
  }
}
