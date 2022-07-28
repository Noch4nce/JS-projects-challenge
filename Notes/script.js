const sidebarButtonSelector = document.querySelector('.sidebar_btn')
const cardsContentSelector = document.querySelector('.card_content')

const addCard = () => {
	const cardBlock = document.createElement('div')
	cardBlock.className = 'card_block'

	cardBlock.innerHTML = `
		<p class='card_input'>YO</p>
		<div class='card_action'>
			<button class='card_btn'>
				<img src='./assets/bin.png' alt='trash' />
			</button>
			<button class='card_btn'>
				<img src='./assets/pencil.png' alt='edit' />
			</button>
		</div>
	`

	cardsContentSelector.append(cardBlock)
}

sidebarButtonSelector.addEventListener('click', () => {
	addCard()
})
