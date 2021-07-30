import Vue from "vue";
import VueRouter from "vue-router";
import DefaultLayout from "@/layout/DefaultLayout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    redirect: "home",
    children: [
      {
        name: "Home",
        path: "home",
        component: () => import("../views/Home.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
