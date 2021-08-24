## Revisiting Functions

<summary>
Advanced topics about functions: higher order functions, binding, closures.
</summary>

### Default Parameters

<details>
<summary>
Defining default values for function calls.
</summary>
it's useful to have some parameters to a function that have default values, the default parameters are used, but if the user passes them, then the none-default values apply.

in the old world, if we wanted to have a default value, we would use short circuiting to check the parameter and then give it a different value;

```js
const foo = function (a) {
  a = a || 4; // if a is a falsy value, make it 4
  console.log(a);
};
```

because we use the _or || operator_, we can get weird stuff for zero or empty strings, we could upgrade to the null _coalescing operator (??)_, but there is a better way. we simply declare the default values in the function definition.

```js
const foo = function (a = 4) {
  console.log(a);
};
```

default values can contain expressions and can depend on other parameters (if they were defined before). when we have default values, we cannot skip arguments, and if we want to use the default values we start omitting from the end, but there is a trick. if we want to use a positional default value, we simply pass _undefined_ to it.

```js
const foo = function (a = 5 * 6, b = a + 9) {
  console.log(a, b);
};
foo(); //30,39
foo(2); //2,11
foo(7, 7); //7,7
//foo(,7); // won't work
foo(undefined, 4); //30,4
```

</details>

### Passing Arguments to Functions: Value vs References

<details>
<summary>
Primitive are passed by value (copied), objects are passed as reference, and functions can change those objects.
</summary>
there is a difference between how arguments behave depending on their type, primitives (passed by value) or objects (passed by reference).primitive arguments passed by value are 'copied' and they aren't effected from changes inside the function, but objects are passed as reference, and changes inside the function effect the objects from outside.

```js
const foo = function (flightNum, passenger) {
  flightNum = "LH999";
  passenger.name = "Mr. " + passenger.name;
  passenger.la = true;
};
const jonas = { name: "jonas" };
const flight = "ABC999";
foo(flight, jonas);
console.log(flight, jonas); //ABC999, {name:'Mr. Jonas', la:true}
foo(flight, jonas);
console.log(flight, jonas); //ABC999, {name:'Mr. Mr. Jonas', la:true}
```

we need to be very careful of this behavior, it's problematic that every function can change the object.

in javascript, when we say pass-by-reference, we mean 'pass the value of the reference'. we don't have pass-by-reference for primitives like c++.
there is no javascript code that's equivalent to this:

```cpp
void foo(int & a)
{
    a= 5; //pass by reference, change a
}
void bar( int * a)
{
    *b= 99; //pass by pointer, change a
}
```

</details>

### First Class and Higher-Order Functions

<details>
<summary>
What are First class functions and higher-order functions
</summary>

javascript has first-class functions:

> javascript treats functions as **first-class citizens**
> this means that functions are **simply values**
> functions are just another **"type" of object**

because functions are simply objects, we can store them as data members,give them names, pass them as arguments and even return them from other functions. because functions are objects, they also have methods, such as _bind_.

Higher-Order Functions

> a function that **receives** another function as an arguments, or **returns** a new function, **or both**.
> this is only possible because of first-class functions.

the addEventListener is an higher order function, it takes a callback function

```js
const greet = () => console.log("hey");
btnClose.addEventListener("click", greet); //higher order function, takes a callback;

function count() {
  //return a new function
  let counter = 0;
  return function () {
    counter++;
  };
}
const timesFoo = count();
timesFoo(); //1
timesFoo(); //2
```

first class function is the feature/concept, whether functions are objects.
higher-order functions are the functions themselves.

</details>

#### Function Accepting Callback Functions

<details>
<summary>
All functions that we pass as arguments are called 'callback functions'.
</summary>
continuing with the topic of higher-order functions.

```js
const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase(); //regex, replace all
};
const upperFirstWord = function (str) {
  const [first, ...other] = str.split(" "); // rest operator
  return [first.toUpperCase(), ...others].join(" "); //spread operator
};
const transformer = (
  str,
  fn //higher order functions that takes a function
) => {
  console.log(`original string ${str}`);
  console.log(`transformed string ${fn(str)}`);
  console.log(`transformed by ${fn.name}`); //objects have names!
};

transformer("javaScript is the best!", upperFirstWord);
transformer("javaScript is the best!", oneWord);
```

the functions are still callback functions, even if they are called immediately. callback functions allow us to create abstractions, we hide the details to get more readable and more modular code.

</details>

#### Functions That Return a Function

<details>
<summary>
Functions can return functions themselves.
</summary>
The opposite of the last lecture, now we have a function that returns a function!

```js
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greetHey = greet("hey");
greetHey("jonas"); // 'hey jonas'
greetHey("steven"); // 'hey steven'
greet("hello")("dan"); //'hello dan'
```

this works because of closures, which will be covered later. this is very important for functional programming.

```js
const greet = (greeting) => (name) => console.log(`${greeting} ${name}`); //arrow function
```

</details>

### The Call and Apply and Bind Methods

<details>
<summary>
use function methods to set the calling object.
</summary>

#### Call and Apply

<details>
<summary>
Setting the 'this' keyword for 'free functions'.
</summary>

Setting the 'this' keyword, remember that the 'this' keyword refers to the calling object. with the call and apply methods, we don't need to have the same function at each object

```js
const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    ); //using the *this* keyword
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name }); //create an objects
  },
};

lufthansa.book(239, "jonas");
lufthansa.book(653, "joe");
```

but if want a new company, we don't want to repeat the code, so we move it into an external variable. but because the other object doesn't have the correct property "airline",because if we have this a free function, we don't have the correct _'this'_ keyword. to overcome the problem we can use the _.call()_ method,which takes an object as the first argument, and uses it's _'this'_.

```js
const book = lufthansa.book;
const eurowings = {
  name: "eurowings", //not airline, name
  iataCode: "EW",
  bookings: [],
  //book, //enchanted object literals syntax
};
//book(23, "sara"); // error, can't access property 'airline' of undefined
book.call(eurowings, 23, "sara"); //now eurowings is the the calling objects. even if we have undefined 'airline'
book.call(lufthansa, 244, "dan"); // call by using the lufthansa object
```

the _.apply()_ method is similar to to _.call()_, but it takes an array as the second argument. it's not as used today.

```js
const arr =[244,"j.j abrams"];
book.apply(eurowings,arr); //pass an array
book.call(eurowings,..arr); //pass an array, but spread it
```

</details>

#### The Bind Method

<details>
<summary>
sets the this keyword and other arguments and returns a new function without calling it.
</summary>
similar to *.apply()* and *.call()* methods, the *.bind()* method also takes an objects as the calling object, but it doesn't call the function, rather, it returns an function object which has the appropriate object bound to it. we can also pass other arguments that will be always used in the function.

```js
const bookEw = book.bind(eurowings);
bookEw(134, "steve"); //use eurowings objects
const bookEw13 = book.bind(eurowings, 13);
bookEw13("jonas");
bookEw13("martha");
const bookEw292 = bookEw.bind(292);
bookEw292("lucy");
```

this patterns is called _partial application_, we pre-define some arguments.
we can also use the bind method with objects and event Listeners. recall that when we add eventListeners, the calling object is the object on which the event is called (the button). the _.bind()_ method allows us to set which 'this' is used, even if we set it to the original object!

```js
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

//document.querySelector(".buy").addEventLister("click", lufthansa.buyPlane); // this isn't what we wanted! because the 'this' keyword is for the button.
document
  .querySelector(".buy")
  .addEventLister("click", lufthansa.buyPlane.bind(lufthansa)); //now the function callback is called on lufthansa object.
```

for partial application, we can set other arguments, not just the _this_. the order is important

```js
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
const addVat = addTax.bind(null, 0.23); //the null is just a convention.
console.log(addVat(200));

const foo2 = (arg1, fn) => {
  return fn.bind(null, arg1);
};
const foo3 = (arg1, fn) => (arg2) => fn(arg1, arg2);
const addVat2 = foo2(0.17, addTax);
const addVat3 = foo3(0.17, addTax);
console.log(addVat2(1000));
console.log(addVat3(1000));
```

</details>

#### Coding Challenge 1

<details>
<summary>
Binding events listeners to objects. default parameters, joining strings, using .call() and .bind() methods.
</summary>

> Let's build a simple poll app!
> A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter **'poll'** object below.
>
> Your tasks:
>
> 1. Create a method called **'registerNewAnswer'** on the **'poll'** object. The
>    method does 2 things:
>
> - a. Display a prompt window for the user to input the number of the
>   selected option. The prompt should look like this:
>
> ```
>   What is your favorite programming language?
>   0: JavaScript
>   1: Python
>   2: Rust
>   3: C++
>   (Write option number)
> ```
>
> - b. Based on the input number, update the **'answers'** array property. For
>   example, if the option is 3, increase the value at position 3 of the array by 1. Make sure to check if the input is a number and if the number makes
>   sense (e.g. answer 52 wouldn't make sense, right?)
>
> 2. Call this method whenever the user clicks the **"Answer poll"** button.
> 3. Create a method **'displayResults'** which displays the poll results. The
>    method takes a string as an input (called **'type'**), which can be either _'string'_ or _'array'_. If type is _'array'_, simply display the results array as it is, using console.log(). This should be the default option. If type is _'string'_, display a string like _"Poll results are 13, 2, 4, 1"_.
> 4. Run the '**displayResults'** method at the end of each **'registerNewAnswer'** method call.
> 5. Bonus: Use the **'displayResults'** method to display the 2 arrays in the test data. Use both the _'array'_ and the \*'string'\*\*option. Do not put the arrays in the poll object! So what should the this keyword look like in this situation?
>
> Test data for bonus:
>
> - Data 1: [5, 2, 3]
> - Data 2: [1, 5, 3, 9, 6, 1]
>
> Hints: Use many of the tools you learned about in this and the last section
>
> ```js
> const poll = {
>   question: "What is your favorite programming language?",
>   options: ["0: JavaScript", "1: Python", "2: Rust", "3:  C++"],
>   // This generates [0, 0, 0, 0]. More in the next section!
>   answers: new Array(4).fill(0),
> };
> ```

</details>

</details>

### Immediately Invoked Function Expressions

<details>
<summary>
An anonymous function that runs once and can't be accessed again.
</summary>
a function that is used only once and only when it's declared. this is used a lot with *await-async*. we can do this with immediately invoked function expressions.

```js
(function () {
  console.log("un callable function");
});
(function () {
  console.log("called once!");
})();
() => console.log("never again")();
```

functions create scopes,and scopes can only access outer scopes,it was once used as a way to protect variables (before we had const\let and block-scopes).

</details>

### Closures

<details>
<summary>
A closure is a pattern/feature that maintains the variables of a function even after the function definition is done.
</summary>
Closures are considered a complicated topic, but they are actually the summation of the scope-chain and call-stacks and execution contexts ideas. we don't create closures manually, it's just something that happens.

```js
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};
const booker = secureBooking();
booker(); //1 passengers
booker(); //2 passengers
```

the function objects maintain the variables from when they were defined. the closure contains all the data that was relevant when it was created. every function contains the execution context of when it was created. this is the closure. closures have priority over other scopes.

> - A function always has access to the variable environment(VE) of the execution context in which it was created.
> - **Closure**: VE attached to the function, exactly as it was at the time and place the function was created.

other ways to describe closures

> - A closure is the closed-over **variable environment** of the execution context **in which the function was created**, even **after** that execution context is gone.
> - A closure gives a function access to all the variable **of it's parent function**, even **after** that parent function has returns, the function keeps a **reference** to it's outer scope, which **preserves** the scope chain throughout time.
> - A closure makes sure that a function doesn't lose connection to **variables that existed at the function's birth place**.
> - A closure is like a **backpack** that a function carries around wherever it goes. This backpack has all the **variables that were present in the environment where the function was created**.
>   We do **NOT** have to manually create closure, this is a javaScript feature that happens automatically. we can't even access closed-over variables explicitly. a Closure is **NOT** a tangible javaScript object.

we can look at the internal properties of the function object in the console. it's better to do so in the browser so we can navigate it.

```js
console.dir(booker); // look in the browser, not in the code.
```

when we see properties with double square brackets like \[\[scopes\]\], it means it's an internal property that we can't access by code.

we don't have to use higher-order functions to see closures in action. in this example we see a closed-over variable that keeps living even after the function
that created it is gone.

```js
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};
const h = function () {
  const b = 70;
  f = function () {
    console.log(b * 2);
  };
};
g();
f(); //46
h(); // reassign f.
f(); // 140
g();
f(); //46
```

a timer is also an example of closure.

```js
const diff = 5;
const boardPassengers = function (n, wait) {
  const perGroup = Math.trunc(n / 3);
  const diff = n - 3 * perGroup;
  setTimeout(function () {
    console.log(
      `we are now boarding 3 groups of ${perGroup} passengers and additional ${diff}`
    );
  }, wait * 1000);
  console.log(`boarding will start in ${wait} seconds`);
};
const perGroup = 5;
boardPassengers(16, 2);
```

the perGroup variable and the other arguments are maintained in the closure of the callback function. the closure has priority over the outer scopes, the callback uses the closure variables as it's immediate scope.

#### Coding Challenge 2

<details>
<summary>
using IIFE and closures to create an event listener.
</summary>

> This is more of a thinking challenge than a coding challenge
>
> Your tasks:
>
> 1. Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the body element is clicked. Do not select the h1 element again!
> 2. And now explain to yourself (or someone around you) why this worked! Take all the time you need. Think about when exactly the callback function is executed, and what that means for the variables involved in this example.
>
> ```js
> (function () {
>   const header = document.querySelector("h1");
>   header.style.color = "red";
> })();
> ```

</details>

</details>
