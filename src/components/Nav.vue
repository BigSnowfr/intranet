<template>
    <div id="app" class="content">
        <div class="header">
            <div>
                <button @click="changeAccount" class="bouton titre">Bonjour {{ prenom }}</button>
            </div>
            <p class="date">{{ date }}</p>
            <p class="meteo">{{ meteo.main.temp }}° C - <span class="meteo-descritpion">{{ meteo.weather[0].description }}</span></p>
        </div>
        <div v-if="pseudo">
            <div class="loaded">
                <div class="contenu">
                    <div class="bouttons">
                        <router-link to='/salles' class='boutton' exact>
                            Salles
                        </router-link>
                        <router-link to='/' class='boutton' exact>
                            Ma Journée
                        </router-link>
                        <router-link to='/demain' class='boutton' exact>
                            Demain
                        </router-link>
                    </div>
                        <router-view></router-view>
                </div>
            </div>
            <div class="blur" v-if="modalPseudo"></div>
        </div>
    </div>
</template>

<script>
    import {HTTP} from '../api'
    import sallesDispo from './sallesDispo.vue'
    import moment from 'moment'
    import tuileCours from './tuileCours.vue'
    import store from '../store'
    import { mapGetters } from 'vuex'
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
                meteo: {}
            }
        },
        components: {
            sallesDispo,
            tuileCours
        },
        created () {
            moment.locale('fr');
            this.date = moment().format('dddd D MMMM YYYY');
            let pseudo = localStorage.getItem('pseudo');
            if (pseudo === null) {
                pseudo = prompt('Pseudo intranet ?');
                localStorage.setItem('pseudo', pseudo);
            }
            this.pseudo = pseudo;
            this.$store.dispatch('definePseudo', pseudo);
            // Récupération de la météo
            var self = this;
            HTTP.get(`http://api.openweathermap.org/data/2.5/weather?q=Troyes,fr&appid=1f45e911b4f6d21aff7e30f65496a83e&lang=fr`).then((response) => {
                // On passe la température en Celsius
                response.data.main.temp =  parseInt(response.data.main.temp - 273.15, 10);
                self.meteo = response.data;
            }).catch((err) => {
                console.log(err)
            });
        },
        mounted () {
            this.getPseudo();
        },
        computed: mapGetters([
            'jour',
            'mypseudo',
            'modalPseudo',
            'pseudoFriend'
        ]),
        methods: {
            getPseudo () {
                HTTP.get(`user/${this.pseudo}`).then((response) => {
                    this.prenom = response.data.prenom;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            changeAccount () {
                let pseudo = prompt('Pseudo intranet ?');
                if (pseudo !== '') {
                    localStorage.setItem('pseudo', pseudo);
                    this.pseudo = pseudo;
                    this.$store.dispatch('definePseudo', pseudo);
                    this.getPseudo();
                }
            },
            changeJour(jour) {
                let jourAPI = jour.path === '/' ? 'edtjour' : 'edtlendemain';
                this.$store.dispatch('setDateActive', jourAPI);
            }
        },
        watch: {
            pseudo () {
                if (this.pseudo === null || this.pseudo === 'null') {
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
        z-index: 3;
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
        user-select: none;
        font-family: 'Open Sans', sans-serif;
        .loading {
            margin-top: 200px;
        }
        .header {
            width: 100%;
            height: 150px;
            color: #ffffff;
            padding-top: 2vh;
            text-align: center;
            display: flex;
            flex-direction: column;
            background-color: $blue;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
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
            .titre {
                font-size: 2em;
                width: 100vw;
                display: inline-block;
                float: left;
            }
            img {
                height: 40px;
            }
            .date {
                font-size: 1.4em;
                margin-top: 15px;
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
            min-height: calc(100vh - 280px);
            margin-top: 20px;
            padding: 10px;
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
