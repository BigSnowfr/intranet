<template>
    <div class="message-container">
        <div class="block-cours message" :class="{ 'message-important': messageImportant }">
            <p class="message-content">{{ message.message }}</p>
            <div class="bas">
                <div v-if="message.importance === 'haute'" class="message-important">
                    <img class="picto-important"  src="http://195.83.128.55/~mmi15b08/intranet/dist/exclamation-mark.svg" alt="Important">
                    <span>Important</span>
                </div>
                <span class="date">Le {{ message.date }} à {{ message.heure }}</span>
            </div>
        </div>
        <img class="logo-iut logo-iut-message" src="http://195.83.128.55/~mmi15b08/intranet/dist/iut.png" alt="Logo IUT">
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
        }
    }
</script>
<style lang="scss">
    $green: #27B07C;
    $blue: #4a90e2;
    $blueLight: #5193a5;
    $blueDark: #57709c;
    $orangeMessage: #FFA657;
    .message-container {
        display: flex;
        position: relative;
        .message {
            position: relative;
            white-space: pre-wrap;
            border-top-left-radius: 1em;
            border-top-right-radius: 1em;
            border-bottom-left-radius: 1em;
            clear: left;
            float: left;
            word-wrap: break-word;
            box-sizing: border-box;
            max-width: 90%;
            background-color: $blue;
            color: #fff;
            height: auto;
            padding: 6px 12px;
            box-shadow: none;
            margin-bottom: 20px;
            &:active, &:hover {
                transform: scale(1);
            }
            .bas {
                position: relative;
                .picto-important {
                    height: 15px;
                    width: 15px;
                }
                .date {
                    position: absolute;
                    right: 5px;
                    bottom: 3px;
                }
                .message-important {
                    display: inline-block;
                    position: relative;
                    float: left;
                    span {
                        position: absolute;
                        top: -2px;
                        left: 30px;
                    }
                }
            }
            .message-content {
                word-wrap: break-word;
            }
        }
        .message-important {
            background-color: $orangeMessage;
        }
        .logo-iut-message {
            right: 0;
            bottom: 20px;
            position: absolute;
        }
    }

    .logo-iut {
        height: 25px;
        width: 25px;
        vertical-align: middle;
    }
</style>