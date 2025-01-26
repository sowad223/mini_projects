const cells = document.querySelectorAll('.cell');
const pieces = document.querySelectorAll('.piece');
const rollDiceButton = document.getElementById('roll-dice');
const diceResult = document.getElementById('dice-result');

// Define snakes and ladders
const snakes = {
  14: 7,
  27: 10,
  35: 22,
  45: 30,
  67: 50,
  80: 60
};

const ladders = {
  3: 22,
  11: 35,
  25: 44,
  40: 59,
  52: 72,
  70: 89
};

let currentPlayer = 1;

// Sound effects
const diceSound = document.getElementById('dice-sound');
const snakeSound = document.getElementById('snake-sound');
const ladderSound = document.getElementById('ladder-sound');
const winSound = document.getElementById('win-sound');

// Function to roll the dice
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// Function to move the piece
function movePiece(player, steps) {
  const piece = document.querySelector(`.piece[data-player="${player}"]`);
  let currentPosition = parseInt(piece.getAttribute('data-position'));
  let newPosition = currentPosition + steps;

  // Check if the new position is beyond the board
  if (newPosition >= cells.length) {
    newPosition = cells.length - 1;
  }

  // Check for snakes
  if (snakes[newPosition]) {
    newPosition = snakes[newPosition];
    snakeSound.play();
    alert(`Player ${player} got bitten by a snake!`);
  }

  // Check for ladders
  if (ladders[newPosition]) {
    newPosition = ladders[newPosition];
    ladderSound.play();
    alert(`Player ${player} climbed a ladder!`);
  }

  // Update piece position
  piece.setAttribute('data-position', newPosition);
  const cell = document.querySelector(`.cell[data-index="${newPosition}"]`);
  const cellRect = cell.getBoundingClientRect();
  piece.style.left = `${cellRect.left + 5}px`;
  piece.style.top = `${cellRect.top + 5}px`;

  // Check for win condition
  if (newPosition === cells.length - 1) {
    winSound.play();
    alert(`Player ${player} wins!`);
    resetGame();
  }
}

// Function to reset the game
function resetGame() {
  pieces.forEach(piece => {
    piece.setAttribute('data-position', 0);
    const cell = document.querySelector(`.cell[data-index="0"]`);
    const cellRect = cell.getBoundingClientRect();
    piece.style.left = `${cellRect.left + 5}px`;
    piece.style.top = `${cellRect.top + 5}px`;
  });
  currentPlayer = 1;
}

// Event listener for rolling the dice
rollDiceButton.addEventListener('click', () => {
  const steps = rollDice();
  diceSound.play();
  diceResult.textContent = `🎲 ${steps}`;
  diceResult.style.animation = 'spin 0.5s ease-in-out';
  setTimeout(() => {
    movePiece(currentPlayer, steps);
    currentPlayer = currentPlayer === 1 ? 2 : 1;
  }, 500);
});

// Initialize piece positions
pieces.forEach(piece => {
  const cell = document.querySelector(`.cell[data-index="0"]`);
  const cellRect = cell.getBoundingClientRect();
  piece.style.left = `${cellRect.left + 5}px`;
  piece.style.top = `${cellRect.top + 5}px`;
});