import { MutationTree } from 'vuex';
import { MessagesStateInterface, MessagesMutationEnum, Mutations } from '@/core/messages/store/types';

export const mutations: MutationTree<MessagesStateInterface> & Mutations = {
  [MessagesMutationEnum.SET_MESSAGE]: (state, payload) => {
    state.messages = [...state.messages, payload];
  },
};
