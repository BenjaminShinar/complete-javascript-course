import icons from 'url:../../img/icons.svg'; //Parcel v.2
import View from './view';
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded!';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _generateMarkup() {
    const makeIngredientField = function (index) {
      return `<label>Ingredient ${index}</label>
          <input
            type="text"
            name="ingredient-${index}"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          `;
    };
    return `
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input placeholder="dish name" required name="title" type="text" />
          <label>URL</label>
          <input placeholder="url" required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input placeholder="Image url" required name="image" type="text" />
          <label>Publisher</label>
          <input placeholder="Publisher" required name="publisher" type="text" />
          <label>Prep time</label>
          <input placeholder="45" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input placeholder="10" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          ${[...Array(6).keys()]
            .map((_, index) => makeIngredientField(index + 1))
            .join('')}
        </div>
        
        `;
  }

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
    //this.update();
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
}

export default new AddRecipeView();
