var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
//Cuadros
for (var x = 0; x <= 800; x = x + 20) {
  ctx.moveTo(x, 0);
  ctx.lineTo(x, 800);
}
for (var y = 0; y <= 800; y = y + 20) {
  ctx.moveTo(0, y);
  ctx.lineTo(800, y);
}
ctx.fillStyle = "#fff";
ctx.strokeStyle = "#000";
ctx.stroke();

//Linea eje Y
ctx.beginPath();
ctx.lineWidth = 3;
ctx.moveTo(400, 0);
ctx.lineTo(400, 800);
ctx.stroke();

//Linea eje X
ctx.beginPath();
ctx.lineWidth = 3;
ctx.moveTo(0, 400);
ctx.lineTo(800, 400);
ctx.stroke();

//Triangulos
//Arriba
ctx.beginPath();
ctx.strokeStyle = "#000";
ctx.fillStyle = "#000";
ctx.moveTo(400, 0);
ctx.lineTo(385, 15);
ctx.lineTo(415, 15);
ctx.closePath();
ctx.stroke();

//Derecha
ctx.beginPath();
ctx.strokeStyle = "#000";
ctx.fillStyle = "#000";
ctx.moveTo(800, 400);
ctx.lineTo(785, 415);
ctx.lineTo(785, 385);
ctx.closePath();
ctx.stroke();

//Abajo
ctx.beginPath();
ctx.strokeStyle = "#000";
ctx.fillStyle = "#000";
ctx.moveTo(400, 800);
ctx.lineTo(385, 785);
ctx.lineTo(415, 785);
ctx.closePath();
ctx.stroke();

//Izquierda
ctx.beginPath();
ctx.strokeStyle = "#000";
ctx.fillStyle = "#000";
ctx.moveTo(0, 400);
ctx.lineTo(15, 385);
ctx.lineTo(15, 415);
ctx.closePath();
ctx.stroke();

//Parabola
ctx.beginPath();
ctx.lineWidth = 5;
ctx.strokeStyle = "blue";
var ax = 300,
  ay = 200;
var pcx = 410,
  pcy = 800;
var zx = 500,
  zy = 200;
ctx.moveTo(ax, ay); // aquí empieza la curva
ctx.quadraticCurveTo(pcx, pcy, zx, zy);
ctx.stroke();

var t = 0.3; // valor entre 0 - 1
x = (1 - t) * (1 - t) * ax + 2 * (1 - t) * t * pcx + t * t * zx;
y = (1 - t) * (1 - t) * ay + 2 * (1 - t) * t * pcy + t * t * zy;
ctx.beginPath();
ctx.fillStyle = "red";
ctx.arc(x, y, 10, 0, 2 * Math.PI);
ctx.fill();
ctx.stroke();

var p = 0.7; // valor enpre 0 - 1
x2 = (1 - p) * (1 - p) * ax + 2 * (1 - p) * p * pcx + p * p * zx;
y2 = (1 - p) * (1 - p) * ay + 2 * (1 - p) * p * pcy + p * p * zy;
ctx.beginPath();
ctx.fillStyle = "red";
ctx.arc(x2, y2, 10, 0, 2 * Math.PI);
ctx.fill();
ctx.stroke();

//Resolver ecuacion
var a = 1;
var b = -1;
var c = -6;

function valorX0(a, b, c) {
  return (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
}

var resultadoX2 = valorX0(a, b, c);
console.log("X0: " + resultadoX2);

function valorX1(a, b, c) {
  return (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
}

var resultadoX1 = valorX1(a, b, c);
console.log("X1: " + resultadoX1);

//Sacar vertice
function vertice(a, b) {
  return -(b / (2 * a));
}

var verticeX = vertice(a, b);

function vertice2(vX, a, b, c) {
  return a * vX * a * vX + b * vX + c;
}

var verticeY = vertice2(verticeX, a, b, c);
console.log("(" + verticeX + " , " + verticeY + ")");
