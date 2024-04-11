<template>
  <div>
  <div class="navbar">
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top" style="z-index: 1;">
      <b-link :to="{ name: 'landing' }"><img src="../components/icons/WhiteLogo.png" id="iconNavbar"></b-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'landing' }">Home</b-nav-item>
          <b-nav-item :to="{ name: 'adoption' }">Adoptar</b-nav-item>
          <b-nav-item :to="{ name: 'adopter' }">Dar en adopción</b-nav-item>
          <b-nav-item :to="{ name: 'categories' }">Categorías</b-nav-item>
          <b-nav-item :to="{ name: 'recomendation' }">Recomendaciones</b-nav-item>
          <b-nav-item :to="{ name: 'profile' }">Perfil</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-row>
            <router-view />
        </b-row>
  </div>

</div>
</template>

<script>
export default {
  name: 'Navbar',
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

#navbar {
  position: fixed;
  top: 0;
  width: 100%;
  color: #fff;
  padding: 10px;
}
</style>