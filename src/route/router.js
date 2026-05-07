import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../view/HomePage.vue";
import ProductDetail from "../view/ProductDetail.vue";
import Create from "../view/Create.vue";


const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/product/:id",
    name: "product-detail",
    component: ProductDetail,
  },
  {
    path: "/create",
    name: "create",
    component: Create,
  },
  {
    path: "/edit",
    name: "edit",
    component: Create,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
