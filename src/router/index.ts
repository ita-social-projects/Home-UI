import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import StartPage from '@/views/StartPage.vue';
import RegisterCooperation from '@/views/RegisterCooperation.vue';
import UserLogin from '@/views/UserLogin.vue';
import UserRegistration from '@/views/UserRegistration.vue';

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
    path: '/usersignin',
    component: UserRegistration,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
