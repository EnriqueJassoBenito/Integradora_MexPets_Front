import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/landing",
  },
  {
    path: "/admin",
    component: () => import("../components/shared/components/NavbarAdmin.vue"),
    children: [
      {
        path: "",
        name: "admin-users",
        component: () => import("../components/admin/Users.vue"),
      },
      {
        path: "categories",
        name: "categories",
        component: () => import("../components/admin/Categories.vue"),
      },
      {
        path: "profile-admin",
        name: "profile-admin",
        component: () => import("../components/admin/ProfileAdmin.vue"),
      },
      {
        path: "logs-data",
        name: "logs-data",
        component: () => import("../components/admin/Logs.vue"),
      },
    ],
  },
  {
    path: "/client/",
    component: () => import("../components/shared/components/NavbarClient.vue"),
    children: [
      {
        path: "register-animal",
        name: "register-animal",
        component: () => import("../components/client/RegisterAnimal.vue"),
      },
    ],
  },
  {
    path: "/moderator",
    component: () =>
      import("../components/shared/components/NavbarModerator.vue"),
    children: [
      {
        path: "profile",
        name: "profile",
        component: () => import("../components/moderator/ModeratorProfile.vue"),
      },
      {
        path: "awaiting-requests",
        name: "awaiting-requests",
        component: () => import("../components/moderator/AwaitingRequests.vue"),
      },
      {
        path: "management",
        name: "management",
        component: () => import("../components/moderator/Management.vue"),
      },
    ],
  },
  {
    path: "/home",
    component: () =>
      import("../components/shared/components/Navbar.vue"),
    children: [
      {
        path: "/adopt",
        name: "adopt",
        component: () => import("../components/Adopt.vue"),
      },
      {
        path: "/adopter",
        name: "adopter",
        component: () => import("../components/Adopter.vue"),
      },
      {
        path: "/about-us",
        name: "about-us",
        component: () => import("../components/AboutUs.vue"),
      }
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
        component: () => import("../components/LandingPage.vue"),
      },
      {
        path: "/adopt",
        name: "adopt",
        component: () => import("../components/Adopt.vue"),
      },
      {
        path: "/adopter",
        name: "adopter",
        component: () => import("../components/Adopter.vue"),
      },
      {
        path: "/about-us",
        name: "about-us",
        component: () => import("../components/AboutUs.vue"),
      },
      {
        path: "/login",
        name: "login",
        component: () => import("../components/auth/Login.vue"),
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
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const user = JSON.parse(localStorage.getItem("authUser"));
  const userRole = user ? user.user.rol.nrol : null;

  if (requiresAuth && !user) {
    next({ name: "login" });
  } else if (requiresAuth && user) {
    const requiredRoles = to.meta.roles;
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      next({ name: "landing" });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
