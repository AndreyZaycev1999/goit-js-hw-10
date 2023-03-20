export default function fetchCountries(searchQuery) {
    const queryParams = '?fields=name,capital,population,flags,languages'
    return fetch(`https://restcountries.com/v3.1/name/${searchQuery}${queryParams}`)
    .then((response) => { if (!response.ok) {
        throw new Error(response.status);
    }
    return response.json()}).catch(console.error('Error fetch!!!'));
};