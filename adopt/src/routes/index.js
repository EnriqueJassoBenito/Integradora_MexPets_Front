import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "*",
        component: () => import("../views/ErrorPages/Error404.vue"),
    },
    {
        path: '/changePassword',
        name: 'changePassword',
        component: () => import('../components/auth/ChangePassword.vue')
    },
    {
        path: '/',
        component: () => import('../components/navigation/NavbarMain.vue'),
        children: [
            {
                path: '',
                name: 'landingPage',
                component: () => import('../components/LandingPage.vue')
            },
            {
                path: "/login",
                name: "login",
                component: () => import("../components/auth/Login.vue"),
            },
            {
                path: '/register',
                name: 'register',
                component: () => import('../components/auth/Register.vue')
            },
        ]
    },
    {
        path: '/inicio',
        component: () => import('../components/navigation/Navbar.vue'),
        children: [
            {
                path: 'home-inicio',
                name: 'home',
                component: () => import('../components/Home.vue')
            },

            {
                path: '/animals',
                name: 'animals',
                component: () => import('../components/screens/RegistrarAnimales.vue')
            },
            {
                path: '/category',
                name: 'category',
                component: () => import('../components/screens/Category.vue')
            },
            {
                path: '/tips',
                name: 'tips',
                component: () => import('../components/screens/Tips.vue')
            },
            {
                path: '/adoption',
                name: 'adoption',
                component: () => import('../components/screens/Adopciones.vue')
            },
            {
                path: '/profile',
                name: 'profile',
                component: () => import('../components/screens/Profile.vue')
            },
            {
                path: '/nosotros',
                name: 'nosotros',
                component: () => import('../components/screens/Nosotros.vue')
            },

        ],

        
    },
    {
        path: '/admin',
        component: () => import('../components/admin/navegation/NavbarAdmin.vue'),
        children: [
            {
                path: 'admin-home',
                name: 'admin-home',
                component: () => import('../components/Home.vue')
            },
            {
                path: 'admin-moderators',
                name: 'admin-moderators',
                component: () => import('../components/admin/screens/Moderators.vue')
            },
            {
                path: 'admin-users',
                name: 'admin-users',
                component: () => import('../components/admin/screens/Users.vue')
            },
            {
                path: 'admin-profile',
                name: 'admin-profile',
                component: () => import('../components/screens/Profile.vue')
            },
        ]
    },

]

const router = new VueRouter({ routes, })
export default router;
