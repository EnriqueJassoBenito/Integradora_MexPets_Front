<<<<<<< HEAD
<!--<template>
<router-view></router-view>
</template>-->

<template>
    <div class="container-fluid">
        <!-- Comienza el navbar -->
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
    </div>
</template>

<script>
import Navbar from './components/navigation/Navbar.vue';

export default {
    components: {
        'navbar': Navbar,
    },
}
</script>

<style scoped></style>
=======
<script setup>
</script>

<template>
<router-view></router-view>
</template>

<style scoped>

</style>
>>>>>>> 62d95421bf37c3a84cd62b9c2f6df3fdb836c5a5
