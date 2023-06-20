import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

function displayCatInfo(cat) {
  const catInfoDiv = document.querySelector('.cat-info');
  const catName = cat[0].breeds[0].name;
  const catDescription = cat[0].breeds[0].description;
  const catTemperament = cat[0].breeds[0].temperament;

  catInfoDiv.innerHTML = `
        <div class="box">
        <img src="${cat[0].url}" alt="${catName}" width="400px";/>
        <div class="box__one">
        <h3>${catName}</h3>
        <p><strong>Description:</strong> ${catDescription}</p>
        <p><strong>Temperament:</strong> ${catTemperament}</p>
        </div>
        </div>
    `;
}

function handleBreedSelectChange(event) {
  const selectedBreedId = event.target.value;
  const catInfoDiv = document.querySelector('.cat-info');
  catInfoDiv.style.display = 'none';
  const loader = document.querySelector('.loader');
  loader.style.display = 'block';

  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      displayCatInfo(cat);
      loader.style.display = 'none';
      catInfoDiv.style.display = 'block';
    })
    .catch(() => {
      const error = document.querySelector('.error');
      error.style.display = 'block';
      loader.style.display = 'none';
    });
}

function loadBreeds() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'block';
  const error = document.querySelector('.error');
  error.style.display = 'none';
  fetchBreeds()
    .then(breeds => {
      const breedSelect = document.querySelector('.breed-select');
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
      loader.style.display = 'none';
      breedSelect.style.display = 'block';
    })
    .catch(() => {
      error.style.display = 'block';
      loader.style.display = 'none';
    });
}

window.addEventListener('DOMContentLoaded', loadBreeds);

const breedSelect = document.querySelector('.breed-select');
breedSelect.addEventListener('change', handleBreedSelectChange);
