<template>
    <b-container fluid>
        <b-row>
            <b-col>
                <div>
                    <transition name="fade" mode="out-in">
                        <router-view></router-view>
                    </transition>
                    <!--<transition name="fade">
                        <div v-if="loading" class="overlay">
                            <spinner></spinner>
                        </div>
                    </transition>-->
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Spinner from './components/shared/plugins/Spinner.vue';

export default {
    components: {
        Spinner,
    },
    data() {
        return {
            loading: false,
        };
    },
    created() {
        const router = this.$router;
        router.beforeEach((to, from, next) => {
            this.loading = true;
            next();
        });

        router.afterEach(() => {
            this.loading = false;
        });
    },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>