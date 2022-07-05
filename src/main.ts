import { createApp } from 'vue';
import router from './router';
import store from './store';

import { HTTP } from '@/core/api/http-common';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import LoaderSpinner from './components/LoaderSpinner.vue';
import App from './App.vue';
import '@/styles/style.scss';

const app = createApp(App);

app.config.globalProperties.$http = HTTP;
app.use(store);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);
app.component('LoaderSpinner', LoaderSpinner);
app.mount('#app');
