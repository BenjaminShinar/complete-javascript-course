## DOM Manipulation and Events Fundamentals.

<!-- <details> -->
<summary>
Making the language come to life and interact with actual web pages.
</summary>

### Project 1: Guess My Number

<details>
<summary>
A demo project for an interactive page that asks the user to guess a number.
</summary>
we have an html index file, a css file, a .prettierrc file for formatting rules, and an empty js file.
we can select element from javascript just like css with document.querySelector . and then access some properties from the elements, like the text content (textContent). for the first period of this class, we will use this project to learn about javascript.

```js
const msg = document.querySelector(".message");
console.log(msg);
console.log("content is", msg.textContent);
```

</details>

### DOM and DOM Manipulations

<details>
<summary>
Using the code to access and change the html page.
</summary>

**DOM** - Document Object Model: how the html page is represented. it's a tree structure detailing the elements. the root element is called document. this is the entry point. usually, the first element is the html, and generally we have head and body elements. anything in the html must be in the dom. that includes text, attributes, classes, links, etc...

//TODO: add PUML of this structure

the DOM is not part of the javascript language specification from ecmascript, it's part of the _WEB APIs_ that are libraries that are automatically available for us from all browsers.

#### Selecting And Manipulating elements

we aren't limited to getting elements, we can also set the value in them!
as always, we use query selector,

```js
document.querySelector(".message").textContent = "🎉 Correct Number!";
console.log(document.querySelector(".guess").value);
```

we can also make our program listen to events and react to them, this done by events. we select an element and use the _.addEventListener()_ method. we first pass the type of the event, and then the action to be executed, this function is called an event handler.
even though the html form only accepts number (the input type is "number"), we still get it as a string. and we should probably check if it's even defined (not empty).

we need to decide on our game logic.
we first need to define the secret number, which we should do just once. so this should be outside of the handler functions.

#### Manipulating CSS styles.

we can also change css styles with dom manipulations. after all, recall that the dom is the html file, and the html elements can contain inline style. so we can manipulate styles!
css multi words properties (hyphen) are converted to camelCase in javascript. when we change properties, we should use a string with the correct units, such as pixels (px) or whatever rem is(rem).

```js
const body = document.querySelector("body");
body.style.backgroundColor = "#60b347";
document.querySelector(".number").style.width = "30rem";
```

#### Coding Challenge 1

<details>
<summary>
Add the Reset features!
</summary>

> Implement a game reset functionality, so that the player can make a new guess!
> Your tasks:
>
> 1. Select the element with the 'again' class and attach a click event handler
> 2. In the handler function, restore initial values of the 'score' and
>    'secretNumber' variables
> 3. Restore the initial conditions of the message, number, score and guess input fields
> 4. Also restore the original background color (#222) and number width (15rem)
>
> Good Luck

</details>

</details>

### Project 2: Modal Window

### Fin

<details>
</details>
```
