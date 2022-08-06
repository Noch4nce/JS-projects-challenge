const canvasSelector = document.querySelector('.canvas')

const ctx = canvasSelector.getContext('2d')
let size = 30
let x = 60
let y = 60

const drawingCircle = (x, y) => {
	ctx.beginPath()
	ctx.arc(x, y, size, 0, 2 * Math.PI)
	ctx.fill()
}

// const draw = () => {
// 	ctx.clearRect(0, 0, canvasSelector.width, canvasSelector.height)
//
// 	drawingCircle(x, y)
// 	requestAnimationFrame(draw)
// }

canvasSelector.addEventListener('mousedown', (event) => {
	const x = event.offsetX
	const y = event.offsetY

	drawingCircle(x, y)
})

// draw()
