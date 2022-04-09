const question = document.querySelector('.que')
const nextQueBtn = document.querySelector('.nextQue')

const quizQuestions =
    ['What is the most used programming language in 2021?', 'Who is the President of US?', 'What does HTML stand for?', 'What year was JavaScript launched?']
let openingIndexQue = 0

const initQuiz = () => {
    question.innerHTML = quizQuestions[0]
}

const nextQuestion = () => {
    const nextIndexQue = openingIndexQue += 1

    if (nextIndexQue >= quizQuestions.length) {
        console.log('stop')
    }
    console.log(4 > 4)

    return question.innerHTML = quizQuestions[nextIndexQue]
}

initQuiz()
nextQueBtn.addEventListener('click', nextQuestion)

console.log(quizQuestions)