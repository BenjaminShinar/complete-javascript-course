'use strict';

const msg = document.querySelector('.message');
const ogMsg = msg.textContent;
const body = document.querySelector('body');
const guessElement = document.querySelector('.guess');
console.log(msg);
console.log(msg.textContent);

//document.querySelector('.message').textContent = '🎉 correct Version!'; //change the message!
//document.querySelector('.number').textContent = 13;

//console.log('guess value', document.querySelector('.guess').value); // get value
//document.querySelector('.guess').value = 11; //set value
let highScore = 0;
//those are in the reset game functionality
let score;
let gameRunning;
let secretNumber;

const updateScore = () => {
  document.querySelector('.score').textContent = score;
  if (score === 0) {
    gameRunning = false;
  }
};

const updateHighScore = () => {
  if (score > highScore) {
    highScore = score;
    document.querySelector('.highscore').textContent = highScore;
  }
  body.style.backgroundColor = '#60b347';
  gameRunning = false;
};

function resetGame() {
  secretNumber = 1 + Math.trunc(Math.random() * 20); // [1,20] inclusive
  score = 20;
  updateScore(score);
  gameRunning = true;
  msg.textContent = ogMsg;
  body.style.backgroundColor = '#222';
  guessElement.value = '';
}

document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(guessElement.value);
  if (!guess) {
    console.log(`undefined! guess is ${guess} of type ${typeof guess}`);
  } else if (!gameRunning) {
    console.log(`the game was done!`);
  } else if (guess === secretNumber) {
    //game logic
    msg.textContent = `${guess} is correct number!`;
    updateHighScore();
  } else {
    const direction = guess > secretNumber ? 'high' : 'low';
    msg.textContent = `${guess} is too ${direction}!`;
    --score;
  }
  updateScore();
}); //add event handler to the elements of class check, to the 'click' event, use an anonymous function

document.querySelector('.again').addEventListener('click', resetGame); //use a name function

//document.querySelector('.number').textContent = secretNumber; // display the number
resetGame();
