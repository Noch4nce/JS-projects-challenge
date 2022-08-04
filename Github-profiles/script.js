const GITHUB_PROFILES_API = 'https://api.github.com/users/'

const init = () => {
	getGithubProfile()
}

const getGithubProfile = async () => {
	const defaultProfile = 'Noch4nce'

	const response = await fetch(GITHUB_PROFILES_API + defaultProfile)
	const result = await response.json()

	console.log(result, 'result')
}

init()
