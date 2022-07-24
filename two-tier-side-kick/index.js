const positionStyleProperty = 'left'
const MoveGradeAndIds = [
  {
    moveGrade: 50,
    ids: [
      'GHM',
    ],
  },
  {
    moveGrade: 100,
    ids: [
      'tree-1',
      'tree-2',
      'tree-3',
    ],
  },
]

const getComputedStyleInNumber = (id, styleProperty) => {
  const computedStyle = getComputedStyle(document.getElementById(id))[styleProperty]
  const [computedStyleInNumber, _px] = computedStyle.split('px')
  
  return Number(computedStyleInNumber)
}

const handleKeyDown = (e) => {
  console.log(e.key)

  MoveGradeAndIds.forEach(({ moveGrade, ids }) => {
    if (e.key === 'ArrowLeft') {
      ids.forEach((id) => {
        document.getElementById(id).style[positionStyleProperty] = `${getComputedStyleInNumber(id, positionStyleProperty) + moveGrade}px`
      })
    }

    if (e.key === 'ArrowRight') {
      ids.forEach((id) => {
        document.getElementById(id).style[positionStyleProperty] = `${getComputedStyleInNumber(id, positionStyleProperty) - moveGrade}px`
      })
    }
  })

  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    const [characterImgEl] = document.getElementById('character').getElementsByTagName('img')
    characterImgEl.src = './assets/character-kicking.png'
    characterImgEl.style['width'] = '200px'
    
    window.setTimeout(() => {
      characterImgEl.src = './assets/character-standing.png'
      characterImgEl.style['width'] = '50px'
    }, 300)
  }
}

document.addEventListener('keydown', handleKeyDown)
