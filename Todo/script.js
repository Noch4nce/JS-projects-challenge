const formSelector = document.querySelector('.todo_form')
const inputSelector = document.querySelector('.todo_input')
const todoContainerSelector = document.querySelector('.todo_container')

const init = () => {
	const todoData = localStorage.getItem('todos')
	const todoParse = JSON.parse(todoData)

	if (todoParse) {
		todoParse.forEach((todoEl) => {
			const { todoText, todoClassComplete } = todoEl

			addTodo(todoText, todoClassComplete)
		})
	}
}

const addTodo = (inputValue, todoClassComplete) => {
	const todoBlock = document.createElement('li')
	todoBlock.innerHTML = inputValue

	if (todoClassComplete) {
		todoBlock.classList.add(todoClassComplete)
	}

	todoBlock.addEventListener('click', (event) => {
		const currentTodo = event.target
		const currentTodoId = currentTodo.id

		todoComplete(currentTodo, currentTodoId)
		updateLs()
	})

	todoBlock.addEventListener('contextmenu', (event) => {
		event.preventDefault()
		const currentTodo = event.target

		deleteTodo(currentTodo)
		updateLs()
	})

	todoContainerSelector.appendChild(todoBlock)
	formSelector.reset()

	updateLs(inputValue)
}

const updateLs = () => {
	const todoList = document.querySelectorAll('li')
	const todoData = []

	todoList.forEach((todoEl) => {
		const isTodoClass = todoEl.classList.contains('todo_complete')

		todoData.push({
			todoText: todoEl.innerText,
			todoClassComplete: isTodoClass ? 'todo_complete' : ''
		})
	})

	localStorage.setItem('todos', JSON.stringify(todoData))
}

const todoComplete = (currentTodo) => {
	currentTodo.classList.toggle('todo_complete')
}

const deleteTodo = (currentTodo) => {
	currentTodo.remove()
}

formSelector.addEventListener('submit', (event) => {
	event.preventDefault()
	const inputValue = inputSelector.value

	if (inputValue) {
		addTodo(inputValue)
	}
})

init()
