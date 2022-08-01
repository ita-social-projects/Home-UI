import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { InvitationsStateInterface } from '@/invitations/store/types';
import { getters } from '@/invitations/store/getters';
import { actions } from '@/invitations/store/actions';
import { mutations } from '@/invitations/store/mutations';

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
