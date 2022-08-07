const lowerCaseSelector = document.getElementById('toggle-button_lower')
const upperCaseSelector = document.getElementById('toggle-button_upper')
const numberSelector = document.getElementById('toggle-button_number')
const symbolSelector = document.getElementById('toggle-button_symbol')
const generateBtnSelector = document.getElementById('pw_generate')
const pwInputSelector = document.getElementById('pw_pass')

let pwLength = 5

let isLowerCaseChecked = false
let isUpperCaseChecked = false
let isNumberChecked = false
let isSymbolChecked = false

const lowerCharacters = 'abcdefghijklmnopqrstuvwxyz'
const upperCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '0123456789'
const symbols = '!@#$%^&*()_+'

const upperAndLoverCharacters = upperCharacters + lowerCharacters
const upperAndNumbers = upperCharacters + numbers
const upperAndSymbols = upperCharacters + symbols

const loverAndNumber = lowerCharacters + numbers
const loverAndSymbols = lowerCharacters + symbols

// let asd = (Math.random())
// let qwe = (0.17749028285925537 * 26)
// console.log(asd, "ASD")
// console.log(qwe, "WQE")

const generatedLowerCase = () => {
	let res = ''

	for (let i = 0; i < pwLength; i++) {
		const randomCharacter =
			lowerCharacters[Math.floor(Math.random() * lowerCharacters.length)]

		res = res += randomCharacter
	}

	pwInputSelector.innerText = res
}

const generatedUpperCase = () => {
	let res = ''

	for (let i = 0; i < pwLength; i++) {
		const randomCharacter =
			upperCharacters[Math.floor(Math.random() * upperCharacters.length)]

		res = res += randomCharacter
	}

	pwInputSelector.innerText = res
}

const generatedNumbers = () => {
	let res = ''

	for (let i = 0; i < pwLength; i++) {
		const randomNumber = numbers[Math.floor(Math.random() * numbers.length)]

		res = res += randomNumber
	}

	pwInputSelector.innerText = res
}

const generatedSymbols = () => {
	let res = ''

	for (let i = 0; i < pwLength; i++) {
		const randomNumber = symbols[Math.floor(Math.random() * symbols.length)]

		res = res += randomNumber
	}

	pwInputSelector.innerText = res
}

const generatedUpperAndLoverCase = () => {
	let res = ''

	for (let i = 0; i < pwLength; i++) {
		const randomCharacter =
			upperAndLoverCharacters[
				Math.floor(Math.random() * upperAndLoverCharacters.length)
			]

		res = res += randomCharacter
	}

	pwInputSelector.innerText = res
}

const generatedUpperAndNumberCase = () => {
	let res = ''

	for (let i = 0; i < pwLength; i++) {
		const randomCharacter =
			upperAndNumbers[Math.floor(Math.random() * upperAndNumbers.length)]

		res = res += randomCharacter
	}

	pwInputSelector.innerText = res
}

const generatedUpperAndSymbolsCase = () => {
	let res = ''

	for (let i = 0; i < pwLength; i++) {
		const randomCharacter =
			upperAndSymbols[Math.floor(Math.random() * upperAndSymbols.length)]

		res = res += randomCharacter
	}

	pwInputSelector.innerText = res
}

const generatedLowerAndNumbersCase = () => {
	let res = ''

	for (let i = 0; i < pwLength; i++) {
		const randomCharacter =
			loverAndNumber[Math.floor(Math.random() * loverAndNumber.length)]

		res = res += randomCharacter
	}

	pwInputSelector.innerText = res
}

const generatedLowerAndSymbolsCase = () => {
	let res = ''

	for (let i = 0; i < pwLength; i++) {
		const randomCharacter =
			loverAndSymbols[Math.floor(Math.random() * loverAndSymbols.length)]

		res = res += randomCharacter
	}

	pwInputSelector.innerText = res
}

lowerCaseSelector.addEventListener('click', (e) => {
	isLowerCaseChecked = e.target.checked
})

upperCaseSelector.addEventListener('click', (e) => {
	isUpperCaseChecked = e.target.checked
})

numberSelector.addEventListener('click', (e) => {
	isNumberChecked = e.target.checked
})

symbolSelector.addEventListener('click', (e) => {
	isSymbolChecked = e.target.checked
})

generateBtnSelector.addEventListener('click', () => {
	if (isLowerCaseChecked && isNumberChecked) {
		generatedLowerAndNumbersCase()
	} else if (isLowerCaseChecked && isSymbolChecked) {
		generatedLowerAndSymbolsCase()
	} else if (isUpperCaseChecked && isNumberChecked) {
		generatedUpperAndNumberCase()
	} else if (isUpperCaseChecked && isSymbolChecked) {
		generatedUpperAndSymbolsCase()
	} else if (isUpperCaseChecked && isLowerCaseChecked) {
		generatedUpperAndLoverCase()
	} else if (isLowerCaseChecked) {
		generatedLowerCase()
	} else if (isUpperCaseChecked) {
		generatedUpperCase()
	} else if (isNumberChecked) {
		generatedNumbers()
	} else if (isSymbolChecked) {
		generatedSymbols()
	}
})
