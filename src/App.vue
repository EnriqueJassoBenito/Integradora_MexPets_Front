<template>
    <!--<div class="container-fluid">
        <div class="row">
            <div class="col">
                <navbar />
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <router-view></router-view>
            </div>
        </div>
    </div>-->
    <login/>
</template>

<script>
import Navbar from "./components/navigation/Navbar.vue"
import Login from "./components/auth/Login.vue"

export default {
    components: {
        'navbar': Navbar,
        'login': Login,
    },
}
</script>

<style scoped></style>
