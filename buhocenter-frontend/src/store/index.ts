import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import carts from '@/store/carts/carts';
import products from '@/store/products/products';
import layout from '@/store/layout/layout';
import authModule from '@/store/auth/auth';
import languageModule from '@/store/languages/languages';
import brands from '@/store/brands/brands';
import providers from '@/store/providers/providers';
import payments from '@/store/payments/payments';
import loader from '@/store/loader/loader';
import categoryModule from '@/store/categories/categories';
import catalogueModule from '@/store/catalogue/catalogue';
import addresses from '@/store/addresses/addresses';
import offers from '@/store/offers/offers';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        addresses,
        carts,
        layout,
        loader,
        payments,
        products,
        authModule,
        languageModule,
        brands,
        providers,
        categoryModule,
        catalogueModule,
        offers,
    },
    plugins: [createPersistedState({ storage: window.sessionStorage })],
});
