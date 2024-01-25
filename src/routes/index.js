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

