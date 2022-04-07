const daysSelector = document.querySelector(".days")
const hoursSelector = document.querySelector(".hours")
const minsSelector = document.querySelector(".mins")
const secondsSelector = document.querySelector(".secs")

const countdownTimer = () => {
    const startNewYearDate = new Date("1 Jan 2023")
    const currentDate = new Date()

    const diff = (startNewYearDate - currentDate) / 1000
    const days = Math.floor(diff / 3600 / 24)
    const hours = Math.floor(diff / 3600) % 24
    const minutes = Math.floor(diff / 60) % 60
    const seconds = Math.floor(diff % 60)

    daysSelector.innerHTML = days.toString()
    hoursSelector.innerHTML = hours.toString()
    minsSelector.innerHTML = minutes.toString()
    secondsSelector.innerHTML = seconds.toString()
}

setInterval(countdownTimer, 1000)
