import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { UserStateInterface } from '@/user/store/user/types';
import { getters } from '@/user/store/user/getters';
import { mutations } from '@/user/store/user/mutations';
import { actions } from '@/user/store/user/actions';

export const state: UserStateInterface = {
  data: {
    registrationToken: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    contacts: [],
  },
  error: '',
  success: '',
};

export const userStore: Module<UserStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
