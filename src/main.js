import Vue from 'vue';
import Vuex from 'vuex';
import App from './components/App.vue';
import sallesDispo from './components/sallesDispo.vue';
import Nav from './components/Nav.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(require('vue-moment'));
Vue.use(VueAxios, axios);

const routes = [
    {path: '/salles', component:sallesDispo},
    {path: '/demain', component: App},
    {path: '/', component: App},
    {path: '*', redirect: '/'},
];

export let router = new VueRouter({
    base: __dirname,
    routes
});

let vm =new Vue(Vue.util.extend({router}, Nav)).$mount('#app');
window.vue = vm;