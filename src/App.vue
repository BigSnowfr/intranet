<template>
    <div id="app" class="content">
        <div class="header">
            <div>
                <p class="titre">Bonjour {{ pseudo }}</p>
                <button class="bouton" @click="changeAccount" title="Changer d'utilisateur"><img :src="'./assets/avatar.svg'" alt="User"></button>

            </div>
            <p class="date">{{ date }}</p>
        </div>
        <div class="loading text-center" v-if="ajax">
            <img :src="'./assets/ring.svg'" alt="Loading">
        </div>
        <div class="loaded" v-else>
            <div class="contenu" v-if="pseudo">
                <p class="titre">Votre journée</p>
                <div v-for="(cour, index) in cours" v-if="!cour.pascours">
                        <div class="block-cours" v-if="cour.fin !== '11h00 - 12h30'">
                            <div class="top">
                                <span class="nom">{{ cour.type }} <span v-if="cour.matiere !== ''">/ {{ cour.libelle_long }}</span></span>
                                <span class="prof">{{ cour.prof }}</span>
                            </div>
                            <p>{{ cour.texte }}</p>
                            <div class="bottom">
                                <span class="heure">{{ cour.fin }}</span>
                                <span class="salle">{{ cour.salle }}</span>
                            </div>
                        </div>
                        <div v-else>
                            <div class="block-cours">
                                <div class="top">
                                    <span class="nom">{{ cour.type }}<span v-if="cour.matiere !== ''">/ {{ cour.libelle_long }}</span></span>
                                    <span class="prof">{{ cour.prof }}</span>
                                </div>
                                <p>{{ cour.texte }}</p>
                                <div class="bottom">
                                    <span class="heure">{{ cour.fin }}</span>
                                    <span class="salle">{{ cour.salle }}</span>
                                </div>
                            </div>
                            <a href="https://www.google.fr/maps/search/48.268101,+4.070629/@48.2684398,4.0715042,17.25z" target="_blank">
                                <div class="block-cours food-container">
                                    <div class="image">
                                        <img class="photo" :src="'./assets/food.jpg'" alt="Repas">
                                    </div>
                                    <div class="top">
                                        <span class="nom">Pause Repas</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                </div>
                <div class="block-cours plus-cours-container" v-else>
                    <salles-dispo :salles="salles[index]" v-if="!ajaxSalles"></salles-dispo>
                </div>
                <div class="block-cours">
                    <p class="plus-cours">Votre journée est terminée</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {HTTP} from './api'
    import sallesDispo from './sallesDispo.vue'
    import moment from 'moment'
    export default {
        name: 'app',
        data () {
            return {
                cours: [],
                pseudo: '',
                ajax: false,
                date: '',
                debut: '23',
                salles: [],
                ajaxSalles: false
            }
        },
        components: {
          sallesDispo
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
            this.getClasses();
            this.getSalles();
        },
        methods: {
            changeAccount () {
                let pseudo = prompt('Pseudo intranet ?');
                if (pseudo !== '') {
                    localStorage.setItem('pseudo', pseudo);
                    this.pseudo = pseudo;
                    this.getClasses();
                }
            },
            getSalles () {
                let self = this;
                this.ajaxSalles = true;
                HTTP.get('edt/salles').then((response) => {
                    self.salles = [];
                    for (let key in response.data){
                        this.salles.push(response.data[key])
                    }
                }).then(function () {
                  self.ajaxSalles = false;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getClasses () {
                let self = this;
                this.ajax = true;
                this.axios.get('https://api.corentincloss.fr/intranet/edt.php?id=' + this.pseudo).then((response) => {
                    self.cours = [];
                    for (let key in response.data){
                            this.cours.push(response.data[key])
                    }
                }).then(() => {
                    self.cours.map(function (obj, index) {
                        if (obj.fin) {
                            self.cours[index].type = obj.type.toUpperCase();
                            switch (obj.fin) {
                                case 4:
                                    self.cours[index].fin = '8h00 - 9h30';
                                    break;
                                case 7:
                                    self.cours[index].fin = '9h30 - 11h00';
                                    break;
                                case 10:
                                    self.cours[index].fin = '11h00 - 12h30';
                                    break;
                                case 16:
                                    self.cours[index].fin = '14h - 15h30';
                                    break;
                                case 19:
                                    self.cours[index].fin = '15h30 - 17h00';
                                    break;
                                case 22:
                                    self.cours[index].fin = '17h - 18h30';
                            }
                        }else {
                            self.cours[index].pascours = 1
                        }
                    });
                    self.ajax = false;
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },
        watch: {
            pseudo () {
                if (this.pseudo === 'null' || this.pseudo.length < 2 || this.pseudo === null) {
                    this.changeAccount();
                }
            }
        }
    }
</script>

<style lang="scss">
    $green : #27B07C;
    $blue: #6a85b6;
    $blueDark: #57709c;
    .content{
        a {
            text-decoration: none;
            &:hover, &:active {
                text-decoration: none;
                transform: scale(1.01);
            }
        }
        user-select: none;
        font-family: 'Open Sans', sans-serif;
        .food-container {
            .image {
                width: calc(100% + 20px);
                overflow: hidden;
                height: 100px;
                margin: -10px;
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
            background-color: $green;
            box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
            .bouton {
                background-color: transparent;
                border: 0;
            }
            .sous-titre {
                margin: auto;
            }
            .titre {
                font-size: 2em;
                width: 50vw;
                display: inline-block;
                float: left;
                margin-left: 25vw;
            }
            img {
                height: 40px;
            }
            .date {
                font-size: 1.4em;
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
            margin-top: 30px;
            padding: 0 10px;
            .titre {
                font-weight: 600;
                font-size: 1.2em;
                color: $blue;
                text-align: center;
                margin-bottom: 20px;
            }
            .block-cours {
                width: 100%;
                height: 100px;
                padding: 10px;
                margin-bottom: 40px;
                transition: 0.3s ease;
                box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
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
