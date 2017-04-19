<template>
        <div id="app" class="content">
            <div class="header">
                <div class="header-top">
                    <button class="menu-group" @click="toggleMenu">
                        <span class="menu-bar menu-long-bar"></span>
                        <span class="menu-bar menu-short-bar"></span>
                    </button>
                    <div class="titre">
                        <button @click="changeAccount" class="bouton">Bonjour {{ etudiant.prenom }}</button>
                    </div>
                </div>
                <p class="date">{{ date }}</p>
            </div>
            <div v-if="mypseudo">
                <div class="loaded">
                    <div class="contenu">
                        <!--<transition name='slide-fade' mode='out-in'>-->
                            <router-view></router-view>
                        <!--</transition>-->
                    </div>
                </div>
            </div>
            <modal-pseudo v-if="mypseudo === '' || modalPseudo ==='friend' || modalPseudo === 'me'"></modal-pseudo>
            <div class="blur"  v-if="mypseudo === '' || modalPseudo ==='friend' || modalPseudo === 'me'"></div>
            <side-bar></side-bar>
        </div>
</template>

<script>
    import sallesDispo from './Journee/sallesDispo.vue'
    import moment from 'moment'
    import tuileCours from './Journee/tuileCours.vue'
    import modalPseudo from './ModalPseudo/modalPseudo.vue'
    import store from '../store'
    import { mapGetters } from 'vuex'
    import sideBar from './Menu/sideBar.vue'

    export default {
        name: 'nav',
        store,
        data () {
            return {
                cours: [],
                pseudo: '',
                prenom: '',
                ajax: false,
                date: '',
                salles: [],
                ajaxSalles: false,
            }
        },
        components: {
            sallesDispo,
            tuileCours,
            sideBar,
            modalPseudo
        },
        created () {
            moment.locale('fr');
            this.date = moment().format('dddd D MMMM YYYY');

            let pseudo = localStorage.getItem('pseudo');
            if(pseudo) this.$store.dispatch('definePseudo', pseudo);

            // Récupération de la météo
            this.$store.dispatch('setWeather');
        },
        mounted () {
            if(this.mypseudo !== '') this.getPseudo();
            else this.$store.dispatch('toggleModalPseudo', 'me');
        },
        computed: mapGetters([
            'jour',
            'mypseudo',
            'modalPseudo',
            'pseudoFriend',
            'menuVisible',
            'etudiant'
        ]),
        methods: {
            getPseudo () {
                this.$store.dispatch('getPseudo');
            },
            changeAccount () {
                if(!this.menuVisible) this.$store.dispatch('toggleModalPseudo', 'me');
            },
            changeJour(jour) {
                let jourAPI = jour.path === '/' ? 'edtjour' : 'edtlendemain';
                this.$store.dispatch('setDateActive', jourAPI);
            },
            toggleMenu () {
                this.$store.dispatch('toggleMenu');
            }
        },
        watch: {
            pseudo () {
                if (this.mypseudo === null) this.changeAccount();
            },
            '$route': 'changeJour'
        }
    }
</script>

<style lang="scss">
    $green: #27B07C;
    $blue: #146F88;
    $blueDark: #57709c;
    // Nav
    .slide-fade-enter-active {
        transition: all .2s ease;
    }
    .slide-fade-leave-active {
        transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(100vh);
    }
    .blur {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #000;
        opacity: 0.5;
        z-index: 13;
    }
    * {
        box-sizing: border-box;
    }
    body {
        margin: 0;
        font-family: 'Open Sans', sans-serif;
        font-size: 14px;
        line-height: 1.42857143;
        color: #333;
    }
    button {
        text-transform: none;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        cursor: pointer;
    }
    li {
        list-style: none;
    }
    a {
        color: $blue;
        font-weight: bold;
        text-decoration: none;
    }
    *:focus {
        outline: none;
    }

    html {
        overflow-x: hidden;
    }

    .content {
        a {
            text-decoration: none;
            &:hover, &:active {
                text-decoration: none;
                transform: scale(1.01);
            }
        }
        min-height: 100vh;
        user-select: none;
        font-family: 'Open Sans', sans-serif;
        .loading {
            margin-top: 60px;
            text-align: center;
        }
        .header {
            width: 100%;
            max-height: 120px;
            color: #ffffff;
            padding-top: 2vh;
            text-align: center;
            flex-direction: column;
            background-color: $blue;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
            position: fixed;
            z-index: 10;
            margin-top: -20px;
            .header-top {
                display: flex;
                .menu-group {
                    margin-left: 10px;
                    margin-right: 5px;
                    padding-top: 3px;
                    background-color: transparent;
                    border: 0;
                    z-index: 10;
                    transition: 0.3s ease;
                    &:hover {
                        .menu-short-bar {
                            width: 35px;
                        }
                    }
                    &:active {
                        .menu-short-bar {
                            width: 35px;
                            transform: rotateZ(45deg);
                            margin-top: -8px;
                        }
                        .menu-long-bar {
                            transform: rotateZ(-45deg);
                        }
                    }
                    .menu-bar {
                        background-color: #fff;
                        height: 3px;
                        margin: 5px 0;
                        border: 1px solid #fff;
                        display: block;
                        border-radius: 10px;
                        transition: 0.3s ease;
                    }
                    .menu-long-bar {
                        width: 35px;
                        transition: 0.3s ease;
                    }
                    .menu-short-bar {
                        width: 25px;
                        transition: 0.3s ease;
                    }
                }
                .titre {
                    font-size: 2em;
                    width: 100%;
                    text-align: center;
                    margin-left: -50px;
                }
            }
            .meteo-descritpion {
                text-transform: capitalize;
            }
            .bouton {
                background-color: transparent;
                border: 0;
                color: #fff;
            }
            .sous-titre {
                margin: auto;
            }
            img {
                height: 40px;
            }
            .date {
                font-size: 1.4em;
                margin-top: 15px;
                padding-bottom: 20px;
            }
            .sous-titre {
                font-size: 1.4em;
                margin-top: 0;
                .heure {
                    font-weight: 800;
                }
            }
        }
        .contenu {
            min-height: calc(100vh - 140px);
            margin-top: 20px;
            padding: 10px 10px 0 10px;
            -webkit-overflow-scrolling: touch;
            .bouttons {
                display: flex;
                margin-bottom: 15px;
                .boutton {
                    flex: 1;
                    text-align: center;
                    color: $green;
                    font-weight: 500;
                }
                .router-link-active {
                    font-size: 18px;
                    color: $blueDark;
                    font-weight: 600;
                }
            }
            .titre {
                font-weight: 600;
                font-size: 1.2em;
                color: $blue;
                text-align: center;
                margin-bottom: 20px;
            }
        }
        .footer {
            width: 100%;
            .bouton {
                background-color: $blue;
                border: 0;
                padding: 10px;
                color: #fff;
                width: 100%;
                height: 60px;
                position: relative;
                bottom: 0;

                &:hover, &:active {
                    background-color: $blueDark;
                }
            }
        }
    }
    @media screen and (min-width: 780px){
        .loaded {
            max-width: 75%;
            margin: 0 auto;
            margin-left: 26%;
        }
        .cours {
            overflow: hidden;
        }
        .header {
            margin-left: 13%;
        }
        .message-container {
            width: 50%;
            margin-left: 45%;
        }
        .pas-cours .top {
            .titre, .sous-titre {
                width: auto;
            }
        }
        .liste-info {
            overflow-y: auto !important;
            overflow-x: hidden;
        }
        .messages, .enseignants, .informations {
            margin: auto;
            text-align: center;
            .block-information {
                width: 45% !important;
                margin-left: 15px;
            }

        }
        .modal-pseudo {
            max-width: 500px;
            margin: auto;
        }
        .side-bar {
            width: 25% !important;
            margin-left: 0 !important;
            opacity:1;
            font-weight: normal;
            &:hover {
                opacity: 1;
            }
        }
        .input-pseudo {
            margin-bottom: 20px;
        }
    }

    @media screen and (max-width: 300px) {
        .bouton {
            font-size: 22px;
        }
        .content {
            .header {
                height: 100px;
            }
        }
    }
    .hidden {
        display: none;
    }
</style>
