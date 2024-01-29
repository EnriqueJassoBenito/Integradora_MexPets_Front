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
