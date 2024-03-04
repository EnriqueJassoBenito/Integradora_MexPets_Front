<template>
    <b-container fluid>
        <b-row>
            <navbar />
        </b-row>

        <b-row>
            <router-view></router-view>
        </b-row>

    </b-container>
    <!--<register/>-->
</template>

<script>
import Navbar from "./components/navigation/Navbar.vue"
import Login from "./components/auth/Login.vue"
import Register from "./components/auth/Register.vue";

export default {
    components: {
        'navbar': Navbar,
        'login': Login,
        'register': Register
    },
}
</script>

<style scoped></style>
