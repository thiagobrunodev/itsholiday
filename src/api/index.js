import { setup } from 'axios-cache-adapter';

const api = setup({
    responseType: 'json',

    baseURL: 'https://cors-anywhere.herokuapp.com/https://date.nager.at/api/v2/',

    headers: {
        'x-requested-with': '',
    },

    cache: {
        maxAge: 30 * 60 * 1000,
    },
});

export default api;
