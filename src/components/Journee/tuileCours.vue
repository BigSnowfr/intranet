<template>
    <div>
        <div class="block-cours" :class="{ 'cours-passe': coursPasse }" v-if="!Array.isArray(cour)">
            <div class="top">
                <span class="nom"><span v-if="cour.matiere !== ''">{{ cour.libelle_long }}</span></span>
                <span class="prof" v-if="pseudoFriend === ''"><a :href="'mailto:' + cour.profemail">{{ cour.prof }}</a></span>
            </div>
            <p>{{ cour.texte }}</p>
            <div class="bottom">
                <span class="heure">{{ cour.hdebut }} - {{ cour.hfin }}</span>
                <span class="salle" v-if="cour.salle !== '****'" :class="{ 'hidden': pseudoFriend}">{{ cour.type }} - {{ cour.salle }}</span>
            </div>
        </div>
        <div class="block-cours" :class="{ 'cours-passe': coursPasse }" v-if="Array.isArray(cour) && pseudoFriend !== ''">
            <p>Pas cours</p>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    import store from '../../store/index'
    import { mapGetters } from 'vuex'
    export default {
        name: 'tuileCours',
        store,
        data () {
            return {
                heure: '',
                state: store.state,
                coursPasse: false
            }
        },
        props: {
            cour: Object
        },
        mounted () {
            this.isCoursPasse();
        },
        computed: mapGetters([
            'jour',
            'mypseudo',
            'pseudoFriend'
        ]),
        methods: {
            isCoursPasse() {
                let heure = moment();
                let heureFinCours = moment(this.cour.hfin, 'HH:mm');
                if (moment(heure).isAfter(heureFinCours) && this.$route.path === '/home') return this.coursPasse = true;
            }
        },
        watch: {
            '$route': 'isCoursPasse'
        }
    }

</script>
<style lang="scss">
    .cours-passe {
        opacity: 0.3;
        box-shadow: none;
    }
</style>