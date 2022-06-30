import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/Home.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../pages/About.vue"),
  },
  {
    path: "/order",
    name: "order",
    component: () => import("../pages/Order.vue"),
  },
  {
    path: "/products",
    name: "products",
    component: () => import("../pages/AllProducts.vue"),
  },
  {
    path: "/products/:id",
    component: () => import("../components/Product.vue"),
  },
  {
    path: "/face",
    name: "face",
    component: () => import("../pages/FaceProducts.vue"),
  },
  {
    path: "/lips",
    name: "lips",
    component: () => import("../pages/LipsProducts.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes,
});
