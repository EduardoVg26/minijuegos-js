var sample_questions = {
  choices: {
    audio: ["audio_1", "audio_2", "audio_3"],
    img_correct: "img_1",
    img_wrong: ["img_2", "img_3", "img_4", "img_5", "img_6"],
  },
};
//tener diferentes audios e imagenes
//seleccionar el audio y las imagenes que apareceran desde el json

const seleccion = document.getElementById("seleccion");

var correct = sample_questions.choices.img_correct;
var elementos = sample_questions.choices.img_wrong;
var audio = sample_questions.choices.audio;

elementos.push(correct);

function shuffle(array) {
  var j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
}

shuffle(elementos);
shuffle(audio);

function draw(imagen) {
  var img = document.createElement("img");
  seleccion.appendChild(img);
  img.className += "animal";
  img.setAttribute("onclick", "test()");
  img.setAttribute("name", imagen);
  img.setAttribute("src", imagen + ".png");
}

function crearElementos() {
  elementos.forEach(function (choice) {
    draw(choice);
    console.log("elemento");
  });
}

crearElementos();

function test() {
  $(".animal").click(function () {
    var name = $(this).attr("name");
    if (name === correct) {
      alert("Correcto");
    } else {
      alert("Incorrecto");
    }
  });
}

// Iniciar sonido
window.addEventListener("load", function () {
  document.getElementById("play").addEventListener("click", reproducirAudio);
});

function reproducirAudio() {
  audio.splice(1);
  let etiquetaAudio = document.createElement("audio");
  etiquetaAudio.setAttribute("src", audio + ".mp3");
  etiquetaAudio.play();
  document.getElementById("play").removeEventListener("click", reproducirAudio);
}
