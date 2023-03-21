import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

var debounced = debounce(inputFetch, DEBOUNCE_DELAY);

const inputRef = document.querySelector('input#search-box');
const listRef = document.querySelector('.country-list');
const infoRef = document.querySelector('.country-info');

// let searchQuery = '';

inputRef.addEventListener('input', debounced);

function inputFetch(searchQuery) {
    console.log(inputRef.value);
    listRef.innerHTML = "";
    infoRef.innerHTML = "";
    searchQuery = inputRef.value.trim();
    fetchCountries(searchQuery).then(countries => renderMarkup(countries));
};

function renderMarkup(countries) {
    console.log('країни', countries);
    // console.log('Кількість: ', countries.length)
    if (countries === undefined) {
        
    } else if (countries.length >= 2 && countries.length <= 10) {
        appendListMarkup(countries);
    } else if (countries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
    }else {
        appendInfoMarkup(countries);
    };
};

function appendInfoMarkup(countries) {
    console.log('1 країна: ', countries);

    countries.map((country) => {
        const {name: { official }, flags, capital, population, languages } = country;
        const language = Object.values(languages).join(", ");
        
        const infoMarkup = `
        <hi><img src="${flags.svg}" width="35"/><span>${official}</span></h1>
            <p>Capital: ${capital}</p>
            <p>Population: ${population}</p>
            <p>Languages: ${language}</p>`;

        infoRef.innerHTML = infoMarkup;
    }).join('');
};

function appendListMarkup(countries) {
    const markup = countries
    .map((country) => `
        <li class="country-list__item">
            <img src="${country.flags.svg}" width="35"/><span>${country.name.official}</span>
        </li>`)
    .join('');

    listRef.innerHTML = markup;
};




// inputSearchBox.addEventListener('input', () => {
//     fetch(
//         `https://restcountries.com/v3.1/name/${inputSearchBox.value}?fields=name,capital,population,flags,languages`
//     )
//     .then((response) => response.json())
//     .then((data) => {
//         // console.log(data);
//         if (data.length > 10) {
//             Notify.info("Too many matches found. Please enter a more specific name.");
//         } else if (1 < data.length && data.length <= 10) {
//             const names = data.map(country => country.name.official);
//             console.log(names)
//         } else if (data.length === 1) {
//             console.log(data);
//         } else {
//             Notify.failure("Oops, there is no country with that name");
//         };
//     });
// });