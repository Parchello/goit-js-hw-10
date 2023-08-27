import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const loader = document.querySelector('.loader');
const textError = document.querySelector('.error');
const container = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');
select.addEventListener('change', onSelectBreed);

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      select.append(option);
      loader.hidden = true;
      select.hidden = false;
    });
  })
  .catch(error => {
    textError.hidden = false;
  });

function onSelectBreed(evt) {
  const breedId = evt.currentTarget.value;
  loader.hidden = false;
  container.hidden = true;
  textError.hidden = true;
  fetchCatByBreed(breedId);

  fetchCatByBreed(breedId)
    .then(arr => {
      const breedItems = {
        name: arr[0].breeds[0].name,
        description: arr[0].breeds[0].description,
        temperament: arr[0].breeds[0].temperament,
        imgUrl: arr[0].url,
      };
      function createMarkup({ name, description, temperament, imgUrl }) {
        container.innerHTML = `<img src="${imgUrl}" alt="cat" width="350" height="300">
      <h2>${name}</h2>
      <p>${description}</p>
      <p><b>Temperament: </b>${temperament}</p>`;
      }
      createMarkup(breedItems);

      loader.hidden = true;
      container.hidden = false;
      textError.hidden = true;
    })
    .catch(error => {
      textError.hidden = false;
      container.hidden = true;
      loader.hidden = true;
    });
}
