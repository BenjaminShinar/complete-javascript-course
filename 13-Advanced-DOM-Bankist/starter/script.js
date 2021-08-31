'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const header = document.head;
const body = document.body;
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   "We use cookies for improved functionality and analytics.";
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie" style="color: blue">Got it!</button>';
header.prepend(message);
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());

console.log(getComputedStyle(message).fontSize);

document.documentElement.style.setProperty('--color-primary', 'orangered');
console.log(document.documentElement.style.getPropertyValue('--color-primary'));
const logo = document.querySelector('.nav__logo');
console.log(logo.alt, logo.className);
console.log(logo.src, logo.getAttribute('src')); //absolute or relative

console.log(logo.designer);
console.log(logo.getAttribute('designer'));
console.log(logo.dataset.versionNumber);

const scrollButton = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
scrollButton.addEventListener('click', function (e) {
  //oldway
  //const s1coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});
const randomColor = () => {
  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
  const randomPart = randomInt.bind({}, 0, 255);
  return `rgb(${randomPart()},${randomPart()},${randomPart()})`;
};

console.log(randomColor());

const eventPropagation = function () {
  document.querySelectorAll('.nav__link').forEach(e =>
    e.addEventListener('click', function (e) {
      this.style.backgroundColor = randomColor();
      console.log(e.target);
    })
  );

  document.querySelector('.nav__links').addEventListener(
    'click',
    function (e) {
      this.style.backgroundColor = randomColor();
      console.log(e.target);
      e.stopPropagation(); //stop propagation!
    },
    true
  );

  document.querySelector('.nav').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    console.log(e.target);
  });
};
eventPropagation();
