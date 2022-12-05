/** globe */
const globeIframe = document.querySelector('iframe#globe').contentDocument

const cssLink = document.createElement("link");
cssLink.href = './iframe.css';  
cssLink.rel = 'stylesheet';  
cssLink.type = 'text/css';  
globeIframe.head.appendChild(cssLink); 

const globeEl = document.createElement('div')
globeIframe.body.appendChild(globeEl)

const places = [
  { name: 'Korea', latitude: 37.566536, longitude: 126.977966 },
  { name: 'Australia', latitude: -25.344427, longitude: 131.036880 },
  { name: 'Pacific Ocean', latitude: -8.783195, longitude: -124.508522 },
  { name: 'America', latitude: 43.879105, longitude: -103.459068 },
  { name: 'Peru', latitude: -13.867871, longitude: -71.303055 },
  { name: 'Tanzania', latitude: -6.5247123, longitude: 35.7878438 },
  { name: 'Denmark', latitude: 55.6867243, longitude: 12.5700724 },
]

const globe = Globe()(globeEl)
  .width(400)
  .height(250)
  .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
  .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
  .labelsData(places)
  .labelText(place => place.name)
  .labelLat(place => place.latitude)
  .labelLng(place => place.longitude)
  .labelSize(1)
  .labelDotRadius(0.5)
  .labelColor(() => 'rgba(255, 165, 0, 0.75)')

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

/** peru */
if (document.querySelector('#peru')) {
  const freshness = {
    mountain_1_01: true,
    mountain_1_02: true,
    mountain_1_03: true,
    mountain_1_04: true,
    mountain_1_05: true,
    mountain_1_06: true,
    mountain_1_07: true,
    mountain_1_08: true,
    mountain_1_09: true,
    mountain_1_10: true,
    mountain_1_11: true,
    mountain_1_12: true,
    mountain_1_13: true,
    mountain_1_14: true,
    mountain_1_15: true,
    mountain_1_16: true,
    mountain_3_01: true,
    mountain_3_02: true,
    mountain_3_03: true,
    mountain_3_04: true,
    mountain_3_05: true,
    mountain_3_06: true,
    mountain_3_07: true,
    mountain_3_08: true,
    mountain_3_09: true,
    mountain_3_10: true,
    mountain_3_11: true,
    mountain_3_12: true,
    mountain_3_13: true,
    mountain_3_14: true,
    mountain_3_15: true,
    mountain_3_16: true,
    mountain_3_17: true,
    mountain_2_12: true,
    mountain_2_13: true,
    mountain_2_14: true,
    mountain_2_15: true,
    mountain_2_16: true,
    mountain_2_17: true,
    mountain_2_18: true,
    mountain_2_19: true,
    mountain_2_20: true,
    mountain_2_21: true,
    mountain_2_22: true,
    mountain_2_23: true,
    mountain_2_24: true,
  }

  const colorMap = {
    mountain_1_01: 'color_green1',
    mountain_1_02: 'color_black1',
    mountain_1_03: 'color_grey1',
    mountain_1_04: 'color_grey2',
    mountain_1_05: 'color_blue1',
    mountain_1_06: 'color_green2',
    mountain_1_07: 'color_pink1',
    mountain_1_08: 'color_grey1',
    mountain_1_09: 'color_grey2',
    mountain_1_10: 'color_green2',
    mountain_1_11: 'color_green3',
    mountain_1_12: 'color_black1',
    mountain_1_13: 'color_blue1',
    mountain_1_14: 'color_pink2',
    mountain_1_15: 'color_green2',
    mountain_1_16: 'color_black1',
    mountain_3_01: 'color_blue1',
    mountain_3_02: 'color_green4',
    mountain_3_03: 'color_pink2',
    mountain_3_04: 'color_blue1',
    mountain_3_05: 'color_grey1',
    mountain_3_06: 'color_green4',
    mountain_3_07: 'color_blue1',
    mountain_3_08: 'color_brown1',
    mountain_3_09: 'color_grey2',
    mountain_3_10: 'color_green4',
    mountain_3_11: 'color_green5',
    mountain_3_12: 'color_grey2',
    mountain_3_13: 'color_blue1',
    mountain_3_14: 'color_grey2',
    mountain_3_15: 'color_pink2',
    mountain_3_16: 'color_green4',
    mountain_3_17: 'color_green5',
    mountain_2_12: 'color_green2',
    mountain_2_13: 'color_pink1',
    mountain_2_14: 'color_grey1',
    mountain_2_15: 'color_grey2',
    mountain_2_16: 'color_green2',
    mountain_2_17: 'color_grey1',
    mountain_2_18: 'color_grey2',
    mountain_2_19: 'color_blue2',
    mountain_2_20: 'color_green5',
    mountain_2_21: 'color_green2',
    mountain_2_22: 'color_grey2',
    mountain_2_23: 'color_grey1',
    mountain_2_24: 'color_green3',
  }

  const colors = ['color_black1', 'color_grey1', 'color_grey2', 'color_brown1', 'color_blue1', 'color_blue2', 'color_blue3', 'color_blue4', 'color_green1', 'color_green2', 'color_green3', 'color_green4', 'color_green5', 'color_red1', 'color_pink1', 'color_pink2', 'color_pink3', 'color_yellow1']

  document.addEventListener('mouseover', (e) => {
    const coloredMountain = e.target.closest('[id^=mountain_]')

    if (coloredMountain) {
      if (freshness[coloredMountain.id]) {
        freshness[coloredMountain.id] = false
        const color = colorMap[coloredMountain.id]
        coloredMountain.classList.add(color)
      } else {
        const randomColorIdx = Math.floor(Math.random() * colors.length)
        const randomColor = colors[randomColorIdx]
        coloredMountain.classList.forEach((item) => {
          if (item.includes('color_')) {
            coloredMountain.classList.remove(item)
          }
        })
        coloredMountain.classList.add(randomColor)
      }
    }
  })
}

/** tanzania */
if (document.querySelector('#tanzania')) {
  const zebraImgSrc = [
    './assets/6_tanzania/얼룩말 기본.png',
    './assets/6_tanzania/얼룩말 2.png',
    './assets/6_tanzania/얼룩말 3.png',
    './assets/6_tanzania/얼룩말 4.png',
    './assets/6_tanzania/얼룩말 5.png',
    './assets/6_tanzania/얼룩말 6.png',
    './assets/6_tanzania/얼룩말 7.png',
  ]
  let currentZebraIdx = 0
  const ASH_COUNT = 15

  const zebra = document.querySelector('#zebra')
  const leopardPattern = document.querySelector('#leopard_pattern')
  const giraffe = document.querySelector('#giraffe')
  const giraffeHead = document.querySelector('#giraffe_head')

  zebra.addEventListener('click', () => {
    currentZebraIdx = (currentZebraIdx + 1) % zebraImgSrc.length

    zebra.querySelector('img').src = zebraImgSrc[currentZebraIdx]
  })

  leopardPattern.addEventListener('click', () => {
    leopardPattern.classList.add('leopard-animation')

    setTimeout(() => {
      Array
        .from({ length: ASH_COUNT }, (_, i) => i + 1)
        .map((num) => {
          const ash = document.querySelector(`#ash_${num}`)
          ash.classList.remove('hidden')
          ash.classList.add(`ash-${num}-falling`)
        })
    }, 2000);
  })
  
  giraffe.addEventListener('click', () => {
    giraffe.classList.add('giraffe-stretch')
    giraffeHead.classList.add('giraffe-head-down')
  })
}