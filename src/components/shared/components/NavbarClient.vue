<template>
    <div class="row">
        <b-navbar toggleable="lg" type="dark" variant="dark" class="navbar">
            <b-link :to="{ name: 'home' }"><img src="../../../components/icons/WhiteLogo.png" id="iconNavbar"></b-link>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item :to="{ name: 'home' }" @click="selectOption('home')">Home</b-nav-item>
                    <b-nav-item :to="{ name: 'home' }" @click="selectOption('home')">Adoptar</b-nav-item>
                    <b-nav-item :to="{ name: 'register-animal' }" @click="selectOption('register-animal')">Dar en adopción</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item @click="logout">Cerrar Sesión</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <router-view></router-view>
    </div>
</template>

<script>
import axios from 'axios';
import { logout } from '../../auth/Login.vue';
export default {
    data() {
        return {
            listaUsuarios: [],
            mostrarModal: false,
            mostrarModalInformacion: false,
            usuarioEditado: { nombre: '', email: '' },
            usuarioEditadoIndex: null,
            usuarioSeleccionado: { nombre: '', email: '' },
            selectedOption: null
        };
    },
    created() {
        const url = 'http://localhost:8080/api/user/';
        axios.get(url)
            .then(response => {
                this.listaUsuarios = response.data;
                console.log('Datos de usuarios:', this.listaUsuarios);
            })
            .catch(error => {
                console.error('Error al obtener los datos de usuarios:', error);
            });
    },
    methods: {
        selectOption(option) {
            this.selectedOption = option;
        },
        logout() {
            logout.bind(this)();
        }
    }
}
</script>

<style scoped>
#iconNavbar {
    width: 60px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 50px;
}

.navbar {
    top: 0;
    width: 100%;
    padding-top: 10px;
    z-index: 1000;
}

body,
html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}
</style>
