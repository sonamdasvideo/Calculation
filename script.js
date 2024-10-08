let score = 0;
let currentQuestionIndex = 0;
let questions = [];
let range = [1, 10]; // Default range

document.getElementById('startQuizBtn').addEventListener('click', startQuiz);
document.getElementById('changeDifficultyBtn').addEventListener('click', changeDifficulty);

function startQuiz() {
    const selectedRange = document.getElementById('rangeSelect').value.split('-');
    range = selectedRange.map(Number); // Convert range to numbers
    generateQuestions();
    document.getElementById('rangeSelection').style.display = 'none';
    document.getElementById('quizSection').style.display = 'block';
    showQuestion();
}

function generateQuestions() {
    questions = [];
    for (let i = range[0]; i <= range[1]; i++) {
        questions.push({
            question: `What is ${i} × ${i}?`,
            correctAnswer: i * i,
            options: generateOptions(i * i)
        });
    }
}

function generateOptions(correctAnswer) {
    const options = new Set([correctAnswer]);
    while (options.size < 2) {
        const wrongAnswer = Math.floor(Math.random() * (range[1] ** 2));
        options.add(wrongAnswer);
    }
    return Array.from(options);
}

function showQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    optionsElement.innerHTML = '';
    questionElement.innerText = questions[currentQuestionIndex].question;

    questions[currentQuestionIndex].options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.innerText = option;
        optionDiv.className = 'option';
        optionDiv.addEventListener('click', () => checkAnswer(option));
        optionsElement.appendChild(optionDiv);
    });

    updateScoreboard();
    document.getElementById('changeDifficultyBtn').style.display = 'block'; // Show button
}

function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const options = document.getElementById('options').children;

    for (let option of options) {
        if (Number(option.innerText) === correctAnswer) {
            option.classList.add('correct');
        } else {
            option.classList.add('wrong');
        }
        option.removeEventListener('click', () => checkAnswer(option.innerText)); // Disable further clicks
    }

    if (selectedOption === correctAnswer) {
        score++;
    }
    
    currentQuestionIndex++;
    
    setTimeout(() => {
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    document.getElementById('quizSection').style.display = 'none';
    document.getElementById('rangeSelection').style.display = 'block';
    alert(`Quiz Ended! Your score is ${score} out of ${questions.length}`);
}

function changeDifficulty() {
    const newRange = prompt("Enter new range (e.g. 1-20):");
    if (newRange) {
        const [newStart, newEnd] = newRange.split('-').map(Number);
        range = [newStart, newEnd];
        generateQuestions();
        currentQuestionIndex = 0;
        showQuestion();
    }
}

function updateScoreboard() {
    document.getElementById('scoreboard').innerText = `Score: ${score}`;
}
