<<<<<<< HEAD
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
        component: () => import("../components/inicio.vue"),
    },
    {
        path: "/login",
        component: () => import("../components/auth/Login.vue"),
    },
    ,
    {
        path: '/',
        component:{
            render(c){
                return c('router-view');
            },
        },
        children: [
            {
                path:'/inicio',
                name: 'inicio',
                component: () => import('../components/Inicio.vue')
            },
            {
                path:'/animals',
                name: 'animals',
                component: () => import('../components/screens/RegistrarAnimales.vue')
            },
            {
                path:'/category',
                name: 'category',
                component: () => import('../components/screens/Categorias.vue')
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
                path:'/users',
                name: 'users',
                component: () => import('../components/screens/Usuario.vue')
            },
        ]
    }

]

const router = new VueRouter({ routes })
export default router;

=======
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
        component: () => import("../components/inicio.vue"),
    },
    {
        path: "/Login",
        component: () => import("../components/RegistroUser.vue"),
    },
    ,
    {
        path: "/inicio",
        component: () => import("../components/inicio.vue"),
        children: [
            {
                path: "/RegistroAnimales",
                name: "RegistroAnimales",
                component: () => import("../components/RegistroAnimales.vue")
            },
            {
                path: "/RegistroCategorias",
                name: "RegistroCategorias",
                component: () => import("../components/RegistroCategorias.vue")
            },
            {
                path: "/GestionAdmin",
                name: "GestionAdmin",
                component: () => import("../components/GestionAdmin.vue")
            },
            {
                path: "/SolicitudAdopcion",
                name: "SolicitudAdopcion",
                component: () => import("../components/SolicitudAdopcion.vue")
            },
            {
                path: "/CrearCuenta",
                name: "CrearCuenta",
                component: () => import("../components/CrearCuenta.vue")
            },
        ]
    },

]

const router = new VueRouter({ routes })
export default router;

>>>>>>> 62d95421bf37c3a84cd62b9c2f6df3fdb836c5a5
