import icons from 'url:../../img/icons.svg'; //Parcel v.2
import View from './view';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  static generateOneButton(currentPage, isNext) {
    const [direction, arrow, page] = isNext
      ? ['next', 'right', currentPage + 1]
      : ['prev', 'left', currentPage - 1];
    return `<button data-goto="${page}" class="btn--inline pagination__btn--${direction}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${arrow}"></use>
            </svg>
            <span>Page ${page}</span>
          </button>
          `;
  }
  static generatePageLocation(currentPage, totalPages) {
    return `<span>(${currentPage}/${totalPages})
    </span>`;
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    if (numPages === 0) return '';
    const currentPage = this._data.activePage;

    const pageNumberFrom = PaginationView.generatePageLocation(
      currentPage,
      numPages
    );
    if (currentPage === 1 && numPages > 1) {
      return `${PaginationView.generateOneButton(
        currentPage,
        true
      )} ${pageNumberFrom}`;
    }
    if (currentPage === numPages && numPages > 1) {
      return `${pageNumberFrom}
            ${PaginationView.generateOneButton(currentPage, false)}`;
    }
    if (currentPage < numPages) {
      return `${PaginationView.generateOneButton(
        currentPage,
        true
      )}${pageNumberFrom}
       ${PaginationView.generateOneButton(currentPage, false)}`;
    }
    if (currentPage === numPages && numPages === 1) {
      return '';
    }
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return; //guard
      handler(Number(btn.dataset.goto));
    });
  }
}
export default new PaginationView();
