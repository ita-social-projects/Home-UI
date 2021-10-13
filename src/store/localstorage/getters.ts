import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { LocalStorageStateInterface, Getters } from '@/store/localstorage/types';

export const getters: GetterTree<LocalStorageStateInterface, RootStateInterface> & Getters = {
  isTokenExist() {
    return localStorage.getItem('user') !== null;
  },
  token(state) {
    return state.token;
  },
};
