'use strict';
const players = document.querySelectorAll('.player');
// const scoresEl = [
//   document.querySelector('#score--0'),
//   document.getElementById('score--1'),
// ];
const diceImageEl = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const currentScoresEl = [
  document.querySelector('#current--0'),
  document.querySelector('#current--1'),
];
const PlayersScores = document.querySelectorAll('.score');

const maxScore = 25;
const hiddenC = 'hidden';
const winnerPlayerC = 'player--winner';
const playerActiveC = 'player--active';

const scores = [0, 0];
let currentScore = 0;
let activePlayerIndex = 0;
let gameOver = false;

const hideDice = function () {
  if (!diceImageEl.classList.contains(hiddenC)) {
    diceImageEl.classList.add(hiddenC);
  }
};

const showDice = dice => {
  const imageURl = `dice-${dice}.png`;
  diceImageEl.src = imageURl;
  diceImageEl.classList.remove(hiddenC);
};
const resetGame = function () {
  console.log('game reset');
  currentScore = 0;
  hideDice();
  for (let s of PlayersScores) {
    s.textContent = 0;
  }
  for (let s of currentScoresEl) {
    s.textContent = 0;
  }

  scores.fill(0);

  for (let p of players) {
    p.classList.remove(winnerPlayerC, playerActiveC);
  }

  players[0].classList.add(playerActiveC);

  activePlayerIndex = 0;
  gameOver = false;
};

function SwitchPlayers() {
  for (let s of currentScoresEl) {
    s.textContent = 0;
  }

  for (let p of players) {
    p.classList.toggle(playerActiveC);
  }

  currentScore = 0;
  activePlayerIndex = 1 - activePlayerIndex;
}
function storeScores() {
  scores[activePlayerIndex] += currentScore;
  PlayersScores[activePlayerIndex].textContent = scores[activePlayerIndex];
}
newGameBtn.addEventListener('click', resetGame);

rollBtn.addEventListener('click', function () {
  if (gameOver) return;
  const diceRoll = () => 1 + Math.trunc(Math.random() * 6);
  const dice = diceRoll();

  showDice(dice);
  if (dice === 1) {
    SwitchPlayers();
  } else {
    currentScore += dice;
    currentScoresEl[activePlayerIndex].textContent = currentScore;
    if (scores[activePlayerIndex] + currentScore >= maxScore) {
      //winning condition?
      storeScores();
      players[activePlayerIndex].classList.add(winnerPlayerC);
      gameOver = true;
      console.log(`game won by player ${activePlayerIndex + 1}`);
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (gameOver) return;
  if (currentScore === 0) return;
  storeScores();
  hideDice();
  SwitchPlayers();
});

resetGame();
