const question = document.querySelector('.que')
const nextQueBtn = document.querySelector('.nextQue')
const variants = document.querySelectorAll('.variant')
const box = document.querySelector('.box')
// const option = document.querySelectorAll('.option')

const quizQuestions =
    ['What is the most used programming language in 2021?', 'Who is the President of US?', 'What does HTML stand for?', 'What year was JavaScript launched?']
const quizOptions =
    ['Java', 'Python', 'JavaScript', 'C', 'Donald Trump', 'Joe Biden', 'Jason Statham', 'Golovach Lena',
        'Cascading Style Sheet', 'Hyper Terminals Motorboats Lamborginis', 'Hypertext Markup Language', 'JavaScript Object Notation',
        '1993', '1995', '2001', 'Voobshe pohyu' ]
let openingIndexQue = 0
let openingIndexVariant = 0

const initQuiz = () => {
    question.innerHTML = quizQuestions[0]

    variants.forEach((variant) => {
        variant.innerHTML = quizOptions[openingIndexVariant]
        openingIndexVariant += 1
    })
}

const nextQuestion = () => {
    const nextIndexQue = openingIndexQue += 1
    let initIndexOption = 0

    if (nextIndexQue >= quizQuestions.length) {
        console.log('stop')
    }

    variants.forEach((variant) => {
        variant.innerHTML = quizOptions[openingIndexVariant]
        openingIndexVariant += 1
    })

    selectOption()
    return question.innerHTML = quizQuestions[nextIndexQue]
}

const selectOption = (id) => {
    variants.forEach((_, i) => {
        document.getElementById(`option${i+1}`).checked = false
    })

    if (id) {
        document.getElementById(id).checked = true
    }
}

initQuiz()
nextQueBtn.addEventListener('click', nextQuestion)

console.log(quizQuestions)