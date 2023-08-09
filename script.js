// Tic tac toe game
// Game board stored as an array inside of a Gameboard object
// Players stored as objects
// Object to control the flow of the game


// JS function that will render content of gameboard array to page
// For now manually add X's and O's

// Build functions that allow players to add marks to a specific spot on the board
// and then tie it to the DOM. Letting players click on the gameboard to place their
// marker.
// Logic to keep player from adding to an already taken spot

// Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.

// Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!

// Factory function when one of something is required

const Player = (name, marker) => {
    return { name, marker };
}


// Module that creates an empty gameboard
const gameboard = (() => {
    const columns = 3;
    const rows = 3;
    let board = [];
    for (i=0; i < columns*rows; i++) {
        board.push("");
    }
    console.log(board)


     // display square for each array item
     let squares = document.querySelector('.squares');

     board.forEach((item, index) => {
        const square = document.createElement('div');
        square.className = 'square';
        squares.appendChild(square);
     })

     Array.from(squares.children).forEach((square, index) =>{
        square.addEventListener('click',() => {
            if (gameboard.board[index]==="") {
                gameboard.board[index] = game.activePlayer.marker;
                square.textContent = game.activePlayer.marker;
                game.checkWinner();
                game.switchPlayer();
                game.checkTie();
                console.log(game.activePlayer)
            }
            console.log(gameboard.board[index])
        })
     })

     return {
        board
    };

})();

const game = (() => {
    const player1 = Player('taco', 'X');
    const player2 = Player('many', 'O');

    let activePlayer = player2;

    const winningAxes = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],

    ];



    function checkWinner() {
        for (let axes of winningAxes) {
            console.log(axes);
            const [a, b, c] = axes;
            if (
                gameboard.board[a]===activePlayer.marker &&
                gameboard.board[b]===activePlayer.marker &&
                gameboard.board[c]===activePlayer.marker
            ) {
                console.log(`winner is ${activePlayer.name}`)
                return;
            }
        }
    }

    function switchPlayer() {
        if (activePlayer === player1) {
            activePlayer = player2;
        } else {
            activePlayer = player1;
        }
    }

    function checkTie() {
        if(!gameboard.board.includes("")) {
            console.log("Game is tie");
            return;
        }
    }

    return {
        get activePlayer() {return activePlayer},
        checkWinner,
        switchPlayer,
        checkTie

    }
})();
