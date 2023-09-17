const N = 4;
const WT = 1024;

/*N= size of the board*/
/*WT= wining tile*/ 

let board = new Array(N).fill(null).map(() => new Array(N).fill(0));
let score = 0;

function startGame() {
    board = new Array(N).fill(null).map(() => new Array(N).fill(0));
    addRandomTile();
    addRandomTile();
    updateBoard();
}

function addRandomTile() {
    const availableTiles = [];
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (board[i][j] === 0) {
                availableTiles.push({ x: i, y: j });
            }
        }
    }
    if (availableTiles.length > 0) {
        const { x, y } = availableTiles[Math.floor(Math.random() * availableTiles.length)];
        board[x][y] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateBoard() {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const tile = document.getElementById(`tile-${i}-${j}`);
            if (board[i][j] === 0) {
                tile.textContent = '';
                tile.className = 'tile';
            } else {
                tile.textContent = board[i][j];
                tile.className = `tile tile-${board[i][j]}`;
            }
        }
    }
    document.getElementById("score").textContent = score;
}

window.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const tile = document.createElement('div');
            tile.id = `tile-${i}-${j}`;
            tile.className = 'tile';
            gameContainer.appendChild(tile);
        }
    }
    startGame();
});

function moveTilesLeft() {
    for (let row = 0; row < N; row++) {
        let currentPos = 0;
        for (let col = 1; col < N; col++) {
            if (board[row][col] !== 0) {
                if (board[row][currentPos] === 0) {
                    board[row][currentPos] = board[row][col];
                    board[row][col] = 0;
                } else if (board[row][currentPos] === board[row][col]) {
                    board[row][currentPos] *= 2;
                    board[row][col] = 0;
                    score += board[row][currentPos];
                } else {
                    currentPos++;
                    if (currentPos !== col) {
                        board[row][currentPos] = board[row][col];
                        board[row][col] = 0;
                    }
                }
            }
        }
    }
}

function moveTilesRight() {
    for (let row = 0; row < N; row++) {
        let currentPos = N - 1;
        for (let col = N - 2; col >= 0; col--) {
            if (board[row][col] !== 0) {
                if (board[row][currentPos] === 0) {
                    board[row][currentPos] = board[row][col];
                    board[row][col] = 0;
                } else if (board[row][currentPos] === board[row][col]) {
                    board[row][currentPos] *= 2;
                    board[row][col] = 0;
                    score += board[row][currentPos];
                } else {
                    currentPos--;
                    if (currentPos !== col) {
                        board[row][currentPos] = board[row][col];
                        board[row][col] = 0;
                    }
                }
            }
        }
    }
}

function moveTilesUp() {
    for (let col = 0; col < N; col++) {
        let currentPos = 0;
        for (let row = 1; row < N; row++) {
            if (board[row][col] !== 0) {
                if (board[currentPos][col] === 0) {
                    board[currentPos][col] = board[row][col];
                    board[row][col] = 0;
                } else if (board[currentPos][col] === board[row][col]) {
                    board[currentPos][col] *= 2;
                    board[row][col] = 0;
                    score += board[currentPos][col];
                } else {
                    currentPos++;
                    if (currentPos !== row) {
                        board[currentPos][col] = board[row][col];
                        board[row][col] = 0;
                    }
                }
            }
        }
    }
}

function moveTilesDown() {
    for (let col = 0; col < N; col++) {
        let currentPos = N - 1;
        for (let row = N - 2; row >= 0; row--) {
            if (board[row][col] !== 0) {
                if (board[currentPos][col] === 0) {
                    board[currentPos][col] = board[row][col];
                    board[row][col] = 0;
                } else if (board[currentPos][col] === board[row][col]) {
                    board[currentPos][col] *= 2;
                    board[row][col] = 0;
                    score += board[currentPos][col];
                } else {
                    currentPos--;
                    if (currentPos !== row) {
                        board[currentPos][col] = board[row][col];
                        board[row][col] = 0;
                    }
                }
            }
        }
    }
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        moveTilesLeft();
    } else if (event.key === 'ArrowRight') {
        moveTilesRight();
    } else if (event.key === 'ArrowUp') {
        moveTilesUp();
    } else if (event.key === 'ArrowDown') {
        moveTilesDown();
    }
    addRandomTile();
    updateBoard();
    checkWin();
    checkLoss();
});

function checkWin() {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (board[i][j] === WT) {
                alert('Congragulations, You win!');
                startGame();
                return;
            }
        }
    }
}

function checkLoss() {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (board[i][j] === 0) {
                return;
            }
            if (
                (i < N - 1 && board[i][j] === board[i + 1][j]) ||
                (j < N - 1 && board[i][j] === board[i][j + 1])
            ) {
                return;
            }
        }
    }
    alert('Come on , Give it a Try Again.');
    alert('You can do it..');
    startGame();
}
