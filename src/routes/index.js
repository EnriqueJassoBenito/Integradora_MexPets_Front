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
