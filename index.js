const svg = document.getElementById('svg-element')
const warp = new Warp(svg)

warp.interpolate(4)
warp.transform(([ x, y ]) => [ x, y, y ])

let offset = 0
function animate()
{
  warp.transform(([ x, y, oy ]) => [ x, oy + 4 * Math.sin(x / 16 + offset), oy ])
  offset += 0.1
  requestAnimationFrame(animate)
}

animate()

const projects = [
  {
    id: 'jump_kick',
    name: 'Jumpkick Around The World',
    x: 480,
    y: 180,
    width: 170,
    href: './1/index.html'
  },
  {
    id: 'face_time',
    name: 'Face time',
    x: 840,
    y: 320,
    width: 60,
    href: './2/index.html'
  }
]

const background = document.querySelector('#background')

projects.forEach(({ id, name, x, y, width, href }) => {
  const $project = document.createElement('a')
  $project.classList.add('project')
  $project.style.left = `${x}px`
  $project.style.top = `${y}px`
  $project.href = href

  const $image = document.createElement('img')
  $image.classList.add('project-image')
  $image.src = `./assets/${id}.png`
  $image.style.width = `${width}px`
  $image.draggable = false

  const $name = document.createElement('div')
  $name.classList.add('project-name')
  $name.textContent = name

  $project.appendChild($image)
  $project.appendChild($name)

  background.appendChild($project)
})

let isDragging = false
let disableClickEvent = false
let initX = 0
let initY = 0

const move = (target, left, right) => {
  target.style.left = `${left}px`
  target.style.top = `${right}px`
}

const handleDragStart = (e) => {
  isDragging = true

  initX = e.pageX
  initY = e.pageY
}

const handleDrag = (e) => {
  if (!isDragging) return
  e.preventDefault()

  disableClickEvent = true

  const target = e.target.closest('.project')
  const { x, y } = target.getBoundingClientRect()

  const offsetX = initX - e.pageX
  const offsetY = initY - e.pageY

  const xTo = x - offsetX
  const yTo = y - offsetY

  move(target, xTo, yTo)

  initX = e.pageX
  initY = e.pageY
}

const handleDragEnd = (e) => {
  isDragging = false
  setTimeout(() => {
    disableClickEvent = false
  }, 100);

  initX = e.pageX
  initY = e.pageY
}

const handleClick = (e) => {
  if (disableClickEvent) {
    return e.preventDefault()
  }
}

document.querySelectorAll('.project').forEach($project => {
  $project.ondragstart = () => false
  $project.addEventListener('mousedown', handleDragStart, true)
  $project.addEventListener('mousemove', handleDrag, true)
  $project.addEventListener('mouseup', handleDragEnd, true)
  $project.addEventListener('click', handleClick)
})