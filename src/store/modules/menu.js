import {HTTP} from '../../api'
import * as types from '../mutation-types'

const state = {
    menuVisible: false
};

// getters
const getters = {
    menuVisible: state => state.menuVisible
};

// actions
const actions = {
    toggleMenu ({ commit, state }) {
        commit(types.TOGGLE_MENU);
    }
};

// mutations
const mutations = {
    [types.TOGGLE_MENU] (state) {
        state.menuVisible = !state.menuVisible;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}