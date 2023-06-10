document.addEventListener('mousemove', (e) => {
    // console.log(e.pageX, e.pageY)

    const leftPupil = document.querySelector('#left_pupil')
    const rightPupil = document.querySelector('#right_pupil')

    // console.log({ leftPupil, rightPupil})
    
    const leftPupilX = leftPupil.getBoundingClientRect().left
    const leftPupilY = leftPupil.getBoundingClientRect().top
    const rightPupilX = rightPupil.getBoundingClientRect().left
    const rightPupilY = rightPupil.getBoundingClientRect().top

    const leftX = (e.pageX - leftPupilX) / 45
    const leftY = (e.pageY - leftPupilY) / 25
    const rightX = (e.pageX - rightPupilX) / 45
    const rightY = (e.pageY - rightPupilY) / 25

    leftPupil.style.transform = `translate(${leftX}px, ${leftY}px)`
    rightPupil.style.transform = `translate(${rightX}px, ${rightY}px)`
})

const frame = document.querySelector('#frame')
const leftEye = document.querySelector('#left_eye')
const rightEye = document.querySelector('#right_eye')
const leftPupil = document.querySelector('#left_pupil')
const rightPupil = document.querySelector('#right_pupil')
const leftEyeClosed = document.querySelector('#left_eye_closed')
const rightEyeClosed = document.querySelector('#right_eye_closed')
const leftTear = document.querySelector('#left_tear')
const rightTear = document.querySelector('#right_tear')

frame.addEventListener('click', (e) => {
    leftEye.style.display = 'none'
    rightEye.style.display = 'none'
    leftEyeClosed.style.display = 'block'
    rightEyeClosed.style.display = 'block'
    leftTear.style.display = 'block'
    rightTear.style.display = 'block'
    
    leftTear.classList.add('teardrop')
    rightTear.classList.add('teardrop')

    window.setTimeout(() => {
        leftEye.style.display = 'flex'
        rightEye.style.display = 'flex'
        leftEyeClosed.style.display = 'none'
        rightEyeClosed.style.display = 'none'
    }, 700);

    window.setTimeout(() => {
        leftTear.classList.remove('teardrop')
        rightTear.classList.remove('teardrop')
        leftTear.style.display = 'none'
        rightTear.style.display = 'none'
    }, 1000);
})
