const GLOBE_IMAGE_URL = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
const BUMP_IMAGE_URL = 'https://unpkg.com/three-globe/example/img/earth-topology.png'
const GLOBE_WIDTH = 470
const GLOBE_HEIGHT = 470
const GLOBE_ALTITUDE = 1.5
const GLOBE_INITAIL_TRANSITION = 2500
const GLOBE_MOVE_TRANSITION = 800
const GLOBE_LABEL_SIZE = 3.5
const GLOBEL_LABEL_DOT_RADIUS = 0.5
const GLOBE_BACKGROUND_COLOR = 'white'
const GLOBE_LABEL_COLOR = 'white'

const HOME_IDX = 0
const KOREA_IDX = 1
const AUSTRALIA_IDX = 2
const OCEAN_IDX = 3
const AMERICA_IDX = 4
const PERU_IDX = 5
const TANZANIA_IDX = 6
const DENMARK_IDX = 7

const UNMOUNTED = 'unmounted'
const MASCOT_SHOWING = 'mascot_showing'
const MASCOT_HIDING = 'mascot_hiding'
const ALPHACA_SHOWING = 'alphaca_showing'
const ALPHACA_HIDING = 'alphaca_hiding'

const FRAME_IN_DURATION = 700
const PLATE_BREAK_TIMEOUT = 125
const MASCOT_HIDING_DURATION = 400

const countries = [
  {
    id: 'home',
    /** used for Globe.gl iteration */
    name: '',
  },
  {
    id: 'korea',
    name: 'Korea',
    capital: 'Seoul',
    language: 'Korean',
    population: '51,844,834',
    area: '100,363km²',
    gdp: '$2.735 trillion',
    lat: 37.566536,
    lng: 126.977966,
  },
  {
    id: 'australia',
    name: 'Australia',
    capital: 'Canberra',
    language: 'English',
    population: '26,040,100',
    area: '7,692,0243km²',
    gdp: '$1.615 trillion',
    lat: -25.344427,
    lng: 131.036880,
  },
  {
    id: 'ocean',
    name: 'Pacific Ocean',
    capital: '-',
    language: '-',
    population: '-',
    area: '165,250,0003km²',
    gdp: '-',
    lat: -8.783195,
    lng: -124.508522,
  },
  {
    id: 'america',
    name: 'USA',
    capital: 'Washington, D.C.',
    language: 'English',
    population: '333,287,557',
    area: '9,833,5203km²',
    gdp: '$25.035 trillion',
    lat: 43.879105,
    lng: -103.459068,
  },
  {
    id: 'peru',
    name: 'Peru',
    capital: 'Lima',
    language: 'Spanish',
    population: '34,352,719',
    area: '1,285,2163km²',
    gdp: '$513.715 billion',
    lat: -13.867871,
    lng: -71.303055,
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    capital: 'Dodoma',
    language: 'Swahili',
    population: '61,741,120',
    area: '947,3033km²',
    gdp: '$207.5 billion',
    lat: -6.5247123,
    lng: 35.7878438,
  },
  {
    id: 'denmark',
    name: 'Denmark',
    capital: 'Copenhagen',
    language: 'Danish',
    population: '5,928,364',
    area: '42,9433km²',
    gdp: '$411.0 billion',
    lat: 55.6867243,
    lng: 12.5700724,
  },
]

const globeIframeDocument = document.querySelector('iframe#globe').contentDocument
const globeTargetElement = document.createElement('div')
let globe

const appendGlobeTarget = () => {
  globeIframeDocument.body.appendChild(globeTargetElement)
}

const appendIframeCSS = () => {
  const iframeCSS = document.createElement("link")
  iframeCSS.href = './iframe.css'
  iframeCSS.rel = 'stylesheet'
  iframeCSS.type = 'text/css'

  globeIframeDocument.head.appendChild(iframeCSS)
}

const addIframeClass = () => {
  globeIframeDocument.body.classList.add('blue_cursor')
}

const getGlobeLabelElement = () => {
  const img = document.createElement('img')
  img.src = "./assets/0_common/mark.png"
  img.style.width = '15px'

  return img
}

const initGlobe = () => {
  globe = window.Globe()(globeTargetElement)
    .globeImageUrl(GLOBE_IMAGE_URL)
    .bumpImageUrl(BUMP_IMAGE_URL)
    .width(GLOBE_WIDTH)
    .height(GLOBE_HEIGHT)
    .backgroundColor(GLOBE_BACKGROUND_COLOR)
    .labelsData(countries)
    .labelText(({ name }) => name)
    .labelLat(({ lat }) => lat)
    .labelLng(({ lng }) => lng)
    .labelSize(GLOBE_LABEL_SIZE)
    .labelDotRadius(GLOBEL_LABEL_DOT_RADIUS)
    .labelColor(() => GLOBE_LABEL_COLOR)
    .htmlElementsData(countries)
    .htmlElement(getGlobeLabelElement)
    .pointOfView({ 
      lat: countries[1].lat,
      lng: countries[1].lng,
      altitude: GLOBE_ALTITUDE
    }, GLOBE_INITAIL_TRANSITION)
}

appendGlobeTarget()
appendIframeCSS()
addIframeClass()
initGlobe()

let curCountryIdx = 0
const arrow = document.querySelector('#right_arrow')

const getNextCountryIdx = (curCountryIdx) => {
  if (curCountryIdx === DENMARK_IDX) {
    return KOREA_IDX
  }

  return curCountryIdx + 1
}

const handleHideArrow = () => {
  arrow.classList.add('hidden')
}

const handleShowArrow = () => {
  setTimeout(() => {
    arrow.classList.remove('hidden')
  }, FRAME_IN_DURATION)
}

const switchCountryOrder = () => {
  const content = document.querySelector('#content')
  const korea = document.querySelector('#korea')
  const character = document.querySelector('#character')

  content.insertBefore(korea, character)
}

const handleRevertCountryOrder = () => {
  const content = document.querySelector('#content')
  const korea = document.querySelector('#korea')
  const australia = document.querySelector('#australia')

  content.insertBefore(korea, australia)
}

/** adjust order due to the frame in & out animation */
const handleAdjustCountryOrder = () => {
  if (curCountryIdx === KOREA_IDX) {
    handleRevertCountryOrder()
  }
  if (curCountryIdx === DENMARK_IDX) {
    switchCountryOrder()
  }
}

const handleCountryMovement = () => {
  const { id: curCountryId } = countries[curCountryIdx]
  const curCountryElement = document.querySelector(`#${curCountryId}`)
  
  const nextCountryIdx = getNextCountryIdx(curCountryIdx)
  const { id: nextCountryId } = countries[nextCountryIdx]
  const nextCountry = document.querySelector(`#${nextCountryId}`)
  
  curCountryElement.classList.add('frame_out')
  nextCountry.classList.remove(UNMOUNTED)
  nextCountry.classList.add('frame_in')

  setTimeout(function cleanUp() {
    curCountryElement.classList.remove('frame_out')
    curCountryElement.classList.add(UNMOUNTED)
    nextCountry.classList.remove('frame_in')
  }, FRAME_IN_DURATION);
}

function handleGlobeMovement() {
  if (curCountryIdx === HOME_IDX) { return }

  const nextCountryIdx = getNextCountryIdx(curCountryIdx)
  const { lat, lng } = countries[nextCountryIdx]

  globe.pointOfView({
    lat,
    lng,
    altitude: GLOBE_ALTITUDE
  }, GLOBE_MOVE_TRANSITION)
}

const handleChangeMetaValues = () => {
  const nextCountryIdx = getNextCountryIdx(curCountryIdx)
  const metaValues = document.querySelectorAll('#meta_value')

  const {
    name,
    capital,
    language,
    population,
    area,
    gdp,
  } = countries[nextCountryIdx]

  metaValues[0].textContent = name
  metaValues[1].textContent = capital
  metaValues[2].textContent = language
  metaValues[3].textContent = population
  metaValues[4].textContent = area
  metaValues[5].textContent = gdp
}

const handlePlateBreak = () => {
  const teacherWithPlate = document.querySelector('#teacher1')
  const teacherWithBrokenPlate = document.querySelector('#teacher2')

  setTimeout(() => {
    teacherWithPlate.classList.add(UNMOUNTED)
    teacherWithBrokenPlate.classList.remove(UNMOUNTED)

    new Audio('./assets/sounds/1_home/스타트_격파.m4a').play()
  }, PLATE_BREAK_TIMEOUT);
}

const isPeruMascot = mascot => mascot.id.includes('peru')

const handleHideMascot = (mascot, showingClass, hidingClass, hidingAudio) => {
  mascot.classList.remove(showingClass)
  mascot.classList.add(hidingClass)

  hidingAudio.play()

  setTimeout(() => {
    mascot.classList.add(UNMOUNTED)
    mascot.classList.remove(hidingClass)
  }, MASCOT_HIDING_DURATION);
}

const addMascotClickEvent = (target, mascot, showingAudioSrc, hidingAudioSrc) => {
  const SHOWING = isPeruMascot(mascot) ? ALPHACA_SHOWING : MASCOT_SHOWING
  const HIDING = isPeruMascot(mascot) ? ALPHACA_HIDING : MASCOT_HIDING

  const showingAudio = new Audio(showingAudioSrc)
  const hidingAudio = new Audio(hidingAudioSrc)

  const handleShowMascot = () => {
    mascot.classList.remove(UNMOUNTED)
    mascot.classList.add(SHOWING)

    showingAudio.play()
  }

  target.addEventListener('click', () => {
    if (mascot.classList.contains(UNMOUNTED)) {
      handleShowMascot()
    } else {
      handleHideMascot(mascot, SHOWING, HIDING, hidingAudio)
    }
  })

  mascot.addEventListener('click', () => {
    handleHideMascot(mascot, SHOWING, HIDING, hidingAudio)
  })
}

const handleCleanUpMascot = () => {
  const { id: curCountryId } = countries[curCountryIdx]
  const mascot = document.querySelector(`#${curCountryId}_mascot`)

  if (!mascot) { return }

  const SHOWING = isPeruMascot(mascot) ? ALPHACA_SHOWING : MASCOT_SHOWING
  const HIDING = isPeruMascot(mascot) ? ALPHACA_HIDING : MASCOT_HIDING

  const isMascotShowing = mascot.classList.contains(SHOWING)

  if (isMascotShowing) {
    handleHideMascot(mascot, SHOWING, HIDING)
  }
}

arrow.addEventListener('click', () => {
  handleHideArrow()
  handleAdjustCountryOrder()
  handleCountryMovement()
  handleGlobeMovement()
  handleChangeMetaValues()
  handleShowArrow()
  handleCleanUpMascot()

  if (curCountryIdx === HOME_IDX) {
    handlePlateBreak()
  }

  curCountryIdx = getNextCountryIdx(curCountryIdx)
})

const playAudioOnEvent = (eventName) => (target, audioSrc) => {
  const audios = audioSrc.map(src => new Audio(src))
  let idx = 0

  target.addEventListener(eventName, () => {
    const audio = audios[idx++ % audios.length]
    audio.play()
  })
}

const playAudioOnClick = playAudioOnEvent('click')
const playAudioOnHover = playAudioOnEvent('mouseover')

/**
 * @summary Common
 */

const interactionable = document.getElementsByClassName('red_cursor')
const withoutNudge = ['book_opened_dimmer']

playAudioOnClick(arrow, ['./assets/sounds/0_common/공통_화면전환.m4a'])

/**
 * @summary Home
 */

const book = document.querySelector('#book')
const bookOpened = document.querySelector('#book_opened')
const bookOpenedDimmer = document.querySelector('#book_opened_dimmer')

book.addEventListener('click', () => {
  bookOpened.classList.remove(UNMOUNTED)
  bookOpenedDimmer.classList.remove(UNMOUNTED)

  bookOpenedDimmer.addEventListener('click', () => {
    if (bookOpened.classList.contains(UNMOUNTED)) { return }
    bookOpened.classList.add(UNMOUNTED)
    bookOpenedDimmer.classList.add(UNMOUNTED)
  })
})

playAudioOnClick(book, ['./assets/sounds/1_home/스타트_책_펼침.m4a'])
playAudioOnClick(bookOpenedDimmer, ['./assets/sounds/1_home/스타트_책_덮음.m4a'])

/**
 * @summary Korea
 */

const tiger = document.querySelector('#korea #tiger')
const cryingTiger = document.querySelector('#korea #tiger_cry')
const koreaMascot = document.querySelector('#korea_mascot')

const tigerCryingOnClick = () => {
  tiger.addEventListener('click', () => {
    tiger.classList.add(UNMOUNTED)
    cryingTiger.classList.remove(UNMOUNTED)
  
    setTimeout(() => {
      tiger.classList.remove(UNMOUNTED)
      cryingTiger.classList.add(UNMOUNTED)
    }, 1000);
  })
}

tigerCryingOnClick()
addMascotClickEvent(tiger, koreaMascot, './assets/sounds/2_korea/한국_호랑이1.m4a', './assets/sounds/2_korea/한국_호랑이3.m4a')

/**
 * @summary Australia
 */

const native = document.querySelector('#australia #native')
const nativeHand = document.querySelector('#australia #native_hand')
const kangaroo = document.querySelector('#australia #kangaroo')
const australiaMascot = document.querySelector('#australia_mascot')
const boomerang = document.querySelector('#australia #boomerang')
const landmark = document.querySelector('#australia #landmark')
const ulruru = document.querySelector('#australia #ulruru')

const nativeHandUpOnClick = () => {
  native.addEventListener('click', () => {
    nativeHand.classList.add('native_hand_up')
  
    setTimeout(() => {
      nativeHand.classList.remove('native_hand_up')
      nativeHand.classList.add('native_hand_down')
      
      setTimeout(() => {
        nativeHand.classList.remove('native_hand_down')
      }, 300);
    }, 1000)
  })
}

nativeHandUpOnClick()
playAudioOnClick(native, ['./assets/sounds/3_australia/호주_원주민1.m4a', './assets/sounds/3_australia/호주_원주민2.m4a', './assets/sounds/3_australia/호주_원주민3.m4a', './assets/sounds/3_australia/호주_원주민_나와.m4a', './assets/sounds/3_australia/호주_원주민_여기에.m4a'])
playAudioOnClick(boomerang, ['./assets/sounds/3_australia/호주_부메랑.m4a'])
playAudioOnClick(landmark, ['./assets/sounds/3_australia/호주_울루루.m4a'])
playAudioOnClick(ulruru, ['./assets/sounds/3_australia/호주_울루루.m4a'])
addMascotClickEvent(kangaroo, australiaMascot, './assets/sounds/3_australia/호주_캥거루.m4a', './assets/sounds/3_australia/호주_캥거루.m4a')

/**
 * @summary Ocean
 */

const bird = document.querySelector('#ocean #bird')
const shark = document.querySelector('#ocean #shark')
const oceanBoat = document.querySelector('#ocean #boat') 
const oceanMascot = document.querySelector('#ocean_mascot')

const poopFallingOnClick = () => {
  bird.addEventListener('click', (e) => {
    const monitorFrame = document.querySelector('#content')
    const ocean = document.querySelector('#ocean')
    const poop = document.createElement('div')
    poop.id = 'poop'
  
    const left = e.clientX - monitorFrame.getBoundingClientRect().left
    poop.style.left = `${left}px`
  
    const poopImg = document.createElement('img')
    poopImg.src = './assets/3_ocean/poop.png'
  
    poop.appendChild(poopImg)
    ocean.appendChild(poop)
    poop.classList.add('poop_falling')
  
    setTimeout(() => {
      poop.remove()
    }, 1000);
  })
}

const playOceanBackgroundAudioInteval = () => {
  const audios = ['./assets/sounds/4_ocean/태평양_갈매기(배경).m4a', './assets/sounds/4_ocean/태평양_철썩(배경).m4a', './assets/sounds/4_ocean/태평양_갈매기(배경2).m4a']
  let idx = 0

  setInterval(() => {
    if (curCountryIdx !== OCEAN_IDX) { return }

    const audio = new Audio(audios[idx++ % audios.length])
    audio.play()
  }, 4000)
}

poopFallingOnClick()
playAudioOnClick(bird, ['./assets/sounds/4_ocean/태평양_갈매기_뿌직.m4a'])
playAudioOnClick(oceanBoat, ['./assets/sounds/4_ocean/태평양_인물1.m4a', './assets/sounds/4_ocean/태평양_인물2.m4a', './assets/sounds/4_ocean/태평양_인물3.m4a', './assets/sounds/4_ocean/태평양_인물4.m4a'])
playOceanBackgroundAudioInteval()
addMascotClickEvent(shark, oceanMascot, './assets/sounds/4_ocean/태평양_상어_등장.m4a', './assets/sounds/4_ocean/태평양_상어_퇴장.m4a')

/**
 * @summary America
 */

const sky = document.querySelector('#america #sky')
const americaMascot = document.querySelector('#america_mascot')

const faceLips = [
  { 
    face: document.querySelector('#face1'),
    lip: document.querySelector('#lower_lip_1'),
    sound: './assets/sounds/5_america/미국_석상1.m4a'
  },
  { 
    face: document.querySelector('#face2'),
    lip: document.querySelector('#lower_lip_2'),
    sound: './assets/sounds/5_america/미국_석상2.m4a'
  },
  { 
    face: document.querySelector('#face3'),
    lip: document.querySelector('#lower_lip_3'),
    sound: './assets/sounds/5_america/미국_석상3.m4a'
  },
  { 
    face: document.querySelector('#face4'),
    lip: document.querySelector('#lower_lip_4'),
    sound: './assets/sounds/5_america/미국_석상4.m4a'
  },
]

const stars = [
  {
    star: document.querySelector('#star1'),
    sound: './assets/sounds/5_america/미국_별1.m4a'
  },
  {
    star: document.querySelector('#star2'),
    sound: './assets/sounds/5_america/미국_별2.m4a'
  },
  {
    star: document.querySelector('#star3'),
    sound: './assets/sounds/5_america/미국_별3.m4a'
  },
  {
    star: document.querySelector('#star4'),
    sound: './assets/sounds/5_america/미국_별4.m4a'
  },
  {
    star: document.querySelector('#star5'),
    sound: './assets/sounds/5_america/미국_별5.m4a'
  },
]

const singOnClick = () => {
  faceLips.forEach(({ face, lip, sound }) => {
    face.addEventListener('click', () => {
      lip.classList.add('sing')
  
      setTimeout(() => {
        lip.classList.remove('sing')
      }, 1000)
    })

    playAudioOnClick(face, [sound])
  })
}

const playAudioOnStarBlink = () => {
  stars.forEach(({ star, sound }) => {
    playAudioOnHover(star, [sound])
  })
}

singOnClick()
playAudioOnStarBlink()
addMascotClickEvent(sky, americaMascot, './assets/sounds/5_america/미국_독수리_등장.m4a', './assets/sounds/5_america/미국_독수리_퇴장.m4a')

/**
 * @summary Peru
 */

const moon = document.querySelector('#peru #moon')
const ground = document.querySelector('#peru #ground')
const alpaca = document.querySelector('#peru #alpaca')
const peruMascot = document.querySelector('#peru_mascot')
const peruMascotBody = document.querySelector('#peru_mascot_body')

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
const ridgeSounds = ['./assets/sounds/6_peru/페루_능선1.m4a', './assets/sounds/6_peru/페루_능선2.m4a', './assets/sounds/6_peru/페루_능선3.m4a', './assets/sounds/6_peru/페루_능선4.m4a', './assets/sounds/6_peru/페루_능선5.m4a', './assets/sounds/6_peru/페루_능선6.m4a', './assets/sounds/6_peru/페루_능선7.m4a', './assets/sounds/6_peru/페루_능선8.m4a', './assets/sounds/6_peru/페루_능선9.m4a', './assets/sounds/6_peru/페루_능선10.m4a', './assets/sounds/6_peru/페루_능선11.m4a']

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)]
}

const getRandomSound = () => {
  return ridgeSounds[Math.floor(Math.random() * ridgeSounds.length)]
}

document.addEventListener('mouseover', (e) => {
  const coloredMountain = e.target.closest('[id^=mountain_]')

  if (!coloredMountain) { return }

  const isFresh = freshness[coloredMountain.id]

  if (isFresh) {
    freshness[coloredMountain.id] = false

    const color = colorMap[coloredMountain.id]
    coloredMountain.classList.remove('fresh_filter')
    coloredMountain.classList.add(color)
    return
  }

  const randomColor = getRandomColor()
  const randomSound = getRandomSound()

  coloredMountain.classList.forEach((item) => {
    if (item.includes('color_')) {
      coloredMountain.classList.remove(item)
    }
  })

  coloredMountain.classList.add(randomColor)

  const audio = new Audio(randomSound)
  audio.play()
})

const addColoringEventListener = (element, linkedElement) => {
  element.addEventListener('mouseover', () => {
    const randomColor = getRandomColor()

    element.classList.forEach((item) => {
      if (item.includes('color_')) {
        element.classList.remove(item)
      }
    })

    element.classList.add(randomColor)

    if (linkedElement) {
      linkedElement.classList.forEach((item) => {
        if (item.includes('color_')) {
          linkedElement.classList.remove(item)
        }
      })

      linkedElement.classList.add(randomColor)
    }
  })
}

addColoringEventListener(moon)
addColoringEventListener(ground)
addColoringEventListener(peruMascotBody, alpaca)
addColoringEventListener(alpaca, peruMascotBody)

addMascotClickEvent(alpaca, peruMascot, './assets/sounds/6_peru/페루_알파카_등장.m4a', './assets/sounds/6_peru/페루_알파카_퇴장.m4a')

/**
 * @summary tanzania
 */

const zebra = document.querySelector('#zebra')
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

zebra.addEventListener('click', () => {
  currentZebraIdx = (currentZebraIdx + 1) % zebraImgSrc.length

  zebra.querySelector('img').src = zebraImgSrc[currentZebraIdx]
})

const ASH_COUNT = 15
const leopardPattern = document.querySelector('#leopard_pattern')

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

const giraffe = document.querySelector('#giraffe')
const giraffeHead = document.querySelector('#giraffe_head')

giraffe.addEventListener('click', () => {
  if (!giraffe.classList.contains('giraffe-stretch')) {
    giraffe.style.pointerEvents = 'none'
    
    giraffeHead.classList.remove('giraffe-head-up')
    giraffe.classList.remove('giraffe-stretch-back')

    giraffe.classList.add('giraffe-stretch')
    giraffeHead.classList.remove('hidden')
    giraffeHead.classList.add('giraffe-head-down')

    setTimeout(() => {
      giraffe.style.pointerEvents = 'auto'
    }, 3000);
  }
  else {
    giraffe.classList.remove('giraffe-stretch')
    giraffeHead.classList.remove('giraffe-head-down')

    giraffeHead.classList.add('giraffe-head-up')
    giraffe.classList.add('giraffe-stretch-back')
  }
})

const elephantBody = document.querySelector('#tanzania #elephant_body')
const elephantHead = document.querySelector('#tanzania #elephant_head')
const tanzaniaMascot = document.querySelector('#tanzania_mascot')

addMascotClickEvent(elephantHead, tanzaniaMascot)
addMascotClickEvent(elephantBody, tanzaniaMascot)

/**
 * @summary Denmark
 */

const windowsToOpen = ['window_1_2', 'window_2_8', 'window_3_3', 'window_4_7']

windowsToOpen.forEach((windowId) => {
  const closedWindow = document.querySelector(`#closed_${windowId}`)
  const openedWindow = document.querySelector(`#open_${windowId}`)

  closedWindow.addEventListener('click', () => {
    openedWindow.classList.remove(UNMOUNTED)

    openedWindow.addEventListener('click', () => {
      openedWindow.classList.add(UNMOUNTED)
    })
  })
})

const denmarkBoat = document.querySelector('#denmark #boat')
const denmarkMascot = document.querySelector('#denmark_mascot')

addMascotClickEvent(denmarkBoat, denmarkMascot)
