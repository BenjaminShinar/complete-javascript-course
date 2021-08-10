let js = 'amazing';
if (js === 'amazing') {
    //alert("javascript is fun");
}
console.log(40 + 8 + 23 - 10);

function TestBMI1() {
    foo = (mark_weight, mark_height, john_weight, john_height) => {
        const bmi = (w, h) => { return w / (h ** 2); };
        console.log(
            bmi(mark_weight, mark_height) > bmi(john_weight, john_height) ?
                "Mark" : "John"
        );
    };
    foo(78, 1.69, 92, 1.95);
    foo(95, 1.88, 85, 1.76);
}
TestBMI1();

function TestBMI2() {
    foo = (mark_weight, mark_height, john_weight, john_height) => {
        const bmi = (w, h) => { return w / (h ** 2); };
        let markBMI = bmi(mark_weight, mark_height);
        let johnBMI = bmi(john_weight, john_height);
        let highName, highBmi, lowName, lowBmi;
        if (markBMI > johnBMI) {
            highBmi = markBMI;
            highName = "Mark";
            lowBmi = johnBMI;
            lowName = "John";
        }
        else {
            highBmi = johnBMI;
            highName = "John";
            lowBmi = markBMI;
            lowName = "Mark";
        }
        console.log(`${highName}'s BMI (${highBmi}) is higher than ${lowName}'s BMI (${lowBmi})`)
    }
    foo(78, 1.69, 92, 1.95);
    foo(95, 1.88, 85, 1.76);
}

function TestAverages() {
    function foo(d1, d2, d3, k1, k2, k3) {
        const bar = (a, b, c) => {
            const mean = (a + b + c) / 3;
            return [mean, mean >= 100]; //multiple return values
        };
        const [d_mean, d_above] = bar(d1, d2, d3); //decompose return values
        const [k_mean, k_above] = bar(k1, k2, k3);

        if (d_mean > k_mean && d_above) {
            console.log("Dolphin team wins!", d_mean);
        }
        else if (k_mean > d_mean && k_above) {
            console.log("Koala team wins!", k_mean);

        }
        else if (k_mean === d_mean && d_above && k_above) {
            console.log("draw! both above mean!", d_mean, k_mean);
        }
        else {
            console.log("nobody wins!", d_mean, k_mean);
        }
    }
    foo(96, 108, 89, 88, 91, 110);
    foo(97, 112, 101, 109, 95, 123);
    foo(97, 112, 101, 109, 95, 106);
}

function TipCalculator() {
    function foo(bill) {

        const tip = bill * ((bill >= 50 && bill <= 300) ? 0.15 : 0.2);
        console.log(`The bill was ${bill}, the tip is ${tip}, so the total is ${tip + bill}`);
    }
    foo(275);
    foo(40);
    foo(430);
}
TestBMI1();
TestBMI2();
TestAverages();
TipCalculator();
console.log("number coerced into string", '10' + '3');
console.log("string coerced into number", '10' - '3');
