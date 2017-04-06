<template>
    <div class="modal-pseudo" v-if="modalPseudo">
        <div class="modal-pseudo-contenu">
            <p class="text">
                Comparez votre emploi du temps <button class="modal-pseudo-close" @click="closeModal">X</button>
            </p>
            <form class="formulaire">
                <label for="nom">Pseudo de votre ami</label>
                <input class="input-pseudo" type="text" id="nom" placeholder="Pseudo" v-model="pseudo_friend" autofocus>
                <button class="btn-valider" @click.prevent="addPseudo">Comparer notre journée</button>
            </form>
        </div>
    </div>
</template>
<script>
    import {HTTP} from '../api'
    import store from '../store'
    export default {
        name: 'modalPseudo',
        data () {
            return {
                state: store.state,
                pseudo_friend: ''
            }
        },
        computed: {
            modalPseudo () { return store.state.modalPseudo}
        },
        methods: {
            addPseudo () {
                store.commit('SET_PSEUDO_FRIEND', this.pseudo_friend);
                store.commit('SET_MODAL_PSEUDO');

            },
            closeModal () {
                store.commit('SET_MODAL_PSEUDO');
            }
        }
    }
</script>
<style lang="scss">
    $green: #27B07C;
    $blue: #146F88;
    $blueDark: #57709c;
    $orange: #cc713c;
    .modal-pseudo {
        overflow: hidden;
        position: absolute;
        top: 0;
        right: 10px;
        left: 10px;
        bottom: 0;
        z-index: 4;
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
                }
            }
        }
    }
</style>