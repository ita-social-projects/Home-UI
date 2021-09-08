import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router'
import App from '@/App.vue';

const routes: RouteRecordRaw[] = [
  // initial route, should be removed
  {
    path: '/',
    component: App,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
