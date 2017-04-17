<template>
    <button class="block-information" :id="id" @click="toggleContent">
        <div class="information-visible">
            <p class="titre">{{ titre }}</p>
            <img class="image-information" :src="'http://195.83.128.55/~mmi15b08/intranet/dist/' + image" alt="Wifi">
        </div>
        <div class="information" v-if="visible">
            <div v-html="content"></div>
        </div>
    </button>
</template>

<script>
    import {HTTP} from '../../api'
    import store from '../../store/index'
    import {mapGetters} from 'vuex'
    export default {
        name: 'Informations-Block',
        store,
        data () {
            return {
                visible: false
            }
        },
        props: {
            titre: String,
            image: String,
            content: String,
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
    .block-information {
        width: 100%;
        min-height: 100px;
        max-height: 800px;
        border-bottom: 5px solid $green;
        border-right: 0;
        border-left: 0;
        border-top: 0;
        padding: 0 15px;
        border-radius: 5px;
        margin-bottom: 20px;
        background-color: transparent;
        box-shadow: 0 8px 10px rgba(0, 0, 0, 0.10);
        transition: 5s ease all;
        &:active{
            transform: scale(0.90);
            box-shadow: none;
        }

        .information-visible {
            height: 100px;
            display: flex;
        }
        .titre {
            text-align: left !important;
            margin: auto !important;
            display: inline-block;
            width: 75%;
        }
        .image-information {
            height: 50px;
            margin: auto;
        }
        .information {
            margin-bottom: 20px;
            text-align: justify;
            animation: showContent 0.5s ease;
            ul {
                padding-left: 12px;
                li {
                    text-align: left;
                    list-style: initial;
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
    }

</style>