/**
 * The following script will do the following
 * Dynamically populate or reset all variables
 * Read and write to local storage
 * Dynamically update remaining time for quiz. 
 * Load welcome screen elements
 */
function init() {
    highScores = JSON.parse(localStorage.getItem('high scores'));
        if (!highScores) {
            highScores = [];
        }
    currentQuestionIndex = 0;
    correctAnswers = 0;
    isLastQuestion = false;
    remainingTime = questionTimeLimit * questionsArray.length;
    
    displayRemainingTime()
    showWelcomeScreen();
}

/**
 * Unhide all starting elements
 */
function showWelcomeScreen() { 
    quizContainer.appendChild(startHeader);
    quizContainer.appendChild(startMessage1);
    quizContainer.appendChild(startMessage2);
    quizContainer.appendChild(startMessage3);
    quizContainer.appendChild(startQuizButton);    
}

/**
 * Display best scores
 
 */
function showBestScores() {
    removeAllChildren(quizContainer);
    bestScores.setAttribute("class", "button")
    
    quizContainer.appendChild(bestScoresTitle);
    
    // Iterate through list of best scores stored in local storage.  Append high score information in quiz container
    for (var i = 0; i < highScores.length; i++) {
        var bestScoreItem = document.createElement('div')
            bestScoreItem.textContent = (i + 1) + ". " + highScores[i].initials + " - " + highScores[i].score;
            bestScoreItem.setAttribute('class', 'best-score-item');
            quizContainer.appendChild(bestScoreItem);
    }
    
    quizContainer.appendChild(bestScoresButtonContainer);
    bestScoresButtonContainer.appendChild(bestScoresGoBack);
    bestScoresButtonContainer.appendChild(bestScoresClear);  
}

/**
 * Start the counter that will update remaining time every second
 * Hide the high score button
 * Display quiz questions
 */
function startQuiz() {
    bestScores.setAttribute("class", "button disabled")
    startTimer();
    removeAllChildren(quizContainer);
    displayQuestion();    
}

/**
Display question as well as the UL of possible answers
 */
function displayQuestion() {    
    // Check to see if currentQuestionIndex is not out of range
    if (questionsArray[currentQuestionIndex] != undefined) {
        // Append question elements on first question
        quizQuestionNumber.textContent =  "Question " + (currentQuestionIndex + 1) + "/" + questionsArray.length;
        quizContainer.appendChild(quizQuestionNumber)
    
        quizQuestion.textContent = questionsArray[currentQuestionIndex].question;
        quizContainer.appendChild(quizQuestion);
    
        // Create list elements for the total number of possible answers and append to quiz container
        for (i in questionsArray[currentQuestionIndex].answers) {
            newListItem = document.createElement('li');        
            newListItem.textContent = questionsArray[currentQuestionIndex].answers[i];               
            newListItem.setAttribute("class", "question");      
            quizUl.appendChild(newListItem);        
        }
        quizListContainer.appendChild(quizUl);
        quizContainer.appendChild(quizListContainer)
    }
    else {

        endQuiz();
    }
}

/**
 * @param {clicked list item} event 
 * Check to make sure user clicked on possible answer
 * Check to see if user picked correct answer
 * Apply styling possible answers based on user selection 
 * Show feedback elements
 * Increment question index
 * Disable events for list items
 * Subtract 10 seconds from time remaining if user provides incorrect answer
 * End quiz if user has less than 10 seconds left and provides incorrect answer
 */
function submitAnswer(event) {
    var element = event.target;
    if (element.matches('li')) {
        
        var listItems = quizUl.querySelectorAll('li');
        
        for (item of listItems) {        
            if (item.textContent === element.textContent) {
                if (element.textContent[0] === questionsArray[currentQuestionIndex].questionAnswer) {
                    element.setAttribute("class", "correct disabled")
                    showFeedback(true)
                    correctAnswers++;
                } else {
                    element.setAttribute("class", "incorrect disabled")
                    showFeedback(false)
                    if (remainingTime > 10) {
                        if (!isLastQuestion) {
                            remainingTime-=10;
                        }
                    } else {
                        remainingTime = 0;
                        endQuiz();
                    }
                }
            } else {
                if (item.textContent[0] === questionsArray[currentQuestionIndex].questionAnswer) {
                    item.setAttribute("class", "correct disabled")
                } else {
                    item.setAttribute("class", "disabled");
                }
            }                
        }    
    }
}      

/**
 * @param {correct/incorrect choice as bool} answer 
 * Correct or Incorrect feedback based on user answer
 */
function showFeedback(answer) {
    if (answer) {
        quizFeedback.textContent = "Correct ✔";
    } else {
        quizFeedback.textContent = "Wrong ✖";
    }
    quizFeedbackContainer.appendChild(quizFeedback);   
    
    if (questionsArray[currentQuestionIndex + 1] == undefined) {
        isLastQuestion = true;
        feedbackButton.textContent = "Check Score";           
        clearInterval(trackRemainingTime);
    } else {
        feedbackButton.textContent = "Next question >";
    }
    
    quizFeedbackContainer.appendChild(feedbackButton);
    quizContainer.appendChild(quizFeedbackContainer); 
}

/**
 * End quiz: Remove all quiz container elements
 * clear and reset timer
 * Unhide high score information
 */
function endQuiz() {    
    removeAllChildren(quizContainer);
    clearInterval(trackRemainingTime);    
    showSummaryScreen();    
}


function showSummaryScreen() {
    if (remainingTime > 0) {
        summaryTitle.textContent = "All done!"
    } else {
        summaryTitle.textContent = "Time's up!"
    }
    quizContainer.appendChild(summaryTitle);
    
    finalScore = parseInt((correctAnswers / questionsArray.length) * 100)
    summaryScore.textContent = "Your final score is " + finalScore + "."; 
    
    quizContainer.appendChild(summaryScore);    
    quizContainer.appendChild(userName);
    quizContainer.appendChild(submitScore)
    userName.focus();
}

/**
 * Enter user initials to add to high score leaderboard
 * Sort high score array from highest to lowest saved scores.
 */
function upadateHighScores() {
    // If user entered initials
    if (userName.value.trim()) {
        userScore = {
            initials: userName.value,
            score: finalScore
        }; 
        // Update local array
        highScores.push(userScore);
        // Sort local array
        var sortedScores = highScores.sort((a, b) => {
            if (a.score === b.score) {
                return 0;    
            } else if (a.score > b.score) {
                return -1
            } else {
                return 1
            };
        })
        // Update local storage
        localStorage.setItem("high scores", JSON.stringify(sortedScores));
        // Reset input field
        userName.value = "";
        // Display high score screen
        showBestScores();
    } else {
        // If user did not enter initials
        // Notify user that initials field cannot be empty
        alert("Please enter your initials.")
        // Reset input field
        userName.value = "";
    }
}

/**
 * Remove All Child Nodes
 * @param parent container
 */
function removeAllChildren(parent) {
    parent.innerHTML = ""
}

/**
 * Timer will update remaining time once per second until the timer expires.  Once expired the quiz ends.
 */
function startTimer() {
    trackRemainingTime = setInterval(function() {
        if (remainingTime > 0) {
            remainingTime--;
            displayRemainingTime();
        // End quiz if time reaches zero
        } else {
            endQuiz();
        }     
    }, 1000);
}

/**
 * Time display format
 */
function displayRemainingTime() {
    // If remaining time is greater than one hour
    if (remainingTime >= 3600) {
        remainingTimeDisplay.textContent = parseInt(remainingTime / 3600).toString().padStart(2, '0')
        + ":" 
        + parseInt(remainingTime % 60).toString().padStart(2, '0') 
        + ":" 
        + parseInt(remainingTime % 60).toString().padStart(2, '0');
    } else {
        // If remaining time is less than one hour
        remainingTimeDisplay.textContent = parseInt(remainingTime / 3600).toString().padStart(2, '0')
        + ":" 
        + parseInt(remainingTime / 60).toString().padStart(2, '0') 
        + ":" 
        + parseInt(remainingTime % 60).toString().padStart(2, '0');
    }    
}



// Show high scores
bestScores.addEventListener('click', showBestScores);

// Start button on welcomme page
startQuizButton.addEventListener("click", startQuiz);

// Click on possible question answers to each question
quizUl.addEventListener("click", submitAnswer);

// Button for next question
// Determine and display is user answer is correct or incorrect
feedbackButton.addEventListener("click", function (){
    // Removes all list items from quiz
    removeAllChildren(quizUl)
    // Removes all children from quiz
    removeAllChildren(quizContainer);
    // Updates queston index 
    currentQuestionIndex++;
    // Display next question
    displayQuestion();               
});

// High score submit button after user initals are entered
submitScore.addEventListener('click' , upadateHighScores)

// Clear Scores Button 
bestScoresClear.addEventListener('click', () => {
    // Reset local storage  
    localStorage.removeItem("high scores");
    // Reset high score array
    highScores = [];
    // Show updated content
    showBestScores();
})

// Go back from high score; remove all quiz elements and display the welcome / start quiz page
bestScoresGoBack.addEventListener('click', () => {
    removeAllChildren(quizContainer);
    init();
})

// Quiz init
init()
