<template>
    <div class="liste-info">
        <button-jour></button-jour>
        <div v-if="!ajax" class="cours">
            <div class="slim">
                <span v-if="pseudoFriend" class="pseudo-cours">{{etudiant.prenom}}</span>
                <liste-cours :coursProps="cours"></liste-cours>
                <div class="block-cours plus-cours-container">
                    <p class="plus-cours">Votre journée est terminée</p>
                </div>
            </div>
            <div class="slim" v-if="pseudoFriend">
                <button class="pseudo-cours btn-pseudo-cours" @click="removeFriend">{{ pseudoFriend.prenom }} <span
                        class="remove-friend">X</span></button>
                <liste-cours :coursProps="coursFriend"></liste-cours>
                <div class="block-cours plus-cours-container">
                    <p class="plus-cours">Votre journée est terminée</p>
                </div>
            </div>
            <button-compare-e-d-t></button-compare-e-d-t>
        </div>
        <div class="loading text-center" v-else>
            <img :src="'http://195.83.128.55/~mmi15b08/intranet/assets/ring.svg'" alt="Loading">
        </div>
    </div>
</template>
<script>
    import {HTTP} from '../../api'
    import { mapGetters } from 'vuex'
    import moment from 'moment'
    import buttonCompareEDT from './buttonCompareEDT.vue'
    import modalPseudo from '../ModalPseudo/modalPseudo.vue'
    import listeCours from './listeCours.vue'
    import buttonJour from './buttonJour.vue'
    import store from '../../store/index'
    export default {
        name: 'app',
        store,
        data () {
            return {
                cours: [],
                coursFriend: [],
                ajax: false,
                date: '',
                state: store.state,
            }
        },
        components: {
            buttonCompareEDT,
            modalPseudo,
            listeCours,
            buttonJour
        },
        computed: mapGetters([
            'jour',
            'mypseudo',
            'modalPseudo',
            'pseudoFriend',
            'etudiant'
        ]),
        watch: {
            jour () {
                this.getClasses(this.mypseudo);
                if (this.pseudoFriend !== '') this.getClasses(this.pseudoFriend.pseudo);
            },
            pseudoFriend () { if (this.pseudoFriend !== '') this.getClasses(this.pseudoFriend.pseudo); },
            mypseudo () { this.getClasses(this.mypseudo); }
        },
        created () {
            moment.locale('fr');
            if (this.$route.path === '/home/demain') {
                this.$store.dispatch('setDateActive', 'edtlendemain');
            }else {
                this.$store.dispatch('setDateActive', 'edtjour');
            }
            this.date = moment().format('dddd D MMMM YYYY');
            this.getClasses(this.mypseudo);
            if (this.pseudoFriend !== '') this.getClasses(this.pseudoFriend.pseudo);
        },
        mounted () {
            window.scroll(0,0);
        },
        methods: {
            getClasses (pseudo) {
                if (pseudo !== null) {
                    let self = this;
                    this.ajax = true;
                    HTTP.get(`${this.jour}/${pseudo}`).then((response) => {
                        if (response.data[0] === 'erreur') {
                            self.ajax = false;
                            //self.$store.dispatch('resetFriend');
                            alert('Aucun étudiant possède ce pseudo');
                            return;
                        }
                        // On vérifie qu'il y a des cours
                        var cours = response.data;


                        if (pseudo === this.mypseudo) {
                            this.cours = cours;
                        } else {

                            this.coursFriend = cours;
                        }

                        self.ajax = false;
                        return cours
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            },
            removeFriend () {
                this.$store.dispatch('resetFriend');
            }
        }
    }
</script>
<style lang="scss">
    $green: #77b5fd;
    $blue: #4a90e2;
    $blueDark: #57709c;
    $orangeLight: #cc9144;
    .cours {
        display: flex;
        .pseudo-cours {
            display: block;
            text-align: center;
            background-color: $blueDark;
            padding: 5px 0;
            border-radius: 20px;
            color: #fff;
            width: 80%;
            margin: auto;
            margin-bottom: 20px;
        }
        .remove-friend {
            color: $orangeLight;
            font-weight: 800;
            margin-left: 5px;
        }
    }

    .slim {
        flex: 1;
    }

    .tuile {
        margin: 5px;
    }

    .btn-pseudo-cours {
        border: 0;
    }

    .block-cours {
        width: 100%;
        min-height: 90px;
        padding: 10px 10px 0 10px;
        margin-bottom: 20px;
        transition: 0.3s ease;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.19);
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
                font-size: 12px;
                font-weight: bold;
            }
        }
        .bottom {
            display: flex;
            padding-bottom: 5px;
            .heure {
                flex: 3;
                padding: 7px 10px;
            }
            .salle {
                background-color: $green;
                color: #fff;
                padding: 7px 10px;
                border-radius: 20px;
            }
        }
        &:hover {
            transform: scale(1.01);
        }
    }

    .plus-cours-container {
        display: flex;
        box-shadow: none;
        .plus-cours {
            text-align: center;
            font-size: 1.5em;
            color: $green;
            margin: auto;
        }
    }

    .food-container {
        .image {
            width: calc(100% + 20px);
            overflow: hidden;
            height: 100px;
            margin: -10px;
            display: flex;
            background-color: $blue;
            .photo {
                margin-left: 10px;
                width: 35px;
            }
        }
        .top {
            margin-top: -100px;
            height: 100px;
            font-size: 2em;
            text-align: center;
            .nom {
                color: #fff !important;
                margin: auto;
            }
        }
    }
    @media screen and (max-width: 300px){
        .block-cours {
            .top .nom {
                font-size: 14px;
            }
            .bottom {
                font-size: 12px;
            }
            .plus-cours {
                font-size: 14px;
                margin: 0;
                width: 100%;
                height: 50px;
            }
        }
        .prof {
            a {
                font-size: 12px;
            }
        }
    }
</style>
