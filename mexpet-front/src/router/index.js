import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/landing'
    },
    {
        path: '/admin',
        component: () => import('../components/admin/navegation/NavbarAdmin.vue'),
        children: [
            {
                path: 'admin-users',
                name: 'admin-users',
                component: () => import('../components/admin/screens/Users.vue')
            },
            {
                path: 'admin-categories',
                name: 'admin-categories',
                component: () => import('../components/admin/screens/Categories.vue')
            },
        ]
    },     
    {
        path: '/',
        component:{
            render(c){
                return c('router-view');
            },
        },
        children:[
            {
                path: '/landing',
                name: 'landing',
                component:()=> import("../components/LandingPage.vue"),
                
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
                component:()=> import("../components/auth/Login.vue")
            },
            {
                path: '/register',
                name: 'register',
                component:()=> import("../components/auth/Register.vue")
            },
            {
                path: '*',
                component:()=> import("../components/shared/plugins/Error404.vue")
            },
        ]
    },
   
]

const router = new VueRouter({routes, })
export default router;