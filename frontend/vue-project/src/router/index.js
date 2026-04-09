import { createRouter, createWebHistory } from "vue-router";
import LoginRegister from "../views/LoginRegister.vue";

const routes = [
  { path: "/", component: LoginRegister },
  {
    path: "/admin",
    component: () => import("../views/Admin.vue"),
    meta: { requiresAuth: true, isAdmin: true },
  },
  {
    path: "/bruger",
    component: () => import("../views/User.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/quiz",
    component: () => import("../views/TestQuizview.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth || to.meta.isAdmin) {
    try {
      const res = await fetch("http://localhost:3000/api/me", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      const user = await res.json();

      if (to.meta.isAdmin && user.role !== "admin") {
        return "/bruger";
      }

      return true;
    } catch {
      return "/";
    }
  }

  return true;
});

export default router;
