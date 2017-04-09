import HTTP from '../../api'
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
    setDateActive ({ commit, state }, valeur) {
        commit(types.SET_JOUR, valeur);
    },
    setWeather ({ commit, state }, valeur) {
        commit(types.SET_WEATHER, valeur);
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