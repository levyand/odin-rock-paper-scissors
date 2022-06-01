const POSSIBLE_PLAYS = ['Rock', 'Paper', 'Scissors'];
const POSSIBLE_MESSAGES = {
  '00': 'You both chose Rock.',
  '01': 'Paper covers Rock.',
  '02': 'Rock crushes Scissors.',
  '11': 'You both chose Paper.',
  '12': 'Scissors cut Paper.',
  '22': 'You both chose Scissors.'
};
const RESULT_WIN = 'You Win!';
const RESULT_LOSE = 'You Lose!';

// Returns a random number between 0 and 2 representing the computers selection
function computerPlay() {
  return Math.floor(Math.random() * 3);
}

// Returns a number representing the players selection
function playerPlay() {
  const options = POSSIBLE_PLAYS.reduce((prev, curr) => `${prev}, ${curr}`);
  
  let player = -1;

  do {
    const playerInput = prompt(`${options}... SHOOT!.`);
    player = POSSIBLE_PLAYS.findIndex(val => val.toLowerCase() === playerInput.toLowerCase());

    if (player < 0) { console.log(`'${playerInput}' is not a valid option. Try again.`); }
  } while (player < 0);

  return player;
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
  if (playerSelection === computerSelection) {
    result = 'Draw!';
  } else if (((playerSelection + 1) % 3) === computerSelection) {
    result = RESULT_LOSE;
  } else {
    result = RESULT_WIN;
  }

  return {
    result,
    message
  };
}

// Plays a game of 5 rounds
function game() {
  let score = {
    player: 0,
    computer: 0
  };

  for (let i = 0; i < 5; i++) {
    const player = playerPlay();
    const computer = computerPlay();

    const { result, message } = playRound(player, computer);

    console.log(`Round ${i + 1}: ${result} ${message}`);

    if (result === RESULT_WIN) {
      score.player++;
    } else if (result === RESULT_LOSE) {
      score.computer++;
    }
  }

  console.log(`Final Score\nPlayer: ${score.player}\nComputer: ${score.computer}`);

  if (score.player === score.computer) {
    console.log("It's a draw.");
  } else if (score.player > score.computer) {
    console.log('Congratulations, you win!');
  } else {
    console.log('Better luck next time, you lose.');
  }
}

game();
