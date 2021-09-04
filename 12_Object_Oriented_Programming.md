## Object-Oriented Programming (OOP) With JavaScript

<!-- <details> -->
<summary>

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

there are 4 common principles for OOP: _abstraction_, _encapsulation_, _inheritance_, _polymorphism_.

> - **Abstraction**: Ignoring or hiding details tha **don't matter**, allowing us to get and **overview** perspective of the _thing_ we're implementing, instead of messing with details that don't really matter to our implementation.
>
> - **Encapsulation**: Keeping properties and method **private** inside the class, so they are **not accessible from outside the class**. Some methods can be **exposed** as a public interface (API).
>
> - **Inheritance**: Making all properties and methods of a certain class **available to a child class**, forming a hierarchical relationship between classes, this allows us to **reuse common logic** and to model real-world relationships.
>
> - **Polymorphism**: a child class can **overwrite** a method it inherited from a parent class \[it's more complex than that, but enough for our purpose].

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
