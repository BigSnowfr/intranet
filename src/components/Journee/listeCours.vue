<template>
    <div>
        <div v-for="(cour, index) in coursProps" class="tuile">
            <div class="edt">
                <div v-if="index == 13">
                    <a href="https://www.google.fr/maps/place/CROUS+Restaurant+Universitaire/@48.2681027,4.0708735,18.46z/data=!4m5!3m4!1s0x0:0x8db035bfe8f37f27!8m2!3d48.2681183!4d4.0702991"
                       target="_blank">
                        <div class="block-cours food-container" :class="{ 'cours-passe': repasPasse }">
                            <div class="image" >
                                <img v-if="pseudoFriend === ''" class="photo" :src="'http://195.83.128.55/~mmi15b08/intranet/dist/food.svg'" alt="Repas">
                            </div>
                            <div class="top">
                                <span class="nom">Pause Repas</span>
                            </div>
                        </div>
                    </a>
                    <tuile-cours :cour="cour"></tuile-cours>
                </div>
                <tuile-cours :cour="cour" v-else></tuile-cours>
            </div>
        </div>
    </div>
</template>
<script>
    import {HTTP} from '../../api'
    import store from '../../store/index'
    import tuileCours from './tuileCours.vue'
    import { mapGetters } from 'vuex'
    import moment from 'moment'

    export default {
        name: 'listeCours',
        store,
        data () {
            return {
                repasPasse: false
            }
        },
        props: {
            coursProps: Array
        },
        components: {
            tuileCours,
        },
        mounted () {
            let heure = moment();
            if (moment(heure).isAfter(moment('14:00', 'HH:mm')) && this.$route.path === '/home') return this.repasPasse = true;
        },
        computed: mapGetters([
            'jour',
            'mypseudo',
            'modalPseudo',
            'pseudoFriend',
            'repas_display'
        ]),
    }
</script>