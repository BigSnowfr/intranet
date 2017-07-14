<template>
    <div>
        <div class="side-bar" v-bind:class="{ open: menuVisible, close: !menuVisible }">
            <weather></weather>
            <ul class="liste-top" @click="changeAccount">
                <li class="liste-menu liste-title">{{ etudiant.prenom }} {{ etudiant.nom }}</li>
                <li class="liste-menu liste-title2">{{ etudiant.promo }} - {{ etudiant.semestre }}</li>
            </ul>
            <ul class="liste-items">
                <li class="liste-item">
                    <router-link to='/home'>
                        <img class="img-liste-item" src="http://195.83.128.55/~mmi15b08/intranet/dist/home.svg" alt="Accueil">
                        <span>Accueil</span>
                    </router-link>
                </li>
                <li class="liste-item">
                    <router-link to='/enseignants' exact>
                        <img class="img-liste-item" src="http://195.83.128.55/~mmi15b08/intranet/dist/user.svg" alt="Enseignants">
                        <span>Enseignants</span>
                    </router-link>
                </li>
                <li class="liste-item">
                    <router-link to='/informations' exact>
                        <img class="img-liste-item" src="http://195.83.128.55/~mmi15b08/intranet/dist/info.svg" alt="Informations">
                        <span>Informations</span>
                    </router-link>
                </li>
                <li class="liste-item">
                    <router-link to='/messages' exact>
                        <img class="img-liste-item" src="http://195.83.128.55/~mmi15b08/intranet/dist/message.svg" alt="Message">
                        <span>Messages <span v-if="countMessages > 0" class="pastille-notif">{{ countMessages }}</span></span>
                    </router-link>
                </li>
                <li class="liste-item">
                    <router-link to='/plan' exact>
                        <img class="img-liste-item" src="http://195.83.128.55/~mmi15b08/intranet/dist/map.svg" alt="Plan">
                        <span>Plan</span>
                    </router-link>
                </li>
            </ul>
            <div class="copyright">
                <a href="https://www.etienne-fontaine.fr" target="_blank">Made by Etienne FONTAINE</a>
                <img class="logo-iut" src="http://195.83.128.55/~mmi15b08/intranet/dist/iut.png" alt="Logo IUT">
            </div>
        </div>
        <button class="side-bar-away" @click="toggleMenu" v-bind:class="{ close: !menuVisible, closeAway: !menuVisible }"></button>
    </div>
</template>

<script>
    import {HTTP} from '../../api'
    import store from '../../store/index'
    import {mapGetters} from 'vuex'
    import weather from './weather.vue'
    export default {
        name: 'sideBar',
        store,
        data () {
            return {}
        },
        components: {
            weather
        },
        computed: mapGetters([
            'menuVisible',
            'etudiant',
            'countMessages'
        ]),
        methods: {
            changeAccount () {
                this.$store.dispatch('toggleModalPseudo', 'me');
            },
            toggleMenu () {
                if (this.menuVisible) {
                    this.$store.dispatch('toggleMenu');
                }
            }
        },
        watch: {
            '$route': 'toggleMenu'
        }
    }
</script>

<style lang="scss">
    $green: #27B07C;
    $blue: #146F88;
    $blueDark: #57709c;

    .pastille-notif {
        background-color: rgba(247, 247, 247, 0.31);
        width: 32px;
        display: inline-block;
        border-radius: 50px;
        padding-left: 0 !important;
        text-align: center;
        margin-left: 10px;
    }

    .open {
        animation: toggleMenu_Open 250ms linear;
        width: 70%;
    }
    .close {
        animation: toggleMenu_Close 150ms linear;
        margin-left: -100%;
    }
    .closeAway {
        display: none;
    }
    .side-bar {
        background: #4a90e2;
        top: 0;
        bottom: 0;
        z-index: 11;
        position: fixed;
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
        .copyright {
            position: absolute;
            bottom: 5px;
            display: block;
            right: 0;
            left: 0;
            text-align: center;
            font-size: 12px;
            a {
                color: #fff;
                margin-right: 5px;
            }
        }
        .liste-top {
            padding-left: 0;
            .liste-menu {
                list-style: none;
                color: #fff;
                text-align: center;
            }
            .liste-title {
                font-size: 1.2em;
            }
            .liste-title2 {
                font-size: 1.1em;
            }
        }
        .liste-items {
            margin-top: 15px;
            padding-left: 15px;
            .liste-item {
                list-style: none;
                margin-bottom: 20px;
                font-size: 1.3em;
                transition: 0.3s ease;
                &:hover {
                    transform: scale(1.02);
                }
                &:active {
                    background-color: rgba(255, 255, 255, 0.12);
                }
                a {
                    color: #fff;
                    padding: 10px;
                    display: block;
                }
                span {
                    padding-left: 10px;
                }
                .img-liste-item {
                    height: 25px;
                    vertical-align: text-bottom;
                }
                .router-link-active {
                    display: block;
                    background-color: rgba(255, 255, 255, 0.12);
                }
            }
        }
    }

    .side-bar-away {
        width: 30%;
        top: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        z-index: 55;
        background-color: transparent;
        border: 0;
    }

    @keyframes toggleMenu_Open {
        0% {
            margin-left: -64%;
            display: none;
        }
        100% {
            margin-left: 0;
        }
    }
    @keyframes toggleMenu_Close {
        0% {
            margin-left: 0;
        }
        100% {
            margin-left: -64%;
        }
    }
    @media screen and (max-height: 450px){
        .side-bar .liste-items {
            margin-top: 20px;
            max-height: 200px;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
    }
    @media screen and (max-width: 300px){
        .side-bar .liste-items .liste-item {
            font-size: 1em;
        }
    }
</style>
