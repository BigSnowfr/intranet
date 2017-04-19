<template>
    <div>
        <button class="back-button" @click="retourHome"><img src="http://195.83.128.55/~mmi15b08/intranet/dist/left-arrow.svg" alt="Retour"></button>
        <div class="bouttons">
            <boutton-etage :etage="index" v-for="(salle,index) in salles"></boutton-etage>
        </div>
        <p class="section-title titre-plan">Salle : {{ salleHovered }}</p>
        <div class="carte">
            <div class="map" id="map">
                <div class="map__image">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                         style="isolation:isolate"
                         viewBox="0 -0.5 488.5 757.5" width="100%" height="65vh">
                        <salle v-for="salle in salles[etageSelected]" :key="salle.nom" :salle="salle"
                               v-on:hoverSalle="eventChild"></salle>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {HTTP} from '../../api'
    import store from '../../store/index'
    import {mapGetters} from 'vuex'
    import salle from './salle.vue'
    import bouttonEtage from './bouttonEtage.vue'

    export default {
        name: 'Batiment-interieur',
        store,
        data () {
            return {
                salleHovered: '',
                EtageSelected: false
            }
        },
        props: {
          salles: Object
        },
        components: {
            salle,
            bouttonEtage
        },
        mounted () {
            window.scroll(0,0);
            this.$store.dispatch('setEtageSelected', 'RDC');
            this.salleHovered = this.salleSelected;
        },
        methods: {
            eventChild (nom) {
                this.salleHovered = nom;
            },
            retourHome () {
                this.$store.dispatch('setEtageSelected', '');
                this.$emit('backHome');
            }
        },
        computed: mapGetters([
            'salleSelected',
            'etageSelected'
        ])
    }
</script>
<style lang="scss">
    $green: #27B07C;
    $greenDark: #248e5f;
    $blue: #146F88;
    .back-button {
        background-color: transparent;
        border: 0;
        position: relative;
        top: -30px;
        img {
            height: 32px;
            transition: 0.3s ease all;
            &:hover {
                transform: scale(1.1);
            }
        }
    }
</style>
