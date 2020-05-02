import Vue from 'vue';
import Vuex from 'vuex';
import baseModule from '@/store/base-module/BaseModule'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    baseModule,
  },
});
