import Vue from 'vue';
import Meta from 'vue-meta';

import App from './App.vue';
import router from './router';

import 'normalize.css';

Vue.use(Meta);

Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
