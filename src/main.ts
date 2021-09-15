import { createApp } from 'vue';
import router from './router';
import store from './store';

import { HTTP } from '@/core/api/http-common';
import PrimeVue from 'primevue/config';
import App from './App.vue';

import 'primevue/resources/themes/tailwind-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import '@/styles/style.scss';

const app = createApp(App);

app.config.globalProperties.$http = HTTP;
app.use(store);
app.use(router);
app.use(PrimeVue);
app.mount('#app');
