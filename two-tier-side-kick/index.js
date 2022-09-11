/** ocean */
/** TODO: Enhance mouse trackimg animation.
 * problem: rotating degree is too small.
 * solution: lower capture interval to make angle bigger.
 */
const OCEAN_BIRD_CLIENT_ADJUSTMENT = -135

const prevBirdPosition = { x: 0, y: 0 }
const nextBirdPosition = { x: 0, y: 0 }

function handleNextBirdPosition(e) {
  const content = document.querySelector('#content')
  
  nextBirdPosition.x = (e.clientX + OCEAN_BIRD_CLIENT_ADJUSTMENT) - content.offsetLeft
  nextBirdPosition.y = (e.clientY + OCEAN_BIRD_CLIENT_ADJUSTMENT) - content.offsetTop
}

document.addEventListener('mousemove', handleNextBirdPosition)

requestAnimationFrame(function handleBirdAnimation() {
  const { x: xFrom, y: yFrom } = prevBirdPosition
  const { x: xTo, y: yTo } = nextBirdPosition

  const bird = document.querySelector('#ocean #bird')

  const xDiff = Math.abs(xTo - xFrom)
  const yDiff = Math.abs(yTo - yFrom)
  const tangentValue = xDiff / yDiff
  const degreeTo = Math.atan(tangentValue) * 10

  prevBirdPosition.x = xTo
  prevBirdPosition.y = yTo

  if (!isNaN(degreeTo) && degreeTo !== 0) {
    bird.style.transform = `
      translate(${xTo}px, ${yTo}px)
    `
    // rotate(${degreeTo}deg)
  }

  window.setTimeout(() => {
    requestAnimationFrame(handleBirdAnimation)
  }, 100)
})