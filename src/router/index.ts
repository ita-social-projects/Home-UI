import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { RoutesEnum } from '@/router/types';

import StartPage from '@/views/StartPage.vue';
import RegisterCooperation from '@/cooperation/components/RegisterCooperation.vue';
import RegisterUser from '@/user/components/RegisterUser.vue';
import ManageUser from '@/user/components/ManageUser.vue';
import UserLogin from '@/user/components/UserLogin.vue';
import MainPage from '@/views/MainPage.vue';
import CooperationInfo from '@/cooperation/components/CooperationInfo.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import PageErrorInvintation from '@/views/PageErrorInvintation.vue';
import CooperationPolls from '@/poll/CooperationPolls.vue';
import PollInfo from '@/poll/PollInfo.vue';
import InvitationSection from '@/invitation/InvitationSection.vue';
import FinanceSection from '@/finance/components/FinanceSection.vue';
import ManageApartments from '@/apartment/ManageApartments.vue';
import ApartmentInfo from '@/apartment/ApartmentInfo.vue';
import TariffsCalculation from '@/finance/components/TariffsCalculation.vue';

const routes: RouteRecordRaw[] = [
  {
    path: RoutesEnum.StartPage,
    component: StartPage,
    meta: {
      title: 'Початкова',
    },
  },
  {
    name: RoutesEnum.UserLogin,
    path: RoutesEnum.UserLogin,
    component: UserLogin,
    meta: {
      title: 'Увійти',
    },
  },
  {
    path: RoutesEnum.RegisterCooperation,
    component: RegisterCooperation,
    meta: {
      title: 'Реестрація ОСББ',
    },
  },
  {
    path: RoutesEnum.RegisterUser,
    component: RegisterUser,
    meta: {
      title: 'Реестрація користувача',
    },
  },
  {
    path: RoutesEnum.MainPage,
    component: MainPage,
    meta: {
      title: 'Основна',
    },
    children: [
      {
        path: RoutesEnum.Cooperation,
        component: CooperationInfo,
        meta: {
          title: 'Управління ОСББ',
        },
      },
      {
        path: RoutesEnum.ManageApartments,
        name: 'manage-apartment',
        component: ManageApartments,
        props: true,
        meta: {
          title: 'Дім -',
        },
      },
      {
        path: RoutesEnum.ApartmentInfo,
        name: 'apartment-info',
        component: ApartmentInfo,
        props: true,
        meta: {
          title: 'Квартира:',
        },
      },
      {
        path: RoutesEnum.Polls,
        component: CooperationPolls,
        meta: {
          title: 'Опитування',
        },
      },
      {
        path: RoutesEnum.InvitationSection,
        component: InvitationSection,
        meta: {
          title: 'Запрошення',
        },
      },
      {
        path: RoutesEnum.ManageUser,
        component: ManageUser,
        meta: {
          title: 'Управління користувачем',
        },
      },
      {
        path: RoutesEnum.PollInfo,
        name: 'poll-info',
        component: PollInfo,
        props: true,
        meta: {
          title: 'Опитування номер:',
        },
      },
      {
        path: RoutesEnum.FinanceSection,
        name: 'finance-section',
        component: FinanceSection,
        meta: {
          title: 'Фінанси',
        },
      },
      {
        path: RoutesEnum.TariffsCalculation,
        name: 'tariffs-calculation',
        component: TariffsCalculation,
        meta: {
          title: 'Калькулятор тарифу',
        },
      },
    ],
  },
  {
    path: RoutesEnum.NotFound,
    component: PageNotFound,
    meta: {
      title: '404',
    },
  },
  {
    path: RoutesEnum.PageErrorInvintation,
    component: PageErrorInvintation,
    meta: {
      title: 'Помилка запрошення',
    },
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
  document.title = `${to.meta.title} | Home-UI`;
});

export default router;
