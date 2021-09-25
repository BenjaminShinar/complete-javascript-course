import icons from 'url:../../img/icons.svg'; //Parcel v.2

export default class View {
  _parentElement;
  _data;
  _errorMessage;
  _message = '';

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    if (!data) {
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(markup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );
    newElements.forEach((newElement, i) => {
      const currentElement = currentElements[i];
      //update changed TEXT
      if (
        !newElement.isEqualNode(currentElement) &&
        newElement.firstChild?.nodeValue.trim() !== ''
      ) {
        currentElement.textContent = newElement.textContent;
      }

      //update changed ATTRIBUTES
      if (!newElement.isEqualNode(currentElement)) {
        Array.from(newElement.attributes).forEach(attr =>
          currentElement.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const markup = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(msg = this._errorMessage) {
    const markup = `<div class="error">
  <div>
    <svg>
      <use href="${icons}#icon-alert-triangle"></use>
    </svg>
  </div>
  <p>${msg}</p>
</div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(msg = this._message) {
    const markup = `<div class="recipe">
        <div class="message">
          <div>
            <svg>
              <use href="${icons}icon-smile"></use>
            </svg>
          </div>
          <p>${msg}</p>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
}
