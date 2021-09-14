import { createApp } from 'vue';
import router from './router';
import store from './store';

import { HTTP } from './core/api/http-common';
import App from './App.vue';
import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/tailwind-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

app.config.globalProperties.$http = HTTP;
app.use(store);
app.use(router);
app.use(PrimeVue);
app.mount('#app');
