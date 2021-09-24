import icons from 'url:../../img/icons.svg'; //Parcel v.2
import View from './view';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query!';

  static generateOneResult(result, currentId) {
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
              </div>
            </a>
          </li>`;
  }
  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return this._data
      .map(res => ResultsView.generateOneResult(res, id))
      .join('');
  }
}

export default new ResultsView();
