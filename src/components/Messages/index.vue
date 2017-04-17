<template>
    <div class="messages liste-info">
        <h2 class="section-title">Messages</h2>
        <block v-for="(message, index) in messages" :key="index" :message="message"></block>
    </div>
</template>

<script>
    import {HTTP} from '../../api'
    import store from '../../store/index'
    import block from './block.vue'
    import {mapGetters} from 'vuex'

    export default {
        name: 'Messages',
        store,
        components: {
            block
        },
        computed: mapGetters([
            'mypseudo',
            'messages'
        ]),
        mounted () {
            window.scroll(0,10000)
        }
    }
</script>
<style lang="scss">
    .messages {
        margin-top: 120px;
    }
</style>
