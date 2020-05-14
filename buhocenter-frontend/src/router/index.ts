import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Layout from '../views/Layout.vue';
import Auth from '../views/Auth.vue';
import Home from '../views/Home.vue';
import Catalogue from '../modules/products/catalogue/Catalogue.vue';
import Register from '../views/Register.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    redirect: "/home",
    component: Layout,
    children: [
      {
        path: "/home",
        name: "home",
        component: Home,
      },
      {
        path: "/sign-in",
        name: "Sign in",
        component: Auth,
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
      },
      {
        path: '/products',
        name: 'products',
        component: Catalogue,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
