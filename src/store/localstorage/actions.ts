import { ActionTree } from 'vuex';
import {
  LocalStorageStateInterface,
  LocalStorageMutationEnum,
  LocalStorageActionEnum,
  Actions,
} from '@/store/localstorage/types';
import { RootStateInterface } from '@/store/types';

export const actions: ActionTree<LocalStorageStateInterface, RootStateInterface> & Actions = {
  [LocalStorageActionEnum.SET]: ({ commit }, payload) => {
    commit(LocalStorageMutationEnum.SET_TOKEN, payload);
  },
  [LocalStorageActionEnum.GET]: ({ commit }, payload) => {
    commit(LocalStorageMutationEnum.GET_TOKEN, payload);
  },
  [LocalStorageActionEnum.REMOVE]: ({ commit }, payload) => {
    commit(LocalStorageMutationEnum.REMOVE_TOKEN, payload);
  },
};
