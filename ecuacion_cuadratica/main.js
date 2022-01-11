var sample_questions = {
  question_string: 'Pregunta de la ecuación',
  choices: {
    a: 1,
    b: 1,
    c: 1,
  }//  aX^2 + bX + c, los parametro de la ecuación se leen de este json
  //ocultar parabola
  //detectar clic en el plano cartesiano
  //si la coordenada permanece a la parabola, dibujar el punto
  //al dibujar colocar dos puntos correctos, dibujar parabola.
};

function draw() {
    try {
      functionPlot({
        target: '#plot',
        data: [{
          fn: document.getElementById('eq').value,
          sampler: 'builtIn',  // this will make function-plot use the evaluator of math.js
          graphType: 'polyline'
        }]
      });
    }
    catch (err) {
      console.log(err);
      alert(err);
    }
  }

  document.getElementById('form').onsubmit = function (event) {
    event.preventDefault();
    draw();
  };
$(document).ready(function() {
  draw();
})
