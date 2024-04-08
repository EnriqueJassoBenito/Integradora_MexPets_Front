<template>
    <b-container fluid>
        <b-row>
            <div class="menu">
                <b-navbar toggleable="lg" variant="with">
                    <img src="../components/icons/BrownLogo.png" id="iconNavbar">


                    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                    <b-collapse id="nav-collapse" is-nav>
                        <b-navbar-nav>
                            <b-nav-item class="mx-5" style="font-weight: bold;" :to="{ name: 'adopt' }">Adoptar</b-nav-item>
                            <b-nav-item class="mx-5" style="font-weight: bold;" :to="{ name: 'adopter' }">Dar en adopción</b-nav-item>
                            <b-nav-item class="mx-5" style="font-weight: bold;" :to="{ name: 'aboutus' }">Nosotros</b-nav-item>
                        </b-navbar-nav>
                        <b-navbar-nav>
                                <b-button variant="dark" class="my-2 mx-5" @click="Login">Iniciar Sesión</b-button>
                                <b-button variant="warning" class="my-2 mx-5" @click="Register">Registrarse</b-button>
                        </b-navbar-nav>
                    </b-collapse>
                </b-navbar>

            </div>
        </b-row>
        <b-row>
            <b-col cols-md="6">
                <h1 class="slogan">CONVIÉRTETE</h1>
                <h1 class="sloganVariant">EN EL MEJOR LÍDER</h1>
                <h1 class="slogan">DE TU PROPIA</h1>
                <h1 class="slogan">MANADA</h1>
                <b-button class="btnLanding" variant="dark" @click="Adopt">Adoptar</b-button>
            </b-col>
            <b-col cols-md="6">
                <div class="contentImgLanding">
                    <img class="imgLanding" src="/src/img/PetsLanding.png" alt="">
                </div>
            </b-col>
        </b-row>
        <Footer></Footer>
    </b-container>
</template>

<script>
import Footer from './Footer.vue'

export default {
    components: {
        Footer
    },
    methods: {
        Adopt() {
            this.$router.push('/adopt')
        },
        Adopter() {
            this.$router.push('/adopter')
        },
        AboutUs() {
            this.$router.push('/aboutus')
        },
        Login() {
            this.$router.push('/login')
        },
        Register() {
            this.$router.push('/register')
        }
    }
}
</script>


<style>

@font-face {
    font-family: Rammetto One;
    src: url('../fonts/RammettoOne-Regular.ttf');
}


.slogan {
    font-family: Rammetto One;
    font-size: 50px;
    color: #0066C5;
    margin-top: 7%;
    max-width: 100%;
    height: auto;

}

.sloganVariant {
    font-family: Rammetto One;
    font-size: 50px;
    color: #F0BB00;
    margin-top: 5%;
    max-width: 100%;
    height: auto;
}

.btnLanding {
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    width: 60%;
    height: 10%;
    margin-top: 7%;
}

.contentImgLanding {
    text-align: right;
}

.imgLanding {
    max-width: 100%;
    height: auto;
}

#iconNavbar {
    width: 80px;
    margin-top: 20px;
    margin-left: 50px;
    margin-right: 100px;
}

#menu {
    position: fixed;
    top: 0;
    width: 100%;
    color: #fff;
    padding: 10px;
    z-index: 1;
}
</style>