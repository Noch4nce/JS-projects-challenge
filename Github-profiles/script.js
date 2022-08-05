const GITHUB_PROFILES_API = 'https://api.github.com/users/'

const mainContainerSelector = document.querySelector('.gp_main-container')

const init = () => {
	getGithubProfile().then((data) => createUserCard(data))
}

const getGithubProfile = async () => {
	const defaultProfile = 'Noch4nce'

	const response = await fetch(GITHUB_PROFILES_API + defaultProfile)
	const result = await response.json()

	console.log(result, 'result')
	return result
}

const createUserCard = (data) => {
	const { avatar_url, bio, followers, following, public_repos, name } = data
	mainContainerSelector.innerHTML = ''
	const userCard = document.createElement('div')
	userCard.classList.add('gp_content')

	userCard.innerHTML = `
		<div>
			<img
				class='gp_avatar'
				src="${avatar_url}"
				alt="avatar"
			/>
		</div>
	
		<div class='gp_info'>
			<h2>${name}</h2>
			<p>${bio}</p>
			<ul class='gp_stats'>
				<li>${followers} <strong>Followers</strong></li>
				<li>${following} <strong>Following</strong></li>
				<li>${public_repos} <strong>Repos</strong></li>
			</ul>
<!--			<div className='gp_links'>-->
<!--				<a href="/">link</a>-->
<!--				<a href="/">link</a>-->
<!--				<a href="/">link</a>-->
<!--			</div>-->
		</div>
	`

	mainContainerSelector.appendChild(userCard)
}

init()
