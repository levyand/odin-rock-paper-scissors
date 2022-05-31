const POSSIBLE_PLAYS = ['rock', 'paper', 'scissors'];

function computerPlay() {
  const rand = Math.floor(Math.random() * 3);
  
  return POSSIBLE_PLAYS[rand];
}

function playRound(playerSelection, computerSelection) {
  const player = playerSelection.toLowerCase();
  const computer = computerSelection.toLowerCase();

  switch (player) {
    case ('rock'):
      switch (computer) {
        case ('rock'):
          return 'Tie Game! You both chose Rock';
        case ('paper'):
          return 'You Lose! Paper covers Rock';
        case ('scissors'):
          return 'You Win! Rock crushes Scissors';
      }
    case ('paper'):
      switch (computer) {
        case ('rock'):
          return 'You Win! Paper covers Rock';
        case ('paper'):
          return 'Tie Game! You both chose Paper';
        case ('scissors'):
          return 'You Lose! Scissors cut Paper';
      }
    case ('scissors'):
      switch (computer) {
        case ('rock'):
          return 'You Lose! Rock crushes Scissors';
        case ('paper'):
          return 'You Win! Scissors cut Paper';
        case ('scissors'):
          return 'Tie Game! You both chose Scissors';
      }
    default:
      return `'${playerSelection}' is not a valid option.`;
  }
}

function game() {
  let playerScore = 0;
  let computerScore = 0;

  for (let i = 0; i < 5; i++) {
    const player = prompt('Make your selection.');
    const computer = computerPlay();

    const results = playRound(player, computer);

    console.log(`Round ${i + 1}: ${results}`);

    if (results.startsWith('You Win!')) {
      playerScore++;
    } else if (results.startsWith('You Lose!')) {
      computerScore++;
    }
  }

  console.log(`Final Score\nPlayer: ${playerScore}\nComputer: ${computerScore}`);

  if (playerScore > computerScore) {
    console.log('Congratulations, you win!');
  } else if (playerScore === computerScore) {
    console.log('You tied.');
  } else {
    console.log('Better luck next time, you lose.');
  }
}

game();
