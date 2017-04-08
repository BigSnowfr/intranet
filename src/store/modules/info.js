import HTTP from '../../api'
import * as types from '../mutation-types'

const state = {
    jour: 'edtjour'
};

// getters
const getters = {
    jour: state => state.jour
};

// actions
const actions = {
    setDateActive ({ commit, state }, valeur) {
        commit(types.SET_JOUR, valeur);
    }
};

// mutations
const mutations = {
    [types.SET_JOUR] (state, valeur) {
        state.jour = valeur;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}