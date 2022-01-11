var sample_questions = {
  question_string: "Coloca el valor en su posición correcta",
  choices: [1, 2, 3, 4],
  route: //--------/ id tutor/                           /id alumno           /tipoClase/ id actvitie/info
  'EXPT/users/WvDkdIabrZaWFq5a6qTRNl0JjKz1/Alumnos/-MTHr5EKBsjrMeiOKDmW/lessons/idLabF'

};
//GET URL DATA
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const data = JSON.parse(urlParams.get("question"));

var trial = true;

if (data != null) {
    sample_questions = data;
    trial = false;
}

var score = 0;
var fails = 0;

var c = document.getElementById("canv");
var contexto = c.getContext("2d");
var boton = document.getElementById("boton");

function valorRecta() {
  var input = document.getElementById("valor");
  valor = input.value;
  console.log(valor);
  return valor;
}

var contenedor = sample_questions.choices;
var random = contenedor.slice();

// boton.addEventListener("click", function () {
var cw = (c.width = 550),
  cx = cw / 4;
var ch = (c.height = 100),
  cy = ch / 4;

var a = {
  x: 30,
  y: 50,
  text: " A",
};
var b = {
  x: 480,
  y: 50,
  text: " B",
};

contexto.beginPath();
contexto.moveTo(a.x, a.y);
contexto.lineTo(b.x, b.y);
contexto.stroke();

contexto.font = "16px Verdana";
contexto.fillStyle = "white";
contexto.fillText(a.text, a.x, a.y - 5);
contexto.fillText(b.text, b.x + 5, b.y);

var m = {
  x: (b.x - a.x) / 2 + a.x,
  y: (b.y - a.y) / 2 + a.y,
};
contexto.beginPath();
var n = contenedor.length;
contexto.lineWidth = 3;
for (var i = 0; i <= n; i++) {
  var s = {
    x: ((b.x - a.x) * i) / n + a.x,
    y: ((b.y - a.y) * i) / n + a.y,
  };
  contexto.beginPath();
  contexto.moveTo(s.x, s.y + 20);
  contexto.lineTo(s.x, s.y - 20);
  contexto.stroke();
}
// });

//Juego

function shuffle(array) {
  var j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
}

function respuesta(element) {
  var contenido;
  for (var i = 0; i < element.length; i++) {
    contenido = element[i];
    var div = $(document.createElement("div"))
      .attr("id", "resp-" + element[i])
      .attr("class", "respuesta")
      .attr("draggable", "true")
      .attr("ondragstart", "drag(event)")
      .attr("name", element[i])
      .appendTo("#respuestas");
    var p = $(document.createElement("p")).appendTo(div);
    var sup = $(document.createElement("sup")).html(contenido).appendTo(p);
    $(p).append("/");
    var sub = $(document.createElement("sub")).html(element.length).appendTo(p);
  }
}

function opciones(element) {
  for (var i = 0; i < element.length; i++) {
    var div = $(document.createElement("div"))
      .attr("id", element[i])
      .attr("class", "opcion")
      .attr("ondrop", "drop(event)")
      .attr("ondragover", "allowDrop(event)")
      .appendTo("#opciones");
  }
}

shuffle(random);

respuesta(random);

opciones(contenedor);

var divCorrecto = document.getElementById("correcto");

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));

}
console.log(respuesta);
$("#reintentar").hide();

function testing() {
  var correcto = 1;
  var respuesta = document.getElementsByClassName("respuesta");
  var opcion = document.getElementsByClassName("opcion");
  for (var i = 0; i < respuesta.length; i++) {
    if (respuesta[i].getAttribute("name") != opcion[i].getAttribute("id")) {
      correcto = correcto * 0;
      break;
    }
  }
  if (correcto == 1) {
    Swal.fire({
      icon: "success",
      title: "¡Correcto!",
    });
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


