<template>
    <div class="plan liste-info">
        <h2 class="section-title titre-plan">Plan</h2>
        <div class="carte">
            <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1327.89828928052!2d4.0800815!3d48.2682891!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr!4v1492438031073" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
        </div>
    </div>
</template>

<script>
    import {HTTP} from '../../api'
    import store from '../../store/index'
    import {mapGetters} from 'vuex'

    export default {
        name: 'Plan',
        store,
        components: {
        },
        computed: mapGetters([
        ])
    }
</script>
<style lang="scss">
    .plan {
        .titre-plan {
            margin: 0;
        }
        .carte {
            position: absolute;
            right: 0;
            left: 0;
            bottom: 0;
            top: 192px;
            iframe {
                height: 100%;
            }
        }
    }
</style>
