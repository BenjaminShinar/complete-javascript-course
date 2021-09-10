'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

const mapsUrls = [
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
];
// const googleMapsUrl = ({ latitude, longitude }) =>
//   `https://www.google.pt/maps@${latitude},${longitude}`;

const map = L.map('map');
L.tileLayer(mapsUrls[1], {
  attribution:
    '&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

let mapEvent;

const formDisplay = function () {
  form.classList.remove('hidden');
  inputDistance.focus();
};
const formClear = function () {
  form.classList.add('hidden');
  inputDistance.value = '';
  inputDuration.value = '';
  inputCadence.value = '';
  inputElevation.value = '';
};

map.on('click', function (mapE) {
  formDisplay();
  mapEvent = mapE;
});

const addMarker = function (markerCoords, text) {
  const popupOptions = {
    maxWidth: 250,
    minWidth: 100,
    autoClose: false,
    closeOnClick: false,
    className: 'cycling-popup', //
  };

  L.marker(markerCoords)
    .addTo(map)
    .bindPopup(L.popup(popupOptions))
    .setPopupContent(text)
    .openPopup();
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude, longitude } = position.coords;
      const currentCoords = [latitude, longitude];
      map.setView(currentCoords, 13);
    },
    function () {
      alert('could not get your position!');
    }
  );
}

form.addEventListener('submit', function (e) {
  //display marker
  e.preventDefault();
  const { lat, lng } = mapEvent.latlng;
  addMarker([lat, lng], 'workout');
  formClear();
});

inputType.addEventListener('change', function (e) {
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
});
