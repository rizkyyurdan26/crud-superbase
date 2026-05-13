import { createRouter, createWebHistory } from "vue-router";
import LoginRegister from "../views/LoginRegister.vue";
import HomePage from "../views/HomePage.vue";
import DetailProduct from "../views/DetailProduct.vue";
import CreateEdit from "../views/CreateEdit.vue";
import { useAuthStore } from "../stores/auth.store";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginRegister,
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "register",
    component: LoginRegister,
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
    component: DetailProduct,
    meta: { requiresAuth: true },
  },
  {
    path: "/create",
    name: "create",
    component: CreateEdit,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: CreateEdit,
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

  if (to.meta.requiresAuth && !token) {
    return "/login";
  }

  if ((to.path === "/login" || to.path === "/register") && token) {
    return "/";
  }

  if (to.meta.role === "admin" && !authStore.isAdmin) {
    alert("Forbidden, Admin Only");
    return "/";
  }

  return true;
});

export default router;
