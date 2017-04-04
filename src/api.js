import axios from 'axios';

export const HTTP = axios.create({
    baseURL: `http://intranet.iut-troyes.univ-reims.fr/api/`
});