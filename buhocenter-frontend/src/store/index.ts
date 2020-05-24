import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import baseModule from '@/store/base-module/BaseModule';
import carts from '@/store/carts/carts';
import products from '@/store/products/products';
import layout from '@/store/layout/layout';
import authModule from '@/store/auth-module/AuthModule';
import languageModule from '@/store/languages-module/LanguagesModule';
import categoryModule from '@/store/category-module/CategoryModule';
import catalogueModule from '@/store/catalogue-module/CatalogueModule'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    baseModule,
    carts,
    layout,
    products,
    authModule,
    languageModule,
    categoryModule,
    catalogueModule,
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })],
});
