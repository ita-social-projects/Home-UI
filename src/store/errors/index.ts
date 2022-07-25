import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { ErrorsStateInterface } from '@/store/errors/types';
import { getters } from '@/store/errors/getters';
import { mutations } from '@/store/errors/mutations';
import { actions } from '@/store/errors/actions';

export const state: ErrorsStateInterface = {
  error: {
    errorMessage: null,
    errorStatus: null,
  },
};

export const errorsStore: Module<ErrorsStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
