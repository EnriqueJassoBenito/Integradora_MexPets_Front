<template>
  <div>
    <div class="row">
      <b-navbar toggleable="lg" type="dark" class="navbar custom-navbar-color">
        <b-link :to="{ name: 'landing' }"
          ><img src="../../../components/icons/WhiteLogo.png" id="iconNavbar"
        /></b-link>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item
              :to="{ name: 'animals-adoption' }"
              @click="selectOption('animals-adoption')"
              >Adoptar</b-nav-item
            >
            <b-nav-item
              :to="{ name: 'register-animal' }"
              @click="selectOption('register-animal')"
              >Dar en adopción</b-nav-item
            >
            <b-nav-item
            v-if="isLoggedIn && isCliente"
              :to="{ name: 'my-adoption' }"
              @click="selectOption('my-adoption')"
              >Mis registros</b-nav-item
            >
            <b-nav-item-dropdown :to="{ name: '' }" text="Recomendaciones" right>
                <b-dropdown-item :to="{ name: 'responsable' }"
              @click="selectOption('responsable')">¿En qué consiste adoptar?</b-dropdown-item>
        <b-dropdown-item :to="{ name: 'lostAndFound' }"
              @click="selectOption('lostAndFound')">Perdidos y encontrados</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item :to="{ name: 'about-us' }">Nosotros</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item
            v-if="isLoggedIn && isCliente"
              :to="{ name: 'profileClient' }"
              @click="selectOption('profileClient')"
              >
              {{ usuarioNombre }}</b-nav-item
            >
            <b-nav-item v-if="isLoggedIn && isCliente" @click="confirmLogout"><b-icon icon="power" aria-hidden="true"></b-icon>Cerrar Sesión</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
import { logout } from "../../auth/Login.vue";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      mostrarModal: false,
      mostrarModalInformacion: false,
      usuarioEditado: { nombre: "", email: "" },
      usuarioEditadoIndex: null,
      usuarioSeleccionado: { nombre: "", email: "" },
      selectedOption: null,
      usuarioNombre: "",
      isCliente: false
    };
  },
  created() {
  const userData = JSON.parse(localStorage.getItem("authUser"));
  if (userData && userData.user && userData.user.name && userData.user.lastname) {
    this.usuarioNombre = `${userData.user.name} ${userData.user.lastname}`;
  }
  if (userData && userData.user && userData.user.rol && userData.user.rol.nrol === "CLIENTE") {
      this.isCliente = true;
    }
},
  computed: {
    isLoggedIn() {
      return localStorage.getItem("authToken") !== null;
    }
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
    },
    confirmLogout() {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas cerrar sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#81B622",
        cancelButtonColor: "#DC3545",
        confirmButtonText: "Sí, cerrar sesión",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.logout();
        }
      });
    },
    logout() {
      Swal.fire({
        title: "Cerrando Sesión",
        icon: "info",
        timer: 1500,
        showConfirmButton: false,
      });
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      logout.bind(this)();
    },
  },
};
</script>

<style scoped>
.custom-navbar-color {
  background-color: rgb(81, 61, 109);
}

#iconNavbar {
  width: 40px;
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
