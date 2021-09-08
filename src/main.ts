import { createApp } from 'vue'
import router from './router'
import store from './store'

import App from './App.vue'

import PrimeVue from 'primevue/config'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(PrimeVue)
app.mount('#app')