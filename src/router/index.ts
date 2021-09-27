import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { Routes } from '@/router/types';
import StartPage from '@/views/StartPage.vue';
import RegisterCooperation from '@/views/RegisterCooperation.vue';
import RegisterUser from '@/views/RegisterUser.vue';
import UserLogin from '@/views/UserLogin.vue';
import UserProfile from '@/views/UserProfile.vue';

const routes: RouteRecordRaw[] = [
  // initial route; should be customized or removed
  {
    path: Routes.StartPage,
    component: StartPage,
  },
  {
    name: Routes.UserLogin,
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
  {
    path: Routes.UserProfile,
    component: UserProfile,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
