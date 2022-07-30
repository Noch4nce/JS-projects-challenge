const sidebarButtonSelector = document.querySelector('.sidebar_btn')
const cardsContentSelector = document.querySelector('.card_content')

const savedText = []
let count = 0

const init = () => {
	const newText = localStorage.getItem('newText')
	const savedCards = JSON.parse(newText)

	if (savedCards) {
		savedText.push(...savedCards)
		addCard(savedCards)
	}
}

const addCard = (savedCards = ['']) => {
	savedCards.forEach((text) => {
		const cardBlock = document.createElement('div')
		cardBlock.className = 'card_block'

		cardBlock.innerHTML = `
			<textarea class='card_text'>${text}</textarea>
			<p id=${count} class='card_input'>${text}</p>
			<div class='card_action'>
				<button class='card_btn card_delete'>
					<img class='delete' src='./assets/bin.png' alt='trash' />
				</button>
				<button class='card_btn card_edit'>
					<img class='edit' src='./assets/pencil.png' alt='edit' />
				</button>
			</div>
		`
		count++

		cardsContentSelector.append(cardBlock)
	})
}

const actionCard = (target) => {
	const parentCardBlock = target.closest('div.card_block')
	const cardText = parentCardBlock.firstElementChild
	const cardInput = parentCardBlock.childNodes[3]
	const text = cardText.value

	if (target.className === 'edit' && !cardText.classList.contains('show')) {
		cardText.classList.add('show')
	} else {
		cardText.classList.remove('show')
		cardInput.innerHTML = text

		savedText[cardInput.id] = text
	}

	if (target.className === 'delete') {
		savedText.splice(cardInput.id, 1)

		parentCardBlock.remove()
	}

	localStorage.setItem('newText', JSON.stringify(savedText.filter((el) => el)))
}

sidebarButtonSelector.addEventListener('click', () => {
	addCard()
})

cardsContentSelector.addEventListener('click', (e) => {
	let target = e.target

	if (target.tagName === 'IMG') {
		actionCard(target)
	}
})

init()
