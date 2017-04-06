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
    export default {
        name: 'app',
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
            this.heure = moment().format('HH:mm');
            if (moment(this.heure).isAfter(this.cour.hfin)) return this.coursPasse= true;
        },
        computed: {
            pseudoFriend () { return store.state.pseudoFriend}
        }
    }

</script>
<style lang="scss">
    .cours-passe {
        opacity: 0.5;
    }
</style>