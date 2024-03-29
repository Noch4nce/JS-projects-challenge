const lowerCaseSelector = document.getElementById('toggle-button_lower')
const upperCaseSelector = document.getElementById('toggle-button_upper')
const numberSelector = document.getElementById('toggle-button_number')
const symbolSelector = document.getElementById('toggle-button_symbol')
const pwLengthSelector = document.getElementById('toggle-button_length')
const generateBtnSelector = document.getElementById('pw_generate')
const copyBtnSelector = document.getElementById('pw_copy')
const copyInputBtnSelector = document.getElementById('pw_copy-input')
const pwInputSelector = document.getElementById('pw_pass')

let pwLength = 5

// let isLowerCaseChecked = false
// let isUpperCaseChecked = false
// let isNumberChecked = false
// let isSymbolChecked = false

const lowerCharacters = 'abcdefghijklmnopqrstuvwxyz'
const upperCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '0123456789'
const symbols = '!@#$%^&*()_+'

// const upperAndLoverCharacters = upperCharacters + lowerCharacters
// const upperAndNumbers = upperCharacters + numbers
// const upperAndSymbols = upperCharacters + symbols
// const loverAndNumber = lowerCharacters + numbers
// const loverAndSymbols = lowerCharacters + symbols
// const numbersAndSymbols = numbers + symbols
//
// const upperAndLoverAndNumberCharacters =
// 	upperCharacters + lowerCharacters + numbers
// const upperAndLoverAndSymbolsCharacters =
// 	upperCharacters + lowerCharacters + symbols
// const upperAndNumbersAndSymbolsCharacters = upperCharacters + numbers + symbols
// const lowerAndNumberAndSymbolsCharacters = lowerCharacters + numbers + symbols

// const upperAndLoverAndNumberAndSymbolsCharacters =
// 	upperCharacters + lowerCharacters + numbers + symbols

const getUpperCase = () => {
	return upperCharacters[Math.floor(Math.random() * upperCharacters.length)]
}

const getLowerCase = () => {
	return lowerCharacters[Math.floor(Math.random() * lowerCharacters.length)]
}

const getNumber = () => {
	return numbers[Math.floor(Math.random() * numbers.length)]
}

const getSymbols = () => {
	return symbols[Math.floor(Math.random() * symbols.length)]
}

const generatePassword = () => {
	const pwl = pwLengthSelector.value
	let pw = ''

	if (upperCaseSelector.checked) {
		pw += getUpperCase()
	}

	if (lowerCaseSelector.checked) {
		pw += getLowerCase()
	}

	if (numberSelector.checked) {
		pw += getNumber()
	}

	if (symbolSelector.checked) {
		pw += getSymbols()
	}

	for (let i = pw.length; i < pwl; i++) {
		const x = generateX()
		pw += x
	}

	pwInputSelector.innerText = shufflePassword(pw)
}

const generateX = () => {
	const xs = []

	if (upperCaseSelector.checked) {
		xs.push(getUpperCase())
	}

	if (lowerCaseSelector.checked) {
		xs.push(getLowerCase())
	}

	if (numberSelector.checked) {
		xs.push(getNumber())
	}

	if (symbolSelector.checked) {
		xs.push(getSymbols())
	}

	return xs[Math.floor(Math.random() * xs.length)]
}

function getRandomInt(pwLength) {
	return Math.floor(Math.random() * pwLength);
}

function shufflePassword(password) {
	const pwArr = password.split('');
	const pwLength = pwArr.length;

	for(let i = 0; i < pwLength; i++) {
		const j = getRandomInt(pwLength);
		const temp = pwArr[i];

		pwArr[i] = pwArr[j];
		pwArr[j] = temp;
	}

	return pwArr.join('');
}

const setClipboard = (currentPass) => {
	navigator.clipboard
		.writeText(currentPass)
		.then(() => alert(`Password Copied: ${currentPass}`))
}

// const generatedLowerCase = () => {
// 	let res = ''
//
// 	for (let i = 0; i < pwLength; i++) {
// 		const randomCharacter =
// 			lowerCharacters[Math.floor(Math.random() * lowerCharacters.length)]
//
// 		res = res += randomCharacter
// 	}
//
// 	pwInputSelector.innerText = res
// }
//
// const generatedUpperCase = () => {
// 	let res = ''
//
// 	for (let i = 0; i < pwLength; i++) {
// 		const randomCharacter =
// 			upperCharacters[Math.floor(Math.random() * upperCharacters.length)]
//
// 		res = res += randomCharacter
// 	}
//
// 	pwInputSelector.innerText = res
// }
//
// const generatedNumbers = () => {
// 	let res = ''
//
// 	for (let i = 0; i < pwLength; i++) {
// 		const randomNumber = numbers[Math.floor(Math.random() * numbers.length)]
//
// 		res = res += randomNumber
// 	}
//
// 	pwInputSelector.innerText = res
// }
//
// const generatedSymbols = () => {
// 	let res = ''
//
// 	for (let i = 0; i < pwLength; i++) {
// 		const randomNumber = symbols[Math.floor(Math.random() * symbols.length)]
//
// 		res = res += randomNumber
// 	}
//
// 	pwInputSelector.innerText = res
// }
//
// const generatedUpperAndLoverCase = () => {
// 	let res = ''
//
// 	for (let i = 0; i < pwLength; i++) {
// 		const randomCharacter =
// 			upperAndLoverCharacters[
// 				Math.floor(Math.random() * upperAndLoverCharacters.length)
// 			]
//
// 		res = res += randomCharacter
// 	}
//
// 	pwInputSelector.innerText = res
// }
//
// const generatedUpperAndNumberCase = () => {
// 	let res = ''
//
// 	for (let i = 0; i < pwLength; i++) {
// 		const randomCharacter =
// 			upperAndNumbers[Math.floor(Math.random() * upperAndNumbers.length)]
//
// 		res = res += randomCharacter
// 	}
//
// 	pwInputSelector.innerText = res
// }
//
// const generatedUpperAndSymbolsCase = () => {
// 	let res = ''
//
// 	for (let i = 0; i < pwLength; i++) {
// 		const randomCharacter =
// 			upperAndSymbols[Math.floor(Math.random() * upperAndSymbols.length)]
//
// 		res = res += randomCharacter
// 	}
//
// 	pwInputSelector.innerText = res
// }
//
// const generatedLowerAndNumbersCase = () => {
// 	let res = ''
//
// 	for (let i = 0; i < pwLength; i++) {
// 		const randomCharacter =
// 			loverAndNumber[Math.floor(Math.random() * loverAndNumber.length)]
//
// 		res = res += randomCharacter
// 	}
//
// 	pwInputSelector.innerText = res
// }
//
// const generatedLowerAndSymbolsCase = () => {
// 	let res = ''
//
// 	for (let i = 0; i < pwLength; i++) {
// 		const randomCharacter =
// 			loverAndSymbols[Math.floor(Math.random() * loverAndSymbols.length)]
//
// 		res = res += randomCharacter
// 	}
//
// 	pwInputSelector.innerText = res
// }
//
// const generatedNumberAndSymbolsCase = () => {
// 	let res = ''
//
// 	for (let i = 0; i < pwLength; i++) {
// 		const randomCharacter =
// 			numbersAndSymbols[
// 				Math.floor(Math.random() * numbersAndSymbols.length)
// 			]
//
// 		res = res += randomCharacter
// 	}
//
// 	pwInputSelector.innerText = res
// }
//
// const generatedUpperAndLowerAndNumberCase = () => {
// 	let res = ''
//
// 	for (let i = 0; i < pwLength; i++) {
// 		const randomCharacter =
// 			upperAndLoverAndNumberCharacters[
// 				Math.floor(
// 					Math.random() * upperAndLoverAndNumberCharacters.length
// 				)
// 			]
//
// 		res = res += randomCharacter
// 	}
//
// 	pwInputSelector.innerText = res
// }
//
// const generatedUpperAndLowerAndSymbolsCase = () => {
// 	let res = ''
//
// 	for (let i = 0; i < pwLength; i++) {
// 		const randomCharacter =
// 			upperAndLoverAndSymbolsCharacters[
// 				Math.floor(
// 					Math.random() * upperAndLoverAndSymbolsCharacters.length
// 				)
// 			]
//
// 		res = res += randomCharacter
// 	}
//
// 	pwInputSelector.innerText = res
// }
//
// const generatedUpperAndNumberAndSymbolsCase = () => {
// 	let res = ''
//
// 	for (let i = 0; i < pwLength; i++) {
// 		const randomCharacter =
// 			upperAndNumbersAndSymbolsCharacters[
// 				Math.floor(
// 					Math.random() * upperAndNumbersAndSymbolsCharacters.length
// 				)
// 			]
//
// 		res = res += randomCharacter
// 	}
//
// 	pwInputSelector.innerText = res
// }
//
// const generatedLowerAndNumberAndSymbolsCase = () => {
// 	let res = ''
//
// 	for (let i = 0; i < pwLength; i++) {
// 		const randomCharacter =
// 			lowerAndNumberAndSymbolsCharacters[
// 				Math.floor(
// 					Math.random() * lowerAndNumberAndSymbolsCharacters.length
// 				)
// 			]
//
// 		res = res += randomCharacter
// 	}
//
// 	pwInputSelector.innerText = res
// }
//
// const generatedUpperAndLowerAndNumberAndSymbolsCase = () => {
// 	let res = ''
//
// 	for (let i = 0; i < pwLength; i++) {
// 		const randomCharacter =
// 			upperAndLoverAndNumberAndSymbolsCharacters[
// 				Math.floor(
// 					Math.random() *
// 						upperAndLoverAndNumberAndSymbolsCharacters.length
// 				)
// 			]
//
// 		res = res += randomCharacter
// 	}
//
// 	pwInputSelector.innerText = res
// }

generateBtnSelector.addEventListener('click', () => {
	if (
		upperCaseSelector.checked ||
		lowerCaseSelector.checked ||
		numberSelector.checked ||
		symbolSelector.checked
	) {
		generatePassword()
	} else {
		pwInputSelector.innerText = 'Select an option'
	}
})

pwLengthSelector.addEventListener('change', (e) => {
	pwLength = e.target.value
})

copyBtnSelector.addEventListener('click', () => {
	const currentPass = pwInputSelector.innerText

	setClipboard(currentPass)
})

copyInputBtnSelector.addEventListener('click', () => {
	const currentPass = pwInputSelector.innerText

	setClipboard(currentPass)
})

// lowerCaseSelector.addEventListener('click', (e) => {
// 	isLowerCaseChecked = e.target.checked
// })
//
// upperCaseSelector.addEventListener('click', (e) => {
// 	isUpperCaseChecked = e.target.checked
// })
//
// numberSelector.addEventListener('click', (e) => {
// 	isNumberChecked = e.target.checked
// })
//
// symbolSelector.addEventListener('click', (e) => {
// 	isSymbolChecked = e.target.checked
// })

// generateBtnSelector.addEventListener('click', () => {
// 	if (
// 		isUpperCaseChecked &&
// 		isLowerCaseChecked &&
// 		isNumberChecked &&
// 		isSymbolChecked
// 	) {
// 		generatedUpperAndLowerAndNumberAndSymbolsCase()
// 	} else if (isLowerCaseChecked && isNumberChecked && isSymbolChecked) {
// 		generatedLowerAndNumberAndSymbolsCase()
// 	} else if (isUpperCaseChecked && isLowerCaseChecked && isNumberChecked) {
// 		generatedUpperAndLowerAndNumberCase()
// 	} else if (isUpperCaseChecked && isLowerCaseChecked && isSymbolChecked) {
// 		generatedUpperAndLowerAndSymbolsCase()
// 	} else if (isUpperCaseChecked && isNumberChecked && isSymbolChecked) {
// 		generatedUpperAndNumberAndSymbolsCase()
// 	} else if (isNumberChecked && isSymbolChecked) {
// 		generatedNumberAndSymbolsCase()
// 	} else if (isLowerCaseChecked && isNumberChecked) {
// 		generatedLowerAndNumbersCase()
// 	} else if (isLowerCaseChecked && isSymbolChecked) {
// 		generatedLowerAndSymbolsCase()
// 	} else if (isUpperCaseChecked && isNumberChecked) {
// 		generatedUpperAndNumberCase()
// 	} else if (isUpperCaseChecked && isSymbolChecked) {
// 		generatedUpperAndSymbolsCase()
// 	} else if (isUpperCaseChecked && isLowerCaseChecked) {
// 		generatedUpperAndLoverCase()
// 	} else if (isLowerCaseChecked) {
// 		generatedLowerCase()
// 	} else if (isUpperCaseChecked) {
// 		generatedUpperCase()
// 	} else if (isNumberChecked) {
// 		generatedNumbers()
// 	} else if (isSymbolChecked) {
// 		generatedSymbols()
// 	}
// })
