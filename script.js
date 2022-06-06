const POSSIBLE_PLAYS = ['Rock', 'Paper', 'Scissors'];
const POSSIBLE_MESSAGES = {
  '00': 'You both chose Rock.',
  '01': 'Paper covers Rock.',
  '02': 'Rock crushes Scissors.',
  '11': 'You both chose Paper.',
  '12': 'Scissors cut Paper.',
  '22': 'You both chose Scissors.'
};

let scoreLimit;
let score = {
  player: 0,
  computer: 0
};

setupGame();

// Sets up the initial state of the game
function setupGame() {
  // reset scores to 0
  updateScore('player', 0);
  updateScore('computer', 0);

  // set score limit
  scoreLimit = 5;

  // reset message display
  updateMessage(`First to ${scoreLimit} wins.<br>Make a selection...`);

  // reset rounds display
  resetRoundResults();

  // enable option buttons and add event listeners
  const buttons = Array.from(document.querySelectorAll('.option'));
  buttons.forEach(btn => {
    btn.addEventListener('click', playerClick);
    btn.removeAttribute('disabled');
  });
}

// Completes the game and announces the winner
function endGame() {
  // update game conclusion message
  const gameResultMessage = score.player > score.computer ? 
      'You win! Congratulations!' : 'You lose. Better luck next time.';

  updateMessage(`${gameResultMessage}<br>Refresh the page to play again.`);

  // disable option buttons and remove event listeners
  const buttons = Array.from(document.querySelectorAll('.option'));
  buttons.forEach(btn => {
    btn.removeEventListener('click', playerClick);
    btn.setAttribute('disabled', 'true');
  });
}

// Sets the score of a single player and updates the UI
// player: a string denoting which players score to update ie: (player or computer)
// newScore: a number denoting the new score
function updateScore(player, newScore) {
  if (player !== 'player' && player !== 'computer') return;

  score[player] = newScore;

  const scoreDisplay = document.querySelector(`#${player}-score > p`);

  scoreDisplay.textContent = newScore;
}

// Updates the display message UI
function updateMessage(message) {
  const messageDisplay = document.querySelector('.message');
  messageDisplay.innerHTML = message;
}

// Add new item to the round result list
function addRoundResult(message) {
  const rounds = document.querySelector('.rounds');
  const roundResult = document.createElement('li');
  roundResult.textContent = message;
  rounds.appendChild(roundResult);
}

// Resets the round result list
function resetRoundResults() {
  const rounds = document.querySelector('.rounds');
  if (rounds.hasChildNodes()) {
    rounds.childNodes.forEach(node => rounds.removeChild(node));
  }
}

// Retreives the player selection and plays a single round against the computer.
// Records the winner and updates the score.
// If a player has reached the score limit ends game.
function playerClick(e) {
  const player = POSSIBLE_PLAYS.findIndex(val => val === e.target.textContent);
  const computer = computerPlay();

  const { winner, message } = playRound(player, computer);

  addRoundResult(message);

  // if the round is not a draw update the score of the winner
  if (winner) {
    updateScore(winner, score[winner] + 1);
  }

  if (score.player >= scoreLimit || score.computer >= scoreLimit) {
    endGame();
  }
}

// Returns a random number between 0 and 2 representing the computers selection
function computerPlay() {
  return Math.floor(Math.random() * 3);
}

// Returns results of a single round
function playRound(playerSelection, computerSelection) {
  // Generate a message based on the selections and the possible outcomes
  const messageKey = playerSelection > computerSelection ? 
    `${computerSelection}${playerSelection}` : 
    `${playerSelection}${computerSelection}`;
  const message = POSSIBLE_MESSAGES[messageKey];

  // Determine who won and return the result with an additional message
  let result;
  let winner;
  if (playerSelection === computerSelection) {
    result = 'Draw!';
  } else if (((playerSelection + 1) % 3) === computerSelection) {
    result = 'You Lose!';
    winner = 'computer';
  } else {
    result = 'You Win!';
    winner = 'player';
  }

  return {
    winner,
    message: `${result} ${message}`
  };
}
