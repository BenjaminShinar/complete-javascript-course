## JavaScript Fundamentals - Part 2

<!-- <details> -->
<summary>
more about javascript, functions, objects, arrays, loops.
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

### Coding Challenge 1

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

<!-- <details> -->
<summary>
summary.
</summary>
<!-- </details> -->


### Objects

<!-- <details> -->
<summary>
summary.
</summary>
<!-- </details> -->

### Loops and Iterations

<!-- <details> -->
<summary>
summary.
</summary>
<!-- </details> -->

<!-- </details> -->