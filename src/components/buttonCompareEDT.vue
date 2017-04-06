<template>
    <div class="picto">
        <button class="picto-button" @click="compareEDT">
            <img src="http://195.83.128.55/~mmi15b08/intranet/assets/people.svg" alt="People" class="people-compare" />
        </button>
    </div>
</template>
<script>
    import {HTTP} from '../api'
    import store from '../store'
    export default {
        name: 'buttonCompareEDT',
        data () {
            return {
                state: store.state,
            }
        },
        methods: {
            compareEDT () {
               store.commit('SET_MODAL_PSEUDO');
            }
        }
    }
</script>
<style lang="scss">
    $green: #27B07C;
    $blue: #146F88;
    $blueDark: #57709c;
    .picto {
        z-index: 3;
        position: fixed;
        right: 10px;
        bottom: 20px;
        background-color: $blue;
        text-align: center;
        padding: 10px;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
        .picto-button {
            background-color: transparent;
            border: 0;
            padding: 2px 0 0 0;
        }
        .people-compare {
            width: 25px;
        }
    }
</style>