## HTML and CSS Basics

<details>
<summary>
Basic familiarity with HTML and CSS.
</summary>
Javascript runs together with html and css. we should be familiar with some of it.

HTML - hyper text markdown language.  
CSS - cascading style sheet

### Basic HTML classes and structures

<details>
<summary>
How the html file looks like.
</summary>

html files always start with \<html> tag, the rest of the files goes inside. like \<head> and \<body>, with \<title> as page title (inside the header block) and heading \<h1> and paragraphs \<p>.
we can also have \<!DOCTYPE html> above the html tag. and add lang attribute to the html tag itself

elements can be block elements which open a new line, and some are inline elements, which don't.

- html - enclosing tag
  - attribute lang="en"
- head - header block
  - title - the title of the page
  - meta - all sorts of stuff
  - style - write style directly into the html file (don't use)
  - link - link a file, use for css. doesn't create a linkable hypertext.
    - href="style.css" - which file to link
    - rel="stylesheet" - the relation for that file
- body - content block
  - h1,h2,...h6 - headings, from largest to smallest
  - p - paragraph
  - a - anchor, link
    - attribute href="" - the url.
  - img - an image
    - attribute src="" - the image location
  - div - a divisor. a generic box
  - form - a divisor, a box with some intent behind it.
  - input - get input from user.
    - type="text" - what is the type of the input form
    - placeholder="place holder text!!" - place holder text for textual inputs
  - button

</details>

### Attributes, Classes and Ids

<details>
<summary>
Additional properties of html tags.
</summary>
attributes describe how html elements an add data. attributes go inside the opening tag inside quotes. Some elements open a block - they can contain something between the opening and ending tags, and some are just a single tag (like img), so they end with the closing slash / at the same tag.

```html
<img src="imageLocation.jpg" />
<p>some text <a href="linkLocation.html">link text</a></p>
<p class="first" id="id1">first class!</p>
<p class="second">second class!</p>
<h2 class="first">first class as well!</h2>
<div id="your-name">
  <h2>heading</h2>
  <input type="text" placeholder="your name" />
  <button>OK</button>
</div>
```

we can use classes and ids to identify elements in css and javascript.
classes and ids are simply an attribute. classes can be reused, ids must be unique. we should avoid using ids and stick with classes.

we create boxes of element, the most basic box is the \<div> \</div> tags.

</details>

### Basic CSS styling

<details>
<summary>
How to style our web page.
</summary>
we define how our page looks with the css syntax. we write it in a separate file. we link the html to the css file. the syntax is composed from selector and values. some properties are inherited, any element inside the selected element get them as well. some elements have overrides to properties and don't inherit those changes. the headings elements, for example, inherit the font-family from the body style, but not the size. if we want to change them, we need to select them.

some properties are shorthand properties, and can accept multiple values for several properties. we can also set each value individually. most sizes can be specified either in pixels, percentage or other units. colors can be specified with their name or RGB value.

selecting elements

- tags are selected immediately, like "body{}", "h1{}", "p{}", etc...
- classes are selected with the **dot notation** ".first{}"
- ids are selected with the **pound / hash symbol** "#your-name{}"
- the global selector for everything with the **star symbol** "\*{}"
- we can select multiple types of elements with the **comma** "p, h3, .best{}"
- we can select child elements (elements that are nested inside other elements) with a **space separator** "p .name{}", which will select elements of class "name" which are inside a paragraph block.

```css
body {
  background-color: green;
  font-family: Arial;
  font-size: 20px;
}

h1 {
  font-family: 30px;
}
.first {
  color: red;
}

#your-name {
  border: 5px solid rgb(255, 100, 100);
}
```

css and html are a whole issue, and there isn't enough time to cover everything in this short intro.

</details>

### The CSS Box model

<details>
<summary>
The box model defines how elements are displayed and what their sizes are.
</summary>
any html block is a box. it has with and height for the content itself, padding, a border and margin. we can define each of those properties with css.

- content: text, images,etc
- padding: transparent area around the content, still part of the box
- border: goes around the padding and the content
- margin: the space between boxes. outside the box.
- fill area: the outside, the background

if we are going to change those properties, we should first reset everything. we can reset all the properties with the global selector (the star symbol \*).
the [box-sizing property](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing) is for a different time. but in short, it controls how the total height and width are calculated.

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-gox;
}

body {
  padding: 30px;
  margin-bottom: 25px;
}

p {
  text-align: center;
}
```

</details>
</details>
