//scoping rules
let x = 7;
function zoo() {
  return 8;
}
let y = x;
x = zoo();
let z = x;

console.log(x, y, z);

function foo() {
  console.log("foo");
  for (let arg of arguments) {
    console.log(arg);
  }
}

foo(1, 2, 3);

foo("1", false, foo, [1, 2, 3]);

function bar() {
  foo();
}

function bar2() {
  const foo2 = (fname) => {
    console.log(`foo2 with arrow,${fname}`);
    for (let arg of arguments) {
      console.log(arg);
    }
  };
  foo2("dsa");
}

bar();
bar2("1");

const foo2 = () => {
  for (let arg of arguments) {
    console.log(arg);
  }
};
foo2(); // the global context arguments

function bar2() {
  const foo3 = () => {
    for (let arg of arguments) {
      console.log(arg);
    }
  };
  return foo3;
}
const f3func = bar2(1, 23, "this will show");
f3func("nope!");

function xxx(b) {
  if (b) {
    let tx = 10;
    zzz = function () {
      console.log("zzz", tx);
    };
    let zx = 10; //let is block scoped
    var t = 5; // var is inside the block, but is still accessed outside the block
  }
  //console.log(zx); //not defined!
  console.log(t);
  zzz(); // zzz is inside a block, but still we can access it!
}

function xxx2(b) {
  "use strict";
  if (b) {
    zzz2 = function () {
      console.log("zzz2");
    };
    let zx = 10; //let is block scoped
    var t = 5; // var is inside the block, but is still accessed outside the block
  }
  //console.log(zx); //not defined!
  console.log(t);
  //zzz2(); //undefined in strict mode!
}
xxx(true);
xxx(false);
xxx2(false);
