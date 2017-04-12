<template>
    <button class="block-information" :id="id" @click="toggleContent">
        <div class="information-visible">
            <p class="titre">{{ titre }}</p>
            <img class="image-information" :src="'http://intranet.iut-troyes.univ-reims.fr/media/cache/gallerie/uploads/img/enseignants/' + image" alt="Enseignant">
        </div>
        <div class="information" v-if="visible">
            <ul>
                <li v-if="domaine !== null && domaine !== ''"><strong>Domaine : </strong>{{ domaine }}</li>
                <li v-if="responsabilite !== null && responsabilite !== ''"><strong>Responsabilités : </strong>{{ responsabilite }}</li>
                <li v-if="email !== null && email !== ''"><strong>Email : </strong> <a :href="`mailto:${email}`">{{ email }}</a></li>
                <li v-if="bureau !== null && bureau !== ''"><strong>Bureau : </strong> {{ bureau }}</li>
                <li v-if="site !== null && site !== ''"><strong>Site : </strong> <a :href="site" target="_blank">Visiter</a></li>
            </ul>
        </div>
    </button>
</template>

<script>
    import {HTTP} from '../../api'
    import store from '../../store/index'
    import {mapGetters} from 'vuex'
    export default {
        name: 'Enseignant-Block',
        store,
        data () {
            return {
                visible: false
            }
        },
        props: {
            titre: String,
            image: String,
            domaine: String,
            responsabilite: String,
            email: String,
            bureau: String,
            site: String,
            id: Number
        },
        methods: {
            toggleContent () {
                this.visible = !this.visible;
            }
        },
    }
</script>

<style lang="scss">
    $green: #27B07C;

</style>