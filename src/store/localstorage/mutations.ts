import { MutationTree } from 'vuex';
import { TokenStateInterface, LocalStorageMutationEnum } from '@/store/localstorage/types';

export const mutations: MutationTree<TokenStateInterface> = {
  [LocalStorageMutationEnum.SET_TOKEN]: (state, payload) => {
    state.token = payload;
    localStorage.setItem('user', JSON.stringify(payload));
  },
  [LocalStorageMutationEnum.GET_TOKEN]: (state, payload) => {
    localStorage.getItem('user');
  },
  [LocalStorageMutationEnum.REMOVE_TOKEN]: (state, payload) => {
    localStorage.removeItem('user');
  },
};
