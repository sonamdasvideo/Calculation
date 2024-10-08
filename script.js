let currentQuestion;
let score = 0;
let totalQuestions = 5; // Set the number of questions per quiz

document.getElementById('startQuizBtn').addEventListener('click', function() {
    const selectedRange = document.getElementById('rangeSelect').value.split('-');
    const min = parseInt(selectedRange[0]);
    const max = parseInt(selectedRange[1]);

    // Hide range selection and show quiz area
    document.getElementById('rangeSelection').style.display = 'none';
    document.getElementById('quizArea').style.display = 'block';
    document.getElementById('resultArea').innerHTML = '';
    score = 0;

    // Start the quiz
    nextQuestion(min, max);
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

    // Display question and options
    document.getElementById('question').innerHTML = questionText;
    const optionsList = document.getElementById('options');
    optionsList.innerHTML = '';
    
    options.forEach(option => {
        const li = document.createElement('li');
        li.innerHTML = `<button class="option">${option}</button>`;
        optionsList.appendChild(li);
    });
    
    // Add click event to each option
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (parseInt(this.innerHTML) === correctAnswer) {
                score++;
                alert('Correct!');
            } else {
                alert(`Wrong! The correct answer was ${correctAnswer}.`);
            }
            document.getElementById('resultArea').innerHTML = `Score: ${score}/${totalQuestions}`;
            nextQuestion(min, max); // Load next question
        });
    });
}

// Optional: You can reset the quiz or add more features as needed
