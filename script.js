const squares = document.querySelectorAll(".square");
const gameboard = document.querySelector(".gameboard");
const scoreboardX = document.getElementById("X")
const scoreboardO = document.getElementById("O")
const playerX = "X";
const playerO = "O";
const winnerDisplay = document.querySelector(".winnerdisplay");
let scoreX = 0;
let scoreO = 0;

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
let currentPlayer = playerX;

playerName();
//module gameboard check wat geklikt wordt of en deze al geklikt is of niet. vult zodoende X of O 
squares.forEach(square => { square.addEventListener("click", gameOn, { once: true }) }) //once true zorgt dat eventlistener weggaat na 1x

//shows playernames
function playerName() {
    playernameX = prompt("Please chose name for player 1");
    playernameO = prompt("Please chose name for player 2");
    const displayNameX = document.getElementById("nameX");
    const displayNameO = document.getElementById("nameO");
    displayNameX.innerText = playernameX;
    displayNameO.innerText = playernameO;

}
//displays score on screen
function displayScore() {
    if (currentPlayer == playerX) {
        scoreX++;
    } else {
        scoreO++;
    }
    scoreboardO.innerText = `${scoreO}`;
    scoreboardX.innerText = `${scoreX}`;
}

//functie die checkt welk vakje geklikt wordt en voegt er X of O aan toe, checkt for win of draw, switch turn en reset
function gameOn(e) {
    const cell = e.target;
    placeMark(cell, currentPlayer);
    if (checkWin(currentPlayer)) {

        winnerDisplay.textContent = `${currentPlayer} is the Winner!`;
        displayScore();
        squares.forEach(square => { square.removeEventListener("click", gameOn, { once: true }) });
    } else if (checkDraw()) {
        winnerDisplay.textContent = `Draw!`;
        squares.forEach(square => { square.removeEventListener("click", gameOn, { once: true }) });
    }

    swapTurn();
}

//lets currentplayer put mark on board
function placeMark(cell, currentPlayer) {
    cell.innerText = `${currentPlayer}`;
    cell.classList.add(currentPlayer);
}

//search array of squares to check if there is a draw
function checkDraw() {
    return [...squares].every(square => {
        return square.classList.contains(playerX) || square.classList.contains(playerO)
    })
}

//search array of squares to check if currentplayer has won
function checkWin(currentPlayer) {
    return winningCombination.some(combination => {
        return combination.every(index => {
            return squares[index].classList.contains(currentPlayer)
        })
    })

}

function swapTurn() {
    if (currentPlayer == playerX) {
        currentPlayer = playerO
    } else {
        currentPlayer = playerX
    }
}

const resetButton = document.querySelector(".button");
resetButton.addEventListener("click", resetGame);

function resetGame() {
    squares.forEach(square => {
        square.classList.remove(playerX);
        square.classList.remove(playerO);
        square.innerText = "";

    })
    winnerDisplay.textContent = "";
    squares.forEach(square => { square.addEventListener("click", gameOn, { once: true }) })
}