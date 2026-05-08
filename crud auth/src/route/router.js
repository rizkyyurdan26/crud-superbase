import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import ProductDetail from '../views/ProductDetail.vue'
import CreatePage from '../views/CreatePage.vue'

const routes = [
  {
    path:'/',
    name: 'home',
    component: HomePage
  },
  {
    path:'/product/:id',
    name: 'product-detail',
    component: ProductDetail
  },
  {
    path:'/create',
    name: 'create',
    component: CreatePage
  },
  {
    path:'/update/:id',
    name: 'update',
    component: CreatePage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
