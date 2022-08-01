const formSelector = document.querySelector('.todo_form')
const inputSelector = document.querySelector('.todo_input')
const todoContainerSelector = document.querySelector('.todo_container')

const addTodo = (inputValue) => {
	const todoBlock = document.createElement('li')
	todoBlock.innerHTML = inputValue

	todoContainerSelector.appendChild(todoBlock)
	formSelector.reset()

	todoBlock.addEventListener('click', (event) => {
		const currentTodo = event.target

		todoComplete(currentTodo)
	})

	todoBlock.addEventListener('contextmenu', (event) => {
		event.preventDefault()
		const currentTodo = event.target

		deleteTodo(currentTodo)
	})
}

const todoComplete = (currentTodo) => {
	currentTodo.classList.toggle('todo_complete')
}

const deleteTodo = (currentTodo) => {
	currentTodo.remove()
}

formSelector.addEventListener('submit', (event) => {
	event.preventDefault()
	const todoText = inputSelector.value

	if (todoText) {
		addTodo(todoText)
	}
})
