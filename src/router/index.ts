import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { RoutesEnum } from '@/router/types';

import StartPage from '@/views/StartPage.vue';
import RegisterCooperation from '@/views/RegisterCooperation.vue';
import RegisterUser from '@/views/RegisterUser.vue';
import ManageUser from '@/views/ManageUser.vue';
import UserLogin from '@/views/UserLogin.vue';
import MainPage from '@/views/MainPage.vue';
import CooperationInfo from '@/views/CooperationInfo.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import CooperationPolls from '@/views/CooperationPolls.vue';

import ManageApartments from '@/views/ManageApartments.vue';
import ApartmentsInfoMock from '@/views/ApartmentsInfoMock.vue';

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
        path: RoutesEnum.ManageApartments,
        component: ManageApartments,
      },
      {
        path: RoutesEnum.ApartmentsInfoMock,
        component: ApartmentsInfoMock,
      },
      {
        path: RoutesEnum.Polls,
        component: CooperationPolls,
      },
      { path: RoutesEnum.ManageUser, component: ManageUser },
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

router.beforeEach((to, _from, next) => {
  if (to.path === RoutesEnum.MainPage && localStorage.getItem('user') == null) {
    next({ path: RoutesEnum.StartPage });
  } else {
    next();
  }
});

export default router;
