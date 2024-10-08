let currentQuestion;
let score = 0;
let correctCount = 0;
let incorrectCount = 0;
let totalQuestions = 5; // Set the number of questions per quiz
let questionsHistory = []; // Store questions history

// Load sound effects
const correctSound = new Audio('correct-sound.mp3'); // Path to correct answer sound
const incorrectSound = new Audio('incorrect-sound.mp3'); // Path to incorrect answer sound

document.getElementById('startQuizBtn').addEventListener('click', function() {
    const selectedRange = document.getElementById('rangeSelect').value.split('-');
    const min = parseInt(selectedRange[0]);
    const max = parseInt(selectedRange[1]);

    // Hide range selection and show quiz area
    document.getElementById('rangeSelection').style.display = 'none';
    document.getElementById('quizArea').style.display = 'block';
    document.getElementById('resultArea').innerHTML = '';
    score = 0;
    correctCount = 0;
    incorrectCount = 0;
    
    updateScoreBoard(); // Update score board

    // Start the quiz
    nextQuestion(min, max);
});

// Function to update the score board
function updateScoreBoard() {
    document.getElementById('score').innerText = score;
    document.getElementById('correctCount').innerText = correctCount;
    document.getElementById('incorrectCount').innerText = incorrectCount;
}

document.getElementById('endQuizBtn').addEventListener('click', function() {
    // Show results and reset the game
    showResults();
});

function nextQuestion(min, max) {
    // Generate a random number and a type of question
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    const questionType = Math.floor(Math.random() * 3); // 0: Multiplication, 1: Square, 2: Cube
    
    let questionText;
    let correctAnswer;
    
    if (questionType === 0) { // Multiplication
        const multiplier = Math.floor(Math.random() * 10) + 1; // Random multiplier 1-10
        correctAnswer = num * multiplier;
        questionText = `What is ${num} x ${multiplier}?`;
    } else if (questionType === 1) { // Square
        correctAnswer = num * num;
        questionText = `What is the square of ${num}?`;
    } else { // Cube
        correctAnswer = num * num * num;
        questionText = `What is the cube of ${num}?`;
    }
    
    // Generate two wrong answers
    const wrongAnswers = [];
    while (wrongAnswers.length < 1) {
        const wrongAnswer = correctAnswer + (Math.floor(Math.random() * 10) - 5); // Slightly modify the correct answer
        if (wrongAnswer !== correctAnswer && !wrongAnswers.includes(wrongAnswer)) {
            wrongAnswers.push(wrongAnswer);
        }
    }
    
    // Combine answers
    const options = [correctAnswer, ...wrongAnswers];
    options.sort(() => Math.random() - 0.5); // Shuffle options

    // Store the current question history
    questionsHistory.push({ question: questionText, correctAnswer: correctAnswer });

    // Display question and options
    document.getElementById('question').innerHTML = questionText;
    const optionsList = document.getElementById('options');
    optionsList.innerHTML = '';
    
    options.forEach(option => {
        const li = document.createElement('li');
        li.innerHTML = `<div class="option">${option}</div>`;
        optionsList.appendChild(li);
    });
    
    // Add click event to each option
    const optionBubbles = document.querySelectorAll('.option');
    optionBubbles.forEach(bubble => {
        bubble.addEventListener('click', function() {
            const selectedAnswer = parseInt(this.innerHTML);
            const correctBubble = this;

            if (selectedAnswer === correctAnswer) {
                score++;
                correctCount++;
                correctSound.play(); // Play correct sound
                correctBubble.classList.add('green'); // Change to green for correct answer
            } else {
                incorrectSound.play(); // Play incorrect sound
                correctBubble.classList.add('red'); // Change to red for wrong answer
                incorrectCount++;
            }
            
            updateScoreBoard(); // Update score board
            
            // Change all options to be unclickable
            optionBubbles.forEach(option => option.style.pointerEvents = 'none');
            
            // Load next question after a short delay
            setTimeout(() => {
                nextQuestion(min, max); // Load next question
            }, 1000); // Adjust time as needed
        });
    });
}

function showResults() {
    // Hide quiz area and display results
    document.getElementById('quizArea').style.display = 'none';
    const resultArea = document.getElementById('resultArea');
    resultArea.style.display = 'block';

    let resultHTML = `<h2>Quiz Summary</h2>`;
    resultHTML += `<p>Total Score: ${score}</p>`;
    resultHTML += `<p>Correct Answers: ${correctCount}</p>`;
    resultHTML += `<p>Incorrect Answers: ${incorrectCount}</p>`;
    
    questionsHistory.forEach((item, index) => {
        resultHTML += `<p>Question ${index + 1}: ${item.question}<br>
                       Correct Answer: ${item.correctAnswer}</p>`;
    });

    resultArea.innerHTML = resultHTML;
}
