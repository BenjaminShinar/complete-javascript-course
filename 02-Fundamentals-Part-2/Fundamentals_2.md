## JavaScript Fundamentals - Part 2

<!-- <details> -->
<summary>
More introduction about javascript: functions, objects, arrays, loops.
</summary>

### Javascript Strict Mode

<details>
<summary>
Strict mode makes it easier to write secure javascript code.
</summary>

Strict mode is a way to **opt in** to a [restricted variant of javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) that forces us to write better code.

we activate strict mode by adding *'use strict';* (the quotes are important) at the top of our file. we can also do this for separate functions.
``` js
'use strict';
```
strict mode prohibits us from several things, and exposes warnings. for example, it prohibits us from using variables we didn't define. so if we misspell the name of a variable, we will see an exception.
``` js
'use strict';
let hasDriversLicence = false;
const passTest = true;

if (passTest)
{
    hasDriverLicence = true; // wrong name
}
if (hasDriversLicence)
{
    console.log("I can drive!");
}
```
Strict mode also prohibits us from using a some keywords that might be used in future version of javascript. this means we can't declare a variable named 'interface' or 'private', because they might become reserved keywords.

</details>

### Functions

<details>
<summary>
Reusable pieces of code.
</summary>

We use the *function* keyword to declare a function, then it's name, the arguments and the body. we can later use the function (calling, running, invoking are terms that are used interchangeably). A function can take arguments as parameters, and return data as a return value. in Javascript we can pass arguments even if they are unused. if we take the return value of a function without a return statement, we take an *undefined* value.

``` js
function foo()
{
    //function body
    //no return value
}
function bar(a,b){
    //function body
    console.log(a,b);
    return `${a} + ${b} = ${a+b}`;
}
foo(); //calling a function

let plusFormula = bar(20,30);
console.log(plusFormula);
plusFormula = bar(11,60);
console.log(plusFormula);
foo(22); //the argument is ignored
const res =foo(); //no return value;
console.log(res); //undefined
```

function are important for the **DRY (don't repeat yourself)** principle.

#### Function Deceleration vs Expressions

<details>
<summary>
Different ways to declare functions.
</summary>

The classic way to declare a function is by using the *function* keyword and give it a name. but there is also the function expression, which must be stored in a variable. this is a function expression, the value of the function expression is a function. functions are values (objects), this is a big part of OOP;   
with function declarations, we can call the functions before we define them, but with function expressions, we cannot do this.

``` js
//function declaration;
function calcAge1(birthYear)
{
    const thisYear=  2037;
    return thisYear - birthYear;
}
const age1 = calcAge1(1987);

//function expression
const calcAge2 = function(birthYear)
{
    const thisYear=  2037;
    return thisYear - birthYear; 
}
const age2 = calcAge2(1987);

```

The arrow function is a compact way to write a function expression, we can sometimes drop the curly braces, the parentheses for parameters and the return statement. we can omit the return statement if it's a one-liner. if we want more than one parameter, we need the parentheses again.

``` js
//arrow function
const calcAge3 = birthYear => 2037 -birthYear; 
const age3 = calcAge3(1997);
const yearUntilRetirement =  birthYear =>
{
    const age =calcAge3(birthYear);
    const retirement =65 -age;
    return retirement;
};
const retire = yearUntilRetirement(2001);
const calcAgeDifference = (birthYear1,birthYear2) =>
{
    return (calcAge3(birthYear1)- calcAge3(birthYear2));
};

```
one difference of arrow functions is that they don't get the *this* parameter. but that's for later.

</details>

#### Function calling Other Functions

<details>
<summary>
Function can call other functions
</summary>
Nothing out of the ordinary. captures and clojure will be covered later.

``` js
function bar(n)
{
    return f*4;
}
function foo(a,b)
{
    console.log(a,b,a+b);
    const c = bar(a) + bar(c);
    return (`${a}+ ${b} = ${c} pieces`);
}
```
</details>

#### Coding Challenge 1

<details>
<summary>
Calculate averages with functions.
</summary>

> Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
A team only wins if it has at least double the average score of the other team. Otherwise, no team wins!
> Your tasks:
> 1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
> 2. Use the function to calculate the average for both teams
> 3. Create a function 'checkWinner' that takes the average score of each team as parameters ('avgDolphins' and 'avgKoalas'), and then logs the winner to the console, together with the victory points, according to the rule above. 
> Example: "Koalas win (30 vs. 13)"
> 4. Use the 'checkWinner' function to determine the winner for both Data > 1 and Data 2
> 5. Ignore draws this time
>
> Test data:
> * Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
> * Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27
> 
> Hints:
> * To calculate average of 3 values, add them all together and divide by 3
> * To check if number A is at least double number B, check for A >= 2 * B. 
> Apply this to the team's average scores * 
> GOOD LUCK
</details>
</details>

### Arrays

<details>
<summary>
A Container That stores variables.
</summary>

the first data structure, [the array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). a container, or a bundle of variables. we can initialize the array with square brackets or with the *new Array()* syntax. arrays are zero based. even though we declare the array as const, we can still mutate it and change elements inside it. we cannot assign something else to the variable. unlike other languages, in javascript, arrays can hold different types of elements.

``` js
const friends = ['Michael','Steven','Peter'];
console.log(friends);
const years = new Array(1991,19984,2008,2020); // using the array syntax
const len = friends.length;
const lastFriend = friends[len -1]; // zero based arrays.
friends[2] = "James"; // changing the element in index 2
//friends = ['11'];  error! reassignment of the const variable.
let arr = [friends,years,true]; // different types of elements in the same array
```

#### Basic Arrays Method

<details>
<summary>
Built-in operations on arrays.
</summary>

methods are functions that are attached to a specific object, like an array. here are a few of the array methods:
* push(element) adds an element to the end of the array, returns the length of the updated array.
* unshift(element) adds an element to the start of the array, returns the length of the updated array.
* pop() removes an element from the end of the array, returns the removed element;
* shift() removes an element from the start of the array, returns the removed element;
* indexOf(element) returns the index of the element in the array, if the element isn't inside, returns -1.
* includes(element) returns a boolean value indicating if the elements exists inside the array, uses strict equality. an *ES6* method.

there are also properties, which are different than methods, they don't change the object, and don't require parentheses.
* length returns the number of elements in the array. 
</details>


#### Coding Challenge 2

<details>
<summary>
Using arrays to store values.
</summary>

> Steven is still building his tip calculator, using the same rules as before: Tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.
>
> Your tasks:
> 1. Write a function 'calcTip' that takes any bill value as an input and returns the corresponding tip, calculated based on the rules above (you can check out the code from first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100.
> 2. And now let's use arrays! So create an array 'bills' containing the test data below
> 3. Create an array 'tips' containing the tip value for each bill, calculated from the function you created before
> 4. Bonus: Create an array 'total' containing the total values, so the bill + tip
>
> Test data: 125, 555 and 44
>
> Hint: Remember that an array needs a value in each position, and that value can actually be the returned value of a function! So you can just call a function as array values (so don't store the tip values in separate variables first, but right in the new array) 
> GOOD LUCK
</details>
</details>

### Objects

<details>
<summary>
A value-key pairs container.
</summary>

[Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) are a type of a container that supports access by a named key. we define objects with curly braces, the name of the property (the key), double-collins (*:*) and the value. there several ways to create objects, and the simplest is the *object literal syntax*. the order of the properties doesn't matter, because we can access by their name. we can access either with the square brackets notation or the dot notation. in the dot notation we must use the complete literal name, but it doesn't require quotes. the brackets notation must be surrounded with quotes, but it can be built from an expression.

``` js
const Jonas = 
{
    firstName: "Jonas",
    LastName: "Smith",
    adult: true,
    age: 21,
    friends: ['Annie','Dan']
};
const nameSuffix = "Name";
console.log(Jonas['firstName'], Jonas.age, Jonas["first"+nameSuffix]);
```
if we try to access a property that doesn't exists with the square brackets, we get an 'undefined' value. remember that undefined values are falsy, so we can check that!
```js
const k ="FirstName"; // not the correct name!

if(const v = Jonas[k];)
{
    console.log(v);
}else
{
    console.log(`key ${k} doesn't exist!`);
}
console.log(`${Jonas.firstName} has ${Jonas.friends.length} friends, and his best friend is called ${Jonas.friends[0]}`);
``` 
the dot and the [] are operators ad the have precedence, which is nearly the highest, and left to right associativity.

#### Object Methods

<details>
<summary>
Objects can hold functions as members!
</summary>

**this section doesn't include builtin object methods**

Objects can hold not only primitive values, but also arrays and other objects, they can even hold functions!
```js
const dan = {
    firstName: "Dan",
    LastName: "Smith",
    birthYear: 1991,
    friends: ['Annie','Dan','Peter'],
    hasDriverLicence: true,
    job: "Teacher",
    calcAge: function(birthYear)
    {
        return 2037-birthYear;
    },
    calcAgeBetter: function () { return 2050 - this.birthYear; } 
};
console.log(dan.calcAge());
console.log(dan.calcAgeBetter());
dan.items = ["hammer","nail"]; // even though it's a const objects, we can still mutate it!
//dan = "hello"; // but we can't do this!
```

the *this* keyword refers to the object who is calling the object, now the difference between normal and arrow functions comes into play. additionally, we can create new properties from inside a method. we can also create methods from outside the object.  
arrays are just a special kind of objects, in the future we will learn how to create reusable objects (classes / prototypes).
</details>

#### Coding Challenge 3

<details>
<summary>
Calculating BMI from objects
</summary>

> Let's go back to Mark and John comparing their BMI! This time, let's use objects to implement the calculations! Remember: BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter)
> Your tasks:
> 1. For each of them, create an object with properties for their full name, mass, and 
height (Mark Miller and John Smith)
> 2. Create a 'calcBMI' method on each object to calculate the BMI (the same method on both objects). Store the BMI value to a property, and also return it 
from the method
> 3. Log to the console who has the higher BMI, together with the full name and the respective BMI. Example: "John's BMI (28.3) is higher than Mark's (23.9)!"
>
> Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall
</details>
</details>

### Loops and Iterations

<!-- <details> -->
<summary>
summary.
</summary>

#### Coding Challenge 4

<details>
<summary>
Calculate tips with loops!
</summary>

> Let's improve Steven's tip calculator even more, this time using loops!
> Your tasks:
> 1. Create an array 'bills' containing all 10 test bill values
> 2. Create empty arrays for the tips and the totals ('tips' and 'totals')
> 3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate tips and total values (bill + tip) for every bill value in the bills array. 
> Use a for loop to perform the 10 calculations!
>  
> Test data: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52
> Hints: Call ‘calcTip ‘in the loop and use the push method to add values to the tips and totals arrays.
> Bonus:
> Bonus: Write a function 'calcAverage' which takes an array called 'arr' as an argument. This function calculates the average of all numbers in the given 
array. This is a difficult challenge (we haven't done this before)! 
> Here is how to solve it:
> 1. First, you will need to add up all values in the array. To do the addition, start by creating a variable 'sum' that starts at 0. Then loop over the array using a for loop. In each iteration, add the current value to the 'sum' variable. This way, by the end of the loop, you have all values added together.
> 1. To calculate the average, divide the sum you calculated before by the length of the array (because that's the number of elements)
> 1. Call the function with the 'totals' array.
> 
> GOOD LUCK
</details>

<!-- </details> -->

<!-- </details> -->