import { createApp } from 'vue';
import router from './router';
import store from './store';

import PrimeVue from 'primevue/config';

import App from './App.vue';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(PrimeVue);
app.mount('#app');