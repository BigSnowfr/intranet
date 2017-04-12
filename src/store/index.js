import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import info from './modules/info'
import menu from './modules/menu'
import messages from './modules/messages'
import enseignants from './modules/enseignants'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        info,
        menu,
        messages,
        enseignants
    }
})