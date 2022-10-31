/** ocean */
if (document.querySelector('#ocean')) {
  const OCEAN_BIRD_CLIENT_ADJUSTMENT = -135

  const DEGREE_BY_DIRECTION = {
    TOP: -90,
    TOP_RIGHT: -45,
    RIGHT: 0,
    DOWN_RIGHT: 45,
    DOWN: 90,
    DOWN_LEFT: 125,
    LEFT: 180,
    TOP_LEFT: -125,
  }

  let prevBirdX = 0
  let prevBirdY = 0
  let prevBirdDegree = DEGREE_BY_DIRECTION.RIGHT

  /** TODO: Enhance mouse trackimg animation. */
  document.addEventListener('mousemove', function handleBirdAnimation(e) {
    const content = document.querySelector('#content')
    const bird = document.querySelector('#ocean #bird')

    const xTo = (e.clientX + OCEAN_BIRD_CLIENT_ADJUSTMENT) - content.offsetLeft
    const yTo = (e.clientY + OCEAN_BIRD_CLIENT_ADJUSTMENT) - content.offsetTop

    const xDiff = prevBirdX - xTo
    const yDiff = prevBirdY - yTo

    const degreeTo = ((xDiff, yDiff) => {
      if (yDiff > 0) {
        if (xDiff > 0) return DEGREE_BY_DIRECTION.TOP_RIGHT
        if (xDiff === 0) return DEGREE_BY_DIRECTION.TOP
        if (xDiff < 0) return DEGREE_BY_DIRECTION.TOP_LEFT
      }
      if (yDiff === 0) {
        if (xDiff > 0) return DEGREE_BY_DIRECTION.LEFT
        if (xDiff === 0) return prevBirdDegree
        if (xDiff < 0) return DEGREE_BY_DIRECTION.RIGHT
      }
      if (yDiff < 0) {
        if (xDiff > 0) return DEGREE_BY_DIRECTION.DOWN_LEFT
        if (xDiff === 0) return DEGREE_BY_DIRECTION.DOWN
        if (xDiff < 0) return DEGREE_BY_DIRECTION.DOWN_RIGHT
      }
    })(xDiff, yDiff)

    bird.style.transform = `
      translate(${xTo}px, ${yTo}px)
      rotate(${degreeTo}deg)
    `

    prevBirdX = xTo
    prevBirdY = yTo
    prevBirdDegree = degreeTo
  })
}