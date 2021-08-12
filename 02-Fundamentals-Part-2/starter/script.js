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

function TestTips2() {
    const calcTip = function (bill) {
        const calcTipPercentage = bill => {
            if (bill > 300 || bill < 50) return 0.15;
            else return 0.2;
        }
        return bill * calcTipPercentage(bill);
    }
    const bills = [125, 555, 44];
    const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
    console.log(bills, tips);
    const totals = new Array(bills.shift() + tips.shift(), bills.shift() + tips.shift(), bills.shift() + tips.shift());
    console.log(totals);
}
TestTips2();

const Jonas =
{
    firstName: "Jonas",
    LastName: "Smith",
    adult: true,
    age: 21,
    friends: ['Annie', 'Dan', 'jack']
};
console.log(`${Jonas.firstName} has ${Jonas.friends.length} friends, and his best friend is called ${Jonas.friends[0]}`);
const dan = {
    firstName: "Dan",
    LastName: "Smith",
    birthYear: 1991,
    friends: ['Annie', 'Dan', 'Peter'],
    hasDriverLicence: true,
    job: "Teacher",
    calcAge: function (birthYear) {
        return 2037 - birthYear;
    },
    age: function () {
        return this.calcAge(this.birthYear); // the this keyword
    },
    calcAgeFail: () => { console.log("this.birthYear", this.birthYear) }, // doesn't work! arrow functions don't get the this keyword!
    calcAgeBetter: function () { return 2050 - this.birthYear; } // this does work, because normal function receive the this keyword
};
console.log(dan.calcAge()); //NaN
console.log(dan.calcAge(dan.birthYear));
console.log(dan.age());
console.log(dan.calcAgeBetter());
console.log(dan.calcAgeFail());
dan.summary = function () {
    let s = `${this.firstName} is a ${this.calcAgeBetter()} years old ${this.job}`;
    if (this.hasDriverLicence) {
        s += ` and he has a drivers Licence`;
    }
    return s;
};
console.log(dan.summary());
//dan = "hello"; // cant reassign const value

function TestBMI3() {
    const bmi = person => person.bmi = (person.weight / (person.height ** 2)); //one liner
    const mark = {
        firstName: "Mark",
        lastName: "Miller",
        weight: 78,
        height: 1.69,
        calcBMI: function () {
            bmi(this);
            return this.bmi;
        }
    };
    const john = {
        firstName: "John",
        lastName: "Smith",
        weight: 92,
        height: 1.95,
        calcBMI: function () {
            bmi(this);
            return this.bmi;
        }
    };
    const foo = (mark, john) => {
        const orderBmi = (p1, p2) => {
            if (p1.calcBMI() > p2.calcBMI())
                return [p1, p2];
            else
                return [p2, p1];
        };
        const [high, low] = orderBmi(mark, john);
        console.log(`${high.firstName}'s BMI (${high.bmi}) is higher than ${low.firstName}'s BMI (${low.bmi})`)
    };
    foo(mark, john);
    mark.weight = 62;
    foo(mark, john);
}
TestBMI3();