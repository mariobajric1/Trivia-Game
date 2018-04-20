var questions = [
  {
    question: "When was Mario's first game?",
    choices: [
      "Super Mario World",
      "Super Mario Galaxy",
      "Super Mario Bros.",
      "Mario vs. Bowser"
    ],
    answer: "Super Mario Bros.",
    image: "assets/images/1.jpg"
  },
  {
    question: "Who is Mario's #1 Enemy",
    choices: ["Luigi", "Bowser", "Goomba", "Peach"],
    answer: "Bowser",
    image: "assets/images/2.gif"
  },
  {
    question: "This game was the first Super Mario in 3d...",
    choices: [
      "Super Mario Land",
      "Super Smash Bros.",
      "Yoshi's Island",
      "Super Mario 64"
    ],
    answer: "Super Mario 64",
    image: "assets/images/3.jpg"
  },
  {
    question: "It's a Me...",
    choices: ["Mario!", "Luigi", "Toad", "Yoshi"],
    answer: "Mario!",
    image: "assets/images/4.jpg"
  },
  {
    question: "Where can I find Mario getting a sunburn?",
    choices: ["Koopa Cape", "Peach's Castle", "Level 1-1", "Delfino Plaza"],
    answer: "Delfino Plaza",
    image: "assets/images/5.jpg"
  }
];
var gameDiv = $("#game");
var timerStart = 30;
var timer;
var game = {
  questions: questions,
  questNumb: 0,
  counter: timerStart,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    this.counter--;
    $("#seconds").text(this.counter);
    if (this.counter === 0) {
      this.outOfTime();
    }
  },

  load: function() {
    timer = setInterval(this.countdown.bind(this), 1000);
    gameDiv.html("<h2>" + questions[this.questNumb].question + "</h2>");
    for (var i = 0; i < questions[this.questNumb].choices.length; i++) {
      gameDiv.append(
        "<button class='but' id='button' data-name='" +
          questions[this.questNumb].choices[i] +
          "'>" +
          questions[this.questNumb].choices[i] +
          "</button>"
      );
    }
  },

  next: function() {
    this.counter = window.timerStart;
    $("#seconds").text(this.counter);
    this.questNumb++;
    this.load.bind(this)();
  },

  outOfTime: function() {
    clearInterval(window.timer);

    $("#seconds").text(this.counter);

    gameDiv.html("<h2>No time Left!</h2>");
    gameDiv.append(
      "<h2>The Right Answer was: " + questions[this.questNumb].answer
    );
    gameDiv.append(
      "<img id='pic' src='" + questions[this.questNumb].image + "' />"
    );

    if (this.questNumb === questions.length - 1) {
      setTimeout(this.tally, 3 * 1000);
    } else {
      setTimeout(this.next, 3 * 1000);
    }
  },

  tally: function() {
    clearInterval(window.timer);

    gameDiv.html("<h2>All done, heres how you did!</h2>");

    $("#seconds").text(this.counter);

    gameDiv.append("<h3>Correct Answers: " + this.correct + "</h3>");
    gameDiv.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    gameDiv.append(
      "<h3>Unanswered: " +
        (questions.length - (this.incorrect + this.correct)) +
        "</h3>"
    );
    gameDiv.append("<br><button id='start-over'>Start Over?</button>");
  },

  chosen: function(x) {
    clearInterval(window.timer);
    if ($(x.target).attr("data-name") === questions[this.questNumb].answer) {
      this.answeredRight();
    } else {
      this.answeredWrong();
    }
  },

  answeredWrong: function() {
    this.incorrect++;

    clearInterval(window.timer);

    gameDiv.html("<h2>Sorry!</h2>");
    gameDiv.append(
      "<h3>The Right Answer was: " +
        questions[this.questNumb].answer +
        "</h3>"
    );
    gameDiv.append("<img src='" + questions[this.questNumb].image + "' />");

    if (this.questNumb === questions.length - 1) {
      setTimeout(this.tally.bind(this), 3 * 1000);
    } else {
      setTimeout(this.next.bind(this), 3 * 1000);
    }
  },

  answeredRight: function() {
    clearInterval(window.timer);

    this.correct++;

    gameDiv.html("<h2>Nice Choice!</h2>");
    gameDiv.append("<img src='" + questions[this.questNumb].image + "' />");

    if (this.questNumb === questions.length - 1) {
      setTimeout(this.tally.bind(this), 3 * 1000);
    } else {
      setTimeout(this.next.bind(this), 3 * 1000);
    }
  },

  reset: function() {
    this.questNumb = 0;
    this.counter = timerStart;
    this.correct = 0;
    this.incorrect = 0;
    this.load();
  }
};

$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".but", function(e) {
  game.chosen.bind(game, e)();
});

$(document).on("click", "#start", function() {
  $("#section").prepend(
    "<h2>Time Left: <span id='seconds'>30</span> Seconds</h2>"
  );
  game.load.bind(game)();
});
