import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { LocalStorageStateInterface, TokenInterface } from '@/store/localstorage/types';

export const getters: GetterTree<LocalStorageStateInterface, RootStateInterface> = {
  isTokenExist(): boolean {
    return localStorage.getItem('user') !== null;
  },
};
