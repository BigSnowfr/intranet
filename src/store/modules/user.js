import {HTTP} from '../../api'
import * as types from '../mutation-types'
import messages from './messages'

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
            HTTP.get(`user/${valeur}`).then((response) => {
                let rep = response.data;
                rep['pseudo'] = valeur;
                commit(types.SET_PSEUDO_FRIEND, rep)
            }).catch(function (error) {
                console.log(error);
            });
    },
    resetFriend ({commit}) {
      commit(types.SET_PSEUDO_FRIEND, '')
    },
    getPseudo ({ commit, state }) {
        HTTP.get(`user/${state.mypseudo}`).then((response) => {
            commit(types.SET_ETUDIANT, response.data);
            // Récupération des messages
            HTTP.get(`messages/${state.mypseudo}`).then((response) => {
                commit(types.SET_MESSAGES, response.data);
            }).catch((error) => {
                console.log(error)
            });
        }).catch(function (error) {
            console.log(error);
        });
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
    },
    [types.SET_MESSAGES] (state, valeur) {
        state.messages = valeur;
        state.countMessages = valeur.length;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}