'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  static mapsUrls = [
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
  ];
  #map = L.map('map');
  #mapEvent;
  #workouts = [];
  static #mapZoomLevel = 13;

  constructor() {
    this.#getPosition();
    this.#loadLocaleStorage();
    inputType.addEventListener('change', this.#toggleElevationField);
    form.addEventListener('submit', this.#newWorkout.bind(this));
    this.#map.on('click', this.#showForm.bind(this));
    containerWorkouts.addEventListener('click', this.#moveToWorkout.bind(this));
  }

  #getPosition() {
    L.tileLayer(App.mapsUrls[1], {
      attribution:
        '&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.#loadMap.bind(this),
        function () {
          alert('could not get your position!');
        }
      );
    }
  }

  #loadMap(position) {
    const { latitude, longitude } = position.coords;
    const currentCoords = [latitude, longitude];
    this.#map.setView(currentCoords, App.#mapZoomLevel);
    this.#workouts.forEach(wk => {
      if (wk.elevation) {
        Object.setPrototypeOf(wk, Cycling.prototype);
      } else {
        Object.setPrototypeOf(wk, Running.prototype);
      }
      this.#renderWorkoutList(wk);
      this.#renderWorkoutMarker(wk);
    });
  }

  #showForm(mapE) {
    form.classList.remove('hidden');
    inputDistance.focus();
    this.#mapEvent = mapE;
  }

  #formClear() {
    form.style.display = 'none';
    form.classList.add('hidden');
    inputDistance.value = '';
    inputDuration.value = '';
    inputCadence.value = '';
    inputElevation.value = '';
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  #toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  #newWorkout(e) {
    e.preventDefault();

    if (this.#addMarker()) {
      this.#formClear();
    }
  }

  #addMarker() {
    const validateNumbers = (...inputs) => {
      return inputs.every(inp => Number(inp) && inp > 0);
    };

    const { lat, lng } = this.#mapEvent.latlng;
    const markerCoords = [lat, lng];
    const type = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);
    let workout;
    if (type === 'running') {
      const cadence = Number(inputCadence.value);
      if (!validateNumbers(duration, distance, cadence)) return false;
      workout = new Running(markerCoords, distance, duration, cadence);
    } else {
      const elevation = Number(inputElevation.value);
      if (!(validateNumbers(duration, distance) && Number.isFinite(elevation)))
        return false;
      workout = new Cycling(markerCoords, distance, duration, elevation);
    }
    this.#workouts.push(workout);
    this.#renderWorkoutMarker(workout);
    this.#renderWorkoutList(workout);

    this.#setLocalStorage();
    return true;
  }

  #setLocalStorage() {
    //add to local storage
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  #loadLocaleStorage() {
    const storedWorkouts = JSON.parse(localStorage.getItem('workouts'));
    if (storedWorkouts) {
      this.#workouts = storedWorkouts;
    }
  }

  #renderWorkoutMarker(workout) {
    const popupOptions = {
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: `${workout.type}-popup`, //
    };

    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(L.popup(popupOptions))
      .setPopupContent(
        `${
          workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
        } ${workout.getDescription()}`
      )
      .openPopup();
  }

  #renderWorkoutList(workout) {
    const [activityIcon, ratioValue, ratioUnit, icon2, value2, unit2] =
      workout.type === 'running'
        ? [
            '🏃‍♂️',
            'min/km',
            workout.pace.toFixed(2),
            '🦶🏼',
            workout.cadence,
            'spm',
          ]
        : ['🚴‍♀️', 'km/h', workout.speed, '⛰', workout.elevation, 'm'];

    const createWorkoutDetails = (icon, value, unit) => {
      // const workoutDetails = document.createElement('div');
      // workoutDetails.classList.add('workout__details');
      const workoutDetails = `
      <div class="workout__details">
    <span class="workout__icon">${icon}</span>
    <span class="workout__value">${value}</span>
    <span class="workout__unit">${unit}</span>
    </div>`;
      return workoutDetails;
    };

    const html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
    <h2 class="workout__title">${workout.getDescription()}</h2>
    ${createWorkoutDetails(activityIcon, workout.distance, 'km')}
    ${createWorkoutDetails('⏱', workout.duration, 'min')}
    ${createWorkoutDetails('⚡️', ratioValue, ratioUnit)}
    ${createWorkoutDetails(icon2, value2, unit2)}
    </li>
    `;

    form.insertAdjacentHTML('afterend', html);
  }

  #moveToWorkout(e) {
    const clickedWorkoutEl = e.target.closest('.workout');
    if (clickedWorkoutEl) {
      //guard
      const selectedWorkout = this.#workouts.find(
        wk => wk.id === Number(clickedWorkoutEl.dataset.id)
      );
      if (selectedWorkout) {
        selectedWorkout.clicks++;
        console.log(selectedWorkout.clicks);
        this.#map.setView(selectedWorkout.coords, App.#mapZoomLevel, {
          animate: true,
          pan: {
            duration: 1,
          },
        });
      }
    }
  }
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

class Workout {
  date = new Date();
  id = this.date.getTime();
  #_clicks = 0;
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }

  get type() {
    return 'workout';
  }
  get clicks() {
    return this.#_clicks;
  }
  set clicks(v) {
    this.#_clicks = v;
  }

  getDescription() {
    const capitalized = (function (word) {
      return word[0].toUpperCase() + word.slice(1);
    })(this.type);

    if (typeof this.date === 'string') {
      console.log('converting!');
      this.date = new Date(this.date);
    }
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${capitalized} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    //min/km
    //duration / distance
    this.pace = this.duration / this.distance;
  }
  get type() {
    return 'running';
  }
}
class Cycling extends Workout {
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    //kn/h
    //distance/(duration / 60)
    this.speed = this.distance / (this.duration / 60);
  }
  get type() {
    return 'cycling';
  }
}

const app = new App();

let r = new Running([1, 2], 60, 2, 60);
let c = new Cycling([1, 2], 4, 4, 95);
