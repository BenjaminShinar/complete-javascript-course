import icons from 'url:../../img/icons.svg'; //Parcel v.2

class SearchView {
  _parentElement = document.querySelector('.search');

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  _clearInput() {
    return (this._parentElement.querySelector('.search__field').value = '');
  }
}

export default new SearchView();
