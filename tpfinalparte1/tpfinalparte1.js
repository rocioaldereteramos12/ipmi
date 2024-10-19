gdfhdjh

let imagenes = [];
let estado = 0;
let guion = [];
let caminoImagen10 = -1;
let fuente;
let ambiente;
let cantLineas = 5;  
let audioIniciado = false;  

function preload() {
  for (let i = 0; i < 23; i++) {
    imagenes[i] = loadImage("data/imagen" + i + ".jpeg");
  }
  soundFormats('mp3');
  ambiente = loadSound('data/sound.mp3');
  guion = loadStrings("data/guion.txt");
  fuente = loadFont("data/fuente.otf");
}

function setup() {
  createCanvas(640, 480);
  textFont(fuente);
}

function draw() {
  background(200);
  stroke(255);
  
  image(imagenes[estado], 0, 0, width, height);
  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < cantLineas; i++) {
    let linea = guion[estado * cantLineas + i];
    text(linea, width / 2, height / 2 - 100 + i * 30);
  }
  if (estado == 0) {
    dibujarBoton(240, 300, 150, 40, "Siguiente", true);
    dibujarBoton(240, 360, 150, 40, "Créditos", true);
  } else if (estado == 4 || estado == 11 || estado == 19) {
    dibujarBoton(240, 300, 150, 40, "Volver a inicio", true);
  } else if (estado !== 18 && estado !== 3 && estado !== 6 && estado !== 10 && estado !== 22) {
    dibujarBoton(240, 300, 150, 40, "Siguiente", true);
    dibujarBoton(240, 360, 150, 40, "Anterior", true);
  }

  if (estado == 3 || estado == 6 || estado == 10 || estado == 18) {
    dibujarBoton(150, 300, 100, 40, "Sí", true);
    dibujarBoton(390, 300, 100, 40, "No", true);
  }

  if (estado == 7 || estado == 21) {
    dibujarBoton(240, 300, 150, 40, "Siguiente", true);
  }

  if (estado == 14) {
    dibujarBoton(240, 300, 150, 40, "Siguiente", true); 
  }

  if (estado == 22) {
    dibujarBoton(240, 300, 150, 40, "Inicio", true);
  }

  push();
  textSize(40);
  textAlign(CENTER);
  text("The Last of Us", width / 2, 80);
  pop();
}

function dibujarBoton(x, y, w, h, texto, mostrar) {
  if (mostrar) {
    fill(255);
    textSize(20);
    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
      fill(0, 0, 0, 170);
    } else {
      noFill();
    }
    rect(x, y, w, h);
    fill(255);
    textAlign(CENTER);
    text(texto, x + w / 2, y + h / 2);
  }
}

function avanzar(estadoSiguiente) {
  if (estadoSiguiente < imagenes.length) {
    estado = estadoSiguiente;
  }
}

function retroceder(estadoAnterior) {
  if (estadoAnterior >= 0) {
    estado = estadoAnterior;
  }
}

function botonPresionado(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function mousePressed() {
  if (!audioIniciado) {
    ambiente.loop();  
    audioIniciado = true;  
  }
  
  if (estado == 0) {
    if (botonPresionado(240, 300, 150, 40)) avanzar(1);
    if (botonPresionado(240, 360, 150, 40)) avanzar(22);
  } else if (estado == 4 || estado == 11 || estado == 19) {
    if (botonPresionado(240, 300, 150, 40)) estado = 0;
  } else if (botonPresionado(240, 300, 150, 40)) {
    if (estado == 14) avanzar(10);
    else if (estado == 21) avanzar(11); 
    else avanzar(estado + 1);
  } else if (botonPresionado(240, 360, 150, 40) && estado !== 22) { 
    retroceder(estado - 1);
  }

  if (estado == 3 && botonPresionado(150, 300, 100, 40)) avanzar(4);
  if (estado == 3 && botonPresionado(390, 300, 100, 40)) avanzar(5);
  if (estado == 6 && botonPresionado(150, 300, 100, 40)) avanzar(7);
  if (estado == 6 && botonPresionado(390, 300, 100, 40)) avanzar(12);
  if (estado == 10 && botonPresionado(150, 300, 100, 40)) avanzar(11);
  if (estado == 10 && botonPresionado(390, 300, 100, 40)) avanzar(15);
  if (estado == 18 && botonPresionado(150, 300, 100, 40)) avanzar(19);
  if (estado == 18 && botonPresionado(390, 300, 100, 40)) avanzar(20);
  if (estado == 20 && botonPresionado(240, 300, 150, 40)) avanzar(21);
  if (estado == 22 && botonPresionado(240, 300, 150, 40)) avanzar(0);
}
