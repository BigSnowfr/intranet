<template>
    <div class="informations liste-info">
        <h2 class="section-title">Informations</h2>
        <block
                :id=1
                :titre="'Certficat de scolarité'"
                :image="'file.svg'"
                :content="`
                    <ul>
                        <li>Se rendre sur l'<a href='http://ebureau.univ-reims.fr/uPortal/render.userLayoutRootNode.target.u19l1n8.uP?pltc_target=97_u19l1n8_8161.u19l1n8&pltc_type_97_u19l1n8_8161.u19l1n8=RENDER&pltp_97_u19l1n8_8161.u19l1n8_org.apache.myfaces.portlet.MyFacesGenericPortlet.VIEW_ID=%2Fstylesheets%2Fetu%2Finscriptions.xhtml' target='_blank' >ebureau</a> de l'URCA</li>
                        <li>Survoler sur l'onglet <strong>Scolarité</strong></li>
                        <li>Cliquer sur le lien <strong>'Mon Dossier'</strong></li>
                        <li>Cliquer sur <strong>Inscriptions</strong></li>
                        <li>Télécharger le certificat de l'année qui vous intéresse</li>
                    </ul>
                `"
        ></block>
        <block
                :id=2
                :titre="'Connexion Wifi EDUROAM'"
                :image="'wifi.svg'"
                :content="`
                    <ul>
                        <li>Sécurité WPA/WPA2 d'entreprise</li>
                        <li>TLS Tunnel (TTLS)</li>
                        <li><strong>Identité anonyme</strong>: anonymous@etudiant.univ-reims.fr</li>
                        <li><strong>Authentification interne</strong>: PAP</li>
                        <li><strong>Utilisateur</strong>: Pseudo URCA</li>
                        <li><strong>Mot de passe</strong> : MDP URCA</li>
                    </ul>
                `"
        ></block>
        <block
                :id=3
                :titre="'Github Student Pack'"
                :image="'github.svg'"
                :content="`
                    <p>Github a mis en place un site regroupant de nombreuses ressources gratuites ou à prix réduit afin de vous proposer                       des outils de qualités. N'hésitez pas à jeter un coup d'oeil !</p>
                    <ul>
                        <li><a href='https://education.github.com/pack' target='_blank'>Profitez des offres</a></li>
                    </ul>
                `"
        ></block>
        <block
                :id=4
                :titre="'Microsoft Pack Office'"
                :image="'windows.svg'"
                :content="`
                    <p>L'education nationale a mis en place un partenariat avec Microsoft afin que vous puissiez profitre de la suite Office gratuitement, et ce jusqu'à 5 appareils !<br>Afin d'en profitez, cliquez sur le lien et entrez votre adresse URCA.</p>
                    <ul>
                        <li><a href='https://www.microsoft.com/fr-fr/education/students/default.aspx' target='_blank'>Profitez du pack</a></li>
                    </ul>
                `"
        ></block>
        <block
                :id=5
                :titre="'Récupérer ses mails URCA'"
                :image="'mail.svg'"
                :content="`
                    <p>
                        Voici une astuce bien pratique pour récupérer vos emails URCA sur l'application mail de votre téléphone.
                    </p>
                    <ul>
                        <li>Cliquer sur <strong>Ajouter un compte</strong></li>
                        <li>Séléctionner <strong>Autre</strong> parmis les messageries proposées</li>
                        <li>Entrer votre email URCA</li>
                        <li>Séléctionner IMAP</li>
                        <li>Entrer votre mot de passe</li>
                        <li>Modifier le <strong>Nom d'utilisateur</strong> par votre pseudo URCA</li>
                        <li>Modifier le <strong>serveur entrant</strong> par <strong>imaps.univ-reims.fr</strong></li>
                        <li>Modifier le <strong>Port</strong> par 993</li>
                        <li>Modifier le <strong>Type de sécurité</strong> par SSL/TLS</li>
                        <li>Pour le <strong>serveur sortant</strong>, modifier le <strong>nom d'utilisateur</strong></li>
                        <li>Modifier le <strong>Serveur SMTP</strong> par <strong>smtps.univ-reims.fr</strong></li><br>
                        <li>Valider les dernières étapes, vos mails URCA sont maintenant accessibles sur votre application !</li>
                    </ul>
                `"
        ></block>
    </div>
</template>

<script>
    import {HTTP} from '../../api'
    import store from '../../store/index'
    import block from './block.vue'
    import {mapGetters} from 'vuex'
    export default {
        name: 'Informations',
        store,
        components: {
            block
        },
        watch: {
            '$route': 'toggleMenu'
        },
        mounted () {
            window.scroll(0,0);
        }
    }
</script>

<style lang="scss">
    $green: #27B07C;
    $blue: #146F88;
    $blueDark: #57709c;

    .section-title {
        text-align: center;
        font-size: 1.5em;
        color: $blue;
        margin-bottom: 15px;
    }
    @media screen and (max-width: 300px) {
        .section-title {
            margin-top: 0;
        }
    }
</style>
