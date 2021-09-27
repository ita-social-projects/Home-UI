import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { UserStateInterface } from '@/store/sign-in/types';
import { getters } from '@/store/sign-in/getters';
import { mutations } from '@/store/sign-in/mutations';
import { actions } from '@/store/sign-in/actions';

export const state: UserStateInterface = {
  user: {
    first_name: '',
    last_name: '',
    email: '',
    id: 0,
    contacts: [
      {
        type: '',
        main: false,
        id: 0,
        email: '',
      },
    ],
  },
};

export const userStore: Module<UserStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export { UserStateInterface };
