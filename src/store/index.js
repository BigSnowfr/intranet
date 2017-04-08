import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        jour: 'edtjour',
        modalPseudo: false,
        mypseudo: '',
        pseudoFriend: ''
    },
    mutations: {
        SET_JOUR (state, valeur) {
            state.jour = valeur;
        },
        SET_MODAL_PSEUDO (state) {
            state.modalPseudo = !state.modalPseudo;
        },
        SET_PSEUDO (state, valeur) {
            state.mypseudo = valeur;
        },
        SET_PSEUDO_FRIEND (state, valeur) {
            state.pseudoFriend = valeur;
        },
    }
});

export default store;