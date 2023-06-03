// Global variables to attach time, score, and content items to JS script.
var timerEl =document.getElementById('time');
var highScoreButton = document.getElementById('hscore-button');
var quizContent = document.getElementById('quiz-content');


const questionList = 0;
var timer = 0;
var isEndGame = false;


// Array of questions; will be called using the callQuestion funtion.
var questionArray = [{
    question: 'Inside which HTML element do you put your JS file?',
    choices: ['<js>', '<JavaScript>', '<script>',],
    answer: "<script>",
},
{
    question: 'Which funtion is used to convert an object into a JSON string?',
    choices: ['stringify', 'parse', 'text.json', 'None of the Above'],
    answer: "stringify",
},
{   question: 'Which of the following is not a JavaScript framework?',
    choices: ['React', 'Vue', 'Node', 'Alexa'],
    answer: "Alexa",
},
{
    question: 'How do you declare an asynchronis funcion in JavaScipt?',
    choices: ['await','setAsync', 'async', 'None of the Above'],
    answer: "async",
},
{
    question: 'How do you write comments in Javascript?',
    choices: ['**', '#/', '//', '##'],
    answer: "//"
},

]