import { createApp } from 'vue'
import router from './router'
import store from './store'

import App from './App.vue'
import { HTTP } from './core/api/http-common'

const app = createApp(App);

app.config.globalProperties.$http = HTTP;
app.use(store);
app.use(router);
app.mount('#app');
