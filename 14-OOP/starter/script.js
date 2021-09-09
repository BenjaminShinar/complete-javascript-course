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
  console.log('Challenge #1');

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

const PersonEx = class {};
class PersonCL {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
    this._fullName = firstName + ' unknown';
  }
  //method will be added to .prototype property.
  calculateAge() {
    console.log(2037 - this.birthYear);
  }
  //getter method
  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this['_fullName'] = this.firstName + name;
    else console.log(`${name} is not valid`);
  }
}

const janice = new PersonCL('Janice', 1986);
console.log(janice);
janice.calculateAge();

const account = {
  owner: 'Jonas',
  movements: [120, 30, 400],
  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest);
account.latest = 90;
console.log(account);
console.log(janice.age);
janice.fullName = 'von jane';
console.log(janice);

const PersonCF = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

PersonCF.hey = function () {
  //console.log(this);
  return 'Hey!';
};
const ben = new PersonCF('ben', 1995);
//console.log(ben.hey()); //error
console.log(PersonCF.hey()); //works fine, called on constructor function

class PersonES6 {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  hey() {
    return `Hey ${this.firstName}`;
  }
  static hey() {
    return `Hey there!`;
  }
}

const dan = new PersonES6('dan', 1889);
console.log(dan.hey());
console.log(PersonES6.hey());

const PersonProto = {
  calcAgeOCR() {
    return 2037 - this.birthYear;
  }, //using enhanced object literals syntax
};

const steve = Object.create(PersonProto);
console.log(steve.__proto__);
console.log(steve.calcAgeOCR());
steve.birthYear = 1992;
console.log(steve.calcAgeOCR());

PersonProto.init = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
const sarah = Object.create(PersonProto);
sarah.init('sarah', 2011);
console.log(sarah.calcAgeOCR());

const codingChallenge2 = function () {
  console.log('Challenge #2');

  class CarCl {
    constructor(make, speed) {
      this.make = make;
      this.speed = speed;
    }
    changeSpeed = function (diff) {
      this.speed += diff;
      console.log(`${this.make} is driving at ${this.speed}`);
    };
    accelerate = function () {
      this.changeSpeed(10);
    };
    break = function () {
      this.changeSpeed(-5);
    };
    get SpeedUS() {
      return this.speed / 1.6;
    }
    set SpeedUS(usSpeed) {
      this.speed = usSpeed * 1.6;
    }
  }

  const ford = new CarCl('Ford', 120);
  ford.break();
  ford.break();
  ford.accelerate();
  console.log(`US speed is ${ford.SpeedUS} mi/h`);
  ford.SpeedUS = 115;
  console.log(`US speed is ${ford.SpeedUS} mi/h`);
  ford.break();
};

codingChallenge2();

function constructorFunctionInheritance() {
  console.log('Constructor Functions Inheritance');

  const PersonCFBase = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  };

  PersonCFBase.prototype.calculateAge = function () {
    console.log(2037 - this.birthYear);
  };

  const StudentCFDerived = function (firstName, birthYear, course) {
    //this.firstName = firstName; //duplicate
    //this.birthYear = birthYear; //duplicate
    //PersonCFBase(firstName,birthYear); //doesn't work
    PersonCFBase.call(this, firstName, birthYear); //this works!
    this.course = course;
  };

  StudentCFDerived.prototype.introduce = function () {
    console.log(`my name is ${this.firstName}, and I study ${this.course}`);
  };
  const mike = new StudentCFDerived('mike', 2015, 'Economics');
  //mike.calculateAge(); //doesn't work
  mike.introduce();
  StudentCFDerived.prototype.foo = function () {};
  console.log('before', StudentCFDerived.prototype);
  //StudentCFDerived.prototype = PersonCFBase.prototype;

  StudentCFDerived.prototype = Object.create(PersonCFBase.prototype);
  console.log('after', StudentCFDerived.prototype);
  const jen = new StudentCFDerived('jennifer', 2015, 'Economics');
  //jen.introduce();
  jen.calculateAge(); //now this works!

  console.log('jen.__proto__', jen.__proto__); //personCFBase
  console.log('jen.__proto__.__proto__', jen.__proto__.__proto__);

  console.log(StudentCFDerived.prototype.constructor); //personCFBase
  StudentCFDerived.prototype.constructor = StudentCFDerived;
  console.log(StudentCFDerived.prototype.constructor); //StudentCFDerived

  console.log('jen.__proto__', jen.__proto__); //personCFBase, constructor StudentCFDerived
  console.log('jen.__proto__.__proto__', jen.__proto__.__proto__);
  console.log(jen instanceof StudentCFDerived); //true
  console.log(jen instanceof PersonCFBase); //true
  console.log(jen instanceof Object); //true
}
constructorFunctionInheritance();

const codingChallenge3 = function () {
  console.log('Challenge #3');
  //constructor from coding challenge 1
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
  const EV = function (make, speed, charge) {
    Car.call(this, make, speed); //delegate parent constructor
    this.charge = charge;
  };

  //linking prototypes
  EV.prototype = Object.create(Car.prototype);
  EV.prototype.constructor = EV;

  //adding the new methods to the EV prototype.
  EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
  };
  //override!
  EV.prototype.accelerate = function () {
    this.charge -= 1;
    this.speed += 20;
    console.log(
      `${this.make} is driving at ${this.formatSpeed()} with a charge of ${
        this.charge
      }%`
    );
  };

  const tesla = new EV('Tesla', 120, 23);
  tesla.accelerate();
  tesla.break(); //use same break;

  tesla.chargeBattery(70);
  tesla.accelerate();
  tesla.accelerate();

  const bmw = new Car('bmw', 90);
  bmw.accelerate(); //no change!
  bmw.break();
  console.log(tesla.break === bmw.break); //true
  console.log(tesla.accelerate === bmw.accelerate); //false
  console.log(tesla instanceof EV, tesla instanceof Car); //true for both
  console.log(bmw instanceof EV, bmw instanceof Car); //false for EV, true for Car
};

codingChallenge3();

function eS6Inheritance() {
  console.log('ES6 classes Inheritance');

  class PersonES6Base {
    constructor(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    }
    calculateAge() {
      console.log(2037 - this.birthYear);
    }
    static hey() {
      return `Hey there!`;
    }
  }
  const jd = new PersonES6Base('js,', 2019);
  jd.calculateAge();
  class StudentES6Derived extends PersonES6Base {
    constructor(firstName, birthYear, course) {
      super(firstName, birthYear);
      this.course = course;
    }
    introduce() {
      console.log(`I'm ${this.firstName} and I study ${this.course}`);
    }
    calculateAge() {
      console.log(2022 - this.birthYear);
    }
  }
  const max = new StudentES6Derived('max', 2007, 'biology');
  max.introduce();
  max.calculateAge();
  const ABC = () => {
    class A {
      constructor(a, b) {
        this.a = a;
        this.b = b;
      }
    }
    class B extends A {
      constructor(a, b, c) {
        super(a, b);
        this.c = c;
      }
      foo() {
        return this.a + this.b + this.c;
      }
    }
    class C extends A {
      bar() {
        return this.a * this.b;
      }
    }
    const b = new B(1, 2, 3);
    console.log(b.foo());
    const c = new C(4, 5);
    console.log(c.bar());
  };
  ABC();
}
eS6Inheritance();

function objectCreateInheritance() {
  console.log('Object Create Inheritance');
  const PersonPrototype = {
    calcAgeOCR() {
      return 2037 - this.birthYear;
    }, //using enhanced object literals syntax
    init(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    },
  };
  const p = Object.create(PersonPrototype);
  p.init('joe', 2017);
  console.log(p.calcAgeOCR());
  const StudentPrototype = Object.create(PersonPrototype);
  StudentPrototype.init = function (firstName, birthYear, course) {
    PersonPrototype.init.call(this, firstName, birthYear);
    //PersonPrototype.init(firstName, birthYear); // this also works
    this.course = course;
  };
  StudentPrototype.introduce = function () {
    return `hey! I am ${this.firstName}, and I study ${this.course} for fun!`;
  };
  const jay = Object.create(StudentPrototype);

  jay.init('jay', 2019, 'chemistry');
  console.log(jay.calcAgeOCR());
  console.log(jay.introduce());
}
objectCreateInheritance();

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    //this.locale = navigator.language;
  }
  deposit(val) {
    this.movements.push(val);
  }
  withdraw(val) {
    this.movements.push(-val);
  }
  approveLoan(val) {
    return true;
  }
  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
    }
  }
}

const account1 = new Account('Jonas', 'EUR', 1111);
account1.deposit(500);
account1.withdraw(300);
console.log(account1);

class AccountPrivates {
  //public fields
  //locale = navigator.language;
  // _movements = [];
  //private fields
  #movements = [];
  #pin;
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    //??protected by convention??
    this.#pin = pin;
    //this._movements = [];
    //this.locale = navigator.language;
  }
  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
    }
  }
  getMovements() {
    return this.#movements;
  }
  deposit(val) {
    this.#movements.push(val);
  }
  #approveLoan(val) {
    //do something
    return val % 2 === 0;
  }
}

const ben2 = new AccountPrivates('ben', 'EUR', 1234);
console.log(ben2);
//console.log(ben2.#movements); //error!
ben2.deposit(50);
ben2.requestLoan(900);
ben2.requestLoan(901);

//console.log(ben.#approveLoan(700)); // error!
console.log(ben2.getMovements());
//ben2.deposit(60).deposit(65).requestLoan(1000).withdraw(70); // won't work for now.

class AccountPrivatesChain {
  //private fields
  #movements = [];
  #pin; //no value
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    this.#pin = pin; //
  }
  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
    }
    return this;
  }
  getMovements() {
    return this.#movements;
  }
  deposit(val) {
    this.#movements.push(val);
    return this;
  }
  #approveLoan(val) {
    //do something
    return val % 2 === 0;
  }
}
const ben3 = new AccountPrivatesChain('ben3', 'NIS', 7777);
ben3.deposit(60).deposit(65).requestLoan(1000).deposit(70); // won't work for now.
console.log(ben3.getMovements());

const codingChallenge4 = function () {
  console.log('Challenge #4');
  class CarCl {
    speed;
    make;
    constructor(make, speed) {
      this.make = make;
      this.speed = speed;
    }
    #changeSpeed = function (diff) {
      this.speed += diff;
      console.log(`${this.make} is driving at ${this.speed}`);
    };
    accelerate = function () {
      this.#changeSpeed(10);
      return this;
    };
    break = function () {
      this.#changeSpeed(-5);
      return this;
    };
    get SpeedUS() {
      return this.speed / 1.6;
    }
    set SpeedUS(usSpeed) {
      this.speed = usSpeed * 1.6;
      return this;
    }
  }
  class EVCl extends CarCl {
    #charge;
    constructor(make, speed, charge) {
      super(make, speed);
      this.#charge = charge;
    }
    chargeBattery = function (chargeTo) {
      this.#charge = chargeTo;
      return this;
    };
    accelerate = function () {
      this.#charge -= 1;
      this.speed += 20;
      console.log(
        `${this.make} is driving at ${this.speed} with a charge of ${
          this.#charge
        }%`
      );
      return this;
    };
  }

  //adding the new methods to the EV prototype.

  //override!
  const riv = new EVCl('Rivian', 120, 23);
  riv.accelerate().break(); //use same break;
  riv.accelerate().chargeBattery(70).accelerate();
  const bmw = new CarCl('BMW', 60);
  bmw.accelerate().break();
};

codingChallenge4();
