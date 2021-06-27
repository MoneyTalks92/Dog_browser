import '../css/searchImageComponent.css';
import ContentComponent from '../contentComponent/contentComponent';

class SearchImage extends ContentComponent {

  constructor() {
    super();
    // példányosításkor megjelenítjük a keresőt automatikusan
    this.render();
  }

  // megjeleníti a keresőt
  render() {
    const markup = `
    <form class="dog-search">
  <span class="search-icon"></span>
  <input type="text" id="dogSearchInput">
  <input type="text" id="imageNumberInput" placeholder="1">
  <button>Search</button>
</form>`;
    document.querySelector('#header').insertAdjacentHTML('beforeend', markup);
    document.querySelector('.dog-search button').addEventListener('click', (e) => {
      e.preventDefault();
      this.handleContentDisplay(document.querySelector('#dogSearchInput').value);
    });

  }
}
export default SearchImage;