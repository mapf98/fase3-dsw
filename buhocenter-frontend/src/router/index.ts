import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Layout from '../views/Layout.vue';
import Auth from '../views/Auth.vue';
import Home from '../views/Home.vue';
import Catalogue from '../modules/products/catalogue/Catalogue.vue';
import ItemDetail from '../modules/products/item-detail/ItemDetail.vue';
import Register from '../views/Register.vue';
import Profile from '../modules/users/profile/Profile.vue';

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
        path: "/profile",
        name: "profile",
        component: Profile,
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
      {
        path: '/item-detail',
        name: 'item-detail',
        component: ItemDetail,
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
