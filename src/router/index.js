import { createRouter, createWebHistory } from "vue-router";
import AboutView from "../views/AboutView.vue";
import GameView from "../views/GameView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "about",
      component: AboutView,
    },
    {
      path: "/snake",
      name: "snake",
      component: GameView,
    },
  ],
});

export default router;
