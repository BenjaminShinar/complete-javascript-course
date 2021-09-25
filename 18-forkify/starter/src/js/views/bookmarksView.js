import View from './view';
import previewView from './previewView';
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and book mark it ;)';
  _message = '';
  _generateMarkup() {
    return this._data.map(bk => previewView.render(bk, false)).join('');
  }
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
