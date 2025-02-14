<!--
//cspell::ignore forkify
 -->

## Forkify App: Building a Modern Application

<details>

<summary>
The final project of the course, bringing everything together.
</summary>

an application for recipes and ingredients.

[live demonstration](https://forkify-v2.netlify.app/)

### Project Planning and Overview

<details>
<summary>
Going over the features of the app, following the project planning cycle.
</summary>

we have a search bar, search results (with pages for search results (pagination))
a recipe shows up when we click, we can play with the number of servings for each recipe, we can save recipes as bookmarked (and un-bookmark it). we can add recipes, all recipes are only visible to the person who added them, personal recipes are attached to a developer.

Project planning stages

1. User stories
2. Features
3. Flowchart
4. Architecture
5. Development

User Stories - "As a \[type of user], I want \[an action] so that \[a benefit]".

> - "as a user, i want to **search for recipes**, so that I can find new ideas for meals."
> - "as a user, i want to be able to **update the number of servings**, so that i can cook a meal for a different number of people."
> - "as a user, i want to **bookmark recipes**, so that I can review them later."
> - "as a user, i want to be able to **create my own recipes**, so that I can have them all organized in the same app"
> - "as a user, i want to be able to **see my bookmarks and my own recipes when I leave the app and com back later**, so I can safely close the app."

features:

1. Search functionality:
   1. Input field to send request with to API with searched keywords.
   2. Display results with pagination.
   3. Display recipe with cooking time, servings, and ingredients.
2. Change serving functionality.
   1. Update all ingredients according to the current number of servings.
3. Bookmarking functionality.
   1. Display List of all bookmarked recipes.
4. User can upload own recipes
   1. User recipes are automatically bookmarked
   2. User can only see their own recipes, not recipes from other users.
5. Data persistency
   1. Store bookmark data in browser using local storage
   2. on page Load, read saved bookmarks from local storage and display.

flowchart:
(We start with search, pagination, and displaying)

we work with events and user actions.
user searches, user clicks page, user selects, page loads

![flowchart-1](18-forkify/starter/forkify-flowchart-part-1.png)

we need to re-render the buttons when they are clicked, so they only show proper actions. we want the url to change properly, and for it to reflect the recipe id.

we can start with the display part without getting settled on the architecture yet.

</details>

### Loading a Recipe from An Api

<details>
<summary>
Getting a recipe from the api.
</summary>

Our first task is to set up the project and display the recipes. we can see that this time, all the files are inside a "src" folder. the html file is also quite large

"sass - Syntactically awesome style sheets. "
similar to css.

parcel also transforms scss into css.

we need to initialize the new project

```shell
npm init
```

we change the entry point to index.html and we set the npm scripts

```json
  "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html"
  },
```

we need to install parcel, lets take version 2.0 and it's dependencies.
(I had to change "main" to "default" in package.json)
we might want to run npm install to get dependencies like sass.

```shell
npm i parcel@2 -D
mpm install
npm run start
```

now we have all the files inside the _dist_ folder, with the generated names and stuff. all the images were copied and had their names change. however, we keep developing in the src folder, and the module bundler does the work of putting them together.

we can start with the controller.js file. lets add a log to console to verify it's really the correct file, and then we can start doing API calls.

we will use a [special api](https://forkify-api.herokuapp.com/v2) that was set up for this project. we can look at the documentation.

there are limited search queries and limited api calls per hour.

lets take one recipe.

https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886

and make an async wrapper fetch function for it. don't forget to await the promises and check the response status.

```js
const showRecipe = async function () {
  const testRecipeUrl =
    "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886";
  try {
    const res = await fetch(testRecipeUrl);
    if (!res.ok) {
      throw new Error(`${data.message} ${res.status}`);
    }
    const data = await res.json();
    console.log(res, data);
  } catch (err) {
    console.error(err);
    //alert(err)
  }
};
showRecipe();
```

we'll take the object and Reformat it.

```js
const { recipe: recipeData } = data.data;
const recipe_formatted = {
  id: recipeData.id,
  title: recipeData.title,
  publisher: recipeData.publisher,
  sourceUrl: recipeData.source_url,
  image: recipeData.image_url,
  servings: recipeData.servings,
  cookingTime: recipeData,
  servings: recipeData.servings,
  ingredients: recipeData.ingredients,
};
console.log(recipe_formatted);
```

lets try with another id to see that everything is ok.

</details>

### Rendering the Recipe

<details>
<summary>
Rendering the recipe on the html, adding some dependencies and solving whatever problems emerge.
</summary>

We will look at the html file to see how we ant a recipe to render as an html.

we will need function that takes a recipe and renders the markup from the template literals. we start with the simple stuff to replace, we will get to the ingredients lists later.

we then need to insert our newly created html into the DOM

```js
const markup = renderRecipe(recipe_formatted);
recipeContainer.insertAdjacentHTML("afterbegin", markup);
```

i had a problem with the image not showing, so looking the forums I found that i should add _crossorigin_ to the img element.

```html
<figure class="recipe__fig">
  <img
    src="${recipe.image}"
    alt="${recipe.title}"
    class="recipe__img"
    crossorigin
  />
  <h1 class="recipe__title">
    <span>${recipe.title}</span>
  </h1>
</figure>
```

we still have the message from the beginning and we are missing the icons.

to fix the make it not show,we should clean the container before inserting

```js
const markup = renderRecipe(recipe_formatted);
recipeContainer.innerHTML = "";
recipeContainer.insertAdjacentHTML("afterbegin", markup);
```

for the ingredient, we would need to loop over the them and create a list item for each.

```js
 ${recipe.ingredients.map(ing => {
     `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="src/img/icons.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing?.quantity ?? ''}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>`
 }).join('')}
```

the next part is to fix the missing icon. the problem is that the icons are pointing to a path inside the src/img folder, which doesn't exist in the distributed files.

```html
<svg>
  <use href="src/img/icons.svg#icon-minus-circle"></use>
</svg>
```

to fix this, we need to tell parcel to import the folder. in parcel version 1 it was simply an import statement. in parcel version 2 the syntax is a bit different for static assets

```js
import icons from "../img/icons.svg"; //Parcel v.1
import icons from "url:../img/icons.svg"; //Parcel v.2
console(icons);
```

(I had to add type="module" to the html file script tag)

and then we replace all instances of "src/img/icons.svg" with "${icons}"

and for a final touch, we want a loading spinner to appear until the img loads. we can look at the css and html to see how it works.

the last thing we do is add poly-fill packages

```shell
npm i core-js regenerator-runtime
```

```js
import "core-js/stable";
import "regenerator-runtime/runtime";
```

</details>

### Listening for Load and HashChange Events

<details>
<summary>
Listening to hash change and responding to it.
</summary>

let's add some event handlers,lets pretend that we have a search list that we can use.
when we click on a recipe, we would want to render it. each recipe has an id which is a hash (that shows up on the url).

we first need a way to trigger the hash, lets create a fake one.

```html
<div class="search-results">
  <a href="#5ed6604691c37cdc054bd0c0">Recipe 1</a>

  <a href="#5ed6604591c37cdc054bc886">Recipe 2</a>
</div>
```

we need to listen to this event, and take the has from the window object

```js
window.addEventListener("hashchange", () => {
  const hash = window.location.hash.slice(1);
});
```

if we want to open a recipe based on a url, (copy the address and go to it), so we want to listen to a page load event.
we can do a mapping to add the event in a more efficient way

```js
//window.addEventListener("load", showRecipe);
["hashchange", "load"].forEach((e) => window.addEventListener(e, showRecipe));
```

when we don't have any id from the hash (on page load), so we need a guard clause.

```js
if (!id) return;
```

</details>

### MVC

<details>
<summary>
We now start talking architecture.
</summary>

why do we even need architecture?

> - Structure - how we organize and divide the code.
> - Maintainability - a project is never done, we need to be able to change it easily in the future
> - Expandability - we might want to add new features in the future.

we can create something from scratch, but it only works for small scale projects. for serious stuff, we can use a well established architecture pattern, such as...

> - MVC - model view controller.
> - MVP - model view presenter
> - Flux - (what facebook does)
> - or many more.

we can also use a framework to take care of the architecture, like react, angular, vue, etc...

nearly all architecture patterns have the following components

1. Business logic.
   - code the solves the actual business problem.
   - directly related to what business does and what it needs.
2. State.
   - Essentially stores all the data about the application.
   - Should be the "Single source of truth".
   - UI should be kept in sync with the state
   - There are state libraries.
3. Http library.
   - Responsible for making and receiving Ajax requests.
   - Optional but almost always necessary in real-world apps.
4. Application logic (router).
   - Code that is only concerned about the implementing of the application itself.
   - Handles navigation and UI events
5. Presentation logic (UI layer).
   - Code that is concerned about the visible part of the application.
   - essentially display application state.

a good architecture separates these components.

#### MVC - Model View Controller

<details>
<summary>
What The MVC pattern is.
</summary>

Model - Application data, sate and business logic, also the http library.
View - Presentation logic.
Controller - Application logic. bridge between the model and the view.

the mvc pattern dictates that the model and the view should be independent, and never know about each other.

a typical flow of data
user clicks -> controller (application logic) -> might involve updating the user interface in the view layer, and might involved get data from the model. when the model performs the task, it tells the controller, which then tells the UI to update.

we have data flow channel (passing data) and function call channel. only the controller initiates function calls on the other two components. it dispatches tasks to the others. the model and the view don't import the controller, and they are unaware of it.

in our app, the user selects a recipe (or the page loads with a recipe Id), these events are handled by the controller, which calls the model to perform an http request. when the data arrives, the controller takes the data and passes it to the view layer to render it.

![MVO implementation](18-forkify/starter/forkify-architecture-recipe-loading.png)

we have two modules (the model and the controller) and the recipeView class. the controller handles the events, while the model exports the state and other functionalities.

</details>

#### Refactoring for MVC

<details>
<summary>
Splitting into different files, creating methods, thinking about hierarchies and building blocks for the future.
</summary>

we start by creating the new files. we have controller.js, and we add model.js and we need some views, lets create a folder for them, and start with recipe view.js.

one controller, one model, but several views. we could split up the controller, and the model, but for this scale of project, it's ok.

with start with the model, it's a module by itself. it should have a state that we export and a function to load recipes.

```js
export const state = {
  recipe: {},
};

export const loadRecipe = async function () {};
```

we refactor our old code that is related to getting the recipes from the server. we need to import those changes into the controller.

```js
import * as model from "./model.js";
```

if our model returns a promise, we need to await it, and we shouldn't forget the error handling!

```js
await model.loadRecipe(id);
```

we check that everything is ok, and then we move to the view.
lets start with a new class, we eventually would want a parent class of view.
we need to decide what to export, rather than export the class itself , we will export default a new recipe;

```js
class RecipeView {}
```

but because we create the class in module and export it, we can't pass data to it in the constructor. instead, we create a 'render' method. which is simply the earlier code. we also need to move the icons import

```js
recipeView.render(model.state.recipe);
```

we want the render method to eventually move up to the base class, and then override the 'generateMarkup()' method for each subclass. we create some small functions for utility, and we move the render spinner into the view. we will have render and renderSpinner methods on all of our views.

we need to move the import of the icons and fix the path.

a final change is for the number we are working with real quantities, so we want 1 1/2 instead of 1.5.
we will use an external package for this.

[fractional](https://www.npmjs.com/package/fractional)

```bash
npm install fractional
```

this library uses common.js form.

```js
import { Fraction } from "fractional";
```

</details>

#### Helpers and Configuration Files

<details>
<summary>
files that hold common functionality and constant variables.
</summary>

helper files and configuration modules.
we create a new file 'config.js', which are constant and reused across many modules.
we can put the api URL in there and then import what we need in each file.

```js
export const API_URL = `https://forkify-api.herokuapp.com/api/v2/recipes`;
```

we also want a module that are we used all across the project 'helpers.js'. we first have a getJson function.
we need to think about the error handling, though. (we rethrow the error up the call stack).

we still need an _await_, because we are calling an asynchronous function.

```js
export const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message} ${res.status}`);
    }
    return data;
  } catch (err) {
    console.error(`${err} 💥💥`);
    throw err;
  }
};
```

we also add a timeout for the getJSON call. we make it into a race using _Promise.race([])_.

```js
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(5)]);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message} ${res.status}`);
    }
    return data;
  } catch (err) {
    console.error(`${err} 💥💥`);
    throw err;
  }
};
```

the number of seconds for timeout can also go into the config file.

</details>

#### Event Handlers in MVC: Publisher-Subscriber Pattern

<details>
<summary>
The publisher-subscriber design pattern, adding event handlers at startup.
</summary>

listening and handling events in mvc using the publisher subscriber pattern.

we are currently listening for events in the controller. but events that belong to the DOM should be related to the view, right? but the callback function is definably part of the controller, how can we solve this conflict?

> - Events should be **handled** in the **controller** (otherwise we have application logic in the view).
> - Events should be **listened for** in the **view** (otherwise we would need DOM Elements in the controller).

the publisher-subscriber design pattern is a solution for this. the UI view element is the publisher,and the controller module is the subscriber. the publisher doesn't know that the subscriber exists and how it's implemented. we do this with an 'init' function of the controller.

```js
//in the view
addHandlerRender = function (handler) {
  ["hashchange", "load"].forEach((e) => window.addEventListener(e, handler));
};
//in the controller
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
```

later we will have more handlers.

now we have a good start of a structure for the architecture.

</details>

</details>

### Implementing Error and Success messages

<details>
<summary>
Displaying the error to the user
</summary>
rather than just log the  error, we might want to display it in the view.

the correct place to handle the error should be in the view, not the model.

we already have an html element for errors.

```html
<div class="error">
  <div>
    <svg>
      <use href="src/img/icons.svg#icon-alert-triangle"></use>
    </svg>
  </div>
  <p>No recipes found for your query. Please try again!</p>
</div>
```

lets add a renderError function for it.

```js
  renderError(msg) {
    const markup = `<div class="error">
  <div>
    <svg>
      <use href="${icons}#icon-alert-triangle"></use>
    </svg>
  </div>
  <p>${msg}</p>
</div>`;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }
```

we think the error should know the displayed message. lets change it to a default value.

lets's also create a render message function, we will use it in the future.

</details>

### Search Functionality

<details>
<summary>
adding the search functionality modules: the search box and the results.
</summary>

we want to allow the user to search for recipes,
we need to work on the model, the view and the controller.

we start with the api call in the model, let's take a look at the data.
we need an async function, and we shouldn't forget about awaiting it!

this part in the model.

```js
export const loadSearchResults = async function (query) {
  const searchRecipesUrl = `${API_URL}/?search=${query}`;
  try {
    const data = await getJSON(searchRecipesUrl);
    state.searchResults.query = query;
    state.searchResults.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
```

and a corresponding part in the controller,

and we need also views, one for the search box and one for the results.

```js
class SearchView {
  //...
}

export default new SearchView();
```

we need the query from the html, and add the handler for submit, and we should prevent the default behavior.

```js
  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
  getQuery() {
    return this.#parentElement.querySelector('.search__field').value;
  }
```

to render the results, we would need a new view for the results, this view is quite similar to the recipe view, so it's time to refactor the common parts into a base class.

but the way JavaScript works, we can't yet use private fields and methods in the base case.

some long session of debugging, but stuff works.
(parentheses are awful)

let's also add the hot module reloading to make our data persistance while working.

```js
if (module.hot) {
  module.hot.accept();
}
```

lets display an error if the data is empty

```js
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();    this._data = data;
    this._clear();
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
```

</details>

### Implementing Pagination

<details>
<summary>
creating pagination navigation for results, adding buttons, finding the correct case... 
</summary>

we currently display all results, but we want to only display them in chunks of ten.

the controller tells the view to render the results.

we start in the model module

```js
export const getSearchResultsPage = function (page) {
  const start = (page - 1) * state.searchResults.resultsPerPage;
  const end = page * state.searchResults.resultsPerPage;
  return state.searchResults.results.slice(start, end);
};
```

and now we pass only what we wanted in the controller.

```js
const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return; //guard clause
    ResultsView.renderSpinner();
    await model.loadSearchResults(query);
    ResultsView.render(model.getSearchResultsPage(1));
  } catch (err) {
    ResultsView.renderError();
  }
};
```

(we needed a refresh)
we also add the page to the state and use it as a default

now we need the pagination buttons and behavior.

we have different scenarios:
on page 1 - only show the next button, and don't show if there are no more search results
other pages - show prev, and next
last page, only show last page.

lets make new view PaginationView. we set the parent element and create the \_generateMarkup() method.
scenarios

1. page 1, and there no more results
2. page 1, and there are more results
3. page n, there are no more results (last page)
4. page n, there are more results

we build the logic to add buttons in the view, and the next part is to add the eventHandlers. we use event delegations

```js
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return; //guard
      handler(btn);
    });
  }
```

we use the dataset attribute on the html button,

```html
<button data-goto="${page}" class="btn--inline pagination__btn--${direction}">
  <svg class="search__icon">
    <use href="${icons}#icon-arrow-${arrow}"></use>
  </svg>
  <span>Page ${page}</span></button
>;
```

</details>

### Project Planning II

<details>
<summary>
Taking a break to see what still needs to be done.
</summary>

we made some good progress so far, now lets consider the next step.

lets look at the features list, we already completed some of them.

- [x] Search functionality
- [x] Results with pagination
- [x] Display recipe
- [ ] Change servings
- [ ] Bookmarking
- [ ] Store and load bookmarks
- [ ] Create recipes.

let's update the diagram

![architecture-2](18-forkify/starter/forkify-flowchart-part-2.png)

</details>

### Updating Recipes Servings

<details>
<summary>
Updating the servings sizes Logic
</summary>

updating recipes servings.

our outline is the same as before, the controller function will be executed when the user clicks on the model. the control will update the recipe servings and call the render method again. the data is manipulated in the model itself.

```js
export const updateServings = function (newServings = state.recipe.servings) {
  const factor = newServings / state.recipe.servings;
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity *= factor;
  });
  state.recipe.servings = newServings;
};
```

now we need to update the handler inside the the recipeView with event delegation

```js
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--tiny');
      if (!btn) return;
      handler(Number(btn.dataset.updateTo));
    });
  }
```

we just need to know where the servings number is coming for. we would like the view to tell us this. we simply add the dataset attribute, just like before. the "data-update-to" is accessed by "dataset.updateTo", the hyphen turns into camelCase.

```html
<button
  data-update-to="${this._data.servings + 1}"
  class="btn--tiny btn--update-servings"
>
  <svg>
    <use href="${icons}#icon-plus-circle"></use>
  </svg>
</button>
```

we need to control the zero servings case. we do this in the view.

now we just need to take care of the flickering image. the problem is probably that each update needs to render everything, so our next step is only to render changes.

</details>

### Developing a DOM Updating Algorithm

<details>
<summary>
An algorithm to only update the parts that changed rather than the entire DOM.
</summary>

only update the dom where it changes. don't reload the entire view. we want to avoid unnecessary work, let's have a new method in the view base class.
we will generate the same markup, but instead of rendering all of it, we will compare it to the existing markup and simple update what's needed

```js
update(data) {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return this.renderError();
  }
  this._data = data;
  //this._clear();
  const markup = this._generateMarkup();
  const newDOM = document.createRange().createContextualFragment(markup);
  const newElements = Array.from(newDOM.querySelectorAll('*'));
  const currentElements = Array.from(this._parentElement.querySelectorAll('*'));
  console.log(currentElements, newElements);
  newElements.forEach((newEl,i)=>
  {
    const currentElement = currentElements[i];
    console.log(currentElement,newEl.isEqualNode(currentElement));
  });
}
```

we use the newly created DOM as a virtual dom (like the document itself).

we take all the elements from the virtual DOM and from the real DOM element and compare them with the _.isEqualNode()_ method. this almost works, but not quite.

```js
newElements.forEach((newElement, i) => {
  const currentElement = currentElements[i];
  if (!newElement.isEqualNode(currentElement))
    currentElement.textContent = newElement.textContent;
});
```

we need a different way to do this, we want to only replace text. for this we use _.nodeValue_
which is null for elements, and has value for text nodes.

```js
newElements.forEach((newElement, i) => {
  const currentElement = currentElements[i];
  //update changed TEXT
  if (
    !newElement.isEqualNode(currentElement) &&
    newElement.firstChild?.nodeValue.trim() !== ""
  ) {
    console.log(newElement.firstChild.nodeValue);
    currentElement.textContent = newElement.textContent;
  }
  //update changed ATTRIBUTES
  if (!newElement.isEqualNode(currentElement)) {
    console.log(newElement.attributes);
    Array.from(newElement.attributes).forEach((attr) => {
      console.log(attr.name, attr.value);
      currentElement.setAttribute(attr.name, attr.value);
    });
  }
  //Update Changed Attributes
});
```

we change both the text value and the attributes.

let's also use this new functionality to only marked the selected search result. when we click a recipe, we want to keep the result preview highlighted.

let's start with the results view.
we add the class 'preview\_\_link--active' if we need it.

we remove the array check from the update method.

```js
  update(data) {
    if (!data
    //|| (Array.isArray(data) && data.length === 0)
    ) {
      return this.renderError();
    }
//...
  }
```

</details>

### Implementing Bookmarks

<details>
<summary>
Getting bookmarks on the recipes.
</summary>

we want our recipes to contain a bookmark.

we have a leftover bug, when we search from page 2 we don't go back to page 0.

let's try to find the bug.

I think it has something to do with the default argument to `model.getSearchResultsPage()`

but back to bookmarking,we start in the model. and then in the controller. and we also update the model.
we also want to listen for clicks on that button element, we add event delegation as before.

we need to call the update method. we just render a single element that changed.

the next step is to make the bookmarks permanents. so instead, lets store the bookmarked recipes.

```js
export const loadRecipe = async function (id) {
  const testRecipeUrl = `${API_URL}/${id}`;
  try {
    const data = await getJSON(testRecipeUrl);
    const { recipe: recipeData } = data.data;
    state.recipe = {
      id: recipeData.id,
      title: recipeData.title,
      publisher: recipeData.publisher,
      sourceUrl: recipeData.source_url,
      image: recipeData.image_url,
      servings: recipeData.servings,
      cookingTime: recipeData.cooking_time,
      ingredients: recipeData.ingredients,
      bookmarked: state.bookmarks.some((bk) => bk.id === recipeData.id),
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
```

let's actually stick this in the search results function as well.

(not sure why we aren't using a set)

now we add the bookmarks panel.

it also has a preview element.
let's create the new view, bookmarksView.js

we mostly use the same as the search result stuff.

```js
class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and book mark it ;)";
  //...
}
```

now we just make a common view that both use (composition, not inheritance) previewView.js.

</details>

### Storing with Local Storage

<details>
<summary>
Making data bookmarks persistance in local storage.
</summary>

storing data is about data, so it belongs to the model.

we store to the local storage when a bookmark is added or removed.

```js
const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

const clearBookmarksFromLocalStorage = function () {
  localStorage.removeItem("bookmarks");
};

const loadBookMarks = function () {
  const storedText = localStorage.getItem("bookmarks");
  const storedBookmarks = JSON.parse(storedText);
  if (storedBookmarks) {
    state.bookmarks = storedBookmarks;
  }
};
loadBookMarks(); //to call this on startup
```

we have an issue that we try to update the bookmarks view before rendering it once.

we stick a debugger statement

```js
debugger;
```

</details>

### Project Planning III

<details>
<summary>
Adding more and more stuff.
</summary>

we made some great progress since before.

lets look at the features list, we already completed most of them. now we have one feature group left- creating our own recipes!

- [x] Search functionality
- [x] Results with pagination
- [x] Display recipe
- [x] Change servings
- [x] Bookmarking
- [x] Store and load bookmarks
- [ ] Own recipe upload
- [ ] Own recipes automatically bookmarked
- [ ] user can only see own recipes, not from others.

let's update the diagram

![architecture-3](18-forkify/starter/forkify-flowchart-part-3.png)

</details>

### Uploading a New Recipe

<details>
<summary>
Uploading a recipe.
</summary>

for this, we need a developer key for the api.

we start with opening the editor.
we want to open the form and close it. let's call it addRecipeView.js;

this is not like other views, because the form is already part of the html.

```html
<div class="overlay hidden"></div>
<div class="add-recipe-window hidden">
  <button class="btn--close-modal">&times;</button>
  <form class="upload">
    <!-- more stuff -->
  </form>
</div>
```

this class has much more stuff.

```js
class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");
  _generateMarkup() {}
}
```

we use the constructor this time. we shouldn't forget to properly bind stuff.

```js
 constructor() {
    super();
    this._addHandlerShowWindow();
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this._toggleView.bind(this));
  }
  _toggleView() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
```

to get all the data we can use 'FormData' object

```js
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = [...new FormData(this)];
      console.log(data);
    });
  }
```

the action to upload the data is an api call, so it should happen in the model. so we first pass a handler function from the controller.

since ES19, we can convert an array into an Object with _Object.fromEntires(array)_, which is like the inverse of getting the entries.

```js
const o = Object.fromEntries(dataArr);
```

the next part is to upload the new recipe, this should happen in the model.

```js
export const uploadRecipe = async function (newRecipe) {};
```

first thing to do is the convert the object into the same format we get from the API

a long tedious battle to format it.

now we need a method to send json data.

the fetch function can also send data!

```js
const fetchPromise = fetch(url, {
  method: "Post",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});
```

the rest of the function is the same.
now we need the API key.

(i stored it in a file called .secretConfig, probably not the best way to secure it...)

we need the url to be a bit longer, lets change them in the html.
and this worked! we see some actual data, with our key and the id.

we do some more work of getting the data back to the format we want.

there is a trick here using short circuiting and spreading

```js
const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
```

things still don't work perfectly.
it was a problem with the bookmarks. it was updated and not rendered.

the recipe was uploaded, but the url didn't change, we change the id with the history api to change the url without reloading the page

```js
window.history.pushState(null,null,`#${model.state.recipe.id})
```

the next step is to refactor the two json methods into one.

```js
export const AJAX = async function (url, payload = undefined) {
  try {
    const fetchPromise = payload
      ? fetch(url, {
          method: "Post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
      : fetch(url);
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message} ${res.status}`);
    }
    return data;
  } catch (err) {
    console.error(`${err} 💥💥`);
    throw err;
  }
};
```

now we use the key to mark it as our own. we pass the key in all the calls to return our recipes.
we look at the recipeView and the previewView.
we need to add the key to preview data structure.

[unsplash-images to use](unsplash.com)

</details>

### Writing Documentation

<details>
<summary>
writing documentations for our application. additional challenges.
</summary>

we use [JSDoc](https://jsdoc.app/)

we write a block comment with an additional astrict to get the jsdoc created. this creates the @parameters and some space to write

```js
/**
 * Render the received data to the DOM
 * @param {Object | Object[]} data the data to be render
 * @param {boolean} [render=true] if false, just return markup string instead of rendering to the DOM
 * @returns {undefined | string} a string is return if render is false
 */
```

we can also define the this keyword (what it should refer to), who wrote the function, and what's missing.

```js
/**
@this {Object} View Instance
@author Benjamin
@todo Finish implementing
*/
```

we have some possible features that we can add.

in the next section. we will deploy this project.

</details>
</details>
