import Vue from 'vue';
import Vuex from 'vuex';
import App from './components/App.vue';
import sallesDispo from './components/sallesDispo.vue';
import Messages from './components/Messages.vue';
import Nav from './components/Nav.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(require('vue-moment'));
Vue.use(VueAxios, axios);

const routes = [
    {path: '/messages', component:Messages},
    {path: '/home/salles', component:sallesDispo},
    {path: '/home/demain', component: App},
    {path: '/home', component: App},
    {path: '*', redirect: '/home'},
];

export let router = new VueRouter({
    base: __dirname,
    routes
});

let vm =new Vue(Vue.util.extend({router}, Nav)).$mount('#app');
window.vue = vm;