import { createApp } from 'vue';
import router from './router';
import store from './store';

import App from './App.vue';

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import 'primevue/resources/themes/saga-blue/theme.css'; 
import 'primevue/resources/primevue.min.css';          
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(PrimeVue);
app.component('Button', Button);
app.component('InputText', InputText);
app.mount('#app');
