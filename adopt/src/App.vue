<template>
    <b-container fluid>
        <b-row>
            <b-col>
                <navbar />
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <router-view></router-view>
            </b-col>
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
