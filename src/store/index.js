import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import info from './modules/info'
import menu from './modules/menu'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        info,
        menu
    }
})