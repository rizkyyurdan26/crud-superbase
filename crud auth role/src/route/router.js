import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../view/HomePage.vue";
import ProductDetail from "../view/ProductDetail.vue";
import Create from "../view/Create.vue";
import LogRes from "../view/LogRes.vue";
import { useAuthStore } from "../stores/auth.store";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LogRes,
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "register",
    component: LogRes,
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    name: "home",
    component: HomePage,
    meta: { requiresAuth: false },
  },
  {
    path: "/product/:id",
    name: "product-detail",
    component: ProductDetail,
    meta: { requiresAuth: true },
  },
  {
    path: "/create",
    name: "create",
    component: Create,
    meta: { requiresAuth: true },
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: Create,
    meta: { requiresAuth: true, role: "admin" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  const authStore = useAuthStore();
  const token = localStorage.getItem("access_token");

  const userRole = authStore.user?.user_metadata?.role;

  if (to.meta.requiresAuth && !token) {
    return "/login";
  }
  if (to.path === "/login" && to.path === "register" && token) {
    return "/";
  }

  if (to.meta.role === "admin" && userRole !== "admin") {
    alert("Page for admin Only");
    return "/";
  }

  return true;
});

export default router;
