const API_URL =
	'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API =
	'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query='

const mainContainerSelector = document.querySelector('.main_container')

const init = () => {
	getMoviesData().then((movieData) => createMovieBlocks(movieData))
}

const getMoviesData = async () => {
	const resp = await fetch(API_URL)
	const result = await resp.json()

	console.log(result, 'result')
	return result
}

const createMovieBlocks = (movieData) => {
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
				${changeMovieRatingColor(vote_average)}
<!--				<span class="movie_rating">${vote_average}</span>-->
			</div>
		`
		const movieRatingSelector = document.querySelector('.movie_rating')

		// if (vote_average <= 5) {
		// 	movieRatingSelector.style.color = 'red'
		// }
		//
		// if (vote_average > 5 && vote_average < 8) {
		// 	movieRatingSelector.style.color = 'yellow'
		// }
		//
		// if (vote_average >= 8) {
		// 	movieRatingSelector.style.color = 'green'
		// }

		mainContainerSelector.appendChild(movieBlock)
	})

	// changeMovieRatingColor(movieData)
}

const changeMovieRatingColor = (vote_average) => {
	if (vote_average <= 5) {
		return `<span class="movie_rating red">${vote_average}</span>`
	} else if (vote_average > 5 && vote_average < 8) {
		return `<span class="movie_rating yellow">${vote_average}</span>`
	} else if (vote_average >= 8) {
		return `<span class="movie_rating green">${vote_average}</span>`
	}
}

// const changeMovieRatingColor = (movieData) => {
// 	const movieRatingSelector = document.querySelectorAll('.movie_rating')
// 	console.log(movieRatingSelector, 'vote_average')
// 	movieData.results.forEach((movieInf) => {
// 		const { vote_average } = movieInf.results
//
// 		if (vote_average <= 5) {
// 			movieRatingSelector.style.color = 'red'
// 		}
//
// 		if (vote_average > 5 && vote_average < 8) {
// 			movieRatingSelector.style.color = 'yellow'
// 		}
//
// 		if (vote_average >= 8) {
// 			movieRatingSelector.style.color = 'green'
// 		}
// 	})
// }

init()
