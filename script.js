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
                if (game.gameOver) {
                    return;
                } 
                else if (game.activePlayer === undefined) {
                    game.subtext.textContent = "No player names entered. Enter a player name and click Start game"
                }
                else if (game.activePlayer.name==="") {
                    game.subtext.textContent = "No player names entered. Enter a player name to begin."
                    return;
                }

                
                else if (gameboard.board[index]==="") {
                    gameboard.board[index] = game.activePlayer.marker;
                    square.textContent = game.activePlayer.marker;
                    game.checkWinner();
                    if (game.gameOver) {
                        return;
                    }
                    game.switchPlayer();
                    game.moveInformer();
                    game.checkTie();
                    console.log(game.activePlayer)
                }
                console.log(gameboard.board[index])
            })
        });

     return {
        board
    };
})();

const game = (() => {
    let player1;
    let player2;
    let gameOver = false;
    let subtext = document.querySelector('.subtext');
    let activePlayer;
    function start() {
        if (player1.name==="" && player2.name==="") {
            console.log('No players entered')
            subtext.textContent = "No player names entered. Enter a name for at least 1 player.";
        }
        else if (player1.name==="" && player2.name.length >0) {
            player1.name= "player1";
        } else if (player2.name==="" && player1.name.length > 0) {
            player2.name="player2";
        }
        console.log({player1, player2})
        activePlayer = player2;
        moveInformer()
    }
    function collectUserInformation() {
        const submitButton = document.querySelector('.submit');
        const player1Input = document.querySelector('#player1');
        const player2Input = document.querySelector('#player2');
        submitButton.addEventListener('click', (event)=>{
            event.preventDefault();
            player1 = Player(player1Input.value, 'X');
            player2 = Player(player2Input.value, 'O');
            start();
            console.log({player1, player2});
        })
    }
    collectUserInformation();
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
    function moveInformer() {
        if (player1.name.length > 0 || player2.name.length > 0) {
            subtext.textContent = `${activePlayer.name}, make your move`;
        }
    }
    function checkWinner() {
        if (game.gameOver) {
            return;
        }
        for (let axes of winningAxes) {
            console.log(axes);
            const [a, b, c] = axes;
            if (
                gameboard.board[a]===activePlayer.marker &&
                gameboard.board[b]===activePlayer.marker &&
                gameboard.board[c]===activePlayer.marker
            ) {
                console.log(`winner is ${game.activePlayer.name}`)
                subtext.textContent = `Winner of the game is ${game.activePlayer.name}`;
                gameOver = true;
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
        checkTie,
        get gameOver() {return gameOver},
        start,
        moveInformer,
        subtext

    }
})();
