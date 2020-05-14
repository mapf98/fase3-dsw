import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import baseModule from '@/store/base-module/BaseModule';
import products from '@/store/products/products';
import layout from '@/store/layout/layout';
import authModule from '@/store/auth-module/AuthModule';
import languageModule from '@/store/languages-module/LanguagesModule';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    baseModule,
    layout,
    products,
    authModule,
    languageModule
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })]
});
