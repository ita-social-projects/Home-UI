import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { RoutesEnum } from '@/router/types';

import StartPage from '@/views/StartPage.vue';
import RegisterCooperation from '@/views/RegisterCooperation.vue';
import RegisterUser from '@/views/RegisterUser.vue';
import UserLogin from '@/views/UserLogin.vue';
import MainPage from '@/views/MainPage.vue';
import CooperationInfo from '@/views/CooperationInfo.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import CooperationPolls from '@/views/CooperationPolls.vue';

const routes: RouteRecordRaw[] = [
  {
    path: RoutesEnum.StartPage,
    component: StartPage,
  },
  {
    name: RoutesEnum.UserLogin,
    path: RoutesEnum.UserLogin,
    component: UserLogin,
  },
  {
    path: RoutesEnum.RegisterCooperation,
    component: RegisterCooperation,
  },
  {
    path: RoutesEnum.RegisterUser,
    component: RegisterUser,
  },
  {
    path: RoutesEnum.MainPage,
    component: MainPage,
    children: [
      {
        path: RoutesEnum.Cooperation,
        component: CooperationInfo,
      },
      {
        path: RoutesEnum.Polls,
        component: CooperationPolls,
      },
    ],
  },
  {
    path: RoutesEnum.NotFound,
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === RoutesEnum.MainPage && localStorage.getItem('user') == null) {
    next({ path: RoutesEnum.StartPage });
  } else {
    next();
  }
});

export default router;
