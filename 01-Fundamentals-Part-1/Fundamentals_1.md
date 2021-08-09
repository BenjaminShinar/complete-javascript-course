## JavaScript Fundamentals - part I

<!-- <details> -->
<summary>
Basics of Javascript
</summary>

we can write javascript either in the browser or run them in html pages or use node.JS.

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
Values and Variables;
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
Data Types Intro
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

### Basic Operators

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

there is operator precedence rules (what happens first). operators affinity (do they relate to the left side or the right side)

*typeof* and *instanceof* are also operators. typeof produces the type name, instanceof produces a boolean saying if the object belongs to the type in question.

</details>

## FIN
<details>
<summary>
</summary>
</details>
<!-- </details> -->