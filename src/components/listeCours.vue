<template>
    <div>
        <div v-for="(cour, index) in coursProps" v-if="cour.hfin !== undefined" class="tuile">
            <div class="edt">
                <tuile-cours :cour="cour" v-if="cour.hfin !== '12:30'"></tuile-cours>
                <div v-else>
                    <tuile-cours :cour="cour"></tuile-cours>
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
        </div>
    </div>
</template>
<script>
    import {HTTP} from '../api'
    import store from '../store'
    import tuileCours from './tuileCours.vue'
    export default {
        name: 'listeCours',
        data () {
            return {}
        },
        props: {
            coursProps: Array
        },
        components: {
            tuileCours,
        }
    }
</script>