import { createApp } from 'vue';
import router from './router';
import store from './store';

import { HTTP } from '@/core/api/http-common';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import App from './App.vue';
import '@/styles/style.scss';
import ConfirmationService from 'primevue/confirmationservice';

const app = createApp(App);

app.config.globalProperties.$http = HTTP;
app.use(store);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);
app.mount('#app');
