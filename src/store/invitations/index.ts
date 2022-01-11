import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { InvitationsStateInterface } from '@/store/invitations/types';
import { getters } from '@/store/invitations/getters';
import { actions } from '@/store/invitations/actions';
import { mutations } from '@/store/invitations/mutations';

export const state: InvitationsStateInterface = {
  invitations: [],
  // invitations: [
  //   {
  //     email: 'paul@gmail.com',
  //     address: 'вулиця Квіткова, будинок 27, квартира 3',
  //     status: 'запрошення створено',
  //     id: 1,
  //   },
  //   {
  //     email: 'john@gmail.com',
  //     address: 'вулиця Квіткова, будинок 27, квартира 3',
  //     status: 'запрошення прийнято',
  //     id: 2,
  //   },
  //   {
  //     email: 'jim@gmail.com',
  //     address: 'вулиця Квіткова, будинок 27, квартира 3',
  //     status: 'очікує схвалення',
  //     id: 3,
  //   },
  // ],
};

export const invitationsStore: Module<InvitationsStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
