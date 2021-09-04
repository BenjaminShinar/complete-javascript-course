'use strict';

console.log('OOP');
const arr = [1, 2, 3];
console.log(arr.Prototype);

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // THIS is the bad way!
  this.calcAge = function () {
    return 2037 - this.birthYear;
  };
};

const jonas = new Person('jonas', 1991);
const matilda = new Person('matilda', 2005);
console.log(jonas, matilda);

console.log('jonas is a Person?', jonas instanceof Person);
console.log('array is a Person?', [1, 2] instanceof Person);
console.log('array is an Array?', [1, 2] instanceof Array);

console.log(`${jonas.firstName} is ${jonas.calcAge()} years old!`);

console.log(Person.prototype);
console.log(Array.prototype);
Person.prototype.calcAgePrototype = function () {
  return 2044 - this.birthYear;
};
console.log(`${jonas.firstName} is ${jonas.calcAgePrototype()} years old!`);
console.log(Person.prototype);
console.log(jonas);
console.log('jonas.__proto__', jonas.__proto__);
console.log('Person.__proto__', Person.__proto__);
console.log(
  'jonas.__proto__ === Person.prototype',
  jonas.__proto__ === Person.prototype
);

console.log('prototype.isPrototypeOf()');
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = 'Home Sapiens';
console.log('matilda.species', matilda.species);
console.log('matilda', matilda);
console.log('Person.prototype', Person.prototype);

console.log(
  "jonas.hasOwnProperty('firstName')",
  jonas.hasOwnProperty('firstName')
);
console.log("jonas.hasOwnProperty('species')", jonas.hasOwnProperty('species'));

console.log('Object.prototype', Object.prototype);
console.log('{}.__proto__', {}.__proto__);

console.log('jonas.__proto__', jonas.__proto__); //Person Prototype
console.log('jonas.__proto__.__proto__', jonas.__proto__.__proto__); //ObjectPrototype
console.log(
  'jonas.__proto__.__proto__.__proto__',
  jonas.__proto__.__proto__.__proto__
); //null

console.log('Person.prototype.constructor', Person.prototype.constructor); //function Person

console.log('Person.__proto__', Person.__proto__); //empty object
console.log('arrays');
console.log('array', [1, 2, 3].__proto__);
console.log(
  'array __proto__ ==== Array.prototype',
  [1, 2, 3].__proto__ === Array.prototype
);
console.log([1, 2, 3].__proto__.__proto__); // the object prototype

const arrDuplicates = [1, 2, 3, 2, 3, 5];
//console.log(arrDuplicates.uniqueElements()); //error!
Array.prototype.uniqueElements = function () {
  return [...new Set(this)];
};

console.log(arrDuplicates.uniqueElements()); //error!

const nodePrototypes = function () {
  //   const h1 = document.querySelector('h1');
  //   console.log('h1.__proto__', h1.__proto__); // htmlLeadingElement
  //   console.log('h1.__proto__.__proto__', h1.__proto__.__proto__); //HtmlElement
  //   console.dir(() => {
  //     5;
  //   }); //function has prototype as well
};

nodePrototypes();

const codingChallenge1 = function () {
  //constructor
  const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
  };
  Car.prototype.formatter = new Intl.NumberFormat('en-us', {
    style: 'unit',
    unit: 'mile-per-hour',
  });
  Car.prototype.formatSpeed = function () {
    return this.formatter.format(this.speed);
  };
  Car.prototype.changeSpeed = function (diff) {
    this.speed += diff;
    console.log(`${this.make} is driving at ${this.formatSpeed()}`);
  };
  Car.prototype.accelerate = function () {
    this.changeSpeed(10);
  };
  Car.prototype.break = function () {
    this.changeSpeed(-5);
  };
  const bmw = new Car('BMW', 120);
  const mercedes = new Car('Mercedes', 95);
  bmw.accelerate();
  bmw.accelerate();
  mercedes.accelerate();
  mercedes.break();
  bmw.formatter = new Intl.NumberFormat('de-gr', {
    style: 'unit',
    unit: 'mile-per-hour',
  }); // now
  bmw.break(); // use the object formatter
  mercedes.break(); // use the prototype formatter
};

codingChallenge1();
