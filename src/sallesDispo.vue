<template>
    <div class="pas-cours">
        <div class="top">
            <span class="nom">Ces salles sont disponibles pour travailler</span>
        </div>
        <div class="bottom">
            <span class="heure-pas-cours">{{ heure }}</span>
            <div class="message" v-if="message">
                {{ message }}
            </div>
            <ul v-else class="salles">
                <li class="salle-dispo" v-for="salle in sallesMMI">{{ salle }}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {HTTP} from './api'
    export default {
        name: 'sallesPrises',
        data () {
            return {
                message: '',
                sallesPrises: [],
                sallesPrises2: [],
                sallesDispo: [],
                heure: '',
                sallesMMI: ['STUD', 'H001', 'H005', 'H006', 'H007', 'H008', 'H016', 'H201', 'H205', 'H101', 'H103', 'H104', 'H105']
            }
        },
        props: {
            salles: Object
        },
        mounted () {
            this.sallesPrises = this.salles.salles;
            if (this.sallesPrises.length === 0) {
                this.message = 'Toutes les salles sont disponibles'
            }else {
                for (let key in this.sallesPrises) {
                    let salleName = this.sallesPrises[key].salle;
                    var salles = [];
                    for (let i = 0; i < this.sallesPrises.length; i++) {
                        salles.push(this.sallesPrises[i].salle)
                    }
                }
                this.sallesPrises2 = salles;
                for (let i = 0; i < this.sallesPrises2.length; i++) {
                    if (this.sallesMMI.indexOf(this.sallesPrises2[i]) > 0){
                        this.sallesMMI.splice(this.sallesMMI.indexOf(this.sallesPrises2[i]), 1)
                    }
                }
            }
            let heure = this.sallesPrises[0].fin;
            switch (heure) {
                case 4:
                    this.heure = '8h00 - 9h30';
                    break;
                case 7:
                    this.heure = '9h30 - 11h00';
                    break;
                case 10:
                    this.heure = '11h00 - 12h30';
                    break;
                case 16:
                    this.heure = '14h - 15h30';
                    break;
                case 19:
                    this.heure = '15h30 - 17h00';
                    break;
                case 22:
                    this.heure = '17h - 18h30';
                    break;
                case 25:
                    this.heure = '18h30 - 20h'
            }
        }
    }
</script>
<style lang="scss">
    $green : #27B07C;
    $blue: #6a85b6;
    $blueDark: #57709c;
    .plus-cours-container {
        background-color: #e1e1e1;
        .heure-pas-cours {
            width: 150px;
            margin: auto;
        }
        .pas-cours {
            .nom {
                font-size: 0.8em !important;
            }
        }
        .message {
            margin-top: 20px;
            width: 100%;
            font-weight: 600;
            text-align: center;
        }
        .salles {
            margin-top: 10px;
            margin-right:-10px;
            text-align: center;
            font-size: 10px;
            width: 70%;
            padding: 0;
            .salle-dispo {
                display: inline-block;
                margin-right: 15px;
                color: $blue;
                font-weight: 600;

            }
        }
    }
</style>