'use strict';

const bookings = [];
const createBooking = function (flightNum, numPassengers, price) {
  const booking = {
    flightNum, // object literals
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');

const greet = greeting => name => console.log(`${greeting} ${name}`);

const greetHey = greet('hey');
greetHey('dan');

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    ); //using the *this* keyword
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name }); //create an objects
  },
};

lufthansa.book(239, 'jonas');
lufthansa.book(653, 'joe');

const book = lufthansa.book;
const eurowings = {
  name: 'eurowings', //not airline, name
  iataCode: 'EW',
  bookings: [],
};
//book(23, 'sara'); // error,no properties
book.call(eurowings, 24, 'san'); // better, we get the proper 'this'

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
const addVat = addTax.bind(null, 0.23); //the null is just a convention.
console.log(addVat(200));

const foo2 = (arg1, fn) => {
  return fn.bind(null, arg1);
};
const foo3 = (arg1, fn) => arg2 => fn(arg1, arg2);
const addVat2 = foo2(0.17, addTax);
const addVat3 = foo3(0.17, addTax);
console.log(addVat2(1000));
console.log(addVat3(1000));

function challenge1() {
  const poll = {
    question: 'What is your favorite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3:  C++'],
    // This generates [0, 0, 0, 0]. More in the next section!
    answers: new Array(4).fill(0),
  };
  poll.registerNewAnswer = function () {
    const ans = Number(
      prompt(
        [this.question, ...this.options, '(write option number)'].join('\n')
      )
    );
    if (typeof ans === 'number' && ans >= 0 && ans < this.answers.length) {
      this.answers[ans]++;
      this.displayResults();
    }
  };
  poll.displayResults = function (type = 'string') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type == 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  };

  /*
    document
    .querySelector('.poll')
    .addEventListener('click', poll.registerNewAnswer.bind(poll, undefined));
    */
  const data1 = [5, 2, 3];
  const data2 = [1, 5, 3, 9, 6, 1];
  poll.displayResults.call({ answers: data1 }, 'array');
  poll.displayResults.call({ answers: data2 }, 'string');
}

challenge1();
