const OCEAN_BIRD_CLIENT_ADJUSTMENT = -135

const prevMouse = {
  x: 0,
  y: 0,
}

const mouse = {
  x: 0,
  y: 0,
}

function handleMouseMove (e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function handleOceanMouseMove(xFrom, yFrom, xTo, yTo) {
  const content = document.querySelector('#content')
  const bird = document.querySelector('#ocean #bird')

  // const xFrom = 
  // const yFrom =

  const xTo = (e.clientX + OCEAN_BIRD_CLIENT_ADJUSTMENT) - content.offsetLeft
  const yTo = (e.clientY + OCEAN_BIRD_CLIENT_ADJUSTMENT) - content.offsetTop

  const xDiff = xTo - xFrom
  const yDiff = yTo - yFrom
  const tangentValue = xDiff / yDiff
  const degreeTo = Math.atan(tangentValue)

  console.log(`handleOceanMouseMove, x to: ${xTo}, y to: ${yTo}, degree to: ${degreeTo}`)

  bird.style.transform = `
    translate(${xTo}px, ${yTo}px)
    rotate(${degreeTo})
  `
}

function render() {
  console.log('render')
  requestAnimationFrame(render)

  const xFrom = prevMouse.x
  const yFrom = prevMouse.y

  const xTo = mouse.x
  const yTo = mouse.y

  handleOceanMouseMove(xFrom, yFrom, xTo, yTo)

  prevMouse.x = xTo
  prevMouse.y = yTo
}

document.addEventListener('mousemove', handleMouseMove)