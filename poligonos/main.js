var all_questions = {
  question_string: "Indicaciones del maestro para resolver",
  choices: {
    coordenadas: {
      x: ["1", "1", "3"],
      y: ["1", "4", "4"],
      puntoDefinido: ["3", "1"],
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
var arrayX = all_questions.choices.coordenadas.x;
var arrayY = all_questions.choices.coordenadas.y;
var intento = arrayX.length;
var numIntento = intento;
var textoIntentos = document.getElementById("instruccion");
$("#instruccion").text("Puntos por poner: " + numIntento);

var puntoDefinido = all_questions.choices.coordenadas.puntoDefinido;
var puntoX = puntoDefinido[0] * 30 + 300;
var puntoY = (puntoDefinido[1] * 30 + 300) * -1 + 600;

var arrayPointX = [];
var arrayPointY = [];
var arrayDrawPoints = [];

var arrayCX = [];
var arrayCY = [];
var arrayInputX = [];
var arrayInputY = [];
var arrayPoligonoX = [];
var arrayPoligonoY = [];

var resp = 0;
var respInput = 0;
var respuestasInputX = [];
var respuestasInputY = [];
var temp = [];

let bx;
let by;
let overBox = false;
let boxSize = 600;
let locked = false;
let btnGrafica;

var contador = 0;

function setup() {
  createCanvas(600, 600);
  background("#fff");

  bx = width;
  by = height;

  noFill();
  beginShape();
  stroke("red");
  fill("red");
  circle(puntoX, puntoY, 12);
  endShape();
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

var coordenadaX;
var coordenadaY;

function crearArray() {
  for (var i = 0; i < arrayX.length; i++) {
    coordenadaX = arrayX[i];
    coordenadaX = coordenadaX * 30 + 300;
    coordenadaX = parseFloat(coordenadaX);
    arrayCX.push(coordenadaX);
    arrayPoligonoX.push(coordenadaX);
  }

  for (var i = 0; i < arrayY.length; i++) {
    coordenadaY = arrayY[i];
    coordenadaY = (coordenadaY * 30 + 300) * -1 + 600;
    coordenadaY = parseFloat(coordenadaY);
    arrayCY.push(coordenadaY);
    arrayPoligonoY.push(coordenadaY);
  }

  for (var i = 0; i < arrayX.length; i++) {
    coordenadaX = arrayX[i];
    coordenadaX = parseFloat(coordenadaX);
    arrayInputX.push(coordenadaX);
  }

  for (var i = 0; i < arrayY.length; i++) {
    coordenadaY = arrayY[i];
    coordenadaY = parseFloat(coordenadaY);
    arrayInputY.push(coordenadaY);
  }
}
crearArray();
arrayPoligonoX.push(puntoX);
arrayPoligonoY.push(puntoY);
console.log(arrayDrawPoints);
function drawPoints() {
  if (arrayDrawPoints.length == 2) {
    noFill();
    beginShape();
    stroke("rgb(0,255,0)");

    line(arrayDrawPoints[0], arrayDrawPoints[1], puntoX, puntoY);
    endShape();
  }

  if (arrayDrawPoints.length <= 4) {
    noFill();
    beginShape();
    stroke("rgb(0,255,0)");

    line(
      arrayDrawPoints[0],
      arrayDrawPoints[1],
      arrayDrawPoints[2],
      arrayDrawPoints[3]
    );
    endShape();
  } else {
    arrayDrawPoints.splice(0, 2);
    noFill();
    beginShape();
    stroke("rgb(0,255,0)");

    line(
      arrayDrawPoints[0],
      arrayDrawPoints[1],
      arrayDrawPoints[2],
      arrayDrawPoints[3]
    );
    endShape();
  }
}

function poligono() {
  for (var i = 0; i <= arrayPoligonoX.length; i++) {
    if (i < arrayPoligonoX.length) {
      noFill();
      beginShape();
      stroke("rgb(0,255,0)");
      line(
        arrayPoligonoX[i],
        arrayPoligonoY[i],
        arrayPoligonoX[i + 1],
        arrayPoligonoY[i + 1]
      );
      endShape();
    } else {
      beginShape();
      stroke("rgb(0,255,0)");
      line(
        arrayPoligonoX[i - 1],
        arrayPoligonoY[i - 1],
        arrayPoligonoX[0],
        arrayPoligonoY[0]
      );
      endShape();
    }
  }
}

function agregarCoordenadas() {
  var inputX = document.getElementById("cX");
  var inputY = document.getElementById("cY");

  var drawX = inputX.value;
  var drawY = inputY.value;
  var rdrawX = drawX;
  var rdrawY = drawY;

  drawX = drawX * 30 + 300;
  drawY = (drawY * 30 + 300) * -1 + 600;
  arrayDrawPoints.push(drawX, drawY);
  drawPoints();

  temp.push(rdrawX, rdrawY);
  respuestasInputX.push(rdrawX);
  respuestasInputY.push(rdrawY);

  rdrawX = parseFloat(rdrawX);
  rdrawX = parseFloat(rdrawX);

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
  console.log(respuestasInputX);
  console.log(respuestasInputY);
  console.log(arrayInputX);
  console.log(arrayInputY);
  console.log(temp);
  for (var i = 0; i < respuestasInputX.length; i++) {
    for (var j = 0; j < arrayInputX.length; j++) {
      if (respuestasInputX[i] == arrayInputX[j]) {
        respInput++;
        console.log("Contador en X: " + respInput);
        if (respuestasInputY[i] == arrayInputY[j]) {
          respInput++;
          console.log("Contador en Y: " + respInput);
        }
      }
    }
  }
  if (respInput == temp.length + 2) {
    poligono();
    setTimeout(function () {
      Swal.fire({
        icon: "success",
        title: "¡Correcto!",
      });
    }, 1200);
    $("#limpiar").text("Limpiar plano");
    score++;
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
  console.log(arrayPointX.length);
  console.log(arrayCX.length);
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
    poligono();
    setTimeout(function () {
      Swal.fire({
        icon: "success",
        title: "¡Correcto!",
      });
      $("#limpiar").text("Limpiar plano");
    }, 1200);
    score++;
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
  noFill();
  beginShape();
  stroke("red");
  fill("red");
  circle(puntoX, puntoY, 12);
  endShape();
}

function validarPuntos() {
  if (respuestasInputX.length > 0) {
    compararCoordenadas();
  } else {
    compararPuntos();
  }
}
