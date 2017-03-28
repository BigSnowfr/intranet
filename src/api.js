import axios from 'axios';

export const HTTP = axios.create({
    baseURL: `https://intranet.iut-troyes.univ-reims.fr/api/`,
    headers: {
    }
});