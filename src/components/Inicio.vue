<template>
    <b-container fluid>

<b-row>
    <div class="container-fluid p-0">
        <img src="../assets/pat.jpeg" alt="Cat Image" class="img-fluid w-100">
      
  <b-col>
    <b-navbar  type="dark" variant="dark">
        <b-navbar-brand href="#">
      <img src="../assets/dd.png" class="d-inline-block align-top" alt="Kitten" style="width:60px;height:60px;">AdoPets
    </b-navbar-brand>
      <b-navbar-toggle target="navbar-nav"></b-navbar-toggle>

      <b-collapse id="navbar-nav" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{ name: 'RegistroAnimales' }">Animales</b-nav-item>
          <b-nav-item :to="{ name: 'RegistroCategorias' }">Categorías</b-nav-item>
          <b-nav-item :to="{ name: 'SolicitudAdopcion' }">Adopción</b-nav-item>
          
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" >
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content >
            <em right>User</em>
          </template>
          <b-dropdown-item :to="{ name: 'CrearCuenta' }">Crear cuenta</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'GestionAdmin' }">Admin</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </b-col>
</div>
</b-row>

<b-row>

  <b-col>
    <router-view></router-view>
  </b-col>
</b-row>
</b-container>
</template>

<script>
export default {

}
</script>

<style>

</style>