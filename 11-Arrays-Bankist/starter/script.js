'use strict';

//const { moveMessagePortToContext } = require('worker_threads');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const displayMovements = function (movements) {
  const createMovement = function (value, i) {
    //string literal
    const mv_type = value > 0 ? 'deposit' : 'withdrawal';
    const sometime = 'sometime';
    return `
    <div class="movements__row">
    <div class="movements__type movements__type--${mv_type}"> ${
      i + 1
    } ${mv_type} </div>
    <div class="movements__date">${sometime}</div>
    <div class="movements__value">${value}</div>
    </div>
    `;
  };
  containerMovements.innerHTML = ''; //clear html

  movements.forEach(function (movement, index) {
    //console.log(`movement ${movement} at index ${index}`);
    containerMovements.insertAdjacentHTML(
      'afterbegin',
      createMovement(movement, index)
    );
  });
};
displayMovements(account1.movements);

const createInitials = function (accountLists) {
  //modifying the array
  accountLists.forEach(
    user =>
      (user.username = user.owner
        .toLowerCase()
        .split(' ')
        .map(subName => subName[0])
        .join(''))
  );
};
createInitials(accounts); //call this function once,
console.log(accounts);

const calcAndDisplayBalance = function (movements) {
  const balance = movements.reduce((a, b) => a + b, 0);
  labelBalance.textContent = `${balance} EUR`;
};
calcAndDisplayBalance(account1.movements);

function learn() {
  const challenge1 = function () {
    const checkDogs = (arr1, arr2) => {
      const combined = arr1.slice(1, -2).concat(arr2); // can use the spread operator
      combined.forEach((dogAge, index) => {
        const dog =
          dogAge >= 3
            ? `an adult,and is ${dogAge} years old`
            : `still a puppy 🐶`;
        console.log(`Dog number ${index + 1} is ${dog}`);
      });
    };

    console.log('set 1');
    checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
    console.log('set 2');
    checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
  };
  challenge1();

  const movementsInEuro = [200, 450, -400, 3000, -650, -130, 70, 1300];
  const euroToUsd = 1.1; //ratio
  const movementInUsd = movementsInEuro.map(euro => euro * euroToUsd); //as an arrow function
  console.log(movementInUsd);
  const movementsDescription = movementsInEuro.map((mv, i, array) => {
    if (mv > 0) {
      return `mv ${i + 1} you deposited ${mv}`;
    } else return `mv ${i + 1} you withdrew ${Math.abs(mv)}`;
  });
  console.log(movementsDescription);
  console.log(
    movementsInEuro.map(
      (mov, i) =>
        `movement ${i + 1}: you ${
          mov > 0 ? 'deposited' : 'withdrew'
        } ${Math.abs(mov)}`
    )
  );

  const balance = movements.reduce(function (acc, current) {
    return acc + current;
  }, 0);
  console.log(balance);
  console.log([].reduce((a, b) => a + b, 1000)); //1000

  const max = movements.reduce(
    (acc, current) => Math.max(acc, current),
    movements[0]
  );
  console.log(max); //1000

  function challenge2() {
    const foo = function (ages) {
      const humanAges = ages
        .map(dogAge => (dogAge <= 2 ? dogAge * 2 : dogAge * 4 + 16))
        .filter(humanAge => humanAge >= 18);
      //const avg = humanAges.reduce((a, b) => a + b) / humanAges.length;
      const avg = humanAges.reduce((a, b, _, arr) => a + b / arr.length, 0);
      console.log(`average age in human years is: ${avg}`);
    };
    foo([5, 2, 4, 1, 15, 8, 3]);
    foo([16, 6, 10, 5, 6, 1, 4]);
  }
  challenge2();
}
learn(); //call this to run the methods that aren't part of the projects
