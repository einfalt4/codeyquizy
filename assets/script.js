//established variables from HTML
var title = document.querySelector("#title");
var start = document.querySelector("#start");
var timer = document.querySelector("#timer");
var score = document.querySelector("#score");
var directions = document.querySelector("#directions");
var question = document.querySelector("#question");
var answers = document.querySelector("#answers");
var scorelistEl = document.querySelector(".scorelist");
var nameInput = document.querySelector("#name-input");
const finalEl = document.querySelector("#high-score-page"); 
const highscoresEl = document.querySelector("#scoringEnd");
let scoreList = [];
let initialsInput = document.querySelector("#initials")
let goBackBtn = document.querySelector("#goBack");
let clearScrBtn = document.querySelector("#clearScores");
let submitScore = document.querySelector("#submit-score"); 
let viewScrBtn = document.querySelector("#view-scores");
var msgDiv = document.querySelector("#msg");
var time = 50;
var questionsEl = document.querySelector(".center");
let questionEl = document.querySelector("#q");
let questionCount = 0;
const correctWrong = document.querySelector("#right-wrong");
const questionAnswerOne = document.querySelector("#q-answer-one");
const questionAnswerTwo = document.querySelector("#q-answer-two");
const questionAnswerThree = document.querySelector("#q-answer-three");
const questionAnswerFour = document.querySelector("#q-answer-four");
const ansButton = document.querySelectorAll("button.answerbutton")
//webpage prior to quiz
timer.textContent = ("Time : " + time);
question.style.display = "none";
answers.style.display = "none";
finalEl.style.display = "none";
highscoresEl.style.display = "none";
//quiz questions
const questions = [
    {
    q: "A very useful tool used during development and debugging for printing content to the debugger is?",
    answers: ["a1. javascript", "a2. terminal/bash", "a3. for loops", "a4. console.log"],
    correctAnswer: "3"
},
    { 
    q: "Commonly used data typed DO NOT include:", 
    answers: ["a1. strings", "a2. booleans", "a3. alerts", "a4. numbers"],
    correctAnswer: "2"
},
    { 
    q: "The condition in an if/else statement is enclosed with ____?", 
    answers: ["a1. quotes", "a2. curly brackets", "a3. parenthesis", "a4. square brackets"],
    correctAnswer: "1"
},
    { 
    q: "Arrays in Javascript can be used to store?", 
    answers: ["a1. numbers and strings", "a2. other arrays", "a3. booleans", "a4. all of the above"],
    correctAnswer: "3"
},
    { 
    q: "String values must be inclosed within ____ when being assigned to variables:", 
    answers: ["a1. commas", "a2. curly brackets", "a3. quotes", "a4. parenthesis"],
    correctAnswer: "2"
}
];
// quiz start function
function setTime() {
    let timerInterval = setInterval(function () {
        time--;
        timer.textContent = ("Time : " + time);

        if (time === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            answers.style.display = "none";
            finalEl.style.display = "block";
            question.style.display = "none";
            score.textContent = time;
        }
    }, 1000);
}
// begin quiz function
function startQuiz() {
    title.style.display = "none";
    question.style.display = "block";
    questionCount = 0;
    start.style.display = "none";
    answers.style.display = "block";
    setTime();
    setQuestion(questionCount);
}

    // questions and answers display
    function setQuestion(id) {
        if(id < questions.length) {
        question.textContent = questions[id].q;
        questionAnswerOne.textContent = questions[id].answers[0];
        questionAnswerTwo.textContent = questions[id].answers[1];
        questionAnswerThree.textContent = questions[id].answers[2];
        questionAnswerFour.textContent = questions[id].answers[3];
    }
}

// check answer function
function checkAnswer(event) {
    event.preventDefault();

    //correct or incorrect element
    correctWrong.style.display = "block";
    let p = document.createElement("p");
    correctWrong.appendChild(p);

    // time remaining
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    // condtional statements
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } 
   
     // conditional statements
    else if (questions[questionCount].correctAnswer !== event.target.value) {
        time = time - 10;
        p.textContent = "Incorrect!";
    }

    if (questionCount < questions.length) {
    questionCount++;
}
setQuestion(questionCount);
}

// final score and add initials
function addScore(event) {
    event.preventDefault();

    finalEl.style.display ="none";
    highscoresEl.style.display = "block";
    answers.style.display = "none";
    questions.style.display = "none";
    submitScore.style.display = "block";
    

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: time });

    // list for high score
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });

      scorelistEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scorelistEl.append(li);
    }

    // storing score
    storeScores();
    displayScores();
}
// allegedly setting up localStorage
function storeScores() {
    localStorage.setItem("score", JSON.stringify(score));
}

function displayScores() {
    // the not working parse
    let storedScoreList = JSON.parse(localStorage.getItem("score"));

    // should be going into local array
    if (storedScoreList !== null) {
        score = storedScoreList;
    }
}

function clearScores() {
    localStorage.clear();
    scorelistEl.innerHTML="";
}
// begin quiz
start.addEventListener("click", startQuiz);
// checking answer
ansButton.forEach(item => {
    item.addEventListener('click', checkAnswer);
});
// record score
submitScore.addEventListener("click", addScore);
// go back to main page
goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    start.style.display = "block";
    time = 50;
    timer.textContent = `Time:${time}s`;
    answers.style.display = "none";
    question.style.display = "none";
    finalEl.style.display = "none";
});

// clear all scores
clearScrBtn.addEventListener("click", clearScores);

// high score alert (not working)
highscoresEl.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } 
    else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } 
    
    else {
        return alert("Try and be the best!");
    }
});
