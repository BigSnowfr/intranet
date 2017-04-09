<template>
    <div class="modal-pseudo">
        <div class="modal-pseudo-contenu">
            <p class="text">
                {{ title }} <button class="modal-pseudo-close" @click="closeModal">X</button>
            </p>
            <form class="formulaire">
                <label for="nom">{{label}}</label>
                <input class="input-pseudo" type="text" id="nom" placeholder="Pseudo" v-model="pseudo" autofocus>
                <button class="btn-valider" @click.prevent="addPseudo">{{ button }}</button>
            </form>
        </div>
    </div>
</template>
<script>
    import {HTTP} from '../api'
    import store from '../store'
    import { mapGetters } from 'vuex'
    export default {
        name: 'modalPseudo',
        data () {
            return {
                state: store.state,
                pseudo: '',
                title: 'Connexion',
                label: 'Entrer votre pseudo intranet',
                button: 'Valider'
            }
        },
        store,
        computed: mapGetters([
            'jour',
            'mypseudo',
            'modalPseudo',
            'pseudoFriend'
        ]),
        mounted () {
            document.getElementById("nom").focus();
            if(this.modalPseudo === 'friend') {
                this.title = 'Comparer nos emplois du temps';
                this.label = 'Entrer le pseudo de votre ami';
                this.button = 'Comparer'
            }
        },
        methods: {
            addPseudo () {
                if(this.pseudo !== '') {
                    if (this.modalPseudo === 'friend') {
                        var pseudo = 'definePseudoFriend'
                    } else {
                        var pseudo = 'definePseudo';
                        localStorage.setItem('pseudo', this.pseudo);
                        HTTP.get(`user/${this.pseudo}`).then((response) => {
                            this.$store.dispatch('defineEtudiant', response.data)
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }
                    this.$store.dispatch(pseudo, this.pseudo);
                    this.$store.dispatch('toggleModalPseudo');
                }
            },
            closeModal () {
                this.$store.dispatch('toggleModalPseudo', '');
            }
        }
    }
</script>
<style lang="scss">
    $green: #27B07C;
    $blue: #146F88;
    $blueDark: #57709c;
    $blueDarker: #4b648e;
    $orange: #cc713c;
    .modal-pseudo {
        overflow: hidden;
        position: absolute;
        top: 0;
        right: 10px;
        left: 10px;
        bottom: 0;
        z-index: 14;
        display: flex;
        .modal-pseudo-contenu {
            background-color: gainsboro;
            margin: auto;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
            .text {
                color: $green;
                width: 90%;
                margin: 20px auto 10px auto;
                font-size: 15px;
                font-weight: 600;
            }
            .modal-pseudo-close {
                background-color: transparent;
                border: 0;
                font-weight: 800;
                color: $orange;
                font-size: 24px;
                position: absolute;
                right: 5px;
                margin-top: -20px;
            }
            .formulaire {
                padding: 10px;
                label {
                    color: $blue;
                }
                .input-pseudo {
                    width: 100%;
                    background-color: transparent;
                    border: 2px solid $blue;
                    height: 35px;
                    padding: 5px;
                    color: $blue;
                }
                .btn-valider {
                    width: 100%;
                    margin-top: 20px;
                    border: 0;
                    background-color: $blueDark;
                    color: #fff;
                    height: 45px;
                    transition: 0.3s ease;
                    &:active {
                        background-color: $blueDarker;
                    }
                }
            }
        }
    }
</style>