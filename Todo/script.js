const formSelector = document.querySelector('.todo_form')
const inputSelector = document.querySelector('.todo_input')
const todoContainerSelector = document.querySelector('.todo_container')

const addTodo = (inputValue) => {
	const todoBlock = document.createElement('li')
	todoBlock.innerHTML = inputValue

	todoContainerSelector.appendChild(todoBlock)
	formSelector.reset()
}

formSelector.addEventListener('submit', (event) => {
	event.preventDefault()
	const todoText = inputSelector.value

	if (todoText) {
		addTodo(todoText)
	}
})
