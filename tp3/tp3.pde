/* Tp3
 Comision 5
 Rocio Alderete Ramos
 93053/4
 https://youtu.be/Nhy8YP2jhU4
*/

int botonX = 50;
int botonY = 350;
int botonWidth = 100;
int botonHeight = 50;
color botoncamcolor;
color botonReiniciar;
color cuadradoColor;
boolean precionar = false;

float lado;
int cantidad;
PImage imagen;
boolean rotarPatron = false;
float tamCuadrado;
float inicialTamCuadrado;
color inicialcuadradoColor;

void setup() {
  size(800, 400); 
  cantidad = 80; 
  lado = width / cantidad;
  imagen = loadImage("arteoptico.jpeg");
  botoncamcolor = color(255, 0, 0);
  botonReiniciar = color(151, 0, 55);
  cuadradoColor = color(151, 0, 55);
  float maxRadio = dist(0, 0, 600, 200); 
  tamCuadrado = maxRadio / 3;
  inicialTamCuadrado = tamCuadrado;
  inicialcuadradoColor = cuadradoColor;
}

void draw() {
  background(113, 78, 24);

  int numLineas = 220; 
  float maxRadio = dist(0, 0, 600, 200); 
  float anchoLinea = 6;
  noiseDetail(1, 0.5); 

  push();
  for (int x = cantidad / 2; x < cantidad; x++) { 
    for (int y = 0; y < cantidad; y++) {
      float posX = x * lado + lado / 2;
      if (posX >= 400 && posX <= 800) { 
        float n = noise(x * 0.5, y * 0.5); 
        int tonoMarron = color(113 + int(n * 113), 78 + int(n * 78), 24 + int(n * 24));
        fill(tonoMarron);
        noStroke();
        ellipse(posX, y * lado + lado / 2, lado, lado);
      }
    }
  }
  pop();

  push();
  if (rotarPatron) {
    translate(600, 200); 
    rotate(radians(frameCount)); 
    translate(-600, -200); 
  }
  for (int i = 0; i < numLineas; i++) {
    float angulo = map(i, 0, numLineas, 0, TWO_PI); 
    float x = cos(angulo) * maxRadio + 600;
    float y = sin(angulo) * maxRadio + 200; 
    if (x < 400) {
      x = 400;
    } else if (x > 800) {
      x = 800;
    }
    if (y < 0) {
      y = 0;
    } else if (y > 400) {
      y = 400;
    }
    stroke(212, 5, 28);
    strokeWeight(anchoLinea);
    line(600, 200, x, y);
  }
  pop();

  cuadrado(600, 200, tamCuadrado, cuadradoColor); 

  image(imagen, 0, 0, 400, 400);

  drawBoton(botonX, botonY, botonWidth, botonHeight, botoncamcolor, "Cambiar Color");
  drawBoton(botonX + 150, botonY, botonWidth, botonHeight, botonReiniciar, "Reiniciar");

  
  println("Área del cuadrado: " + calcularAreaCuadrado(tamCuadrado));
}

void cuadrado(float x, float y, float tam, color col) {
  push();
  fill(col);
  noStroke();
  rectMode(CENTER);
  rect(x, y, tam, tam);
  pop();
} 

void drawBoton(int x, int y, int w, int h, color col, String t) {
  fill(col);
  rect(x, y, w, h);
  fill(0);
  textAlign(CENTER, CENTER);
  text(t, x + w / 2, y + h / 2);
}

void mousePressed() {
  if (mouseX > botonX && mouseX < botonX + botonWidth && mouseY > botonY && mouseY < botonY + botonHeight) {
    precionar = !precionar;
    if (precionar) {
      cuadradoColor = color(212, 5, 28);
    } else {
      cuadradoColor = inicialcuadradoColor;
    }
  } else if (mouseX > botonX + 150 && mouseX < botonX + 150 + botonWidth && mouseY > botonY && mouseY < botonY + botonHeight) {
    reinicio();
  } else {
    rotarPatron = !rotarPatron;
  }
}

void keyPressed() {
  if (key == '+') {
    tamCuadrado += 10;  
  }
}

void reinicio() {
  tamCuadrado = inicialTamCuadrado;
  cuadradoColor = inicialcuadradoColor;
  rotarPatron = false;
  precionar = false;
}

float calcularAreaCuadrado(float tam) {
  return tam * tam;
}
