import icons from 'url:../../img/icons.svg'; //Parcel v.2
import View from './view';
import previewView from './previewView';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query!';
  _message = '';
  _generateMarkup() {
    return this._data
      .map(searchResult => previewView.render(searchResult, false))
      .join('');
  }
}

export default new ResultsView();
