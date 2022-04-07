const daysSelector = document.querySelector(".days")
const hoursSelector = document.querySelector(".hours")
const minsSelector = document.querySelector(".mins")
const secondsSelector = document.querySelector(".secs")

// const seconds = new Date().getSeconds()
const seconds = 22
secondsSelector.innerHTML = seconds - 1

const subtractDate = () => {
    const startNewYearDate = new Date("1 Jan 2023")
    const currentDate = new Date()
    // const a = new Date(currentDate - startNewYearDate)
    const diff = (startNewYearDate - currentDate) / 1000
    const minutes = Math.floor(diff / 60) % 60
    const hours = Math.floor(diff / 3600) % 24
    const days = Math.floor(diff / 3600 / 24)
    const seconds = Math.floor(diff % 60)


    console.log(minutes)
}
setInterval(subtractDate, 1000)

// const intr = setInterval(() => {
//     secondsSelector.textContent = state += 1
//     start++
//     if (start === 5) {
//         console.log('stop')
//         clearInterval(intr)
//     }
// }, 1000)

