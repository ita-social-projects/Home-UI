import { ActionTree } from 'vuex';
import {
  TokenInterface,
  TokenStateInterface,
  LocalStorageMutationEnum,
  LocalStorageActionEnum,
} from '@/store/localstorage/types';
import { RootStateInterface } from '@/store/types';

export const actions: ActionTree<TokenStateInterface, RootStateInterface> = {
  [LocalStorageActionEnum.SET]: ({ commit }, payload) => {
    commit(LocalStorageMutationEnum.SET_TOKEN, payload);
  },
  [LocalStorageActionEnum.GET]: ({ commit }, payload) => {
    commit(LocalStorageMutationEnum.SET_TOKEN, payload);
  },
  [LocalStorageActionEnum.REMOVE]: ({ commit }, payload) => {
    commit(LocalStorageMutationEnum.REMOVE_TOKEN, payload);
  },
};
