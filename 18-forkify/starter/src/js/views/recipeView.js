import { Fraction } from 'fractional';
import View from './view';
import icons from 'url:../../img/icons.svg'; //Parcel v.2

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = "We couldn't find that recipe, try a different one!";

  static generateMarkupIngredient(ingredient) {
    return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
                ingredient.quantity ? new Fraction(ingredient.quantity) : ''
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
              </div>
            </li>`;
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(e => window.addEventListener(e, handler));
  }
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      const servings = Number(btn.dataset.updateTo);
      if (servings > 0) handler(servings);
    });
  }
  addHandlerToggleBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }
  _generateMarkup() {
    const { title, servings, bookmarked = false } = this._data;
    return `<figure class="recipe__fig">
          <img src="${
            this._data.image
          }" alt="${title}" class="recipe__img" crossorigin/>
          <h1 class="recipe__title">
            <span>${title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes"> 
            ${this._data.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people"> 
            ${servings} </span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button data-update-to="${
                servings - 1
              }" class="btn--tiny btn--update-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button data-update-to="${
                servings + 1
              }" class="btn--tiny btn--update-servings">
              <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>        
          <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${
      bookmarked ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._data.ingredients
            .map(ing => RecipeView.generateMarkupIngredient(ing))
            .join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>

          <a class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
      `;
  }
}

export default new RecipeView();
