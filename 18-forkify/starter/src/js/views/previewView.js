import icons from 'url:../../img/icons.svg'; //Parcel v.2
import View from './view';
class PreviewView extends View {
  _parentElement = '';

  static generateOnePreview(result, currentId) {
    return `<li class="preview">
            <a class="preview__link ${
              result.id === currentId ? 'preview__link--active' : ''
            }" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" crossorigin />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                <div class="recipe__user-generated ${
                  result.key ? '' : 'hidden'
                }">
                <svg>
                <use href="${icons}#icon-user"></use>
                </svg>
                </div>
          </div>
            </a>
          </li>`;
  }
  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return PreviewView.generateOnePreview(this._data, id);
  }
}

export default new PreviewView();
