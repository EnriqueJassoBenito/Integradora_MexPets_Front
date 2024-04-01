import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: '*',
        component:()=> import("../views/ErrorPage/Error404.vue")
    },
    {
        path: '/',
        name: 'landing',
        component:()=> import("../components/LandingPage.vue"),
        
    },
    {
        path: '/navbar',
        name: 'navbar',
        component:()=> import("../components/Navbar.vue")
    },
    {
        path: '/adopt',
        name: 'adopt',
        component:()=> import("../components/Adopt.vue")
    },
    {
        path: '/adopter',
        name: 'adopter',
        component:()=> import("../components/Adopter.vue")
    },
    {
        path: '/aboutus',
        name: 'aboutus',
        component:()=> import("../components/AboutUs.vue")
    },
    {
        path: '/login',
        name: 'login',
        component:()=> import("../components/Login.vue")
    },
    {
        path: '/register',
        name: 'register',
        component:()=> import("../components/Register.vue")
    }
]

const router = new VueRouter({routes, })
export default router;