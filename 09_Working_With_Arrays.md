## Working With Arrays

<summary>
Advanced topics about arrays: methods, tools, building a project.
</summary>

[The Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

### Simple Array Methods

<details>
<summary>
arrays are objects, methods are functions that can be called on objects, therefore arrays are objects and have built-in methods.
</summary>

let's extend our list of array methods.

- _.push(element)_ adds an element to the end of the array, returns the length of the updated array.
- _.unshift(element)_ adds an element to the start of the array, returns the length of the updated array.
- _.pop()_ removes an element from the end of the array, returns the removed element;
- _.shift()_ removes an element from the start of the array, returns the removed element;
- _.indexOf(element)_ returns the index of the element in the array, if the element isn't inside, returns -1.
- _.includes(element)_ returns a boolean value indicating if the elements exists inside the array, uses strict equality. an _ES6_ method.
- _.slice(beginIndex, endIndex)_ **creates a new array** from the beginning index, up to the the endIndex (exclusive), we can use negative numbers. it's also creates a shallow copy of the array (_similar to the spread operator_).
- _.splice(deleteIndex, deleteCount)_ - **mutates** the array, removes the element at the deleteIndex and the following element based on the second argument.
- _.reverse()_ - **mutates** the original array and reverses the order of the element.
- _.concat(otherArr)_ - **creates a new array** that contains the calling elements and the elements from the other array/
- _.join(delimiter)_ - **creates a string** from the elements of the arrays with the delimiter between them.
- _.forEach(function)_ - call the function on each of the element of the array. a higherOrder function
- - _.map(transformingFunc)_ - similar to the _.forEach()_, but the function should return an element, the new values are the elements of the **new array** returned.
- _.filter(predicate)_ - **returns an array** containing only the elements that fit a criteria that we specify (a _predicate_ function).
- _.reduce(aggregationFunc,starting accumulator)_ - return a **single value** by applying an aggregate function on all elements.
- _.find(predicate)_ - finds a **single value** satisfying the condition. similar to _.filter()_, but it doesn't return an array.
- _.findIndex(predicate)_ - finds the **index** of the first element matching the predicate, used together with _.splice()_ to remove elements.
- _.some(predicate)_ - return a **boolean value** indicating if _at least one_ of the elements matches the predicate callback function (like _.includes()_ _like c# .any()_)
- _.every(predicate)_ - return a **boolean value** indicating if _all_ of the elements match the predicate callback function (_like c# .all()_).
- _.flat(optionalDepth)_ - **returns a new array** with all the element from sub arrays pulled up by some amount. the optionalDepth argument (default 1) allows us to define how many levels we are pulling up **ES19**.
- _.flatMap()_ - applies a map an each element and than flat the results **returns new array**. **ES19**.
- _.sort(optionalComparer)_ - **mutates the array**, uses default lexical string ordering or some comparer callback function.
- _.fill(value,optionalBegin, optionalEnd)_ - makes all the elements be the given value, **mutates the array**. we can pass the begin and exclusive end index.

```js
let arr = ["a", "b", "c", "d", "e"];
console.log(arr.slice(2)); //c,d,e
console.log(arr.slice(2, 4)); //c,d
console.log(arr.slice(1, -2)); //b,c
arr.splice(-1); //a,b,c,d
console.log(arr); // a,b,c,d
arr.splice(0, 2); //c,d
console.log(arr); // c,d

arr2 = [6, 5, 4, 3, 2, 1, 0];
console.log(arr2.reverse());
console.log(arr2);
const letters = [1, 2, 3].concat([4, 5, 6]);
console.log(letters); //1,2,3,4,5,6
console.log(letter.join("x")); //1x2x3x4x5x6
```

</details>

### Looping Arrays

<details>
<summary>
The .forEach() method for looping.
</summary>

different types of looping, the _.forEch()_ method takes a function and calls it on each of the elements (in order), the method actually passes the element, the index, and the entire array(**in that order**). we don't need to call the _.entries()_ method to get the index.
one difference between the two forms is that it's not possible to break from an _.forEach()_ loop.

```js
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
});

//index first, element second
for (const [index, movement] of movements.entries()) {
  console.log(`index ${index}, movement ${movement}`);
}

//element,index, entire array
movements.forEach(function (movement, index, array) {
  console.log(`index ${index}, movement ${movement} of array ${array}`);
});
```

#### Looping Over Maps and Sets

<details>
<summary>
The .forEach() method also works on maps and sets.
</summary>

For maps the argument to the callback function are value, key, and the entire map (corresponding to element, index, entire array). for sets the key and the value are the same, so it's still (value,key, set).

```js
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach(function (value, key, map) {
  console.log(`key is ${key},value is ${value}`);
});

const currenciesUniques = new Set(["USD", "GPB", "USD", "EUR", "EUR"]);
currenciesUniques.forEach(function (value, key, set) {
  console.log(`key ${key} and value ${value} are the same!`);
});
```

</details>

#### Coding Challenge 1

<details>
<summary>
Using arrays methods, and looping over arrays.
</summary>

> Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
> about their dog's age, and stored the data into an array (one array for each). For
> now, they are just interested in knowing whether a dog is an adult or a puppy.
> A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
>
> Your tasks:
> Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
>
> 1. Julia found out that the owners of the first and the last two dogs actually have
>    cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
>    ages from that copied array (because it's a bad practice to mutate function
>    parameters)
> 2. Create an array with both Julia's (corrected) and Kate's data
> 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
>    is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy")
> 4. Run the function for both test datasets
>
> Test data:
>
> - Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
> - Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
>
> Hints: Use tools from all lectures in this section so far

</details>

</details>

### Project - Bankist

<details>
<summary>
A animalistic banking account management operations,
</summary>
displaying balance, operations,  transferring money, taking a loan. different formatting, etc.

//TODO: add flowchart in puml

the first part is to update the UI.

![flowchart](11-Arrays-Bankist/starter/Bankist-flowchart.png)

we have the four accounts objects hardcoded as objects,we have an html file, a css file, and some photos.

</details>

### Creating DOM Elements

<details>
<summary>
Lets start by creating data to put inside the DOM so it would be displayed!
</summary>
still working with the banking project.
in this project, the act of logging in and out is simply changing the opacity of the *.app* element in the css file.
we will first add our movements to the display with a function called *displayMovement(movements)*

in the html, we look at the movements element

```html
<!-- MOVEMENTS -->
<div class="movements">
  <div class="movements__row">
    <div class="movements__type movements__type--deposit">2 deposit</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">4 000€</div>
  </div>
  <div class="movements__row">
    <div class="movements__type movements__type--withdrawal">1 withdrawal</div>
    <div class="movements__date">24/01/2037</div>
    <div class="movements__value">-378€</div>
  </div>
</div>
```

we are interested in the _movement_row_ element, so we will use template literals to create it in a function.
we will then attach the html into the container with a method called ._insertAdjacentHTML(indexTest, htmlString)_

the options for the positions are

- 'afterbegin`
- 'afterend'
- 'beforebegin'
- 'beforeend'

but if we look at our html, we can still see the old data, so lets first remove it by setting the the html to an empty string.
_innerHTML_ is similar to _textContent_, but it also contains the html tags.

</details>

### Data Transformations: _map_, _filter_,_reduce_

<details>
<summary>
Array methods that create new arrays based on transforming existing data.
</summary>
theses methods create new data based on existing data, according to some idea of transformation.

- _.map(transformingFunc)_ - similar to the _.forEach()_, but the function should return an element, the new values are the elements of return array.
- _.filter(predicate)_ - returns an array containing only the elements that fit a criteria that we specify (a _predicate_ function)
- _.reduce(aggregationFunc,starting accumulator)_ - return a single value by applying an aggregate function on all elements.

#### Array _map_ Method

<details>
<summary>
Transform each element into a new value and return an new array.
</summary>
a function is applied to each element of the array, and the result of those function calls are stored into a new array.

```js
const movementsInEuro = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUsd = 1.1; //ratio
const movementInUsd = movementsInEuro.map(function (euro) {
  //return 23; //all elements will be 23
  return euro * euroToUsd;
});
console.log(movementInUsd);
```

in this example we get some rounding errors because of the floating point calculations.
if we wanted to do the same thing with a regular loop, we would need to first create the array outside the loop and then we would push element into it. the _map()_ method is a bit more similar to functional programming. we can also use the arrow function syntax.

the _.map()_ method has the same three parameters as the _.forEach()_, (element, index, array)

```js
const movementsDescription = movementsInEuro.map((mov, i, array) => {
  if (mov > 0) {
    return `movement ${i + 1}: you deposited ${mov}`;
  } else return `movement ${i + 1}: you withdrew ${Math.abs(mov)}`;
});

const descSimplified = movementsInEuro.map(
  (mov, i) =>
    `movement ${i + 1}: you ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescription);
```

##### Computing Usernames

we can now use this mapping method in our project to create the user names, the user names are the initials of the name.
we have a full name, which we convert to a lower case, split by the spaces, take the first letter and then join back.
we use the _.forEach()_ because we wanted to modify the values.

</details>

#### Array _filter_ Method

<details>
<summary>
Filter the array for elements that satisfy a condition.
</summary>

just as before, we have access to the same arguments of element, index, entire array in our callback function.
we pass a callback function with a boolean return value.

```js
const deposits = [1, 2, -3, 5, -20, -11, 4].filter((amount) => amount > 0);
console.log(deposits);
```

</details>

#### Array _reduce_ Method

<details>
<summary>
The reduce methods computes a single value from all the elements of the array.
</summary>

unlike the other functions, in this case, the first value of the functions is an _accumulator_, the value from the earlier function calls. the rest of the parameters follow as usual.
we can also pass another value besides the callback function, which is the first, initial value of the accumulator.
the callback function should return the new accumulator value. we can use arrow functions as usual.

```js
const balance = movements.reduce(function (acc, current) {
  return acc + current;
});
console.log([].reduce((a, b) => a + b, 1000)); //1000
```

we can also use this to get the maximal value of an array

```js
const max = movements.reduce(function (acc, current) {
  return acc > current ? acc : current;
}, movements[0]); // start with the first value, in case all are negative
console.log(max); //1000
```

</details>

#### Coding Challenge 2

<details>
<summary>
Using array transformation methods.
</summary>

> Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
> Your tasks:
>
> Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
>
> 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 _ dogAge. If the dog is > 2 years old,
>    humanAge = 16 + dogAge _ 4
> 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
> 3. Calculate the average human age of all adult dogs (you should already know
>    from other challenges how we calculate averages)
> 4. Run the function for both test datasets
>
> Test data:
>
> - Data 1: [5, 2, 4, 1, 15, 8, 3]
> - Data 2: [16, 6, 10, 5, 6, 1, 4]
>
> GOOD LUCK

</details>

</details>

### The Magic of Chaining Methods

<details>
<summary>
chaining methods together, each method uses the previous return value, so we don't introduce as much variables and we create a single pipeline.
</summary>

we chain operation together, rather than store each element on it's own and in it's own separate line. this is _fluent interface_ style. that's part of the charm of having methods return the object they were called on (or some copy of them). this is like a pipeline of operations. this is another place where we gain from having the third parameter be the array itself

```js
const totalUSEd = movements
.filter(mov=> mov>0)
.map((mov,i,arr)
{
  console.log(arr); // here we can see the entire array
  return mov*eurToUsd;
})
.reduce((acc,mov,i,arr)=> acc+mov); //we could use the array and index if we thought there was some problem!
```

we should be careful of chaining too many operations on large arrays, as it might cause performance issues. we should look at map methods and see if we can combine them together.

it's also a bad practice to chain methods that mutate the underlying array, like _.splice()_ or _.reverse()_.

#### Coding Challenge 3

<details>
<summary>
using chaining operations.
</summary>

> Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time as an arrow function, and using chaining!
>
> Test data:
>
> - Data 1: [5, 2, 4, 1, 15, 8, 3]
> - Data 2: [16, 6, 10, 5, 6, 1, 4]
>   GOOD LUCK

</details>
</details>

### The _find_ Method

<details>
<summary>
retrieving one element of an array, based on a condition (a callback function).
</summary>

```js
const negativeMovement = movements.find((mov) => mov < 0);
const account = accounts.find((ac) => ac.owner === "Jessica Davis");
```

a good way to search an array.

we wil use this to implement the Login Functionality in our project. we will use the login form in our html

```html
<form class="login">
  <input
    type="text"
    placeholder="user"
    class="login__input login__input--user"
  />
  <!-- In practice, use type="password" -->
  <input
    type="text"
    placeholder="PIN"
    maxlength="4"
    class="login__input login__input--pin"
  />
  <button class="login__btn">&rarr;</button>
</form>
```

a button on a form element actually calls the reload as a default behavior, so we need to stop it, we stop it by happening with the event parameter and calling **.preventDefault()** on it.

```js
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("login");
});
```

also, hitting the <kbd>Enter</kbd> key on a form field triggers the submit event.

if we match the username and the pin code, we start the login process.
we can also remove what we changed in the css style.
we first display the updated welcome message, and then we call all the functions from before, this time with the real account!

we will also want remove focus from the form on the and clear the input field.

```js
inputLoginUsername.value = inputLoginPin.value = "";
inputLoginUsername.blur();
inputLoginPin.blur();
```

and now we can update the display summary function to use the user interest rate.

</details>

### Implementing Transfers

<details>
<summary>
Continuing with our project, lets allow us to move money between users!
</summary>

lets look at the html

```html
<!-- OPERATION: TRANSFERS -->
<div class="operation operation--transfer">
  <h2>Transfer money</h2>
  <form class="form form--transfer">
    <input type="text" class="form__input form__input--to" />
    <input type="number" class="form__input form__input--amount" />
    <button class="form__btn form__btn--transfer">&rarr;</button>
    <label class="form__label">Transfer to</label>
    <label class="form__label">Amount</label>
  </form>
</div>
```

we again need to prevent the default behavior from firing.
we find the target account, validate that it exits, verify that the current account can send this money, for this we update our balance function to make our object contain the balance. it works because everything here id pass by reference, so our function can change the original object in memory.

we do some refactoring to stop repeating ourselves.

</details>

### Advanced Array Methods

<details>
<summary>
Some extra Array methods
</summary>

#### The _findIndex_ method

<details>
<summary>
The findIndex() method returns the index of the first matching element in our array, or -1 if no element matches.
</summary>
we will use this in our project to close an account.
we check that the details match the currentAccount. we get the index and then remove it with the *.splice()* method.
</details>

#### _some()_ and _every()_ methods

<details>
<summary>
Check if one or all elements match a condition.
</summary>

just like _.includes()_ checks for the existence of an element with the equality comparison, the _.some()_ checks with the condition. it's like using map and then include. or _.reduce()_ with the **or** operator and the default false value
the _.every()_ method checks if all elements match the the condition. like using _.reduce()_ and using the **and** operator.

we will use this in our project to request a loan, we can only request a loan if we have a deposit that's at least 10% of this loan amount. we can cheat in our project because we loans count as deposits.

we can also write callback functions as actual function rather than directly written into the method.

</details>

#### _flat()_ and _flatMap()_ methods

<details>
<summary>
ES19 methods that pull up elements from inner-nested arrays.
</summary>

the _.flat()_ method pulls up all elements up by some level, default to level 1, but we can allow the array to pull further.

```js
const deep1 = [1, 2, 3, [4, 5, [6, 7]], 8];
console.log(deep1);
console.log("level 1", deep1.flat()); //[1,2,3,4,5,[6,7],8]
console.log("level 2", deep1.flat(2)); //[1,2,3,4,5,6,7,8]

const deep2 = [[[1], [2, 3]], [[[4]]]];
console.log(deep2);
console.log("level 1", deep2.flat(1)); // [[1],[2,3],[[4]]]
console.log("level 2", deep2.flat(2)); // [1,2,3,[4]]
console.log("level 3", deep2.flat(3)); // [1,2,3,4]
```

we can use it to get all the movements from all the accounts.

```js
const allMovements = accounts.map((ac) => ac.movements);
const allMovementFlats = allMovements.flat();
const total = allMovementFlats.reduce((acc, mv) => acc + mv);
```

the _.flatMap()_ method is like using _.map()_ on an array and then flattening the results with _.flat(1)_.

```js
const total = accounts
  .flatMap((ac) => ac.movements)
  .reduce(acc, (mv) => acc + mv, 0);
```

it's supposed to be better for performance.

</details>

</details>

### Sorting Arrays

<details>
<summary>
Sorting arrays. default sort is by converting to string and lexical sorting. we can pass a comparer function. it mutates the data.
</summary>

the sorting method changes the array, it mutates it!

we can use the built-in sort method for the array objects. it uses the string value to sort by default. we can provide a callback function that takes two arguments (the two elements), the callback should return a number:
negative if the first should come before the second,
0 if the positions should remain the same (equal),
positive if the first should come after the second
t

```js
const arrayNum = [-1, -10, -20, -150, -25, 100, 90, 999, 1000];
arrayNum.sort();
console.log(arrayNum);
arrayNum.sort((a, b) => a - b); //ascending order
console.log(arrayNum);
arrayNum.sort((a, b) => b - a); //descending order
console.log(arrayNum);
```

it won't work if we have a mixed type array (numbers and string.)
let's use it in out project to sort the movements, we add a parameter to out displaying movements method

</details>

### Creating and Filling Arrays

<details>
<summary>
Create and fill arrays with code.
</summary>

we can create an array with the array constructor call. the array is empty, actually.
we can fill it with with the _.fill()_ method, the _.fill()_ method can be used on existing arrays as well.

```js
const arr = new Array(7);
console.log(arr); // 7 empty elements
arr.fill(9);
console.log(arr); //all elements are 9
```

we can use the _Array.From()_ to create an array from an object with the length property and a function that returns our value.

```js
const arr = Array.from({ length: 8 }, () => 11);
console.log(arr);
const arr2 = Array.from({ length: 7 }, (_, index) => index + 1);
console.log(arr2);
```

it was introduced in order to create arrays from iterable objects (maps, sets, strings, _document.querySelectorAll()_). this way we can call the _.map()_ method on the returning values.

```js
const movementsUI = Array.from(document.querySelectorAll(".movements__value"));
console.log(movementsUI);
```

</details>

### Which Array Method to Use

<!-- <details> -->
<summary>

</summary>

<!-- </details> -->

### a

#### Coding Challenge 4

<details>
<summary>
sorting arrays? flattening maps?
</summary>

> Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
>
> Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
>
> Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
>
> Your tasks:
>
> 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do not create a new array, simply loop over the array.
>    Formula: recommendedFood = weight \* 0.75 \* 28. (The result is in grams of food, and the weight needs to be in kg).
> 2. Find Sarah's dog and log to the console whether it's eating too much or too little.
>    Hint: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose).
> 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little('ownersEatTooLittle').
> 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
> 5. Log to the console whether there is any dog eating exactly the amount of food that is recommended (just true or false).
> 6. Log to the console whether there is any dog eating an okay amount of food (just true or false).
> 7. Create an array containing the dogs that are eating an okay amount of food (try to reuse the condition used in 6.)
> 8. Create a shallow copy of the 'dogs' array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects).
>
> Hints:
>
> - Use many different tools to solve these challenges, you can use the summary lecture to choose between them.
> - Being within a range 10% above and below the recommended portion means: current > (recommended \* 0.90) && current < (recommended \* 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.
>
> Test data:
>
> ```js
> const dogs = [
>   { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
>   { weight: 8, curFood: 200, owners: ["Matilda"] },
>   { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
>   { weight: 32, curFood: 340, owners: ["Michael"] },
> ];
> ```
>
> GOOD LUCK

</details>
