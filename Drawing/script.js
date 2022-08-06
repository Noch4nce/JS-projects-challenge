const canvasSelector = document.querySelector('.canvas')

const ctx = canvasSelector.getContext('2d')
const size = 30

const drawingCircle = (x, y) => {
	ctx.beginPath()
	ctx.arc(x, y, size, 0, 2 * Math.PI)
	ctx.stroke()
}

drawingCircle(60, 60)
