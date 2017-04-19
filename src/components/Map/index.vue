<template>
    <div class="plan liste-info">
        <h2 class="section-title titre-plan">{{ title }}</h2>
        <div v-if="batimentSelected === ''" class="batiment-iut">
            <div class="carte">
                <div class="map" id="map">
                    <div class="map__image">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                             style="isolation:isolate"
                             viewBox="0 -0.5 488.5 757.5" width="100%" height="65vh">
                            <salle v-for="batiments in batiments" :key="batiments.nom" :salle="batiments"
                                   @hoverSalle="displayName(batiments.nom)"></salle>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <batiment class="batiment" :salles="sallesActive" @backHome="resetPlan()"></batiment>
        </div>
    </div>
</template>
<script>
    import {HTTP} from '../../api'
    import store from '../../store/index'
    import {mapGetters} from 'vuex'
    import salle from './salle.vue'
    import bouttonEtage from './bouttonEtage.vue'
    import batiment from './batiment.vue'

    export default {
        name: 'Plan',
        store,
        data () {
            return {
                title: 'Plan de l\'IUT',
                salleHovered: '',
                batiments: {
                    1: {
                        nom: 'E',
                        x: '295.06486004380486',
                        y: '205.6684347943356',
                        width: '152.00426762182485',
                        height: '48.15020008106012'
                    },
                    2: {
                        nom: 'H',
                        x: '136.00583602080735',
                        y: '31.507453552560868',
                        width: '126.54124930905493',
                        height: '69.81825778568529'
                    },
                    3: {
                        nom: 'D',
                        x: '211.57996137365845',
                        y: '370.75166513310256',
                        width: '100.66381828535495',
                        height: '140.37182246929046'
                    },
                    4: {
                        nom: 'G',
                        x: '0.9063628253414748',
                        y: '440.4954374902659',
                        width: '145.3399900091024',
                        height: '100.269995219777'
                    },
                    5: {
                        nom: 'F',
                        x: '119.64570862893544',
                        y: '365.6879083084636',
                        width: '72.24395354129854',
                        height: '43.279538209306224'
                    },
                    6: {
                        nom: 'C',
                        x: '212.78215876516091',
                        y: '295.17613716477587',
                        width: '100.66381828535495',
                        height: '43.84167942600584'
                    },
                    7: {
                        nom: 'Administration',
                        x: '96.60068858738117',
                        y: '146.5290755981473',
                        width: '120.94837495874754',
                        height: '26.90637200982411'
                    },
                    8: {
                        nom: 'B',
                        x: '180.71596732304684',
                        y: '223.9642501490569',
                        width: '63.07159610857826',
                        height: '43.84167942600584'
                    },
                    9: {
                        nom: 'A',
                        x: '225.19134847186794',
                        y: '140.82965639864',
                        width: '87.76391590241596',
                        height: '43.4621030910901'
                    }
                },
                salles: {
                    H: {
                        'RDC': {
                            1: {
                                nom: 'H006',
                                x: '1.5',
                                y: '72',
                                width: '78',
                                height: '89'
                            },
                            2: {
                                nom: 'H007',
                                x: '1.5',
                                y: '1',
                                width: '119',
                                height: '71'
                            },
                            3: {
                                nom: 'Marina',
                                x: '285.5',
                                y: '159',
                                width: '73',
                                height: '151'
                            },
                            4: {
                                nom: 'Directeur',
                                x: '285.5',
                                y: '310',
                                width: '73',
                                height: '124'
                            },
                            5: {
                                nom: 'Café',
                                x: '212.5',
                                y: '335',
                                width: '73',
                                height: '99'
                            },
                            6: {
                                nom: 'Bureau',
                                x: '139.5',
                                y: '335',
                                width: '73',
                                height: '99'
                            },
                            7: {
                                nom: 'H018',
                                x: '223.5',
                                y: '488',
                                width: '181',
                                height: '266'
                            },
                            8: {
                                nom: 'STUD',
                                x: '1.5',
                                y: '488',
                                width: '222',
                                height: '266'
                            },
                            9: {
                                nom: 'H016',
                                x: '1.5',
                                y: '335',
                                width: '88',
                                height: '153'
                            },
                            10: {
                                nom: 'H004',
                                x: '193.5',
                                y: '159',
                                width: '92',
                                height: '58'
                            },
                            11: {
                                nom: 'H001',
                                x: '301.5',
                                y: '1',
                                width: '69',
                                height: '71'
                            },
                            12: {
                                nom: 'H002',
                                x: '214.5',
                                y: '1',
                                width: '87',
                                height: '71'
                            },
                            13: {
                                nom: 'H005',
                                x: '120.5',
                                y: '1',
                                width: '94',
                                height: '71'
                            },
                            14: {
                                nom: 'Esthétique',
                                x: '1.5',
                                y: '159',
                                width: '192',
                                height: '176'
                            },
                        },
                        '1er': {
                            1: {
                                nom: 'H101',
                                x: '1.5',
                                y: '72',
                                width: '78',
                                height: '89'
                            },
                            2: {
                                nom: 'H103',
                                x: '1.5',
                                y: '1',
                                width: '119',
                                height: '71'
                            },
                            3: {
                                nom: 'H104',
                                x: '285.5',
                                y: '159',
                                width: '73',
                                height: '151'
                            },
                            4: {
                                nom: 'H105',
                                x: '285.5',
                                y: '310',
                                width: '73',
                                height: '124'
                            }
                        },
                        '2eme': {
                            1: {
                                nom: 'H006',
                                x: '1.5',
                                y: '72',
                                width: '78',
                                height: '89'
                            }
                        },
                    }
                },
                sallesActive: {}
            }
        },
        components: {
            salle,
            batiment
        },
        mounted () {
            window.scroll(0, 0);
            if (this.salleSelected === '') {
                this.sallesActive = this.batiments;
            } else {
                let batiment = this.salleSelected.split('');
                this.sallesActive = this.salles[batiment[0]];
                this.$store.dispatch('setBatimentSelected', batiment[0]);
                let etage = {
                    0: 'RDC',
                    1: '1er',
                    2: '2eme',
                    3: '3eme',
                    4: '4eme'
                };
                this.$store.dispatch('setEtageSelected', etage[batiment[1]]);
            }
        },
        destroyed () {
            this.$store.dispatch('setBatimentSelected', '');
            this.$store.dispatch('setSalleSelected', '');
            this.$store.dispatch('setEtageSelected', '');
        },
        watch: {
            batimentSelected () {
                if (this.etageSelected === '') {
                    this.title = `Batiment ${this.batimentSelected}`;
                    this.sallesActive = this.salles[this.batimentSelected];
                }
                if (this.batimentSelected === '') this.title = 'Plan de l\'IUT';
            }
        },
        methods: {
            displayName (nom) {
                this.salleHovered = nom;
            },
            resetPlan () {
                this.sallesActive = {};
                this.$store.dispatch('setBatimentSelected', '');
                this.title = 'Plan de l\'IUT';
            }
        },
        computed: mapGetters([
            'salleSelected',
            'etageSelected',
            'batimentSelected'
        ])
    }
</script>
<style lang="scss">
    $green: #27B07C;
    $greenDark: #248e5f;
    $blue: #146F88;
    @keyframes changeMapToBatiment {
        0% {
            opacity: 0;
            transform: perspective(500px) translateZ(-300px);
        }
    }
    @keyframes changeMapToIut {
        0% {
            opacity: 0;
            transform: perspective(500px) translateZ(300px);
        }
    }
    .plan {
        .batiment-iut {
            animation: changeMapToIut 0.5s;
            opacity: 1;
            transform: perspective(500px) translateZ(0);
        }
        .batiment {
            animation: changeMapToBatiment 0.5s;
            opacity: 1;
            transform: perspective(500px) translateZ(0);
        }
        .titre-plan {
            margin: 0;
        }
        .carte {
            margin-top: 20px;
            margin-left: 40px;
            .map__image {
                rect {
                    stroke: #000;
                    stroke-width: 1px;
                    transition: fill 0.3s;
                }
                rect:hover, .active {
                    fill: $blue;
                }
                text {
                    font-family: 'Open Sans', 'sans-serif';
                    font-weight: 400;
                    font-size: 15px;
                    font-style: normal;
                    text-align: center;
                    fill: #000000;
                    stroke: none;
                }
            }

        }
        .bouttons {
            .bouton-plan {
                background-color: $green;
                border: 0;
                width: 100px;
                margin: 0 auto;
                border-radius: 20px;
                color: #fff;
                padding: 5px 10px;
            }
            .active {
                background-color: $greenDark;
            }
        }
    }
</style>
