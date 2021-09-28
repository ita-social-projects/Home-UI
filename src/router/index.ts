import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { Routes } from '@/router/types';
import StartPage from '@/views/StartPage.vue';
import RegisterCooperation from '@/views/RegisterCooperation.vue';
import UserLogin from '@/views/UserLogin.vue';
import RegisterUser from '@/views/RegisterUser.vue';

const routes: RouteRecordRaw[] = [
  // initial route; should be customized or removed
  {
    path: Routes.StartPage,
    component: StartPage,
  },
  {
    path: Routes.UserLogin,
    component: UserLogin,
  },
  {
    path: Routes.RegisterCooperation,
    component: RegisterCooperation,
  },
  {
    path: Routes.RegisterUser,
    component: RegisterUser,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
/*
    path: '/main-page',
    component: MainPage,
*/
