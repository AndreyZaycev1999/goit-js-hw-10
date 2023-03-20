import './css/styles.css';
import fetchCountries from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

var debonce = require('lodash.debonce');
const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('input#search-box');
const listRef = document.querySelector('.country-list');
const infoRef = document.querySelector('.country-info');

let searchQuery = '';

inputRef.addEventListener('input', debonce(inputFetch, DEBOUNCE_DELAY));

function inputFetch(searchQuery) {
    console.log(inputRef.value);
    searchQuery = inputRef.value.trim();
    fetchCountries(searchQuery).then(countries => renderMarkup(countries)).catch(console.error('Error inputFech'));
};

function renderMarkup(countries) {
    console.log('країни', countries);
    if (countries.length === 0) {
        listRef.innerHTML = '';
        infoRef.innerHTML = '';
    } else if (countries.length > 2 && countries.length < 10) {
        appendListMarkup(countries);
    } else {
        appendInfoMarkup(countries);
    };
}

function appendInfoMarkup(countries) {
    const infoMarkup = countries.map(({name: { official }, flags: { svg }, capital, population, languages }) => {
        const language = Object.values(languages).join(", ");
        `
    <hi><img src="${svg}"/><span>${official}</span></h1>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${language}</p>`; }).join('');

        for (const country of countries) {
            listRef.innerHTML = infoMarkup;
        };
};

function appendListMarkup(countries) {
    const listMarkup = countries.map(({ name: { official }, flag: { svg }}) => { `
    <li class="country-list__item">
        <img src="${svg}"/><span>${official}</span>
    </li>`; }).join('');

    listRef.innerHTML = listMarkup;
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