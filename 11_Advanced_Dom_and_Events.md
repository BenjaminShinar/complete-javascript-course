## Advanced DOM and Events

<!-- <details> -->
<summary>

</summary>
further, detailed, in depth look at the DOM.

### Project Introduction

<details>
<summary>
Introducing the class project: the marketing website for our earlier 'bankist' app.
</summary>

we'll be creating the effects, the scrolling, lazy loading, fading, the sticky menu bar, the hover effects, the pop-up, the tabs, the slider, smooth scrolling...

we start by clicking on the _'open account'_, this causes our page to go all the way up. that's because the element is a link (the html \<a> tag with href), and that's the default behavior for it. to stop this from happening we simply t call the prevent default behavior.

and we also replace the for loop with _.forEach_

</details>

### How The DOM Really Works

<details>
<summary>
How the DOM works behind the scenes and how it's organized internally.
</summary>

The DOM is how we interact with the browser.

The DOM:

> Allows us to make javascript interact with the browser.
> We can write javascript to create, modify and delete HTML elements,set styles,classes and attributes, and listen and respond to events.
> DOM tree is generated from an HTML documents, which we can then interact with.
> DOM is a very complex API that contains lots of methods and properties to interact with the DOM tree.

everything in the DOM tree is of type Node, which has child types, like _Element_, _Text_,_Comment_, _Document_.

//TODO: add puml here

Element -> HTMLElement
HTMLElement -> HTMLButtonElement... HTMLDivElement

this possible by using inheritance.

The node type is actually a derived class of _'EventTarget'_ (other subclass is _Window_), which has the _.addEventListener()_ and _.removeEventListener()_ methods.

</details>

### Selecting Creating And Deleting Elements

<details>
<summary>
Manipulating the DOM Tree: selecting, creating, inserting and deleting elements.
</summary>

- _document.documentElement_
- _document.head_
- _document.body_
- _.querySelector(text)_
- _.querySelectorAll(text)_
- _.getElementById(id)_
- _.getElementsByTagName(tag)_ - like 'button', 'p', this returns an **HTML Collection**.
- _.getElementsByClassName(className)_ - also a live HTML Collection.
- _.insertAdjacentHTML(where, html_string)_
- _.createElement(tag)_ - creates an element, but not inserted yet.
- _.prepend(element)_,_.append(element)_ -insert element as first or last child.
- _.cloneNode(cloneInner)_ - a method to clone a node, the parameter controls if we also clone the inner elements.
- _.before(element)_,_.after(element)_ - insert an element as sibling element, either before or after.
- _.remove()_ - remove element from the DOM.
- _.parentElement_ - DOM traversal up.
- _.removeChild(element)_ - the older way of removing elements.

#### Selecting Elements

to get the entire document, we can simply write _'document.documentElement'_, we can also select the _head_ or the _body_.
we can also use the _.querySelector()_ and _.querySelectorAll()_. we can use those methods on sub elements which will search only inside the current elements

an HTML collection, is a live collection,it's updated when things change in the DOM, unlike NodeList, which is static.

```js
const docElement = document.documentElement;
const header = document.head;
const body = document.body;
const allSections = document.querySelectorAll(".section");
```

#### Creating and Inserting Elements

we already used _.insertAdjacentHTML()_, but we can also create elements from scratch

```js
const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent =
//   "We use cookies for improved functionality and analytics.";
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.prepend(message);
header.append(message);
```

the element can't be in two places at the same time, so if we append it and then prepend, the element actually moves.

if we want the element in two place, we can clone it.

```js
header.prepend(message);
header.append(message.cloneNode(true));
```

#### Deleting Elements

```js
document
  .querySelector(".btn--close-cookie")
  .addEventLister("click", () => message.remove());
```

</details>

### Styles, Attributes and Classes

<details>
<summary>
Setting styles, Attributes, data Attributes and class by code.
</summary>

#### Styles

we get the element, _.style_ and the the property in camelCase. the value must be string, and with proper units.
these are now **inline style**

```js
message.style.backgroundColor = "#37383d";
message.style.width = "120%";
```

we can read styles only if they are inline styles from the html or that we set from the code, this can't get a style from the class through the object css, or if the style was created as part of creating an element via code.

if we want to get the class style,we can call _getComputedStyle(element)_, which will return us all the properties.
if we want to use the properties, we might need to parse them from a string into an number, and then turn back into a string if we want to use it for a different element's style.

```js
console.log(getComputedStyle(message).width);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + "px";
```

css custom properties are like variables.
they are defined in the css file under the root element

```css
:root {
  /* properties */
}
```

if we want to access it from code, we call the _.getPropertyValue(propertyName)_ and _.setProperty(propertyName,value)_ methods.
again, the get method will only work for inline styles or those who were set by DOM manipulation in the code.

```js
document.documentElement.style.setProperty("--color-primary", "orangered");
```

this works for all other elements, we can call setProperty with the property name and value.

#### Attributes

stuff like img src,alt, href and other stuff. mostly what's inside an HTML tag and has an _equal =_ sign after it.

```js
const logo = document.querySelector(".nav__logo");
console.log(logo.alt, logo.src);
```

if we add a custom attribute, we won't be able to read it with the dot notation.but we can use the _.getAttribute(attributeName)_ method. we can set them with either the dot notation for standard attributes or _.setAttributes(attributeName,value)_ for non standard.

if we want the css class, we need to use 'className' attribute, this is for historical reasons.

```html
<img
  src="img/logo.png"
  alt="Bankist logo"
  class="nav__logo"
  id="logo"
  designer="Beny"
  data-version-number="3.0"
/>
```

```js
const logo = document.querySelector(".nav__logo");
console.log(logo.designer); //undefined
console.log(logo.getAttribute("designer")); //finds
```

if we look at the url,in the html file the _src_ is relative, but in the code it's absolute. to get the relative value we use the _.getAttribute()_ method, this is true also for _href_ links.

there also data attributes, which are special attributes that start with "data". they stored at a special attribute called 'dataset',and then we access it with camelCase instead of hyphens (_dash -_).

```js
console.log(logo.dataset.versionNumber);
```

we use those data attributes when we store data from the user in the UI.

#### Classes

as we saw before:

```js
const classExample = "beny__cls";
logo.classList.add(classExample, "other__class");
logo.classList.remove(classExample);
logo.classList.toggle(classExample);
logo.classList.contains(classExample);
```

we could also set the class name with the _className_ attribute, but that means overwriting all of them.

</details>

### Implementing Smooth Scrolling

<details>
<summary>
Moving the viewport from place to place.
</summary>
when we click on 'learn more', we want to smoothly scroll to the correct location.

the old-school way:
we select the button and where we want to scroll to

_.getBoundingClientRect()_ - gets the element rectangle in relation to the viewport.

document.documentElement.clientHeight
document.documentElement.clientWidth

we use _window.scrollTo()_ of the global window object to move somewhere. it takes global positioning, so we need to modify the relative values in accordance to the viewport.

if we want smooth scrolling, we pass an object with _{left, top,behavior}_

```js
const scrollButton = document.querySelector(".btn--scroll-to");
const section1 = document.getElementById("section--1");
scrollButton.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect(); //x,y,height,width
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  //window.scrollTo(s1coords.left, s1coords.top); //not good, relative to the view port!
  //window.scrollTo(s1coords.left, s1coords.top + window.pageYOffset); //correct location, not smooth

  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: "smooth",
  });
});
```

the modern way to do so is to call the _.scrollIntoView(obj)_ method. which saves us the need to do weird calculations.

```js
section1.scrollIntoView({ behavior: "smooth" });
```

</details>

### Events

<details>
<summary>
Events are triggered by actions (clicking, scrolling, pressing keys...) and fire a behavior. we control the behavior with event listeners.
</summary>

#### Types of Events and Events Handlers

<details>
<summary>
Different kinds of events, adding and removing event listeners.
</summary>
an event is a signal generated by the Node on the DOM, we listen to these events with an eventListener.
we already worked with the some events, mostly 'click', but lets have some more events.

[Events](https://developer.mozilla.org/en-US/docs/Web/Events), by type, source, some are based on the element type.

we can also attach events with the dot notation. which starts with _on_ before the event name, but that is the old way of doing things.

```js
const h1 = document.querySelector("h1");
h1.addEventListener("mouseenter", function (e) {
  alert("h1 mouse enter!");
});
h1.onmouseenter = function (e) {
  alert("h1 mouse enter!");
};
```

we use the new notation because it allows us to add more than one function, and it allows us to add and remove individual functions (they must be named, not declared inside the _.addEventListener()_ method)

we can remove events from other events, with timeouts, etc...

```js
const foo = (e) => {
  console.log(this);
};
const foo = (e) => {
  console.log(e.target, e.type, this);
};
h1.addEventListener("mouseenter", foo);
h1.addEventListener("click", foo);
h1.addEventListener("click", function (e) {
  h1.removeEventListener("mouseenter", foo);
});
setTimeout(() => {
  h1.removeEventListener("mouseenter", foo);
  h1.removeEventListener("click", foo);
}, 5000);
```

another way for events is by using html Events, the callback is written directly into the html code. this is very old way of doing things, and doesn't scale well at all.

```html
<h1 onclick="alert('html alert')">text</h1>
```

</details>

#### Events Propagation: Capturing and Bubbling

<details>
<summary>
How events travel across element in the DOM tree.
</summary>
there are stages of events, capturing ,target and bubbling

example:

```html
<html>
  <head></head>
  <body>
    <section>
      <p>a text with a <a> link </a></p>
    </section>
  </body>
</html>
```

when an event is fired, the event is generated at root element of the documents, the event is passed through the tree, passing any parent element of the target element this is the _capturing phase_. once we reach the target, we begin the _target phase_, and the event listener fires, and now we go back up the tree, in the _bubbling phase_. this means that the same event happens on the parent elements as well.
So if we click on our _anchor_ element, the click event also happens for the _p_,_section_,_body_, and _html_ elements, in that order.

by default, events are handled in the target and bubbling stages, but there are ways to listen to events on the capturing stage as well. and not all events have capturing and bubbling stages, some are created on the target.

</details>

#### Events Propagation in practice

<details>
<summary>
We will use events propagation in our projects on the top bar navigation.
</summary>

we take the _.nav_ and _.nav\_\_links_ and _.nav\_\_link_ elements and add the same on click event for them, which changes their color randomly on click.

```js
const randomColor = () => {
  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
  const randomPart = randomInt.bind({}, 0, 255);
  return `rgb(${randomPart()},${randomPart()},${randomPart()})`;
};

console.log(randomColor());

const eventPropagation = function () {
  document.querySelectorAll(".nav__link").forEach((e) =>
    e.addEventListener("click", function (e) {
      this.style.backgroundColor = randomColor();
      console.log(e.target);
    })
  );

  document.querySelector(".nav__links").addEventListener("click", function (e) {
    this.style.backgroundColor = randomColor();
    console.log(e.target);
    e.stopPropagation(); //stop propagation!
  });

  document.querySelector(".nav").addEventListener("click", function (e) {
    this.style.backgroundColor = randomColor();
    console.log(e.target, e.currentTarget);
  });
};
eventPropagation();
```

if we fire the event on the inner elements, the same event happens on th parents as well

we can see the place where the event happened by checking the _event.target_, which will show where the event originated, and _e.currentTarget_ which shows who is currently handling the event, which is the same as the _this_ keyword.

we can stop the event propagation, but we shouldn't use it in practice.

```js
e.stopPropagation();
```

addEventListener default behavior is for the bubbling phase, if we want to act on the capturing element, **we set the third argument to be true**, and now will fire on the capturing phase instead. if we add the stopPropagation, the event won't continue down the tree.

```js
document.querySelector(".nav__links").addEventListener(
  "click",
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log(e.target);
    e.stopPropagation(); //stop propagation!
  },
  true
);
```

</details>

#### Event Delegation: Implementing Page Navigation

<details>
<summary>
rather than create the same event handler on many elements, we can create it on a parent element and get the origination element from the event to perform the action.
</summary>

implement smooth scrolling again.
we need to anchor to get the element. so we take the attribute from the calling object and then match the id.

```js
document.querySelectorAll(".nav__link").forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const id = this.getAttribute("href");
    const section = document.querySelector(id);
    section.scrollIntoView({ behavior: "smooth" });
  });
});
```

the problem is that we are attaching the same callback function to each of the elements, if we had a lot of buttons, we would create the same function many times.
we get around this by exploiting event propagation, and we attach the callback to the parent elements instead.

1. Add event listener to common parent element.
2. Determine what element originated the event.

```js
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  //matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    const section = document.querySelector(id);
    section.scrollIntoView({ behavior: "smooth" });
  }
});
```

</details>
</details>

### DOM Traversing

<details>
<summary>
Accessing elements relative to a current element in the DOM. we can access child elements, parent and even siblings
</summary>

DOM traversing it like walking through the DOM, we can use it to find parent/child/siblings elements, even those that were created dynamically.
almost everything we can do on the document element, we can do with the nested elements.

- _.childNodes_ - any type of **nodes** inside.
- _.children_ - a live collection of direct children **elements**.
- _.firstElementChild_, _.lastElementChild_ - select the first or last child **elements**.
- _.firstChild_, _.lastChild_ - select first or last child **nodes**.
- _.parentNode_ - direct parent **node**.
- _.parentElement_ - direct parent **Element**.
- _.closest(query)_ - match the closest parent **element** for this query. will match itself.
- _.previousElementSibling_, _.nextElementSibling_ - match prev/next sibling **element**.
- _.previousSibling_, _nextSibling_ - match prev/next sibling **node**.

we will do some examples with the h1 element.

```html
<h1>
  When
  <!-- Green highlight effect -->
  <span class="highlight">banking</span>
  meets<br />
  <span class="highlight">minimalist</span>
</h1>
```

we start from our H1 element and look around it.
we can call querySelector on it, just like with the html document elements. this will give us children elements matching the query, at any level (direct or indirect).

```js
const h1 = document.querySelector("h1");
//children
const highlightedChildrenAtAnyLevel = h1.querySelectorAll(".highlight");
console.log(highlightedChildrenAtAnyLevel);
console.log(h1.children, h1.childNodes);
console.log(h1.firstElementChild, h1.lastElementChild);
console.log(h1.firstChild, h1.lastChild);
```

we can go upwards as well and take the parent. we can take the direct parent, or find the closest parent matching a query. the element itself can also be matched.

```js
//parents
console.log(h1.parentElement, h1.parentNode);
console.log(h1.closest(".header"));
console.log(h1 === h1.closest("h1")); //matches self
h1.closest(".header").style.background = "var(--gradient-secondary)";
```

we can also match for siblings (direct), we can take all siblings (including self) by moving up level and taking the children. we can spread the elements into an array to iterate over them,filter out the current one and apply some callback function to the other.

```js
console.log("prev element", h1.previousElementSibling);
console.log("next element", h1.nextElementSibling);

console.log("prev node", h1.previousSibling);
console.log("next node", h1.nextSibling);
console.log("all siblings (including self", h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.transform = "scale(0.5)";
  }
});
```

we use our css properties by addressing them with **var(css-custom-property-name)**

```css
.btn:hover {
  background-color: var(--color-primary-darker);
}
```

</details>

### Building A Tabbed Component

<details>
<summary>
Tab components have tabs, and when the tabs are clicked, the content changes. we use event delegations.
</summary>

we will add this behavior for our projects.
this is 'operations' section in the html, including the 'operations\_\_tab-container' class, the the content elements 'operations\_\_content--1' with the 'operations\_\_tab--active' class.

we do the same thing as before, by attaching an eventListener handler to the container tab parent tab and using event delegations.
the problem is the element button has inner elements, which don't have the same structure, so if we click them, the button isn't what firing the event. so we need to use our dom traversal skills.
it's better to use the _.closest()_ method than the _.parent_ property, and if we don't find a match, just ignore it (have a guard clause).

we need to change the css classes for the tabs (make the current tab stand out), and the content(show the correct content)

```js
//tabbed component
const tabContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");

tabContainer.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".operations__tab");
  if (clicked) {
    const tabActive = "operations__tab--active";
    const contentActive = "operations__content--active";
    tabs.forEach((tab) => tab.classList.remove(tabActive));
    tabsContent.forEach((content) => content.classList.remove(contentActive));
    clicked.classList.add(tabActive);
    tabsContent[Number(clicked.dataset.tab) - 1].classList.add(contentActive);
  }
});
```

</details>

### Passing Argument To Event Handlers

<details>
<summary>
How to pass extra arguments other than the event into the handling function: manually calling and binding.
</summary>
adding effects to the section links. when we hover over one, the reset are faded out.

we know we should do event delegation, so we use the _.nav_ element. we use the 'mouseover' event, which has the corresponding event of 'mouseout'. we then refactor the code outside, we need the event and the opacity. now we need to call the new function,and pass the event and the opacity value.

```js
const nav = document.querySelector(".nav");
const handleHover = function (e, opacityValue) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    //console.log(link);
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = opacityValue;
      }
    });
    logo.style.opacity = opacityValue;
  }
};

nav.addEventListener("mouseover", function (e) {
  handleHover(e, 0.5); // option 1 - call manually
});
```

we can use the callback function to call the new function manually, or use _.bind_ method to create a new function
where the _'this'_ keyword contains the data (the opacity)

```js
const handleHoverBind = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    //console.log(link);
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseout", handleHoverBind.bind(1));
```

</details>

### Implementing Stick Navigation

<details>
<summary>
Implementing behavior for scroll event
</summary>

Implementing 'sticky' navigation, the menu bar becomes attached to the top of the page when scrolling down, and behaves normally when inside the regular view.

it's defined as a css class that changes the position attribute to _fixed_.

```css
/* nav and stickly class at the same time */
.nav.sticky {
  position: fixed;
  background-color: rgba(255, 255, 255, 0.95);
}
```

so, our event listener will somehow know when the element is in view and when not.
we first use the _'scroll'_ event of the window object. it's not efficient, because it fires at each scroll.
we want to add sticky class when we go past the value and remove it when we're inside

```js
const initialCoords = section1.getBoundingClientRect();
window.addEventListener("scroll", function (e) {
  console.log();
  if (window.scrollY > initialCoords.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});
```

this will cause many events to fire, especially with mobile or older browsers.

</details>

### The Intersection Observer API

<details>
<summary>
The API allows the code to listen to events that happen when one element intersects with another element or the viewport.
</summary>

The [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) is a better way to implement stick navigation in our project.

we first create an object with a callback function and options.

the options contain a root element, null means the entire viewport. threshold is a percentage,at which percentage the callback is invoked. we can also pass an array of thresholds.
there is also rootMargin (which must be pixels or percentage)
whenever the thing we observe intersects the root object at that threshold (up or down), the function is called. the function has two parameters, _entries_ and the _observer_

we have the intersection Ratio, which is about the threshold, and the _isIntersecting_ property.
we want to be sticky when the header is out of view completely.

```js
const observer = new IntersectionObserver();
```

this is more efficient than the scroll event, because it only fires in relation to the observed object.

the threshold is about the percentage of the observed element which is visible. if zero, then we always get that _'isIntersecting'_ is true..

#### Revealing Elements on Scroll

<!-- <details> -->
<summary>

</summary>

<!-- </details> -->

</details>
