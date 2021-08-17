## DOM Manipulation and Events Fundamentals.

<details>
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

<details>
<summary>
A demo project for a modal window with an overlay and ui.
</summary>

in this project we will work with classes.

we start by selecting the elements we need and store them as variables.
we used a css class to hide all the modals that sets the property display to none;
we use _document.querySelectorAll()_ to get all the elements matching, not just the first one. then we can loop over all elements.

```js
const one = document.querySelector(".cls");
const all = document.querySelectorAll(".cls");
```

</details>

### Working With Classes on The HTML elements

<details>
<summary>
We can access and manipulate the classes for html elements, and also the styles
</summary>

we can now attach an eventListener to each button element. inside our event handler, we remove the hidden class, by accessing the [classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) and removing a class. we can remove multiple class by passing several names separated with commas. additionally, we could access the style property and change it directly, but it's safer to work with classes.

```js
const modal = document.querySelector(".modal");
modal.classList.remove("hidden"); //no need for the dot
modal.style.display = "block";
```

</details>

### Handling Key Presses

<details>
<summary>
Responding to keyboard event.
</summary>

keyboard events are global events, they don't belong to one element, so we add an eventListener to the document element. we have differnt events of keyboard presses.

- keydown
- keypress
- keyup

we will use 'keydown'.we need to capture the correct key. for this we can access the event object. this is passed in the event function.

```js
document.addEventListener("keydown", function (e) {
  console.log(`a key ${e.key} was pressed down`);
});
```

we can also check for the existence of class inside an element

```js
const modal = document.querySelector(".modal");
if (modal.classList.contains("hidden")) {
  // do something
}
```

</details>

### Project 3: Pig Game

<details>
<summary>
rolling dices until we reach the required score. we can either keep rolling, hold our points or lose all of our points.
</summary>
**//todo:: build a uml like the example.**
A practice project to reinforce our learning. we have a flow chart to better understand the game. this is a more interesting project.

we look at the base condition of the page and we see that it isn't clear, lets reset everything.

we can select elements with querySelector like we did with classes, but we can also use a specialized function.

```js
const score1 = document.getElementById("score--1");
```

this time we also add the css hidden class

```css
.hidden {
  display: none;
}
```

</details>

### Rolling the Dice

<details>
<summary>
Implementing the game logic
</summary>

generate a dice score, update the photo, check the result and act accordingly.

we use math.random and math.trunc to get a number. we make the dice element no longer be hidden (updating the class list) and change the src attribute.
we need to keep the score somewhere

</details>

### Switching the Active Player

<details>
<summary>
Changing between player 1 and 2.
</summary>
we need to know which player is now the active player. use arrays, change displays...
we have a toggle method that adds / removes classes, if exists remove, if not, add it.
</details>

### Holding the current score

<details>
<summary>
Maintain the score when 'hold' is pressed.
</summary>
how to keep the scores across rolls and losses. adding a css winner class. add logic that says the game is still running.
</details>

### Resetting the Game

<details>
<summary>
Resetting the game back to the initial state;
</summary>
both the init and the button use the same function.
array has the .fill() method.
</details>

</details>
