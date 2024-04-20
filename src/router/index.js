import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/landing",
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: () => import('../components/auth/AccessDenied.vue'),
  },
  {
    path: "/admin",
    component: () => import("../components/shared/components/NavbarAdmin.vue"),
    meta: { requiresAuth: true, roles: ['ADMIN'] },
    children: [
      {
        path: "",
        name: "admin-users",
        component: () => import("../components/admin/Users.vue"),
        meta: { requiresAuth: true, roles: ['ADMIN'] },
      },
      {
        path: "categories",
        name: "categories",
        component: () => import("../components/admin/Categories.vue"),
        meta: { requiresAuth: true, roles: ['ADMIN'] },
      },
      {
        path: "profile-admin",
        name: "profile-admin",
        component: () => import("../components/admin/ProfileAdmin.vue"),
        meta: { requiresAuth: true, roles: ['ADMIN'] },
      },
      {
        path: "logs-data",
        name: "logs-data",
        component: () => import("../components/admin/Logs.vue"),
        meta: { requiresAuth: true, roles: ['ADMIN'] },
      },
    ],
  },  
  {
    path: "/client/",
    component: () => import("../components/shared/components/NavbarClient.vue"),
    children: [
      {
        path: "",
        name: "animals-adoption",
        component: () => import("../components/client/AnimalsAdopter.vue"),
      },
      {
        path: "register-animal",
        name: "register-animal",
        component: () => import("../components/client/RegisterAnimal.vue"),
      },
      {
        path: "profileClient",
        name: "profileClient",
        component: () => import("../components/client/ClientProfile.vue"),
        meta: { requiresAuth: true, roles: ['CLIENTE'] }, 
      },
      {
        path: "my-adoption",
        name: "my-adoption",
        component: () => import("../components/client/MyAdoptions.vue"),
        meta: { requiresAuth: true, roles: ['CLIENTE'] },
      },
      {
        path: "/lostAndFound",
        name: "lostAndFound",
        component: () => import("../components/public/lostAndFound.vue"),
      },
      {
        path: "/responsable",
        name: "responsable",
        component: () => import("../components/public/Responsable.vue"),
      },
      {
        path: "/about-us",
        name: "about-us",
        component: () => import("../components/public/AboutUs.vue"),
      }
    ],
  },  
  {
    path: "/moderator/",
    component: () => import("../components/shared/components/NavbarModerator.vue"),
    meta: { requiresAuth: true, roles: ['MODERADOR'] },
    children: [
      {
        path: "profile-moderator",
        name: "profile-moderator",
        component: () => import("../components/moderator/ModeratorProfile.vue"),
        meta: { requiresAuth: true, roles: ['MODERADOR'] },
      },
      {
        path: "registration-requests-standby",
        name: "registration-requests-standby",
        component: () => import("../components/moderator/RegistrationRequestsStandby.vue"),
        meta: { requiresAuth: true, roles: ['MODERADOR'] },
      },
      {
        path: "registration-requests-proccess",
        name: "registration-requests-proccess",
        component: () => import("../components/moderator/ResgistrationRequestsProcess.vue"),
        meta: { requiresAuth: true, roles: ['MODERADOR'] },
      },
      {
        path: "awaiting-requests",
        name: "awaiting-requests",
        component: () => import("../components/moderator/AwaitingRequests.vue"),
        meta: { requiresAuth: true, roles: ['MODERADOR'] },
      },
      {
        path: "adoption-requests-process",
        name: "adoption-requests-process",
        component: () => import("../components/moderator/AdoptionRequestsProcess.vue"),
        meta: { requiresAuth: true, roles: ['MODERADOR'] },
      },
      {
        path: "management-adoptions",
        name: "management-adoptions",
        component: () => import("../components/moderator/Management.vue"),
        meta: { requiresAuth: true, roles: ['MODERADOR'] },
      },
    ],
  },
  {
    path: "/",
    component: {
      render(c) {
        return c("router-view");
      },
    },
    
    children: [
      {
        path: "/landing",
        name: "landing",
        component: () => import("../components/public/LandingPage.vue"),
      },
      {
        path: "/login",
        name: "login",
        component: () => import("../components/auth/Login.vue"),
      },
      {
        path: '/forgot-password',
        name: 'forgot-password',
        component: () => import("../components/auth/EmailForm.vue")
      },      
      {
        path: '/auth/changePassword',
        name: 'auth/changePassword',
        component: () => import("../components/auth/ChangePassword.vue")
      },      
      {
        path: "/register",
        name: "register",
        component: () => import("../components/auth/Register.vue"),
      },
      {
        path: "*",
        component: () => import("../components/shared/plugins/Error404.vue"),
      },
    ],
  },
];

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
  const requiereAutenticacion = to.matched.some(registro => registro.meta.requiresAuth);
  const usuarioAlmacenado = localStorage.getItem("authUser");
  let usuario = null;

  try {
    usuario = usuarioAlmacenado ? JSON.parse(usuarioAlmacenado) : null;
  } catch (error) {
    console.error("Error al analizar los datos del usuario almacenado:", error);
  }

  if (requiereAutenticacion && !usuario) {
    next({ name: "unauthorized" });
    return;
  }

  if (requiereAutenticacion && usuario) {
    const rolUsuario = usuario.user.rol.nrol;
    const rolesRequeridos = to.meta.roles || [];

    console.log(`Rol del Usuario: ${rolUsuario}`);
    console.log(`Roles Requeridos para la ruta: ${rolesRequeridos.length > 0 ? rolesRequeridos.join(", ") : "Ninguno"}`);

    if (rolesRequeridos.length > 0 && !rolesRequeridos.includes(rolUsuario)) {
      next({ name: "unauthorized" });
      return;
    }
  }

  next();
});



export default router;
