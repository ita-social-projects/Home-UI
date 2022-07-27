import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { MessagesStateInterface } from '@/core/messages/store/types';
import { getters } from '@/core/messages/store/getters';
import { mutations } from '@/core/messages/store/mutations';
import { actions } from '@/core/messages/store/actions';

export const state: MessagesStateInterface = {
  messages: [],
};

export const messagesStore: Module<MessagesStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
