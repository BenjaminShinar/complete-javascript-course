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

function promiseAndFetch() {
  //const request = fetch('https://restcountries.eu/rest/v2/name/turkey');
  //console.log(request);

  //   fetch('https://restcountries.eu/rest/v2/name/turkey')
  //     .then(response => 23)
  //     .then(r => console.log(r));

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

promiseAndFetch();
