import HTTP from '../../api'
import * as types from '../mutation-types'

const state = {
    modalPseudo: false,
    mypseudo: '',
    pseudoFriend: ''
};

// getters
const getters = {
    modalPseudo: state => state.modalPseudo,
    mypseudo: state => state.mypseudo,
    pseudoFriend: state => state.pseudoFriend
};

// actions
const actions = {
    toggleModalPseudo ({ commit, state }) {
        commit(types.SET_MODAL_PSEUDO);
    },
    definePseudo ({ commit, state }, valeur) {
        commit(types.SET_PSEUDO, valeur)
    },
    definePseudoFriend ({ commit, state }, valeur) {
        commit(types.SET_PSEUDO_FRIEND, valeur)
    }
};

// mutations
const mutations = {
    [types.SET_MODAL_PSEUDO] (state) {
        state.modalPseudo = !state.modalPseudo;
    },
    [types.SET_PSEUDO] (state, valeur) {
        state.mypseudo = valeur;
    },
    [types.SET_PSEUDO_FRIEND] (state, valeur) {
        state.pseudoFriend = valeur;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}