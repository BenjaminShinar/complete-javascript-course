import icons from 'url:../../img/icons.svg'; //Parcel v.2
import View from './view';
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded!';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _generateMarkup() {}

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleView.bind(this));
  }
  _addHandlerHideWindow() {
    ['click'].forEach(ev =>
      this._btnClose.addEventListener(ev, this.toggleView.bind(this))
    );
  }
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = Object.fromEntries([...new FormData(this)]);
      handler(data);
    });
  }

  toggleView() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
}

export default new AddRecipeView();
