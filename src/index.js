const elements = {
  searchBreed: document.querySelector('.breed-select'),
  container: document.querySelector('.cat-info'),
};

elements.searchBreed.addEventListener('select', handlerSearch);

function handlerSearch(evt) {
  console.dir(evt.currentTarget);
}
