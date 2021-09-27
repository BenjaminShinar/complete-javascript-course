<!--
//cspell::ignore geocode latlng
 -->

## Mapty App: OOP, Geolocation, External Libraries

<details>
<summary>
Geo-location, third party libraries, project planning.
</summary>

an application that shows a map, loaded from 3rd party api, the location, from the browser geo-location, keeping track of workout information.
adding marks, jumping to location, and stuff like that. information is kept through out sessions.

lots of work with the html.

### How to Plan a Web Project

<details>
<summary>
The planning stages of creating a new application.
</summary>

Before we write the first line of code, we should have a plan. what features we want, what architecture we wish to use, etc...

there are many ways to do this, depending on the company, the tools, the goal, etc..

we start with something called 'User Stories'. they tell us what features we want, which we will use to create a flowchart, which will help us decide on the architecture.

> 1. _User Stories_ - Description of the the application from the user's perspective. All user stories put together describe the entire application.
> 2. _Features_
> 3. _Flowchart_ - WHAT we will build
> 4. _Architecture_ - HOW we will build it

in big projects, this is what the software architect does, but even in small scale programs and modules, there is an equivalent step.

if we don't have a solid vision of architecture, we might end up with spaghetti code: messy, hard to follow and hard to maintain.

After the planning step, we can begin development, which is implementing the features and writing the code.

User Stories

> - Description of the the application from the user's perspective
> - Common format: "as a **[type of user]** i want **[an action]** so that **[a benefit]**"
>
> Answer the questions: who, what, why.
> examples:
>
> 1. As a **user**, I want to **log my running workouts with location, distance, time, pace and steps/minute** so I can **keep a log of all my running**.
> 2. As a **user**, I want to **log my cycling workouts with location, distance, time, speed and elevation gain** so I can **keep a log of all my cycling**.
> 3. As a **user**, I want to **see all my workouts in a glance**, so I can easily **keep track of my progress over time**.
> 4. As a **user**, I want to also **see all my workouts on a map**, so I can easily **check where I work out the most**.
> 5. As a **user**,I want to **see all my workout when I leave the app and come back later**, so that I can **keep using the app over time**.

different people come up with different user stories. in the real world we don't have a final project ready to compare with, we start with user stories and build up.

Features

features are created from the user stories

| User Stories                                                     | Features                                                                                                                                     |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| log running with location, distance, time, pace, steps/minute    | Map where user clicks to add a new workout. geo-location to display map at current location. form to input distant, time, pace, steps/minute |
| log cycling with location, distance, time, speed, elevation gain | form to input distance,time, speed, elevation gain.                                                                                          |
| see workouts at a glance                                         | Display all workouts in a list.                                                                                                              |
| see workout on a map                                             | Display all workout on the map.                                                                                                              |
| see all workout when leaving and coming back to the app          | Data should persist over time (local storage, database). read this data and display it when page loads                                       |

Flowchart

which features are we implementing, how the features interact with on another,how data flows from one feature to another. this helps us shape the features into concrete ideas.

we start with events, like the page loading or actions the user can take. the flowchart is an evolving document, it won't be perfect from the start.

![Mapty-flowchart](15-Mapty/starter/Mapty-flowchart.png)

> Revised Features
>
> 1. geo-location to display map at current location.
> 2. map where user clicks to add new workout.
> 3. form to input running: distance, time, pace,step/minute.
> 4. form to input cycling: distance, time, speed, elevation gain.
> 5. display workouts in a list.
> 6. display workouts on the map.
> 7. store workout data in the browser
> 8. on page load, read the saved data and display
> 9. move map to workout location on click.

the flowchart is still an abstraction level, it has nothing to do with the languages we use to create the app

Architecture

just like the flowchart, we don't need to have a perfect architecture from the start, it's subject to changes.

</details>

### Using the Geolocation API

<details>
<summary>
Getting Geo-location information from the browser
</summary>

we start implementing the features, the first one is the geo-location api. it's part of the API the browser gives us, like internationalizing, timers, locale, alerts, camera access, etc...

we get it from the navigator object. we pass two callbacks function, one for success, and one for error.
for old browsers, we might need to check if the navigator exists.

if we block the location request we can click the icon on the address bar to clear the block. a block remains even after reloading the page.

```js
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { longitude, latitude } = position.coords;
      console.log(position, longitude, latitude);
    },
    function () {
      alert("could not get your position!");
    }
  );
}
```

we want to use the latitude and longitude to build a google maps url.

</details>

### Displaying A Map Using Leaflet Library

<details>
<summary>
The Leaflet library gives us an api to display and manipulate a map.
</summary>

the next Step is to display the map, we will ue a library called [Leaflet](https://leafletjs.com/). which is an open source library for open source interactive maps.

to use a 3rd party library, we need to include it, we can either download it or use a hoisted version. we need a css file and a JavaScript file.
in the future, we could use package managers like npm. but for now, we take the hoisted version. by grabbing the link and putting it inside the html header section, before our scripts and let's set it to 'defer'.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="shortcut icon" type="image/png" href="/icon.png" />

    <link
      href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap"
      rel="stylesheet"
    />

    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
      integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
      crossorigin=""
    />
    <script
      defer
      src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
      integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
      crossorigin=""
    ></script>

    <link rel="stylesheet" href="style.css" />

    <script defer src="script.js"></script>
    <title>mapty // Map your workouts</title>
  </head>
  <body></body>
</html>
```

now that we have the library, we need to use it in our page. the library
gives this example.

```js
var map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([51.5, -0.09])
  .addTo(map)
  .bindPopup("A pretty CSS3 popup.<br /> Easily customizable.")
  .openPopup();
```

The L is the namespace for the leaflet library. it's a global variable.

The order of scripts in the html file determines which variables are available for other scripts.

- _.map(elementId)_ - method takes an id of an html object and returns a element representing our map.
- _.setView([coordinates array],zoomLevel)_ - makes us centered on a location with a zoom level. the higher the level the more zoomed in we are.
- _.tileLayer(url,optionsObject)_ - takes a tile url that provides the map theme.
- _.addTo(map variable)_
- _.marker(coordinates)_ - creates a marker element.
- _.bindPopup(options object or text)_ - creates the popup.
- _.openPopup()_ - makes the popup visible.

we use 'openStreetMap' for the tile layer, but we could also use google maps. we can also change the url to get a different theme of map.

#### Displaying a Map Marker

<details>
<summary>
Adding a marker on the leaflet map API.
</summary>

we want to display a marker on whenever we click on the map. we would bind an event handler to the map and get the position for the marker. we can't simply add event listener, to the map element, this time we need to use the map variable that leaflet gives us.
we inspect the variable in the console and see that it follows the convention of having some variables with an underscore, which means we shouldn't use them. there is a prototype chain that we can follow.

it has the _.on()_ method, which allows us to specify events.

```js
console.log(map); //lets look what's inside
map.on("click", function (mapEvent) {
  console.log(mapEvent); // what are map event?
  const { lat, lng } = mapEvent.latlng;
  const markerCoords = [lat, lng];
  L.marker(markerCoords).addTo(map).bindPopup("workout").openPopup();
});
```

if we do this, we can add markers, but when we click somewhere else, the marker closes. and also the marker is kind of bland.

we can pass an options element to the _.bindPopup()_ method.
the documentation of the [popup](https://leafletjs.com/reference-1.7.1.html#popup) element shows us what we can do with each function and what can be passed in.

a lot of the function have fluent interfaces and return the object that was called.

we already have css styles ready, and we can set the content of the popup with the _.setPopupContent()_

```js
const markerCoords = [lat, lng];
const popupOptions = {
  maxWidth: 250,
  minWidth: 100,
  autoClose: false,
  closeOnClick: false,
  className: "running-popup", //we will need to change this
};
L.marker(markerCoords)
  .addTo(map)
  .bindPopup(L.popup(popupOptions))
  .setPopupContent(text)
  .openPopup();
```

the next step is to create a form that sets the markers, instead of having them being created by the user clicking.

</details>

</details>

### Rendering Workout Input Form

<details>
<summary>
Rendering the input form.
</summary>
when the user clicks on the map, we should have a form that the user can interact with to set the workout.

the html

```html
<form class="form hidden">
  <div class="form__row">
    <label class="form__label">Type</label>
    <select class="form__input form__input--type">
      <option value="running">Running</option>
      <option value="cycling">Cycling</option>
    </select>
  </div>
  <div class="form__row">
    <label class="form__label">Distance</label>
    <input class="form__input form__input--distance" placeholder="km" />
  </div>
  <div class="form__row">
    <label class="form__label">Duration</label>
    <input class="form__input form__input--duration" placeholder="min" />
  </div>
  <div class="form__row">
    <label class="form__label">Cadence</label>
    <input class="form__input form__input--cadence" placeholder="step/min" />
  </div>
  <div class="form__row form__row--hidden">
    <label class="form__label">Elev Gain</label>
    <input class="form__input form__input--elevation" placeholder="meters" />
  </div>
  <button class="form__btn">OK</button>
</form>
```

it starts with the 'hidden' css class. we start by showing the form when the map is clicked. for better user experience, we can also focus the cursor to the form.

```js
form.classList.remove("hidden");
inputDistance.focus();
```

we'll add an event for submitting the form.even if there's no submit button, we can submit a form with the <kbd>enter</kbd> key.

we need to clear up the code, extract function, move stuff into outer scope, etc...
we put the mapEvent as a global variable, because we need it when the form is submitted. we prevent the default behavior of the form submission.

we want to change which form shows: cadence or elevation.
when we change the value of the selection, there is an event fired. we just need select the closet ".form\_\_row" element and toggle it.

```js
inputType.addEventListener("change", function (e) {
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
});
```

</details>

### Project Architecture

<details>
<summary>
Refactoring our code into classes and objects. special considerations to binding events
</summary>

we now consider the architecture of the project, there are some different approaches, but in this project, we will use OOP with classes as our focal idea.

> - "where and how to store the data?"
> - "what are our functionalities?"

what is our application about? where does the data comes from, what types of data?

The workout classes, base class and two child classes (running and cycling). we also have the other events, so we will put them on the general App object. we can use the separation to protect the data from changes.

![Class Architecture](15-Mapty/starter/Mapty-architecture-part-1.png)

we start by implementing the App object. don't forget the _'this'_ keyword. and we need to call the methods and constructor. we move all the stuff we want into the class as private fields.

when we pass a function callback, we need so manually bind the object with _.bind(this)_. otherwise, the function is called on the element that called the event.

we set the event handlers inside the constructor.

```js
  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('could not get your position!');
        }
      );
    }
  }
```

</details>

### Managing Workout Data

<details>
<summary>
The workout class hierarchy, creating an object, rendering a marker and the sidebar. 
</summary>

continuing with our oop architecture, we want to create the classes for workouts. we start with the baseClass Workout, which has the common data. in larger projects, we would make the fields, private and provide getters.

the data that isn't set by the constructor cab be declared as a class field. in the real worlds, we would get Unique ID from a library or something, but for this example, we will take the digits from the dateTime Objects.

```js
class Workout {
  date = new Date();
  id = this.date.getTime();
```

we add methods to calculate speed and pace for each of the derived classes. we could probably also use a getter instead.

for the markers:

- [ ] we need to get data from the form.
- [ ] validate the data.
- [ ] create the appropriate workout object, and add it to the workout array.
- [ ] render the workout on the map and in the list
- [ ] hide the form and clear the fields.

the type is stored inside the html, as well as the other properties, which are string (so we need to convert them). there are two 'if' statements because that's how modern JavaScript might look.

```js
const type = inputType.value;
const distance = Number(inputDistance.value);
const duration = Number(inputDuration.value);
if (type === "running") {
  const cadence = Number(inputCadence.value);
}
if (type === "cycling") {
  const elevation = Number(inputElevation.value);
}
```

we check the validity (positive numbers), and if they're not, we return. and we can add an alert. (but i won't do this). we can use the _.every()_ array method together with a rest operator in a function to create a varArgs function.

```js
const validateNumbers = (...inputs) => {
  return inputs.every((inp) => Number(inp) && inp > 0);
};
```

we set the css class with the correct type.

#### Rendering Workout Data Sidebar

<details>
<summary>
Adding an html element to the sidebar.
</summary>

we want a list of the workouts on the sidebar, with a title, data, and some icons.

we make ourselves a new method that takes care of it, by adding an html object to the form to the unordered list.

the pre-built html classes look like this:

```html
<li class="workout workout--running" data-id="1234567890">
  <h2 class="workout__title">Running on April 14</h2>
  <div class="workout__details">
    <span class="workout__icon">🏃‍♂️</span>
    <span class="workout__value">5.2</span>
    <span class="workout__unit">km</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">⏱</span>
    <span class="workout__value">24</span>
    <span class="workout__unit">min</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">⚡️</span>
    <span class="workout__value">4.6</span>
    <span class="workout__unit">min/km</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">🦶🏼</span>
    <span class="workout__value">178</span>
    <span class="workout__unit">spm</span>
  </div>
</li>

<li class="workout workout--cycling" data-id="1234567891">
  <h2 class="workout__title">Cycling on April 5</h2>
  <div class="workout__details">
    <span class="workout__icon">🚴‍♀️</span>
    <span class="workout__value">27</span>
    <span class="workout__unit">km</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">⏱</span>
    <span class="workout__value">95</span>
    <span class="workout__unit">min</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">⚡️</span>
    <span class="workout__value">16</span>
    <span class="workout__unit">km/h</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">⛰</span>
    <span class="workout__value">223</span>
    <span class="workout__unit">m</span>
  </div>
</li>
```

html breakdown:

- the li tag has 'workout' general class and a _specific 'workout--${type}' class_.
- the _workout title_ is simply a different name.
- the four 'workout\_\_details' are not exactly identical.
  1. the icon is different for running and cycling.
  2. duration is the same.
  3. the pace/speed unit is different
  4. final row is either cadence or elevation.

we will need to create each element accordingly. string templates are our friends.

it will be better to create each div elements from a function.

we insert the new element as a sibling.

```js
const html = `<div> ...</div>`;
form.insertAdjacentHTML("afterend", html);
```

we also want to hide list when the form is showing. there is a transition that we want not to happen so we play with the style.

```js
form.style.display = "none";
form.classList.add("hidden");
setTimeout(() => (form.style.display = "grid"), 1000);
```

</details>

#### Move To Marker On Click

<details>
<summary>
finding the marker and moving to it.
</summary>

when we click on an element in the side bar, we want to jump to that position.

we should use a delegate event,attach the event handler to a parent handler and if an event happens, we will take the closest (reverse query selection to get get the parent) workout element.
if the user clicked on something else, we won't find a match!

we use the id and now we can match the element inside the workouts array.

```js
    containerWorkouts.addEventListener('click', this.moveToWorkout.bind(this));

  moveToWorkout(e) {
    const workout = e.target.closest('.workout');
        if (clickedWorkout) //guard
    {
      console.log(clickedWorkout);
      const id = Number(clickedWorkout.dataset.id);
      console.log(id);
      const selectedWorkout = this.#workouts.find(wk => wk.id === id);

      if (selectedWorkout) {
        console.log(selectedWorkout);
        this.#map.setView(selectedWorkout.coords, App.#mapZoomLevel, {
          animate: true,
          pan: {
            duration: 1,
          },
        });
    }
  }
```

we use a method from the leafLet library to move, this is the _.setView(coords,zoomLevel)_ method.m which can also take an object of options.

a final request is to count the clicks on each workout (not displaying it).

</details>

</details>

### Working with Local Storage

<details>
<summary>
Using the local storage to make the data persist across sessions. this has so many issues!
</summary>

[Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

storing the workout in the local storage.

localeStorage is an api the browser gives us. it's a key-value pairs storage (string,string).

we use JSON.Stringify() to convert objects into json. **but there is a problem!**

```js
localStorage.setItem("workouts", JSON.stringify(this.#workouts));
```

localStorage is blocking, so we shouldn't store large amount of data on it.
we can see the local storage in the development tools under the 'application' tab.

to reload the data, we take the string from the local storage and try to use it.

```js
const storedText = localStorage.getItem("workouts");
const storedWorkouts = JSON.parse(storedText);
if (storedWorkouts) {
  console.log(storedWorkouts);
  this.#workouts = storedWorkouts;
  this.#workouts.forEach((wk) => {
    console.log(wk);
    //neither of them work for me
    // this.#renderWorkoutList(wk);
    // this.#renderWorkoutMarker(wk);
  });
}
```

sadly, this doesn't work because we are trying to do things we stuff that don't exist yet, like the map object.

**json stringify doesn't parse objects into classes**. the object prototype chain is lost! the prototype is Object!

I had to play with

```js
if (wk.elevation) {
  Object.setPrototypeOf(wk, Cycling.prototype);
} else {
  Object.setPrototypeOf(wk, Running.prototype);
}
```

and even then the Date property was out! this was so stupid! why is this like this!

another thing we can do is remove the local storage.

```js
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
```

now we can update the project architecture.

![updated architecture](15-Mapty/starter/Mapty-architecture-final.png)

</details>

### Final Considerations

<details>
<summary>
Possible Additions to the project.
</summary>

things we can do on our own.

1. ability to remove/edit a workout.
2. sort the workout by some criteria.
3. rebuild the running and cycling objects. fix the problem with the click!
4. give out better error messages!
5. position the map so that it shows all the workouts (very hard, leaflet library documentation)
6. ability to draw lines and shapes (not just points).
7. get geocode location the coordinates to get the real location (description).
8. display the weather for the workout time and place.

</details>
</details>
