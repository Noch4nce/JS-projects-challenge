const question = document.querySelector('.que')
const nextQueBtn = document.querySelector('.nextQue')
const variants = document.querySelectorAll('.variant')
const option = document.querySelectorAll('.option')
const completion = document.querySelector('.completion')
const quizQue = document.querySelector('.quizQue')
const correctAnswersSelector = document.querySelector('.correctAnswers')
const tryAgainBtn = document.querySelector('.tryAgainBtn')

const quizQuestions =
    ['What is the most used programming language in 2021?', 'Who is the President of US?', 'What does HTML stand for?', 'What year was JavaScript launched?']
const quizOptions =
    ['Java', 'Python', 'JavaScript', 'C', 'Donald Trump', 'Joe Biden', 'Jason Statham', 'Golovach Lena',
        'Cascading Style Sheet', 'Hyper Terminals Motorboats Lamborginis', 'Hypertext Markup Language', 'JavaScript Object Notation',
        '1993', '1995', '2001', 'Voobshe pohyu']
const quizAnswers = ['Python', 'Joe Biden', 'Hypertext Markup Language', '1995']

let openingIndexQue = 0
let openingIndexVariant = 0
let optionIndex = 0
let userAnswers = ''
let correctAnswers = 0
let isChecked = false

const initQuiz = () => {
    question.innerHTML = quizQuestions[0]

    variants.forEach((variant) => {
        variant.innerHTML = quizOptions[openingIndexVariant]
        openingIndexVariant += 1
    })

    option.forEach((el) => {
        el.value = quizOptions[optionIndex]
        optionIndex += 1
    })

    if (!isChecked) {
        nextQueBtn.disabled = true
    }
}

const nextQuestion = () => {
    const nextIndexQue = openingIndexQue += 1

    variants.forEach((variant) => {
        variant.innerHTML = quizOptions[openingIndexVariant]
        openingIndexVariant += 1
    })

    option.forEach((el) => {
        el.value = quizOptions[optionIndex]
        optionIndex += 1
    })

    if (quizAnswers.indexOf(userAnswers) !== -1) {
        correctAnswers++
    }
    if (nextIndexQue >= quizQuestions.length) {
        endingQuiz()
    }

    selectOption()
    nextQueBtn.disabled = true
    isChecked= false
    return question.innerHTML = quizQuestions[nextIndexQue]
}

const selectOption = (id, value) => {
    variants.forEach((_, i) => {
        document.getElementById(`option${i+1}`).checked = false
    })

    if (id) {
        document.getElementById(id).checked = true
    }

    userAnswers = value

    if (!isChecked) {
        nextQueBtn.disabled = false
        isChecked = true
    }
}

const endingQuiz = () => {
    correctAnswersSelector.innerHTML = correctAnswers.toString()
    completion.style.display = 'flex'
    quizQue.style.display = 'none'
}

initQuiz()
nextQueBtn.addEventListener('click', nextQuestion)
tryAgainBtn.addEventListener('click', () => {
    document.location.reload()
})
