import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import CreatePage from "../views/CreatePage.vue";
import HomePage from "../views/HomePage.vue";
import ProductDetail from "../views/ProductDetail.vue";


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
    component: CreatePage,
    
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: CreatePage,
    
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
