<template>
    <div class="block-cours message" :class="{ 'message-important': messageImportant }">
        <p class="message-content">{{ message.message }}</p>
        <div class="bas">
            <span class="date">Le {{ message.date }} à {{ message.heure }}</span>
        </div>
    </div>
</template>

<script>
    import {HTTP} from '../../api'
    import store from '../../store/index'
    import {mapGetters} from 'vuex'
    export default {
        name: 'Block_Message',
        store,
        data () {
            return {
                messageImportant: false
            }
        },
        props: {
            message: Object
        },
        created () {
            if(this.message.importance === 'haute') {
                this.messageImportant = true;
            }
        },
        mounted () {
        },
        computed: mapGetters([]),
        methods: {},
        watch: {
        }
    }
</script>

<style lang="scss">
    $green: #27B07C;
    $blue: #146F88;
    $blueDark: #57709c;
    $orangeMessage: #f14900;
    .message {
        position: relative;
        border-top: 1px solid #eee;
        border-right: 1px solid #eee;
        border-left: 1px solid #eee;
        border-bottom: 5px solid $green;
        border-radius: 5px;
        box-shadow: none;
        .bas {
            position: absolute;
            right: 5px;
            bottom: 3px;
        }
        .message-content {
            height: 60px;
            overflow-y: auto;
        }
    }
    .message-important {
        border-bottom: 5px solid $orangeMessage;
    }
</style>