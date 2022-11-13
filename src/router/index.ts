import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "@/views/Home/index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/select",
    name: "select",
    component: () =>
      import(/* webpackChunkName: "select" */ "@/views/Select/index.vue"),
  },
  {
    path: "/detail",
    name: "detail",
    component: () =>
      import(/* webpackChunkName: "detail" */ "@/views/Detail/index.vue"),
  },
  {
    path: "/submit",
    name: "submit",
    component: () =>
      import(/* webpackChunkName: "submit" */ "@/views/Submit/index.vue"),
  },
  {
    path: "/record",
    name: "record",
    component: () =>
      import(/* webpackChunkName: "record" */ "@/views/Record/index.vue"),
  },
  {
    path: "/record-detail",
    name: "record-detail",
    component: () =>
      import(
        /* webpackChunkName: "record-detail" */ "@/views/RecordDetail/index.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
