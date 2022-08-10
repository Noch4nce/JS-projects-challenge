const API_KEY = '5ef6cbd386274b5949af86a25342cc9d'
const weatherFormSelector = document.querySelector('.weather_form')
const weatherInputSelector = document.querySelector('.weather_input')
const weatherCityNameSelector = document.querySelector('.weather_city-name')
const weatherBlockSelector = document.querySelector('.weather_block')

const init = () => {
	const defaultCity = 'London'

	getWeatherData(defaultCity).then((data) => {
		createWeatherContent(data)
	})
}

const getWeatherData = async (city) => {
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
	)
	const result = await response.json()

	console.log(result, 'RES')
	return result
}

const createWeatherContent = (weatherData) => {
	weatherBlockSelector.innerHTML = ''

	const { name, main, weather, wind, visibility } = weatherData
	const weatherTemp = Math.floor(main.temp)
	const weatherWind = Math.round(wind.speed)
	const weatherContent = document.createElement('div')
	weatherContent.classList.add('weather_content')

	weatherCityNameSelector.innerText = name

	weatherContent.innerHTML = `
		<div>
			<div class="weather_temp">
				<strong>${weatherTemp}&#8451;</strong>

				<img
					src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png"
					alt="${weather.description}"
				/>
			</div>
			<small>${weather[0].description}</small>
		</div>

		<div class="weather_info">
			<span>Humidity: ${main.humidity}%</span>
			<span>Wind: ${weatherWind} m/s</span>
			<span>Visibility: ${visibility} m</span>
		</div>
	`

	weatherBlockSelector.appendChild(weatherContent)
}

weatherFormSelector.addEventListener('submit', (e) => {
	e.preventDefault()

	const inputValue = weatherInputSelector.value.trim()

	if (inputValue) {
		getWeatherData(inputValue).then((data) => {
			createWeatherContent(data)
		})
	}

	weatherInputSelector.value = ''
})

init()
