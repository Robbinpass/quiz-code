// Global variables
var highScores;
var userScore;
var currentQuestionIndex = 0;
const questionTimeLimit = 90;
var remainingTime;
var correctAnswers = 0;
var finalScore = 0;
var trackRemainingTime;
var isLastQuestion = false;



// High scores
var bestScores = document.getElementById('scores');
// Timer
var remainingTimeDisplay = document.getElementById('timeLeft');


// Main quiz container 
var quizContainer = document.getElementById('quiz-container');

// Elements added to start quiz.
var startHeader = document.createElement('h2');
    startHeader.setAttribute("class", "center");
    startHeader.textContent = "Coding Quiz Challenge";
var startMessage1 = document.createElement('p');
    startMessage1.setAttribute("class", "center start");
    startMessage1.textContent = "Try to answer the following code-related questions within the time limit."
var startMessage2 = document.createElement('p');
    startMessage2.setAttribute("class", "center start");
    startMessage2.textContent = "You will have " + questionTimeLimit + " seconds to answer each question."
var startMessage3 = document.createElement('p');
    startMessage3.setAttribute("class", "center start");
    startMessage3.textContent = "Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
var startQuizButton = document.createElement("button");
    startQuizButton.setAttribute("class", "button start");
    startQuizButton.textContent = "Start Quiz";


// Current question number
var quizQuestionNumber = document.createElement('h4');
// Current question title
var quizQuestion = document.createElement('h2');
// Question answer container with UL list
var quizListContainer = document.createElement('div');
    quizListContainer.setAttribute("class", "list-container");
// List of answers for each question
var quizUl = document.createElement('ul');
    

// Display page feedback determining if answer is true or false
var quizFeedbackContainer = document.createElement('div')    
    quizFeedbackContainer.setAttribute("class", "feedback-container")
var quizFeedback = document.createElement('div');
    quizFeedback.setAttribute('class', "feedback")
var feedbackButton = document.createElement('button');
    feedbackButton.setAttribute('class', 'button');


// Quiz end header
var summaryTitle = document.createElement('h2');    
// Current user score
var summaryScore = document.createElement('h3');
// User initals input to save high score to local storage
var userName = document.createElement('input');
    https://stackoverflow.com/questions/12274748/setting-multiple-attributes-for-an-element-at-once-with-javascript
    Object.assign(userName, {        
        autocomplete: 'none',        
        placeholder: "Initials",
        id: 'initials'
    })
// Unnhide submit score button
var submitScore = document.createElement('button');
    submitScore.innerText = "Submit";
    submitScore.setAttribute('class', 'button');    


// High score title element created
var bestScoresTitle = document.createElement('h3');    
    bestScoresTitle.textContent = "Best Scores";
var bestScoresButtonContainer = document.createElement('div');
    bestScoresButtonContainer.setAttribute('class', 'list-container')

// Go back btn
var bestScoresGoBack = document.createElement('button')
    bestScoresGoBack.setAttribute('class', 'button scores');    
    bestScoresGoBack.textContent = "Go back";
// Clear high Scores btn
var bestScoresClear = document.createElement('button');
    bestScoresClear.setAttribute('class', 'button scores');
    bestScoresClear.textContent = "Clear scores";
