<template>
    <g>
        <rect :x=salle.x :y=salle.y :width=salle.width :height=salle.height transform="matrix(1,0,0,1,0,0)"
              fill="rgb(235,235,235)"
              :class="{ active: active }"
              @mouseover="over(salle.nom)"
              @mouseleave="over('')"
              @click="selectBatiment(salle.nom)"
        />
        <g :transform="'matrix(1,0,0,1,'+salle.x+','+salle.y+')'">
            <text :transform="'matrix(1,0,0,1,1,45)'"
                  style="font-family:'Open Sans';;font-weight:400;font-size:20px;font-style:normal;fill:#000000;stroke:none;">
                {{ salle.nom }}
            </text>
        </g>
    </g>

</template>

<script>
    import {HTTP} from '../../api'
    import store from '../../store/index'
    import {mapGetters} from 'vuex'

    export default {
        name: 'Salle',
        store,
        data () {
            return {
                active: false
            }
        },
        props: {
            salle: Object
        },
        mounted () {
          if (this.salle.nom === this.salleSelected) {
              this.active = true;
              this.$store.dispatch('setSalleSelected', this.salle.nom)
          }
        },
        methods: {
          over (nom) {
              if (this.nom === '') this.active = false;
              this.$emit('hoverSalle', nom);
              this.$store.dispatch('setSalleSelected', '');
          },
            selectBatiment (nom) {
              this.$store.dispatch('setBatimentSelected', nom);
          }
        },
        computed: mapGetters([
            'salleSelected'
        ]),
    }
</script>
<style lang="scss">
</style>
