import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function fetchCountries(searchQuery) {
    const queryParams = '?fields=name,capital,population,flags,languages'
    return fetch(`https://restcountries.com/v3.1/name/${searchQuery}${queryParams}`)
    .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .catch(error => {
        Notify.failure("Oops, there is no country with that name")
      });
    };