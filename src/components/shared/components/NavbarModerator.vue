<template>
    <div class="row">
        <b-navbar toggleable="lg" type="dark" variant="dark" class="navbar">
            <b-link :to="{ name: 'landing' }"><img src="../../../components/icons/WhiteLogo.png"
                    id="iconNavbar"></b-link>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <!--<b-nav-item :to="{ name: 'adopt' }">Home</b-nav-item>-->
                    <b-nav-item :to="{ name: 'profile-moderator' }" @click="selectOption('profile-moderator')"
                        :class="{ 'active': selectedOption === 'profile-moderator' }">Perfil</b-nav-item>
                    

                    <b-nav-item-dropdown text="Solicitudes de registro" toggle-class="nav-link-custom" right>
                        <b-dropdown-item :to="{ name: 'registration-requests-standby' }"
                            @click="selectOption('registration-requests-standby')">
                            En espera
                        </b-dropdown-item>
                        <b-dropdown-item :to="{ name: 'registration-requests-proccess' }"
                            @click="selectOption('registration-requests-proccess')">
                            En proceso
                        </b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown text="Solicitudes de adopción" toggle-class="nav-link-custom" right>
                        <b-dropdown-item :to="{ name: 'awaiting-requests' }" @click="selectOption('awaiting-requests')">
                            En espera
                        </b-dropdown-item>
                        <b-dropdown-item :to="{ name: 'adoption-requests-process' }"
                            @click="selectOption('adoption-requests-process')">
                            En proceso
                        </b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item :to="{ name: 'management-adoptions' }" @click="selectOption('management-adoptions')"
                        :class="{ 'active': selectedOption === 'management-adoptions' }">Mis gestiones</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item @click="confirmLogout">Cerrar Sesión</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <router-view></router-view>
    </div>
</template>

<script>
import { logout } from '../../auth/Login.vue';
import Swal from 'sweetalert2';
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
    methods: {
        confirmLogout() {
            Swal.fire({
                title: '¿Estás seguro?',
                text: '¿Deseas cerrar sesión?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#81B622',
                cancelButtonColor: '#DC3545',
                confirmButtonText: 'Sí, cerrar sesión',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.logout();
                }
            });
        },
        logout() {
            Swal.fire({
                title: 'Cerrando Sesión',
                icon: 'info',
                timer: 1500,
                showConfirmButton: false
            });
            logout.bind(this)();
        }
    }
}

</script>
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
