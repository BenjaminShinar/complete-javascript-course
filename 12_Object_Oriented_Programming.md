## Object-Oriented Programming (OOP) With JavaScript

<details>
<summary>
What are prototypes, how are classes defined in JavaScript and ES6 syntax. the prototypes inheritance chain.
</summary>

Javascript is an object oriented language.
we have constructors, prototypes, classes, inheritance, and ES6 methods.

### Object Oriented Programming Overview

<details>
<summary>
A high level overview of Object Oriented Programming, the principles of OOP and how it's actually used in JavaScript
</summary>

a programming paradigm based on the concept of **object**. wwe use object to represent (model, describe) real-world or abstract features.
objects can contain data (**properties**) and actions(**methods**), with object, we pack the data along with the relevant behavior.

objects are self contained pieces of codes, they form the building blocks of the program, and they interact with one another using the public interface (the **api**). OOP makes code more flexible, easier to maintain and develop.

up until now we only used objects as object literals, each variable was the only instance of itself. we now move to use classes,which are conceptualized as blueprints from which many **instances** can be created.

an instance is the real object we can use, while the class is the stencil for them.

IMPORTANT: Javascript doesn't have the common form of private and public methods and properties,the examples and illustration are just for for learning purposes.

#### OOP Principals

<details>
<summary>
there are 4 common principles for OOP: abstraction, encapsulation, inheritance,polymorphism.
</summary>

> - **Abstraction**: Ignoring or hiding details tha **don't matter**, allowing us to get and **overview** perspective of the _thing_ we're implementing, instead of messing with details that don't really matter to our implementation.
>
> - **Encapsulation**: Keeping properties and method **private** inside the class, so they are **not accessible from outside the class**. Some methods can be **exposed** as a public interface (API).
>
> - **Inheritance**: Making all properties and methods of a certain class **available to a child class**, forming a hierarchical relationship between classes, this allows us to **reuse common logic** and to model real-world relationships.
>
> - **Polymorphism**: a child class can **overwrite** a method it inherited from a parent class \[it's more complex than that, but enough for our purpose].

</details>

#### OOP in Javascript

<details>
<summary>
Javascript uses prototypes rather than "class-instance" paradigm. it's called prototypal inheritance/delegation.
</summary>

JavaScript does OOP differently than other languages, each object has a prototype, the prototype has method that the object can access.

> **Prototypal inheritance**: The prototype contains methods (behavior) that are **accessible to all objects linked to that prototype**.
> Behavior is **delegated** to the linked prototype object.

if we look at the mdn documentations, we can see the methods defined on the _Array.prototype_ object, we can also see it when we observe an array, all the method are defined under the prototype

there are 3 ways to create prototypal inheritance in JavaScript:

1. constructor functions
   - create objects from a function.
   - this is how built-in object (Arrays, Maps, Sets) are actually implements.
2. ES6 classes
   - a modern alternative to constructor function syntax.
   - **only synthetic sugar**. same as constructor function behind the scenes.
   - not actual classes like what we have in other languages.
   - another layer of abstraction.
3. Object.create()
   - the easiest way to link an object to a prototype object.

</details>

</details>

### Constructor Functions and the _new_ Operator

<details>
<summary>
The new operator creates and returns an object from a function. the instanceof operator.
</summary>

We start with constructor functions. it's a completely normal function that's called with the _new_ keyword. we can use function declaration and function expressions, **but not arrow functions**. by convention, constructor function start with a capital letter.

```js
const Person = function (firstName, birthYear) {
  console.log(this);
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const jonas = new Person("jonas", 1991);
const matilda = new Person("matilda", 2005);
console.log(jonas, matilda);
```

the _new_ operator does some heavy lifting

1. it creates a new empty object {}.
2. the function is called on the newly created object (the _this_ keyword). this is why arrow functions won't work.
3. the newly created object is linked to a prototype.
4. the object is automatically returned from the function. no need for a _return_ statement.

an object created from a constructor function is instance of something, we can check it with the _instanceof_ operator, which returns a boolean value.

```js
console.log("jonas is a Person?", jonas instanceof Person);
console.log("array is a Person?", [1, 2] instanceof Person);
console.log("array is an Array?", [1, 2] instanceof Array);
```

the properties that we define in the constructor are called instance properties.
we can also add methods to an constructor function. just like object literals. **but this is a bad practice**. we create the object (functions are objects) each time, it costs us memory and resources.

```js
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
  this.calcAge = function () {
    return 2037 - this.birthYear;
  };
};
const jonas = new Person("jonas", 1991);
console.log(`${jonas.firstName} is ${jonas.calcAge()} years old!`);
```

It's better to create this method on the prototype of the object and use prototype inheritance.

</details>

### Prototypes

<details>
<summary>
JavaScript implemented it's object hierarchy with prototypes, a special kind of object that is linked to instances, eventually, all objects have the base 'Object.prototype' as the base level.
</summary>

Each function has a property called _.prototype_. we can add methods to it and then we can call the prototype method directly on the object, just like it was a function of the object itself.
the function exists just once, but all instances can use it.

```js
console.log("before adding function to prototype", Person.prototype);
console.log(Array.prototype);
Person.prototype.calcAgePrototype = function () {
  console.log(this);
  return 2044 - this.birthYear;
};
console.log(`${jonas.firstName} is ${jonas.calcAgePrototype()} years old!`);
console.log("after adding function to prototype", Person.prototype);
console.log("the prototype function isn't on the object", jonas);
```

we can see the prototype of each object with calling \_.\_\_proto\_\_\_ on an object instance.
and here is something confusing. the _Person.prototype_ (the prototype property of the function) is the same as the jonas.\_\_proto\_\_'. There is also the function _.isPrototypeOf(object)_ that checks this

```js
console.log("jonas.__proto__", jonas.__proto__);
console.log("Person.__proto__", Person.__proto__);

console.log(
  "jonas.__proto__ === Person.prototype",
  jonas.__proto__ === Person.prototype);
console.log('prototype.isPrototypeOf()');
console.log(Person.prototype.isPrototypeOf(jonas)); //true
console.log(Person.prototype.isPrototypeOf(Person)); //false
);
```

the _.prototype_ property is actually the prototype of linked objects, or something like that.

as we saw before, the _new_ operator sets the prototype (the .\_\_proto\_\_) of the created object to the _.prototype_ of the function.
we can also set properties on the prototype itself. which will be only stored on the prototype object, and not in the instance

```js
Person.prototype.species = "Home Sapiens";
console.log("matilda.species", matilda.species);
console.log("matilda", matilda);
console.log("Person.prototype", Person.prototype);
```

we can check if a property belong to the object instance with _.hasOwnProperty(propertyName)_ method.

```js
console.log(
  "jonas.hasOwnProperty('firstName')",
  jonas.hasOwnProperty("firstName")
); //true
console.log("jonas.hasOwnProperty('species')", jonas.hasOwnProperty("species")); //false
```

#### Prototypal Inheritance and the Prototype Chain

<details>
<summary>
The Prototype chain is similar to the scope chain, from the object own properties, all the way up to the prototype and the Object.prototype.
</summary>

Constructor function has a _.prototype_ property pointing to a prototype object.
that prototype objects has a _.constructor_ property pointing back the to the function.

the prototype is actually the prototype not of the function, but of all the objects created by this function.

when we call a function with the _new_ operator. this is true for function constructors and ES6 classes, but not _Object.create()_.

> 1. an empty object is created.
> 2. _this_ keyword in the function call is set to the new object.
> 3. the new object is linked via the .\_\_proto\_\_ property to to constructor function prototype property.
> 4. the new object is returned from constructor function call.

when we call a method on a object, we first check the object itself, and if there isn't a match, the prototype is checked next. this is called _prototype delegation_. all these connections are part of the prototype chain.

//TODO: add diagram.

all objects in JavaScript have prototypes, and the prototype of our constructed prototype is Object.prototype, which was built by _Object()_. so if there's a method that's not on the object, and not on it's prototype then we check the next prototype (_Object.prototype_). the prototype of the Object constructor function is the null prototype. the final,base level, link of the prototype chain.

```js
console.log("Object.prototype", Object.prototype);
console.log("{}.__proto__", {}.__proto__);
```

> **Prototype Chain**: series of links between objects, linked through prototypes (similar to the scope chain).

</details>

#### Prototypical Inheritance and Built-in Objects

<details>
<summary>
The Built-in Objects have chains of prototypes, which is why they have methods
</summary>

the prototypal inheritance is what powers the built-in JavaScript object.

```js
console.log("jonas.__proto__", jonas.__proto__); //Person Prototype
console.log("jonas.__proto__.__proto__", jonas.__proto__.__proto__); //ObjectPrototype
console.log(
  "jonas.__proto__.__proto__.__proto__",
  jonas.__proto__.__proto__.__proto__
); //null
console.log("Person.prototype.constructor", Person.prototype.constructor); //function Person
console.log("Person.__proto__", Person.__proto__); //empty object

//arrays
console.log("arrays");
console.log("array", [1, 2, 3].__proto__);
console.log(
  "array __proto__ ==== Array.prototype",
  [1, 2, 3].__proto__ === Array.prototype
);
console.log([1, 2, 3].__proto__.__proto__); // the object prototype
```

we can actually use this to our advantage and enhance the array object via the prototype! but of course, this is a bad practice, we shouldn't touch the built-in objects.

```js
const arrDuplicates = [1, 2, 3, 2, 3, 5];
console.log(arrDuplicates.uniqueElements()); //error!
Array.prototype.uniqueElements = function () {
  return [...new Set(this)];
};

console.log(arrDuplicates.uniqueElements()); //now it works!
```

we can also check the prototypes of html elements. and we discover that the Nodes and DOM follow the same chain. and eventually we will reach the Object prototype. we can also use _console.dir()_ to inspect functions, and we see they too have an prototype, which is why we can call method like _.bind()_ on them..

```js
const nodePrototypes = function () {
  const h1 = document.querySelector("h1");
  console.log("h1.__proto__", h1.__proto__); // htmlLeadingElement
  console.log("h1.__proto__.__proto__", h1.__proto__.__proto__); //HtmlElement
  console.dir(() => {
    5;
  }); //function has prototype as well
};
```

</details>

#### Coding Challenge #1

<details>
<summary>
Use constructor function to create objects and then add methods to the prototypes. would be cool to use the Intl.NumberFormat object maybe and have it be either in the prototype or in the object itself.
</summary>

> Your tasks:
>
> 1. Use a constructor function to implement a 'Car'. A car has a 'make' and a 'speed' property. The 'speed' property is the current speed of the car in km/h.
> 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console.
> 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console.
> 4. Create 2 'Car' objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.
>
> Test data:
>
> - Data car 1: 'BMW' going at 120 km/h.
> - Data car 2: 'Mercedes' going at 95 km/h.

</details>

</details>

### ES6 Classes

<details>
<summary>
Like constructor functions, but with modern syntax.
</summary>
ES6 aren't classes like java or c++, they still do prototypical inheritance, but we a syntax that's more familiar to programmers from other languages.

we can have class deceleration and class expressions.
we use the keyword _class_, we must use _constructor_ as a method name. the other methods we define are part of the prototype, not on the object.

```js
const PersonEx = class {};
class PersonCL {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  //method will be added to .prototype property.
  calculateAge() {
    console.log(2037 - this.birthYear);
  }
}

const janice = new PersonCL("Janice", 1986);
console.log(janice);
```

1. Classes are not hoisted.
2. Classes are first-class citizens.
3. Class are always executed in 'strict-mode'.

we can't ignore prototypical inheritance, even if we use ES6 method. but the class syntax makes things nicer by having all the code at the same place,

</details>

### Getters And Setters

<details>
<summary>
Function that get and set data, but are called on like regular properties. actually part of ES5.
</summary>

for getters, we create a normal function, and then add the _get_ keyword for to it. so we now longer need parentheses to call it. setters use the _set_ keyword and must take **one** parameter.

```js
const account = {
  owner: "Jonas",
  movements: [120, 30, 400],

  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest);
account.latest = 55;
console.log(account);
```

for ES6 classes, the code is similar. we simply add the _'get/set'_ keywords.
remember that it still is a function, and will be calculated only when we call it,and recalculated again for each call.

```js
class PersonCL {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  //method will be added to .prototype property.
  get age() {
    console.log(2037 - this.birthYear);
  }
}

const janice = new PersonCL("Janice", 1986);
console.log(janice.age);
```

Setters are great for data validation, we can ensure that the new data fits a criteria and if it doesn't we can reject it from overwriting the data.

```js
class PersonCL {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
    this.fullName = firstName + " unknown";
  }
  //method will be added to .prototype property.
  get age() {
    console.log(2037 - this.birthYear);
  }
  //setter has a different name than that of the property, usually underscore.
  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    else console.log(`${name} is not valid`);
  }
}
```

we should be careful of having the same name for the setter and the underlying method. otherwise we can get a stack-overflow. the convention is to have the inner property name with an underscore before it.

</details>

### Static Methods

<details>
<summary>
Methods that belong to the namespace and act independent of whatever object we have.
</summary>

static methods don't operate on any instance of the class. like the _Array.from()_ method. these are methods that aren't attached to the prototype, so they can't be called from an instance. they are part of the constructor function.

```js
Array.from(document.querySelectorAll("p")); //works
[1, 3].from(document.querySelectorAll("p")); //error!
```

a lot of function from the _'Number'_ namespace are like that. the static function isn't inherited to the instances that were created with the function

```js
const PersonCF = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

PersonCF.hey = function () {
  console.log(this); // the constructor function is the 'this'
  return "Hey!";
};
const ben = new PersonCF("ben", 1995);
//console.log(ben.hey()); //error
console.log(PersonCF.hey()); //works fine, called on constructor function
```

for es6 classes. we simply add the _static_ keyword

```js
class PersonES6 {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  //prototype method
  hey() {
    return `Hey ${this.firstName}`;
  }
  //static method
  static hey() {
    return `Hey there!`;
  }
}

const dan = new PersonES6("dan", 1889);
console.log(dan.hey()); //call prototype method
console.log(PersonES6.hey()); // call static method
```

</details>

### Object Creation with _Object.create()_

<details>
<summary>
Object.create() returns a new object whose linked to a different object via the prototypical chain.
</summary>

The third way to create objects, by using the _Object.create()_ method, we still have prototype inheritance, but no prototype properties, no constructor function and no '_new_' operator.
we use _Object.create()_ to manually set the prototype of the created object into a different object.

```js
const PersonProto = {
  calcAgeOCR() {
    return 2037 - this.birthYear;
  }, //using enhanced object literals syntax
};

const steve = Object.create(PersonProto); //steve's prototype is PersonProto
console.log(steve.__proto__);
console.log(steve.calcAgeOCR()); //NaN
steve.birthYear = 1992;
console.log(steve.calcAgeOCR()); // now it works!
```

constructor function and ES6 classes use the _new_ keyword. _Object.create()_ sets the prototype manually. we can have different structures of objects with the same prototype, or similar structures with different prototypes.

We can have function that behaves like a constructor function, but initiates the properties via the prototypical inheritance after the object was created

```js
PersonProto.init = function (firstName, birthYear) {
  this.firstName = firstName; //the 'this' is the calling member
  this.birthYear = birthYear;
};
const sarah = Object.create(PersonProto);
sarah.init("sarah", 2011);
console.log(sarah.calcAgeOCR());
```

#### Coding Challenge #2

<details>
<summary>
Use ES6 classes, getter / setter to make the previous challenge cleaner to look at
</summary>

> Your tasks:
>
> 1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
> 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6).
> 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6)
> 4. Create a new car and experiment with the 'accelerate' and 'brake' methods, and with the getter and setter.
>
> Test data:

- Data car 1: 'Ford' going at 120 km/h.

</details>

</details>

### Inheritance Between _'Classes'_

<details>
<summary>
Different ways to create inheritance chains between prototypes.
</summary>

so far, we looked at ways to implement inheritance between an object and it's prototype, now we will look at _'real inheritance'_ between _'real classes'_. like how other programming languages do it.

#### Constructor Functions Inheritance

<details>
<summary>
Manually manipulating the prototype chain
</summary>

we start with inheritance between constructor functions.
we will use the Person Class as a parent class, and a 'student' class as a derived chile class. we will do this with using the constructor function, es6 classes and _Object.create()_.

we start with the base class. like we did many times already. we will then have constructor for the student, with the same arguments and additional data as needed. we also have a method on the prototype.

```js
const PersonCFBase = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

PersonCFBase.prototype.calculateAge = function () {
  console.log(2037 - this.birthYear);
};

const StudentCFDerived = function (firstName, birthYear, course) {
  this.firstName = firstName;
  this.birthYear = birthYear;
  this.course = course;
};
StudentCFDerived.prototype.introduce = function () {
  console.log(`my name is ${this.firstName}, and I study ${this.course}`);
};
const mike = new StudentCFDerived("mike", 2015, "Economics");

mike.introduce();
```

the first thing we want to do is to remove the duplication from the student constructor function. the problem is that if we use it directly, we don't have the _'this'_ keyword, so we use the _.call()_ method.

```js
const StudentCFDerived = function (firstName, birthYear, course) {
  //PersonCFBase(firstName,birthYear); //doesn't work
  PersonCFBase.call(this, firstName, birthYear); //this works
  this.course = course;
};

//mike.calculateAge(); //doesn't work
mike.introduce(); //works
```

we have the introduce method, but not 'calculate age' method on the student object. we want to inherit from the person class. we want to make the prototype chain fit this vision.
the prototype of student.\_\_proto\_\_ should be the person prototype. this is done manually for now.

```js
StudentCFDerived.prototype.foo = function () {};
console.log(StudentCFDerived.prototype); //foo is visible
StudentCFDerived.prototype = Object.create(PersonCFBase.prototype);
console.log(StudentCFDerived.prototype); //foo is gone!
const jen = new StudentCFDerived("jen", 2016, "Math");
jen.calculateAge(); //works
```

this actually creates a new object as the prototype, so any new student will lose access to the previous methods, because now we created an empty (but still linked) object as the prototype. this means we should restructure the order.

we have to use _Object.create()_ to set up the prototype chain. otherwise we get a weird thing. we want to inherit, not make the same.

```js
StudentCFDerived.prototype = PersonCFBase.prototype; //is bad.
StudentCFDerived.prototype = Object.create(PersonCFBase.prototype); // is good, almost
```

now we make a new student object, and when we call a method, like calculateAge(), it travels across the prototype chain, from the student prototype, ot the person prototype, and then the Object prototype.

we still have some stuff to fix! we want the _.prototype.constructor_ to point to the correct constructor function!

```js
console.log(StudentCFDerived.prototype.constructor); //personCFBase
StudentCFDerived.prototype.constructor = StudentCFDerived;
console.log(StudentCFDerived.prototype.constructor); //StudentCFDerived

console.log(jen instanceof StudentCFDerived); //true
console.log(jen instanceof PersonCFBase); //true
console.log(jen instanceof Object); //true
```

</details>

#### Coding Challenge #3

<details>
<summary>
Using inheritance with constructor functions, overriding some functions and not others. using the first matched method in the prototype chain.
</summary>

> Your tasks:
>
> 1. Use a constructor function to implement an Electric Car (called 'EV') as a child "class" of 'Car'. Besides a make and current speed, the 'EV' also has the current battery charge in % ('charge' property)
> 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo'.
> 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%'.
> 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'!
>
> Hint: Review the definition of polymorphism
>
> Test data:
>
> - Data car 1: 'Tesla' going at 120 km/h, with a charge of 23.

</details>

#### ES6 Classes Inheritance

<details>
<summary>
The ES6 classes syntax for inheritance. the most like other languages
</summary>

Now we will use ES6 classes to inherit from
we start with the same ES6 class for person,
the 'class' syntax hides the details and does the work for us, we simply have the additional _extends_ and _super_ keywords.

- _extends_ links the classes and the prototypes.
- _super_ calls the constructor function of the parent class.

if we don't have additional arguments to the constructor, we can drop the entire constructor call in the derived class. it will be generated automatically.

```js
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
  //we can drop the constructor
  bar() {
    return this.a * this.b;
  }
}
const b = new B(1, 2, 3);
console.log(b.foo());
const c = new C(4, 5);
console.log(c.bar());
```

the prototype chain is automatically set up by the _extends_ keyword. we can still override methods in the derived class to make it appear first in the prototype chain.

**there is a danger associated with inheritance, but we will see it later in the course.**

</details>

#### _Object.create()_ Inheritance

<details>
<summary>
Creating Inheritance via the Object.create() method by specifying the objects directly.
</summary>

we make the derived prototype inherit from the base prototype with _Object.create()_. and now we have a prototype chain. we can then add methods to the new prototype that we created. the same prototype chain rules apply

there is a diagram.

```js
const StudentPrototype = Object.create(PersonPrototype);
StudentPrototype.init = function (firstName, birthYear, course) {
  PersonPrototype.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentPrototype.introduce = function () {
  return `hey! I am ${this.firstName}, and I study ${this.course} for fun!`;
};
const jay = Object.create(StudentPrototype);

jay.init("jay", 2019, "chemistry");
console.log(jay.calcAgeOCR());
console.log(jay.introduce());
```

No need to use the _'new'_ keyword, worry about constructors or stuff like that, this isn't trying to copy other languages. we are just linking objects together to serve as prototypes.

</details>

</details>

### Encapsulation And data Privacy

<details>
<summary>
How do we stop users from accessing private data?
</summary>

refactoring the account objects from the earlier lectures into classes.
using methods instead of directly touching elements. but those members can still be touched and changed,

```js
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;
  }
  deposit(val) {
    this.movements.push(val);
  }
  withdraw(val) {
    this.movements.push(-val);
  }
  approveLoan(val) {
    return val < this.movements.reduce((a, b) => a + b, 0) / 10; //assume this works
  }
  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
    }
  }
}
const account1 = new Account("Jonas", "EUR", 1111);
account1.deposit(500);
account1.withdraw(300);
account1.movements.push(9000); //can still do this.
account1.approveLoan = function (val) {
  return true;
}; //changing the method from outside
```

encapsulation means making data and methods private, only accessible from inside the objects. this for both security reasons and to allow us to change internal code without effecting the outside code (which uses the public API).

JavaScript doesn't support real encapsulation (maybe in the future it will), it only has conventions. we use an underscore to suggest that something is private, and shouldn't be changed.
**this isn't real privacy**, and JavaScript calls this 'protected' (not like other languages that use 'protected' as an access modifier). this is a way to tell other programers not to use this method.

```js
class ProtectedMovements {
  constructor(owner) {
    this.owner = owner;
    //underscore before name is convention
    this._movements = [];
  }
  getMovements() {
    return this._movements;
  }
}

const acc1 = new ProtectedMovements("Joe");
console.log(acc1.getMovements());
acc1._movements.push(11); //we can still do this
```

#### Private Class Fields and Methods

<details>
<summary>
A proposal for the future of JavaScript to implement class fields and allow true privacy.
</summary>

[Private class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)

There is a proposal (in advanced stages) to implement class fields and support true encapsulation of data. like in other languages. this will make classes something more than synthetic sugar over constructor function.

there will be different kinds of properties: public/private X field/method and also static/ non static

_public fields_ are not on the prototype, they are on the object itself (the instance). they are declared outside of the constructor, and have a semi-colon, but not const or let. they can be accessed by the _'this'_ keyword.

_private fields_ are what we really wanted, they are truly unaccessible from the outside. we mark them like public fields, but with the # symbol before the name. **this symbol is part of the name**, but when we try accessing it from outside, we get an error.

> "Private field '#movements' must be declared in an enclosing class"

it also doesn't show when we print the object in node, but does show in chrome.

we want to set the _pin_ field to private, but we need to set it's value from the constructor, so we first declare it without a value as a private field, and then give it a value.

_public methods_ - all the methods we used so far are public methods, nothing changed.

_private methods_ - same as with private fields, we declare it with a leading # symbol to make it private. in the future it will work differently, maybe.

the same four fields apply for static versions. it's weird to think about a private static method, because static methods are called without an object, but it does work for hiding implementation and for helper functions.

```js
class AccountPrivates {
  //public fields
  locale = navigator.language;
  // _movements = [];
  //private fields
  #movements = [];
  #pin; //no value
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    //??protected by convention??
    //this._movements = [];
    //this.locale = navigator.language;
    //give value to a private field
    this.#pin = pin; //
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

const ben2 = new AccountPrivates("ben", "EUR", 1234);
//console.log(ben2.#movements); //error!
ben2.deposit(50);
ben2.requestLoan(900);
ben2.requestLoan(901);
//console.log(ben.#approveLoan(700)); // error!
console.log(ben2.getMovements());
console.log(ben2);
```

</details>

#### Chaining Method

<details>
<summary>
Making methods chain-able.
</summary>

like with the _.filter()_ and _.map()_ functions, we can make our methods in a way that the can be chained together. this is called a 'fluent interface'. we simply change our methods to make them return the object (the _'this'_ keyword). it's used mostly for methods that set something.

```js
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
      console.log(`loan of ${val} approved!`);
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
const ben3 = new AccountPrivatesChain("ben3", "NIS", 7777);
ben3.deposit(60).deposit(65).requestLoan(1000).deposit(70); // now it works
console.log(ben3.getMovements());
```

</details>

#### Coding Challenge #4

<details>
<summary>
use ES6 classes for inheritance, use private fields.
</summary>

> Your tasks:
>
> 1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class.
> 2. Make the 'charge' property private.
> 3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. Then experiment with chaining!
>
> Test data:
>
> - Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%.

</details>

</details>

### ES6 Classes Summary

<details>
<summary>
a review of all the terminology relating to ES6 classes.
</summary>

- _class_ keyword to define a class.
- _extends_ keyword to define an inheritance.
- _public fields_ are defined outside the constructor
- _private fields_ are defined outside the constructor and with the _#_ prefix to their name. not accessible from outside the class.
- _static_ keyword can be applied to _public fields_ and _private fields_ to make them available only on the class, not on instances.
- _constructor_ is a declaration for the _new operator_, can be omitted in child class that doesn't add fields.
- _super_ keyword calls the base class constructor, must be done before anything else.
- _instance properties_ are defined with the _'this'_ keyword, and aren't part of the prototype.
- _public methods_ are the public facing api of the class.
- _private methods_ are declared with _#_ prefix, and can only be used in the class.
- _protected_ is a convection, we add an underscore to signal to other programmers not to use this method or property, but we can't enforce this.
- _get_ is a way to make a function be called like a property, without parentheses, must be parameter-less.
- _set_ is a way to call a function like setting a property, no parameters. one argument only, be careful of naming. used for data validation.
- _new_ is an operator that creates an object with the constructor function.

</details>

</details>
