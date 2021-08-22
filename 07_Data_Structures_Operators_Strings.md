<!-- ## Data Structures, Modern Operators and Strings -->

<summary>
</summary>
Object destructuring, built-in data structures (objects, maps,array), modern operators of ES6 javascript, string manipulation techniques.

### Array Destructuring

<details>
<summary>
Extracting multiple elements from an array into variables.
</summary>
the focus of this part of the course will be on a restaurant-like app, this will be done without a visual user interface.

Destructuring is a way to retrieve elements from an objects. in classic javascript we must get each element by itself, but now we can use a special syntax to decompose/de-structure the array into it's parts.

```js
const arr = [1, 2, 3];
//old style
const a = arr[0];
const b = arr[1];
const c = arr[2];
//new style
const [d, e, f] = arr;
```

we can the limit to starting elements by **ONLY** providing names for the elements we care about, or skip elements by leaving the position empty.

```js
const [first, second] = [1, 2, 3, 4, 5]; // take the first two
const [, p, , p1] = [1, 2, 3, 4, 5]; //skip elements by position
```

we can use array destructuring to swap the contents of variables by reordering them inside the array destructuring.

```js
const arr = [1, 2, 3];
let [a1, a2, a3] = arr;
[a2, a3, a1] = [a1, a2, a3];
console.log(a1, a2, a3);
```

this also allows us to return multiple values from a function (an array), and immediately turn them into separate variables.

```js
function power123(n) {
  return n, n ** 2, n ** 3;
}
const [num, squared, cubed] = power123(2);
const arr = [1, 2, 3, 4];
const [f1, f2] = arr.order(2, 0);
```

this can also work for nested arrays destructuring. we simply wrap the positions in square brackets.

```js
const nested = [[2], 3, 4, [5, 6, 10]]; //nested array
const [[n1], n2, , [n3, , n4]] = nested;
console.log(n1, n2, n3, n4); // 2,3,5,10
```

we can also have default values for destructuring, if we accidentals tried to take elements from index that don't exists. this ensures a value (rather than having it be _'undefined'_)

```js
const [x1, x2, x3] = [8, 9];
console.log(x1, x2, x3); //8,9,undefined
const [x4 = 1, x5 = 1, x6 = 1] = [8, 9];
console.log(x4, x5, x6); //8,9,1
```

</details>

### Objects Destructuring

<details>
<summary>
we can use objects destructuring to retrieve multiple values from an object, with default values, drill down of nested elements. and we can use this form to de-structure objects in function decelerations, so we don't need to care about the order of argument!
</summary>
we can also de-structure objects,this time with the *curly braces*. this time we specify the name of the members, and the order doesn't matter, and there's no reason to skip positions. this is really useful for api calls!

```js
const o = { a: 1, b: 2, c: "12312", d: [10, 11, 12] };
const { d, a } = o;
console.log(a, d);
```

we can use **different names** for the variables,

```js
const o = { a: 1, b: 2, c: "12312", d: [10, 11, 12] };
const { d: d1, a: a1 } = o;
console.log(a1, d1);
```

and like with array destructuring, we can drill down to get **nested elements** with the braces.

```js
const o = { a: 1, b: 2, c: [10, 11, 12], d: { fName: "jon" }, e: { ll: 11 } };
const {
  a: a11,
  c: [c1, c2], // destructuring nested array
  d: { fName: firstName }, // destructuring nested object, and taking an element from it,
  e: { ll },
} = o;
console.log(a11, firstName, c1, c2, ll);
```

and we can of course have **default values**

```js
const person = {
  firstName: "john",
  lastName: "smith",
};
const { firstName, middleName = "no middle name", lastName, age } = person;
console.log(firstName, middleName, lastName, age); //middleName gets value, age is undefined
```

**mutating variables while destructuring**. if the variables were already declared.
we can't drop the let/const completely, because js thinks lines that start with curly braces are declaring a code block. so instead, we we wrap the line in _normal parentheses_

```js
let num1 = 11;
let num2 = 999;
//tons of code...
const obj1 = { num1: 23, num2: 55, num3: 999 };
({ num1, num2 } = obj1);
console.log(num1, num2);
```

this destructing trick is useful for passing multiple values into a function, without caring about the positions. we can do the destructing inside the function parameter definitions! this means we can take any object with those members. and if the object doesn't have the members, we can give default values!

```js
function power2(obj) {
  const { base, exp } = obj; //normal destructing
  return base ** exp;
}

function power3({ base, exp }) {
  //destructing inside the function definitions!
  return base ** exp;
}

function power4({ base, exp = 2 }) {
  //destructing inside the function definitions with default values
  return base ** exp;
}

const p1 = { base: 2, exp: 9, otherName: "jogs", a: [1, 2, 3] };
console.log(p1, power2(p1), power3(p1));
const p2 = {
  a: "my name is!",
  d: ["some", "different", "structure"],
  base: 3,
  exp: 5,
};
console.log(p2, power2(p2), power3(p2));
let base = 4;
let exp = 2;

const pack = { base: 9 };
console.log(power3({ base, exp })); //packing into object for later
console.log(power4(pack)); //default exponents of 2
```

</details>

### The Spread Operator (...)

<details>
<summary>
Expands an array (or other iterables) into it's components.
</summary>
The spread operator allows us to take all elements from an array.
we can use to take all elements from an array, like when creating a new array from an old array, or if we want pass multiple elements from the array separately to a function, rather than an array.

```js
const arr1 = [1, 2, 3];
const arr2 = [arr1[0], arr1[1], arr1[2], 4, 5]; //old way
const arr3 = [...arr1, 4, 5]; //spread operator
console.log(arr3); //pass as an array
console.log(...arr3); //pass as elements
```

it doesn't create new variables (unlike array destructuring), we can only use it in cases where we would write **elements separated with commas**.
two important uses is to create shallow copies of arrays and to join two arrays (or more) together.

```js
const arr4 = [[1, 2, 3]];
const shallowCopyArr4 = [...arr4];
console.log(arr4, shallowCopyArr4);
arr4[0].unshift(5);
console.log(arr4, shallowCopyArr4);
```

to add of them together.

```js
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);
```

actually, the spread operator works on any iterable object, such as

- arrays
- strings
- maps
- sets

but **objects are not iterables**

```js
const str = "hello";
console.log(...str); //each character
const str2 = [...str, "a", "b"]; //build new array
```

a function that takes multiple arguments, and we pass them with the spread operator.

```js
const orderPasta = function (ing1, ing2, ing3) {
  console.log(`you ordered a pasta from ${ing1},${ing2},${ing3}`);
};
orderPasta("a", "b", "c");
let ingredients = ["one", "two", "three"];
orderPasta(...ingredients);
```

**in ES18 (2018 version), the spread even works on objects!**
since es18, we can use the spread operator on objects as well, this allows us easier object 'copy' than Object.assign();

```js
const oldNwRestaurant = Object.assign(restaurant, { founder: "joe" });
const newRestaurant = { ...restaurant, founder: "joe" };
newRestaurant.name = "Roma";
console.log(restaurant, oldNwRestaurant, newRestaurant);
```

</details>

### The Rest Pattern and Parameters

<details>
<summary>
collects the unused elements (the rest of them) into a new array in a destructuring assignment statement;
</summary>
The rest pattern looks like the spread operator, but does the opposite. rather than expand an array, the rest operator packs elements into an array. spread goes on the right side of the expression, and rest syntax belongs to the left hand side, where it goes with the destructuring syntax.

```js
const arr7 = [1, 2, ...[3, 4]]; //spread.
const [a7, b7, ...others7] = [1, 2, 3, 4, 5]; //rest pattern
console.log(a7, b7, others7); // 1,2,[3,4,5]
```

we can use both of them together. we can skip elements before the rest operator, but **it must be the last operator**, so we can't skip afterwards, and there can only be one rest statement.

```js
const arr8 = [1, 2, 3];
const arr9 = ["a", "b", "c"];
const [a8, b8, , ...numbers8] = [...arr8, ...arr9];
console.log(a8, b8, numbers8);
```

we can do this with objects, and that means that unspecified parts of the object are collected into a new objects. we cannot skip elements here.

```js
const obj3 = { a: 1, b: 4, c: 5, d: 7 };
const { a: a9, ...obj4 } = obj3;
console.log(obj4);
```

the rest pattern is used in functions. this is called _rest parameters_. like variadic arguments, and now we can do folding and unfolding operations like cpp.

```js
const add2 = function (...numbers) {
  console.log("add2", numbers);
};
add2();
add2(1);
add2(2, 3);
add2(1, 3, 4, 6);
add2(...[1, 2, 3, 4]); //spread and rest
```

we can use the rest operator to have optional parameters of the same kind,or even do a recursion with rest and spread.

```js
const optionalParams = function (first, ...others) {
  console.log(`first is ${first}, others are ${others}`);
};
optionalParams(1, 2, 3);
const restAndSpread = function (f1, ...fs) {
  console.log(`first is ${f1}, with ${fs.Length} elements following`);
  if (fs.Length > 0) restAndSpread(...fs); //spreading the others
};
```

</details>

### Short Circuiting operators (&& and ||)

<details>
<summary>
when the evaluation can be determined without evaluating all the arguments, we can simply skip their evaluation. this is happens when a value is truthy in an *or operator* or a falsy in an *and operator*.
</summary>
logical operators can be used on any data type, can return any data type, and have something called **short circuiting**.

for the _or operator_, short circuiting means that if the a value is true or truthy, it returns that value without checking the other values. if we have only one element remaining, it's returned even if it's a falsy value. the first truthy value is returned, or the last value.
for the _and operator_, short circuiting means that if the a value is false or falsy, the rest of the operation won't be evaluated. the first falsy value is returned, or the last value if all are truths.

we need to be carful when using 0 as a falsy value, sometimes zero is the actual result, and not the same as undefined or null.

```js
console.log(3 || "jonas"); //3
console.log(0 || "jonas" || 4); //jonas
console.log(true || 0); //true
console.log(undefined || null); //null
console.log(1 && 2); //2
console.log(null && 2); //null
console.log(true && undefined && 2); //undefined
console.log(true && undefined && 2); //undefined
```

this behavior allows us to skip checking for existence

```js
const obj = { a: 1, foo: function () {}, bar: function () {} };
const obj2 = { a: 1, foo: function () {} };
if (ob2.bar) {
  obj2.bar(); //old style
}
obj2.bar && obj2.bar(); //short circuit style
```

</details>

### The Nullish Coalescing Operator (_??_)

<details>
<summary>
Checking for Nullish values rather than falsy values
</summary>
earlier, we had a problem of using zero as boolean value, if we wanted to check for an existence of something, the value zero was the same as it being undefined. the nullish coalescing operator from ES2020 fixes this issue. the *??* coalescing operator works with **nullish values**, not falsy values. so only null and undefined values are 'ignored' and cause short circuiting, while zero and empty strings are accepted as valid strings.

```js
const a = { vi: 4 };
const b = { v: 0 };
const c = { v: 5 };
let firstExisting = a.v || b.v || c.v; //5, but b.v is a real value!
console.log("firstExisting", firstExisting);
firstExisting = undefined ?? null ?? a.v ?? b.v ?? c.v; //0,
console.log("firstExisting", firstExisting);
```

#### Coding Challenge 1

<details>
<summary>
Get data from an object with destructuring, spread and rest operators, 
</summary>

> We're building a football betting app (soccer for my American friends)!
> suppose we get data from a web service about a certain game ('game' variable on next page). In this challenge we're gonna work with that data.
>
> Your tasks:
>
> 1. Create one player array for each team (variables 'players1' and 'players2')
> 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the
>    goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
>    field players
> 3. Create an array 'allPlayers' containing all players of both teams (22
>    players)
> 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'.
> 5. Based on the game.odds object, create one variable for each odd (called
>    'team1', 'draw' and 'team2')
> 6. Write a function ('printGoals') that receives an arbitrary number of player
>    names (not an array) and prints each of them to the console, along with the
>    number of goals that were scored in total (number of player names passed in)
> 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, without using an if/else statement or the ternary operator
>    test data:
>
> ```js
> const game = {
>   team1: "Bayern Munich",
>   team2: "Borrussia Dortmund",
>   players: [
>     [
>       "Neuer",
>       "Pavard",
>       "Martinez",
>       "Alaba",
>       "Davies",
>       "Kimmich",
>       "Goretzka",
>       "Coman",
>       "Muller",
>       "Gnarby",
>       "Lewandowski",
>     ],
>     [
>       "Burki",
>       "Schulz",
>       "Hummels",
>       "Akanji",
>       "Hakimi",
>       "Weigl",
>       "Witsel",
>       "Hazard",
>       "Brandt",
>       "Sancho",
>       "Gotze",
>     ],
>   ],
>   score: "4:0",
>   scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
>   date: "Nov 9th, 2037",
>   odds: {
>     team1: 1.33,
>     x: 3.25,
>     team2: 6.5,
>   },
> };
> ```

</details>
</details>

### Looping Arrays: The _for-of_ Loop

<details>
<summary>
a more modern way to loop over values of an array.
</summary>
instead of using a loop with a counter, we can use a different syntax to loop over elements in the array, without holding the counter.

```js
const arr = [1, 2, 3, 4];
for (let item of arr) {
  console.log(item);
}
```

if we still want the index we loop over the array.entries() property with array _destructuring_.

```js
const arr_e = [1, 2, 3];
for (let item of arr_e.entries()) {
  console.log(item[0], item[1]);
}
for (let [index, item] of arr_e.entries()) {
  console.log(index, item);
}
```

</details>

### Enchanted Object Literals

<details>
<summary>
Ways to reduce code clutter by not repeating property names when using reference values to other objects, removing boiler-plate code from member functions,and computing property names from other objects or from template literals.
</summary>
Another es6 features.

object literals are objects which we create by writing them to the code directly, not arrays, not prototypes.

if we want to have an objects as part of the object, and without repeating the name. we can simply write the outer object. instead of writing the function _name_,_double colons_ and then _function()_,we can remove some of the typing and write the name of the function, the parameters (or empty parentheses) and the body, without the double colons or the function keyword.

```js
const obj2 = { k: 2, v: 2 };
const obj3 = { zk: 2, zv: 2 };
const o = {
  a: 1,
  b: 3,
  obj2: obj2, //classic style, reference to obj2 stored in property obj2
  obj3, // enchanted object literal! no need to specify the name again!
  foo: function (n1, n2) {}, //classic style
  bar(n1, n2) {}, //enchanted object literal! declare immediately function bar,
};
```

a third enchantment for object literals is computing the property names. we can either use an existing variable value or use a template literal to generate it for us.

```js

const openingHours = {
  sun: {},
  mon: {},
  tue: {},
  wed: {},
  thr: {},
  fri: {},
  sat: {},
}; //old way, repeat each property name.

const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const openingHoursBetter = {
  [weekdays[0]]: {},
  [weekdays[1]]: {},
  [weekdays[2]]: {},
  [weekdays[3]]: {},
  [weekdays[4]]: {},
  [weekdays[5]]: {},
  [weekdays[6]]: {},
}; // property names from an array
const openingHoursBetter = {
  [`${firstDayOftheWeek()}`: {}, //a function
  [`day-${2+4}`]: {}, // string literal
  [`day-${random()-${random()}}`]: {}, // adding string together!
}; // property names from computing!


const a = "firstDay";
const o = {
    [a]: "this is the first",

};
console.log(o.firstDay);
```

</details>

### Optional Chaining the _.?_ Operator

<details>
<summary>
Stopping access into a object property if the property doesn't exist.
</summary>
another modern feature of javascript. if we aren't sure the property exists, we can stop trying to get into it, and we'll return the nonexistent object (undefined, null) instead of an error.

```js
const o = { a: { b: { c: 5 } } };
console.log(o.a.b.c); // cool. this works
//console.log(o.a.bb.c); // error
console.log(o.a.bb?.c); // undefined, but not error, the optional chaining stops execution
console.log(o.a.bb?.c ?? "no such property"); // the optional chaining stops execution and the nullish coalescing operator tells us to use to use the other value
console.log(o.a.b?.c ?? "no such property"); // works find
```

this also works on methods. we can check an method exists before calling it.

```js
const a = {
  foo(n) {
    console.log(n);
  },
};
a.foo?.(1); // foo exits
a.bar?.(1); // bar doesn't exist
```

it works on arrays, we can use it to after accessing an element with the square brackets.

</details>

### Looping Objects: Object _Keys_, _Values_, _Entries_

<details>
<summary>
Methods which can give us data about object properties. the names, the values and both together.
</summary>

we can loop over objects, even if they aren't iterable, but we use something else. the function _Object.keys(o)_ is a function that returns the keys (the property names of the object). _Object.values(o)_ returns the values, and _Object.entries(o)_ returns an array containing arrays of the name and the value. which we can de-structure with the array destructuring syntax.

```js
const o = { a: 2, b: 3, c: [1, 2] };
for (const e of Object.keys(o)) {
  console.log(e, o[e]);
}

for (const v of Object.values(o)) {
  console.log(v);
}
for (const e of Object.entries(o)) {
  console.log(e[0], e[1]);
}
```

in arrays, we could call the method on the array itself, with object literal, we need to call the methods from the Object global object and pass the current object as as the argument.

#### Coding Challenge 2

<details>
<summary>
Using advanced loops, enchanted object literals, and checking if properties exists
</summary>

> Let's continue with our football betting app! Keep using the 'game' variable from before.
>
> Your tasks:
>
> 1. Loop over the game.scored array and print each player name to the console,
>    along with the goal number (Example: "Goal 1: Lewandowski").
> 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
> 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
>
> Odd of victory Bayern Munich: 1.33
> Odd of draw: 3.25
> Odd of victory Borrussia Dortmund: 6.5
>
> Get the team names directly from the game object, don't hard code them
> (except for "draw"). Hint: Note how the odds and the game objects have the
> same property names
>
> Bonus:
> Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
>
> ```js
> const scorers = {
>   Gnarby: 1,
>   Hummels: 1,
>   Lewandowski: 2,
> };
> ```
>
> GOOD LUCK

</details>

</details>

### Sets and Maps

<details>
<summary>
The Sets and maps built-in types.A set is collections of unique values and a map is a collection of pairs of unique keys and values(not necessarily unique).
</summary>
in the past there were only primitives, objects and arrays, not other data structures. but ES6 introduce sets and maps as built-in types.

#### Sets

<details>
<summary>
Collection of unique values.
</summary>

A [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) is a collection of unique values, which cannot contain duplicate values.

to create a set, we pass the constructor an iterable (usually an array). the elements of the created set are unique, and **the order doesn't matter**. a string is also an iterable, so we can pass a string into a set to get the unique characters.

```js
const ordersSet = new Set([
  "pasta",
  "pizza",
  "risotto",
  "pasta",
  "pizza",
  "pasta",
]);
console.log(ordersSet, ordersSet.size);
console.log(new Set("hello world!"));
```

set operations

- _.size_ - the number of elements (like array.Length)
- _has()_ - checks if the element exists in the set (like .includes)
- _add()_ - add element to set
- _delete()_ - remove element from set
- _clear()_ - delete all elements from set.

a set doesn't support index operations(the square brackets). there is no need to get values out of the set,we either check the existence or iterate over the entire set. because the set is an _iterable_, we can use the _for of loop_ to go over it.

```js
for (const order of ordersSet) {
  console.log(order);
}
```

one way to use sets is as a way to remove duplicate values from an array (if we really don't care about the order.)

```js
const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];
const uniqueStaffSet = new Set(staff);
const uniqueArray = [...uniqueStaffSet]; //spread operator
```

arrays are more versatile than sets. but sets have their uses.

</details>

#### Maps

<details>
<summary>
Collection of key-value pair, where the key must be unique, but can be of any type.
</summary>

[Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/map) are more useful than sets,a data structures of key-value pairs, unlike objects, whose key-value pairs must have string keys, maps can have any type of keys, strings, numbers, objects or any other type.
the map is created with _new Map()_ constructor. then we use _
set()_ to insert key value pairs, which returns the map, allowing for fluent operations. we retrieve values by calling _.get()_ with the key value.

```js
const rest = new Map();
rest.set("keyName", "value");
rest.set(1, [1, 2, 3]); //key is number, value is array
rest
  .set(2, 44)
  .set(3, { a: "bb" }) // fluent operation
  .set({ a: "s" },new Set([1, 2, 3, 2, 3]) // legal code, but practically useless,because the key object is unique and we can't reference it again.
  .set(true, "we are open!")
  .set(false, "we are closed!")
  .set("open", 11)
  .set("close", 23);

console.log(rest.get(true));
console.log(rest.get(2));
const time = 21;
console.log(rest.get(rest.get('open') >time && rest.get('close')>time));
```

map operations

- _.size_ - number of elements in map
- _.set(key,value)_ - add key-value pair, fluent interface.
- _.get(key)_ - retrieve value associated with key
- _.has(key)_ - check if key exists
- _.delete(key)_ - remove key-value pair
- _.clear()_ - remove all elements from map.

a note for using objects and arrays as keys. it's not enough for them to have the same values, they must be the same in memory (hold the same reference).

```js
const m = new Map();
m.set([1, 2], "hello");
console.log(m.has([1, 2])); // false
const arr = [1, 2, 3];
m.set(arr, "world");
console.log(m.has(arr), m.get(arr)); // exits
```

we can use the map to store elements from the DOM.

##### Maps Iteration

there is another way of populating a map. we pass an array of arrays, each with two elements, representing the key value pair.

```js
const question = new Map([
  ["question", "what is best?"],
  [1, "brown bear"],
  [2, "black bear"],
  [3, "bug bear"],
  ["answer", 3],
  [true, "you're right!"],
  [false, "sorry,mistake!"],
]);
console.log(map.get("question"));
```

this structure of array containing arrays of key-value pair is what we get from calling _Object.entries(obj)_, so we can get a map from an object entries, with the properties names as keys.

```js
const obj = { a: 1, b: 3, c: "ss" };
const objectProperties = new Map(Object.entries(obj));
console.log(objectProperties.has("a"));
```

because maps are also iterables, we can use the _for of loop_

```js
const question = new Map([
  ["question", "what is best?"],
  [1, "brown bear"],
  [2, "black bear"],
  [3, "bug bear"],
  ["answer", 3],
  [true, "you're right!"],
  [false, "sorry,mistake!"],
]);
for (const [key, value] of question) {
  if (typeof key === "number") {
    //strict equality
    console.log(`key is ${key}, value is ${value}`);
  }
}
const ans = number(prompt("your answer?"));
console.log(m.get(ans === m.get("answer"))); //equality evaluates to true or false.
```

to convert a map into an array we can use the spread operator.

```js
const arr = [...m];
```

we can call _.entries()_, _.values()_, _.keys()_ on maps, like with arrays, but we get a map iterator object.

</details>

#### Which Data Structure to use?

<details>
<summary>
Pros and Cons of each data structure: Array, Objects, Sets, Maps.
</summary>

> sources of data
>
> - **From the program itself:** data written directly in the source code(e.g. status messages)
> - **From the UI:** data input from the user or data written in DOM (e.g. task in todo app)
> - **From external sources:** data fetched, like web API (e.g. recipe objects)

data from web api usually comes as a json format. We store the data somewhere

> **TODO: plant uml flow chart**
> data? -> collection of data -> data structure
>
> - Simple List
>   - arrays or sets
> - Key-Value pairs
>   - objects or maps

besides maps and sets, there also exist **WeakMap** and **WeakSet** as built-in data structures. and others that are used, but not built-in.

Arrays are preferred to sets when

- order matters.
- we want to manipulate data.
- duplicates are ok.

Sets are preferred to arrays when

- we need unique values only, without duplications.
- we want high performance.
- we want to remove duplicates from arrays.

Objects over maps

- the "traditional" key-value data structure
- easier to access with the _[]_ and _._ notations.
- when you need to include functions (methods), has the _this_ keyword.
- when working with json (can later convert to map).

Maps over objects

- better performance.
- keys can have any data type.
- easy to iterate.
- easy to compute size.
- when all we want is storage.

</details>

#### Coding Challenge 3

<details>
<summary>
Using maps and sets.
</summary>

> Let's continue with our football betting app! This time, we have a map called
> 'gameEvents' (see below) with a log of the events that happened during the
> game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).
> Your tasks:
>
> 1. Create an array 'events' of the different game events that happened (no
>    duplicates)
> 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
> 3. Compute and log the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
> 4. Loop over 'gameEvents' and log each element to the console, marking
>    whether it's in the first half or second half (after 45 min) of the game, like this:
>    [FIRST HALF] 17: ⚽ GOAL
>    GOOD LUCK

</details>
</details>

### Working With Strings

<details>
<summary>
Working with strings. methods, substrings, basic regex
</summary>

the [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) object represents textual values.

```js
const airline = "TAP Air Portugal";
const plane = "A320";
console.log(plane[0]); //indexing- 'A'
console.log(Number(plant[1])); // 3
console.log("one two three!".length); // length of string literal
```

string operations and method - incomplete list

- _.length_ - number of characters
- _[index]_ - character at index
- _.indexOf(string)_ - index of first appearance of character/string in string, -1 if not existing
- _.lastIndexOf(string)_ - index of last appearance of character/string in string, -1 if not existing
- _.slice(start_index,last_index)_ - get substring, use start_index and optional last_index (exclusive). the length is end minus start index. we can use negative values to start from the ending
- _.toLowerCase()_ - return a string with all letters as lower case
- _.toUpperCase()_ - return a string with all letters as upper case
- _.trim()_ - remove leading white space, trailing white space, and any consecutive white space characters
- _.trimStart()_ - ES19 - only remove leading white spaces
- _.trimEnd()_ - ES19 - only remove trailing white spaces
- _.replace(what, with)_ - replace first appearance of a character/word with the other one.
- _.includes(substring)_ - does the string include the substring
- _.startsWith(substring)_ - does the string start with the substring
- _.endsWith(substring)_ - does the string end with the substring
- _.split(delimiter)_ - split string into array based on the delimiter substring
- _.join(delimiter)_ - join an array into one string, with the delimiter between each element
- _.padStart(final_length, fillCharacter)_ - adds the fillCharacter from to the start of the string until is the required length
- _.padEnd(final_length, fillCharacter)_ - adds the fillCharacter from to the end of the string until is the required length
- _.repeat(times)_ - create a string that is same string repeated

don't forget the +1 when slicing from matched space in _.indexOf(' ')_.

even though a string is a primitive, javascript does automatic **boxing** into a **String Object**, which has methods. all string object method return string objects.

we can change the case of a string with _.toLowerCase()_ and _.toUpperCase()_, and remove white space characters with _.trim()_.we can replace both single charmers and complete words with _.replace()_

```js
const priceGB = "288,97 €"; //hold alt + 0128
const priceUs = priceGB.replace("€", "$").replace(",", ".");
```

we can also use regular expressions to replace all, in this case, we drop the quotes from door, and add the /g global flag

```js
const announcement =
  "all passengers come to boarding door 23, boarding door 23!";
console.log(announcement.replace("door", "gate")); // only the first is replaced
console.log(announcement.replace(/door/g, "gate")); // using regular expression.
```

in most string operations, we first use the _.toLower()_ method to convert all letters to lower case and then we can safely compare them.
we can use destructuring together with splitting.

```js
const [firstName, lastName] = "john smith".split(" ");
const fullName = ["Mr,", firstName, lastName.toUpperCase()].join(" ");
```

padding adds characters until the string is some length long. we can pad from the start or the end. we can repeat the same function again and again

#### Coding Challenge 4

<details>
<summary>
converting snake_cast to camelCase,getting a data from document, splitting and joining with different delimiters, padding all of them to some length
</summary>

> Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.
> The input will come from a textarea inserted into the DOM (see code below to
> insert the elements), and conversion will happen when the button is pressed.
> Test data (pasted to textarea, including spaces):
>
> - underscore_case
> - first_name
> - Some_Variable
> - calculate_AGE
> - delayed_departure
>
> Should produce this output (5 separate console.log outputs):
>
> - underscoreCase ✅
> - firstName ✅✅
> - someVariable ✅✅✅
> - calculateAge ✅✅✅✅
> - delayedDeparture ✅✅✅✅✅
>
> Hints:
>
> - Remember which character defines a new line in the textarea
> - The solution only needs to work for a variable made out of 2 words, like a_b
> - Start without worrying about the ✅. Tackle that only after you have the variable name conversion working,
>
> This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!
>
> Afterwards, test with your own test data!
>
> GOOD LUCK
>
> ```js
> document.body.append(document.createElement("textarea"));
> document.body.append(document.createElement("button"));
> ```

</details>

#### String Practice

<details>
<summary>
Another practice for string manipulations. Splitting, joining, checking manipulating case,replacing, etc..
we can also use destructuring.
</summary>

> transform the big string into something readable
>
> ```js
> const flights =
>   "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";
> ```

</details>

</details>
