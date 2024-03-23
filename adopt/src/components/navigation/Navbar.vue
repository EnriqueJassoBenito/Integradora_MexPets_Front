<template>
      <b-container  fluid style="margin: 0; padding: 0;">

    <b-navbar class="navbar" toggleable="md" type="dark">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-navbar-brand href="#">
            <img src="../../assets/logomexx.png" alt="Logo" width="50" height="50" class="d-inline-block align-top">
            MexPets
        </b-navbar-brand>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="mx-auto">
                <b-nav-item :to="{ name: 'home' }" @click="selectOption('home')"
                    :class="{ 'active': selectedOption === 'home' }">Nosotros</b-nav-item>
                <b-nav-item :to="{ name: 'animals' }" @click="selectOption('animals')"
                    :class="{ 'active': selectedOption === 'animals' }">Mascotas</b-nav-item>
                <b-nav-item :to="{ name: 'category' }" @click="selectOption('category')"
                    :class="{ 'active': selectedOption === 'category' }">Categorías</b-nav-item>
                <b-nav-item :to="{ name: 'tips' }" @click="selectOption('tips')"
                    :class="{ 'active': selectedOption === 'tips' }">Tips</b-nav-item>
                <b-nav-item :to="{ name: 'adoption' }" @click="selectOption('adoption')"
                    :class="{ 'active': selectedOption === 'adoption' }">Adopción</b-nav-item>
                <b-nav-item :to="{ name: 'profile' }" @click="selectOption('profile')"
                    :class="{ 'active': selectedOption === 'profile' }">Perfil</b-nav-item>
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
#btn_adopt{
    align-items: right;
    margin-left: 1000px;
    margin-bottom: 10px;
}
#btn_dar{
    align-items: left;
}
</style>
