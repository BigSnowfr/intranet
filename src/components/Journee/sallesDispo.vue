<template>
    <div class="pas-cours liste-info">
        <button-jour></button-jour>
        <div v-if="visible">
            <div class="top">
                <span class="titre">Il est {{ heure }}</span>
                <span class="sous-titre">Vous pouvez travailler dans ces salles</span>
            </div>
            <div class="bottom">
                <ul class="salles">
                    <router-link to='/plan' class='boutton' exact>
                        <li @click="selectClasse(salle)" class="salle-dispo" v-for="salle in sallesMMI">{{ salle }}</li>
                    </router-link>
                </ul>
            </div>
        </div>
        <div v-else>
            <div class="top">
                <span class="titre">L'IUT est fermé</span>
            </div>
        </div>
    </div>
</template>
<script>
    import {HTTP} from '../../api'
    import moment from 'moment'
    import {mapGetters} from 'vuex'
    import buttonJour from './buttonJour.vue'
    import store from '../../store/index'
    export default {
        name: 'sallesDispo',
        store,
        data () {
            return {
                sallesDispo: [],
                heure: '',
                visible: true,
                sallesMMI: ['STUD', 'H001', 'H005', 'H006', 'H007', 'H008', 'H016', 'H201', 'H205', 'H101', 'H103', 'H104', 'H105']
            }
        },
        components: {
            buttonJour
        },
        props: {
            salles: Object
        },
        created () {
            this.heure = moment().format("HH:mm");
            let now = moment().format("H");
            this.visible = now > 7 && now < 20;
        },
        methods: {
            selectClasse (salle) {
                this.$store.dispatch('setSalleSelected', salle)
            }
        },
        computed: mapGetters([
            'jour',
            'mypseudo',
            'modalPseudo',
            'pseudoFriend'
        ]),
    }
</script>
<style lang="scss">
    $green: #27B07C;
    $blue: #6a85b6;
    $blueDark: #57709c;
    .pas-cours {
        overflow-x: hidden;
        .top {
            .titre {
                display: block;
                width: 100vw;
                margin-bottom: 10px;
                font-size: 18px;
            }
            .sous-titre {
                color: $blueDark;
                width: 100vw;
                text-align: center;
                display: block;
            }
        }
        .heure-pas-cours {
            width: 150px;
            margin: auto;
            text-align: center;
            font-weight: 600;
        }
        .pas-cours {
            height: 90px;
            .nom {
                font-size: 0.8em !important;
            }
            .bottom {
                height: 75px;
            }
        }
        .message {
            margin-top: 20px;
            width: 100%;
            font-weight: 600;
            text-align: center;
        }
        .salles {
            margin-top: 7px;
            margin-right: -10px;
            margin-bottom: 0;
            text-align: center;
            font-size: 12px;
            padding: 0;
            .salle-dispo {
                list-style: none;
                background-color: grey;
                display: inline-block;
                color: white;
                padding: 5px 10px;
                border-radius: 14px;
                margin: 10px;
                font-size: 14px;
                cursor: pointer;
            }
        }
    }
</style>