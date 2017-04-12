import {HTTP} from '../../api'
import * as types from '../mutation-types'
import user from './user'

const state = {
    enseignantsFiltrer: [],
    enseignants: []
};

// getters
const getters = {
    enseignants: state => state.enseignants,
    enseignantsFiltrer: state => state.enseignantsFiltrer
};

// actions
const actions = {
    getEnseigantsFromAPI ({ commit, state}) {
        HTTP.get(`enseignants/formation/${user.state.mypseudo}`).then((response) => {
            commit(types.SET_ENSEIGNANTS, response.data);
            commit(types.SET_ENSEIGNANTS_FILTER, response.data);
        }).catch((err) => {
            console.log(err);
        })
    },
    filterEnseignants ({commit, state}, valeur) {
        commit(types.SET_ENSEIGNANTS_FILTER, []);
        var enseignantsFiltre = [];
        state.enseignants.forEach((enseignant) => {
            if (enseignant.nom.toLowerCase().indexOf(valeur) > -1 || enseignant.prenom.toLowerCase().indexOf(valeur) > -1) {
                enseignantsFiltre.push(enseignant);
            }
        });
        commit(types.SET_ENSEIGNANTS_FILTER, enseignantsFiltre);
    }
};

// mutations
const mutations = {
    [types.SET_ENSEIGNANTS] (state, valeur) {
        state.enseignants = valeur;
    },
    [types.SET_ENSEIGNANTS_FILTER] (state, valeur) {
        state.enseignantsFiltrer = valeur;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}