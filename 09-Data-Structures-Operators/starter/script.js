'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

const [a, , , , b] = [1, 2, 3, 4, 5];
const [c] = [10, 11, 12];
console.log(a, b, c);

let [a1, a2, a3] = ['b1', 'b2', 'b3'];
console.log(a1, a2, a3);
[a2, a3, a1] = [a1, a2, a3];

console.log(a1, a2, a3);

const nested = [[2], 3, 4, [5, 6, 10]]; //nested array
const [[n1], n2, , [n3, , n4]] = nested;
console.log(n1, n2, n3, n4); // 2,3,5,10

const { categories2, location2 } = restaurant;
console.log(categories2, location2);

const {
  categories: cats,
  location: locs,
  openingHours: { fri },
  openingHours: { sat: saturday },
} = restaurant;
console.log(cats, locs, fri, saturday);

const o = {
  a: 1,
  b: 2,
  c: [10, 11, 12],
  d: { fname: 'jon' },
  e: { ll: 'lala' },
};
const {
  a: a11,
  c: [c1, c2],
  d: { fname: firstName2 },
  e: { ll },
} = o;
console.log(a11, firstName2, c1, c2, ll);

const person = {
  firstName: 'john',
  lastName: 'smith',
};
const { firstName, middleName = 'no middle name', lastName, age } = person;
console.log(firstName, middleName, lastName, age);

let num1 = 11;
let num2 = 999;
//tons of code...
const obj1 = { num1: 23, num2: 55, num3: 999 };
({ num1, num2 } = obj1);
console.log(num1, num2);

function power2(obj) {
  const { base, exp } = obj; //normal destructing
  return base ** exp;
}

function power3({ base, exp }) {
  //destructing inside the function definitions!
  return base ** exp;
}

function power4({ base: baseVal, exponent: exp = 2 }) {
  //destructing inside the function definitions with default values and a different name
  return baseVal ** exp;
}

const p1 = { base: 2, exp: 9, otherName: 'jogs', a: [1, 2, 3] };
console.log(p1, power2(p1), power3(p1));
const p2 = {
  a: 'my name is!',
  d: ['some', 'different', 'structure'],
  base: 3,
  exp: 5,
};
console.log(p2, power2(p2), power3(p2));
let base = 4;
let exp = 2;
console.log(power2(base, exp), power3({ exp, base })); // wrap in {}
console.log(power4({ base: 9 })); //default exponent to 2, rename inside function

const arr1 = [1, 2, 3];
const arr2 = [arr1[0], arr1[1], arr1[2], 4, 5]; //old way
const arr3 = [...arr1, 4, 5]; //spread operator

console.log(arr1, arr2, arr3);
console.log(...arr3);

const arr4 = [[1, 2, 3]];
const shallowCopyArr4 = [...arr4];
console.log(arr4, shallowCopyArr4);
arr4[0].unshift(5);
console.log(arr4, shallowCopyArr4);

const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

const str = 'hello';
console.log(...str);
const letters = [...str, 'a', 'd'];
console.log(letters, ...letters);

const orderPasta = function (ing1, ing2, ing3) {
  console.log(`you ordered a pasta from ${ing1},${ing2},${ing3}`);
};
orderPasta('a', 'b', 'c');
let ingredients = ['one', 'two', 'three', 'four'];
orderPasta(...ingredients);

const oldNwRestaurant = Object.assign(restaurant, { founder: 'joe' });
const newRestaurant = { ...restaurant, founder: 'joe' };
newRestaurant.name = 'Roma';
console.log(restaurant, oldNwRestaurant, newRestaurant);

const arr7 = [1, 2, ...[3, 4]]; //spread.
const [a7, b7, ...others7] = [1, 2, 3, 4, 5]; //rest
console.log(a7, b7, others7);

const arr8 = [1, 2, 3];
const arr9 = ['a', 'b', 'c'];
const [a8, b8, , ...numbers8] = [...arr8, ...arr9];
console.log(a8, b8, numbers8);

const obj3 = { a: 1, b: 4, c: 5, d: 7 };
const { a: a9, ...obj4 } = obj3;
console.log(obj4);

const add2 = function (...numbers) {
  console.log('add2', numbers);
};
add2();
add2(1);
add2(2, 3);
add2(1, 3, 4, 6);
add2(...[1, 2, 3, 4]); //spread and rest
const optionalParams = function (first, ...others) {
  console.log(first, others.length);
  if (others.length > 0) optionalParams(...others);
};
optionalParams(1, 2, 3);

console.log(3 || 'jonas'); //3
console.log(0 || 'jonas' || 4); //jonas

console.log(0 && null); //0
console.log(7 && 1 && undefined); //undefined
console.log(7 && null && undefined); //null
console.log(7 && 0); //0
console.log(7 && 1); //0

{
  const a = { vi: 4 };
  const b = { v: 0 };
  const c = { v: 5 };
  let firstExisting = a.v || b.v || c.v; //5, but b.v is a real value!
  console.log('firstExisting', firstExisting);
  firstExisting = undefined ?? null ?? a.v ?? b.v ?? c.v; //0,
  console.log('firstExisting', firstExisting);
}
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

function challenge1() {
  const [players1, players2] = game.players; //array destructuring
  const [gk, ...fieldPlayers] = players1; // rest operator
  const allPlayers = [...players1, ...players2]; // spread operator
  const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic']; //spread operators
  const { team1, x: draw, team2 } = game.odds; //object destructuring with names
  const printGoals = function (...players) {
    //rest parameters
    console.log(players, players.length);
  };
  printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
  printGoals(...game.scored); //spread operator
  let winner = (team1 < team2 && 'team1') || 'team2'; // short circuiting.
  console.log(`${game[winner]} is likely to win`);
  team1 < team2 && console.log('team1 is more likely to win');
  team2 < team1 && console.log('team2 is more likely to win');
}
challenge1();

const arr_e = [1, 2, 3];
for (let item of arr_e.entries()) {
  console.log(item[0], item[1]);
}
for (let [index, item] of arr_e.entries()) {
  console.log(index, item);
}

{
  const a = 'firstDay';
  const o = {
    [a]: 'this is the first',
  };
  console.log(o.firstDay);
}

{
  //console.log(restaurant.openingHours.mon.open); // error, mon is undefined, so we cant read a property of it!
  const o = { a: { b: { c: 5 } } };
  console.log(o.a.b.c); // cool. this works
  //console.log(o.a.bb.c); // error
  console.log(o.a.bb?.c); // undefined, but not error
  console.log(o.a.bb?.c ?? 'no such property'); // undefined, but not error
  console.log(o.a.b?.c ?? 'no such property'); // works find
}
for (let day of ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']) {
  console.log(
    `on ${day}, the resultant is ${
      restaurant.openingHours[day]?.open ?? 'closed'
    }`
  );
}
{
  const a = {
    foo(n) {
      console.log(n);
    },
  };
  a.foo(1);
  a.bar?.(1);
  const b = [{ firstName: 'joe' }, 2];
  //console.log(b[2].firstName); //error
  console.log(b[0]?.firstName);

  console.log(b[2]?.firstName); //undefined

  const o = { a: 2, b: 3, c: [1, 2] };
  for (const e of Object.keys(o)) {
    console.log(e, o[e]);
  }
  for (const v of Object.values(o)) {
    console.log(v);
  }
  for (const e of Object.entries(o)) {
    console.log(e[0], e[1]);
  }
}

function challenge2() {
  //array destructuring, entires()
  for (let [goalIndex, scorer] of game.scored.entries()) {
    console.log(`Goal ${goalIndex}: ${scorer}`);
  }

  //object.values()
  let avgOdd = 0;
  for (let odd of Object.values(game.odds)) {
    avgOdd += odd;
  }
  avgOdd /= Object.values(game.odds).length;
  console.log(`average odd is ${avgOdd}`);

  //object entries,checking existence
  for (let [key, odd] of Object.entries(game.odds)) {
    console.log(
      `${key} odd of ${game[key] ? `victory of ${game[key]}` : 'draw'}: ${odd}`
    );
  }
  // creating properties
  const scorers = {};
  for (let scorer of game.scored) {
    scorers[scorer] ? scorers[scorer]++ : (scorers[scorer] = 1);
  }
  console.log(scorers);
}
challenge2();

const m = new Map();
m.set([1, 2], 'hello');
const mArray = [1, 2];
console.log(m.has([1, 2]), m.has(mArray)); // false
m.set(mArray, 'world');
console.log(m.has(mArray), m.get(mArray)); // exists

function challenge3() {
  const gameEvents = new Map([
    [17, '⚽ GOAL'],
    [36, '� Substitution'],
    [47, '⚽ GOAL'],
    [61, '� Substitution'],
    [64, '� Yellow card'],
    [69, '� Red card'],
    [70, '� Substitution'],
    [72, '� Substitution'],
    [76, '⚽ GOAL'],
    [80, '⚽ GOAL'],
    [92, '� Yellow card'],
  ]);

  let events = [...new Set(gameEvents.values())];
  console.log('events', events);
  gameEvents.delete(64);
  console.log(
    `an event happened, on average, every ${90 / gameEvents.size} minutes`
  );
  for (const [time, event] of gameEvents) {
    console.log(`[${time <= 45 ? 'First' : 'Second'} Half] ${time}: ${event}`);
  }
}
challenge3();

const checkMiddleSeat = function (seat) {
  //B and E are middle seats
  const seatLetter = seat.slice(-1);
  if (new Set(['B', 'E']).has(seatLetter)) {
    console.log(`seat ${seat} is middle seats`);
  }
};
checkMiddleSeat('11B');
checkMiddleSeat('11E');
checkMiddleSeat('12A');
checkMiddleSeat('11C');

const compareEmail = function (emailCorrect, email) {
  const fixedEmail = email.toLowerCase().trim();
  return fixedEmail == emailCorrect;
};

const email1 = 'hello@jonas.io';
const email2 = '   hello@Jonas.io \n';
console.log(compareEmail(email1, email2));
const announcement =
  'all passengers come to boarding door 23, boarding door 23!';
console.log(announcement.replace('door', 'gate')); // only the first is replaced
console.log(announcement.replace(/door/, 'gate')); // using regular expression replace one.
console.log(announcement.replace(/door/g, 'gate')); // using regular expression replace all  with global flag.
console.log([...'11+2+99'.split('+'), 2, 3].join('la')); //split, spread, join

//document.body.append(document.createElement('textarea'));
//document.body.append(document.createElement('button'));

const challenge4 = function () {
  const foo = str => {
    let [firstWord, secondWord] = str.trim().toLowerCase().split('_');
    return [
      firstWord,
      secondWord.replace(secondWord[0], secondWord[0].toUpperCase()),
    ].join('');
  };

  console.log(foo('underscore_case   '));
  console.log(foo('  first_name '));
  console.log(foo('Some_Variable'));
  console.log(foo('  calculate_AGE'));
  console.log(foo('delayed_departure'));

  const fullText = `underscore_case
first_name
Some_Variable 
 calculate_AGE
delayed_departure   `;
  console.log(fullText);
  const fooAll = function (fulltext) {
    const moddedText = [];
    for (const [index, text] of fullText.split('\n').entries()) {
      moddedText.push(foo(text).padEnd(20, ' ') + '✔'.repeat(index + 1));
    }
    return moddedText;
  };

  console.log(fooAll(fooAll));
  // document.querySelector('button').addEventListener('click', function () {
  //   console.log('converting!', document.querySelector('textarea').value);
  //   document.querySelector('textarea').value = fooAll(
  //     document.querySelector('textarea').value
  //   ).join('\n');
  //});
};
challenge4();

const practice = function () {
  console.log(flights);
  const flightPart = [];

  for (let flight of flights.replace(/_/g, ' ').split('+')) {
    let [situation, from, to, when] = flight.trim().split(';');
    let pad = '';

    if (situation.startsWith('Delayed')) {
      pad = '🔴';
    }

    flightPart.push(
      `${pad.padEnd(3)} ${situation.padStart(20)} from ${from
        .slice(0, 3)
        .toUpperCase()} to ${to.slice(0, 3).toUpperCase()} (${when.replace(
        ':',
        'h'
      )})`
    );
  }

  console.log(flightPart.join('\n'));
};

practice();
