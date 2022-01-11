var all_questions = {
  question_string: "Resuelve el problema que seleccione la ruleta",

    choices: {
        texto: "Contesta correctamente el problema.",
    question: ["2+2", "Color del cielo", "18-2", "Animal amarillo"],
    correct: ["4", "azul", "16", "pollito"],
    wrong: [
      ["5", "3", "6"],
      ["naranja", "verde", "rojo"],
      ["22", "11", "3"],
      ["vaca", "rata", "foca"],
    ],
    },
    route: //--------/ id tutor/                           /id alumno           /tipoClase/ id actvitie/info
        'EXPT/users/WvDkdIabrZaWFq5a6qTRNl0JjKz1/Alumnos/-MTHr5EKBsjrMeiOKDmW/lessons/Ruleta'

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

var choices = all_questions.choices.question;
var correct = all_questions.choices.correct;
var wrong = all_questions.choices.wrong;
var ruleta;
var ctx;
var segSeleccionado;

//Imprimir instrucciones de la actividad
var titulo = all_questions.question_string;
$("#game").before("<h1>" + titulo + "</h1>");

//Imprimir texto
var texto = all_questions.choices.texto;
$("#text").text(texto);

var elementA = [];
for (var i = 0; i < choices.length; i++) {
  elementA.push({ val: i, text: choices[i][0] });
}

var elementB = [];
for (var i = 0; i < choices.length; i++) {
  elementB.push({ val: i, text: choices[i][1] });
}

var elementC = [];
for (var i = 0; i < choices.length; i++) {
  elementC.push({
    val: i,
    text: choices[i],
    resultado: correct[i],
    answer: wrong[i],
  });
}

function mensaje() {
  //función de alerta para verificar si el ejercicio esta bien
  segSeleccionado = ruleta.getIndicatedSegment();
  shuffle(elementC);
  var respuesta = [
    [elementC[0].val, elementC[0].resultado],
    [elementC[1].val, elementC[0].answer[0]],
    [elementC[2].val, elementC[0].answer[1]],
    [elementC[3].val, elementC[0].answer[2]],
  ];
  shuffle(respuesta);
  var json12 = {};
  json12[respuesta[0][1]] = respuesta[0][1];
  json12[respuesta[1][1]] = respuesta[1][1];
  json12[respuesta[2][1]] = respuesta[2][1];
  json12[respuesta[3][1]] = respuesta[3][1];
  (async () => {
    const { value: text } = await Swal.fire({
      title: "¿Cuál es la respuesta correcta de: " + elementC[0].text + " ?",
      inputPlaceholder: "Selecciona el resultado correcto",
      icon: "question",
      input: "radio",
      inputOptions: json12,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#2AE841",
      width: "60%",
      padding: "4rem",
    });
    if (text == elementC[0].resultado) {
        Swal.fire({ icon: "success", title: "Correcto" });
        score++;

        if (score >= 1) {
          console.log("win");
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

    } else {

      fails++;
      
      if (fails <= 2) {
        Swal.fire({
          icon: "error",
          title: "Incorrecto",
          confirmButtonText: "Reintentar",
        }).then((result) => {
          if (result.isConfirmed) {
            ruleta.startAnimation();
          }
        });
        console.log(fails);
      } else {
        Swal.fire({ icon: "error", title: "Perdiste" });
        console.log("lose");
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

    ruleta.stopAnimation(false);
    ruleta.rotationAngle = 0;
    ruleta.draw();
    dibujarTriangulo();
  })();
}

function dibujarTriangulo() {
  ctx = ruleta.ctx;
  ctx.strokeStyle = "navy";
  ctx.fillStyle = "#000000";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(170, 0);
  ctx.lineTo(230, 0);
  ctx.lineTo(200, 40);
  ctx.lineTo(171, 0);
  ctx.stroke();
  ctx.fill();
}

// Dibujar Ruleta
function dibujarRuleta(elementosRuleta) {
  ruleta = new Winwheel({
    numSegments: elementosRuleta.length,
    outerRadius: 170,
    segments: elementosRuleta,
    animation: {
      type: "spinToStop",
      duration: 3,
      callbackFinished: "mensaje()",
      callbackAfter: "dibujarTriangulo()",
    },
  });

  dibujarTriangulo();
}

function leerElementos() {
  //Lee los elementos del arreglo que se utilizarán para crear la ruleta
  var elementA = [];
  for (var i = 0; i < choices.length; i++) {
    elementA.push({ text: choices[i][0] });
  }

  var textoRuleta = [];
  for (let i = 0; i < elementA.length; i++) {
    textoRuleta.push(elementA[i].text);
  }

  var elementosRuleta = [];
  textoRuleta.forEach(function (elemento) {
    if (elemento) {
      elementosRuleta.push({
        fillStyle: random_color(),
        textFillStyle: "#FFF",
      });
    }
  });

  dibujarRuleta(elementosRuleta);
}

leerElementos();

function shuffle(array) {
  var j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
}

function shuffle2(array) {
  var j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(2 * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
}

function random_color() {
  let ar_digit = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  let color = "";
  let i = 0;
  while (i < 6) {
    let pos = Math.round(Math.random() * (ar_digit.length - 1));
    color = color + "" + ar_digit[pos];
    i++;
  }
  return "#" + color;
}
