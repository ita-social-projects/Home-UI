import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { LocalStorageStateInterface, Getters } from '@/user/store/localstorage/types';

export const getters: GetterTree<LocalStorageStateInterface, RootStateInterface> & Getters = {
  isTokenExist() {
    return localStorage.getItem('user') !== null;
  },
  getToken(state) {
    return state.token;
  },
  getUserFromStorage(state) {
    return state.user;
  },
};
