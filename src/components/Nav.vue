<template>
    <v-touch v-on:swiperight="onSwipeRight" v-on:swipeleft="onSwipeLeft">
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
                        <router-view></router-view>
                    </div>
                </div>
            </div>
            <modal-pseudo v-if="mypseudo === '' || modalPseudo ==='friend' || modalPseudo === 'me'"></modal-pseudo>
            <div class="blur"  v-if="mypseudo === '' || modalPseudo ==='friend' || modalPseudo === 'me'"></div>
            <side-bar></side-bar>
        </div>
    </v-touch>
</template>

<script>
    import {HTTP} from '../api'
    import sallesDispo from './Journee/sallesDispo.vue'
    import moment from 'moment'
    import tuileCours from './Journee/tuileCours.vue'
    import modalPseudo from './modalPseudo.vue'
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
            if(pseudo) {
                this.$store.dispatch('definePseudo', pseudo);
            }

            // Récupération de la météo
            var self = this;
            HTTP.get(`http://api.openweathermap.org/data/2.5/weather?q=Troyes,fr&appid=1f45e911b4f6d21aff7e30f65496a83e&lang=fr`).then((response) => {
                // On passe la température en Celsius
                response.data.main.temp =  parseInt(response.data.main.temp - 273.15, 10);
                self.$store.dispatch('setWeather', response.data)
            }).catch((err) => {
                console.log(err)
            });

            // Récupération des messages
            HTTP.get(`messages/${this.mypseudo}`).then((response) => {
                this.$store.dispatch('setMessages', response.data);
            }).catch((error) => {
                console.log(error)
            });
        },
        mounted () {
            if(this.mypseudo !== '') {
                this.getPseudo();
            }else {
                this.$store.dispatch('toggleModalPseudo', 'me');
            }
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
                HTTP.get(`user/${this.mypseudo}`).then((response) => {
                    this.$store.dispatch('defineEtudiant', response.data)
                }).catch(function (error) {
                    console.log(error);
                });
            },
            onSwipeRight () {
                if (!this.menuVisible) this.$store.dispatch('toggleMenu');
            },
            onSwipeLeft () {
                if (this.menuVisible) this.$store.dispatch('toggleMenu');
            },
            changeAccount () {
                this.$store.dispatch('toggleModalPseudo', 'me');
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
                if (this.mypseudo === null) {
                    this.changeAccount();
                }
            },
            '$route': 'changeJour'
        }
    }
</script>

<style lang="scss">
    $green: #27B07C;
    $blue: #146F88;
    $blueDark: #57709c;
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
        }
        .header {
            width: 100%;
            max-height: 120px;
            color: #ffffff;
            padding-top: 2vh;
            text-align: center;
            flex-direction: column;
            background-color: $blue;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
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
                    .menu-bar {
                        background-color: #fff;
                        height: 3px;
                        margin: 5px 0;
                        border: 1px solid #fff;
                        display: block;
                        border-radius: 10px;
                    }
                    .menu-long-bar {
                        width: 35px;
                    }
                    .menu-short-bar {
                        width: 25px;
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
</style>
