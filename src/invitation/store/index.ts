import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { InvitationsStateInterface } from '@/invitation/store/types';
import { getters } from '@/invitation/store/getters';
import { actions } from '@/invitation/store/actions';
import { mutations } from '@/invitation/store/mutations';

export const state: InvitationsStateInterface = {
  invitations: [],
};

export const invitationsStore: Module<InvitationsStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
