let questions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

document.getElementById('startQuizBtn').addEventListener('click', startQuiz);
document.getElementById('retryQuizBtn').addEventListener('click', retryQuiz);
document.getElementById('changeDifficultyBtn').addEventListener('click', showWelcomePage);

function startQuiz() {
    const rangeMin = parseInt(document.getElementById('rangeMin').value);
    const rangeMax = parseInt(document.getElementById('rangeMax').value);
    
    if (isNaN(rangeMin) || isNaN(rangeMax) || rangeMin >= rangeMax) {
        alert('Please enter a valid range!');
        return;
    }

    questions = generateQuestions(rangeMin, rangeMax);
    currentQuestionIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;

    document.getElementById('welcomePage').style.display = 'none';
    document.getElementById('quizPage').style.display = 'block';
    showNextQuestion();
}

function generateQuestions(min, max) {
    const uniqueQuestions = new Set();

    while (uniqueQuestions.size < 10) {
        const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
        const num2 = Math.floor(Math.random() * (max - min + 1)) + min;

        if (num1 !== num2) {
            uniqueQuestions.add(`${num1} x ${num2}`);
        }
    }

    return Array.from(uniqueQuestions);
}

function showNextQuestion() {
    if (currentQuestionIndex >= questions.length) {
        finishQuiz();
        return;
    }

    const question = questions[currentQuestionIndex].split(' x ');
    const num1 = parseInt(question[0]);
    const num2 = parseInt(question[1]);

    const correctAnswer = num1 * num2;
    const wrongAnswer = generateConfusingWrongAnswer(correctAnswer);

    document.getElementById('questionText').innerText = `What is ${num1} x ${num2}?`;
    document.getElementById('questionNumber').innerText = currentQuestionIndex + 1;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    const options = shuffle([correctAnswer, wrongAnswer]);
    options.forEach(option => {
        const optionBtn = document.createElement('button');
        optionBtn.innerText = option;
        optionBtn.addEventListener('click', () => checkAnswer(option, correctAnswer));
        optionsContainer.appendChild(optionBtn);
    });
}

function generateConfusingWrongAnswer(correctAnswer) {
    const correctUnitDigit = correctAnswer % 10;
    let wrongAnswer;

    do {
        const randomDifference = Math.floor(Math.random() * 10) + 1; // Ensure difference is between 1 and 10
        wrongAnswer = correctAnswer + (Math.random() < 0.5 ? -randomDifference : randomDifference);
    } while (wrongAnswer % 10 !== correctUnitDigit || wrongAnswer === correctAnswer); // Ensure same unit digit and not equal to correct answer

    return wrongAnswer;
}

function checkAnswer(selected, correct) {
    const buttons = document.querySelectorAll('#options button');
    buttons.forEach(button => {
        if (parseInt(button.innerText) === correct) {
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }
    });

    if (selected === correct) {
        correctAnswers++;
        document.getElementById('correctAnswers').innerText = correctAnswers;
    } else {
        wrongAnswers++;
        document.getElementById('wrongAnswers').innerText = wrongAnswers;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        showNextQuestion();
    }, 1000);
}

function finishQuiz() {
    document.getElementById('quizPage').style.display = 'none';
    document.getElementById('resultPage').style.display = 'block';
    document.getElementById('finalScore').innerText = `You got ${correctAnswers} out of 10 correct!`;
}

function retryQuiz() {
    document.getElementById('resultPage').style.display = 'none';
    document.getElementById('quizPage').style.display = 'block';
    currentQuestionIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    showNextQuestion();
}

function showWelcomePage() {
    document.getElementById('resultPage').style.display = 'none';
    document.getElementById('welcomePage').style.display = 'block';
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
