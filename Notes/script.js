const sidebarButtonSelector = document.querySelector('.sidebar_btn')
const cardsContentSelector = document.querySelector('.card_content')

const addCard = () => {
	const cardBlock = document.createElement('div')
	cardBlock.className = 'card_block'

	cardBlock.innerHTML = `
		<p class='card_input'>YO</p>
		<div class='card_action'>
			<button class='card_btn card_delete'>
				<img src='./assets/bin.png' alt='trash' />
			</button>
			<button class='card_btn'>
				<img src='./assets/pencil.png' alt='edit' />
			</button>
		</div>
	`

	cardsContentSelector.append(cardBlock)

	const cardDelete = document.querySelectorAll('.card_action .card_delete')

	cardDelete.forEach((el) => {
		el.addEventListener('click', (e) => {
			deleteCard(e)
		})
	})
}

const deleteCard = (e) => {
	const currentCard = e.target
	const parentCardBlock = currentCard.closest('div.card_block')

	parentCardBlock.remove()
}

sidebarButtonSelector.addEventListener('click', () => {
	addCard()
})
