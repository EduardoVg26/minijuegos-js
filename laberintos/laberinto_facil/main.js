var all_questions = {
  question_string: "¿Cuánto es 28/7?",
  choices: {
    correct: "4",
    wrong: ["6", "2"],
  },
  route: //--------/ id tutor/                           /id alumno           /tipoClase/ id actvitie/info
  'EXPT/users/WvDkdIabrZaWFq5a6qTRNl0JjKz1/Alumnos/-MTHr5EKBsjrMeiOKDmW/lessons/idLabF'
};

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

var correcto = all_questions.choices.correct;
var incorrecto = all_questions.choices.wrong;
console.log(correcto);

var titulo = all_questions.question_string;
$("#game").before("<h1>" + titulo + "</h1>");

$("#btnNuevo").on("click", function () {
  location.reload();
});

//Loads up the game
var w = window,
  d = document,
  e = d.documentElement,
  g = d.getElementById("maze-game")[0];

var x = w.innerWidth || e.clientWidth || g.clientWidth,
  y = w.innerHeight || e.clientHeight || g.clientHeight;

var width = 700,
  height = 500;

var currentPosition;

var N = 1 << 0,
  S = 1 << 1,
  W = 1 << 2,
  E = 1 << 3;

var layout = [],
  fronteirTest = [];

var cellSize = 45,
  cellSpacing = 8,
  cellWidth = Math.floor((width - cellSpacing) / (cellSize + cellSpacing)),
  cellHeight = Math.floor((height - cellSpacing) / (cellSize + cellSpacing)),
  cells = new Array(cellWidth * cellHeight), // each cell’s edge bits
  frontier = [];

var maxY = Math.floor((height - cellSpacing) / (cellSize + cellSpacing)) - 1,
  maxX = Math.floor((width - cellSpacing) / (cellSize + cellSpacing)) - 1;

var mazeGame = document.querySelectorAll("#maze-game");

var canvas = document.createElement("canvas");

canvas.setAttribute("id", "canvas");
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);

mazeGame[0].appendChild(canvas);

var context = canvas.getContext("2d");

context.translate(
  Math.round(
    (width - cellWidth * cellSize - (cellWidth + 1) * cellSpacing) / 2
  ),
  Math.round(
    (height - cellHeight * cellSize - (cellHeight + 1) * cellSpacing) / 2
  )
);

var canvas2 = document.createElement("canvas");

canvas2.setAttribute("id", "canvas2");
canvas2.setAttribute("width", width);
canvas2.setAttribute("height", height);

mazeGame[0].appendChild(canvas2);

var game = canvas2.getContext("2d");

game.translate(
  Math.round(
    (width - cellWidth * cellSize - (cellWidth + 1) * cellSpacing) / 2
  ),
  Math.round(
    (height - cellHeight * cellSize - (cellHeight + 1) * cellSpacing) / 2
  )
);

//color of the maze
context.fillStyle = "#2c3e50";

// Add a random cell and two initial edges.
var start = (cellHeight - 1) * cellWidth;
cells[start] = 0;
fillCell(start);
frontier.push({
  index: start,
  direction: N,
});
frontier.push({
  index: start,
  direction: E,
});

// Explore the frontier until the tree spans the graph.
function run() {
  var done,
    k = 0;
  while (++k < 50 && !(done = exploreFrontier()));
  return done;
}

function exploreFrontier() {
  if ((edge = popRandom(frontier)) == null) {
    layout.push({ x: 0, y: maxY, d1: 0, d0: 0 });
    for (var i = layout.length - 1; i >= 0; i--) {
      if (layout[i].x === 0 && layout[i].y === maxY) {
        drawPlayer(layout[i]);
      }
    }
    return true;
  }

  var edge,
    i0 = edge.index,
    d0 = edge.direction,
    i1 =
      i0 + (d0 === N ? -cellWidth : d0 === S ? cellWidth : d0 === W ? -1 : +1),
    x0 = i0 % cellWidth,
    y0 = (i0 / cellWidth) | 0,
    x1,
    y1,
    d1,
    open = cells[i1] == null, // opposite not yet part of the maze
    north,
    east,
    south,
    west;
  // makes the maze color
  context.fillStyle = open ? "#2c3e50" : "transparent";
  if (d0 === N)
    fillSouth(i1), (x1 = x0), (y1 = y0 - 1), (d1 = S), (south = true);
  else if (d0 === S)
    fillSouth(i0), (x1 = x0), (y1 = y0 + 1), (d1 = N), (south = true);
  else if (d0 === W)
    fillEast(i1), (x1 = x0 - 1), (y1 = y0), (d1 = E), (east = true);
  else fillEast(i0), (x1 = x0 + 1), (y1 = y0), (d1 = W), (east = true);

  if (open) {
    fillCell(i1);
    (cells[i0] |= d0), (cells[i1] |= d1);
    context.fillStyle = "transparent";
    if (y1 > 0 && cells[i1 - cellWidth] == null)
      fillSouth(i1 - cellWidth),
        frontier.push({
          index: i1,
          direction: N,
        }),
        (south = true);
    if (y1 < cellHeight - 1 && cells[i1 + cellWidth] == null)
      fillSouth(i1),
        frontier.push({
          index: i1,
          direction: S,
        }),
        (south = true);
    if (x1 > 0 && cells[i1 - 1] == null)
      fillEast(i1 - 1),
        frontier.push({
          index: i1,
          direction: W,
        }),
        (east = true);
    if (x1 < cellWidth - 1 && cells[i1 + 1] == null)
      fillEast(i1),
        frontier.push({
          index: i1,
          direction: E,
        }),
        (east = true);
  }

  layout.push({
    open: open,
    x: x1,
    y: y1,
    d0: d0,
    d1: d1,
  });
}

function fillCell(index) {
  var i = index % cellWidth,
    j = (index / cellWidth) | 0;
  context.fillRect(
    i * cellSize + (i + 1) * cellSpacing,
    j * cellSize + (j + 1) * cellSpacing,
    cellSize,
    cellSize
  );
}

function fillEast(index) {
  var i = index % cellWidth,
    j = (index / cellWidth) | 0;
  context.fillRect(
    (i + 1) * (cellSize + cellSpacing),
    j * cellSize + (j + 1) * cellSpacing,
    cellSpacing,
    cellSize
  );
}

function fillSouth(index) {
  var i = index % cellWidth,
    j = (index / cellWidth) | 0;
  context.fillRect(
    i * cellSize + (i + 1) * cellSpacing,
    (j + 1) * (cellSize + cellSpacing),
    cellSize,
    cellSpacing
  );
}

function popRandom(array) {
  if (!array.length) return;
  var n = array.length,
    i = (Math.random() * n) | 0,
    t;
  (t = array[i]), (array[i] = array[n - 1]), (array[n - 1] = t);
  return array.pop();
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

var finishUpLeftX = 0 * cellSize + (0 + 1) * cellSpacing;
var finishUpLeftY = 0 * cellSize + (0 + 1) * cellSpacing;
var finishUpRightX = maxX * cellSize + (maxX + 1) * cellSpacing;
var finishUpRightY = 0 * cellSize + (0 + 1) * cellSpacing;
var finishDownX = maxX * cellSize + (maxX + 1) * cellSpacing;
var finishDownY = maxY * cellSize + (maxY + 1) * cellSpacing;

var arrayPosition = [
  [finishUpLeftX, finishUpLeftY, [0, 0]],
  [finishUpRightX, finishUpRightY, [12, 0]],
  [finishDownX, finishDownY, [12, 8]],
];
shuffle(arrayPosition);
console.log(arrayPosition);
//Changing the color and size of the balls
function drawPlayer(position) {
  game.clearRect(0, 0, width, height);
  currentPosition = position;
  var playerX = position.x * cellSize + (position.x + 1) * cellSpacing;
  var playerY = position.y * cellSize + (position.y + 1) * cellSpacing;

  //Abajo derecha
  game.beginPath();
  game.arc(
    arrayPosition[0][0] + cellSize / 2,
    arrayPosition[0][1] + cellSize / 2,
    cellSize / 2,
    0,
    2 * Math.PI,
    false
  );
  game.fillStyle = "red";
  game.fill();

  game.beginPath();
  game.fillStyle = "white";
  game.strokeStyle = "white";
  game.font = "bold 29px arial";
  game.strokeText(
    incorrecto[0],
    arrayPosition[0][0] + 15,
    arrayPosition[0][1] + 30
  );
  game.fill();

  //Arriba izquierda
  game.beginPath();
  game.arc(
    arrayPosition[1][0] + cellSize / 2,
    arrayPosition[1][1] + cellSize / 2,
    cellSize / 2,
    0,
    2 * Math.PI,
    false
  );
  game.fillStyle = "red";
  game.fill();

  game.beginPath();
  game.fillStyle = "white";
  game.strokeStyle = "white";
  game.font = "bold 29px arial";
  game.strokeText(
    incorrecto[1],
    arrayPosition[1][0] + 13,
    arrayPosition[1][1] + 35
  );
  game.fill();

  //Arriba derecha
  game.beginPath();
  game.arc(
    arrayPosition[2][0] + cellSize / 2,
    arrayPosition[2][1] + cellSize / 2,
    cellSize / 2,
    0,
    2 * Math.PI,
    false
  );
  game.fillStyle = "red";
  game.fill();

  game.beginPath();
  game.fillStyle = "white";
  game.strokeStyle = "white";
  game.font = "bold 29px arial";
  game.strokeText(correcto, arrayPosition[2][0] + 13, arrayPosition[2][1] + 35);
  game.fill();

  game.beginPath();
  game.arc(
    playerX + cellSize / 2,
    playerY + cellSize / 2,
    cellSize / 2,
    0,
    2 * Math.PI,
    false
  );
  game.fillStyle = "black";
  game.fill();
}

window.addEventListener("keydown", function (e) {
  var value = e.which;

  if (value === 37) moveWest(), e.preventDefault();
  if (value === 38) moveNorth(), e.preventDefault();
  if (value === 39) moveEast(), e.preventDefault();
  if (value === 40) moveSouth(), e.preventDefault();

  return false;
});

var btnUp = document.getElementById("btnUp");
var btnDown = document.getElementById("btnDown");
var btnLeft = document.getElementById("btnLeft");
var btnRight = document.getElementById("btnRight");

btnUp.addEventListener("click", function (e) {
  var value = e.which;

  moveNorth(), e.preventDefault();

  return false;
});
btnDown.addEventListener("click", function (e) {
  var value = e.which;

  moveSouth(), e.preventDefault();

  return false;
});
btnLeft.addEventListener("click", function (e) {
  var value = e.which;

  moveWest(), e.preventDefault();

  return false;
});
btnRight.addEventListener("click", function (e) {
  var value = e.which;

  moveEast(), e.preventDefault();

  return false;
});

var loseX = arrayPosition[0][2][0];
var loseY = arrayPosition[0][2][1];
var loseX2 = arrayPosition[1][2][0];
var loseY2 = arrayPosition[1][2][1];
var winX = arrayPosition[2][2][0];
var winY = arrayPosition[2][2][1];

function moveWest() {
  var newY = currentPosition.y;
  var newX = currentPosition.x - 1;
  var newPosition;

  if (newX < 0) return false;

  for (var i = layout.length - 1; i >= 0; i--) {
    if (layout[i].x === newX && layout[i].y === newY) {
      newPosition = layout[i];
    }
  }

  if (newPosition.x == winX && newPosition.y == winY) {
    gameComplete();
  }

  if (newPosition.x === loseX && newPosition.y === loseY) {
    gameLose();
  }

  if (newPosition.x === loseX2 && newPosition.y === loseY2) {
    gameLose();
  }

  if (currentPosition.d1 === W || newPosition.d1 === E) {
    drawPlayer(newPosition);
  }
}

function moveEast() {
  var newY = currentPosition.y;
  var newX = currentPosition.x + 1;
  var newPosition;

  if (newX > maxX) return false;

  for (var i = layout.length - 1; i >= 0; i--) {
    if (layout[i].x === newX && layout[i].y === newY) {
      newPosition = layout[i];
    }
  }

  if (newPosition.x == winX && newPosition.y == winY) {
    gameComplete();
  }

  if (newPosition.x === loseX && newPosition.y === loseY) {
    gameLose();
  }

  if (newPosition.x === loseX2 && newPosition.y === loseY2) {
    gameLose();
  }

  if (currentPosition.d1 === E || newPosition.d1 === W) {
    drawPlayer(newPosition);
  }
}

function moveNorth() {
  var newY = currentPosition.y - 1;
  var newX = currentPosition.x;
  var newPosition;

  if (newY < 0) return false;

  for (var i = layout.length - 1; i >= 0; i--) {
    if (layout[i].x === newX && layout[i].y === newY) {
      newPosition = layout[i];
    }
  }

  if (newPosition.x == winX && newPosition.y == winY) {
    gameComplete();
  }

  if (newPosition.x === loseX && newPosition.y === loseY) {
    gameLose();
  }

  if (newPosition.x === loseX2 && newPosition.y === loseY2) {
    gameLose();
  }

  if (currentPosition.d1 === N || newPosition.d1 === S) {
    drawPlayer(newPosition);
  }
}

function moveSouth() {
  var newY = currentPosition.y + 1;
  var newX = currentPosition.x;
  var newPosition;

  if (newY > maxY) return false;

  for (var i = layout.length - 1; i >= 0; i--) {
    if (layout[i].x === newX && layout[i].y === newY) {
      newPosition = layout[i];
    }
  }

  if (newPosition.x == winX && newPosition.y == winY) {
    gameComplete();
  }

  if (newPosition.x === loseX && newPosition.y === loseY) {
    gameLose();
  }

  if (newPosition.x === loseX2 && newPosition.y === loseY2) {
    gameLose();
  }

  if (currentPosition.d1 === S || newPosition.d1 === N) {
    drawPlayer(newPosition);
  }
}
//Changes the alert when you win the game
function gameComplete() {
  alert("Ganaste!");
}

function gameLose() {
  alert("Perdiste :(");
}

(function () {
  var lastTime = 0;
  var vendors = ["ms", "moz", "webkit", "o"];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
    window.cancelAnimationFrame =
      window[vendors[x] + "CancelAnimationFrame"] ||
      window[vendors[x] + "CancelRequestAnimationFrame"];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
})();

function animate() {
  requestAnimationFrame(function () {
    if (!run()) {
      animate();
    }
  });
}

animate();
