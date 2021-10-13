import { MutationTree } from 'vuex';
import { LocalStorageStateInterface, LocalStorageMutationEnum, Mutations } from '@/store/localstorage/types';

export const mutations: MutationTree<LocalStorageStateInterface> & Mutations = {
  [LocalStorageMutationEnum.SET_TOKEN]: (state, payload) => {
    localStorage.setItem('user', JSON.stringify(payload));
  },
  [LocalStorageMutationEnum.GET_TOKEN]: (state, payload) => {
    localStorage.getItem('user');
  },
  [LocalStorageMutationEnum.REMOVE_TOKEN]: (state, payload) => {
    localStorage.removeItem('user');
  },
};
