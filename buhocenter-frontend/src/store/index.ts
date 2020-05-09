import Vue from 'vue';
import Vuex from 'vuex';
import baseModule from '@/store/base-module/BaseModule';
import products from '@/store/products/products';
import layout from '@/store/layout/layout';
import createPersistedState from 'vuex-persistedstate';
import authModule from "@/store/auth-module/AuthModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    baseModule,
    layout,
    products,
    authModule
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })]
});
