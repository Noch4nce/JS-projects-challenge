const sidebarButtonSelector = document.querySelector('.sidebar_btn')
const cardsContentSelector = document.querySelector('.card_content')

const addCard = () => {
	const cardBlock = document.createElement('div')
	cardBlock.className = 'card_block'

	cardBlock.innerHTML = `
		<textarea class='card_text'></textarea>
		<p class='card_input'>YO</p>
		<div class='card_action'>
			<button class='card_btn card_delete'>
				<img class='delete' src='./assets/bin.png' alt='trash' />
			</button>
			<button class='card_btn card_edit'>
				<img class='edit' src='./assets/pencil.png' alt='edit' />
			</button>
		</div>
	`

	cardsContentSelector.append(cardBlock)
}

const actionCard = (target) => {
	const parentCardBlock = target.closest('div.card_block')
	const cardInput = parentCardBlock.firstElementChild

	if (target.className === 'edit') {
		cardInput.classList.toggle('show')
	}

	if (target.className === 'delete') {
		parentCardBlock.remove()
	}
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
