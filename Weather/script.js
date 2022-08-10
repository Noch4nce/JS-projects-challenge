const API_KEY = '5ef6cbd386274b5949af86a25342cc9d'

const init = () => {
	getWeatherData().then((data) => {'data'})
}

const getWeatherData = async () => {
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`
	)
	const result = await response.json()

	console.log(result, "RES")
	return result
}

init()
