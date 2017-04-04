import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        jour: 'edtjour'
    },
    mutations: {
        SET_JOUR (state, valeur) {
            state.jour = valeur;
        },
    }
});

export default store;