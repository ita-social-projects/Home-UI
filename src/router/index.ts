import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { RoutesEnum } from '@/router/types';

import StartPage from '@/views/StartPage.vue';
import RegisterCooperation from '@/cooperation/components/RegisterCooperation.vue';
import RegisterUser from '@/views/RegisterUser.vue';
import ManageUser from '@/views/ManageUser.vue';
import UserLogin from '@/views/UserLogin.vue';
import MainPage from '@/views/MainPage.vue';
import CooperationInfo from '@/cooperation/components/CooperationInfo.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import PageErrorInvintation from '@/views/PageErrorInvintation.vue';
import CooperationPolls from '@/views/CooperationPolls.vue';
import PollInfo from '@/views/PollInfo.vue';
import InvitationSection from '@/views/InvitationSection.vue';
import TodoPage from '@/views/TodoPage.vue';


import ManageApartments from '@/apartment/ManageApartments.vue';
import ApartmentInfo from '@/apartment/ApartmentInfo.vue';

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
        name: 'manage-apartment',
        component: ManageApartments,
        props: true,
      },
      {
        path: RoutesEnum.ApartmentInfo,
        name: 'apartment-info',
        component: ApartmentInfo,
        props: true,
      },
      {
        path: RoutesEnum.Polls,
        component: CooperationPolls,
      },
      {
        path: RoutesEnum.InvitationSection,
        component: InvitationSection,
      },
      {
        path: RoutesEnum.ManageUser,
        component: ManageUser,
      },
      {
        path: RoutesEnum.PollInfo,
        name: 'poll-info',
        component: PollInfo,
        props: true,
      },
      {
        path: RoutesEnum.TodoPage,
        name: 'todo-page',
        component: TodoPage,
      },
    ],
  },
  {
    path: RoutesEnum.NotFound,
    component: PageNotFound,
  },
  {
    path: RoutesEnum.PageErrorInvintation,
    component: PageErrorInvintation,
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
