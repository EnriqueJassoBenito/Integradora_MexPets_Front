<template>
  <div class="navbar">
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
      <b-link :to="{ name: 'landing' }"><img src="../components/icons/WhiteLogo.png" id="iconNavbar"></b-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-link :to="{ name: 'adopt' }">Home</b-link>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
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
  z-index: 1;
}
</style>