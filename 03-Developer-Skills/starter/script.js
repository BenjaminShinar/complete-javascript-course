// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const x = 23;
const z = 44;
const calcAge = birthYear => 2037 - birthYear;
console.log('dsa');

function challenge1() {
  const printForecast = function (data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return;

    console.log(
      `... ${data
        .map((temperature, index) => {
          return `${temperature}\u2103  in ${index + 1} days`;
        })
        .join(' ... ')}`
    );
  };

  printForecast([17, 21, 23]);
  printForecast([12, 5, -5, 0, 4]);
}

challenge1();
