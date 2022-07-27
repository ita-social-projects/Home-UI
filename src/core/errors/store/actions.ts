import { ActionTree } from 'vuex';
import { RootStateInterface, StoreModuleEnum } from '@/store/types';
import { ErrorsStateInterface, ErrorsActionEnum, ErrorsMutationEnum, Actions } from '@/core/errors/store/types';
import { MessagesActionEnum } from '@/core/messages/store/types';

export const actions: ActionTree<ErrorsStateInterface, RootStateInterface> & Actions = {
  [ErrorsActionEnum.SET_ERROR_ACTION]: ({ commit, dispatch }, errorResponse) => {
    const message = errorResponse.response?.data.error_message;
    const status = errorResponse.response?.status;
    commit(ErrorsMutationEnum.SET_ERROR, errorResponse);
    dispatch(
      `${StoreModuleEnum.messagesStore}/${MessagesActionEnum.SET_MESSAGE_ACTION}`,
      { type: 'error', message, status },
      {
        root: true,
      }
    );
  },
};
