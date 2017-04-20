<template>
    <button class="block-prof" :id="id" @click="toggleContent">
        <div class="information-visible">
            <img class="image-information" :src="'http://intranet.iut-troyes.univ-reims.fr/media/cache/gallerie/uploads/img/enseignants/' + image" alt="Enseignant">
            <p class="info-visible-texte titre">{{ titre }}</p>
            <a class="info-visible-texte email" v-if="email !== null && email !== ''" :href="`mailto:${email}`">
                <img class="img-message" src="http://195.83.128.55/~mmi15b08/intranet/dist/message.svg" alt="Message">
            </a>
        </div>
        <div class="information" v-if="visible && (domaine !== null && domaine !== '' || responsabilite !== null && responsabilite !== '' || bureau !== null && bureau !== '' || site !== null && site !== '')">
            <ul class="ul-information">
                <li v-if="domaine !== null && domaine !== ''"><strong>Domaine : </strong>{{ domaine }}</li>
                <li v-if="responsabilite !== null && responsabilite !== ''"><strong>Responsabilités : </strong>{{ responsabilite }}</li>
                <li v-if="email !== null && email !== ''"><strong>Email : </strong> <a :href="`mailto:${email}`">{{ email }}</a></li>
                <li v-if="bureau !== null && bureau !== ''"><strong>Bureau : </strong> {{ bureau }}</li>
                <li v-if="site !== null && site !== ''"><strong>Site : </strong> <a :href="site" target="_blank">Visiter</a></li>
            </ul>
        </div>
    </button>
</template>

<script>
    import {HTTP} from '../../api'
    import store from '../../store/index'
    import {mapGetters} from 'vuex'
    export default {
        name: 'Enseignant-Block',
        store,
        data () {
            return {
                visible: false
            }
        },
        props: {
            titre: String,
            image: String,
            domaine: String,
            responsabilite: String,
            email: String,
            bureau: String,
            site: String,
            id: Number
        },
        methods: {
            toggleContent () {
                this.visible = !this.visible;
            }
        },
    }
</script>

<style lang="scss">
    $green: #27B07C;
    $blue: #146F88;
    .block-prof {
        border: 0;
        min-height: 100px;
        background-color: $blue;
        width: 100%;
        margin-bottom: 10px;
        padding: 0;

        .information-visible {
            display: flex;
            .image-information {
                height: 100px;
            }
            .info-visible-texte {
                margin: auto;
            }
            .titre {
                flex: 2;
                color: #fff;
            }
            .email {
                flex: 1;
                transition: 0.3s ease;
                &:hover {
                    transform: scale(1.1) rotateZ(10deg);
                }
                .img-message {
                    height: 25px;
                }
            }
        }
        .information {
            animation: showContent 1s ease;
            .ul-information {
                padding-left: 0;
                text-align: left;
                color: #fff;
                margin: 10px;
                a{
                    color: inherit;
                }
            }
        }
    }
    @keyframes showContent {
        0% {
            max-height: 0;
            opacity: 0;
        }
        100% {
            max-height: 800px;
            opacity: 1;
        }
    }

</style>