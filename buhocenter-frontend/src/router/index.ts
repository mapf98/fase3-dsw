import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Layout from '../views/Layout.vue';
import Auth from '../views/Auth.vue';
import Home from '../views/Home.vue';
import Catalogue from '../modules/products/catalogue/Catalogue.vue';
import ItemDetail from '../modules/products/item-detail/ItemDetail.vue';
import Register from '../views/Register.vue';
import PersonalInformation from '../modules/customers/profile/PersonalInformation.vue';
import Profile from '../modules/customers/profile/Profile.vue';
import Catalogues from "@/modules/products/catalogues/Catalogues.vue";

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
        path: '/catalogues',
        name: 'catalogues',
        component: Catalogues,
      },
      {
        path: '/item-detail',
        name: 'item-detail',
        component: ItemDetail,
      },
      {
        path: "/your-account",
        name: "your-account",
        component: PersonalInformation,
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
