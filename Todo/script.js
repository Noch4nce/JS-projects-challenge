const formSelector = document.querySelector('.todo_form')
const inputSelector = document.querySelector('.todo_input')
const todoContainerSelector = document.querySelector('.todo_container')

const textData = []
let todoIds = 0

const init = () => {
	const todoData = localStorage.getItem('todos')
	const todoParse = JSON.parse(todoData)

	addTodo(todoParse)
}

const addTodo = (inputValue, todoParse = '') => {
	const todoBlock = document.createElement('li')

	todoParse
		? todoParse.forEach((todoEl) => {
			const { todoText, todoClass } = todoEl

			const todoBlock = document.createElement('li')
			todoBlock.innerHTML = todoText

			if (todoClass) {
				todoBlock.classList.add(todoClass)
			}

			textData.push({
				id: todoIds,
				todoText: inputValue,
				todoClass: ''
			})
			todoIds++
			todoContainerSelector.appendChild(todoBlock)
		})
		: ''
	console.log(inputValue, "inputValue")
	console.log(Boolean(inputValue), "inputValue")
	if (inputValue) {
		todoBlock.id = String(todoIds)
		todoBlock.innerHTML = inputValue

		todoContainerSelector.appendChild(todoBlock)
		formSelector.reset()
	}

	todoBlock.addEventListener('click', (event) => {
		const currentTodo = event.target
		const currentTodoId = currentTodo.id

		todoComplete(currentTodo, currentTodoId)
	})

	todoBlock.addEventListener('contextmenu', (event) => {
		event.preventDefault()
		const currentTodo = event.target

		deleteTodo(currentTodo)
	})

	console.log(textData, 'textData')
	localStorage.setItem('todos', JSON.stringify(textData))
}

const todoComplete = (currentTodo, currentTodoId) => {
	currentTodo.classList.toggle('todo_complete')

	textData[currentTodoId].todoClass
		? (textData[currentTodoId].todoClass = '')
		: (textData[currentTodoId].todoClass = 'todo_complete')

	localStorage.setItem('todos', JSON.stringify(textData))
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