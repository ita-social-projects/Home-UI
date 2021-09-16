import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import RegisterCooperation from '@/views/RegisterCooperation.vue';

const routes: RouteRecordRaw[] = [
  // initial route; should be customized or removed
  {
    path: '/',
    component: Home,
  },
  {
    path: '/cooperation',
    component: RegisterCooperation,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
