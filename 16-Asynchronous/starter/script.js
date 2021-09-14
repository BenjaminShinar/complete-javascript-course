'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// alert('Text Set!'); //blocking
// console.log('console!');
//setTimeout(() => console.log('set timeout'), 5000); // happens after the next line!
//console.log('console!');
const URLS = {
  name: 'https://restcountries.eu/rest/v2/name/',
  code: 'https://restcountries.eu/rest/v2/alpha/',
};

const createCard = function (data, className = '') {
  const html = `<article class="country ${className}">
  <img class="country__img" src=${data.flag} />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      Number(data.population) / 1000000
    ).toFixed(2)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages
      .map(lg => lg.name)
      .join(',')}</p>
    <p class="country__row"><span>💰</span>${data.currencies
      .map(cur => cur.name)
      .join(',')}</p>
  </div>
</article>`;
  countriesContainer.style.opacity = 1;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

function CountriesApi() {
  const getCountryData = function (country) {
    const request = new XMLHttpRequest();
    request.open('GET', URLS['name'] + country);
    request.send();
    request.addEventListener('load', function () {
      //the 'this' the the request.
      const [data] = JSON.parse(this.responseText);
      console.log(data);
      createCard(data);
    });
  };

  const getCountryDataByCode = function (code) {
    const request = new XMLHttpRequest();
    request.open('GET', URLS['code'] + code);
    request.send();
    request.addEventListener('load', function () {
      const data = JSON.parse(this.responseText);
      createCard(data, 'neighbour');
    });
  };

  getCountryData('israel');

  const getCountryAndNeighbor = function (country) {
    const request = new XMLHttpRequest();
    request.open('GET', URLS['name'] + country);
    request.send();
    request.addEventListener('load', function () {
      //the 'this' the the request.
      const [data] = JSON.parse(this.responseText);
      createCard(data);

      // get neighbors
      const [neighbor] = data.borders;
      if (neighbor) {
        getCountryDataByCode(neighbor);
      }
    });
  };
  getCountryAndNeighbor('portugal');
  getCountryAndNeighbor('usa');
}

//CountriesApi();
const getCountryDataPromise = function (country) {
  const requestPromise = fetch(URLS['name'] + country);
  requestPromise
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      createCard(data[0]);
    });

  //simplified
  /*
  fetch('https://restcountries.eu/rest/v2/name/canada')
    .then(response => response.json())
    .then(data => console.log(data[0]));
    */
};

function promiseAndFetch() {
  //const request = fetch('https://restcountries.eu/rest/v2/name/turkey');
  //console.log(request);

  //   fetch('https://restcountries.eu/rest/v2/name/turkey')
  //     .then(response => 23)
  //     .then(r => console.log(r));

  //getCountryDataPromise('russia');

  const getCountryAndNeighborPromise = function (country) {
    const requestPromise = fetch(URLS['name'] + country);
    requestPromise
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        createCard(data[0]);
        const neighbor = data[0].borders[0];
        if (!neighbor) return; //guard

        return fetch(URLS['code'] + neighbor);
      })
      .then(response => response.json())
      .then(data => createCard(data, 'neighbour'));
  };
  getCountryAndNeighborPromise('ireland');
}
const getCountryWithPromiseAndErrors = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => response.json())
    .then(data => createCard(data[0]))
    .catch(err => {
      console.error(`got error! console ${err.message}`);
      renderError(err.message);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

const getCountryWithPromiseAndErrorsStatusCode = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`country not found! ${response.status}`);
      }
      return response.json();
    })
    .then(data => createCard(data[0]))
    .catch(err => {
      console.error(`got error! ${err.message}`);
      renderError(err.message);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

const getJson = function (url, errorMsg = 'Something Went Wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} - ${response.status} error!`);
    }
    return response.json();
  });
};

const getCountryWithPromiseAndErrorsStatusCode2 = function (country) {
  getJson(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found!'
  )
    .then(data => {
      createCard(data[0]);
      const neighbor = data[0].borders[0];
      if (!neighbor) throw new Error('no neighbors!');
      return getJson(URLS.code + neighbor);
    })
    .then(data => createCard(data, 'neighbour'))
    .catch(err => {
      console.error(`got error! ${err.message}`);
      renderError(err.message);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

//promiseAndFetch();

const Challenges = {
  //
  whereAmI([lat, lng]) {
    const urls = {
      geocode: `https://geocode.xyz/${lat},${lng}?geoit=json`,
      bigData: `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
    };

    console.log(lat, lng);
    fetch(urls.bigData)
      .then(response => {
        if (!response.ok)
          throw new Error(
            `problem with geocode! status code ${response.status}`
          );
        return response.json();
      })
      .then(data => {
        console.log(
          `${lat},${lng},you are in ${data.city},${data.countryName}`
        );
        return getJson(
          `https://restcountries.eu/rest/v2/name/${data.countryName}`,
          'Country not found!'
        );
      })
      .then(data => {
        createCard(data[0]);
      })
      .catch(err => console.error(err));
  },
  challenge1() {
    console.log('Challenge 1');
    const testData = [
      [52.508, 13.381],
      [19.037, 72.873],
      [-33.933, 18.474],
    ];
    //this.whereAmI(testData[0]);
    testData.forEach(data => this.whereAmI(data));
  },
  challenge2() {
    const imagesEL = document.querySelector('.images');

    const createImage = function (imgPath) {
      return new Promise(function (resolve, reject) {
        const img = document.createElement('img');
        img.src = imgPath;
        //
        img.addEventListener('load', function () {
          imagesEL.appendChild(img);
          resolve(img);
        });
        img.addEventListener('error', function () {
          reject(new Error(`${imgPath} failed!`));
        });
      });
    };
    const images = [1, 2, 3].map(x => `img/img-${x}.jpg`);
    let currentImage;
    createImage(images[0])
      .then(img => {
        currentImage = img;
        return wait(2);
      })
      .then(() => (currentImage.style.display = 'none'))
      .then(() => wait(2))
      .then(() => createImage(images[1]))
      .then(img => {
        currentImage = img;
        return wait(2);
      })
      .then(() => (currentImage.style.display = 'none'))
      .catch(err => console.error(err))
      .finally(() => console.log('finisehd'));
  },
};

//Challenges.challenge1();
//btn.addEventListener('click', () => Challenges.challenge1.call(Challenges));

const eventLoopTest = function () {
  console.log('test event loop');
  setTimeout(() => console.log('0 sec timer'), 0);
  Promise.resolve('resolved promise!').then(d => console.log(d));
  console.log('test end');

  Promise.resolve('resolved 2').then(res => {
    for (let i = 0; i < 10 ** 9; ++i) {
      //waste time
    }
    console.log(res);
  });
};

//eventLoopTest();

function ourOwnPromise() {
  const lotteryPromise = new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve('The promise was resolved! you won!');
      } else {
        reject('The promise was rejected! you lost!');
      }
    }, 1500);
  });
  lotteryPromise.then(x => console.log(x)).catch(err => console.error(err));
}
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// wait(5)
//   .then(() => {
//     console.log('I waited 5 seconds');
//     return wait(2);
//   })
//   .then(() => console.log('I waited for 2 seconds'));

//btn.addEventListener('click', ourOwnPromise);

const getMyPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
getMyPosition().then(res => console.log(res));

const whereAmINow = function () {
  // const urls = {
  //   geocode: `https://geocode.xyz/${lat},${lng}?geoit=json`,
  //   bigData: `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
  // };

  getMyPosition()
    .then(res => {
      const { latitude: lat, longitude: lng } = res.coords;
      const urls = {
        geocode: `https://geocode.xyz/${lat},${lng}?geoit=json`,
        bigData: `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
      };
      return fetch(urls.bigData);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`problem with geocode! status code ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(`you are in ${data.city},${data.countryName}`);
      return getJson(
        `https://restcountries.eu/rest/v2/name/${data.countryName}`,
        'Country not found!'
      );
    })
    .then(data => {
      createCard(data[0]);
    })
    .catch(err => console.error(err));
};
//btn.addEventListener('click', whereAmINow);

btn.addEventListener('click', Challenges.challenge2.bind(Challenges));
