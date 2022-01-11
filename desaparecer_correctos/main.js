var all_questions = {
  question_string: "¿Qué resultado da 30?",
  choices: {
    correct: ["22+10"],
    wrong: ["15+15", "12+18", "35-5", "22-8", "14+16", "25+5", "48-18"],
  },
};

var Quiz = function (quiz_name) {
  // Private fields for an instance of a Quiz object.
  this.quiz_name = quiz_name;
  // This one will contain an array of Question objects in the order that the questions will be presented.
  this.question = {};
  this.score = null;
};

Quiz.prototype.add_question = function (question) {
  this.question = question;
};

Quiz.prototype.render = function (container) {
  var self = this;
  $("#quiz-name").text(this.quiz_name);
  var question_container = $("<div>")
    .attr("id", "question")
    .insertAfter("#quiz-name");
  self.question.render(question_container);

  // Add a listener on the questions container to listen for user select changes. This is for determining whether we can submit answers or not.
  question_container.bind("user-select-change", function () {
    if (self.question.user_choice_index == self.question.correct_choice_index) {
      self.score = 1;
      $("#choices-" + self.question.user_choice_index + " + label").css(
        "background-color",
        "#e74c3c"
      );
    } else {
      // self.score = 0;
      $("#choices-" + self.question.user_choice_index + " + label")
        .css("background-color", "#2ecc71")
        .css("visibility", "hidden")
        .css("opacity", "0")
        .css("transition", "visibility 0s 1s, opacity 1s linear");
    }
  });
};

var Question = function (question_string, correct_choice, wrong_choices) {
  // Private fields for an instance of a Question object.
  this.question_string = question_string;
  this.choices = [];
  this.user_choice_index = null; // Index of the user's choice selection

  // Random assign the correct choice an index
  this.correct_choice_index = Math.floor(
    Math.random() * wrong_choices.length + 1
  );

  // Fill in this.choices with the choices
  var number_of_choices = wrong_choices.length + correct_choice.length;
  for (var i = 0; i < number_of_choices; i++) {
    if (i === this.correct_choice_index) {
      this.choices[i] = correct_choice;
    } else {
      // Randomly pick a wrong choice to put in this index
      var wrong_choice_index = Math.floor(Math.random() * wrong_choices.length);
      this.choices[i] = wrong_choices[wrong_choice_index];

      // Remove the wrong choice from the wrong choice array so that we don't pick it again
      wrong_choices.splice(wrong_choice_index, 1);
    }
  }
};

// A function that you can enact on an instance of a question object. This function is called render() and takes in a variable called the container, which is the <div> that I will render the question in. This question will "return" with the score when the question has been answered.
Question.prototype.render = function (container) {
  // For when we're out of scope
  var self = this;
  var div = $("<div>").attr("id", "h2").appendTo("#quiz-name");
  // Fill out the question label
  var question_string_h2;
  if (container.children("h2").length === 0) {
    question_string_h2 = $("<h2>").appendTo(div);
  } else {
    question_string_h2 = container.children("h2").first();
  }
  question_string_h2.text(this.question_string);

  // Clear any radio buttons and create new ones
  if (container.children("input[type=radio]").length > 0) {
    container.children("input[type=radio]").each(function () {
      var radio_button_id = $(this).attr("id");
      $(this).remove();
      container.children("label[for=" + radio_button_id + "]").remove();
    });
  }
  var divChoice = $("<div>").attr("id", "choices").appendTo(container);

  for (var i = 0; i < this.choices.length; i++) {
    // Create the radio button
    var choice_radio_button = $("<input>")
      .attr("id", "choices-" + i)
      .attr("type", "radio")
      .attr("name", "choices")
      .attr("value", i)
      .attr("checked", i === this.user_choice_index)
      .appendTo(divChoice);

    // Create the label
    var choice_label = $("<label>")
      .text(this.choices[i])
      .attr("for", "choices-" + i)
      .appendTo(divChoice);
  }

  // Add a listener for the radio button to change which one the user has clicked on
  $("input[name=choices]").change(function (index) {
    var selected_radio_button_value = $("input[name=choices]:checked").val();

    // Change the user choice index
    //self.user_choice_index = parseInt(selected_radio_button_value.substr(selected_radio_button_value.length - 1, 1));
    self.user_choice_index = selected_radio_button_value;
    // Trigger a user-select-change
    container.trigger("user-select-change");
  });
};

function getData() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const data = JSON.parse(urlParams.get("question"));
  return data;
}

// "Main method" which will create all the objects and render the Quiz.
$(document).ready(function () {
  // Create an instance of the Quiz object
  var quiz = new Quiz("ELIMINA EL CORRECTO");
  var data = getData();
  if (data != null) {
    var question = new Question(
      data.question_string,
      data.choices.correct,
      data.choices.wrong
    );
  } else {
    // Create Question objects from all_questions and add them to the Quiz object
    var question = new Question(
      all_questions.question_string,
      all_questions.choices.correct,
      all_questions.choices.wrong
    );
  }
  // Add the question to the instance of the Quiz object that we created previously
  quiz.add_question(question);

  // Render the quiz
  var quiz_container = $("#quiz");
  quiz.render(quiz_container);
});
