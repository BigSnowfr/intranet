import * as types from '../mutation-types'

const state = {
    messages: [],
    countMessages: 0
};

// getters
const getters = {
    messages: state => state.messages,
    countMessages: state => state.countMessages,
};

// actions
const actions = {
    setMessages ({ commit }, valeur) {
        commit(types.SET_MESSAGES, valeur);
    }
};

// mutations
const mutations = {
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