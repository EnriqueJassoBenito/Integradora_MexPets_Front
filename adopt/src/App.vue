<template>
    <b-container fluid>
        <b-row>
            <router-view></router-view>
        </b-row>

    </b-container>
    <!--<register/>-->
</template>

<script>
import Login from "./components/auth/Login.vue"
import Register from "./components/auth/Register.vue";
export default {
    components: {
        'login': Login,
        'register': Register
    },
}
</script>

<style scoped></style>
