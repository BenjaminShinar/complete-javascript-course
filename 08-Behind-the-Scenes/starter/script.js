'use strict';

function calcAge(birthYear) {
  const age = 2037 - birthYear;
  console.log(firstName, age);
  //console.log(lastName);
  return age;
}
const age = 99;
let firstName = 'jonas';
calcAge(1991);
let LastName = 'jonas';
firstName = 'ben';
calcAge(1992);

function foo() {
  console.log(firstName); // goes to earlier scope
  {
    let firstName = 99; //new variable
    console.log(firstName);
  }
  {
    firstName = 'changed'; // changing the parent scope
  }
  console.log(firstName);
}
foo();

console.log(var_v_variables); // undefined, but exists because of hoisting
//console.log(let_v_variables); // unaccessble, wasn't hoisted!
var_v_variables = 'still not declared';
console.log(var_v_variables); // has value before formal deceleration
var var_v_variables = 'formal deceleration';
let let_v_variables = 'lets variable';
console.log(var_v_variables); // has value

//bar(); //cannot access before initialization, function expression declared with const
//console.log(bar); //cannot access before initialization,
const bar = () => {
  console.log('bar');
};
console.log('before definition', bar2, typeof bar2); // can access this, becuase it was declared with var, so it hoisted,
//bar(); can't do this, because it doesn't have the value of a function yet
var bar2 = () => {
  console.log('bar2');
};
console.log('after definition', bar2, typeof bar2);
var b1 = '99'; //declared once
var b1 = 'hello'; // declare again,we can do this
let b2 = 99;
//let b2 = 'g'; // cant declare again!

//console.log(b3);

//console.log(window.window.b1); //var - property on the window object
//console.log(window.window.b2); //let - no property on the window object

console.log(this);

const person = {
  y: 1,
  bar: function () {
    console.log(this); //the calling object
  },
  bar2: () => {
    console.log(this); //global this, arrow function
  },
};
person.bar();
person.bar2();
const p2 = { ttt: 99 };
p2.bar = person.bar;
p2.bar(); //now the calling object is p2, so the this referees to p2, and p2 doesn't have property y

const bar3 = person.bar;
bar3(); // bar3 is a regular function, it doesn't have a this!

const j = {
  a: 1,
  b: 's',
  foo1: function () {
    console.log('foo1', this); //this is the calling object
  },
  foo2: () => {
    console.log('foo2', this); //global this
  },
  foo3: function () {
    const isMillennial = function () {
      console.log('isMillennial', this); //undefined. it's a regular function call
    };
    const self = this;
    const useSelf = function () {
      console.log('useSelf', self); //undefined. it's a regular function
    };
    const isArrow = () => {
      console.log('isArrow', this); //the surrounding this, j
    };
    isMillennial();
    useSelf();
    isArrow();
  },
};
j.foo1();
j.foo2();
j.foo3();

function argFoo(a, b, c) {
  console.log(arguments); //displays te arguments and their positions
  const nestedArrFoo = () => {
    console.log(arguments); // go up one level
  };
  nestedArrFoo();
}

argFoo(1, 2, 3, 4, 5, 'false');
const argFoo2 = (a, b, c) => {
  console.log(arguments); // go up one level, global arguments
};
//argFoo2(1, 33, [1, 11]);

let prim2 = 100;
let prim3 = 50;
const ar = [prim2, prim3]; //created on the heap
console.log(prim2, prim3, ar);
prim2 = 60;
ar[1] = 70;
console.log(prim2, prim3, ar); //changes don't reflect

const jessica = {
  firstName: 'Jessica',
  lastName: 'david',
};
const married = jessica;
married.lastName = 'Will';
married.age = 88;
console.log(married, jessica); //same, objects are reference type

const o1 = { a: 1, b: 3, c: 'aa', d: [1, 2, 3, 4] };
const o2 = Object.assign({}, o1); //create new object form the o1 and empty object.
o2.a = 44;
console.log(o1, o2); // now a is different
o1.d.push(205);
console.log(o1, o2); // but d is still shared? this isn't what we wanted!
