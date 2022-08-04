const API_URL =
	'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API =
	'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query='

const mainContainerSelector = document.querySelector('.main_container')
const movieInputSelector = document.querySelector('.movie_input')
const movieFormSelector = document.querySelector('.movie_form')

const init = () => {
	// getMoviesData().then((movieData) => createMovieBlocks(movieData))
}

const getMoviesData = async () => {
	const resp = await fetch(API_URL)
	const result = await resp.json()

	console.log(result, 'result')
	return result
}

const createMovieBlocks = (movieData) => {
	mainContainerSelector.innerHTML = ''

	movieData.results.forEach((movieInf) => {
		const { title, overview, poster_path, vote_average } = movieInf

		const movieBlock = document.createElement('div')
		movieBlock.classList.add('movie_block')

		movieBlock.innerHTML = `
			<img
				src=${IMG_PATH + poster_path}
				alt=${title}
			/>
			<div class="movie_info">
				<h3>${title}</h3>
				<span class="movie_rating">${vote_average}</span>
			</div>
		`

		mainContainerSelector.appendChild(movieBlock)
	})

	changeMovieRatingColor()
}

const changeMovieRatingColor = () => {
	const movieRatingSelector = document.querySelectorAll('.movie_rating')

	movieRatingSelector.forEach((rating) => {
		if (rating.innerText <= 5) {
			rating.classList.add('red')
		} else if (rating.innerText > 5 && rating.innerText < 8) {
			rating.classList.add('orange')
		} else {
			rating.classList.add('green')
		}
	})
}

const searchMovie = async (inputText) => {
	const resp = await fetch(SEARCH_API + inputText)
	const result = await resp.json()

	console.log(result, 'searchMovie')
	return result
}

movieFormSelector.addEventListener('submit', (event) => {
	event.preventDefault()
	let inputText = movieInputSelector.value.trim()

	if (inputText) {
		searchMovie(inputText).then((data) => createMovieBlocks(data))

		movieInputSelector.value = ''
	}
})

init()
