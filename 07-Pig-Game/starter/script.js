'use strict';
const players = document.querySelectorAll('.players');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceImageEl = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');
const hiddenClass = 'hidden';

const resetGame = function () {
  console.log('game reset');
  score0El.textContent = 0;
  score1El.textContent = 0;
  if (!diceImageEl.classList.contains(hiddenClass)) {
    diceImageEl.classList.add(hiddenClass);
  }
};
newGameBtn.addEventListener('click', resetGame);

resetGame();
