import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import StartPage from '@/views/StartPage.vue';
import RegisterCooperation from '@/views/RegisterCooperation.vue';

const routes: RouteRecordRaw[] = [
  // initial route; should be customized or removed
  {
    path: '/',
    component: StartPage,
  },
  {
    path: '/register-cooperation',
    component: RegisterCooperation,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
