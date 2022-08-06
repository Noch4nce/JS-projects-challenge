const canvasSelector = document.querySelector('.canvas')
const decreasedSelector = document.querySelector('.decreased')
const increasedSelector = document.querySelector('.increased')
const sizeSelector = document.querySelector('.size')
const colorPickerSelector = document.querySelector('.color_picker')
const clearBtnSelector = document.querySelector('.clear')

const ctx = canvasSelector.getContext('2d')
let size = 10
let color = 'black'
let isPressed = false
let x = undefined
let y = undefined

const drawingCircle = (x, y) => {
	ctx.beginPath()
	ctx.arc(x, y, size, 0, 2 * Math.PI)
	ctx.fillStyle = color
	ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
	ctx.beginPath()
	ctx.moveTo(x1, y1)
	ctx.lineTo(x2, y2)
	ctx.strokeStyle = color
	ctx.lineWidth = size * 2
	ctx.stroke()
}

canvasSelector.addEventListener('mousedown', (event) => {
	isPressed = true

	x = event.offsetX
	y = event.offsetY
})

canvasSelector.addEventListener('mouseup', () => {
	isPressed = false

	x = undefined
	y = undefined
})

canvasSelector.addEventListener('mousemove', (event) => {
	if (isPressed) {
		const x2 = event.offsetX
		const y2 = event.offsetY

		drawingCircle(x2, y2)

		drawLine(x, y, x2, y2);
		x = x2
		y = y2
	}
})

decreasedSelector.addEventListener('click', () => {
	size -= 5

	if (size === 5) {
		decreasedSelector.disabled = true
	}

	increasedSelector.disabled = false
	sizeSelector.innerText = size
})

increasedSelector.addEventListener('click', () => {
	size += 5

	if (size === 50) {
		increasedSelector.disabled = true
	}

	decreasedSelector.disabled = false
	sizeSelector.innerText = size
})

colorPickerSelector.addEventListener('input', () => {
	color = colorPickerSelector.value
})

clearBtnSelector.addEventListener('click', () => {
	ctx.clearRect(0, 0, canvasSelector.width, canvasSelector.height)
})
