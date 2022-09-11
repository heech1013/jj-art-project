/** ocean */
const OCEAN_BIRD_CLIENT_ADJUSTMENT = -135

const prevBirdPosition = { x: 0, y: 0 }
const nextBirdPosition = { x: 0, y: 0 }

function handleNextBirdPosition(e) {
  const content = document.querySelector('#content')
  
  nextBirdPosition.x = (e.clientX + OCEAN_BIRD_CLIENT_ADJUSTMENT) - content.offsetLeft
  nextBirdPosition.y = (e.clientY + OCEAN_BIRD_CLIENT_ADJUSTMENT) - content.offsetTop
}

document.addEventListener('mousemove', handleNextBirdPosition)

requestAnimationFrame(function render() {
  const { x: xFrom, y: yFrom } = prevBirdPosition
  const { x: xTo, y: yTo } = nextBirdPosition

  const bird = document.querySelector('#ocean #bird')

  const xDiff = Math.abs(xTo - xFrom)
  const yDiff = Math.abs(yTo - yFrom)
  const tangentValue = xDiff / yDiff
  const degreeTo = Math.atan(tangentValue) * 10

  if (!isNaN(degreeTo) && degreeTo !== 0) {
    bird.style.transform = `
      translate(${xTo}px, ${yTo}px)
      rotate(${degreeTo}deg)
    `

    console.log({ xDiff, yDiff, tangentValue, degreeTo })
    console.log(`translate(${xTo}px, ${yTo}px) rotate(${degreeTo}deg)`)
  }

  prevBirdPosition.x = xTo
  prevBirdPosition.y = yTo

  window.setTimeout(() => {
    console.log(`render()`)
    requestAnimationFrame(render)
  }, 100)

  // requestAnimationFrame(render)
})