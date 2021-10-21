import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { Routes } from '@/router/types';
import StartPage from '@/views/StartPage.vue';
import RegisterCooperation from '@/views/RegisterCooperation.vue';
import RegisterUser from '@/views/RegisterUser.vue';
import UserLogin from '@/views/UserLogin.vue';
import MainPage from '@/views/MainPage.vue';
import CooperationInfo from '@/views/CooperationInfo.vue';
import PageNotFound from '@/components/PageNotFound.vue';

const routes: RouteRecordRaw[] = [
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
    path: Routes.MainPage,
    component: MainPage,
    children: [
      {
        path: Routes.Cooperation,
        component: CooperationInfo,
      },
    ],
  },
  {
    path: Routes.NotFound,
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  if (to.path === Routes.MainPage && localStorage.getItem('user') == null) {
    next({ path: Routes.StartPage });
  } else {
    next();
  }
});

export default router;
