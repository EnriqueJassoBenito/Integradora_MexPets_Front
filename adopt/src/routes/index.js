import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "*",
        component: () => import("../views/ErrorPages/Error404.vue"),
    },
    {
        path: "/",
        component: () => import("../components/auth/Login.vue"),
    },
    {
        path:'/register',
        name: 'register',
        component: () => import('../components/auth/Register.vue')
    },
    {
        path:'/changePassword',
        name: 'changePassword',
        component: () => import('../components/auth/ChangePassword.vue')
    },
    
    {
        path: '/inicio',
        component: () => import('../components/navigation/Navbar.vue'), 
        children: [
            {
                path:'/home',
                name: 'home',
                component: () => import('../components/Home.vue')
            },
            {
                path:'/landingPage',
                name: 'landingPage',
                component: () => import('../components/LandingPage.vue')
            },
            {
                path:'/animals',
                name: 'animals',
                component: () => import('../components/screens/RegistrarAnimales.vue')
            },
            {
                path:'/category',
                name: 'category',
                component: () => import('../components/screens/Category.vue')
            },
            {
                path:'/tips',
                name: 'tips',
                component: () => import('../components/screens/Tips.vue')
            },
            {
                path:'/adoption',
                name: 'adoption',
                component: () => import('../components/screens/Adopciones.vue')
            },
            {
                path:'/profile',
                name: 'profile',
                component: () => import('../components/screens/Profile.vue')
            },
        ]
    }
]

const router = new VueRouter({routes, })
export default router;
