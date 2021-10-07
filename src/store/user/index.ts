import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { UserStateInterface } from '@/store/user/types';
import { getters } from '@/store/user/getters';
import { mutations } from '@/store/user/mutations';
import { actions } from '@/store/user/actions';

export const state: UserStateInterface = {
  data: {
    registration_token: '',
    first_name: '',
    // midle_name: '',
    last_name: '',
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

export { UserStateInterface };
