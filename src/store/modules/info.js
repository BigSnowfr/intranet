import {HTTP} from '../../api'
import * as types from '../mutation-types'

const state = {
    jour: 'edtjour',
    weather: {}
};

// getters
const getters = {
    jour: state => state.jour,
    weather: state => state.weather
};

// actions
const actions = {
    setDateActive ({commit}, valeur) {
        commit(types.SET_JOUR, valeur);
    },
    setWeather ({commit}) {
        HTTP.get(`http://api.openweathermap.org/data/2.5/weather?q=Troyes,fr&appid=1f45e911b4f6d21aff7e30f65496a83e&lang=fr`).then((response) => {
            // On passe la température en Celsius
            response.data.main.temp =  parseInt(response.data.main.temp - 273.15, 10);
            commit(types.SET_WEATHER, response.data);
        }).catch((err) => {
            console.log(err)
        });
    }
};

// mutations
const mutations = {
    [types.SET_JOUR] (state, valeur) {
        state.jour = valeur;
    },
    [types.SET_WEATHER] (state, valeur) {
        state.weather = valeur;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}