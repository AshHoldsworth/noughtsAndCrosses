// This file contains helper code beyond the first week "Intro to JavaScript" course content.
// You should not have to make any changes in this file to get your game working.

document.getElementById('display-player-1-pretext').textContent = "Sonic: "
document.getElementById('display-player-2-pretext').textContent = "Tails: "

let player1Score = 0
let player2Score = 0

// Validate academite functions are available
const functions = ["takeTurn", "getBoard", "checkWinner", "resetGame", "submitPlayerNames"];
for (f of functions) {
    const functionObject = window[f];
    if (typeof functionObject !== "function") {
        throw `Looks like expected function '${f}' is missing. Double check the function signatures from academy.js are still present and unaltered.`;
    }
}

// Clear down the elements drawn on the board.
function clearBoard() {
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).innerHTML = ""
        }
    }
}

// Populate the grid with images based on the board state.
function drawBoard(board) {
    clearBoard();
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
            if (!board[rowIndex][columnIndex]) {
                continue;
            }

            const sonicImage = document.createElement("img");
            sonicImage.src = "sonic.png"

            const tailsImage = document.createElement("img");
            tailsImage.src = "tails.png"

            const cellText = board[rowIndex][columnIndex] === "nought" ? sonicImage : tailsImage;
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).appendChild(cellText);
        }
    }
}

function isValidRowOrColumn(array) {
    return Array.isArray(array) && array.length === 3;
}

function isValidColumn(columnArray) {
    return isValidRowOrColumn(columnArray) && columnArray.every(function (item) { return ["nought", "cross", null].includes(item); });
}

// A grid position was clicked call the game's turn function, redraw and then check for a winner.
function positionClick(rowIndex, columnIndex, event) {
    takeTurn(rowIndex, columnIndex);
    const board = getBoard();
    if (!isValidRowOrColumn(board) || !board.every(isValidColumn)) {
        throw "Expecting 'getBoard' to return a 2d array where all values match are null or one of the strings 'nought' or 'cross'. Actually received: " + JSON.stringify(board);
    }
    drawBoard(board);
    let winner = checkWinner();

    if (winner) {
        if (typeof winner !== "string" || !["noughts", "crosses", "nobody"].includes(winner)) {
            throw "Expecting 'checkWinner' to return null or one of the strings 'noughts', 'crosses' or 'nobody'. Actually received: " + winner;
        }
        const player1 = document.getElementById("player-1").value
        const player2 = document.getElementById("player-2").value

        if (winner === "noughts") {
            winner = player1
            player1Score++
            console.log("Player 1 score: " + player1Score)
        } else if (winner === "crosses") {
            winner = player2
            player2Score++
            console.log("Player 2 score: " + player2Score)
        }

        const winnerName = document.getElementById("winner-name")
        winnerName.innerText = winner;
        const winnerDisplay = document.getElementById("winner-display")
        winnerDisplay.style.display = "block";

        const playAgainButton = document.getElementById('play-again')
        playAgainButton.style.display="block"

        const displayScores = document.getElementById('scores')
        displayScores.style.display = "block"
        const displayPlayer1Score = document.getElementById('player-1-score')
        const displayPlayer2Score = document.getElementById('player-2-score')
        displayPlayer1Score.textContent = player1Score
        displayPlayer2Score.textContent = player2Score
        
    }
}


// The submit button was clicked.
function submitNamesClick(event) {
    event.preventDefault()

    const player1 = document.getElementById("player-1").value
    const player2 = document.getElementById("player-2").value
    
    if (player1 === "" || player2 === "") {
        alert("Please enter names in both boxes.")
    } else {
        submitPlayerNames(player1, player2)
        const displaySubmittedNamesForm = document.getElementById('submit-names-form')
        displaySubmittedNamesForm.style.display = "none"

        const sonicImage = document.createElement("img");
        sonicImage.src = "sonic.png"
        const tailsImage = document.createElement("img");
        tailsImage.src = "tails.png"

        let playerNoughts = document.getElementById('player-noughts')
        let playerCrosses = document.getElementById('player-crosses')
        document.getElementById('sonic-image').appendChild(sonicImage)
        document.getElementById('tails-image').appendChild(tailsImage)
        playerNoughts.textContent = player1
        playerCrosses.textContent = player2

        const displaySubmittedNames = document.getElementById('submitted-names')
        displaySubmittedNames.style.display = "block"
    }
}

// The reset button was clicked, call the game's reset function then reset the DOM.
function resetClick(event) {
    resetGame();
    const winnerName = document.getElementById("winner-name");
    winnerName.innerText = "";
    const winnerDisplay = document.getElementById("winner-display");
    winnerDisplay.style.display = "None";
    clearBoard();

    const displaySubmittedNamesForm = document.getElementById('submit-names-form')
    displaySubmittedNamesForm.style.display = "block"
    document.getElementById("player-1").value = ""
    document.getElementById("player-2").value = ""

    document.getElementById('sonic-image').textContent = ""
    document.getElementById('tails-image').textContent = ""

    const displaySubmittedNames = document.getElementById('submitted-names')
    displaySubmittedNames.style.display = "none"

    const displayScores = document.getElementById('scores')
    displayScores.style.display = "none"
    player1Score = 0
    player2Score = 0

    const playAgainButton = document.getElementById('play-again')
    playAgainButton.style.display="none"
}

function playAgainClick(event) {
    playAgain();
    clearBoard();

    const winnerDisplay = document.getElementById("winner-display");
    winnerDisplay.style.display = "None";
}

// Bind the click events for the grid.
for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
        const gridPosition = document.getElementById(`row-${rowIndex}-column-${columnIndex}`);
        gridPosition.addEventListener("click", positionClick.bind(null, rowIndex, columnIndex));
    }
}

// Bind the click event for the submit names button.
const submitNamesButton = document.getElementById("submit-names-btn")
submitNamesButton.addEventListener("click", submitNamesClick)

// Bind the click event for the reset button.
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetClick);

const playAgainButton = document.getElementById("play-again");
playAgainButton.addEventListener("click", playAgainClick);

if (typeof exports === 'object') {
    console.log("Running in Node")
    // Node. Does not work with strict CommonJS, but only CommonJS-like 
    // environments that support module.exports, like Node.
    module.exports = {
        clearBoard,
        drawBoard,
        isValidRowOrColumn,
        isValidColumn,
        positionClick,
        resetClick,
    }
} else {
    console.log("Running in Browser")
}
