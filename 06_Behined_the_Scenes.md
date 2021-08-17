## How JavaScript Works Behind the Scenes

<!-- <details> -->
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

#### Summary

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

</details>

### fin

<details>
</details>

<!-- </details> -->
