import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: '/agent',
    component: Layout,
    children: [
      {
        path: "agent",
        name: "Agent",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/Agent.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
