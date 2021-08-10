## JavaScript Fundamentals - Part I

<details>
<summary>
Basics of Javascript
</summary>

We can write javascript either in the browser or run them in html pages or use node.JS.

### Hello world.

<details>
<summary>
obligatory "hello world" example.
</summary>

``` js
console.log("hello world");
alert("hello world!");
let js = 'amazing';
if (js === 'amazing')
{
    alert("javascript is fun");
}
console.clear(); //also CTRL+L
```
</details>

### Introduction

<details>
<summary>
What is Javascript even?
</summary>


>Javascript is a high-level, object oriented, multi-paradigm programming language.

high-level: we don't need to think about memory management (for now).
object-oriented: based around objects, everything is an object.
multi-paradigm: can be used as imperative or declarative.

the web is designed around HTML - content, CSS - presentation and JS - behavior. another analogy is html-nouns, css-adjectives, js-verbs;
we can added dynamic effects to web applications. frameworks: react, angular, vue. they are all based on javascript. we can run javascript outside the browser with *node.js* for javascript backend. this course is mostly front end. we can also use javascript to build native mobile and desktop application with other frameworks.

javascript releases. **ES** stands for **ECMA Script**, ES5 is 'classic' javascript, and ES6 (2016) is modern java script.

</details>

### Linking a JS file.

<details>
<summary>
Linking a JS file to an html.
</summary>


we use the files ine the *starter* folder for each part of the course. there is an html file 'index.html' that we work with it.  we start by adding a *\<script>\* tag.

``` html
 <script>
      let js = 'amazing';
      if (js === 'amazing')
      {
          alert("javascript is fun");
      }
      console.log(40+8+23-10);
</script>
```
we can see in the console where the code is coming from(which line in the html file); code inside html is 'inline script', but we prefer to stick it into file. we link the javascript file by adding the script tag with the src (source) attribute as the last element in the html body tag.

``` html
<body>
    <h1>HEADING</h1>
    <script src="script.js"></script>
</body>
```
</details>

### Values and Variables

<details>
<summary>
Values and Variables.
</summary>

value is a piece of data, variable is how we can store them.

``` js
let js = "js";
const ts = "ts";
js = "javascript"; //possible;
//ts = "typescript"; //impossible! const!
```

naming conventions:
* camelCase = first word lower case, later words uppercase.
* snake_case = using underscore between words.

hard rules:
* variables can't start with a number.
* can only contain letter, number, underscore ('_') and the dollar sign ('$')
* we can't use reserved [keywords](https://www.w3schools.com/js/js_reserved.asp).

soft rules:
* "name" isn't a reserved keyword, but it should be used.
* variables with uppercase is used for classes.
* ALLCAPS should be reserved to constant values.
* use descriptive names.

if we have errors they will show up in the console.

#### Practice Assignment

> 1. Declare variables called 'country', 'continent' and 'population' and assign their values according to your own country (population in millions).
> 2. Log their values to the console

``` js
const country = "Israel";
const continent = "Asia";
const population = 6500000;
console.log(country);
console.log(continent);
console.log(population);
```
</details>

### Data Types

<details>
<summary>
Data Types Intro.
</summary>
values are either primitives or objects:

primitives: 
* number: always floating point. no difference between integers and floats.
* string: a sequence of characters. must be in quotes, either single or double.
* boolean: true and false.
* undefined: the value and type of a variable that hasn't been defined.
* null: the default value of a object.
* symbol (ES2015): a value that is unique and cannot be changed.
* bigInt (ES2020): larger integers than what the number type can hold.

Javascript has dynamic typing. we do not define the type of data. it can change as we store different values. the variable itself doesn't have a type. the value (the data) has. we can have x store a number and later a string. this is not how static programming languages work.

comments: as usual. *"//"* for single line comment, *"/\* comment \*/"* for block / multi-line comment.


the **typeof** operator can show us the type of an operator (returns a string). we don't really need to use it with parentheses, but we can.

``` js
let x ="x";
console.log(typeof true); //"boolean";
console.log(typeof x); //"string";
console.log(typeof 1); //"number";
x = 25;
console.log(typeof x); //"number";
let undef;
console.log(typeof undef); //"undefined", type is undefined!
console.log(undef); //"undefined", value is undefined!
undef = false;
console.log(typeof undef); //"bool", type is bool!
console.log(undef); //false, value is false!

console.log(typeof null); //"object"
```

the course says that null shouldn't be an 'object' type. and that it's a bug that will never be changed.
</details>

### Let, Const and Var

<details>
<summary>
Different ways to assign values.
</summary>

var is the old style, let and const are ES6. use let and const.
* let - can be changed afterwards (mutable), cant be re-declared.
* const - can't be changed (immutable). can't be empty when declared.
* var - can be changed, can be re-declared (declare a variable with the same name again).

even more obscure, we don't really need to declare the variables, if we simply assign a value to a name, it's declared as a property on the global object, which is as bad as it sounds.
``` js
let x = "x";
x = "xx"; //possible;
const y= "y";
//y = "yy"; //impossible
let z;
z = "z";
//let z = "again"; //impossible, as it should be!
var x = 4;
var x = "lala"; //possible, re-declared, why!!!!
g = "global property"; //possible, horrible idea! global scope
```

also, let is block-scope, and var is function scope.

</details>

### Operators

<details>
<summary>
an operator allows us to do work on a value.
</summary>
we have mathematical operators, comparison operators, logical operators, assignment, bitwise operators, type operators and combinations of assignment and operators with other operators.. and don't forget the ternary operator!

[Javascript operators](https://www.w3schools.com/js/js_operators.asp).

mathematical operations: plus, minus, multiply, divide, exponent/power ( 2 ** 3 = 8), modulo (8 % 3 = 2)

we can always log several values in the console with the comma
``` js
const A =2037;
const a1 = 1990;
const a2 = 1987;
console.log(A, A-a1, A-a2);
console.log(A + " - " + a1 + " =" (A-a1)); //concatenation.
```

*typeof* and *instanceof* are also operators. typeof produces the type name, instanceof produces a boolean saying if the object belongs to the type in question.

#### Operator Precedence And associativity

There are operator precedence (what happens first) and operators associativity (do they relate to the left side or the right side) rules. see the [MDN operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) table. the higher precedence means that it happens before. the highest is the grouping operator, which is parentheses, just like in math!

we can define two variables in one line.
here is an example
``` js
let x,y;
x= y =25-10-5;
console.log(x,y)
```

operations order
1. 25-10
1. 15-5
1. y=10
1. x=y


</details>


### Coding Challenge 1

<details>
<summary>
calculate BMI scores.
</summary>

> Coding Challenge #1  
Mark and John are trying to compare their BMI (Body Mass Index), which is 
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg 
and height in meter).  
> Your tasks:
> 1. Store Mark's and John's mass and height in variables
> 2. Calculate both their BMI using the formula (you can even implement both versions)
> 3. Create a Boolean variable 'markHigherBMI' containing information about whether Mark has a higher BMI than John.
>
> Test data:
> * Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
> *  Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.
> GOOD LUCK

</details>

### String and Template Literals

<details>
<summary>
String, words and sentences.
</summary>

don't mix double and single quotes. if we need to use an apostrophe, we should use double quotes to mark our string. the + operator does concatenation for strings, and also does type coercion for other types and makes them into strings.

in ES6 we have *template literals*. which use back ticks *``*, curly braces *{}* and the dollar sign *$*, this makes the sentence easier to write and manage spaces than simple concatenation. we can also put calculations directly inside the braces. we can use backtick for regular strings as well.

``` js
const value = 25;
const templateLiteral = `I'm ${value} years old!, i've been allowed to drink for ${value -18} years!`;
console.log(templateLiteral);
```

template literals also allow us to write multiline strings in an easier way.

```js
const oldStyle = "Multi \n Line \n String";
const newStyle `Multi
Line
String`;

console.Log(oldStyle);
console.Log(newStyle);
```
</details>


### If-Else Statement

<details>
<summary>
Program Control Flow.
</summary>

basic if-else statements, curly braces, *if-else if-else*, variables can be declared inside curly braces. the usual.

</details>

### Coding Challenge 2

<details>
<summary>
calculate BMI scores Revisited.
</summary>

> Use the BMI example from Challenge #1, and the code you already wrote, and improve it.
>
> Your tasks:
> 1. Print a nice output to the console, saying who has the higher BMI. The message is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!".
> 2. Use a template literal to include the BMI values in the outputs. Example: "Mark's BMI (28.3) is higher than John's (23.9)!".
>
> Hint: Use an if/else statement 

</details>

### Type Conversion and Coercion

<details>
<summary>
Conversion and Coercion of values into different Types.
</summary>
we call is Conversion when it's done manually, and Coercion when it's done behind the scenes. Javascript really like to do type coercion for use.

Nan is a value of the number type, any operations using NaN result in a Nan. we can convert to String, Number and Boolean.

``` js
const inputYear = '1991';
console.log(inputYear + 10); //199110 type Coercion.
console.log(Number(inputYear) + 10); //2001 type conversion.
console.log(Number('Jonas')); //Nan, can't convert string to number.
console.log(String(25)); //"25", convert to a string
```
type coercion happens whenever we deal with two variables of different types, like concatenating a string and a number. type coercion follows operators precedence rules.

``` js
const x = "string" + 10; //type coercion;
const y = "23" - '10'; //type coercion to number;
const z = "23" + '10'; //type coercion to string;
let n = '1' + 1; // '1' + String(1). string concatenation
n = n-1; // Number(11) -1. number operations
console.log(`n is a ${typeof n} with the value ${n}`);
const d = 2+3+4+'5'; // ((2+3)+4)+'5') = 9 + '5' = '95';
console.log(`d is a ${typeof d} with the value ${d}`);
```

#### Truthy and Falsy values

Falsy values aren't false by themselves, but will evaluate to false when converted or coerced into booleans.

the falsy values are:
* 0 the number zero.
* *""* the empty string.
* undefined.
* null.
* Nan.

any other value will be converted to true.
``` js
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean(null));
console.log(Boolean(''));
console.log(Boolean('Jonas'));
console.log(Boolean({}));
```

this comes into play when we use variables inside a condition. we can use it to test if a variable is defined or not. 
``` js
let x;
if (x)
{
    console.log("x is defined!");
}
else
{
    console.log($`x is undefined! ${x}`); //this will happen
}

x = 0;
if (x)
{
    console.log("x is defined!");
}
else
{
    console.log($`x is undefined! ${x}`); //this will still happen! 0 is a falsy value
}
```

</details>

### Operators Revisited

<details>
<summary>
The Equality operators, logical operators and boolean Logic.
</summary>

there is two equality operators, *==* and *===*,the first checks for value and does greedy type conversions, while the second does both type and value conversions.

``` js
const loose = 18 == '18'; //true!
const strict = 18 === '18'; //false!

console.log(10 == "10"); //true
console.log(10 === "10"); //false
console.log({} == null); //false
console.log(undefined == 0); //false
console.log(NaN == 0); //false
console.log(undefined == null); //true
console.log(undefined === null); //false
console.log(undefined == ''); //false
console.log(0 == null); //false
console.log(0 == ''); //true
```

javascript is really bad with the loose operator, so we should avoid it.

getting value from user

```js
var v = prompt("put value!"); //returns string, even if it's a number
var n = Number(v);
if (n === NaN)
{
    //wasn't a number
}
```

the inequality operator also does loose and strict comparisons *!=* and *!==*.

there are of course boolean logic operators
* && and
* || or
* ! not (actually bitwise operator)
* ?? null coalescing operator (covered later on)

as with all languages, we can combine boolean values and conditions to express our business logic.
truth tables:
the *and &&* operator
 | **and**   | true  | false |
 | --------- | ----- | ----- |
 | **true**  | true  | false |
 | **false** | false | false |

the *or ||* operator

| **or**    | true | false |
| --------- | ---- | ----- |
| **true**  | true | true  |
| **false** | true | false |
</details>


### Coding Challenge 3

<details>
<summary>
Calculate averages and use logical conditions.
</summary>

> There are two gymnastics teams, Dolphins and Koalas. They compete against each other 3 times. The winner with the highest average score wins a trophy!
> Your tasks:
> 1. Calculate the average score for each team, using the test data below
> 2. Compare the team's average scores to determine the winner of the competition, and print it to the console. Don't forget that there can be a draw, so test for that as well (draw means they have the same average score)
> 3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a team only wins if it has a higher score than the other team, and the same time a score of at least 100 points. Hint: Use a logical operator to test for minimum score, as well as multiple else-if blocks.
> 4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when both teams have the same score and both have a score greater or equal 100 points. Otherwise, no team wins the trophy
> 
> Test data:
> * Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110.
> * Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and > 123.
> * Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106.

</details>

### The Switch Statement

<details>
<summary>
A different way to do multiple if-else if-else blocks.
</summary>

instead of writing many if else statements, we can use switch case to switch on a value. the switch case uses strict equality *===* comparisons.

``` js
const day = 'monday';
if (day === 'sunday')
{

}
else if (day === 'monday')
{
    
}
else if (day === 'tuesday')
{
    
}
else if (day === 'wednesday' || day === 'thursday')
{
    
}
else if (day === 'friday' || day === 'saturday')
{
    
}
else
{
    //default behavior
}

switch(day)
{
    case 'sunday':
        //do stuff
        break;
        case 'monday':
        {
            //do something else;
            break;
        }
    default:
        //default case;
}
```

the switch statement is being used less and less nowadays. but that's for another time.
</details>

### Statements and Expressions

<details>
<summary>
High level overview of stuff.
</summary>
An expression produces a value; an operator, a value by itself, a function call. even an assignment is an expression. A statement is a higher level structure that doesn't produce a value: an if-else statement, a switch statement, a declaration.
statements and expressions are expected in different places in the program.

</details>


### The Conditional Operator

<details>
<summary>
The Ternary operator.
</summary>

using the *a ? b : c* syntax. this is an operation therefore part of an expression that produces a value and go inside a string template literal.

``` js
const a =4;
const b =5;
const c = (a>b) ? a : b;
console.log(`c is ${ a> b ? a :b}`);
```
</details>


### Coding Challenge 4

<details>
<summary>
Tip Calculator with the Ternary operator.
</summary>
> Steven wants to build a very simple tip calculator for whenever he goes eating in a restaurant. In his country, it's usual to tip 15% if the bill value is between 50 and 300. If the value is different, the tip is 20%.
> Your tasks:
> 1. Calculate the tip, depending on the bill value. Create a variable called 'tip' for this. It's not allowed to use an if/else statement. (If it's easier for you, you can start with an if/else statement, and then try to convert it to a ternary operator!)
> 2. Print a string to the console containing the bill value, the tip, and the final value (bill + tip). Example: “The bill was 275, the tip was 41.25, and the total value 316.25”
>
> Test data:
> * Data 1: Test for bill values 275, 40 and 430
> Hints:
> * To calculate 20% of a value, simply multiply it by 20/100 = 0.2
> * Value X is between 50 and 300, if it's >= 50 && <= 300.
</details>

### Javascript Releases ES5,ES6 and ESNext

<details>
<summary>
How does the Javascript versioning go.
</summary>
ES means ecma script, the standard for how the language should behave.

javascript started as *Mocha* for netscape and was completed in 10 days. it was later renamed to *LiveScript* and later to *JavaScript*, despite having almost nothing to do with the *Java* language. microsoft then copied it into *JScript*, and a standard was established, the ECMAScript 1 (ES1). eventually in 2009 ES5 was released, and in 2015 ES6 was released, and ecma decided on a annual release schedule, with a new version released every year since.  
The Javascript is backwards compatible, which means **Don't Break the Web**. websites should keep working forever. this means that JS does have weird bugs still around, but we can write modern code and avoid them. we don't have forward compatibility, but if our users have old browsers, they might not have the latest features and our code won't work.  
In order to deal with that, we do something called *transpiring* (using *babel* tool) and *polyfill* to convert our modern code back into ES5 compatible code, which is assumed to be supported in all browsers.  
ES6 and forward are called *ES6+*, future versions are called *ESNext*, so browsers can start implementing the new features before the official release.

in this course we will sometimes see how old versions worked, like const, let and var. even modern websites might still have old code style somewhere in the legacy code.
</details>

</details>