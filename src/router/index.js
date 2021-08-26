import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];
const createWorkshopRouter = (newRoutes) => {
  const allRoutes = [...routes, ...newRoutes];
  const history = createWebHistory(process.env.BASE_URL);
  const router = createRouter({
    history,
    routes: allRoutes,
  });
  return { router, history };
};

export { createWorkshopRouter };
