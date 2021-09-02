'use strict';

//const { hasSubscribers } = require('diagnostic_channel');

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

//Page navigation

//button learn-more
const scrollButton = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
scrollButton.addEventListener('click', function (e) {
  //old way
  //const s1coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});
// attack to each element
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     const section = document.querySelector(id);
//     section.scrollIntoView({ behavior: 'smooth' });
//   });
// });

//attach to parent elements
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    const section = document.querySelector(id);
    section.scrollIntoView({ behavior: 'smooth' });
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
//eventPropagation();

const domTraversing = function () {
  console.log('dom traversing');
  const h1 = document.querySelector('h1');
  const childrenAtAnyLevel = h1.querySelectorAll('.highlight');
  console.log(childrenAtAnyLevel);
  console.log(h1.children, h1.childNodes);
  console.log(h1.firstElementChild, h1.lastElementChild);
  console.log(h1.firstChild, h1.lastChild);

  //parents
  console.log(h1.parentElement, h1.parentNode);
  console.log(h1.closest('.header'));
  console.log(h1 === h1.closest('h1')); //matches self

  //siblings
  console.log('prev element', h1.previousElementSibling);
  console.log('next element', h1.nextElementSibling);

  console.log('prev node', h1.previousSibling);
  console.log('next node', h1.nextSibling);
  console.log('all siblings (including self', h1.parentElement.children);
  [...h1.parentElement.children].forEach(function (el) {
    if (el !== h1) {
      el.style.transform = 'scale(0.5)';
    }
  });
};
//domTraversing();
