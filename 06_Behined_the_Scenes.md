## How JavaScript Works Behind the Scenes

<details>
<summary>
Understanding how the language works under the hood.
</summary>

A birds view of how things are and how the work.
in the start of the course we saw this definition:

> Javascript is a high-level, object oriented, multi-paradigm, programming language.

that was nice, but here is a more complete definition.

> Javascript is a high-level, prototype-based object oriented, multi-paradigm, interpreted or just-in-time compiled, dynamic, single threaded, garbage collected programming language with first class functions and a non blocking event loop concurrency model.

that's a lot of words to break down, let's split them and put them in some order.

1. **High level** indicates we don't manage resources. in low level languages, we manage them manually, like C. in high level languages, we get this done for us. this does mean our code is less efficient, but it makes it easier to write and port.
2. **garbage collector** is one way to manage resources which automatically removes old unused resources from the memory.
3. **Interpreted languages** how and when the source code becomes machine code.
4. **Multi paradigm** means we aren't limited to one paradigm (Procedural, Object-Oriented, Functional, imperative vs declarative).
5. **Prototype based object oriented approach**, a prototype is like a blueprint, but not like virtual dispatch inheritance or other types of OOP.
6. **First class functions** means functions are objects and can be variables. we can pass them into functions, return them, assign them, etc.
7. **Dynamic typing** means that there is no data type definitions, type are known only at run time, and assign any variable to any type (typescript is javascript with static typing).
8. **Single threaded** means that the process only has one thread available to it. it doesn't support multiple threads.
9. **Non blocking Event loop concurrency model** is the way to handle asynchronous programming, we will see this later on.

### The Javascript Engine and Runtime

<details>
<summary>
Javascript requires an engine and a runtime to function.
</summary>

a js engine is a program that executes js code. every browser has an engine, like chromes' **V8** (also powers node.js). an engine has a _call stack_ and a _heap_.
the call stack is where our code runs, the heap is the memory pool with all the objects and the data.

#### compilation vs interpretation

> compilation: Entire code is converted into machine code at once, and written to a binary file that can be executed by a computer.  
> interpretation: Interpreter runs through the source code and executes it line-by-line.  
> Just-In-Time Compilation: Entire code is converted into machine code at once, and immediately executed, no binary file.

when we try to run a js source code file, it's first parsed into something called **Abstract Syntax Tree** (AST), we tokenize each line and create the structure. this tree isn't related to the DOM tree. the AST is compiled into basic machine code, and the executed. during the runtime, the machine code is optimized during the runtime (this is the Just-in-time part) and this process repeats.

#### the Javascript Runtime

the runtime is usually run in the browser, in a runtime, there must be an engine, and access to the _WEB APIs_ (which we get from the window model), we usually have a _Callback Queue_, which holds the events. this queue feeds the call stack for execution, and this is actually the event loop.  
in node.js, we still have an engine and event loop, but we don't have the web apis, instead we have c++ bindings and thread pools.

</details>

### Execution Context and the Call Stack

<details>
<summary>
What's inside the execution context, how the call stack is managed.
</summary>
when code compilation is finished, a global execution context is created for the top-level code. top level code is code that is outside of functions and objects. this is what first runs. this is why code inside the function doesn't run immediacy.

> Execution context is an environment in which a piece of javascript is executed, stores all the necessary information for some code block to be executed.

There is only one global execution context (**EC**). after the global EC finishes, we start resolving the function calls, each of them has it's own context. once they function calls finish, the engine will wait for callback functions from the callback queue. this is stuff like click events, timed functions, etc...

inside an execution context

1. Variable environment.
   - _let_, _const_, _var_ declarations
   - Functions
   - _arguments_ object (_not in arrow functions_)
2. Scope chain - reference to variables the outside the context.
3. The _This_ keyword - reference to an object (_not in arrow functions_).

all of the above are generated inside a 'creation phase', right before execution.
in arrow functions, we don't have the _this_ keyword or the _arguments_ object, we simply use the closest one, based on the context of the arrow function. the context is based on where the function is defined, not where it's used. if we return a function, it will retain the context in which is was defined.

the [arguments object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) is the arguments/parameters of a function...

```js
function foo1() {
  //print arguments
  for (let arg of arguments) {
    console.log(arg);
  }
}
foo1(1, 2, 3);
foo1("1", false, bar, [1, 2, 3]);

const foo2 = () => {
  for (let arg of arguments) {
    console.log(arg);
  }
};
foo2(); // the global context arguments
function bar2() {
  const foo3 = () => {
    for (let arg of arguments) {
      console.log(arg);
    }
  };
  return foo3;
}
const fnc = bar2(1, 23, "s");
fnc("will not show!");
```

#### The Call Stack

the call stack contains the execution contexts, with the in a fifo manner, if a context needs to add a different context, it's pushed to top, and evaluated. when it finishes evaluation, the context is removed from the call stack. this is the C stack-frame. when we add a context to the call stack, the other stack frames are paused (blocked). when we finish with one context, it's popped from the call stack and we continue with the previous context.  
once the call stack is empty (except for the global context), the event loop goes into action.
the global context is never popped, and in some cases, other contexts continue to exists in memory.

</details>

### The Scope and Scope Chain

<details>
<summary>
The scope chain, How variables are accessed.
</summary>
recall, inside the execution context we store:

- variable environment
- scope chain
- this keyword

> scoping asks the question of how our variables are organized and accessed. "where do they live?" and "where can we access a certain variable, and where not?"
>
> Javascript uses **Lexical Scoping** (also called static scoping), which means that scoping is controlled by placement of functions and blocks in the code.
>
> Scope: space or environment in which a certain variable is declared,(variable environment in case of functions) there is **global scope**, **function scope** and **block scope**.
>
> in functions, variable environment and scope are the same.
>
> scope of a variable: Region of our code where a certain variable can be accessed.

dynamic scoping means that the context is determined by usage, where the functions is called.

types of scopes in javascript

1. global scope
   - outside of any function or block
   - global scope can be accessed from everywhere.
2. function scope
   - variables are accessible only inside the function, not outside
   - also called local scope
   - same as variable environment
3. block scope (ES6)
   - like a if-else block, loop blocks
   - variables are only accessible inside block. **THIS ONLY APPLIES FOR CONST AND LET VARIABLES, var is function scoped no matter the block**
   - in strict mode, function declared inside a block act as const/let, without strict mode, it's like var.

#### The Scope Chain

starting with an example code.

```js
const myName = "jonas";
function first() {
  const age = 30;
  if (age >= 30) {
    const decade = 3;
    var millennial = true;
  }
  function second() {
    const job = "teacher";
    console.log(`${myName} is as ${age}-old ${job}`);
  }
  second();
}
first();
```

every scope can access all the elements from the parents scope. this also applies to function arguments. this called variable lookup. this is access by reference, if we change something, it changed for everyone. this doesn't work the other way around, of course. to be precise. functions are also scoped, so the 'first' function is inside the 'global scope', and 'second' function is inside the the 'function scope'.

- global scope:
  - myName='jonas'
  - first() scope
    - age =30
    - if scope:
      - decade = 3
    - millennial = true; actually function scoped
    - second() scope:
      - job = teacher;

The scope chain and the call stack aren't the same thing. the call stack depends on how code is called, the scope chain is how the code is defined

```js
const a = "Jonas";
f1();
function f1() {
  const b = "Hello";
  f2();
  function f2() {
    const c = "Hi";
    f3();
  }
}
function f3() {
  const d = "hey";
  console.log(a, b, c, d); //can't do this! b,c aren't defined in the scope chain!
}
```

when we call f1,we then call f2 and f3, so the call stack is global-f1-f2-f3. however, the scope chain are different f1 can access global, f2 can access f1, but f3 can't access f1 or f2, just the global scope, where it was defined.

#### Scoping Chain Rules

> - Scoping asks the question _"Where do variables live"_ or _"where can we access a certain variable, and where not"_.
>
> - There are 3 types of scope in javascript: the global scope, scopes defined by functions, and scopes defined by blocks.
>
> - Only _let_ and _const_ variables are block-scoped, variables declared with _var_ end up in the closest function scope.
>
> - In javascript, we have lexical scoping, so the rules of where we can access variables are based on exactly where in the code function and blocks are written.
>
> - Every scope always has access to all the variable for all its outer scopes, this is the scope chain!
>
> - When a variable is not in the current scope, the engine looks up in the scope chain until it finds the variable it's looking for. this is called variable lookup.
>
> - The scope chain is a one-way street: a scope will nerve,ever, have access to the variables of an inner scope.
>
> - The scope chain in a certain scope is equal to adding together all the variable environment of all the parent scopes.
>
> - The scope chain has nothing to do with the order in which functions were called, it does not affect the scope chain at all.

#### Scoping in Practice

Examples in code of scoping rules
accessing global objects from a function. following the scope-chain. the scope of a variable, is where the variable is accessible. global variables are accessible from anywhere. the lookup chain finds the nearest variable with this name (shadowing).

```js
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  console.log(firstName);
  //console.log(lastName); // won't work! lastName isn't defined before the first function call
  return age;
}

let firstName = "jonas";
calcAge(1991);
const LastName = "jonas";
firstName = "ben";
calcAge(1992);
```

variables declared with _var_ don't care about block scoping. functions are block scoped in strict mode, and function scope in non strict mode. we can change and manipulate variables in the parents scopes.

</details>

### Variables Environment: Hoisting the TDZ

<details>
<summary>
When can we access variables inside the scope. what happens if we break the rules, more pitfalls of var declarations.
</summary>
execution context contains:

- [ ] variables environment
- [x] scope chain (covered already)
- [ ] _this_ keyword

> - **hoisting:** makes some types of variables accessible/ usable in the code before they are actually declared, "variables lifted to the top of their scope".
>
> **BEHIND THE SCENES**
>
> **Before execution**, code is scanned for variable decelerations, and for each variable, a new _property_ is created in the _variable environment object_.

this process works differently depending on the kind objects:

| Type                                 |         Hoisted          | Initial Value         | Scope                       |
| ------------------------------------ | :----------------------: | --------------------- | --------------------------- |
| **function decelerations**           |           yes            | actual function       | function/block(strict mode) |
| **_var_ variables**                  |           yes            | undefined             | function                    |
| **_let_ and _const_ variables**      |           no\*           | \<uninitialized>, TDZ | block                       |
| **functions expressions and arrows** | (var or let/const rules) |                       |

This means we can use functions before (in top) we actually declared them, and they will work properly. it's as if all functions were written in the top of the scope (which is the block scope in strict mode, function scope otherwise).

var variables are hoisted, so they exist before the declaration in the code with undefined value, but they can be accessed and even modified. it's as if the declaration is split into a deceleration on top of the code, and assignment at the the place it was written.

```js
function foo{
// many lines of code
var x = "some value";
}
```

is actually

```js
function foo{
var x; // no value; before anything else in function happens
// many lines of code
x= "some value";
}
```

let and const value are technically hoisted, but not in the same way as functions and var variables, so it's like saying the weren't. they have a value of \<uninitialized>,and belong in somewhere called TDZ(**Temporal Dead Zone**).

function expressions and arrow functions are just variables like any other, so their rules depend on how they were declared, they can use _var_ or _let/const_ rules.

#### The Temporal Dead Zone

the region of the block where a let/const variable is unaccessible, it's defined by the inner interpreter,but we can't access it yet until we reach the point in the code that gives it the value

```js
const x = 50;
if (x> 20)
{
  console.log(x)
  const z = 99;
  const = z -x;
  const j = 'job';
  console.log(y);
}
```

if we try to access j before the line it's defined on, we get an error: **ReferenceError: Cannot access 'j' before initialization**. if we try to access a variable that isn't declared at all (after doing lookup chain), we get a different error: **ReferenceError: y is not defined**. the hoisting of let/const moves them to the TDZ, and when they are defined in the code then they can be used.

The TDZ was added in ES6, and it helps us avoid errors. it also allows us to use const variables. the reason for hoisting was to allow using functions before declarations, and the _var_ hoisting was a by product.

#### Hoisting and the TDZ in practice

variables hoisting

```js
console.log(me); // undefined
console.log(job); // cannot access before initialization
console.log(year); // cannot access before initialization
var me = "jonas";
let job = "teacher";
const year = 1991;
```

functions hoisting

```js
foo1(); // works!
foo2(); // cannot access before initialization
foo3(1, 2); // cannot access before initialization
foo4(1, 2); // foo4 is not a function! it's still undefined!
function foo1() {} //function deceleration;
const foo2 = function () {}; // function expression
const foo3 = (a, b) => {}; // arrow function
var foo4 = (a, b) => {};
```

remember that undefined is falsy value? here is a way that var fucks up with us.

```js
if (!numProducts) deleteShoppingCart(); //var numProducts is undefined, undefined is falsy value, so !false -> true, and the code will run
var numProducts = 10;
function deleteShoppingCart() {
  //
}
```

the window object. only in the browser, not on node.js. we can see our properties by accessing window.window._property name_, and this will hold our variables declared with _var_ but not _let/const_.

```js
var x = 0;
let y = 2;
const z = 3;
```

</details>

### The This Keyword

<details>
<summary>
a special variable that points to the owner of the execution context
</summary>
execution context contains:

- [x] variables environment (covered already)
- [x] scope chain (covered already)
- [ ] _this_ keyword

> - **the _this_ keyword/variable**: special variable that is created for every execution context (every function). takes the value of (point to) the "owner" of the function in which the _this_ keyword is used.
>
> - _this_ is **not** static, it depends on **how** the function is called, and the value is only assigned when the function **is actually called**.

**method** this = \<object calling the method>

```js
const jonas = {
  name: "Jonas",
  year: 1989,
  calcAge: function () {
    return 2037 - this.year; //this is the object
  },
};
jonas.calcAge();
```

**normal function** this = **undefined** in strict mode, or global/window if not strict mode.

**arrow functions** this = \<this of the surrounding function(lexical this)>. the arrow function doesn't get a unique _this_.

**event listener** this = \<DOM element that the handler is attach to>

the this keyword does not point to the function itself,and also not it's variable environment.

**new, call, apply, bind** = other ways to call functions, we will discuss this later.

#### The This keyword in Practice

```js
console.log(this); //the global/window object in browser mode.
function foo() {
  "use strict";
  console.log(this); //undefined, strict mode
}
foo();
function foo2() {
  console.log(this); //global/window, sloppy mode
}
foo2();
const foo3 = () => {
  //arrow function
  "use strict";
  console.log(this); //global/window, strict mode, but we get the this from the surrounding scope
};
foo3();
const person = {
  fullName: "jonas",
  y: 1,
  bar: function () {
    console.log(this, "y", this.y); //the calling object
  },
  bar2: () => {
    console.log(this); //global this, arrow function
  },
};
person.bar(); // the calling object is person;
person.bar2();
const person2 = { fullName: "matilda" };
person2.bar = person.bar;
person2.bar(); //the calling object is person2; it doesn't have property y, so the value is undefined
let bar3 = person.bar;
bar3(); //the this is again the global object
```

#### Regular Functions and Arrow Functions

```js
const j = {
  a: 1,
  b: "s",
  foo1: function () {
    console.log("foo1", this); //this is the calling object
  },
  foo2: () => {
    console.log("foo2", this); //global this
  },
  foo3: function () {
    const isMillennial = function () {
      console.log("isMillennial", this); //undefined. it's a regular function call
    };
    const self = this;
    const useSelf = function () {
      console.log("useSelf", self); //undefined. it's a regular function
    };
    const isArrow = () => {
      console.log("isArrow", this); //the surrounding this, j
    };
    isMillennial();
    useSelf();
    isArrow();
  },
};
```

we shouldn't use arrow functions as methods.
if we really want to use the 'this' we can add it to the scope by storing the the 'this' as a variable in the surrounding scope and refer to it. this was done in the past, but today we can use arrow function that use the _this_ from the surrounding scope. Note that we sometimes use the _this_ from the scope sometimes from the calling object.

The arguments keyword is available in any function, it holds all the arguments, even if we didn't define them as parameters!

```js
function argFoo(a, b, c) {
  console.log(arguments);
}
argFoo(1, 2, 3, 4, 5, "false");
const argFoo2 = (a, b, c) => {
  console.log(arguments);
};
argFoo2(1, 33, [1, 11]);
```

in modern javascript we no longer use the arguments keyword.

</details>

### Primitives vs Objects (Reference Types)

<details>
<summary>
Primitives are value type and stored on the stack, objects are reference type on the heap. copy by value vs copy by reference, shallow copy with Object.assign(). primitives are actually immutable?
</summary>
there is a difference between how primitives are stored in memory vs objects. an example

```js
let age = 30;
let oldAge = age;
age = 31;
console.log(age, oldAge); //31,30
const me = { fullName: "jonas", age: 40 };
const other = me;
other.age = 27;
console.log(me, other); //both are the same
```

primitives:

- Number
- String
- Boolean
- Undefined
- Null
- Symbol
- BigInt

objects:

- Objects literals
- Arrays
- Functions
- and more!

primitives are primitive types, copy by value. objects are copy by reference. primitive types are stored on the stack (the execution type where they are declared), reference types are stored in the heap (the garbage collector!). variables are actually identifiers to memory addresses, when we assign a new value to a primitive, we don't change the value in memory, we add a new address with that value and point our identifer to it.

reference types point to the stack which holds an address on the heap. so if we change a member variable of an object, we actually change the data on the heap, so everybody who uses our same reference from the stack will see the updated value.

**Primitive types are immutable in JavaScript, an assignment is simply creating a new address in memory and point there**

#### Primitives vs Objects in Practices;

```js
let lastName = "Williams";
let oldLastName = lastName;
lastName = "davis";
console.log(lasName, oldLastName); //different values, primitives

const jessica = {
  firstName: "Jessica",
  lastName: "david",
};
const married = jessica;
married.lastName = "Will";
married.age = 88;
console.log(married, jessica); //same, objects are reference type,age is now on both
```

if we really want to copy objects and have them be separate object we use a function called object.Assign() to create a new objects

```js
const o1 = { a: 1, b: 3, c: "aa", d: [1, 2, 3, 4] };
const o2 = Object.assign({}, o1); //create new object form the o1 and empty object.
o2.a = 44;
console.log(o1, o2); // now a is different
o1.d.push(205);
console.log(o1, o2); // but d is still shared? this isn't what we wanted!
```

the problem is that _Object.assign()_ only works for the first level, it's a shallow copy, and we want a deep copy ( a clone). for a real deep clone, we would use an external library.

</details>

</details>
