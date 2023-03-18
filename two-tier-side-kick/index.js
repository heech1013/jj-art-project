/** globe */
const VIEW_ALT = 1.5
const INITAIL_TRANSITION = 2500
const VIEW_TRANSITION = 800
const globeIframe = document.querySelector('iframe#globe').contentDocument

const iframeCssLink = document.createElement("link");
iframeCssLink.href = './iframe.css';  
iframeCssLink.rel = 'stylesheet';  
iframeCssLink.type = 'text/css';  
globeIframe.head.appendChild(iframeCssLink); 

const globeEl = document.createElement('div')
globeIframe.body.appendChild(globeEl)
globeIframe.body.classList.add('blue_cursor')

const countries = [
  {
    id: 'home',
    name: '', // unused
    lat: 37.566536, // unused
    lng: 126.977966, // unused
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

let globe
let isGlobeInitialized = false

const initGlobe = () => {
  isGlobeInitialized = true

  globe = Globe()(globeEl)
    .width(470)
    .height(470)
    .backgroundColor('white')
    .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
    .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
    .pointOfView({ lat: countries[1].lat, lng: countries[1].lng, altitude: VIEW_ALT }, INITAIL_TRANSITION)
}

initGlobe()

/** arrow */
const KICKED_ANIMATION_DURATION = 700

let currentCountryIdx = 0

const rightArrow = document.querySelector('#right_arrow')

function handleCountryMovement() {
  const currentCountryId = countries[currentCountryIdx].id
  const currentCountry = document.querySelector(`#${currentCountryId}`)

  if (currentCountryIdx === 0) {
    const teacher1 = document.querySelector('#teacher1')
    const teacher2 = document.querySelector('#teacher2')

    setTimeout(() => {
      teacher1.classList.add('unmounted')
      teacher2.classList.remove('unmounted')
    }, 125);
  }
  
  currentCountryIdx += 1
  const nextCountryId = countries[currentCountryIdx].id
  const nextCountry = document.querySelector(`#${nextCountryId}`)
  
  currentCountry.classList.add('kicked_out')
  nextCountry.classList.remove('unmounted')
  nextCountry.classList.add('kicked_in')

  setTimeout(function handleAfterKickedOutAnimation() {
    currentCountry.classList.remove('kicked_out')
    currentCountry.classList.add('unmounted')
    nextCountry.classList.remove('kicked_in')

    if (currentCountryIdx < countries.length - 1) {
      rightArrow.classList.remove('hidden')
    }
  }, KICKED_ANIMATION_DURATION);

  const currentMascot = document.querySelector(`#${currentCountryId}_mascot`)
  const nextMascot = document.querySelector(`#${nextCountryId}_mascot`)

  currentMascot?.classList.add('mascot_hiding')
  setTimeout(() => {
    currentMascot?.classList.add('unmounted')
    nextMascot?.classList.remove('unmounted')
    nextMascot?.classList.add('mascot_showing')
  }, 200);

  const metaValues = document.querySelectorAll('#meta_value')
  metaValues[0].textContent = countries[currentCountryIdx].name
  metaValues[1].textContent = countries[currentCountryIdx].capital
  metaValues[2].textContent = countries[currentCountryIdx].language
  metaValues[3].textContent = countries[currentCountryIdx].population
  metaValues[4].textContent = countries[currentCountryIdx].area
  metaValues[5].textContent = countries[currentCountryIdx].gdp
}

function handleGlobeMovement() {
  if (currentCountryIdx === 1) { return }

  const { lat, lng } = countries[currentCountryIdx]
  globe.pointOfView({ lat, lng, altitude: VIEW_ALT }, VIEW_TRANSITION)
}

rightArrow.addEventListener('click', () => {
  rightArrow.classList.add('hidden')
  if (currentCountryIdx === 0) {
    const book = document.querySelector('#book')
    book.classList.add('unmounted')
  }

  handleCountryMovement()
  handleGlobeMovement()
})

/** home */
if (document.querySelector('#home')) {
  const book = document.querySelector('#book')
  const bookOpened = document.querySelector('#book_opened')
  const bookOpenedBackground = document.querySelector('#book_opened_background')

  book.addEventListener('click', () => {
    bookOpened.classList.remove('unmounted')
    bookOpenedBackground.classList.remove('unmounted')

    bookOpenedBackground.addEventListener('click', () => {
      if (bookOpened.classList.contains('unmounted')) { return }
      bookOpened.classList.add('unmounted')
      bookOpenedBackground.classList.add('unmounted')
    })
  })

}

/** korea */
if (document.querySelector('#korea')) {
  const tiger = document.querySelector('#korea #tiger')
  const cryingTiger = document.querySelector('#korea #tiger_cry')

  tiger.addEventListener('click', () => {
    tiger.classList.add('unmounted')
    cryingTiger.classList.remove('unmounted')
    
    setTimeout(() => {
      tiger.classList.remove('unmounted')
      cryingTiger.classList.add('unmounted')
    }, 1000);
  })
}

/** australia */
if (document.querySelector('#australia')) {
  const native = document.querySelector('#australia #native')
  const nativeHand = document.querySelector('#australia #native_hand')

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

/** ocean */
if (document.querySelector('#ocean')) {
  const bird = document.querySelector('#ocean #bird')

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

/** america */
if (document.querySelector('#america')) {
  const faceLips = [
    { 
      face: document.querySelector('#face1'),
      lip: document.querySelector('#lower_lip_1') 
    },
    { 
      face: document.querySelector('#face2'),
      lip: document.querySelector('#lower_lip_2') 
    },
    { 
      face: document.querySelector('#face3'),
      lip: document.querySelector('#lower_lip_3') 
    },
    { 
      face: document.querySelector('#face4'),
      lip: document.querySelector('#lower_lip_4') 
    },
  ]

  faceLips.forEach(({ face, lip }) => {
    face.addEventListener('click', () => {
      lip.classList.add('sing')
      setTimeout(() => {
        lip.classList.remove('sing')
      }, 1000)
    })
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

  const getRandomColor = () => {
    const randomColorIdx = Math.floor(Math.random() * colors.length)
    return colors[randomColorIdx]
  }

  document.addEventListener('mouseover', (e) => {
    const coloredMountain = e.target.closest('[id^=mountain_]')

    if (coloredMountain) {
      if (freshness[coloredMountain.id]) {
        freshness[coloredMountain.id] = false
        const color = colorMap[coloredMountain.id]
        coloredMountain.classList.remove('fresh_filter')
        coloredMountain.classList.add(color)
      } else {
        const randomColor = getRandomColor()
        coloredMountain.classList.forEach((item) => {
          if (item.includes('color_')) {
            coloredMountain.classList.remove(item)
          }
        })
        coloredMountain.classList.add(randomColor)
      }
    }
  })

  const moon = document.querySelector('#peru #moon')
  const ground = document.querySelector('#peru #ground')
  const mascot = document.querySelector('#peru_mascot_body')

  moon.addEventListener('mouseover', () => {
    const randomColor = getRandomColor()
    moon.classList.forEach((item) => {
      if (item.includes('color_')) {
        moon.classList.remove(item)
      }
    })
    moon.classList.add(randomColor)
  })

  ground.addEventListener('mouseover', () => {
    const randomColor = getRandomColor()
    ground.classList.forEach((item) => {
      if (item.includes('color_')) {
        ground.classList.remove(item)
      }
    })
    ground.classList.add(randomColor)
  })

  mascot.addEventListener('mouseover', () => {
    const randomColor = getRandomColor()
    mascot.classList.forEach((item) => {
      if (item.includes('color_')) {
        mascot.classList.remove(item)
      }
    })
    mascot.classList.add(randomColor)
  })
}

/** tanzania */
if (document.querySelector('#tanzania')) {
  
  
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
}

/** denmark */
if (document.querySelector('#denmark')) {
  const windowsToOpen = ['window_1_2', 'window_2_8', 'window_3_3', 'window_4_7']

  windowsToOpen.forEach((windowId) => {
    const closedWindow = document.querySelector(`#closed_${windowId}`)
    const openedWindow = document.querySelector(`#open_${windowId}`)

    closedWindow.addEventListener('click', () => {
      openedWindow.classList.remove('unmounted')

      openedWindow.addEventListener('click', () => {
        openedWindow.classList.add('unmounted')
      })
    })
  })
}