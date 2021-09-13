## Asynchronous JavaScript: Promises, Async/Await, and AJAX

<summary>
//fix me!
</summary>

Asynchronous JavaScript deals with long running tasks that run in the background, most commonly: fetching data from remote servers (ajax calls).

[List of public APIs](https://github.com/public-apis/public-apis)

> **CORS** - Cross Origin Resource Sharing.
> we need Cors if we want to use the api from code.

### Asynchronous JavaScript: AJAX and APIs

<details>
<summary>
Asynchronous and synchronous code.
</summary>

most of what we wrote so far was synchronous code. executed line by line via the _'execution thread'_ (part of the execution context). each line of code waits for the previous one to complete.

synchronous code

```js
const p = document.querySelector(".p");
p.textContent = "my name is beny";
alert("Text Set!"); //blocking!
console.log("console!");
p.style.color = "red";
```

until we press the 'ok' on the alert, the next line doesn't run. if we had a timer that waits from some time, this would be very annoying. Asynchronous code is designed to go around this.
in this example we set a timeout with a callback function, the line after the setTimeout function runs before the code inside it. we register the callback and move to the next line.

```js
const p = document.querySelector(".p");
setTimeout(function () {
  p.textContent = "my name is beny"; //this is async code
}, 5000);
p.style.color = "red";
```

> Asynchronous code is executed **after a task that runs in the "background" finishes**.

the callback is deferred to the future. Asynchronous programing is coordinating the behavior of a program over time.
just because a method uses a callback function doesn't mean its asynchronous, the Array _.map()_ takes a callback and it sure as hell ain't asynchronous.

in this example, the first line is synchronous code, but the second is actually asynchronous. setting the img 'src' attribute was implemented as an asynchronous method so that it won't block (even if the img takes a long time to load), this is why the event will fire.

```js
const img = document.querySelector(".dog");
img.src = "dog.jpg"; // actually asynchronous code
img.addEventListener("load", function () {
  img.classList.add("fadeIn"); //callback function
});
p.style.width = "300px";
```

event listeners alone aren't necessary asynchronous. an event listener for 'click' isn't performing any background work.

> AJAX: **Asynchronous JavaScript And XML**.
> Allows us to communicate with remote wev servers in an **asynchronous way**. With AJAX calls, we can **request data** from web servers dynamically.

we can get data without having to refresh our page.

the client performs an http request to the server, and the server will send a response. the server contains a 'web API'.

> - API: **Application Programming Interface**.
>   Piece of software that can be used by another piece of software, in order to allow **applications to talk to each other**.
> - There are many types of API's in web Development, like the **DOM API**, **Geolocation API**, and even our classes can have API, and what we currently are interested in are **Online API**.
> - Online API: application running on a server, that receives requests for data, and sends data back as response.
>
> * We can build our own web api (with backend development, like node.js), or use a 3rd-party API.

there is probably an API for anything: weather,flights, currency exchange rates, maps, sending email, getting data about countries... anything we want!

the X in AJAX stands for XML, but today nobody uses xml for requests and responses, we use the JSON format instead.

#### Our First AJAX Call

<details>
<summary>
Using XMLHttpRequest object to perform Ajax calls with event listeners. 
</summary>

A UI component that gets data about countries from an online API.
there are multiple ways to do ajax calls, but we start with the most basic one, it's 'old-school' and not used like this anymore, instead we have promises.

we start by taking the _Rest Countries_ API from the public api list on github. we look for an endpoint URL. we then register a callback on the request.

```js
const request = new XMLHttpRequest();
const url = "https://restcountries.eu/rest/v2/name/";
request.open("GET", url + "portugal");
request.send();
request.addEventListener("load", function () {
  //the 'this' the the request.
  console.log(this.responseText);
  const [data] = JSON.parse(this.responseText);
  console.log(data);
});
```

once we get the data, we can build a html card from it.

```html
<article class="country">
  <img class="country__img" src="" />
  <div class="country__data">
    <h3 class="country__name">COUNTRY</h3>
    <h4 class="country__region">REGION</h4>
    <p class="country__row"><span>👫</span>POP people</p>
    <p class="country__row"><span>🗣️</span>LANG</p>
    <p class="country__row"><span>💰</span>CUR</p>
  </div>
</article>
```

we use a string template as usual. and we refactor away whatever parts we can into different functions. we have two ajax calls at the same time, so the order might change in each time.

if we cared about the order, we would need to chain the request, only send one request after the earlier was completed, which can lead to _'callback hell'_

</details>

#### Welcome to Callback Hell

<details>
<summary>
Callback Hell: making new requests based on responses, and setting many levels of nesting
</summary>

We saw that requests can arrive at different order, let's try and make them happen in sequences.
using the data we got from the countries api, we can request for one country and then find it's neighboring countries.
when the first AJAX call is done, we will take the data from "borders" property, and use it. because it gives us a country code and not a country name, we need a different url endpoint to work with.

in the code endpoint api, the result is a single object, and not an array. ain't that wonderful.

so far, we have only one nested callback, but if we had more it would have horrible, if we wanted to take the neighbor of the neighbor of the neighbor. we would need to nest many callbacks. this is **Callback hell**, and can happen whenever the request is based on the results of a previous response.

here is callback hell with timeouts

```js
setTimeout(() => {
  console.log("1 second passed!");
  setTimeout(() => {
    console.log("2 second passed!");
    setTimeout(() => {
      console.log("3 second passed!");
      setTimeout(() => {
        console.log("4 second passed!");
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
```

this is hard to read, hard to understand and will have more bugs. if we want to solve this we need something else.

</details>

</details>

### How the Web Works: Request and Responses

<details>
<summary>
Optional Content: what happens when we access a website.
</summary>

when we access a web server, the client (the browser) sends a requests, and the server (website) sends a response. this is called a
**request-response model** or **client-sever architecture**.

using the url from earlier:

> https://restcountries.eu/rest/v2/alpha/code

we can divide it into parts:
protocol: "http" (or https,or others!)
domain name: "restcountries.eu"
resource: "/rest/v2/alpha/code"

the domain name is just a nice name for us to read, the real address is provided by DNS.
DNS stands for _domain name server_, which is a server that knows how to match a string address from the domain into a real ip address. the io address is a number and a port (port 443 is default for https, 80 for http)

a tcp/ip socket connection is created between the client and the server. the request is an http request, a protocol for communication based around resources.

the request has a

- StartLine
- Header
- Body (for posting data)

the target of the http request is what we called 'resource', if we don't specify the resource, we simply access the root of the website.

the main difference between http and https is that the https protocol is encrypted by some protocol.

once the request is processed, the server sends an http response. the http response is similar to the request, also containing a StartLine, header and a body, but it also has a status code and status message.

the headers are information about the response, and the body contains the json data or the html data or whatever.

in the 1st response, we can the html file. the html file contains all the knowledge of how to get everything we need, like images, JavaScript stuff,css, etc...

TCP/IP breaks the data into small packets and then reassembles them, each packet takes a different route through the internet, the tcp/ip then rebuilds the data.

</details>

### Promises

<!-- <details> -->
<summary>
A promise is a container that will hold the result of an asynchronous operation.
</summary>

[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

ES6 introduces provided a 'promise' object, which is supposed to stop the callback hell issue.

we now have fetch and promises.

```js
const request = fetch("https://restcountries.eu/rest/v2/name/turkey");
console.log(request);
```

> - **Promise**: an object that is used as a placeholder for the future result of an asynchronous operation.
> - **Promise**: a container for an asynchronously delivered value.
> - **Promise**: a container for a future value.

the promise stores the future value of the ajax request.

> We no longer need to rely on event and callbacks passed into asynchronous functions to handle asynchronous results.
> Instead of nesting callbacks, we can **chain promises** for a sequence of asynchronous operations, therefore **escaping callback hell**.

the promise objects are time sensitive, they have lifecycle and can be in a different state.

- pending
- settled
  - fulfilled
  - rejected

we handle the different states. a promise is only settled once, it cannot revert back.
getting a result is called 'consuming it', the fetch API builds the promise for us.

#### Consuming Promises

<details>
<summary>
Calling .then() on the promise object to determine how it behaves once is settled/
</summary>

Consuming a promise means using it. we create it with a fetch.
we pass the callback function into the '_.then()_' method. this callback gets the response from the server. we can also pass a callback function to handle bad responses.

the data is in the response body, in a 'readable stream' object. we need to read it, with _.json()_ which is also an asynchronous function that returns a promise, so we need another call to _.then()_, this time the data is available.

```js
fetch("https://restcountries.eu/rest/v2/name/turkey")
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

fetch("https://restcountries.eu/rest/v2/name/canada")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

so we need at least 2 calls to Then for each fetch. this makes the code easier to read. promises don't remove callback functions, but they reduce callback hell.

</details>

#### Chaining Promises

<details>
<summary>
rather then nested callbacks, we can use a flat chain of promises,
</summary>

earlier, we had code to get the country and it's neighbors, lets do it with promises. rather then nest, we pull out the promise object into the external chain.

then _.then()_ method always returns a promise,
what we explicitly return is just what we want the promise to resolve into.

```js
fetch("https://restcountries.eu/rest/v2/name/turkey")
  .then((response) => 23)
  .then((r) => console.log(r)); //23
```

a common mistake is to insert the _.then()_ method inside the nested earlier _.then()_, rather than returning the promise object and handling it at the same level of the chain.

</details>

#### Handling Rejected Promises

<!-- <details> -->
<summary>

</summary>

<!-- </details> -->

<!-- </details> -->

### Behind the Scenes: The Event Loop

#### The Event Loop in Practice

#### Coding Challenge #1

<details>
<summary>

</summary>

> In this challenge you will build a function 'whereAmI' which renders a country only based on GPS coordinates. For that, you will use a second API to geocode coordinates. So in this challenge, you’ll use an API on your own for the first time.
> Your tasks:
>
> PART 1
>
> 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat') and a longitude value ('lng') (these are GPS coordinates, examples are in test data below).
> 2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call will be done to a URL with this format:https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do not use the 'getJSON' function we created, that is cheating.
> 3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, log a message like this to the console: “You are in Berlin, Germany”.
> 4. Chain a .catch method to the end of the promise chain and log errors to the console.
> 5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does not reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message
>
> PART 2
>
> 6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
> 7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code).

> Test data:
>
> - Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
> - Coordinates 2: 19.037, 72.873
> - Coordinates 3: -33.933, 18.474

</details>

#### Coding Challenge #2

<details>
<summary>

</summary>

> For this challenge you will actually have to watch the video! Then, build the image loading functionality that I just showed you on the screen.
> Your tasks:
>
> Tasks are not super-descriptive this time, so that you can figure out some stuff by yourself. Pretend you're working on your own.
>
> PART 1
>
> 1.  Create a function 'createImage' which receives 'imgPath' as an input.
>     This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path.
> 2.  When the image is done loading, append it to the DOM element with the
>     'images' class, and resolve the promise. The fulfilled value should be the
>     image element itself. In case there is an error loading the image (listen for the'error' event), reject the promise.
> 3.  If this part is too tricky for you, just watch the first part of the solution.
>
> PART 2 4. Consume the promise using .then and also add an error handler 5. After the image has loaded, pause execution for 2 seconds using the 'wait' function we created earlier. 6. After the 2 seconds have passed, hide the current image (set display CSS property to 'none'), and load a second image (Hint: Use the image element returned by the 'createImage' promise to hide the current image. You will need a global variable for that). 7. After the second image has loaded, pause execution for 2 seconds again. 8. After the 2 seconds have passed, hide the current image.
>
> Test data: Images in the img folder.
> Test the error handler by passing a wrong image path. Set the network speed to “Fast 3G” in the dev tools Network tab, otherwise images load too fast.

</details>

#### Coding Challenge #3

<details>
<summary>

</summary>

> Your tasks:
> PART 1
>
> 1. Write an async function 'loadNPause' that recreates Challenge #2, this time using async/await (only the part where the promise is consumed, reuse the 'createImage' function from before).
> 2. Compare the two versions, think about the big differences, and see which one you like more?
> 3. Don't forget to test the error handler, and to set the network speed to “Fast 3G” in the dev tools Network tab
>
> PART 2
>
> 1. Create an async function 'loadAll' that receives an array of image paths 'imgArr'.
> 2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs').
> 3. Check out the 'imgs' array in the console! Is it like you expected?
> 4. Use a promise combinator function to actually get the images from the array.
> 5. Add the 'parallel' class to all the images (it has some CSS styles).
>
> Test data Part 2:
> ['img/img-1.jpg', 'img/img-2.jpg', 'img/img3.jpg'].
>
> To test, turn off the 'loadNPause' function.

</details>
```
