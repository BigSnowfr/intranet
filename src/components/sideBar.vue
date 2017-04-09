<template>
    <div v-if="menuVisible">
        <div class="side-bar">
            <weather></weather>
            <ul class="liste-top">
                <li class="liste-menu liste-title">{{ etudiant.prenom }} {{ etudiant.nom }}</li>
                <li class="liste-menu liste-title2">MMI2 - S4</li>
            </ul>
            <ul class="liste-items">
                <li class="liste-item">
                    <router-link to='/home'>
                        <img class="img-liste-item" src="http://195.83.128.55/~mmi15b08/intranet/dist/home.svg" alt="Accueil">
                        <span>Accueil</span>
                    </router-link>
                </li>
                <li class="liste-item">
                    <router-link to='/messages' exact>
                        <img class="img-liste-item" src="http://195.83.128.55/~mmi15b08/intranet/dist/message.svg" alt="Message">
                        <span>Messages</span>
                    </router-link>
                </li>
            </ul>
            <a class="copyright" href="https://www.etienne-fontaine.fr" target="_blank">Made by Etienne FONTAINE</a>
        </div>
        <button class="side-bar-away" @click="toggleMenu"></button>
    </div>
</template>

<script>
    import {HTTP} from '../api'
    import store from '../store'
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
        created () {
        },
        mounted () {
        },
        computed: mapGetters([
            'menuVisible',
            'etudiant'
        ]),
        methods: {
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

    .side-bar {
        width: 70%;
        background: linear-gradient(to top, #27b3da, #197e9a);
        top: 0;
        bottom: 0;
        z-index: 11;
        position: absolute;
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
        animation: toggleMenu_Open 300ms ease;
        .copyright {
            color: #fff;
            position: absolute;
            bottom: 5px;
            display: block;
            right: 0;
            left: 0;
            text-align: center;
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
            margin-top: 40px;
            .liste-item {
                list-style: none;
                margin-bottom: 20px;
                font-size: 1.3em;
                a {
                    color: #fff;
                    padding: 10px;
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
        z-index: 3;
        background-color: rgba(0, 0, 0, 0.55);
        border: 0;
        animation: toggleMenuAway_Open 300ms ease;
    }

    @keyframes toggleMenu_Open {
        0% {
            margin-left: -64%;
        }
        100% {
            margin-left: 0;
        }
    }

    @keyframes toggleMenuAway_Open {
        0% {
            width: 100%;
        }
        100% {
            width: 30%;
        }
    }
</style>
