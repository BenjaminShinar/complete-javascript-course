'use strict';
let hasDriversLicence = false;
const passTest = true;

if (passTest) {
    //hasDriverLicence = true; // wrong name. variable not defined, won't work in strict mode
    hasDriversLicence = true; // correct name
}
if (hasDriversLicence) {
    console.log("I can drive!");
}

function foo() {
    console.log("foo was called!");
}

foo();
foo(111);
let x = foo();
console.log(x);

const age1 = calcAge1(1987); //possible

function calcAge1(birthYear) {
    const thisYear = 2037;
    return thisYear - birthYear;
}

//const age2 = calcAge2(1991); // call before initialization, impossible
//function expression
const calcAge2 = function (birthYear) {
    const thisYear = 2037;
    return thisYear - birthYear;
};

const age2 = calcAge2(1991);
console.log(age1, age2);

function TestAverages2() {
    function foo(d1, d2, d3, k1, k2, k3) {
        const calcAverage = (a, b, c) => {
            const mean = (a + b + c) / 3;
            return mean;
        };
        const d_mean = calcAverage(d1, d2, d3);
        const k_mean = calcAverage(k1, k2, k3);

        const checkWinner = (avgDolphins, avgKoalas) => {
            if (avgDolphins >= 2 * avgKoalas) {
                console.log(`Dolphins win (${avgDolphins} to ${avgKoalas})!`);
            }
            else if (avgKoalas >= 2 * avgDolphins) {
                console.log(`Koalas win (${avgKoalas} to ${avgDolphins})!`);
            }
            else {
                console.log("nobody wins", avgDolphins, avgKoalas);
            }
        }
        checkWinner(d_mean, k_mean);

    }
    foo(44, 23, 71, 65, 54, 49);
    foo(85, 54, 41, 23, 34, 27);
}
TestAverages2();