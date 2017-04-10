<template>
    <div class="bouttons">
        <router-link to='/home/salles' class='boutton' exact>
            Salles
        </router-link>
        <router-link to='/home' class='boutton' exact>
            Ma Journée
        </router-link>
        <router-link to='/home/demain' class='boutton' exact>
            Demain
        </router-link>
    </div>
</template>
<script>
    import store from '../../store'

    export default {
        name: 'buttonJour',
        store,
        methods: {
            changeJour(jour) {
                let jourAPI = jour.path === '/home' ? 'edtjour' : 'edtlendemain';
                this.$store.dispatch('setDateActive', jourAPI);
            }
        },
        watch: {
            '$route': 'changeJour'
        }
    }
</script>