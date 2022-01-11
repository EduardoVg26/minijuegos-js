var all_questions = {
  question_string: "Agrega las raíces o encuentralas en el plano",
  choices: {
    cuadratica: {
      a: "",
      b: "",
      c: "",
    },
    formal: {
      u: "-4",
      k: "-4",
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

var ecA = all_questions.choices.cuadratica.a;
var ecB = all_questions.choices.cuadratica.b;
var ecC = all_questions.choices.cuadratica.c;

var formalU = all_questions.choices.formal.u;
var formalk = all_questions.choices.formal.k;

if (ecA != "" && ecC != "" && ecB != "" && formalU == "" && formalk == "") {
  $("#coordenadas").css("display", "inline");
} else if (
  ecA == "" &&
  ecC == "" &&
  ecB == "" &&
  formalU != "" &&
  formalk != ""
) {
  $("#coordenadasFormal").css("display", "inline");
}

var texto = all_questions.question_string;
$("#texto").text(texto);

let bx;
let by;
let overBox = false;
let boxSize = 600;
let locked = false;
let btnGrafica;

var point1 = { x: 0, y: 0 },
  point2 = { x: 0, y: 0 },
  vertice = { x: 0, y: 0 };

var contador = 4;
console.log(contador);

var resultadoX2 = 0;
var resultadoX1 = 0;

var verticeX = 0;
var verticeY = 0;

//Ecuacion forma normal
var rX2 = 0;
var rX1 = 0;
var drX2 = 0;
var drX1 = 0;

function setup() {
  createCanvas(600, 600);
  background("#fff");

  bx = width;
  by = height;
}

function draw() {
  for (let i = 0; i <= height; i += 20) {
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
        circle(mouseX, mouseY, 14);
      }
    } else {
      overBox = false;
    }
  }
}

function mousePressed() {
  var x1 = document.getElementById("raizX1").value;
  var x2 = document.getElementById("raizX2").value;

  if (overBox === true) {
    n = mouseX;
    m = mouseY;
    if (n >= 0 && n <= 600 && m >= 0 && m <= 600) {
      contador++;
      console.log(contador);
      if (contador == 4) {
        $("#instrucciones").text(
          "2. Da click en la primera raíz o ingresa los valores de las raices:"
        );
        console.log("Reinicio de contador");
        clear();
        background("#fff");
        n = mouseX;
        m = mouseY;
        contador = 0;
        point1 = { x: 0, y: 0 };
        point2 = { x: 0, y: 0 };
        vertice = { x: 0, y: 0 };
      }

      var n = 0;
      var m = 0;
      if (contador == 1) {
        $("#instrucciones").text(
          "2. Seleccione un valor aproximado al  vertice."
        );
        n = mouseX;
        m = mouseY;
        point1.x = n;
        point1.y = m;
        console.log(point1.x, point1.y);
      }

      if (contador == 2) {
        $("#instrucciones").text("4. Seleccione el segundo punto:");
        n = mouseX;
        m = mouseY;
        vertice.x = n;
        vertice.y = m;
        console.log(vertice.x, vertice.y);
      }

      if (contador == 3) {
        $("#instrucciones").text("De clic para iniciar");
        n = mouseX;
        m = mouseY;
        point2.x = n;
        point2.y = m;
        console.log(point2.x, point2.y);
        if(ecA == ''){
          compararPuntos(resultadoX2, resultadoX1);
        } else {
          compararFormaNormal(rX2, rX1);
        }
      }

      if (
        point1.x != 0 &&
        point1.y != 0 &&
        point2.x != 0 &&
        point2.y != 0 &&
        vertice.x != 0 &&
        vertice.y != 0
      ) {
        noFill();
        beginShape();
        stroke("blue");
        strokeWeight(3);
        vertex(point1.x, point1.y);
        quadraticVertex(vertice.x, vertice.y, point2.x, point2.y);
        endShape();
      }
    }
  } else {
    locked = false;
  }
}

function mouseReleased() {
  locked = false;
}

function calcular(eA, eB, eC) {
  contador = 3;
  var a = all_questions.choices.cuadratica.a;
  var b = all_questions.choices.cuadratica.b;
  var c = all_questions.choices.cuadratica.c;

  console.log(a, b, c);
  console.log(contador);
  function valorX0(a, b, c) {
    return (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
  }

  function valorX1(a, b, c) {
    return (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
  }

  resultadoX2 = valorX1(a, b, c);
  console.log("X0: " + resultadoX2);

  resultadoX1 = valorX0(a, b, c);
  console.log("X1: " + resultadoX1);

  //Sacar vertice
  function vertice(a, b) {
    return -(b / (2 * a));
  }

  verticeX = vertice(a, b);
  var verX = parseFloat(verticeX);

  function vertice2(vX, a, b, c) {
    return a * vX * a * vX + b * vX + c;
  }

  verticeY = vertice2(verX, a, b, c);
  console.log("El vertice es: (" + verticeX + ", " + verticeY + ")");
}
calcular();
function normal() {
  var aV = 1;
  var u = all_questions.choices.formal.u;
  var k = all_questions.choices.formal.k;
  console.log("U: " + u + " K: " + k);
  var newK = 0;
  if (k < 0) {
    newK = k * -1;
  } else {
    console.log("positivo");
  }
  var raizCuadrada = Math.sqrt(newK);
  raizCuadrada = raizCuadrada.toFixed(1);
  raizCuadrada = parseFloat(raizCuadrada);
  var vX = u * -1;
  console.log(raizCuadrada);
  var raizNegativo = raizCuadrada * -1;
  rX2 = raizNegativo + vX;
  rX1 = raizCuadrada + vX;
  rX2 = rX2.toFixed(1);
  rX1 = rX1.toFixed(1);
  console.log("X0: " + rX2 + " X1: " + rX1);
  console.log("vertice: " + vX + ", " + k);
}

normal();

function compararFormaNormal(compX, compX2) {
  var resX1 = 0;
  resX1 = compX * 20 + 300;

  var resX2 = 0;
  resX2 = compX2 * 20 + 300;
  console.log("normal x1: " + resX1, "normal x2:" + resX2);
  console.log(compX, compX2);
  if (resX1 != 300 && resX2 != 300) {
    if (
      point1.x <= resX1 + 5 &&
      point1.x >= resX1 - 5 &&
      point2.x <= resX2 + 5 &&
      point2.x >= resX2 - 5
    ) {
      Swal.fire({
        icon: "success",
        title: "¡Correcto!",
      });
      score++;
      contador = 3;
    } else {
      Swal.fire({
        icon: "error",
        title: "Incorrecto",
        text: "Vuelve a Intentarlo",
      });
      fails++;
    }
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
function compararPuntos(compX, compX2) {
  var resX1 = 0;
  resX1 = compX * 20 + 300;

  var resX2 = 0;
  resX2 = compX2 * 20 + 300;
  console.log("cuadratica x1: " + resX1, "cuadratica x2:" + resX2);
  console.log(compX, compX2);
  if (resX1 != 300 && resX2 != 300) {
    if (
      point1.x <= resX1 + 5 &&
      point1.x >= resX1 - 5 &&
      point2.x <= resX2 + 5 &&
      point2.x >= resX2 - 5
    ) {
      Swal.fire({
        icon: "success",
        title: "¡Correcto!",
      });
      score++;
      contador = 3;
    } else {
      Swal.fire({
        icon: "error",
        title: "Incorrecto",
        text: "Vuelve a Intentarlo",
      });
      fails++;
    }
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

var x1 = 0;
var x2 = 0;
var fx1 = 0;
var fx2 = 0;
function compararRaiz() {
  x1 = document.getElementById("raizX1").value;
  x2 = document.getElementById("raizX2").value;

  if (
    (x1 == resultadoX1 && x2 == resultadoX2) ||
    (x1 == resultadoX2 && x2 == resultadoX1)
  ) {
    Swal.fire({
      icon: "success",
      title: "¡Correcto!",
    });
    score++;
    contador = 3;
  } else {
    Swal.fire({
      icon: "error",
      title: "Incorrecto",
      text: "Vuelve a Intentarlo",
    });
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

function compararRaizFormal() {
  fx1 = document.getElementById("formalX1").value;
  fx2 = document.getElementById("formalX2").value;

  var decX1 = parseFloat(fx1);
  var decX2 = parseFloat(fx2);

  if ((decX1 == rX1 && decX2 == rX2) || (decX1 == rX2 && decX2 == rX1)) {
    Swal.fire({
      icon: "success",
      title: "¡Correcto!",
    });
    contador = 3;
    score++;

  } else {
    Swal.fire({
      icon: "error",
      title: "Incorrecto",
      text: "Vuelve a Intentarlo",
    });
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
