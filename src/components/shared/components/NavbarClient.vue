<template>
    <div class="row">
        <b-navbar toggleable="lg" type="dark" variant="dark" class="navbar">
            <b-link :to="{ name: 'landing' }"><img src="../../../components/icons/WhiteLogo.png"
                    id="iconNavbar"></b-link>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item :to="{ name: 'adopt' }">Home</b-nav-item>
                    <!--<b-nav-item :to="{ name: 'profile' }" @click="selectOption('profile')"
                        :class="{ 'active': selectedOption === 'profile' }">Perfil</b-nav-item>-->
                    <b-nav-item :to="{ name: 'register-animal' }" @click="selectOption('register-animal')"
                        :class="{ 'active': selectedOption === 'register-animal' }">Registrar Animal</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <b-row>
            <router-view />
        </b-row>
    </div>
</template>

<script>
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
