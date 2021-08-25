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
- _.filter(predicate)_ - **returns an array** containing only the elements that fit a criteria that we specify (a _predicate_ function)
- _.reduce(aggregationFunc,starting accumulator)_ - return a **single value** by applying an aggregate function on all elements.

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

<!-- <details> -->
<summary>

</summary>

<!-- </details> -->
