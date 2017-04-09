<template>
    <div class="messages">
        <h1>Des messages apparaitrons ici</h1>
    </div>
</template>

<script>
    import {HTTP} from '../api'
    import store from '../store'
    import {mapGetters} from 'vuex'
    export default {
        name: 'Messages',
        store,
        data () {
            return {}
        },
        components: {
        },
        created () {
        },
        mounted () {
        },
        computed: mapGetters([
        ]),
        methods: {
        },
        watch: {}
    }
</script>

<style lang="scss">
    $green: #27B07C;
    $blue: #146F88;
    $blueDark: #57709c;
</style>
