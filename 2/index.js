const frame = document.querySelector('#frame')

const leftEye = document.querySelector('#left_eye')
const rightEye = document.querySelector('#right_eye')

const leftPupil = document.querySelector('#left_pupil')
const rightPupil = document.querySelector('#right_pupil')

const leftEyeClosed = document.querySelector('#left_eye_closed')
const rightEyeClosed = document.querySelector('#right_eye_closed')

const leftTear = document.querySelector('#left_tear')
const rightTear = document.querySelector('#right_tear')

let isClosed = false

document.addEventListener('mousemove', (e) => {
    if (isClosed) { return }

    const leftPupilX = leftPupil.getBoundingClientRect().left
    const leftPupilY = leftPupil.getBoundingClientRect().top

    const rightPupilX = rightPupil.getBoundingClientRect().left
    const rightPupilY = rightPupil.getBoundingClientRect().top

    const leftX = (e.pageX - leftPupilX) / 50
    const leftY = (e.pageY - leftPupilY) / 30

    const rightX = (e.pageX - rightPupilX) / 50
    const rightY = (e.pageY - rightPupilY) / 30

    leftPupil.style.transform = `translate(${leftX}px, ${leftY}px)`
    rightPupil.style.transform = `translate(${rightX}px, ${rightY}px)`
})

frame.addEventListener('click', () => {
    isClosed = true

    leftEye.style.display = 'none'
    rightEye.style.display = 'none'
    leftPupil.style.display = 'none'
    rightPupil.style.display = 'none'
    leftEyeClosed.style.display = 'block'
    rightEyeClosed.style.display = 'block'
    leftTear.style.display = 'block'
    rightTear.style.display = 'block'
    
    leftTear.classList.add('teardrop')
    rightTear.classList.add('teardrop')

    window.setTimeout(() => {
        leftEye.style.display = 'flex'
        rightEye.style.display = 'flex'
        leftPupil.style.display = 'block'
        rightPupil.style.display = 'block'
        leftEyeClosed.style.display = 'none'
        rightEyeClosed.style.display = 'none'

        isClosed = false
    }, 700);

    window.setTimeout(() => {
        leftTear.classList.remove('teardrop')
        rightTear.classList.remove('teardrop')

        leftTear.style.display = 'none'
        rightTear.style.display = 'none'
    }, 1000);
})

/** @description wavy warp eye */
document.querySelectorAll('svg').forEach((eye) => {
    const warp = new Warp(eye)
    
    warp.interpolate(4)
    warp.transform(([ x, y ]) => [ x, y, y ])
    
    let offset = 0

    const animate = () => {
        warp.transform(([ x, y, oy ]) => [ x, oy + 4 * Math.sin(x / 6 + offset), oy ])
        offset += 0.13
        requestAnimationFrame(animate)
    }
    
    animate()
})