import Vue from 'vue';
import Vuex from 'vuex';
import termModule from '@/store/term-module/TermModule'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    termModule,
  },
});
