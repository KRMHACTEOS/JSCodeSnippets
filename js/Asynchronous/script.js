'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`Country not found ${errorMsg}`);
    return response.json();
  });
};

const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              Number(data.population) / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            } </p>
        </div>
        </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

///////////////////////////////////////////////////
// const getCountryDate = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (!response.ok) throw new Error(`Country not found`);
//       response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const [neighbour, restNeighbours] = data[0].borders;
//       console.log(neighbour);
//       if (!neighbour) return;

//       //Country 2
//       fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
//         .then(response => response.json())
//         .then(data2 => renderCountry(data2[0], 'neighbour'));
//     })
//     .catch(err => renderError(`Something went wrong ${err.message} Try Again!`))
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryDate = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, `Country not found`)
    .then(data => {
      renderCountry(data[0]);
      const [neighbour, restNeighbours] = data[0].borders;
      console.log(neighbour);
      if (!neighbour) return;

      //Country 2
      getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`).then(data2 =>
        renderCountry(data2[0], 'neighbour')
      );
    })
    .catch(err => renderError(`Something went wrong ${err.message} Try Again!`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryDate('lebanon');
});
//getCountryDate('asdfasdf');
