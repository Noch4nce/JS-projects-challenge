const formSelector = document.querySelector('.todo_form')
const inputSelector = document.querySelector('.todo_input')
const todoContainerSelector = document.querySelector('.todo_container')

const addTodo = (target) => {
	const inputValue = target.value

	const todoBlock = document.createElement('li')
	todoBlock.innerHTML = inputValue

	todoContainerSelector.append(todoBlock)
	formSelector.reset()
}


inputSelector.addEventListener('keypress', (event) => {
	if (event.key === 'Enter') {
		const target = event.target
	    console.log(event.target.value, 'qwe')
		addTodo(target)
	}
})
