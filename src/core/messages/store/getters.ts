import { GetterTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import { MessagesStateInterface } from '@/core/messages/store/types';

export const getters: GetterTree<MessagesStateInterface, RootStateInterface> = {
  getMessages: (state) => {
    return state.messages;
  },
};
