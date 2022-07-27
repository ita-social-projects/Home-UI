import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { ErrorsStateInterface } from '@/core/errors/store/types';
import { getters } from '@/core/errors/store/getters';
import { mutations } from '@/core/errors/store/mutations';
import { actions } from '@/core/errors/store/actions';

export const state: ErrorsStateInterface = {
  errorsList: [],
};

export const errorsStore: Module<ErrorsStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
