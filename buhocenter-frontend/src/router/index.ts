import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Layout from "../views/Layout.vue";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import Catalogue from "@/modules/client/catalogue/components/Catalogue.vue";
import ItemDetail from "@/modules/client/products/components/ItemDetail.vue";
import Register from "../views/Register.vue";
import Profile from "@/modules/client/customers/components/Profile.vue";
import Catalogues from "@/modules/client/catalogues/components/Catalogues.vue";
import AddressManagement from "@/modules/client/addresses/components/AddressManagement.vue";
import CreateAddressForm from "@/modules/client/addresses/components/CreateAddressForm.vue";
import Dashboard from "@/views/dashboard/Dashboard.vue";
import DashboardHome from "@/modules/management/home/components/Home.vue";
import DashboardCatalogues from "@/modules/management/catalogues/components/Catalogues.vue";
import DashboardCategories from "@/modules/management/categories/components/Categories.vue";
import DashboardClients from "@/modules/management/clients/components/Clients.vue";
import DashboardEmails from "@/modules/management/emails/components/Emails.vue";
import DashboardOrders from "@/modules/management/orders/components/Orders.vue";
import DashboardPlatform from "@/modules/management/platform/components/Platform.vue";
import DashboardProducts from "@/modules/management/products/components/Products.vue";
import DashboardPromotions from "@/modules/management/promotions/components/Promotions.vue";
import DashboardServices from "@/modules/management/services/components/Services.vue";
import PersonalInformation from "@/modules/client/customers/components/PersonalInformation.vue";

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
        path: "/address-management",
        name: "address-management",
        component: AddressManagement,
      },
      {
        path: "/create-address",
        name: "create-address",
        component: CreateAddressForm,
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
      },
      {
        path: "/products",
        name: "products",
        component: Catalogue,
      },
      {
        path: "/catalogues",
        name: "catalogues",
        component: Catalogues,
      },
      {
        path: "/item-detail",
        name: "item-detail",
        component: ItemDetail,
      },
      {
        path: "/dashboard",
        redirect: "/dashboard/home",
        component: Dashboard,
        children: [
          {
            path: "/dashboard/home",
            name: "dashboard-home",
            component: DashboardHome,
            meta: {
              admin: true,
            },
          },
          {
            path: "/dashboard/catalogues",
            name: "dashboard-catalogues",
            component: DashboardCatalogues,
            meta: {
              admin: true,
            },
          },
          {
            path: "/dashboard/categories",
            name: "dashboard-categories",
            component: DashboardCategories,
            meta: {
              admin: true,
            },
          },
          {
            path: "/dashboard/clients",
            name: "dashboard-clients",
            component: DashboardClients,
            meta: {
              admin: true,
            },
          },
          {
            path: "/dashboard/emails",
            name: "dashboard-emails",
            component: DashboardEmails,
            meta: {
              admin: true,
            },
          },
          {
            path: "/dashboard/orders",
            name: "dashboard-emails",
            component: DashboardOrders,
            meta: {
              admin: true,
            },
          },
          {
            path: "/dashboard/platform",
            name: "dashboard-platform",
            component: DashboardPlatform,
            meta: {
              admin: true,
            },
          },
          {
            path: "/dashboard/products",
            name: "dashboard-products",
            component: DashboardProducts,
            meta: {
              admin: true,
            },
          },
          {
            path: "/dashboard/promotions",
            name: "dashboard-promotions",
            component: DashboardPromotions,
            meta: {
              admin: true,
            },
          },
          {
            path: "/dashboard/services",
            name: "dashboard-servies",
            component: DashboardServices,
            meta: {
              admin: true,
            },
          },
        ],
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
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
