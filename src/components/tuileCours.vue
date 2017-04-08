<template>
    <div class="block-cours" :class="{ 'cours-passe': coursPasse }">
        <div class="top">
            <span class="nom"><span v-if="cour.matiere !== ''">{{ cour.libelle_long }}</span></span>
            <span class="prof" v-if="pseudoFriend === ''">{{ cour.prof }}</span>
        </div>
        <p>{{ cour.texte }}</p>
        <div class="bottom">
            <span class="heure">{{ cour.hdebut }} - {{ cour.hfin }}</span>
            <span class="salle" v-if="cour.salle !== '****'">{{ cour.type }} - {{ cour.salle }}</span>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    import store from '../store'
    import { mapGetters } from 'vuex'
    export default {
        name: 'app',
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
        created () {
            let heure = moment();
            let heureFinCours = moment(this.cour.hfin, 'HH:mm');
            if (moment(heure).isAfter(heureFinCours) && this.state.jour === 'edtjour') return this.coursPasse= true;
        },
        computed: mapGetters([
            'jour',
            'mypseudo',
            'modalPseudo',
            'pseudoFriend'
        ]),
    }

</script>
<style lang="scss">
    .cours-passe {
        opacity: 0.5;
    }
</style>