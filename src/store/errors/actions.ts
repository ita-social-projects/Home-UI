import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { ErrorsStateInterface, ErrorsActionEnum, ErrorsMutationEnum, Actions } from '@/store/errors/types';

export const actions: ActionTree<ErrorsStateInterface, RootStateInterface> & Actions = {
  [ErrorsActionEnum.SET_ERROR_ACTION]: ({ commit }, errorResponse) => {
    commit(ErrorsMutationEnum.SET_ERROR, errorResponse);
  },
  [ErrorsActionEnum.RESET_ERROR_ACTION]: ({ commit }) => {
    commit(ErrorsMutationEnum.RESET_ERROR);
  },
};
