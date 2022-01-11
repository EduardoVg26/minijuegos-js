var sample_questions = {
  question_string: "Mueve el cuadro al número par",
  choices: {
    carril_a: {
      correct: 2,
      wrong: [1, 3],
    },
    carril_b: {
      correct: 4,
      wrong: [5, 7],
    },
    carril_c: {
      correct: 8,
      wrong: [9, 11],
    },
  },
  route: //--------/ id tutor/                           /id alumno           /tipoClase/ id actvitie/info
  'EXPT/users/WvDkdIabrZaWFq5a6qTRNl0JjKz1/Alumnos/-MTHr5EKBsjrMeiOKDmW/lessons/idLabF'
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const data = JSON.parse(urlParams.get("question"));
var trial = true;
if(data != null){
    sample_questions = data;
    trial = false;
}

var score = 0;
var fails = 0;

$('#question').text(sample_questions.question_string);

var carrilA = sample_questions.choices.carril_a;
var carrilB = sample_questions.choices.carril_b;
var carrilC = sample_questions.choices.carril_c;

//Array A
var correctA = sample_questions.choices.carril_a.correct;
var elementosA = sample_questions.choices.carril_a.wrong;

elementosA.push(correctA);

elementosA.sort(function () {
  return Math.random() - 0.5;
});

//ArrayB
var correctB = sample_questions.choices.carril_b.correct;
var elementosB = sample_questions.choices.carril_b.wrong;

elementosB.push(correctB);

elementosB.sort(function () {
  return Math.random() - 0.5;
});

//ArrayC
var correctC = sample_questions.choices.carril_c.correct;
var elementosC = sample_questions.choices.carril_c.wrong;

elementosC.push(correctC);

elementosC.sort(function () {
  return Math.random() - 0.5;
});

function drawJ(element) {
  var contenido;
  var win = $(document.getElementById("win")).hide();
  var draggable = $(document.getElementById("draggable"));
  try {
    for (var i = 0; i < element.length; i++) {
      contenido = element[i];
      var div = $(document.createElement("div"))
        .attr("id", "droppable")
        .attr("class", "ui-widget-header ")
        .appendTo("#opciones")
        .droppable();
      var label = $(document.createElement("label"))
        .html(contenido)
        .appendTo(div);
      var div = $(document.createElement("div"));
    }
  } catch {
    draggable.hide();

    win.show();
  }
}

function game(numero, arrA, correct) {
  if (numero == correct) {
    console.log("correcto");
    score++;
    numero = 0;
    index += 1;
    console.log(index);
    $("#opciones > div").hide();
    drawJ(arrA);
    $("#opciones > div").droppable({
      drop: function (ev, ui) {
        var numero = $(this).text();
        console.log(numero);
        game(numero, superarray[index + index], arrayCorrect[index]);
        console.log(index);
        $("#draggable").position({
          my: "left top+90",
          at: "left",
          of: "#señal",
        });
      },
    });
    if (score >= 3) {
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
  } else {
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

}

var superarray = [elementosA, elementosB, elementosC],
  arrayCorrect = [correctA, correctB, correctC];
var index = 0;

drawJ(elementosA);

$("#draggable").draggable();
$("#opciones > div").droppable({
  drop: function (ev, ui) {
    var numero = $(this).text();
    game(numero, superarray[index + 1], arrayCorrect[index]);
    if (numero == correctC) {
      alert("ganaste");
    }
    $("#draggable").position({
      my: "left top+90",
      at: "left",
      of: "#señal",
    });
  },
});
