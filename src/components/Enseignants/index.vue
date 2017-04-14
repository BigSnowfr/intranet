<template>
    <div class="enseignants liste-info">
        <h2 class="section-title">Enseignants</h2>
        <input type="text" class="input-pseudo" v-model="prof" placeholder="Rechercher un enseignant">
        <div v-if="!ajax">
            <block
                    v-for="(enseignant,index) in enseignantsFiltrer"
                    :id=index
                    :key="index"
                    :titre="`${enseignant.nom} ${enseignant.prenom}`"
                    :image="enseignant.photo"
                    :domaine="enseignant.domaine"
                    :responsabilite="enseignant.responsabilites"
                    :email="enseignant.mail"
                    :bureau="enseignant.bureau1"
                    :site="enseignant.siteuniv"
            ></block>
        </div>
        <div class="loading text-center" v-else>
            <img :src="'http://195.83.128.55/~mmi15b08/intranet/assets/ring.svg'" alt="Loading">
        </div>
    </div>
</template>

<script>
    import {HTTP} from '../../api'
    import store from '../../store/index'
    import block from './block.vue'
    import {mapGetters} from 'vuex'
    export default {
        name: 'Enseignants',
        store,
        data () {
            return {
                prof: '',
                ajax: false
            }
        },
        components: {
            block
        },
        created () {
            this.ajax = true;
        },
        mounted () {
            if(this.enseignants.length === 0) {
                this.$store.dispatch('getEnseigantsFromAPI');
            }
            this.ajax = false;
        },
        computed: mapGetters([
            'mypseudo',
            'enseignantsFiltrer',
            'enseignants'
        ]),
        methods: {
            filtreEnseignants() {
                this.$store.dispatch('filterEnseignants', this.prof.toLowerCase());
            },
        },
        watch: {
            '$route': 'toggleMenu',
            prof () {
                if (this.prof.length > 1) return this.filtreEnseignants();
                else return this.$store.dispatch('resetSearch');
            }
        }
    }
</script>

<style lang="scss">
    $green: #27B07C;
    $blue: #146F88;
    $blueDark: #57709c;

    .liste-info {
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        margin-top: 110px;
    }
    @media screen and (max-width: 300px) {
        .liste-info {
            margin-top: 85px;
        }
    }
</style>
