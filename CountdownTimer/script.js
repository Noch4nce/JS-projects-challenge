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
    hoursSelector.innerHTML = shapeTime(hours.toString())
    minsSelector.innerHTML = shapeTime(minutes.toString())
    secondsSelector.innerHTML = shapeTime(seconds.toString())
}

const shapeTime = (time) => {
    return time < 10 ? `0${time}` : time
}

setInterval(countdownTimer, 1000)
