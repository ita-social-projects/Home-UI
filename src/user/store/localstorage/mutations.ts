import { MutationTree } from 'vuex';
import { LocalStorageStateInterface, LocalStorageMutationEnum, Mutations } from '@/user/store/localstorage/types';

export const mutations: MutationTree<LocalStorageStateInterface> & Mutations = {
  [LocalStorageMutationEnum.SET_TOKEN]: (state, payload) => {
    localStorage.setItem('user', JSON.stringify(payload));
    state.token = payload.token;
  },
  [LocalStorageMutationEnum.GET_TOKEN]: (state, payload) => {
    localStorage.getItem(payload);
  },
  [LocalStorageMutationEnum.REMOVE_TOKEN]: (state, payload) => {
    localStorage.removeItem(payload);
  },
  [LocalStorageMutationEnum.GET_USER_FROM_STORAGE]: (state) => {
    state.user = JSON.parse(localStorage.getItem('user') || '{}');
  },
};
