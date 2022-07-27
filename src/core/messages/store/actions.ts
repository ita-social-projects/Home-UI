import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { MessagesStateInterface, MessagesActionEnum, MessagesMutationEnum, Actions } from '@/core/messages/store/types';

export const actions: ActionTree<MessagesStateInterface, RootStateInterface> & Actions = {
  [MessagesActionEnum.SET_MESSAGE_ACTION]: ({ commit }, payload) => {
    commit(MessagesMutationEnum.SET_MESSAGE, payload);
  },
};
