var all_questions = {
  question_string: "Ordena los números",
  choices: [
    ["2+2", "4"],
    ["3+7", "10"],
    ["8-2", "6"],
    ["4+1", "5"],
    ["5+3", "8"],
    ["11+3", "14"],
  ],
};
//?question={"question_string":"Ordena%20los%20números","choices":[{"name":"Pares","elements":["2","4","6","8","10","12","14","16"]},{"name":"Nones","elements":["1","3","5","7","9","11","13","15"]}]}
//console.log(JSON.stringify(all_questions));

var Memorama = function (question_string, cards) {
  this.quiz_name = "MEMORAMA";
  this.question_string = question_string;
  this.paused = false;
  this.guess = null;
  var cardsArray = [];
  for (var i = 0; i < cards.length; i++) {
    cardsArray.push({ val: i, text: cards[i][0] });
    cardsArray.push({ val: i, text: cards[i][1] });
  }

  this.cards = [];
  var count = cardsArray.length;
  for (var i = 0; i < count; i++) {
    var index = Math.floor(Math.random() * cardsArray.length);
    this.cards[i] = cardsArray[index];
    cardsArray.splice(index, 1);
  }
};

Memorama.prototype.render = function (container) {
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

    var front = $("<div>")
      .attr("class", "front")
      .text(self.cards[i].text)
      .appendTo(inside);

    // var back = $("<div>").attr("class", "back").appendTo(inside);

    // var img = $("<img>")
    //   .attr(
    //     "src",
    //     "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/codepen-logo.png"
    //   )
    //   .appendTo(back);

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
    var question = new Memorama(data.question_string, data.choices);
  } else {
    var question = new Memorama(
      all_questions.question_string,
      all_questions.choices
    );
  }
  // Render the quiz
  var quiz_container = $("#game");
  question.render(quiz_container);
});
