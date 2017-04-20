<template>
    <div class="enseignants liste-info">
        <h2 class="section-title">Enseignants</h2>
        <div class="recherche">
            <input type="text" class="input-recherche" v-model="prof" placeholder="Rechercher un enseignant">
            <img class="picto-recherche" src="http://195.83.128.55/~mmi15b08/intranet/dist/search_white.svg" alt="Recherche">
        </div>
        <div v-if="!ajax">
            <transition-group
                    name="staggered-fade"
                    tag="ul"
                    v-bind:css="false"
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:leave="leave"
                    class="liste-prof-ul"
            >
                <li
                    v-for="(enseignant,index) in enseignantsFiltrer"
                    :key="index"
                    class="liste-prof-li"
                >
                    <block
                        :id=index
                        :titre="`${enseignant.nom} ${enseignant.prenom}`"
                        :image="enseignant.photo"
                        :domaine="enseignant.domaine"
                        :responsabilite="enseignant.responsabilites"
                        :email="enseignant.mail"
                        :bureau="enseignant.bureau1"
                        :site="enseignant.siteuniv">

                    </block>
                </li>
            </transition-group>
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
            window.scroll(0,0);
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
            beforeEnter: (el) => {
                el.style.opacity = 0;
                el.style.height = 0;
                el.style.marginLeft = '-50px';
            },
            enter: (el, done) => {
                var delay = el.dataset.index * 150;
                setTimeout(() => {
                    Velocity(
                        el,
                        { opacity: 1, height: '100px', marginLeft: 0 },
                        { complete: done }
                    )
                }, delay)
            },
            leave: (el, done) => {
                var delay = el.dataset.index * 150;
                setTimeout(() => {
                    Velocity(
                        el,
                        { opacity: 0, height: 0 },
                        { complete: done }
                    )
                }, delay)
            }

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

    [v-cloak] {
        display: none;
    }

    .recherche {
        display: flex;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
        padding-left: 10px;
        .input-recherche {
            flex: 9;
            border: 0;
            transition: 0.5s ease all;
            font-size: 16px;
            &:focus {
               max-height: 40px;
                + .picto-recherche{
                    height: 40px;
                }
            }
        }
        .picto-recherche {
            padding: 10px 5px;
            flex: 1;
            background-color: $blue;
            height: 35px;
            transition: 0.5s ease all;
        }
    }

    .liste-info {
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        margin-top: 110px;
        .liste-prof-ul {
            padding-left: 0;
            .liste-prof-li {
                display: inline;
            }
        }
    }
    @media screen and (max-width: 300px) {
        .liste-info {
            margin-top: 85px;
        }
    }
</style>
