var all_questions = {
  question_string: "Dibuja los puntos por donde pasa la recta 2x - 1",
  choices: {
    funcionLineal: {
      m: "2",
      b: "1",
      intentos: 2,
    },
  },
  route: //--------/ id tutor/                           /id alumno           /tipoClase/ id actvitie/info
        'EXPT/users/WvDkdIabrZaWFq5a6qTRNl0JjKz1/Alumnos/-MTHr5EKBsjrMeiOKDmW/lessons/idLabF'

};

//GET URL DATA
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const data = JSON.parse(urlParams.get("question"));
var trial = true;

if (data != null) {
  all_questions = data;
  trial = false;
}
var score = 0;
var fails = 0;

var texto = all_questions.question_string;
$("#texto").text(texto);

var m = all_questions.choices.funcionLineal.m;
var b = all_questions.choices.funcionLineal.b;
var intento = all_questions.choices.funcionLineal.intentos;
var numIntento = intento;
var textoIntentos = document.getElementById("instruccion");

$("#instruccion").text("Puntos por poner: " + numIntento);

m = parseFloat(m);
b = parseFloat(b);

var arrayPointX = [];
var arrayPointY = [];
var arrayDrawPoints = [];

var arrayCX = [];
var arrayCY = [];
var arrayXY = [];
var arrayInputX = [];
var arrayInputY = [];

var resp = 0;
var respInput = 0;
var respuestasInputX = [];
var respuestasInputY = [];
var temp = [];

var y1, y2, y3, y4, y5, y6, y7, y8, y9, y10, y11, y12, y13, y14, y15;
var cX1,
  cX2,
  cX3,
  cX4,
  cX5,
  cX6,
  cX7,
  cX8,
  cX9,
  cX10,
  cX11,
  cX12,
  cX13,
  cX14,
  cX15;
var cY1,
  cY2,
  cY3,
  cY4,
  cY5,
  cY6,
  cY7,
  cY8,
  cY9,
  cY10,
  cY11,
  cY12,
  cY13,
  cY14,
  cY15;

let bx;
let by;
let overBox = false;
let boxSize = 600;
let locked = false;
let btnGrafica;

var contador = 0;
console.log(contador);

function setup() {
  createCanvas(600, 600);
  background("#fff");

  bx = width;
  by = height;
}

function draw() {
  for (let i = 0; i <= height; i += 30) {
    strokeWeight(1);
    stroke(10);
    line(i, 0, i, height);
    line(0, i, width, i);
  }

  strokeWeight(3);
  line(0, height * 0.5, width, height * 0.5);
  strokeWeight(3);
  line(width * 0.5, 0, width * 0.5, height);

  fill(0);
  //Arriba
  triangle(280, 20, 320, 20, 300, 0);
  //Izquierda
  triangle(20, 280, 20, 320, 0, 300);
  //Derecha
  triangle(580, 280, 580, 320, 600, 300);
  //Abajo
  triangle(280, 580, 320, 580, 300, 600);

  if (
    mouseX > bx - boxSize &&
    mouseX < bx + boxSize &&
    mouseY > by - boxSize &&
    mouseY < by + boxSize
  ) {
    overBox = true;
    if (!locked) {
      if (mouseIsPressed === true) {
        stroke("red");
        fill("red");
        circle(mouseX, mouseY, 12);
      }
    } else {
      overBox = false;
    }
  }
}

function mousePressed() {
  if (overBox === true) {
    n = floor(mouseX);
    m = floor(mouseY);
    if (n >= 0 && n <= 600 && m >= 0 && m <= 600) {
      if (contador != intento) {
        arrayPointX.push(n);
        arrayPointY.push(m);
        arrayDrawPoints.push(n, m);
        contador++;
        numIntento--;
        $(textoIntentos).text("Puntos por poner: " + numIntento);
        drawPoints();
      } else {
        $("#trazar").removeClass("validar");
        $("#trazar").addClass("calcular");
        contador = 0;
      }

      console.log(arrayPointX);
      console.log(arrayPointY);
      console.log("intento: " + intento);
      console.log("contador: " + contador);
    }
  } else {
    locked = false;
  }
}

function mouseReleased() {
  locked = false;
}

function resolverFuncion() {
  y1 = m * 5 + b;
  cX1 = 5 * 30 + 300;
  cY1 = (y1 * 30 + 300) * -1 + 600;

  y2 = m * 4 + b;
  cX2 = 4 * 30 + 300;
  cY2 = (y2 * 30 + 300) * -1 + 600;

  y3 = m * 3 + b;
  cX3 = 3 * 30 + 300;
  cY3 = (y3 * 30 + 300) * -1 + 600;

  y4 = m * 2 + b;
  cX4 = 2 * 30 + 300;
  cY4 = (y4 * 30 + 300) * -1 + 600;

  y5 = m * 1 + b;
  cX5 = 1 * 30 + 300;
  cY5 = (y5 * 30 + 300) * -1 + 600;

  y6 = m * 0 + b;
  cX6 = 0 * 30 + 300;
  cY6 = (y6 * 30 + 300) * -1 + 600;

  y7 = m * -1 + b;
  cX7 = -1 * 30 + 300;
  cY7 = (y7 * 30 + 300) * -1 + 600;

  y8 = m * -2 + b;
  cX8 = -2 * 30 + 300;
  cY8 = (y8 * 30 - 300) * -1;

  y9 = m * -3 + b;
  cX9 = -3 * 30 + 300;
  cY9 = (y9 * 30 + 300) * -1 + 600;

  y10 = m * -4 + b;
  cX10 = -4 * 30 + 300;
  cY10 = (y10 * 30 - 300) * -1;

  y11 = m * -5 + b;
  cX11 = -5 * 30 + 300;
  cY11 = (y11 * 30 - 300) * -1;
}


resolverFuncion();
arrayCX.push(cX1, cX2, cX3, cX4, cX5, cX6, cX7, cX8, cX9, cX10, cX11);
arrayCY.push(cY1, cY2, cY3, cY4, cY5, cY6, cY7, cY8, cY9, cY10, cY11);
arrayInputX = [5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5];
arrayInputY = [y1, y2, y3, y4, y5, y6, y7, y8, y9, y10, y11];
console.log(arrayInputX);
console.log(arrayInputY);
console.log("5", y1, cX1, cY1);
console.log("4", y2, cX2, cY2);
console.log("3", y3, cX3, cY3);
console.log("2", y4, cX4, cY4);
console.log("1", y5, cX5, cY5);
console.log("0", y6, cX6, cY6);
console.log("-1", y7, cX7, cY7);
console.log("-2", y8, cX8, cY8);
console.log("-3", y9, cX9, cY9);
console.log("-5", y10, cX10, cY10);
console.log("-6", y11, cX11, cY11);



function drawPoints(){
  if(arrayDrawPoints.length <= 4){
    noFill();
    beginShape();
    line(arrayDrawPoints[0], arrayDrawPoints[1], arrayDrawPoints[2], arrayDrawPoints[3]);
    endShape();
  } else {
    arrayDrawPoints.splice(0, 2);
    noFill();
    beginShape();
    line(arrayDrawPoints[0], arrayDrawPoints[1], arrayDrawPoints[2], arrayDrawPoints[3]);
    endShape();
  }
}

function agregarCoordenadas() {
  var inputX = document.getElementById("cX");
  var inputY = document.getElementById("cY");

  var drawX = inputX.value;
  var drawY = inputY.value;

  temp.push(drawY, drawX);
  respuestasInputX.push(drawX);
  respuestasInputY.push(drawY);

  drawX = parseFloat(drawX);
  drawY = parseFloat(drawY);

  drawX = drawX * 30 + 300;
  drawY = (drawY * 30 + 300) * -1 + 600;

  noFill();
  beginShape();
  stroke("red");
  fill("red");
  circle(drawX, drawY, 12);
  endShape();

  numIntento--;
  $(textoIntentos).text("Puntos por poner: " + numIntento);

  $(inputX).val("");
  $(inputY).val("");
}

function compararCoordenadas() {
  for (var i = 0; i < respuestasInputX.length; i++) {
    for (var j = 0; j < arrayInputX.length; j++) {
      if (respuestasInputX[i] == arrayInputX[j]) {
        respInput++;
        if (respuestasInputY[i] == arrayInputY[j]) {
          respInput++;
        }
      } 
    }
  }

  if (respInput == temp.length) {
    Swal.fire({
      icon: "success",
      title: "¡Correcto!",
    });
    score++;
    noFill();
    beginShape();
    line(cX1, cY1, cX2, cY2);
    line(cX2, cY2, cX3, cY3);
    line(cX3, cY3, cX4, cY4);
    line(cX4, cY4, cX5, cY5);
    line(cX5, cY5, cX6, cY6);
    line(cX6, cY6, cX7, cY7);
    line(cX7, cY7, cX8, cY8);
    line(cX8, cY8, cX9, cY9);
    line(cX9, cY9, cX10, cY10);
    line(cX10, cY10, cX11, cY11);
    endShape();
  } else {
    Swal.fire({
      icon: "error",
      title: "Incorrecto",
      text: "Vuelve a Intentarlo",
    });
    $("#limpiar").text("Reintentar");
    fails++;
  }

  if (score >= 1) {
    console.log("win", score);
    setTimeout(function () {
      window.location.href = "uniwebview://correct?score=" + self.score;
    }, 3000);
    if (!trial) {

        firebase.database().ref(all_questions.route).update({
            doneDate: firebase.database.ServerValue.TIMESTAMP,
            approved: true, hits: score, fails: fails
        })
    }
  }

  if (fails >= 3) {
    console.log("lose", fails);
    setTimeout(function () {
      window.location.href = "uniwebview://wrong?score=" + self.score;
    }, 3000);
    if (!trial)
        firebase.database().ref(all_questions.route).update({
            doneDate: firebase.database.ServerValue.TIMESTAMP,
            approved: false, hits: score, fails: fails
        })
  }
}

function compararPuntos() {
  for (var i = 0; i < arrayPointX.length; i++) {
    for (var j = 0; j < arrayCX.length; j++) {
      if (
        arrayPointX[i] <= arrayCX[j] + 5 &&
        arrayPointX[i] >= arrayCX[j] - 5
      ) {
        if (
          arrayPointY[i] <= arrayCY[j] + 5 &&
          arrayPointY[i] >= arrayCY[j] - 5
        ) {
          resp++;

        }
       } 
      }
    }
  
  if (resp == intento) {
    Swal.fire({
      icon: "success",
      title: "¡Correcto!",
    });
    $("#limpiar").text("Limpiar plano");
    score++;
    noFill();
    beginShape();
    line(cX1, cY1, cX2, cY2);
    line(cX2, cY2, cX3, cY3);
    line(cX3, cY3, cX4, cY4);
    line(cX4, cY4, cX5, cY5);
    line(cX5, cY5, cX6, cY6);
    line(cX6, cY6, cX7, cY7);
    line(cX7, cY7, cX8, cY8);
    line(cX8, cY8, cX9, cY9);
    line(cX9, cY9, cX10, cY10);
    line(cX10, cY10, cX11, cY11);
    endShape();
  } else {
    Swal.fire({
      icon: "error",
      title: "Incorrecto",
      text: "Vuelve a Intentarlo",
    });
    
    $("#limpiar").text("Reintentar");
    fails++;
  }
  
  if (score >= 1) {
    console.log("win");
    setTimeout(function () {
      window.location.href = "uniwebview://correct?score=" + score;
    }, 3000);
    if (!trial) {
      firebase.database().ref(all_questions.route).update({
        doneDate: firebase.database.ServerValue.TIMESTAMP,
        approved: true,
        hits: score,
        fails: fails,
      });
    }
  }

  if (fails >= 3) {
    console.log("lose");
    setTimeout(function () {
      window.location.href = "uniwebview://wrong?score=" + score;
    }, 3000);
    if (!trial)
      firebase.database().ref(all_questions.route).update({
        doneDate: firebase.database.ServerValue.TIMESTAMP,
        approved: false,
        hits: score,
        fails: fails,
      });
  }
}

function limpiar() {
  arrayPointX = [];
  arrayPointY = [];
  arrayDrawPoints = [];
  respuestasInputX = [];
  respuestasInputY = [];
  temp = [];
  resp = 0;
  respInput = 0;
  contador = 0;
  numIntento = intento;
  $("#instruccion").text("Puntos por poner: " + numIntento);
  clear();
  background("#fff");
}

function validarPuntos() {
  if (respuestasInputX.length > 0) {
    compararCoordenadas();
  } else {
    compararPuntos();
  }
}
