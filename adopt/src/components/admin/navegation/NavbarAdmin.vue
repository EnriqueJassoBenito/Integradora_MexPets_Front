<template>
    <b-container  fluid style="margin: 0; padding: 0;">
  <b-navbar class="navbar" toggleable="md" type="dark">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-navbar-brand :to="{ path: '/' }">
          <img src="../../../assets/logomexx.png" alt="Logo" width="50" height="50" class="d-inline-block align-top">
          MexPets
      </b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="mx-auto">
              <b-nav-item :to="{ name: 'admin-home' }" @click="selectOption('admin-home')"
                  :class="{ 'active': selectedOption === 'admin-home' }">Inicio</b-nav-item>
              <b-nav-item :to="{ name: 'admin-moderators' }" @click="selectOption('admin-moderators')"
                  :class="{ 'active': selectedOption === 'admin-moderators' }">Moderadores</b-nav-item>
              <b-nav-item :to="{ name: 'admin-users' }" @click="selectOption('admin-users')"
                  :class="{ 'active': selectedOption === 'admin-users' }">Usuarios</b-nav-item>
              <b-nav-item :to="{ name: 'admin-profile' }" @click="selectOption('admin-profile')"
                  :class="{ 'active': selectedOption === 'admin-profile' }" >Mi cuenta</b-nav-item>
                  <b-nav-item :to="{ name: 'admin-profile' }" @click="selectOption('admin-profile')"
                  :class="{ 'active': selectedOption === 'admin-profile' }" >Mi cuenta</b-nav-item>
          </b-navbar-nav>
      </b-collapse>
     
  </b-navbar>
  <b-row>
      <router-view />
  </b-row>
</b-container>
</template>

<script>
export default {
  data() {
      return {
          selectedOption: null,
      };
  },
  methods: {
      selectOption(option) {
          this.selectedOption = option;
      },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #392915;
  padding-top: 10px;
  width: 100%;
}

.navbar-nav .nav-item.active {
  background-color: #F0BB00;
  border-radius: 10px 10px 0px 0px;
}
.navbar-nav .nav-item {
margin-right: 30px; 
}
#btn_adopt{
  align-items: right;
  margin-left: 1000px;
  margin-bottom: 10px;
}
#btn_dar{
  align-items: left;
}
</style>
