<template>
    <div>
        <div v-for="(cour, index) in coursProps" v-if="cour.hfin !== undefined" class="tuile">
            <div class="edt">
                <tuile-cours :cour="cour" v-if="cour.hfin !== '12:30'"></tuile-cours>
                <div v-else>
                    <tuile-cours :cour="cour"></tuile-cours>
                    <a href="https://www.google.fr/maps/place/CROUS+Restaurant+Universitaire/@48.2681027,4.0708735,18.46z/data=!4m5!3m4!1s0x0:0x8db035bfe8f37f27!8m2!3d48.2681183!4d4.0702991"
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
    import {HTTP} from '../../api'
    import store from '../../store/index'
    import tuileCours from './tuileCours.vue'
    import { mapGetters } from 'vuex'
    export default {
        name: 'listeCours',
        store,
        data () {
            return {}
        },
        props: {
            coursProps: Array
        },
        components: {
            tuileCours,
        },
        computed: mapGetters([
            'jour',
            'mypseudo',
            'modalPseudo',
            'pseudoFriend'
        ]),
    }
</script>