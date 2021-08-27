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

const clearAndBlur = function (...elements) {
  elements.forEach(e => {
    e.value = '';
    e.blur();
  });
};
const showLayout = show => {
  containerApp.style.opacity = show ? 100 : 0;
};
const isDeposit = mov => mov > 0;

const displayMovements = function (acc, sort = false) {
  const createMovement = function (value, i) {
    //string literal
    const mv_type = isDeposit(value) ? 'deposit' : 'withdrawal';
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
  const moves = sort ? movements.slice().sort((a, b) => a - b) : movements;

  moves.forEach(function (movement, index) {
    //console.log(`movement ${movement} at index ${index}`);
    containerMovements.insertAdjacentHTML(
      'afterbegin',
      createMovement(movement, index)
    );
  });
};

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

const calcAndDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((a, b) => a + b, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    //.filter(mv => mv > 0)
    .filter(isDeposit)
    .reduce((acc, mv) => acc + mv, 0);
  labelSumIn.textContent = `${incomes} EUR`;

  const outMovements = acc.movements
    .filter(mv => mv < 0)
    .reduce((acc, mv) => acc + mv, 0);
  labelSumOut.textContent = `${Math.abs(outMovements)} EUR`;

  const interestRate = acc.interestRate;
  const totalInterests = acc.movements
    //.filter(mv => mv > 0)
    .filter(isDeposit)
    .map(deposit => (deposit * interestRate) / 100)
    .filter(interest => interest >= 1.0) // only when more than 1
    .reduce((acc, intrust) => acc + intrust, 0);
  labelSumInterest.textContent = `${totalInterests} EUR`;
};
let currentAccount;
let updateUi = acc => {
  //calculate balance, display balance
  calcAndDisplayBalance(acc);
  //calculate summary, display summary
  calcDisplaySummary(acc);
  //display movements
  displayMovements(acc);
};

btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    ac => ac.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log(`login ${currentAccount.owner}`);
    // Display UI and messages.
    //first name only
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    //clear fields
    //inputLoginUsername.value = inputLoginPin.value = '';
    //move focus
    //inputLoginUsername.blur();
    //inputLoginPin.blur();
    //update opacity of html event

    clearAndBlur(inputLoginUsername, inputLoginPin);
    showLayout(true);
    updateUi(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  clearAndBlur(inputTransferTo, inputTransferAmount);
  if (
    receiverAcc &&
    receiverAcc != currentAccount &&
    amount > 0 &&
    currentAccount.balance >= amount
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUi(currentAccount);

    // inputTransferTo.value = '';
    // inputTransferTo.blur();
    // inputTransferAmount.value = '';
    // inputTransferAmount.blur();
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  //const inputCloseUsername = document.querySelector('.form__input--user');
  //const inputClosePin = document.querySelector('.form__input--pin');
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    console.log('deleting!');
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    if (index != -1) {
      accounts.splice(index, 1);
      showLayout(false);
    }
  }
  clearAndBlur(inputClosePin, inputCloseUsername);
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mv => mv >= amount * 0.1)) {
    //
    currentAccount.movements.push(amount);
    updateUi(currentAccount);
  }
  clearAndBlur(inputLoanAmount);
});

let sortedMovements = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault;
  displayMovements(currentAccount, !sortedMovements);
  sortedMovements = !sortedMovements;
});
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
    // should be not arrow
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

  function challenge3() {
    const foo = function (ages) {
      const avg = ages
        .map(dogAge => (dogAge <= 2 ? dogAge * 2 : dogAge * 4 + 16))
        .filter(humanAge => humanAge >= 18)
        .reduce((a, b, _, arr) => a + b / arr.length, 0);
      console.log(`average age in human years is: ${avg}`);
    };
    foo([5, 2, 4, 1, 15, 8, 3]);
    foo([16, 6, 10, 5, 6, 1, 4]);
  }
  challenge3();

  function challenge4() {
    const dogs = [
      { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
      { weight: 8, curFood: 200, owners: ['Matilda'] },
      { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
      { weight: 32, curFood: 340, owners: ['Michael'] },
    ];
    //1
    dogs.forEach(function (dog) {
      dog.recommendedFood = dog.weight ** 0.75 * 28;
    });
    console.log(dogs);
    //2
    console.log(
      `Sarah's dog is ${dogs.find(dog => dog.owners.includes('Sarah'))}`
    );
    //3
    const ownersEatTooMuch = dogs
      .filter(dog => dog.curFood > dog.recommendedFood * 1.1)
      .map(dog => dog.owners)
      .reduce((owners, owner) => [owners, ...owner]);
    const ownersEatTooLittle = dogs
      .filter(dog => dog.curFood < dog.recommendedFood * 0.9)
      .map(dog => dog.owners)
      .reduce((owners, owner) => [owners, ...owner]);
    //4
    console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
    console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

    //5
    console.log(
      dogs.reduce(
        (accBool, dog) => accBool || dog.recommendedFood === dog.curFood,
        false
      )
    );

    //6
    console.log(
      dogs.reduce(
        (accBool, dog) =>
          accBool ||
          (dog.curFood < dog.recommendedFood * 1.1 &&
            dog.curFood > dog.recommendedFood * 0.9),
        false
      )
    );
    //7
    const okEatingDogs = dogs.filter(
      dog =>
        dog.curFood < dog.recommendedFood * 1.1 &&
        dog.curFood > dog.recommendedFood * 0.9
    );
    console.log(okEatingDogs);
    //8
    const sortedDogs = dogs
      .slice()
      .sort((dogA, dogB) => dogA.recommendedFood - dogB.recommendedFood);
    console.log(sortedDogs);
  }
  challenge4();

  const deep1 = [1, 2, 3, [4, 5, [6, 7]], 8];
  console.log(deep1);
  console.log('level 1', deep1.flat()); //[1,2,3,4,5,[6,7],8]
  console.log('level 2', deep1.flat(2)); //[1,2,3,4,5,6,7,8]

  const deep2 = [[[1], [2, 3]], [[[4]]]];
  console.log(deep2);
  console.log('level 1', deep2.flat(1)); // [[1],[2,3],[[4]]]
  console.log('level 2', deep2.flat(2)); // [1,2,3,[4]]
  console.log('level 3', deep2.flat(3)); // [1,2,3,4]

  const arrayNum = [-1, -10, -20, -150, -25, 100, 90, 999, 1000];
  arrayNum.sort();
  console.log(arrayNum);
  arrayNum.sort((a, b) => a - b); //ascending order
  console.log(arrayNum);
  arrayNum.sort((a, b) => b - a); //descending order
  console.log(arrayNum);
  const rolls = Array.from({ length: 100 }, () =>
    Math.trunc(Math.random() * 6)
  );
  console.log(rolls);

  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value')
  );
  console.log(movementsUI);
}
learn(); //call this to run the methods that aren't part of the projects
