let selectedDifficulty;
let correctAnswer;
let score = { correct: 0, incorrect: 0 };
let startTime;
let questionsAsked = [];

function startQuiz() {
    const selectedRange = document.querySelector('input[name="range"]:checked').value;
    selectedDifficulty = parseInt(selectedRange);
    document.getElementById('start-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';
    score.correct = 0;
    score.incorrect = 0;
    questionsAsked = [];
    startTime = Date.now();
    generateQuestion();
}

function generateQuestion() {
    const randomNumber1 = Math.floor(Math.random() * selectedDifficulty) + 1;
    let randomNumber2;

    // Ensure no repeated multiplication like 6x6
    do {
        randomNumber2 = Math.floor(Math.random() * selectedDifficulty) + 1;
    } while (randomNumber1 === randomNumber2);

    const questionType = Math.floor(Math.random() * 3); // 0 = multiplication, 1 = cube, 2 = square
    let question;
    
    if (questionType === 0) {
        question = `What is ${randomNumber1} x ${randomNumber2}?`;
        correctAnswer = randomNumber1 * randomNumber2;
    } else if (questionType === 1) {
        question = `What is ${randomNumber1}^3?`;
        correctAnswer = randomNumber1 * randomNumber1 * randomNumber1;
    } else {
        question = `What is the square of ${randomNumber1}?`;
        correctAnswer = randomNumber1 * randomNumber1;
    }

    // Ensure question is not repeated
    if (questionsAsked.includes(question)) {
        generateQuestion();
        return;
    }
    questionsAsked.push(question);

    document.getElementById('question').innerText = question;
    setOptions(correctAnswer);
}

function setOptions(correct) {
    const wrongAnswer1 = correct + Math.floor(Math.random() * 10) + 1;
    const wrongAnswer2 = correct - Math.floor(Math.random() * 10) - 1;
    const allOptions = [correct, wrongAnswer1, wrongAnswer2].sort(() => Math.random() - 0.5);

    document.getElementById('option1').innerText = allOptions[0];
    document.getElementById('option2').innerText = allOptions[1];
    document.getElementById('option3').innerText = allOptions[2];
}

function checkAnswer(selectedOption) {
    const userAnswer = parseInt(selectedOption.innerText);
    if (userAnswer === correctAnswer) {
        selectedOption.style.backgroundColor = 'green';
        score.correct++;
    } else {
        selectedOption.style.backgroundColor = 'red';
        score.incorrect++;
    }

    updateScoreBoard();

    // Disable options after answer
    document.getElementById('option1').disabled = true;
    document.getElementById('option2').disabled = true;
    document.getElementById('option3').disabled = true;

    setTimeout(() => {
        selectedOption.style.backgroundColor = '';
        generateQuestion();
        resetOptions();
    }, 1000);
}

function resetOptions() {
    document.getElementById('option1').disabled = false;
    document.getElementById('option2').disabled = false;
    document.getElementById('option3').disabled = false;
}

function updateScoreBoard() {
    document.getElementById('correct-score').innerText = `Correct: ${score.correct}`;
    document.getElementById('incorrect-score').innerText = `Incorrect: ${score.incorrect}`;
}

function changeDifficulty() {
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('start-page').style.display = 'block';
}

document.getElementById('option1').addEventListener('click', function() {
    checkAnswer(this);
});
document.getElementById('option2').addEventListener('click', function() {
    checkAnswer(this);
});
document.getElementById('option3').addEventListener('click', function() {
    checkAnswer(this);
});
