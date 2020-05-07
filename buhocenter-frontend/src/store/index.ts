import Vue from 'vue';
import Vuex from 'vuex';
import baseModule from '@/store/base-module/BaseModule';
import authModule from "@/store/auth-module/AuthModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    baseModule,
    authModule
  },
});
