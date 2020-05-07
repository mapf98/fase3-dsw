import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true
        },
        themes: {
            light: {
                primary: "#50B83C",
                secondary: "#e8ecfa",
                accent: "#FF4800",
                error: "#C63800",
                info: "#BBE5B3",
                success: "#108043",
                warning: "#ffb822"
            }
        }
    }
});
