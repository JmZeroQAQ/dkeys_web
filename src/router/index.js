import HomeView from "@/views/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    component: HomeView,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
