<template>
    <div>
        <div v-if="!ajax">
            <div v-for="(cour, index) in cours" v-if="cour.hfin !== undefined">
                <tuile-cours :cour="cour" v-if="cour.hfin !== '12:30'"></tuile-cours>
                <div v-else>
                    <div class="block-cours">
                        <div class="top">
                            <span class="nom">{{ cour.type }} <span v-if="cour.matiere !== ''">/ {{ cour.libelle_long
                                }}</span></span>
                            <span class="prof">{{ cour.prof }}</span>
                        </div>
                        <p>{{ cour.texte }}</p>
                        <div class="bottom">
                            <span class="heure">{{ cour.hdebut }} - {{ cour.hfin }}</span>
                            <span class="salle" v-if="cour.salle !== '****'">{{ cour.salle }}</span>
                        </div>
                    </div>
                    <a href="https://www.google.fr/maps/search/48.268101,+4.070629/@48.2684398,4.0715042,17.25z"
                       target="_blank">
                        <div class="block-cours food-container">
                            <div class="image">
                                <img class="photo" :src="'http://195.83.128.55/~mmi15b08/intranet/assets/food.jpg'" alt="Repas">
                            </div>
                            <div class="top">
                                <span class="nom">Pause Repas</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="block-cours">
                <p class="plus-cours">Votre journée est terminée</p>
            </div>
        </div>
        <div class="loading text-center" v-else>
            <img :src="'http://195.83.128.55/~mmi15b08/intranet/assets/ring.svg'" alt="Loading">
        </div>
    </div>
</template>

<script>
    import {HTTP} from '../api'
    import moment from 'moment'
    import tuileCours from './tuileCours.vue'
    import store from '../store'
    export default {
        name: 'app',
        data () {
            return {
                cours: [],
                pseudo: '',
                prenom: '',
                ajax: false,
                date: '',
                state: store.state,
            }
        },
        components: {
            tuileCours
        },
        computed: {
            jour () { return store.state.jour}
        },
        watch: {
          jour () {
              this.getClasses();
          }
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
            HTTP.get('user/' + this.pseudo).then((response) => {
                this.prenom = response.data.prenom;
            }).catch(function (error) {
                console.log(error);
            });
            this.getClasses();
        },
        methods: {
            getClasses () {
                if (this.pseudo !== null) {
                    let self = this;
                    this.ajax = true;
                    HTTP.get(`${this.jour}/${this.pseudo}`).then((response) => {
                        // On vérifie qu'il y a des cours
                        self.cours = [];
                        for (let key in response.data) {
                            this.cours.push(response.data[key]);
                        }
                    }).then(() => {
                        self.cours.map((obj, index) => {
                            if (obj.fin) {
                                self.cours[index].type = obj.type.toUpperCase();
                            } else {
                                self.cours[index].pascours = 1
                            }
                        });
                        self.ajax = false;
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            }
        }
    }
</script>

<style lang="scss">
    $green: #27B07C;
    $blue: #146F88;
    $blueDark: #57709c;

    .block-cours {
        width: 100%;
        height: 100px;
        padding: 10px 10px 0 10px;
        margin-bottom: 40px;
        transition: 0.3s ease;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
        .top {
            display: flex;
            .nom {
                font-size: 1.1em;
                font-weight: 600;
                flex: 2;
                color: $green;
            }
            .prof {
                color: $blue;
                font-weight: bold;
            }
        }
        .bottom {
            display: flex;
            .heure {
                flex: 3;
                padding: 7px 10px;
            }
            .salle {
                background-color: #dddddd;
                padding: 7px 10px;
                border-radius: 20px;
            }
        }
        &:hover {
            transform: scale(1.01);
        }
        .plus-cours {
            text-align: center;
            font-size: 1.5em;
            color: $green;
            margin-top: 20px;
        }
    }

    .food-container {
        .image {
            width: calc(100% + 20px);
            overflow: hidden;
            height: 100px;
            margin: -10px;
            .photo {
                width: 100%;
            }
        }
        .top {
            margin-top: -68px;
            font-size: 2em;
            text-align: center;
            .nom {
                color: #fff !important;
            }
        }
    }
</style>
