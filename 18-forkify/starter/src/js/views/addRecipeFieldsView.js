import icons from 'url:../../img/icons.svg'; //Parcel v.2
import View from './view';
class AddRecipeFieldsView extends View {
  _parentElement = document.querySelector('.recipe__fields');
  _message = 'Recipe was successfully uploaded!';
  _ingredients = document.querySelectorAll('.upload input');
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
  _cleanData() {
    [...this._ingredients].forEach(e => (e.value = ''));
  }
}

export default new AddRecipeFieldsView();
