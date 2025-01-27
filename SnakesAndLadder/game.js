let tog = 1;
let rollingSound = new Audio('rpg-dice-rolling-95182.mp3');
let winSound = new Audio('winharpsichord-39642.mp3');

let p1sum = 0;
let p2sum = 0;
let p1Immune = false; // Track immunity for Player 1
let p2Immune = false; // Track immunity for Player 2

// Define power-up squares
const powerUps = {
  5: { type: 'extraRoll', message: 'You get an extra roll!' },
  25: { type: 'immunity', message: 'You are immune to snakes for the next turn!' },
  50: { type: 'teleport', message: 'You are teleported to a random square!' },
};

// Snakes and Ladders logic
const jumps = {
  1: 38, 4: 14, 8: 30, 21: 42, 28: 76, 32: 10, 36: 6, 48: 26, 50: 67, 62: 18, 71: 92, 80: 99, 88: 24, 95: 56, 97: 78
};

function play(player, psum, correction, num) {
  let sum;
  if (psum === 'p1sum') {
    p1sum = p1sum + num;

    if (p1sum > 100) {
      p1sum = p1sum - num;
    }

    // Check for snakes and ladders (unless immune)
    if (!p1Immune && jumps[p1sum]) {
      p1sum = jumps[p1sum];
    }

    sum = p1sum;
  }

  if (psum === 'p2sum') {
    p2sum = p2sum + num;

    if (p2sum > 100) {
      p2sum = p2sum - num;
    }

    // Check for snakes and ladders (unless immune)
    if (!p2Immune && jumps[p2sum]) {
      p2sum = jumps[p2sum];
    }

    sum = p2sum;
  }

  // Check for power-ups
  checkPowerUp(player, sum);

  document.getElementById(`${player}`).style.transition = `linear all .5s`;

  if (sum < 10) {
    document.getElementById(`${player}`).style.left = `${(sum - 1) * 62}px`;
    document.getElementById(`${player}`).style.top = `${-0 * 62 - correction}px`;
  } else if (sum === 100) {
    winSound.play();
    if (player === 'p1') {
      alert("Red Won !!");
    } else if (player === 'p2') {
      alert("Yellow Won !!");
    }
    location.reload();
  } else {
    const numarr = Array.from(String(sum));
    const n1 = eval(numarr.shift());
    const n2 = eval(numarr.pop());

    if (n1 % 2 !== 0) {
      if (n2 === 0) {
        document.getElementById(`${player}`).style.left = `${9 * 62}px`;
        document.getElementById(`${player}`).style.top = `${(-n1 + 1) * 62 - correction}px`;
      } else {
        document.getElementById(`${player}`).style.left = `${(9 - (n2 - 1)) * 62}px`;
        document.getElementById(`${player}`).style.top = `${-n1 * 62 - correction}px`;
      }
    } else if (n1 % 2 === 0) {
      if (n2 === 0) {
        document.getElementById(`${player}`).style.left = `${0 * 62}px`;
        document.getElementById(`${player}`).style.top = `${(-n1 + 1) * 62 - correction}px`;
      } else {
        document.getElementById(`${player}`).style.left = `${(n2 - 1) * 62}px`;
        document.getElementById(`${player}`).style.top = `${-n1 * 62 - correction}px`;
      }
    }
  }
}

// Check for power-ups
function checkPowerUp(player, square) {
  if (powerUps[square]) {
    const { type, message } = powerUps[square];
    alert(message);

    if (type === 'extraRoll') {
      // Grant an extra roll
      setTimeout(() => {
        document.getElementById('diceBtn').click();
      }, 1000);
    } else if (type === 'immunity') {
      // Grant immunity to snakes for the next turn
      if (player === 'p1') {
        p1Immune = true;
      } else if (player === 'p2') {
        p2Immune = true;
      }
    } else if (type === 'teleport') {
      // Teleport to a random square
      const randomSquare = Math.floor(Math.random() * 100) + 1;
      if (player === 'p1') {
        p1sum = randomSquare;
      } else if (player === 'p2') {
        p2sum = randomSquare;
      }
      play(player, player === 'p1' ? 'p1sum' : 'p2sum', player === 'p1' ? 0 : 55, 0);
    }
  }
}

// Reset immunity after each turn
function resetImmunity() {
  p1Immune = false;
  p2Immune = false;
}

document.getElementById("diceBtn").addEventListener("click", function () {
  rollingSound.play();
  const num = Math.floor(Math.random() * 6) + 1;
  const diceElement = document.getElementById("dice");

  // Add rolling animation
  diceElement.classList.add('rolling');

  // Wait for the animation to finish before updating the dice value
  setTimeout(() => {
    diceElement.innerText = num;
    diceElement.classList.remove('rolling');

    if (tog % 2 !== 0) {
      document.getElementById('tog').innerText = "Yellow's Turn : ";
      play('p1', 'p1sum', 0, num);
    } else if (tog % 2 === 0) {
      document.getElementById('tog').innerText = "Red's Turn : ";
      play('p2', 'p2sum', 55, num);
    }

    resetImmunity(); // Reset immunity after each turn
    tog = tog + 1;
  }, 1000); // Match the duration of the roll animation
});