## Forkify App: Building a Modern Application

<!-- <details> -->

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

<!-- <details> -->
<summary>

</summary>

</details>

### s

</details>
