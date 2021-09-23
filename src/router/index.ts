import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import StartPage from '@/views/StartPage.vue';
import RegisterCooperation from '@/views/RegisterCooperation.vue';
import UserLogin from '@/views/UserLogin.vue';
import MainPage from '@/views/MainPage.vue';

const routes: RouteRecordRaw[] = [
  // initial route; should be customized or removed
  {
    path: '/',
    component: StartPage,
  },
  {
    path: '/login',
    component: UserLogin,
  },
  {
    path: '/register-cooperation',
    component: RegisterCooperation,
  },
  {
    path: '/main-page',
    component: MainPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
