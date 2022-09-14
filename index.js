// Create variables for the game state
let player1Score = 0
let player2Score = 0
let player1Turn = true

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const rollBtn = document.getElementById("rollBtn")
const dblBtn = document.getElementById("dblBtn")
const resetBtn = document.getElementById("resetBtn")
const diceImg1 = document.querySelector(".dice-img1")
const diceImg2 = document.querySelector(".dice-img2")
const player1Name = document.getElementById("p1name")
const player2Name = document.getElementById("p2name")
const p1Active = document.getElementById("p1-active")
const p2Active = document.getElementById("p2-active")
const shape1 = document.querySelector(".shape1")
const shape2 = document.querySelector(".shape2")

/* ==== EVENT LISTENERS==== */
/* Hook up a click event listener to the Roll Dice Button. */
 rollBtn.addEventListener("click", function() {
    const randomNumber = Math.floor(Math.random() * 6) + 1
    console.log(randomNumber)

    if (player1Turn) {
        player1Score += randomNumber
        player1Scoreboard.textContent = player1Score
        P1Classes()
        getDice(randomNumber, diceImg1)

    } else {
        player2Score += randomNumber
        player2Scoreboard.textContent = player2Score
        P2Classes()
        getDice(randomNumber, diceImg2)
    }
    
    if (player1Score >= 20) {
        player1Name.textContent = "Winner 🎉"
        showResetButton()
    }  else if (player2Score >= 20) {
        player2Name.textContent = "Winner 🎉"
        showResetButton()
    }
    player1Turn = !player1Turn
})
 
resetBtn.addEventListener("click", function(){
    reset()
})

dblBtn.addEventListener("click", function() {
    risk()
})

/* ====FUNCTIONS==== */

function showResetButton() {
    rollBtn.style.display = "none"
    dblBtn.style.display = "none"
    resetBtn.style.display = "block"
}

/* resets the game */
function reset() {
    player1Score = 0
    player2Score = 0
    player1Turn = true
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    resetBtn.style.display = "none"
    rollBtn.style.display = "block"
    dblBtn.style.display = "flex"
    p2Active.classList.remove("active-dot")
    p1Active.classList.add("active-dot")
    diceImg1.src = "images/blank.png"
    diceImg2.src = "images/blank.png"
    player1Name.textContent = "Player 1"
    player2Name.textContent = "Player 2"
    player1Dice.classList.remove("animate")
    player2Dice.classList.remove("animate")
}

/* player classes */
function P1Classes() {
    p1Active.classList.remove("active-dot")
    player1Dice.classList.add("animate")
    player2Dice.classList.remove("animate")
    p2Active.classList.add("active-dot")
    shape1.classList.remove("active-bg")
    shape2.classList.add("active-bg")
}

function P2Classes() {
    p2Active.classList.remove("active-dot")
    player2Dice.classList.add("animate")
    player1Dice.classList.remove("animate")
    p1Active.classList.add("active-dot")
    shape1.classList.add("active-bg")
    shape2.classList.remove("active-bg")
}

/* risk functions */
function riskP1() {
    p1Active.classList.remove("active-dot")
    p2Active.classList.add("active-dot")
    shape1.classList.remove("active-bg")
    shape2.classList.add("active-bg")
    player1Dice.classList.add("animate")
    player2Dice.classList.remove("animate")
}

function riskP2() {
    p2Active.classList.remove("active-dot")
    p1Active.classList.add("active-dot")
    shape1.classList.add("active-bg")
    shape2.classList.remove("active-bg")
    player2Dice.classList.add("animate")
    player1Dice.classList.remove("animate")
}
/* dice images */
/* could use for of */
function getDice(num, val) {
    if (num === 1) {   
            val.src = "images/Alea_1.png"
        } else if (num === 2) {
            val.src = "images/Alea_2.png"
        } else if (num === 3) {
            val.src = "images/Alea_3.png"
        } else if (num === 4) {
            val.src = "images/Alea_4.png"
        } else if (num === 5) {
            val.src = "images/Alea_5.png"
        } else if (num === 6) {
            val.src = "images/Alea_6.png"
        } else {
            val.src = ""
        }
}

/* risk it for the biscuit */
function risk() {
    const chance = Math.floor(Math.random() * 2)
    
    if (player1Turn) {
        if (chance === 1) {
            player1Score = player1Scoreboard.textContent * 2
            player1Scoreboard.textContent =  player1Score
            riskP1()

        } else {
            player1Score = Math.floor(player1Scoreboard.textContent / 2) 
            player1Scoreboard.textContent = player1Score
            riskP1()

        }
    }
    
    if (!player1Turn) {
        if (chance === 1) {
            player2Score = player2Scoreboard.textContent * 2
            player2Scoreboard.textContent = player2Score
            riskP2()
    
        } else {
            player2Score =  Math.floor(player2Scoreboard.textContent / 2)
            player2Scoreboard.textContent = player2Score
            riskP2()
        }
        
    }
    
    if (player1Scoreboard.textContent >= 20) {
        player1Name.textContent = "Winner 🎉"
        p1Active.classList.remove("active-dot")
        p2Active.classList.remove("active-dot")
        showResetButton()
    }  else if (player2Scoreboard.textContent >= 20) {
        player2Name.textContent = "Winner 🎉"
        p1Active.classList.remove("active-dot")
        p2Active.classList.remove("active-dot")
        showResetButton()
    }
    player1Turn = !player1Turn
}

