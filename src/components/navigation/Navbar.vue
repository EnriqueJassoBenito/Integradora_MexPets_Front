<template>
        <nav class="navbar navbar-expand-lg navbar-dark bg-purple">
            <!-- Logo en el lado izquierdo -->
            <a class="navbar-brand" href="#">
                <img src="../../assets/dd.png" alt="Logo" width="30" height="30" class="d-inline-block align-top">
                Adoptes
            </a>
            <!-- Opciones del Navbar -->
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <b-nav-item :to="{ name: 'login' }" @click="selectOption('login')" :class="{ 'active': selectedOption === 'login' }">Login</b-nav-item>
                    <b-nav-item :to="{ name: 'inicio' }" @click="selectOption('inicio')" :class="{ 'active': selectedOption === 'inicio' }">Nosotros</b-nav-item>
                    <b-nav-item :to="{ name: 'animals' }" @click="selectOption('animals')" :class="{ 'active': selectedOption === 'animals' }">Animales</b-nav-item>
                    <b-nav-item :to="{ name: 'category' }" @click="selectOption('category')" :class="{ 'active': selectedOption === 'category' }">Categorías</b-nav-item>
                    <b-nav-item :to="{ name: 'tips' }" @click="selectOption('tips')" :class="{ 'active': selectedOption === 'tips' }">Tips</b-nav-item>
                    <b-nav-item :to="{ name: 'adoption' }" @click="selectOption('adoption')" :class="{ 'active': selectedOption === 'adoption' }">Adopción</b-nav-item>
                    <b-nav-item :to="{ name: 'users' }" @click="selectOption('users')" :class="{ 'active': selectedOption === 'users' }">Categorías</b-nav-item>
                </ul>
            </div>
        </nav>
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
    background-color: #A95CA1;
    padding-top: 10px;
}

.navbar-nav .nav-item.active {
    background-color: #C49BDC; /* Color rosa */
    border-radius: 10px 10px 0px 0px; /* Borde redondo */
}
</style>
