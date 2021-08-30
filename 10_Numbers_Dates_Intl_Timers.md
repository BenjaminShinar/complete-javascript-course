## Numbers,Dates, Intl and Timers

<details>
<summary>
Working with numbers, dates, internationalizing api and Timers.
</summary>
continuing with the Bankist Project.

The [Number global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), the [Math global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math), the [Date global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) and the [international date **(INTL)** global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).

Numbers Functions:

- _Number()_ - convert to number.
- _+'string'_ - convert to number.
- _Number.parseInt(string,base)_ convert to integer with the base.
- _Number.parseFloat(string,base)_ convert to floating point with the base.
- _Number.isNaN(value)_ - checks if it's 'not a number\*, tries to convert, returns false for infinity.
- _Number.isFinite(value)_ - checks if is a finite number, no converting, infinity is false (not finite).
- _Number.isInteger(value)_ - checks if number is an integer. without converting.
- _.toFixed(digits)_ - return a string with the amount of digits.

Math Functions and constants:

- _Math.sqrt(number)_ - returns the square root of the number.
- _Math.max(n1,n2,m3)_,_Math.min(n1,n2,m3)_ - return the maximal or minimal number of the arguments
- _Math.PI_ ~ 3.141592....
- _Math.random()_ - a floating point between 0 and 1 exclusive
- _Math.trunc(number)_ - removing what's after the dot.
- _Math.round(number)_ - round to closest.
- _Math.ceil()_, _Math.floor()_ - round up or down.

Date Functions and methods:

- _new Date()_ - now
- _new Date(string)_ - parse from string
- _new Data(year,month,day,hour,minute,seconds,millisecond)_ - date from components, month is **zero based**.
- _new Date(millisecond)_ - date from epoch.
- _.getFullYear()_ - gets year, never use **.getYear()**.
- _.getMonth()_ - zero-based
- _.getDate()_ -day of the month
- _.getDay()_ - day of the week
- _.getHours()_, _.getMinutes()_, _.getSeconds()_ - hour,minutes,seconds
- _.toISOString()_ - return ISO String
- _.getTime()_ - return milliseconds since epoch. timestamps.
- _Date.now()_ - current timeStamp
- _.setFullYear(year)_ - set year of the object.

### Converting and Checking Numbers

<details>
<summary>
How numbers work in javascript.
</summary>

all numbers in Javascript are floating point, 64bit (double) 2 complement format. this means that some fractions that are easy to show as base10 are hard to show as base2.

```js
console.log(23 === 23.0);
console.log(0.1 + 0.2); //0.300000000004
```

to turn something into a number we can use the _Number()_ method or the _+ plus_ operator to enforce type coercion.

```js
console.log(Number("23"));
console.log(+"23");
```

we can parse a number from a string, the second argument is the radix (base, default 10), there are _parseInt()_ and _parseFloat()_. we can call the functions as global functions.

```js
console.log(Number.parseInt(`30px`)); //30
console.log(Number.parseInt(`e23`)); //NAN
console.log(Number.parseInt(`101`, 10)); //101
console.log(Number.parseInt(`101`, 2)); //5

console.log(Number.parseInt(`1.15   `)); //1
console.log(Number.parseFloat(`  1.15`)); //1.15

console.log(parseInt(`   -1.15  `)); //-1
```

we can check if values are numbers with _Number.isNaN()_ and _.Number.isFinite()_ which doesn't try to convert and returns false for infinity.

```js
console.log(Number.isNaN(20)); //false
console.log(Number.isNaN("20")); //false, converted?
console.log(Number.isNaN(+"20x")); //true,not converted
console.log(Number.isNaN(23 / 0)); // false, infinity is a number

console.log(Number.isFinite(20)); //true
console.log(Number.isFinite("20")); //false
console.log(Number.isFinite(+"20x")); //false
console.log(Number.isFinite(23 / 0)); // false, infinity is not finite

console.log(Number.isInteger(20)); //true
console.log(Number.isInteger(20.0)); //true
console.log(Number.isInteger(20.5)); //false
console.log(Number.isInteger("20")); //false
console.log(Number.isInteger(+"20x")); //false
console.log(Number.isInteger(23 / 0)); // false
```

for our project, we have the
currency, locale

</details>

### Math and Rounding

<details>
<summary>
The Math namespace gives us some mathematical functions.
</summary>

Math.sqrt(n) returns the square root of a number. if we want other roots (cubic) we need to use the exponent of the appropriate fraction.

```js
console.log(Math.sqrt(25)); //square root
console.log(25 ** (1 / 2)); //square root
console.log(8 ** (1 / 3)); //cubic root
```

the _Math.max()_ and _Math.min()_ functions return the max and min of the arguments.

```js
console.log(Math.max(1, -2, 3)); //3
console.log(Math.min(1, -2, 3)); //-2
```

the Math object also has some constants, like _Math.PI_. and we can the _Math.random()_ method to create random numbers. we can use _Math.round()_ to get the nearest integer, _Math.ceil()_. all the methods do type coercion.

```js
console.log(Math.PI);
console.log(Math.random()); //number between 0 and 1 (exclusive)
const randomInt = (min, max) => 1 + Math.trunc(math.random() * (max - min));
console.log(randomInt(10, 30));
Math.round(23.3); //23
Math.round(23.8); //24

Math.ceil(23.3); //24
Math.ceil(23.8); //24

Math.floor(23.3); //23
Math.floor(23.8); //23

Math.trunc(-23.8); //-23
Math.floor(-23.8); //-24

console.log(Math.round("23.6")); //24
```

the number Object as the the _.fixed(digits)_ method, which creates a string with the correct number of digits. there is boxing involved.

```js
const num = 1.3;
console.log(num.toFixed(1)); //"1.3"
console.log(num.toFixed(2)); //"1.30"
console.log(num.toFixed(0)); //"1"
console.log((11).toFixed(5)); //"11.00000"

console.log(typeof num.toFixed(1)); //"string"
```

let's apply it to the project by rounding the decimal parts of the loan. and format all the number into to two digits.

</details>

### The Reminder Operator (_% modulo_)

<details>
<summary>
The reminder operator has some special uses.
</summary>
the reminder operator (modulo) returns the reminder of the division.

```js
console.log(5 % 2); //1
console.log(5 / 2); //2.5
console.log(8 % 3); //2
console.log(8 / 3); //2.6666
```

we can use this to check if a number is even or odd

```js
const isEven = (num) => num % 2 === 0;
console.log(isEven(1)); //false
console.log(isEven(4)); //true
console.log(isEven(4.5)); //false
```

let's color every other movements!

</details>

### Working With BigInt

<details>
<summary>
A type of integers introduced in ES2020. meant to be used for really large numbers.
</summary>

the normal number type is 64 bit, of which only 53 bit are used for the number (the rest are for the floating point position and the sign). that means there is a limit of (2\*\*53) -1 as the max integer to use.
if we want to use larger numbers we, might get a proper double long from a different language (like c++, which supports 2\*\*63 -1 as max) or even when using actually really large numbers. we can add the suffix _n_ to the number to make it be stored as a BigInt datatype, we can also use the _BigInt()_ function to create a BigInt. we can do math of bigInt with other BigInt, but not with other numbers. there is an exception for the comparison operators and the no strict type coercion. we can use the + operator for string concatenation.

```js
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(typeof 1000n); //bigint
console.log(1000n * 100); //error
console.log(1000n * BigInt(100)); //bigint
console.log(1000n > 100); //true
console.log(100n === 100); //false
console.log(100n == 100); //true
```

the normal Math operations won't work for BigInt numbers. and because bigInt is only for integers, we get integer divisions, (like c!)

```js
console.log(Math.sqrt(4n)); //error.
console.log(5 / 2); //2.5 - normal numbers
console.log(5n / 2n); //2n - big int
```

</details>

### Working For Dates and Times

<details>
<summary>
Data types to represent dates and time
</summary>

a very mess data type...

#### Creating Dates

<details>
<summary>
Creating and basic operations of dates
</summary>
there are different ways to create dates in JS, all of which use the *new Date()* constructor. if we pass it no arguments, we get the current datetime.
we can pass a string and hope that it's parsed correctly. there are all sorts of formats, like the ISO date format. or looser definitions. we can pass the exact units (year, month, day, hour, minute, seconds, milliseconds). we need to remember that the month is zero-based, so 1 is actually february.
javascript does correction for days automatically, so passing january 32 will get us february first.

we can also pass in epoch time - the amount of milliseconds since 1970-01-01 (unix time)

```js
const d = new Date(); //returns the current datetime
console.log(d);
const d2 = new Date("Aug 02 2020 18:05:41");
console.log(d2);
const xmas = new Date("December 24,2015");
console.log(xmas);
const d3 = new Date(2037, 11, 19, 19, 25, 59);
console.log(d3);
console.log(new Date(3 * 24 * 60 * 60 * 1000)); //three days after epoch
```

dates are objects, so they have methods.

```js
const future = new Date(2037, 10, 19, 15, 23);
console.log(future.getFullYear());
```

get methods have corresponding set methods.

</details>

#### Adding Dates to the Bankist Project

<details>
<summary>
Putting our new knowledge to use
</summary>
each movement has a date.
adding leading zeros with *.padStart(2,0)*
we the default string representation of a date is toISOString()
</details>

#### Operations With Dates

<details>
<summary>
We can use the Timestamp and basic maths to get simple date calculations.
</summary>
we can do all sorts of operations with date objects. like getting the difference in days, months, etc.. this all works because of the time stamp;

```js
const dayFuture = new Date(2037, 10, 19, 19, 15, 23);
const nowTime = Date.now();
const daysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
console.log(daysPassed(nowTime, dayFuture));
```

if we want accurate differences, accounting for timezones, leap years and leap seconds, daylight saving and other stuff, we should use a dedicated library like ~~[Moment](https://momentjs.com/)~~ (**which has reached END OF LIFE**) or a different library.

we will use this in our project to display recent dates.

</details>

</details>

### Internationalizing with **INTL**

<details>
<summary>
A new data type representing international rules. we first use it for dates, but can be used for other stuff.
</summary>
an api for showing dates according for different locale rules.
we create a formatter with a locale and then pass it a Date object to the *.format()* method. we can get out locale via the navigator global object and the *.language* property.

we can further customize the output by supplying an options object. which we can there specify how we want our date to be formatted.

[Language codes](http://www.lingoes.net/en/translator/langcode.htm)

[CheatSheet](https://devhints.io/wip/intl-datetime)

```js
console.log(navigator.language);
const now = new Date();

console.log("International Time");
let options = {};
const formatterUS = new Intl.DateTimeFormat("en-us", options);
const formatterUk = new Intl.DateTimeFormat("en-uk", options);
console.log(formatterUS.format(now), formatterUk.format(now));
options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "long",
  year: "2-digit",
  weekday: "long",
};
const formatterUk2 = new Intl.DateTimeFormat("en-uk", options);
console.log(formatterUk.format(now), formatterUk2.format(now));
```

#### internationalizing Numbers

<details>
<summary>
We can also use the Intl to create number formatters.
</summary>

different languages separate between the fraction parts of a number in different ways,and not all counties use a comma between each three digits, we can get the rules for each locale.
we can also pass an options objects, and say that this number is for some sort of unit

```js
const o = {
  style: "currency", //,unit, percent,currency
  //unit: "mile-per-hour",
  currency: "EUR",
  //useGrouping: false, //stop showing delimiters
};
const usNumberFormatters = new Intl.NumberFormat("en-us", o); // comma between thousands, dot for fractions, "mph"
const germanNumberFormatters = new Intl.NumberFormat("de-gr", o); // dot between thousands, comma for fractions, "mi/h"
const num = 3884764.55;
console.log(usNumberFormatters.format(num), germanNumberFormatters.format(num));
```

we will use this to show currency in out project, but without covering for the exchange rate.

</details>

</details>

### Timers

<details>
<summary>
Function that happen after some time or happen on set intervals.
</summary>
creating a timer that will call a code (callback function) in the future. we pass the callback function and the time delay.
this is registered and added to the call_stack chain, and will work with the eventloop.
this is part of asynchronous loop

```js
setTimeout(function () {
  console.log("callback");
}, 3000);
```

if we want to pass arguments, we add them after the delay. in any case, the timer has the local scope.

```js
setTimeout(
  function (a) {
    console.log(`callback ${a}`);
  },
  5000,
  [1, 12, 13]
);
```

we can cancel the callback function with the function _clearTimeout(timer)_, that takes the timer objects

```js
const timer = setTimeout(() => {}, 10000);
clearTimeout(timer);
```

let's add this to our project, and give some delay to the loan functionality.

if we want to run the callback function at an interval, we can use setInterval, which runs the function several times, until stopped (clear interval).

```js
const clock = setInterval(function () {
  console.log(Date.now);
}, 1000);
```

we will use this to add timeout countdown that logs the user out.
but if we switch between users, we also need to stop the timeout, otherwise both timeout are running.

</details>
</details>
