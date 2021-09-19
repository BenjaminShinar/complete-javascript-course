## Modern JavaScript

<details>

<summary>
ES6 modules, build tools, modern JavaScript is declarative and functional.
</summary>

### Overview

<details>
<summary>
How we write JavaScript today and introduction of the build process.
</summary>

we don't stick everything inside one or few files, today we use modules and 3rd party packages.
we get these packages from npm (node package manager), it was originally developed for use together with node-js, but today it's an independent tool.

npm is both the tool and the repository.

after creating the modules, we send our code into a 'build process', which creates a JavaScript bundle, which is then used in the website.\
the build process can be complicated, but it has several distinct stages

1. Bundling - joining all modules into one file and compressing it. this is for the sake of older browsers that don't support modules, and to increase performance.
2. Trans-piling/Poly-filing - converting modern JavaScript into ES5 JavaScript. this way even older browsers can use new code, we usually use a tool called 'Babel' for this.

we don't perform these steps ourselves, we use a tool (called a 'bundler'), like 'webpack' or 'parcel'. both of which are also included in the npm.

</details>

### Modules

<details>
<summary>
Using modern ES6 modules, what they are, how they work, and what do they replace.
</summary>

modern JavaScript uses modules.

> - Module: a reusable piece of code that **encapsulates** implementation details.

a module is usually a stand alone file, it can have import and exports. what we export from the module is called 'Public API', other modules import those.
a module that exports to a different file is called "a dependency", the other file cannot work without it.

modules aren't specific to JavaScript, most programming languages use them (even if they have different names)

modules are like small building blocks that we put together to create complex applications. each of them can be created independently in isolation, which makes collaboration easier. they also make it easier to **abstract** our code. we use modules that handle the low level implementation details, while we only care about the public API.

because they are stand-alone files, they make the code more organized,and they can be re-used in other projects.

as of ES6, JavaScript has native modules, they are stored in files. one module per file.

| feature             | scripts                             | modules                            |
| ------------------- | ----------------------------------- | ---------------------------------- |
| Top-level Variable  | always global (namespace pollution) | scoped to module (unless exported) |
| Default mode        | "Sloppy" mode                       | Strict mode                        |
| Top-level _this_    | undefined                           | window                             |
| Imports and Exports | No                                  | Yes                                |
| HTML linking        | \<script>                           | \<script type="module">            |
| File Downloading    | Asynchronous                        | Synchronous by default             |

import and export can only happen in top level, and imports are always hoisted (moved to the top).

```js
//index.js
import { rand } from "./math.js";
import { showDice } from "./dom.js";
const dice = rand(1, 6, 2);
showDice(dice);
```

the first part is parsing, this when imports are hoisted. in fact, the importing modules happens before executions. modules are imported synchronously. this is why the import/exports must be in the top-level, so that the the parser can recognize them.

modules are imported synchronously because it makes bundling and code elimination easier. when we know the dependencies before hand, it's easier for the bundler to do stuff.

after the parsing, the modules are downloaded in an Asynchronous way. then there is a linking process,the imports aren't copies, it's references. then the imported modules are executed, and afterward the importing file is executed.

#### Exporting and Importing in ES6 Modules

 <details>
<summary>
Hands on experience. Named and Default exports.
</summary>

the simple import is to just import, without importing a value.
our importing module will be 'script.js', and the exporting module file will be 'shoppingCart.js'

we start by logging something from both modules to make sure the process work.

```js
import "./shoppingCart.js";
```

the first error we encounter is
"Uncaught SyntaxError: Cannot use import statement outside a module".
we must be an module ourselves in order to use import statement. we need to change the script type in the html file.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script defer src="script.js" type="module"></script>
  </head>
  <body>
    <h1>Modern JavaScript Development: Modules and Tooling</h1>
  </body>
</html>
```

the first log we see is from the exporting module, and only afterward the code from the importing files.

it doesn't matter if the import file is below the console log, as importing statements are hoisted to the top.

we can also drop the 'use strict' statement, as modules are strict by default.

we can now add variables to exporting modules and see that they aren't exported and are scoped to the module.
before, we could access variables from the global scope, but now we cannot.

if we wanted them exposed, we would have needed to use exports, there are default exports and named exports.

##### Named Exports

named exports simple require us to add 'export' before the variable deceleration.

```js
const cart = [];
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} was added to the cart`);
};
```

to import a named export, we change our import statement. don't forget the curly braces!

```js
import { addToCart } from "./shoppingCart.js";

addToCart("bread", 9);
```

now we can use that the imported function. we can import multiple object with names exports with object destructing.

```js
import { addToCart, AddOneToCart } from "./shoppingCart.js";
```

we can also change the names of the imported object, with the 'as' keyword, like sql.

```js
import { addToCart, AddOneToCart as add1ToCart } from "./shoppingCart.js";
add1ToCart("orange");
```

if we want, we can export objects in a single line, without adding the export modifier to them, we simple export an anonymous objects with then

```js
const totalPrice = 237;
const totalQuantity = 23;
export { totalPrice, totalQuantity };
```

and we can also change the exported name

```js
const totalPrice = 237;
const totalQuantity = 23;
export { totalPrice as tp, totalQuantity as tq };
```

we can import everything from a module into an namespace object. this namespace/object now acts as our access point to the module without polluting the namespace. again, like sql, \* means everything.

```js
import * as ShoppingCart from "./shoppingCart.js";
ShoppingCart.AddOneToCart("burger");
```

##### Default Exports

we use default exports when we want to export just a single element from the module, it doesn't even have to be named.

```js
export default function (x, y) {
  return x + y;
}
```

when we import it, we can give it any name we want.

```js
import foo from "./shoppingCart.js"; //take default export
console.log(foo(11, 11));
```

we can default export a named element as well.

```js
const ADDTWO = function (a, y) {
  return a + y;
};
export default ADDTWO;
```

we can't export more than one default (we can make it into an object);

```js
const x = 77;
export default { function(x, y) {}, x };
```

in our example, we are importing the same object several times, it's possible to do so. we can mix the named and default imports in the same statements. we should avoid both practices and try to keep our code clean and styled

```js
import bar, {addToCard, tp as totalPriceRenamed } from from './shoppingCart.js';
```

the preferred style is to use one default export and that's it. we shouldn't mix them if we can avoid it.

##### imports as a Live Connection

imports aren't simply copies, the imported objects change the object itself

```js
export { cart };
```

and we can effect it from the importing file, and if we had several modules, they would all refer to the same object.

```js
ShoppingCart.AddOneToCart("taco");
console.log(...ShoppingCart.cart);
```

we cannot export the same object twice with the same name, but we export it under different names (it will still be the same object)

```js
export { cart, cart as CART };
```

**import are not copies of the exports.**

</details>

#### The Module Pattern

<details>
<summary>
How things looked Prior to ES6
</summary>

before ES6,there weren't native modules for JavaScript, so the best way to achieve that was by using functions.

we usually created an iife (immediately invoked function expression) that return an object with all the content, and we took the result as an object, which we could then use.

```js
const moduleShoppingCart = (function () {
  const moduleCart = [];
  const moduleShippingCost = 75;
  const moduleAddToCart = function (product, quantity) {
    moduleCart.push({ product, quantity });
    console.log(`${quantity} ${product} was added to the cart`);
  };
  const moduleOrder = function (product) {
    console.log(`ordering ${product} from supplier`);
  };

  return { moduleCart, moduleShippingCost, moduleAddToCart, moduleOrder };
})();
moduleShoppingCart.moduleAddToCart("apple", 9);
console.log(...moduleShoppingCart.moduleCart);
```

this works because of closure rules.

in practice, we would create an iife in a script, add that script to the html file, and that would cause the object to be available in the global scope. but if we had many files, we would need to link them all from the html, define their order correctly, and make sure we don't have conflicting names. we would also have problem with using a module bundler.

</details>

#### Common JavaScript Modules

<details>
<summary>
Common.js was a different form of 'modules', which is still widely used in node.js backend.
</summary>

there are other forms of modules that were used in the past, such as 'amd' modules [wikipedia](https://en.wikipedia.org/wiki/Asynchronous_module_definition) and [common js](https://en.wikipedia.org/wiki/CommonJS) Modules.

the common js modules were used in node.js until recently, so most of the modules in the npm repository still use the common js modules. in time most of them will probably move into native module, but it will take time.

for common js, we would use an object called **'export'**, and attach all the exported variables as it's properties.

this wouldn't work in the browser, but will work in node js.

```js
const commonCart = [];
exports.commonAddToCart = function (product, quantity) {
  commonCart.push({ product, quantity });
  console.log(`${quantity} ${product} were added to commonCart`);
};
```

to import it, we would use the **require()** function with the path.

```js
const { addToCart } = require("./shoppingCart.js");
```

this will still show up in _node.js_ code.

</details>

####

one problem with modules is that their contents are private to the module scope, so we cannot access anything from the console.
(_there might be a way around this, see [stack overflow](https://stackoverflow.com/questions/52569996/how-to-use-es6-modules-from-dev-tools-console_)

</details>

### Tools and the Command Line

<details>
<summary>
Command line, NPM, Parcel, Babel. Transpiling and poly-filling
</summary>

#### Introduction To the command line

<details>
<summary>
before we start using tools, we should be familiar with the command line.
</summary>

lets go over some basic commands, we can use the vscode terminal.

we are always in some folder, mostly the project folder

- _ls_ - show contents of folder (dir in windows)
- _cd_ - change directory
  - _cd.._ - go up one level
  - _cd -_ - return to previous (not in windows)
- _clear_ - clear the console
- _mkdir_ - create folder
- _touch_ - create file
- _mv_ - move or rename files
- _cp_ - copy files
- _rmdir_ - remove dictatory (only works on empty directories)
- _rm_ - remove files
  - _rm -r_ - remove recursively

</details>

#### NPM

<details>
<summary>
Basic usage of npm, installing packages,  importing them and using.
</summary>

npm is both a tool to get packages and a repository.

before the days of npm, we would add a script to the html file, and that would make a package available globally, just like what we did in the mappity project. we add a script tag and make it defer.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script
      defer
      src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
      integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
      crossorigin=""
    ></script>

    <link rel="stylesheet" href="style.css" />

    <script defer src="script.js"></script>
  </head>
  <body></body>
</html>
```

this works for small projects, but it's not manageable for big projects, where versions could be updated. and we also might have needed to download the packages locally, and there wasn't even one place to get everything!

npm changed that.

we start by checking the npm version (and see that it exists)

```bash
npm -v
npm --help
```

we then need to init the npm for this project. we then enter some data, which we can later change.

```bash
npm init
```

to install a package, we run the npm install command with the name.

```bash
npm install leaflet
```

we now have the leaflet package as dependency, and a 'node_modules' directory was created.

the leaflet library still uses the common-js modules,so we would need a bundler.
let's get [lodash](https://lodash.com/), a utility library for JavaScript.

we will actually take lodash-es, which is the version using es modules and not common js.

```bash
npm install lodash-es
```

we'll now use the cloneDeep functionality to clone a deep nested object.

```js
import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 10 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state); //not actually a deep clone
const stateDeepClone = cloneDeep(state); // this is a real deep clone
state.user.loggedIn = false;
console.log(state.user, stateClone.user, stateDeepClone.user);
```

so the _loadsh_ 3rd party library gave us something that was hard to do on our own.

we can inspect the modules and see how things were implemented.

back to the package.json file. we don't need to include the node_modules package if we try to move the project to another computer or if we use source control.
we can delete the node_modules folder and then run npm install without any package name, this will use the package.json file to install all the necessary packages from npm.

```bash
npm install
```

the import path still looks ugly, lets fix it.

</details>

#### Bundling with Parcel and NPM scripts

<details>
<summary>
Bundling and building with Parcel.
</summary>

Parcel bundler work out of the box, without configuration. it's another build tool.
we need to install it from npm, but with additional flags.

```bash
npm i parcel --save-dev
```

A dev dependency is a tool to build the application, not a dependency for the code. in package.json file it will appear in a new field.

we can't directly call parcel in the command line now, because it was installed locally and not globally. we could either use npx or npm scripts.

npx is an application built into npm

```bash
npx parcel index.html
```

this creates a folder called 'dist' and runs the program on a local port.

troubleshooting tips

- install with sudo
- install a specific version of parcel

  ```shell
  npm i parcel@1.12.4
  ```

- uninstall earlier versions

  ```shell
  npm uninstall parcel
  ```

we might be seeing an error that

> "parcelRequire is not defined"
> this will happen because parcel (in the video) doesn't work with modules. so we need to remove the script type from the html file.

inside the new dist folder we have a new index html file and a new script file with all the code that we wrote (and much more!)

if we change the file the server reloads, but we can do something called **Hot Module Reloading**

```js
if (module.hot) {
  module.hot.accept();
}
```

now changes won't trigger a page reload, this is good for testing and maintaining state, like what we had with the banking app.

module bundlers also allow us to drop the entire path of the node_modules folder when importing packages.

```js
//import cloneDeep from './node_modules/lodash-es/cloneDeep.js'; // not needed
import cloneDeep from "lodash-es";
```

this also allows us to use commonJs modules, and will install the package if we need (didn't happen for me).

```js
import cloneDeep from "lodash";
```

the second way to use parcel is with npm scripts.

in the package json file, we a property called scripts. we can run a script with `npm run <scriptName>`. we add a 'start' script.
we don't even need the 'run' part.

```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "parcel index.html"
  }
```

we can't run parcel from the command line directly, but we can run it as a script.

if we want to run the second part of the build process, we also need to add it to the scripts.

```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "parcel index.html",
    "build": "parcel build index.html"
  }
```

(this didn't work for me, a [parcel2.0 issue](https://github.com/parcel-bundler/parcel/issues/3493))

it should compress the files, both the html and the JavaScript.

we can also install packages globally with the -g flag. so we could use the tool directly, most tools advice to install locally, we could run different versions depending on the project.

```bash
npm install parcel -g
```

</details>

#### Configuring Babel and Poly-filling

<details>
<summary>
Transpiling and poly-filling. using Babel
</summary>

[Babel](https://babeljs.io/)

there are still many browsers that are old and don't support es6. so all code must be transpiled into es5 JavaScript

we can configure it, but we can also use the defaults, babel works with plugins and presets, we can download presets with npm.

if we look at the transpiled code, we won't see any es6 features like arrow functions or string templates.

let's add a class field

```js
class Person {
  #greeting = "Hey";
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting},${this.name}`);
  }
}
```

in the past we would need to add a plugin to allow babel to transpile features into es5 code.

like this code

```js
ShoppingCart.cart.find((el) => el.quantity >= 2);
Promise.resolve("TEST").then((x) => console.log(x));
```

babel can only change ES6 syntax, stuff that can be written in different ways, new features can't be transpiled so easily (like promises, array.find).

for those features, we have poly-filling.

in the past, babel did poly filling out of the box, but currently the require us to import a library for this.

```js
import "core-js/stable";
```

(parcel isn't very stable on my machine)

but polyfill is supposed to create all the methods somehow before transpiling.
we could cherry-pick what we want to polyfill with the import statement

```js
import "core-js/stable/array/find";
```

the final thing we want is the 'regenerator' library

```bash
npm install regenerator-runtime
```

and import it.

```js
import "regenerator-runtime/runtime";
```

which will help us polyfill Asynchronous JavaScript.

all of this might change in the future, because JavaScript is like this.

</details>

</details>

### Writing Clean and Modern JavaScript

<details>
<summary>
How to write better, clear, modern code. different Coding Paradigms (declarative and functional).
</summary>

Readable code

> - Write code so that **others** can understand it.
> - Write code so that **you** can understand it in 1 year.
> - Avoid too 'clever' code and overcomplicated solutions. write the straightforward solution.
> - Use descriptive variable names: **what they contain**.
> - Use descriptive function names **what they do**.

General Code

> - Use the DRY principle (refactor your code).
> - Don't pollute the global namespace, **encapsulate** instead.
> - Don't use _var_.
> - Use Strong type checks (_===_ and _!==_).

Functions

> - Generally, functions should do _only on thing_ (SRP - single responsibility principle).
> - Don't use more than 3 function parameters.
> - use default parameters whenever possible.
> - generally, return the same data type as received.
> - Use arrow functions when they make code more readable.

OOP (Object Oriented Programming)

> - Use ES6 classes
> - Encapsulate data and **don't mutate** it from outside the class.
> - Implement method chaining (fluent interface).
> - **Do not** use arrow functions as methods (in regular objects).

Avoid Nested Code

> - Use early **return** (guard clause)
> - Use ternary (conditional) or logical operators instead of _if_.
> - Use _multiple if_ instead of _if/else-if_.
> - Avoid _for_ loops, use array methods instead.
> - Avoid callback-based Asynchronous APIs.

Asynchronous Code

> - Consume promises with _async_/_await_ for best readability (not _.then()_).
> - Whenever possible, run promises in **parallel** (_Promise.All_)
> - Handle errors and promise rejections (try-catch block, rethrow).

#### Lets Fix Some Bad Code #1

<details>
<summary>
Lets fix bad code with what we learned. part 1.
</summary>

we look at 'clean.js' file. and change the file script location in the html file.

things to change (my opinion)

1. [ ] replace var with const and let.
2. [ ] refactor common code parts
3. [ ] add default parameters.
4. [ ] change function names
5. [ ] use array methods.
6. [ ] push function and other objects onto the object.

var => const and let
add => addExpense
limits => spendingLimits
check => checkExpenses, el => entry, lim=>limit
bigExpense => logBigExpenses,limit=>bigLimit, el=> entry

default parameters

```js
// const addExpense = function (value, description, user) {
//   if (!user) user = "jonas";
const addExpense = function (value, description, user = "jonas") {
  user = user.toLowerCase();
};
```

removing if and using null coalescing, refactoring outside into function

```js
{
  // let lim;
  // if (spendingLimits[user]) {
  //   lim = spendingLimits[user];
  // } else {
  //   lim = 0;
  // }

  const lim = spendingLimits?.[user] ?? 0;
}
{
  // let lim;
  // if (spendingLimits[el.user]) {
  //   lim = spendingLimits[el.user];
  // } else {
  //   lim = 0;
  // }
  const lim = spendingLimits?.[el.user] ?? 0;
}

const getLimit = (user) => spendingLimits?.[user] ?? 0;
```

using enchanted object literals, no need to write property name if it's the same as the value.

```js
// budget.push({ value: -value, description: description, user: user });
budget.push({ value: -value, description, user });
```

using string template instead of _+_, we can also use a ternary operator (which i don't like).

```js
{

  // for (const entry of budget) {
  //   if (entry.value <= -limit) {
  //     output += entry.description.slice(-2) + ' / '; // Emojis are 2 chars
  //   }
  // }

  for (const entry of budget) {
    if (entry.value <= -bigLimit) {
      output += `${entry.description.slice(-2)} / `; // Emojis are 2 chars
    }
}
```

</details>

#### Declarative and Functional JavaScript Principles

<details>
<summary>
Trend towards declarative (not imperative) and functional programing.
</summary>
There is a trend towards declarative and functional programming in JavaScript. there is imperative code and declarative code.

Imperative

> - Programmer explain **"How to do Things"**.
> - We explain the computer every single step it has to follow to achieve a result.
> - Example: step by step recipe of a cake.
> - Code Example:
>   ```js
>   const arr = [2, 4, 6, 8];
>   const doubled = [];
>   for (let i =0; i<arr.length, ++i)
>   {
>     doubled[i]= arr[i]*2
>   }
>   ```

Declarative

> - Programmer explain **"What to do "**.
> - We simply describe the way the computer should achieve a result.
> - The **How** (step-by-step instructions) gets abstracted away.
> - Example: describe the cake, let the person find out on his own.
> - Code Example:
>   ```js
>   const arr = [2, 4, 6, 8];
>   const doubled = arr.map((n) => n * 2);
>   ```

Functional Programming

> - **Declarative** programing paradigm.
> - Based on the idea of writing software by combining many **pure functions**, avoiding **side effects** and **mutating data**.
>   - Side effect: modification(mutation) of any data outside of the function (mutating external variables, logging to the console,writing to the DOM,etc);
>   - Pure function: Function without side effects, does not depend on external Variables, **given the same inputs, always returns the same output**.
> - Immutability: state (data) is **never** modified, state is **copied**, and the copy is mutated and returned.

React and redux are based on functional programming.

we can't be 100% functional programming, but we can use some ideas.

Functional Programming Techniques

> - Try to avoid data mutations
> - Use built-in methods that don't produce side effects.
> - Do data transformations with methods such as _.map()_, _.filter()_ and _.reduce()_.
> - Try to avoid side effects in functions (this isn't always possible, of course).

Declarative Syntax

> - Use array and object destructuring.
> - Use the spread operator _(...)_.
> - Use the ternary conditional operator.
> - Use template literals.

</details>

#### Lets Fix Some Bad Code #2

<!-- <details> -->
<summary>
Lets fix bad code with what we learned. part 2. functional and declarative principles.
</summary>

immutability.
side effects and pure functions
data transformations with builtIn objects.

we can actually make object **immutable** in JavaScript, we do this by calling the function [_Object.freeze()_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).

we should be in strict mode to get a visible error, otherwise, the change just fails.

```js
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
}); //frozen object!
spendingLimits.jonas = 1501; // no effect in sloppy mode! error in strict mode
console.log(spendingLimits);
```

if we freeze the budget array, we can no longer to push into the array, but we can modify the elements inside it, that's because the freeze is a shallow freeze, only on the top level elements.

```js
budget[0].value = 10000; //works
budget[0] = "jjj"; //won't work
```

so now we need to fix the function. the function tries to mutate the array from outside, it's a side effect. an **impure function**.

we should pass all the data into the function, and it shouldn't change function, it should create a copy and modify it.

but now we have a new budget, but what if the condition fails? we need to return the original state

```js
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = "jonas"
) {
  const cleanUser = user.toLowerCase();
  return (value <= getLimit(cleanUser)) ?
    [...state, { value: -value, description,cleanUser}] :
    state;
  }
};
const newBudget1 = addExpense(budget, spendingLimits, 10, "Pizza 🍕");
addExpense(budget, spendingLimits, 100, "Going to movies 🍿", "Matilda");
addExpense(budget, spendingLimits, 200, "Stuff", "Jay");
```

we need to update the getLimits function

```js
const getLimit = (limits, user) => limits?.[user] ?? 0;
```

but now we have two budget objects, so we need to use the updated one.

```js
const newBudget1 = addExpense(budget, spendingLimits, 10, "Pizza 🍕");
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  "Going to movies 🍿",
  "Matilda"
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, "Stuff", "Jay");
```

in the real world we would use composing or currying to create the variable

lets do something with the other functions, the check expenses mutates our data which isn't functional. we want a new object. we use the _.map()_ to create a new object, and we return it. we could make this into an arrow function.

```js
const checkExpenses = function (state, limits) {
  return state.map((entry) => {
    return entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: "limit" }
      : entry;
  });
};
const newBudget4 = checkExpenses(newBudget3, spendingLimits);
console.log(newBudget3, newBudget4); //see that we didn't mutate newBudget3
```

the final function to fix is big expenses, we don't want to print to the console (that's a side effect), and we want to pass the object itself.

we can also use reduce, but it isn't great for this situation.

```js
const bigExpenses = function (state, bigLimit) {
  // let output = "";

  // for (const entry of state) {
  //   if (entry.value <= -bigLimit) {
  //     output += `${entry.description.slice(-2)} / `; // Emojis are 2 chars
  //   }
  // }
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
  const bigExpenses = state
    .filter((entry) => enter.value <= -bigLimit)
    .map((entry) => entry, description.slice(-2))
    .join(" / ");
  const reduced = state
    .filter((entry) => enter.value <= -bigLimit)
    .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, ""); // we have ane extra ' / ' at the start
};
bigExpenses(newBudget4, 1000);
```

</details>
</details>
</details>
