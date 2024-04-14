<template>
  <div>
<<<<<<< Updated upstream
    <div class="row">
    <b-navbar toggleable="lg" type="dark" variant="dark" >
      <b-link :to="{ name: 'landing' }"><img src="../../../components/icons/WhiteLogo.png" id="iconNavbar"></b-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'landing' }">Home</b-nav-item>
          <b-nav-item :to="{ name: 'adopt' }">Adoptar</b-nav-item>
          <b-nav-item :to="{ name: 'adopter' }">Dar en adopción</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar> 
    </div> 
<router-view />
</div>
=======
    <b-navbar>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-link :to="{ name: 'landing' }"><img src="../../../components/icons/WhiteLogo.png" id="iconNavbar"></b-link>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="{ name: 'landing' }">Home</b-nav-item>
            <b-nav-item :to="{ name: 'adopt' }">Adoptar</b-nav-item>
            <b-nav-item :to="{ name: 'adopter' }">Dar en adopción</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <b-row>
        <router-view />
      </b-row>
    </b-navbar>
  </div>  
  <div>
    <router-view />
  </div>
>>>>>>> Stashed changes
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
  align-items: center;
}
</style>