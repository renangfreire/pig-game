'use strict';

//DOM Elements
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const imgDice = document.querySelector('.dice')
const sectionPlayer = document.querySelectorAll('.player')   
const pScore = document.querySelectorAll('.score')
const currentValue = document.querySelectorAll('.current-score')
const crown = document.querySelectorAll('.crown')
const pWins = document.querySelectorAll('.wins-score')

// Ambient variables
let activePlayer = currentPlayer()
let players = [
    {
        score: 0,
        wins: 0
    },
    {
        score: 0,
        wins: 0
    }
]
let currentScore = 0;

// Start values
for(let i = 0; i < sectionPlayer.length; i++){
    pScore[i].textContent = 0 
    crown[i].classList.add('hidden')
    pWins[i].textContent = 0
}
imgDice.classList.add('hidden')

// Base Function = 'what is a current player?'
function currentPlayer () {
    let currPlayer

    for(let i = 0; i < sectionPlayer.length; i++){
        if(sectionPlayer[i].classList.contains('player--active'))
            currPlayer = i  
        }
    return currPlayer
}


// Dice Rolling 
function randomDice(){
    return Math.trunc(Math.random() * 6) + 1;
}

// Dice Rolling Click Function
function rollClick(){
    const dice = randomDice()

    imgDice.classList.contains('hidden') ? imgDice.classList.remove('hidden') : ''
    imgDice.setAttribute('src', `img/dice-${dice}.png`)

    if(dice == 1){
        currentScore = 0
        currentValue[activePlayer].textContent = 0;
        switchPlayer()
    }
    else{
        currentScore += dice        
    }
    currentValue[activePlayer].textContent = currentScore
}

// HoldScore Function
function holdScore(){
    if(!currentScore == 0){
    players[activePlayer].score += currentScore
    pScore[activePlayer].textContent = players[activePlayer].score
    currentScore = 0
    currentValue[activePlayer].textContent = 0;
    
    if(players[activePlayer].score >= 100){
        players[activePlayer].wins += 1;
        newGame()
    }else{
        switchPlayer()
    }
}
}

// Switch Player Function
function switchPlayer(){
    for(let i = 0; i < sectionPlayer.length; i++){
        if(!sectionPlayer[i].classList.contains('player--active')){
            sectionPlayer[i].classList.add('player--active')
            activePlayer = i
        }else{
            sectionPlayer[i].classList.remove('player--active')
        }
    }
}

// New Game Function
function newGame(){
    for(let i = 0; i < sectionPlayer.length; i++){
        players[i].score = 0;

        currentValue[i].textContent = 0;

        pScore[i].textContent = 0;
    }
    activePlayer = 0 
    loadWins()
}

// Wins Function
function loadWins(){
    for(let i = 0; i < players.length; i++){
        pWins[i].textContent = players[i].wins
    }
    winnerCrown()
}

// Crown Function
function winnerCrown(){
    let winsValues = players.map(function(key) { return key.wins; }); // Transform Object Players in Wins array
    let winsMax = Math.max(...winsValues); // Get max value in Wins Array
    const index = winsValues.indexOf(winsMax); // Get index of the max value in Wins Array
    
    for(let i = 0; i < players.length; i++){
        crown[i].classList.add('hidden')
    }

   if(!winsValues.reduce((a,b) => a === b)){ // if values in array are don't equal display crown
        crown[index].classList.remove('hidden')  
   }
}


// EventListeners
btnRoll.addEventListener('click', rollClick)

btnHold.addEventListener('click', holdScore)

btnNew.addEventListener('click', newGame)

