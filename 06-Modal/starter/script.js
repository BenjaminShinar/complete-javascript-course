'use strict';

//const { isBooleanObject } = require('util/types');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
//const btsOpenModal = document.querySelector('.show-modal'); // one button only
//console.log(btnOpenModal);
const btnsOpenModal = document.querySelectorAll('.show-modal'); // all buttons
console.log(btnsOpenModal);
const classHidden = 'hidden';

const openModal = function () {
  if (modal.classList.contains(classHidden)) {
    modal.classList.remove(classHidden);
    overlay.classList.remove(classHidden);
  }
};
const closeModal = function () {
  if (!modal.classList.contains(classHidden)) {
    modal.classList.add(classHidden);
    overlay.classList.add(classHidden);
  }
};
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

for (let btn of btnsOpenModal) {
  console.log(btn); //loop over buttons
  btn.addEventListener('click', openModal);
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});
