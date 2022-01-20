import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { InvitationsStateInterface } from '@/store/invitations/types';
import { getters } from '@/store/invitations/getters';
import { actions } from '@/store/invitations/actions';
import { mutations } from '@/store/invitations/mutations';

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
