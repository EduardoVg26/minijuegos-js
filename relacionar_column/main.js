var all_questions = {
  question_string: "Relaciona las operaciones",
  choices: [
    ["15-8", "7"],
    ["4+7", "11"],
    ["19-6", "13"],
    ["2+4", "6"],
    ["4-3", "1"],
    ["20-10", "10"],
  ],
};

function shuffle(array) {
  var j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
}

var Columnas = function (question_string, cards) {
  this.quiz_name = "Relacionar columnas";
  this.question_string = question_string;
  this.paused = false;
  this.guess = null;
  var cardsArray = [];
  var elementA = [];
  for (var i = 0; i < cards.length; i++) {
    elementA.push({ val: i, text: cards[i][0] });
  }
  var elementB = [];
  for (var i = 0; i < cards.length; i++) {
    elementB.push({ val: i, text: cards[i][1] });
  }

  shuffle(elementA);
  shuffle(elementB);

  for (let i = 0; i < elementA.length; i++) {
    cardsArray[i * 2] = elementA[i];
    cardsArray[i * 2 + 1] = elementB[i];
  }

  this.cards = [];
  var count = cardsArray.length;
  for (var i = 0; i < count; i++) {
    var index = Math.floor(Math.random() * 1);
    this.cards[i] = cardsArray[index];
    cardsArray.splice(index, 1);
  }
};

Columnas.prototype.render = function (container) {
  var self = this;
  $("#quiz-name").text(this.quiz_name);

  var question_string_h2;
  if (container.children("h2").length === 0) {
    question_string_h2 = $("<h2>").appendTo(container);
  } else {
    question_string_h2 = container.children("h2").first();
  }
  question_string_h2.text(self.question_string);

  var frag = "";

  for (var i = 0; i < self.cards.length; i++) {
    var card_div = $("<div>")
      .attr("class", "card")
      .attr("data-id", self.cards[i].val)
      .appendTo(container);

    var inside = $("<div>").attr("class", "inside").appendTo(card_div);

    var back = $("<div>")
      .attr("class", "back")
      .text(self.cards[i].text)
      .appendTo(inside);

    card_div.on("click", function () {
      var card = $(this);
      if (
        !self.paused &&
        !card.find(".inside").hasClass("matched") &&
        !card.find(".inside").hasClass("picked")
      ) {
        card.find(".inside").addClass("picked");
        if (!self.guess) {
          self.guess = $(this).attr("data-id");
        } else if (
          self.guess == $(this).attr("data-id") &&
          !$(this).hasClass("picked")
        ) {
          $(".picked").addClass("matched");
          self.guess = null;
        } else {
          self.guess = null;
          self.paused = true;
          setTimeout(function () {
            $(".picked").removeClass("picked");
            self.paused = false;
          }, 600);
        }
        if ($(".matched").length == $(".card").length) {
          console.log("win");
        }
      }
    });
  }
};

function getData() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const data = JSON.parse(urlParams.get("question"));
  return data;
}

// "Main method" which will create all the objects and render the Quiz.
$(document).ready(function () {
  var data = getData();
  if (data != null) {
    var question = new Columnas(data.question_string, data.choices);
  } else {
    var question = new Columnas(
      all_questions.question_string,
      all_questions.choices
    );
  }
  // Render the quiz
  var quiz_container = $("#game");
  question.render(quiz_container);
});
