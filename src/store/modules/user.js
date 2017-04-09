import HTTP from '../../api'
import * as types from '../mutation-types'

const state = {
    modalPseudo: '',
    mypseudo: '',
    pseudoFriend: '',
    etudiant: {}
};

// getters
const getters = {
    modalPseudo: state => state.modalPseudo,
    mypseudo: state => state.mypseudo,
    etudiant: state => state.etudiant,
    pseudoFriend: state => state.pseudoFriend
};

// actions
const actions = {
    toggleModalPseudo ({ commit, state }, valeur) {
        commit(types.SET_MODAL_PSEUDO, valeur);
    },
    definePseudo ({ commit, state }, valeur) {
        commit(types.SET_PSEUDO, valeur)
    },
    defineEtudiant ({ commit, state }, valeur) {
        commit(types.SET_ETUDIANT, valeur)
    },
    definePseudoFriend ({ commit, state }, valeur) {
        commit(types.SET_PSEUDO_FRIEND, valeur)
    }
};

// mutations
const mutations = {
    [types.SET_MODAL_PSEUDO] (state, valeur) {
        state.modalPseudo = valeur;
    },
    [types.SET_ETUDIANT] (state, valeur) {
        state.etudiant = valeur;
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