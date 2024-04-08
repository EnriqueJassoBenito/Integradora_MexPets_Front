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
        component: () => import('../components/shared/components/NavbarAdmin.vue'),
        children: [
            {
                path: 'admin-users',
                name: 'admin-users',
                component: () => import('../components/admin/screens/Users.vue')
            },
            {
                path: 'categories',
                name: 'categories',
                component: () => import('../components/admin/screens/Categories.vue')
            },
        ]
    }, 
    {
        path: '/moderator',
        component: () => import('../components/shared/components/NavbarModerator.vue'),
        children: [
            {
                path: 'profile',
                name: 'profile',
                component: () => import('../components/moderator/ModeratorProfile.vue')
            },
            {
                path: 'awaiting-requests',
                name: 'awaiting-requests',
                component: () => import('../components/moderator/AwaitingRequests.vue')
            },
            {
                path: 'management',
                name: 'management',
                component: () => import('../components/moderator/Management.vue')
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
                path: '/about-us',
                name: 'about-us',
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