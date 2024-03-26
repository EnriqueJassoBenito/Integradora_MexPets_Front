<template>
    <b-container  fluid style="margin: 0; padding: 0;">
      <b-navbar class="navbar" toggleable="md" type="dark">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-navbar-brand :to="{ path: '/' }">
            <img src="../../assets/logomexx.png" alt="Logo" width="50" height="50" class="d-inline-block align-top">
            MexPets
        </b-navbar-brand>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-md-auto">
                    <b-nav-item-dropdown
      id="my-nav-dropdown"
      text="Acerca de"
      toggle-class="nav-link-custom"
      right
    >
    <b-dropdown-item @click="scrollToBottom">Misión</b-dropdown-item>
    <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item :to="{ name: 'nosotros' }" @click="selectOption('nosotros')"
                    :class="{ 'active': selectedOption === 'nosotros' }">Nosotros</b-dropdown-item>
    </b-nav-item-dropdown>
                <b-nav-item :to="{ name: 'tips' }" @click="selectOption('tips')"
                    :class="{ 'active': selectedOption === 'tips' }"><b-icon icon="star-fill" animation="spin" font-scale="1"></b-icon> Tips</b-nav-item>
                <b-nav-item :to="{ name: 'login' }" @click="selectOption('login')"
                    :class="{ 'active': selectedOption === 'login' }"><b-icon icon="person-circle"></b-icon>  Mi cuenta</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    <b-row>
        <router-view/>
    </b-row>
    </b-container>
</template>

<script>
export default {
  methods: {
    scrollToBottom() {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }
}
</script>

<style>
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
  margin-right: 50px; 

}
@media (min-width: 768px) {
    .ml-md-auto {
        margin-left: auto !important;
    }
}
</style>