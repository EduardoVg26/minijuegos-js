var all_questions = {
  question_string: "Resuelve el problema",
  choices: {
    question: [
      "2+2", //1
      "Color del cielo", //2
      "18-2", //3
      "Animal amarillo", //4
      "4+2", //5
      "Color del sol", //6
      "18/2", //7
      "Animal que ladra", //8
      "2*5", //9
      "Color del pasto", //10
      "11 + 7", //11
      "Animal de granja", //12
    ],
    correct: [
      "4",
      "azul",
      "16",
      "pollito",
      "6",
      "amarillo",
      "9",
      "perro",
      "10",
      "verde",
      "18",
      "vaca",
    ],
    wrong: [
      ["5", "3", "6"],
      ["naranja", "verde", "rojo"],
      ["22", "11", "3"],
      ["vaca", "rata", "foca"],
      ["5", "3", "8"],
      ["cafe", "gris", "negro"],
      ["12", "20", "7"],
      ["gato", "leon", "vaca"],
      ["21", "15", "4"],
      ["rojo", "amarillo", "rosa"],
      ["5", "12", "8"],
      ["aguila", "gato", "hamster"],
    ],
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

var choices = all_questions.choices.question;
var correct = all_questions.choices.correct;
var wrong = all_questions.choices.wrong;
var arrayBomba = 0;

//Imprimir instrucciones de la actividad
var titulo = all_questions.question_string;
$("#game").before("<h1>" + titulo + "</h1>");

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

function opciones(element) {
  for (var i = 0; i < element.length; i++) {
    var img = $(document.createElement("img"))
      .attr("id", [i])
      .attr("class", "bomba")
      .attr("src", "bomba.png")
      .attr("onclick", "mensaje()")
      .appendTo("#seleccion");
  }
}
opciones(choices);
function mensaje() {
  $("body #seleccion").on("click", "img", function () {
    arrayBomba = $(this).attr("id");
    console.log(arrayBomba);
    //función de alerta para el ejercicio
    shuffle(elementC);
    console.log(elementC);
    var respuesta = [
      [elementC[0].val, elementC[0].resultado],
      [elementC[0].val, elementC[0].answer[0]],
      [elementC[0].val, elementC[0].answer[1]],
      [elementC[0].val, elementC[0].answer[2]],
    ];
    shuffle(respuesta);
    console.log(respuesta);
    var json12 = {};
    json12[respuesta[0][1]] = respuesta[0][1];
    json12[respuesta[1][1]] = respuesta[1][1];
    json12[respuesta[2][1]] = respuesta[2][1];
    json12[respuesta[3][1]] = respuesta[3][1];

    (async () => {
      const { value: text } = await Swal.fire({
        title: "¿Cuál es la respuesta correcta de: " + elementC[0].text + "?",
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
        var img2 = document.getElementById(arrayBomba);
        $(img2).attr("src", "boom.png");
        var removed = elementC.splice(0, 1);
        
      } else {
        Swal.fire({
          icon: "error",
          title: "Incorrecto",
          confirmButtonText: "Reintentar",
        });
        fails++;
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

      if (elementC.length == 0) {
        Swal.fire({
          icon: "success",
          title: "¡Perfecto! ¡Haz terminado todas las preguntas!",
        });
        score++;
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
      }
    })();
  });
}

function shuffle(array) {
  var j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
}
