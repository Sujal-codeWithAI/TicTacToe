let turn = "X";
let gameActive = true;

// Create audio element for winning sound
const winSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
winSound.volume = 0.5; // Set volume to 50%

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function checkWin() {
    const boxes = document.getElementsByClassName('boxtext');
    
    // Check for win
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boxes[a].innerText && 
            boxes[a].innerText === boxes[b].innerText && 
            boxes[a].innerText === boxes[c].innerText) {
            document.querySelector('.info').innerText = `${boxes[a].innerText} Wins!`;
            gameActive = false;
            // Play winning sound
            winSound.play();
            return;
        }
    }
    
    // Check for draw
    const isDraw = Array.from(boxes).every(box => box.innerText);
    if (isDraw && gameActive) {
        document.querySelector('.info').innerText = "It's a Draw!";
        gameActive = false;
    }
}

// Handle box clicks
document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('click', () => {
        const boxtext = box.querySelector('.boxtext');
        if (!boxtext.innerText && gameActive) {
            boxtext.innerText = turn;
            checkWin();
            if (gameActive) {
                turn = turn === "X" ? "O" : "X";
                document.querySelector(".info").innerText = `Turn for ${turn}`;
            }
        }
    });
});

// Reset game
document.getElementById("reset").addEventListener("click", () => {
    document.querySelectorAll('.boxtext').forEach(box => box.innerText = "");
    turn = "X";
    gameActive = true;
    document.querySelector(".info").innerText = "Turn for X";
    // Reset sound if it's playing
    winSound.pause();
    winSound.currentTime = 0;
});
