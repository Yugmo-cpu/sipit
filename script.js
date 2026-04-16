const gifStages = [
    "https://media.tenor.com/gw1XjvvoZIAAAAAj/anuragita-anuragita-boy.gif",    // 0 normal
    "https://media.tenor.com/zg5C49h6QGwAAAAj/anuragita-anuragita-boy.gif",  // 1 confused
    "https://media.tenor.com/_6sADGAk28oAAAAj/anuragita-anuragita-boy.gif",             // 2 pleading
    "https://media.tenor.com/zKmPaF4n404AAAAj/anuragita-anuragita-boy.gif",             // 3 sad
    "https://media.tenor.com/EHnQZScdaLMAAAAj/anuragita-anuragita-boy.gif",       // 4 sadder
    "https://media.tenor.com/NkNRERIo1uQAAAAi/anuragita-anuragita-boy.gif",             // 5 devastated
    "https://media.tenor.com/yFmf-BfckfYAAAAj/anuragita-anuragita-boy.gif",               // 6 very devastated
    "https://media.tenor.com/XrfWz4ISCakAAAAj/anuragita-anuragita-boy.gif"  // 7 crying runaway
]

const noMessages = [
    "No",
    "Are you sure? 🤔",
    "cutie please... 🥺",
    "If you say No, I will be really sad...",
    "You making me sad... 😢",
    "Please??? 💔",
    "Don't hate me...",
    "Last chance! 😭",
    "Catch me if you can 😜"
]

const yesTeasePokes = [
    "try No first... I bet you like it 😏",
    "Keep going , hit No... once more 👀",
    "bit more 😈",
    "I dare you..click No,  😏"
]

let yesTeasedCount = 0

let noClickCount = 0
let runawayEnabled = false
let musicPlaying = false

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

// Suggestion: iOS Safari requires audio to start on a user interaction.
// This listener waits for the first tap anywhere to start the music properly.
function initAudio() {
    if (!musicPlaying) {
        music.volume = 0.3
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}
document.addEventListener('touchstart', initAudio, { once: true });
document.addEventListener('click', initAudio, { once: true });

function toggleMusic() {
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

function handleYesClick() {
    if (!runawayEnabled) {
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
        yesTeasedCount++
        showTeaseMessage(msg)
        return
    }
    window.location.href = 'yes.html'
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

function handleNoClick() {
    noClickCount++

    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`
    
    // Suggestion: Capped the padding to prevent it from covering the entire screen
    const padY = Math.min(18 + noClickCount * 5, 40)
    const padX = Math.min(45 + noClickCount * 10, 80)
    yesBtn.style.padding = `${padY}px ${padX}px`

    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    // Suggestion: Ensures touchscreens (phones) trigger the runaway too
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        runAway();
    }, { passive: false })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.max(margin, Math.random() * maxX)
    const randomY = Math.max(margin, Math.random() * maxY)

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
}