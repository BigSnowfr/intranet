<template>
    <div class="liste-info">
        <h2 class="section-title">Enseignants</h2>
        <block
                :id=1
                :titre="'Jérôme LANDRÉ'"
                :image="'0jerome.jpg'"
                domaine="Programmation Web"
                responsabilite="Directeur des études "
                email="jerome.landre@univ-reims.fr"
                bureau="H013"
                site="http://jerome.landre.pagesperso-orange.fr/"
        ></block>
        <block
                :id=1
                :titre="'Jérôme LANDRÉ'"
                :image="'0jerome.jpg'"
                domaine="Programmation Web"
                responsabilite="Directeur des études "
                email="jerome.landre@univ-reims.fr"
                bureau="H013"
                site="http://jerome.landre.pagesperso-orange.fr/"
        ></block>
        <block
                :id=1
                :titre="'Jérôme LANDRÉ'"
                :image="'0jerome.jpg'"
                domaine="Programmation Web"
                responsabilite="Directeur des études "
                email="jerome.landre@univ-reims.fr"
                bureau="H013"
                site="http://jerome.landre.pagesperso-orange.fr/"
        ></block>
        <block
                :id=1
                :titre="'Jérôme LANDRÉ'"
                :image="'0jerome.jpg'"
                domaine="Programmation Web"
                responsabilite="Directeur des études "
                email="jerome.landre@univ-reims.fr"
                bureau="H013"
                site="http://jerome.landre.pagesperso-orange.fr/"
        ></block>
        <block
                :id=1
                :titre="'Jérôme LANDRÉ'"
                :image="'0jerome.jpg'"
                domaine="Programmation Web"
                responsabilite="Directeur des études "
                email="jerome.landre@univ-reims.fr"
                bureau="H013"
                site="http://jerome.landre.pagesperso-orange.fr/"
        ></block>
        <block
                :id=1
                :titre="'Jérôme LANDRÉ'"
                :image="'0jerome.jpg'"
                domaine="Programmation Web"
                responsabilite="Directeur des études "
                email="jerome.landre@univ-reims.fr"
                bureau="H013"
                site="http://jerome.landre.pagesperso-orange.fr/"
        ></block>
    </div>
</template>

<script>
    import {HTTP} from '../../api'
    import store from '../../store/index'
    import block from './block.vue'
    import {mapGetters} from 'vuex'
    export default {
        name: 'Informations',
        store,
        data () {
            return {}
        },
        components: {
            block
        },
        created () {
        },
        mounted () {
        },
        computed: mapGetters([
        ]),
        methods: {
        },
        watch: {
            '$route': 'toggleMenu'
        }
    }
</script>

<style lang="scss">
    $green: #27B07C;
    $blue: #146F88;
    $blueDark: #57709c;

    .liste-info {
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        margin-top: 110px;
    }

</style>
