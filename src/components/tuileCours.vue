<template>
    <div class="block-cours" v-if="cour.hfin !== '12:30'">
        <div class="top">
            <span class="nom">{{ cour.type }} <span v-if="cour.matiere !== ''">/ {{ cour.libelle_long }}</span></span>
            <span class="prof">{{ cour.prof }}</span>
        </div>
        <p>{{ cour.texte }}</p>
        <div class="bottom">
            <span class="heure">{{ cour.hdebut }} - {{ cour.hfin }}</span>
            <span class="salle" v-if="cour.salle !== '****'">{{ cour.salle }}</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'app',
        data () {
            return {}
        },
        props: {
            cour: Object
        }
    }

</script>
<style lang="scss">

</style>