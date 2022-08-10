const API_KEY = '5ef6cbd386274b5949af86a25342cc9d'
const weatherFormSelector = document.querySelector('.weather_form')
const weatherInputSelector = document.querySelector('.weather_input')

const init = () => {
	const defaultCity = 'London'

	getWeatherData(defaultCity).then((data) => {
		createWeatherContent(data)
	})
}

const getWeatherData = async (city) => {
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
	)
	const result = await response.json()

	console.log(result, 'RES')
	return result
}

const createWeatherContent = (weatherData) => {
	console.log(weatherData, 'QEQWE')
}

weatherFormSelector.addEventListener('submit', (e) => {
	e.preventDefault()

	const inputValue = weatherInputSelector.value

	if (inputValue) {
		getWeatherData(inputValue).then((data) => {
			createWeatherContent(data)
		})
	}

	weatherInputSelector.value = ''
})

// init()
