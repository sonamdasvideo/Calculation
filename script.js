let correctScore = 0;
let wrongScore = 0;
let questionCount = 0;
let range = 10;
let usedQuestions = new Set();

// Elements
const welcomePage = document.getElementById('welcomePage');
const quizPage = document.getElementById('quizPage');
const endPage = document.getElementById('endPage');
const questionArea = document.getElementById('questionArea');
const optionsArea = document.getElementById('optionsArea');
const correctScoreElement = document.getElementById('correctScore');
const wrongScoreElement = document.getElementById('wrongScore');
const finalScoreElement = document.getElementById('finalScore');
const startQuizButton = document.getElementById('startQuizButton');
const retryQuizButton = document.getElementById('retryQuizButton');
const changeDifficultyButton = document.getElementById('changeDifficulty');
const changeDifficultyEndButton = document.getElementById('changeDifficultyEnd');

// Start Quiz
startQuizButton.addEventListener('click', () => {
  range = document.getElementById('range').value;
  resetQuiz();
  startQuiz();
});

retryQuizButton.addEventListener('click', () => {
  resetQuiz();
  startQuiz();
});

changeDifficultyButton.addEventListener('click', () => {
  changeDifficulty();
});

changeDifficultyEndButton.addEventListener('click', () => {
  changeDifficulty();
});

function resetQuiz() {
  correctScore = 0;
  wrongScore = 0;
  questionCount = 0;
  usedQuestions.clear();
  correctScoreElement.textContent = correctScore;
  wrongScoreElement.textContent = wrongScore;
  endPage.style.display = 'none';
}

function startQuiz() {
  welcomePage.style.display = 'none';
  quizPage.style.display = 'block';
  askQuestion();
}

function changeDifficulty() {
  quizPage.style.display = 'none';
  endPage.style.display = 'none';
  welcomePage.style.display = 'block';
}

function askQuestion() {
  if (questionCount >= 10) {
    endQuiz();
    return;
  }
  
  let num1 = getRandomNumber(1, range);
  let num2 = getRandomNumber(1, range);
  
  while (usedQuestions.has(`${num1}-${num2}`)) {
    num1 = getRandomNumber(1, range);
    num2 = getRandomNumber(1, range);
  }
  
  usedQuestions.add(`${num1}-${num2}`);
  questionArea.textContent = `What is ${num1} x ${num2}?`;
  
  let correctAnswer = num1 * num2;
  let wrongAnswer = correctAnswer + getRandomNumber(1, 10);
  
  let answers = shuffle([correctAnswer, wrongAnswer]);
  
  optionsArea.innerHTML = '';
  answers.forEach((answer) => {
    let optionButton = document.createElement('button');
    optionButton.textContent = answer;
    optionButton.classList.add('option');
    optionButton.style.backgroundColor = 'magenta';
    
    optionButton.addEventListener('click', () => {
      if (answer === correctAnswer) {
        optionButton.classList.add('correct');
        correctScore++;
      } else {
        optionButton.classList.add('wrong');
        wrongScore++;
      }
      updateScore();
      setTimeout(askQuestion, 1000);
    });
    
    optionsArea.appendChild(optionButton);
  });
  
  questionCount++;
}

function updateScore() {
  correctScoreElement.textContent = correctScore;
  wrongScoreElement.textContent = wrongScore;
}

function endQuiz() {
  quizPage.style.display = 'none';
  endPage.style.display = 'block';
  finalScoreElement.textContent = `${correctScore} out of 10`;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
