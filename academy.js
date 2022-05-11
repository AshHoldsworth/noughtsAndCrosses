// Make your changes to store and update game state in this file

let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

let noughtsTurn = true
console.log("Noughts Turn")

// Take the row and column number between 0 and 2
// (inclusive) and update the game state.
function takeTurn(row, column) {
    console.log("takeTurn was called with row: " + row + ", column:" + column);
    console.log(`takeTurn was called with row: ${row}, column: ${column}`);
    
    // checks if the space is NUL, then checks whos turn it is, and then populates with the board array with the O/X.
    if (board[row][column] === null && noughtsTurn === true) {
        board[row][column] = "nought"
        noughtsTurn = false
        console.log(board)
        console.log("Crosses Turn")
    } else if (board[row][column] === null ) {
        board[row][column] = "cross"
        noughtsTurn = true
        console.log(board)
        console.log("Noughts Turn")
    } else {
        console.log("Can't choose this piece you melon!")
        console.log(board)
    }
}

// Return either "noughts", "crosses" or "nobody" if the game is over.
// Otherwise return null to continue playing.
function checkWinner() {
    console.log("checkWinner was called");

    // All winning posibilities
    let winPosibilities = [
        [[0][0], [0][1], [0][2]],
        [[1][0], [1][1], [1][2]],
        [[2][0], [2][1], [2][2]],
        [[0][0], [1][0], [2][0]],
        [[0][1], [1][1], [2][1]],
        [[0][2], [1][2], [2][2]],
        [[0][0], [1][1], [2][2]],
        [[0][2], [1][1], [2][0]]
    ]

    // Two giant IF statements to check if the winning posibilities are populated by either 'noughts' or 'crosses'
    // and prints out if there is a winner.
    // Surely there is a FOR LOOP that can simplify this.
    if (board[0][0] === "nought" && board[0][1] === "nought" && board[0][2] === "nought") {
        console.log("Noughts Wins!")
    } else if (board[1][0] === "nought" && board[1][1] === "nought" && board[1][2] === "nought") {
        console.log("Noughts Wins!")
    } else if (board[2][0] === "nought" && board[2][1] === "nought" && board[2][2] === "nought") {
        console.log("Noughts Wins!")
    } else if (board[0][0] === "nought" && board[1][0] === "nought" && board[2][0] === "nought") {
        console.log("Noughts Wins!")
    } else if (board[0][1] === "nought" && board[1][1] === "nought" && board[2][1] === "nought") {
        console.log("Noughts Wins!")
    } else if (board[0][2] === "nought" && board[1][2] === "nought" && board[2][2] === "nought") {
        console.log("Noughts Wins!")
    } else if (board[0][0] === "nought" && board[1][1] === "nought" && board[2][2] === "nought") {
        console.log("Noughts Wins!")
    } else if (board[0][2] === "nought" && board[1][1] === "nought" && board[2][0] === "nought") {
        console.log("Noughts Wins!")
    }

    if (board[0][0] === "cross" && board[0][1] === "cross" && board[0][2] === "cross") {
        console.log("Crosses Wins!")
    } else if (board[1][0] === "cross" && board[1][1] === "cross" && board[1][2] === "cross") {
        console.log("Crosses Wins!")
    } else if (board[2][0] === "cross" && board[2][1] === "cross" && board[2][2] === "cross") {
        console.log("Crosses Wins!")
    } else if (board[0][0] === "cross" && board[1][0] === "cross" && board[2][0] === "cross") {
        console.log("Crosses Wins!")
    } else if (board[0][1] === "cross" && board[1][1] === "cross" && board[2][1] === "cross") {
        console.log("Crosses Wins!")
    } else if (board[0][2] === "cross" && board[1][2] === "cross" && board[2][2] === "cross") {
        console.log("Crosses Wins!")
    } else if (board[0][0] === "cross" && board[1][1] === "cross" && board[2][2] === "cross") {
        console.log("Crosses Wins!")
    } else if (board[0][2] === "cross" && board[1][1] === "cross" && board[2][0] === "cross") {
        console.log("Crosses Wins!")
    }


    // Loop to check all winning posibilites.
    // Doesn't seem to work at present.
    // for (i of winPosibilities) {
    //     if (board[winPosibilities[i]] === "nought") {
    //         console.log("Noughts Wins!")
    //     } else if (board[winPosibilities[i]] === "nought") {
    //         console.log("Crosses Wins!")
    //     }
    // }

    return null;
}

// Set the game state back to its original state to play another game.
function resetGame() {
    console.log("resetGame was called");

    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]

    noughtsTurn = true
    console.log
    console.log("Noughts Turn")
    
}

// Return the current board state with either a "nought" or a "cross" in
// each position. Put a null in a position that hasn't been played yet.
function getBoard() {
    console.log("getBoard was called");
    return board
}

if (typeof exports === 'object') {
    console.log("Running in Node")
    // Node. Does not work with strict CommonJS, but only CommonJS-like
    // environments that support module.exports, like Node.
    module.exports = {
        takeTurn,
        checkWinner,
        resetGame,
        getBoard,
    }
} else {
    console.log("Running in Browser")
}
