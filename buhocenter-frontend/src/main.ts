import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { i18n } from '@/i18n/i18n';
import { CurrencyPlugin } from '@/plugins/currency/currency.plugin';
const VueTheMask = require('vue-the-mask').default;
import LogRocket from 'logrocket';

Vue.config.productionTip = false;
Vue.use(CurrencyPlugin);
Vue.use(VueTheMask);
LogRocket.init(process.env.VUE_APP_BUHOCENTER_API_ID_LOGROCKET);

new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: (h) => h(App),
}).$mount('#app');
