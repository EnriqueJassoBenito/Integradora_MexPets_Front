<template>
  <div>
    <div class="row">
      <b-navbar toggleable="lg" type="dark" variant="dark" class="navbar">
        <b-link :to="{ name: 'landing' }"
          ><img src="../../../components/icons/WhiteLogo.png" id="iconNavbar"
        /></b-link>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item
              :to="{ name: 'admin-users' }"
              @click="selectOption('admin-users')"
              :class="{ active: selectedOption === 'admin-users' }"
              >Usuarios</b-nav-item
            >
            <b-nav-item
              :to="{ name: 'categories' }"
              @click="selectOption('categories')"
              :class="{ active: selectedOption === 'categories' }"
              >Categorías</b-nav-item
            >
            <b-nav-item
              :to="{ name: 'logs-data' }"
              @click="selectOption('logs-data')"
              :class="{ active: selectedOption === 'logs-data' }"
              >Bitácora</b-nav-item
            >
            <b-nav-item
              :to="{ name: 'profile-admin' }"
              @click="selectOption('profile-admin')"
              :class="{ active: selectedOption === 'profile-admin' }"
              >{{ usuarioNombre }}</b-nav-item
            >
              <b-navbar-nav class="ml-auto">
                <b-nav-item @click="confirmLogout">Cerrar Sesión</b-nav-item>
              </b-navbar-nav>
            </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
import { logout } from "../../auth/Login.vue";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      usuarioNombre: "",
      selectedOption: null,
    };
  },
  created() {
    const userData = JSON.parse(localStorage.getItem("authUser"));
    if (userData && userData.user && userData.user.name && userData.user.lastname) {
    this.usuarioNombre = `${userData.user.name} ${userData.user.lastname}`;
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
