const questions = [];
let score = 0;
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

// Function to generate questions
function generateQuestions(min, max) {
    questions.length = 0; // Clear existing questions
    for (let i = min; i <= max; i++) {
        const questionType = Math.floor(Math.random() * 3); // 0: table, 1: square, 2: cube
        let question, correctAnswer, options;

        switch (questionType) {
            case 0:
                question = `What is ${i} x ${i}?`;
                correctAnswer = i * i;
                break;
            case 1:
                question = `What is ${i} squared?`;
                correctAnswer = i * i;
                break;
            case 2:
                question = `What is ${i} cubed?`;
                correctAnswer = i * i * i;
                break;
        }

        options = [correctAnswer];
        while (options.length < 2) {
            const randomAnswer = Math.floor(Math.random() * (max * max * max));
            if (!options.includes(randomAnswer)) {
                options.push(randomAnswer);
            }
        }

        options = options.sort(() => Math.random() - 0.5); // Shuffle options
        questions.push({ question, options, correctAnswer });
    }
}

// Function to start the quiz
function startQuiz() {
    const range = document.getElementById("rangeSelect").value.split("-");
    const min = parseInt(range[0]);
    const max = parseInt(range[1]);

    generateQuestions(min, max);
    score = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    currentQuestionIndex = 0;
    document.getElementById("rangeSelection").style.display = "none";
    document.getElementById("quizSection").style.display = "block";
    showQuestion();
}

// Function to show a question
function showQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const scoreboard = document.getElementById("scoreboard");

    optionsElement.innerHTML = ""; // Clear previous options
    scoreboard.innerHTML = `Score: ${correctAnswers} Correct, ${incorrectAnswers} Incorrect`;

    if (currentQuestionIndex < questions.length) {
        questionElement.innerText = questions[currentQuestionIndex].question;
        questions[currentQuestionIndex].options.forEach(option => {
            const bubble = document.createElement("div");
            bubble.classList.add("bubble");
            bubble.innerText = option;
            bubble.onclick = () => checkAnswer(option);
            optionsElement.appendChild(bubble);
        });
    } else {
        showScore();
    }
}

// Function to check the answer
function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const bubbles = document.querySelectorAll('.bubble');

    if (selectedOption === correctAnswer) {
        correctAnswers++;
        bubbles.forEach(bubble => {
            if (bubble.innerText == correctAnswer) {
                bubble.classList.add("correct");
            }
        });
    } else {
        incorrectAnswers++;
        bubbles.forEach(bubble => {
            if (bubble.innerText == selectedOption) {
                bubble.classList.add("wrong");
            } else if (bubble.innerText == correctAnswer) {
                bubble.classList.add("correct");
            }
        });
    }

    currentQuestionIndex++;
    setTimeout(() => {
        showQuestion();
    }, 1000);
}

// Function to show the score
function showScore() {
    const scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = `<h2>Your Final Score: ${correctAnswers} Correct, ${incorrectAnswers} Incorrect</h2>`;
    scoreboard.innerHTML += `<button onclick="changeLevel()">Change Level</button>`;
}

// Function to change level
function changeLevel() {
    document.getElementById("rangeSelection").style.display = "block";
    document.getElementById("quizSection").style.display = "none";
}

// Event listener for the start quiz button
document.getElementById("startQuizBtn").onclick = startQuiz;
