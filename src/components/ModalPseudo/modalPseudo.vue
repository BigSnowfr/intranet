<template>
    <div class="modal-pseudo">
        <div class="modal-pseudo-contenu">
            <p class="text">
                <span class="titre-modal-pseudo">{{ title }}</span>
                <button class="modal-pseudo-close" @click="closeModal" v-if="mypseudo">X</button>
            </p>
            <form class="formulaire">
                <label for="nom" class="label-form">{{label}}</label>
                <input class="input-pseudo" type="text" id="nom" placeholder="Pseudo" v-model="pseudo" autofocus>
                <div class="select-friends" v-if="this.modalPseudo === 'friend' && this.pseudo_friends.length > 0">
                    <p class="label-form">Ou bien, séléctionnez parmi vos amis</p>
                    <div class="control-group-container">
                        <div class="control-group" v-for="(ami, index) in pseudo_friends">
                            <label class="control control--radio">{{ ami }}
                                <input type="radio" name="radio" v-model="pseudo_friend" :value="ami"/>
                                <div class="control__indicator"></div>
                            </label>
                            <button class="delete-friend" @click.prevent="removeFriend(index)"><img src="http://195.83.128.55/~mmi15b08/intranet/dist/trash.svg" alt="Corbeille"></button>
                        </div>
                    </div>
                </div>
                <button class="btn-valider" @click.prevent="addPseudo">{{ button }}</button>
            </form>
        </div>
    </div>
</template>
<script>
    import {HTTP} from '../../api'
    import store from '../../store/index'
    import { mapGetters } from 'vuex'
    export default {
        name: 'modalPseudo',
        data () {
            return {
                state: store.state,
                pseudo: '',
                title: 'Connexion',
                label: 'Entrer votre pseudo intranet',
                button: 'Valider',
                pseudo_friend: '',
                pseudo_friends:  []
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
                this.label = 'Entrez le pseudo d\'un étudiant';
                this.button = 'Comparer';
            }
            let amis = JSON.parse(localStorage.getItem('amis'));
            if (amis) return this.pseudo_friends = amis;
        },
        watch: {
            pseudo_friend () { if (this.pseudo_friend && this.pseudo_friend.length > 0) this.pseudo = ''; },
            pseudo () { if (this.pseudo.length > 0) this.pseudo_friend = ''; }
        },
        methods: {
            addPseudo () {
                if(this.pseudo !== '' || this.pseudo_friend !== '') {
                    let pseudo = '';
                    if (this.modalPseudo === 'friend') {
                        pseudo = 'definePseudoFriend';

                        // On vérifie si le pseudo n'est pas déjà dans le tableau
                        let pseudoInArray = this.pseudo_friends.indexOf(this.pseudo);

                        if (pseudoInArray === -1 && this.pseudo.length > 0) {
                            this.pseudo_friends.push(this.pseudo);
                            localStorage.setItem('amis', JSON.stringify(this.pseudo_friends));
                        }

                        if (this.pseudo_friend.length > 0) this.pseudo = this.pseudo_friend;
                    } else {
                        pseudo = 'definePseudo';
                        localStorage.setItem('pseudo', this.pseudo);
                        this.$store.dispatch('definePseudo', this.pseudo);
                        this.$store.dispatch('getPseudo');
                    }
                    this.$store.dispatch(pseudo, this.pseudo);
                    this.$store.dispatch('toggleModalPseudo');
                }
            },
            removeFriend(index){
              this.pseudo_friends.splice(index, 1);
              localStorage.setItem('amis', JSON.stringify(this.pseudo_friends));
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
    .control-group {
        display: block;
        vertical-align: top;
        text-align: left;
        width: 100%;
        .delete-friend {
            background-color: transparent;
            border: 0;
            float: right;
            img {
                height: 15px;
            }
        }
    }
    .control {
        display: inline-block;
        position: relative;
        padding-left: 30px;
        margin-bottom: 15px;
        cursor: pointer;
        font-size: 18px;
    }
    .control input {
        position: absolute;
        z-index: -1;
        opacity: 0;
    }
    .control__indicator {
        position: absolute;
        top: 2px;
        left: 0;
        height: 20px;
        width: 20px;
        background: #e6e6e6;
    }
    .control--radio {
        font-weight: normal;
    }
    .control--radio .control__indicator {
        border-radius: 50%;
    }
    .control:hover input ~ .control__indicator,
    .control input:focus ~ .control__indicator {
        background: #ccc;
    }
    .control:hover input:not([disabled]):checked ~ .control__indicator,
    .control input:checked:focus ~ .control__indicator {
        background: #0e647d;
    }
    .control__indicator:after {
        content: '';
        position: absolute;
        display: none;
    }
    .control input:checked ~ .control__indicator:after {
        display: block;
    }
    .control--radio .control__indicator:after {
        left: 7px;
        top: 7px;
        height: 6px;
        width: 6px;
        border-radius: 50%;
        background: #fff;
    }
    .modal-pseudo {
        overflow: hidden;
        position: fixed;
        top: 5%;
        right: 5%;
        left: 5%;
        z-index: 14;
        display: flex;
        animation: open 0.5s;
        .modal-pseudo-contenu {
            background-color: gainsboro;
            width: 100%;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19);
            position: relative;
            .text {
                color: $green;
                width: 90%;
                margin: 20px auto 10px auto;
                font-size: 15px;
                font-weight: 600;
                .picto-modal {
                    height: 30px;
                }
                .titre-modal-pseudo {
                    vertical-align: super;
                    font-size: 16px;
                }
                .modal-pseudo-close {
                    border: 0;
                    font-weight: 800;
                    color: $orange;
                    font-size: 24px;
                    float: right;
                    position: absolute;
                    right: 0;
                    top: 0;
                    background-color: transparent;
                    border-radius: 20px;
                    padding: 0 10px;
                    transition: 0.3s ease;
                    &:hover {
                        transform: scale(1.1);
                    }
                }
            }
            .formulaire {
                padding: 10px;
                .label-form {
                    color: $blue;
                    margin-bottom: 5px;
                    font-weight: 700;
                }
                .select-friends {
                    margin-top: 20px;
                    .control-group-container {
                        max-height: 130px;
                        overflow-y: scroll;
                        -webkit-overflow-scrolling: touch;
                        padding: 5px;
                        border: 2px solid #146F88;
                    }
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

    .input-pseudo {
        width: 100%;
        border: 2px solid $blue;
        height: 35px;
        padding: 5px;
        color: $blue;
        background: url('http://195.83.128.55/~mmi15b08/intranet/dist/search.svg') 95% no-repeat;
        background-size: 20px;
        margin-top: 10px;
    }
    @keyframes open {
        from {
            top: -50%;
        }
        to {
            top: 5%;
        }

    }
    @media screen and (max-width: 400px) {
        .modal-pseudo .modal-pseudo-contenu .text .titre-modal-pseudo {
            font-size: 14px;
        }
    }
</style>