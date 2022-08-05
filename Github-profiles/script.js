const GITHUB_PROFILES_API = 'https://api.github.com/users/'

const mainContainerSelector = document.querySelector('.gp_main-container')
const gpFormSelector = document.querySelector('.gp_form')
const gpInputSelector = document.querySelector('.gp_input')

const init = async () => {
	// getUserRepos().then((data) => createUserRepos(data))
	getGithubProfile().then((data) => createUserCard(data))
}

const getGithubProfile = async (userInputName) => {
	const defaultUserName = 'Noch4nce'
	const userName = userInputName ? userInputName : defaultUserName

	const response = await fetch(GITHUB_PROFILES_API + userName)
	const result = await response.json()

	console.log(result, 'result')
	return result
}

const getUserRepos = async (userInputName) => {
	const defaultUserName = 'Noch4nce'
	const userName = userInputName ? userInputName : defaultUserName

	const response = await fetch(GITHUB_PROFILES_API + userName + '/repos')
	const result = await response.json()

	console.log(result, 'getUserRepos')
	return result
}

const createUserCard = async (data) => {
	const { avatar_url, bio, followers, following, public_repos, name } = data
	mainContainerSelector.innerHTML = ''
	const userCard = document.createElement('div')
	userCard.classList.add('gp_content')
	const qwe = await test()
	const asd = createUserRepos(qwe)
	console.log(qwe, 'ASD')

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
			<div class='gp_links'>
			</div>
		</div>
	`

	mainContainerSelector.appendChild(userCard)
	const link = document.querySelector('.gp_links')
	link.appendChild(asd)
	console.log(link, "link")

}

const test = async () => {
	const asd = await getUserRepos()

	return asd
}

const createUserRepos = (data) => {
	const div = document.createElement('div')

	data.forEach((dataEl, i) => {
		const { name, html_url } = dataEl

		if (i < 10) {
			const linkNode = document.createElement('a')

			linkNode.href = html_url
			linkNode.innerText = name
			linkNode.target = '_blank'

			div.appendChild(linkNode)
		} else {
			return
		}
	})

	console.log(div, 'DATA')

	return div
}

gpFormSelector.addEventListener('submit', (event) => {
	event.preventDefault()
	const userInputName = gpInputSelector.value.trim()

	if (userInputName) {
		getGithubProfile(userInputName).then((data) => createUserCard(data))
	}
})

init()
