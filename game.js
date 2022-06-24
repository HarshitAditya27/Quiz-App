const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Who created Apple',
        choice1: 'Bill Gates',
        choice2: 'Steve Jobs',
        choice3: 'Mark Zuckerberg',
        choice4: 'Larry Page',
        answer: 2,
    },
    {
        question: 'Who founded GitHub?',
        choice1: 'Sergey Brin',
        choice2: 'Sundar Pichai',
        choice3: 'Alexis Ohanian',
        choice4: 'Tom Preston-Werner',
        answer: 4,
    },
    {
        question: 'What is full form of API',
        choice1: 'Application Programming Interface',
        choice2: 'Allo Patatha Idly 😜',
        choice3: 'Application Pragmatic Infrastructure',
        choice4: 'Angel Pro Invester',
        answer: 1,
    },
    {
        question: 'Which of the following tool is used for API testing?',
        choice1: 'GitHub',
        choice2: 'Visual Studio Code',
        choice3: 'Postman',
        choice4: 'VLC media player',
        answer: 3,
    }
]

const score_points = 100;
const max_questions = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > max_questions) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${max_questions}`;
    progressBarFull.style.width = `${(questionCounter / max_questions) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        if (classToApply === 'correct') {
            incrementScore(score_points);
        }
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000)
    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();