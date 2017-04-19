<template>
    <button class="bouton-plan" :class="{ active: active }" @click="changeEtage(etage)">{{ etage }}</button>
</template>

<script>
    import {HTTP} from '../../api'
    import store from '../../store/index'
    import {mapGetters} from 'vuex'

    export default {
        name: 'Boutton-Etage',
        store,
        data () {
            return {
                active: false
            }
        },
        props: {
            etage: String
        },
        mounted () {
            if (this.salleSelected === '' && this.etage === 'RDC') this.active = true;
            let salle = this.salleSelected.split('');
            if ((salle[1] === '0' || this.salleSelected === 'STUD' || this.salleSelected === 'Café' || this.salleSelected === 'Bureau'  || this.salleSelected === 'Esthétique' || this.salleSelected === 'Directeur' || this.salleSelected === 'Marina') && this.etage === 'RDC') {
                this.active = true;
            }else if ((salle[1] === '1' && this.etage === '1er') || (this.etageSelected === '1er' && this.etage === '1er')) {
                this.active = true;
            }else if ((salle[1] === '2' && this.etage === '2eme') || (this.etageSelected === '2ème' && this.etage === '2ème')){
                this.active = true;
            }
        },
        methods: {
            changeEtage (etage) {
                this.$store.dispatch('setEtageSelected', etage)
            }
        },
        watch: {
          etageSelected () {
              if ((this.etage === 'RDC' && this.etageSelected === 'RDC') || (this.etage === '1er' && this.etageSelected === '1er') || (this.etage === '2ème' && this.etageSelected === '2ème')) {
                  this.active = true;
              }else {
                  this.active = false;
              }
          }
        },
        computed: mapGetters([
            'salleSelected',
            'etageSelected'
        ]),
    }
</script>
<style lang="scss">
    .bouton-plan {
        transition: 0.3s ease all;
        &:active {
            transform: scale(0.95);
        }
    }
</style>
